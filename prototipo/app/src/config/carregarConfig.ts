/**
 * Carga e validação dos três JSON de `prototipo/config/` (decisão D3 do plano: o app importa os
 * arquivos no build, pelo alias `@config`; nada de cópia em `public/`). Nenhuma faixa nasce aqui:
 * se o JSON está errado, `carregarConfig()` falha com a lista de problemas em português.
 */

import indicadoresJson from "@config/indicadores.json";
import perfisJson from "@config/perfis-simulacao.rascunho.json";
import iaBaseJson from "@config/orbita-ia-base.json";

import { REGIAO_IDS, REGIOES } from "../domain/constantes";
import { SINTOMAS, normalizarTexto } from "../domain/sintomas";
import type { Indicador, RegraCruzamento } from "../domain/tipos";
import type { ArquivoIndicadores, ConfigOrbita, OrbitaIaBase, PerfisSimulacao } from "./tipos";

export const QTD_INDICADORES_ESPERADA = 37;
export const QTD_REGRAS_CRUZAMENTO_ESPERADA = 6;

export class ErroDeConfiguracao extends Error {
  readonly problemas: readonly string[];

  constructor(problemas: readonly string[]) {
    super(`Configuração inválida em prototipo/config (${problemas.length} problema(s)):\n- ${problemas.join("\n- ")}`);
    this.name = "ErroDeConfiguracao";
    this.problemas = problemas;
  }
}

function duplicados(ids: readonly string[]): string[] {
  const vistos = new Set<string>();
  const repetidos = new Set<string>();
  for (const id of ids) {
    if (vistos.has(id)) repetidos.add(id);
    vistos.add(id);
  }
  return [...repetidos];
}

const textoPreenchido = (valor: unknown): boolean => typeof valor === "string" && valor.trim().length > 0;

/** Todos os problemas encontrados nos três arquivos; lista vazia quer dizer que a configuração é válida. */
export function validarConfig(
  arquivo: ArquivoIndicadores,
  perfis: PerfisSimulacao,
  iaBase: OrbitaIaBase,
): string[] {
  const problemas: string[] = [];
  const { indicadores, regrasCruzamento } = arquivo;

  if (indicadores.length !== QTD_INDICADORES_ESPERADA) {
    problemas.push(`indicadores.json deveria ter ${QTD_INDICADORES_ESPERADA} indicadores e tem ${indicadores.length}.`);
  }
  if (regrasCruzamento.length !== QTD_REGRAS_CRUZAMENTO_ESPERADA) {
    problemas.push(
      `indicadores.json deveria ter ${QTD_REGRAS_CRUZAMENTO_ESPERADA} regras de cruzamento e tem ${regrasCruzamento.length}.`,
    );
  }

  for (const id of duplicados(indicadores.map((i) => i.id))) problemas.push(`Indicador com id repetido: "${id}".`);
  for (const id of duplicados(regrasCruzamento.map((r) => r.id))) {
    problemas.push(`Regra de cruzamento com id repetido: "${id}".`);
  }
  for (const id of duplicados(perfis.indicadores.map((i) => i.indicadorId))) {
    problemas.push(`perfis-simulacao: indicador repetido: "${id}".`);
  }
  for (const id of duplicados(perfis.tripulantesFicticios.lista.map((t) => t.id))) {
    problemas.push(`perfis-simulacao: tripulante fictício repetido: "${id}".`);
  }
  for (const id of duplicados(iaBase.entradas.map((e) => e.id))) problemas.push(`orbita-ia-base: entrada repetida: "${id}".`);

  const idsIndicadores = new Set(indicadores.map((i) => i.id));
  const regioesValidas = new Set<string>([...REGIAO_IDS, "ambiente"]);

  for (const indicador of indicadores) {
    const onde = `Indicador "${indicador.id}"`;
    if (!textoPreenchido(indicador.unidade)) problemas.push(`${onde} sem unidade.`);
    if (!textoPreenchido(indicador.fonte?.url) || !textoPreenchido(indicador.fonte?.referencia)) {
      problemas.push(`${onde} sem fonte (referência e url).`);
    }
    if (!regioesValidas.has(indicador.regiaoCorpo)) {
      problemas.push(`${onde} aponta para a região desconhecida "${indicador.regiaoCorpo}".`);
    }
    if (!(indicador.validadeHoras > 0)) problemas.push(`${onde} sem validadeHoras positiva.`);
    if (!indicador.regraCor) {
      problemas.push(`${onde} sem regraCor.`);
      continue;
    }
    indicador.regraCor.regras.forEach((regra, posicao) => {
      const regraOnde = `${onde}, regraCor.regras[${posicao}] (${regra.operador})`;
      if (!textoPreenchido(regra.fonteUrl)) problemas.push(`${regraOnde} sem fonteUrl.`);
      if (!textoPreenchido(regra.unidade)) problemas.push(`${regraOnde} sem unidade.`);
      if (!textoPreenchido(regra.origem)) problemas.push(`${regraOnde} sem origem.`);
      if (!textoPreenchido(regra.texto)) problemas.push(`${regraOnde} sem texto.`);
      if (regra.nivel < 2 || regra.nivel > 3) {
        problemas.push(`${regraOnde} com nível ${regra.nivel}: regra numérica só propõe 2 (amarelo) ou 3 (laranja).`);
      }
      if (regra.aplicaSomenteEmRegra && !regrasCruzamento.some((r) => r.id === regra.aplicaSomenteEmRegra)) {
        problemas.push(`${regraOnde} vale só na regra "${regra.aplicaSomenteEmRegra}", que não existe.`);
      }
    });
    for (const sintoma of indicador.regraCor.sintomas ?? []) {
      if (!textoPreenchido(sintoma.fonteUrl)) problemas.push(`${onde}: sintoma "${sintoma.sintoma}" sem fonteUrl.`);
    }
    if (indicador.regraCor.tipo === "linha_de_base" && !indicador.regraCor.linhaDeBase) {
      problemas.push(`${onde} é do tipo linha_de_base e não traz os parâmetros regraCor.linhaDeBase.`);
    }
    if (indicador.regraCor.linhaDeBase && !indicador.regraCor.linhaDeBase.nuncaVermelho) {
      problemas.push(`${onde}: a linha de base nunca gera vermelho (nuncaVermelho precisa ser true).`);
    }
  }

  for (const regra of regrasCruzamento) {
    const onde = `Regra "${regra.id}"`;
    if (!textoPreenchido(regra.fonte?.url) || !textoPreenchido(regra.fonte?.referencia)) {
      problemas.push(`${onde} sem fonte (referência e url).`);
    }
    if (!textoPreenchido(regra.hipotese)) problemas.push(`${onde} sem hipótese.`);
    if (!regra.orientacoes?.amarelo?.length) problemas.push(`${onde} sem orientações (o que fazer).`);
    if (!textoPreenchido(regra.orientacoes?.gatilhoParaSubir)) problemas.push(`${onde} sem gatilhoParaSubir.`);
  }

  for (const perfil of perfis.indicadores) {
    if (!idsIndicadores.has(perfil.indicadorId)) {
      problemas.push(`perfis-simulacao: indicador "${perfil.indicadorId}" não existe em indicadores.json.`);
    }
  }
  for (const tripulante of perfis.tripulantesFicticios.lista) {
    for (const indicadorId of Object.keys(tripulante.linhaDeBase)) {
      if (!idsIndicadores.has(indicadorId)) {
        problemas.push(`perfis-simulacao: ${tripulante.id} tem linha de base de "${indicadorId}", que não existe.`);
      }
    }
  }
  for (const entrada of iaBase.entradas) {
    for (const indicadorId of entrada.indicadores) {
      if (!idsIndicadores.has(indicadorId)) {
        problemas.push(`orbita-ia-base: a entrada "${entrada.id}" cita o indicador desconhecido "${indicadorId}".`);
      }
    }
    for (const regiao of entrada.regioes) {
      if (!REGIAO_IDS.includes(regiao as (typeof REGIAO_IDS)[number])) {
        problemas.push(`orbita-ia-base: a entrada "${entrada.id}" cita a região desconhecida "${regiao}".`);
      }
    }
  }

  // As regiões fixas do domínio precisam bater com o `regiaoCorpo` do JSON.
  for (const regiao of REGIOES) {
    const doJson = indicadores
      .filter((i) => i.escopo === "tripulante" && i.regiaoCorpo === regiao.id)
      .map((i) => i.id)
      .sort();
    const fixos = [...regiao.indicadores].sort();
    if (doJson.join() !== fixos.join()) {
      problemas.push(
        `REGIOES["${regiao.id}"] lista [${fixos.join(", ")}] e o indicadores.json liga [${doJson.join(", ")}] a essa região.`,
      );
    }
  }

  // Cada ligação sintoma → indicador precisa existir em regraCor.sintomas, exatamente uma vez.
  for (const sintoma of SINTOMAS) {
    for (const ligacao of sintoma.ligacoes) {
      const indicador = indicadores.find((i) => i.id === ligacao.indicadorId);
      const achadas = (indicador?.regraCor.sintomas ?? []).filter((s) =>
        normalizarTexto(s.sintoma).includes(normalizarTexto(ligacao.trecho)),
      );
      if (achadas.length !== 1) {
        problemas.push(
          `Sintoma "${sintoma.id}": o trecho "${ligacao.trecho}" casa com ${achadas.length} entrada(s) de regraCor.sintomas de "${ligacao.indicadorId}" (esperado: 1).`,
        );
      }
    }
  }

  return problemas;
}

function indexarPorId<T extends { id: string }>(itens: readonly T[]): Record<string, T> {
  return Object.fromEntries(itens.map((i) => [i.id, i]));
}

let emCache: ConfigOrbita | undefined;

/** Importa os três JSON de `@config`, valida e devolve tudo tipado. Lança `ErroDeConfiguracao` se algo falhar. */
export function carregarConfig(): ConfigOrbita {
  if (emCache) return emCache;

  const arquivo = indicadoresJson as unknown as ArquivoIndicadores;
  const perfis = perfisJson as unknown as PerfisSimulacao;
  const iaBase = iaBaseJson as unknown as OrbitaIaBase;

  const problemas = validarConfig(arquivo, perfis, iaBase);
  if (problemas.length > 0) throw new ErroDeConfiguracao(problemas);

  const indicadores: Indicador[] = arquivo.indicadores;
  const regrasCruzamento: RegraCruzamento[] = arquivo.regrasCruzamento;
  emCache = {
    indicadores,
    indicadorPorId: indexarPorId(indicadores),
    regrasCruzamento,
    regraPorId: indexarPorId(regrasCruzamento),
    perfis,
    iaBase,
  };
  return emCache;
}
