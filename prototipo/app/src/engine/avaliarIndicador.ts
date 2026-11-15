/**
 * Avaliação de um indicador: do conjunto de leituras ao `EstadoIndicador` (nível, motivo, texto da
 * regra, linha de base). Função pura, sem relógio: `agoraUtc` entra como parâmetro.
 *
 * Regras fixas (docs/03, docs/04, docs/06, docs/17):
 * - vermelho (4) só por sintoma de alarme; nenhum número produz 4;
 * - requisito oficial excedido e corte clínico com fonte vão a laranja (3), como diz a `regraCor`;
 * - a linha de base sozinha gera no máximo amarelo (|z| de 2 ou mais);
 * - leitura vencida (`validadeHoras`), indisponível ou sem contexto para a regra fica cinza e não é avaliada;
 * - regra com `aplicaSomenteEmRegra` só vale quando a regra de cruzamento citada está ativa;
 * - a cor final é o maior nível entre faixa com fonte, desvio pessoal e sintoma.
 */

import type { EstadoIndicador, Nivel } from "../domain/estado";
import { SINTOMA_POR_ID, normalizarTexto, type SintomaRelatado } from "../domain/sintomas";
import { minutosEntre, paraMs } from "../domain/tempo";
import type {
  BandaRuido,
  Indicador,
  Leitura,
  PontoPoligono,
  RegraCorRegra,
  Sexo,
  SintomaRegra,
  SitioOsseo,
} from "../domain/tipos";
import { ewma, variacaoPercentual } from "./estatistica";
import {
  dentroDaValidade,
  ehDisponivel,
  idadeEmMinutos,
  naJanela,
  selecionarLeituras,
  valorNaUnidadeDoIndicador,
} from "./leituras";
import { analisarLinhaDeBase, nivelPorZScore, type AnaliseLinhaDeBase } from "./linhaDeBase";

// ---------------------------------------------------------------------------
// Regras numéricas (regraCor.regras)
// ---------------------------------------------------------------------------

/** Sobre qual valor a regra é avaliada, lido da unidade que o JSON declara ("mmHg, média de 1 h"). */
export type Agregacao = "instantaneo" | "media_1h" | "ewma" | "variacao_pct" | "dose_pct";

export function agregacaoDaRegra(unidade: string): Agregacao {
  if (/ewma/i.test(unidade)) return "ewma";
  if (/m[eé]dia (m[oó]vel )?de 1 ?h/i.test(unidade)) return "media_1h";
  if (/varia[cç][aã]o/i.test(unidade)) return "variacao_pct";
  if (/dose em 24 ?h/i.test(unidade)) return "dose_pct";
  return "instantaneo";
}

/** Valores sobre os quais as regras de um indicador podem ser avaliadas. */
export interface ValoresEfetivos {
  instantaneo: number;
  /** Média da última hora, para regras "média de 1 h". Sem série, vale o instantâneo. */
  media1h?: number;
  /** EWMA da série (λ = 0,3), para regras "média EWMA". Sem série, vale o instantâneo. */
  ewma?: number;
  /** Variação percentual contra a linha de base (`docs/04`, A6). Ausente com a base em formação. */
  variacaoPct?: number;
}

export interface ContextoRegras {
  /** Ids das regras de cruzamento ativas; regras com `aplicaSomenteEmRegra` só valem se a citada estiver aqui. */
  regrasAtivas: readonly string[];
  sexo?: Sexo;
  /** Valor da grandeza pareada (temperatura para a umidade, e vice-versa) para o polígono do V2 6012. */
  valorPareado?: number;
  sitio?: SitioOsseo;
  frequenciaHz?: number;
  bandas?: readonly BandaRuido[];
  diasNaMissao?: number;
}

export interface ResultadoRegras {
  /** 0 quando nenhuma regra disparou; senão o maior nível proposto (2 ou 3). */
  nivel: Nivel;
  regra?: RegraCorRegra;
  /** Regras que puderam ser avaliadas. */
  avaliadas: number;
  /** Regras que dependiam de contexto ausente (sexo, sítio, par, bandas) e foram puladas. */
  semContexto: number;
}

function valorDaAgregacao(agregacao: Agregacao, v: ValoresEfetivos): number | undefined {
  switch (agregacao) {
    case "instantaneo":
      return v.instantaneo;
    case "media_1h":
      return v.media1h ?? v.instantaneo;
    case "ewma":
      return v.ewma ?? v.instantaneo;
    case "variacao_pct":
      return v.variacaoPct;
    case "dose_pct":
      return undefined; // a dose em 24 h do ruído não é calculada neste protótipo
  }
}

/** Ponto dentro (ou sobre a borda) do polígono; vértices em (temperaturaC, umidadePct). */
function dentroDoPoligono(temperaturaC: number, umidadePct: number, vertices: readonly PontoPoligono[]): boolean {
  const EPS = 1e-9;
  let dentro = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i, i += 1) {
    const a = vertices[i];
    const b = vertices[j];
    if (!a || !b) continue;
    const cruzamento = (b.temperaturaC - a.temperaturaC) * (umidadePct - a.umidadePct);
    const produto = (b.umidadePct - a.umidadePct) * (temperaturaC - a.temperaturaC);
    const sobreSegmento =
      Math.abs(cruzamento - produto) < EPS &&
      temperaturaC >= Math.min(a.temperaturaC, b.temperaturaC) - EPS &&
      temperaturaC <= Math.max(a.temperaturaC, b.temperaturaC) + EPS &&
      umidadePct >= Math.min(a.umidadePct, b.umidadePct) - EPS &&
      umidadePct <= Math.max(a.umidadePct, b.umidadePct) + EPS;
    if (sobreSegmento) return true;
    const atravessa =
      a.umidadePct > umidadePct !== b.umidadePct > umidadePct &&
      temperaturaC <
        ((b.temperaturaC - a.temperaturaC) * (umidadePct - a.umidadePct)) / (b.umidadePct - a.umidadePct) + a.temperaturaC;
    if (atravessa) dentro = !dentro;
  }
  return dentro;
}

function bandasDoContexto(ctx: ContextoRegras, valor: number): readonly BandaRuido[] | undefined {
  if (ctx.bandas && ctx.bandas.length > 0) return ctx.bandas;
  if (ctx.frequenciaHz !== undefined) return [{ frequenciaHz: ctx.frequenciaHz, db: valor }];
  return undefined;
}

/** `true` se a condição é satisfeita, `false` se não, `null` se faltou contexto para avaliar. */
function condicaoSatisfeita(
  regra: RegraCorRegra,
  valor: number,
  indicador: Indicador,
  ctx: ContextoRegras,
): boolean | null {
  switch (regra.operador) {
    case "<":
      return valor < regra.valor;
    case "<=":
      return valor <= regra.valor;
    case ">":
      return valor > regra.valor;
    case ">=":
      return valor >= regra.valor;
    case "fora_do_intervalo_inclusivo":
      return valor < regra.valor.min || valor > regra.valor.max;
    case "entre_inclusivo":
      return valor >= regra.valor.min && valor <= regra.valor.max;
    case "fora_da_faixa_por_contexto": {
      if (!ctx.sexo) return null;
      const faixa = ctx.sexo === "masculino" ? regra.valor.homens : regra.valor.mulheres;
      return valor < faixa.min || valor > faixa.max;
    }
    case "abaixo_do_alvo_por_sitio": {
      if (!ctx.sitio) return null;
      const alvo = ctx.sitio === "colo_femoral" ? regra.valor.coloFemoral : regra.valor[ctx.sitio];
      return valor < alvo;
    }
    case "fora_do_poligono": {
      if (ctx.valorPareado === undefined) return null;
      const ehTemperatura = (regra.dependencias ?? []).indexOf(indicador.id) === 0;
      const temperaturaC = ehTemperatura ? valor : ctx.valorPareado;
      const umidadePct = ehTemperatura ? ctx.valorPareado : valor;
      return !dentroDoPoligono(temperaturaC, umidadePct, regra.valor);
    }
    case "qualquer_banda_acima_da_curva": {
      const bandas = bandasDoContexto(ctx, valor);
      if (!bandas) return null;
      return bandas.some((b) => {
        const i = regra.valor.frequenciasHz.indexOf(b.frequenciaHz);
        const limite = i >= 0 ? regra.valor.limitesDb[i] : undefined;
        return limite !== undefined && b.db > limite;
      });
    }
    case "qualquer_banda_acima_da_curva_aplicavel": {
      const bandas = bandasDoContexto(ctx, valor);
      if (!bandas || ctx.diasNaMissao === undefined) return null;
      const curva = ctx.diasNaMissao <= 30 ? regra.valor.NC50Ate30DiasDb : regra.valor.NC40Mais30DiasDb;
      return bandas.some((b) => {
        const i = regra.valor.frequenciasHz.indexOf(b.frequenciaHz);
        const limite = i >= 0 ? curva[i] : undefined;
        return limite !== undefined && b.db > limite;
      });
    }
    default: {
      const nunca: never = regra;
      throw new Error(`Operador de regraCor desconhecido: ${JSON.stringify(nunca)}`);
    }
  }
}

/**
 * Avalia `regraCor.regras` na ordem declarada; cada condição satisfeita propõe o seu nível e vale o
 * maior. Não aplica `nivelMaximoSemSintoma` nem sintomas: isso é feito em `avaliarIndicador`.
 */
export function avaliarRegrasCor(indicador: Indicador, valores: ValoresEfetivos, ctx: ContextoRegras): ResultadoRegras {
  const resultado: ResultadoRegras = { nivel: 0, avaliadas: 0, semContexto: 0 };
  for (const regra of indicador.regraCor.regras) {
    if (regra.aplicaSomenteEmRegra && !ctx.regrasAtivas.includes(regra.aplicaSomenteEmRegra)) continue;
    const valor = valorDaAgregacao(agregacaoDaRegra(regra.unidade), valores);
    if (valor === undefined) continue;
    const satisfeita = condicaoSatisfeita(regra, valor, indicador, ctx);
    if (satisfeita === null) {
      resultado.semContexto += 1;
      continue;
    }
    resultado.avaliadas += 1;
    if (satisfeita && regra.nivel > resultado.nivel) {
      resultado.nivel = regra.nivel;
      resultado.regra = regra;
    }
  }
  return resultado;
}

// ---------------------------------------------------------------------------
// Sintomas (regraCor.sintomas): único caminho para o nível 4
// ---------------------------------------------------------------------------

export interface ResultadoSintomas {
  nivel: Nivel;
  entrada?: SintomaRegra;
}

/** Nível pelo maior sintoma relatado, ainda dentro da validade, que a configuração liga a este indicador. */
export function nivelPorSintomas(
  indicador: Indicador,
  sintomas: readonly SintomaRelatado[],
  regrasAtivas: readonly string[],
  agoraUtc: string,
): ResultadoSintomas {
  const resultado: ResultadoSintomas = { nivel: 0 };
  const entradas = indicador.regraCor.sintomas ?? [];
  for (const relatado of sintomas) {
    const idade = minutosEntre(relatado.instanteUtc, agoraUtc);
    if (idade < 0 || idade > indicador.validadeHoras * 60) continue;
    for (const ligacao of SINTOMA_POR_ID[relatado.sintomaId].ligacoes) {
      if (ligacao.indicadorId !== indicador.id) continue;
      for (const entrada of entradas) {
        if (!normalizarTexto(entrada.sintoma).includes(normalizarTexto(ligacao.trecho))) continue;
        if (entrada.aplicaSomenteEmRegra && !regrasAtivas.includes(entrada.aplicaSomenteEmRegra)) continue;
        if (entrada.nivel > resultado.nivel) {
          resultado.nivel = entrada.nivel;
          resultado.entrada = entrada;
        }
      }
    }
  }
  return resultado;
}

// ---------------------------------------------------------------------------
// Avaliação do indicador
// ---------------------------------------------------------------------------

export interface EntradaAvaliarIndicador {
  indicador: Indicador;
  /** `null` para indicador de ambiente. */
  tripulanteId: string | null;
  /** Leituras deste indicador para este tripulante (ou módulo). Outras são ignoradas pelo `indicadorId`. */
  leituras: readonly Leitura[];
  agoraUtc: string;
  sexo?: Sexo;
  diaDaMissao?: number;
  sintomas?: readonly SintomaRelatado[];
  /** Regras de cruzamento ativas para este tripulante ou módulo (ver `aplicaSomenteEmRegra`). */
  regrasAtivas?: readonly string[];
  /** Última leitura da grandeza pareada (temperatura e umidade da cabine). */
  leituraPareada?: Leitura;
}

const JANELA_MEDIA_MIN = 60;

function nivelDe(valor: number): Nivel {
  return valor as Nivel;
}

export function avaliarIndicador(entrada: EntradaAvaliarIndicador): EstadoIndicador {
  const { indicador, agoraUtc } = entrada;
  const regrasAtivas = entrada.regrasAtivas ?? [];
  const estado: EstadoIndicador = {
    indicadorId: indicador.id,
    tripulanteId: entrada.tripulanteId,
    nivel: 0,
    motivo: "sem_dado",
  };

  const candidatas = selecionarLeituras(entrada.leituras, { indicadorId: indicador.id, agoraUtc });
  const disponiveis = candidatas.filter(ehDisponivel);
  const ultima = disponiveis.at(-1);
  const pendente = candidatas.filter((l) => !ehDisponivel(l)).at(-1);
  if (pendente && (!ultima || paraMs(pendente.instanteUtc) > paraMs(ultima.instanteUtc))) {
    estado.leituraPendente = pendente;
  }

  // Sintoma de alarme não depende de haver leitura válida do indicador.
  const sintoma = nivelPorSintomas(indicador, entrada.sintomas ?? [], regrasAtivas, agoraUtc);
  const comSintoma = (e: EstadoIndicador): EstadoIndicador => {
    if (sintoma.entrada && sintoma.nivel > e.nivel) {
      e.nivel = sintoma.nivel;
      e.motivo = "sintoma";
      e.textoRegra = sintoma.entrada.texto;
      e.fonteUrl = sintoma.entrada.fonteUrl;
    }
    return e;
  };

  if (!ultima) {
    estado.motivo = candidatas.length > 0 ? "indisponivel" : "sem_dado";
    return comSintoma(estado);
  }

  estado.leitura = ultima;
  estado.idadeMin = Math.round(idadeEmMinutos(ultima, agoraUtc));
  if (!dentroDaValidade(ultima, indicador, agoraUtc)) {
    estado.motivo = "vencido";
    return comSintoma(estado);
  }
  const valor = valorNaUnidadeDoIndicador(ultima, indicador);
  if (valor === null) {
    estado.motivo = "indisponivel";
    return comSintoma(estado);
  }

  // Série na unidade do indicador, até a última leitura disponível.
  const serie: Leitura[] = disponiveis.map((l) => ({ ...l, valor: valorNaUnidadeDoIndicador(l, indicador) ?? l.valor }));
  const ctxBase: ContextoRegras = { regrasAtivas: [] };
  if (entrada.sexo) ctxBase.sexo = entrada.sexo;
  if (entrada.diaDaMissao !== undefined) ctxBase.diasNaMissao = entrada.diaDaMissao;
  if (ultima.contexto?.sitio) ctxBase.sitio = ultima.contexto.sitio;
  if (ultima.contexto?.frequenciaHz !== undefined) ctxBase.frequenciaHz = ultima.contexto.frequenciaHz;
  if (ultima.contexto?.bandas) ctxBase.bandas = ultima.contexto.bandas;
  if (entrada.leituraPareada) {
    const pareado = entrada.leituraPareada;
    ctxBase.valorPareado = pareado.valor;
  }

  // Linha de base pessoal (docs/04, A2 e A3).
  const parametrosBase = indicador.regraCor.linhaDeBase;
  let analise: AnaliseLinhaDeBase | undefined;
  if (parametrosBase && indicador.usaLinhaDeBase) {
    analise = analisarLinhaDeBase(serie, {
      minimo: parametrosBase.minimoLeiturasValidas,
      zAmarelo: parametrosBase.zAmarelo,
      zPersistente: parametrosBase.zPersistenteAcima,
      repeticoes: parametrosBase.repeticoesParaPersistente,
      direcao: indicador.direcao,
      emAtencao: (l) => avaliarRegrasCor(indicador, { instantaneo: l.valor }, ctxBase).nivel >= 2,
    });
  }

  // Valores sobre os quais as regras numéricas são avaliadas.
  const valores: ValoresEfetivos = { instantaneo: valor };
  const naUltimaHora = naJanela(serie, ultima.instanteUtc, JANELA_MEDIA_MIN);
  valores.media1h = naUltimaHora.reduce((soma, l) => soma + l.valor, 0) / naUltimaHora.length;
  valores.ewma = ewma(serie.map((l) => l.valor));
  if (analise?.baseDaUltima && analise.baseDaUltima.media !== 0) {
    valores.variacaoPct = variacaoPercentual(valor, analise.baseDaUltima.media);
  }

  const ctx: ContextoRegras = { ...ctxBase, regrasAtivas };
  const faixa = avaliarRegrasCor(indicador, valores, ctx);
  const limiteSemSintoma = indicador.regraCor.tipo === "somente_sintoma" ? 4 : Math.max(1, indicador.regraCor.nivelMaximoSemSintoma);
  const nivelFaixa = nivelDe(Math.min(faixa.nivel, limiteSemSintoma));

  let nivelBase: Nivel = 0;
  if (analise?.baseDaUltima && analise.zDaUltima !== undefined && parametrosBase) {
    nivelBase = nivelPorZScore(analise.zDaUltima, indicador.direcao, parametrosBase.zAmarelo);
    const z = Number.isFinite(analise.zDaUltima) ? analise.zDaUltima : undefined;
    estado.linhaDeBase = { media: analise.baseDaUltima.media, dp: analise.baseDaUltima.dp, n: analise.baseDaUltima.n };
    if (z !== undefined) estado.linhaDeBase.z = z;
    if (analise.persistente) estado.linhaDeBase.persistente = true;
  }

  // A cor final é o maior nível entre sintoma, faixa com fonte e desvio pessoal; empate, nessa ordem.
  const maior = Math.max(sintoma.nivel, nivelFaixa, nivelBase);
  estado.fonteUrl = indicador.fonte.url;

  if (maior <= 1 && faixa.avaliadas === 0 && faixa.semContexto > 0) {
    estado.motivo = "indisponivel";
    return estado;
  }
  if (maior >= 2) {
    if (sintoma.entrada && sintoma.nivel === maior) {
      estado.nivel = nivelDe(maior);
      estado.motivo = "sintoma";
      estado.textoRegra = sintoma.entrada.texto;
      estado.fonteUrl = sintoma.entrada.fonteUrl;
    } else if (faixa.regra && nivelFaixa === maior) {
      estado.nivel = nivelDe(maior);
      estado.motivo = "faixa";
      estado.textoRegra = faixa.regra.texto;
      estado.fonteUrl = faixa.regra.fonteUrl;
      if (faixa.regra.aplicaSomenteEmRegra) estado.regraAtivaId = faixa.regra.aplicaSomenteEmRegra;
    } else {
      estado.nivel = nivelDe(maior);
      estado.motivo = "linha_de_base";
      if (parametrosBase) estado.fonteUrl = parametrosBase.fonteUrl;
    }
    return estado;
  }

  estado.nivel = 1;
  estado.motivo = indicador.regraCor.regras.length > 0 ? "faixa" : "linha_de_base";
  return estado;
}
