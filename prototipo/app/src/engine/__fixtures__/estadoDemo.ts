/**
 * Estado da demonstração, escrito à mão: é o `EstadoMissao` que as telas usam até o motor real
 * ficar pronto, e o gabarito contra o qual o motor é conferido (`__tests__/demo.test.ts`).
 *
 * Conta a história do `docs/19`, seção 14, e do `docs/18`, seção 5, no relógio `AGORA_DEMO`
 * (GMT 319 / 06:40, dia 45 da ISS EXP-01):
 * - Astronauta 001 em atenção: três amarelos no corpo (frequência cardíaca de 86 bpm contra o padrão
 *   de 64, sono de 5,4 h contra 7,5 h, fadiga de 6 de 7 contra 2), região Cabeça e cérebro e Coração
 *   amarelas pelos indicadores e Pulmões amarela pelo alerta R-CO2-01;
 * - ambiente do Node 3: CO2 de 2,95 mmHg (atenção pelo alerta) e O2 (PIO2) de 18,84 kPa em amarelo;
 *   pressão de 101,0 kPa, prótons de 0,21 pfu e Kp 1 em verde;
 * - Tripulantes A, B e C em "Saúde: normal", com os consentimentos de B (só o estado) e C (sem a mente).
 *
 * Origem dos dados: `simulada`, exceto o que é real gravado (`historica`: PIO2, pressão, prótons, Kp).
 * Horários relativos ao relógio da demonstração, como pede o `docs/18`, seção 5.3; o instante da
 * amostra real fica em `conjuntoDados`.
 */

import { carregarConfig } from "../../config/carregarConfig";
import type {
  BlocoTripulacao,
  EstadoIndicador,
  EstadoMissao,
  EstadoTripulante,
  EstadoTripulanteVisivel,
  MotivoEstado,
  Nivel,
} from "../../domain/estado";
import { AGORA_DEMO, INICIO_MISSAO_DEMO } from "../../domain/tempo";
import type { Alerta, Autoavaliacao, Consentimento, Leitura, Missao, Modulo, Tripulante } from "../../domain/tipos";

// --- cadastro -----------------------------------------------------------------------------------

export const missaoDemo: Missao = {
  id: "iss-exp-01",
  nome: "ISS EXP-01 (simulada)",
  plataforma: "ISS",
  inicioUtc: INICIO_MISSAO_DEMO,
  atrasoComunicacaoSeg: 1,
};

export const modulosDemo: Modulo[] = [
  { id: "node1", nome: "Node 1 (Unity)", segmento: "USOS" },
  { id: "node2", nome: "Node 2 (Harmony)", segmento: "USOS" },
  { id: "node3", nome: "Node 3 (Tranquility)", segmento: "USOS" },
  { id: "us_lab", nome: "Lab (Destiny)", segmento: "USOS" },
];

const consentimento = (dado: Consentimento["dado"], audiencia: Consentimento["audiencia"]): Consentimento => ({
  dado,
  audiencia,
  atualizadoUtc: INICIO_MISSAO_DEMO,
});

/** Todo tripulante da demonstração deixa o estado dos sistemas com o CMO e o médico de voo (padrão do `docs/06`). */
const PADRAO_CMO_E_MEDICO: Consentimento[] = [
  consentimento("estado_sistemas", "cmo"),
  consentimento("estado_sistemas", "medico_voo"),
];

export const tripulantesDemo: Tripulante[] = [
  {
    id: "astro-001",
    codinome: "Astronauta 001",
    funcao: "Especialista de missão",
    agencia: "NASA",
    massaPreVooKg: 78,
    sexo: "masculino",
    alturaCm: 180,
    perfilSonoro: "mata-atlantica",
    usaOculosOrbit: true,
    horarioSono: { inicio: "21:30", fim: "06:00" },
    moduloAtual: "node3",
    compartilhamento: [
      ...PADRAO_CMO_E_MEDICO,
      consentimento("estado_sistemas", "tripulacao"),
      consentimento("valores", "tripulacao"),
      consentimento("modulo", "tripulacao"),
      consentimento("mente", "tripulacao"),
    ],
  },
  {
    id: "trip-a",
    codinome: "Tripulante A",
    funcao: "Comandante",
    agencia: "NASA",
    massaPreVooKg: 62.3,
    sexo: "feminino",
    alturaCm: 168,
    perfilSonoro: "mata-atlantica",
    usaOculosOrbit: false,
    horarioSono: { inicio: "21:30", fim: "06:00" },
    moduloAtual: "us_lab",
    compartilhamento: [
      ...PADRAO_CMO_E_MEDICO,
      consentimento("estado_sistemas", "tripulacao"),
      consentimento("valores", "tripulacao"),
      consentimento("modulo", "tripulacao"),
      consentimento("mente", "tripulacao"),
    ],
  },
  {
    id: "trip-b",
    codinome: "Tripulante B",
    funcao: "Engenheiro de voo",
    agencia: "NASA",
    massaPreVooKg: 91,
    sexo: "masculino",
    alturaCm: 182,
    perfilSonoro: "mata-atlantica",
    usaOculosOrbit: false,
    horarioSono: { inicio: "21:30", fim: "06:00" },
    moduloAtual: "node2",
    compartilhamento: [...PADRAO_CMO_E_MEDICO, consentimento("estado_sistemas", "tripulacao")],
  },
  {
    id: "trip-c",
    codinome: "Tripulante C",
    funcao: "Engenheira de voo",
    agencia: "NASA",
    massaPreVooKg: 71.7,
    sexo: "feminino",
    alturaCm: 170,
    perfilSonoro: "mata-atlantica",
    usaOculosOrbit: false,
    horarioSono: { inicio: "21:30", fim: "06:00" },
    moduloAtual: "node1",
    compartilhamento: [
      ...PADRAO_CMO_E_MEDICO,
      consentimento("estado_sistemas", "tripulacao"),
      consentimento("valores", "tripulacao"),
      consentimento("modulo", "tripulacao"),
    ],
  },
];

/** Check-in das 06:00 do Astronauta 001, com "Dificuldade de concentração" marcado (segunda condição do R-CO2-01). */
export const checkinDemo: Autoavaliacao = {
  id: "chk-astro-001-0600",
  tripulanteId: "astro-001",
  instanteUtc: "2026-11-15T06:00:00Z",
  tipo: "checkin",
  respostas: { fadiga: 6, humor: 3, sintomas: ["dificuldade_concentracao"] },
  leiturasGeradas: [
    "lei-astro-001-sono_tst",
    "lei-astro-001-fadiga",
    "lei-astro-001-humor",
    "lei-astro-001-agua_ingerida",
    "lei-astro-001-apetite",
  ],
};

// --- construtores locais (só estrutura; todo valor abaixo é escolhido à mão) -----------------------

const CHECKIN = "2026-11-15T06:00:00Z";
const KIT = "2026-11-15T06:10:00Z";
const VESTIVEL = "2026-11-15T06:30:00Z";
const TESTES_FD39 = "2026-11-09T08:00:00Z";
const HEMOGRAMA_FD23 = "2026-10-24T08:00:00Z";
const HEMOGRAMA_FD38 = "2026-11-08T08:00:00Z";

const config = carregarConfig();
const urlDaFonte = (indicadorId: string): string => config.indicadorPorId[indicadorId]?.fonte.url ?? "";
const URL_LINHA_DE_BASE = "../../docs/04-cruzamento-de-dados.md";

function leitura(
  tripulanteId: string,
  indicadorId: string,
  valor: number,
  unidade: string,
  instanteUtc: string,
  extras: Partial<Leitura> = {},
): Leitura {
  return {
    id: `lei-${tripulanteId}-${indicadorId}`,
    indicadorId,
    valor,
    unidade,
    instanteUtc,
    tripulanteId,
    origem: "simulada",
    qualidade: "boa",
    disponibilidade: "disponivel",
    conjuntoDados: `demo-${tripulanteId}`,
    ...extras,
  };
}

function estado(
  tripulanteId: string | null,
  indicadorId: string,
  nivel: Nivel,
  motivo: MotivoEstado,
  extras: Partial<EstadoIndicador> = {},
): EstadoIndicador {
  return { indicadorId, tripulanteId, nivel, motivo, ...extras };
}

/** Indicador de tripulante e de ambiente que não tem leitura na demonstração: cinza, "sem dado". */
const semDado = (tripulanteId: string | null, indicadorId: string): EstadoIndicador =>
  estado(tripulanteId, indicadorId, 0, "sem_dado");

const IDS_DO_CORPO = config.indicadores.filter((i) => i.escopo === "tripulante").map((i) => i.id);
const IDS_DO_AMBIENTE = config.indicadores.filter((i) => i.escopo === "ambiente").map((i) => i.id);

/** Completa com "sem dado" tudo que não foi escrito à mão, na ordem do `indicadores.json`. */
function completar(
  tripulanteId: string | null,
  ids: readonly string[],
  escritos: readonly EstadoIndicador[],
): Record<string, EstadoIndicador> {
  const porId = new Map(escritos.map((e) => [e.indicadorId, e]));
  return Object.fromEntries(ids.map((id) => [id, porId.get(id) ?? semDado(tripulanteId, id)]));
}

// --- Astronauta 001 -------------------------------------------------------------------------------

const A001 = "astro-001";

const indicadoresAstro001: EstadoIndicador[] = [
  // Amarelos pelo desvio do padrão pessoal: nunca passam de amarelo por si sós.
  estado(A001, "fc_repouso", 2, "linha_de_base", {
    leitura: leitura(A001, "fc_repouso", 86, "bpm", VESTIVEL),
    idadeMin: 10,
    linhaDeBase: { media: 64, dp: 2.83, n: 7, z: 7.78 },
    fonteUrl: URL_LINHA_DE_BASE,
  }),
  estado(A001, "sono_tst", 2, "linha_de_base", {
    leitura: leitura(A001, "sono_tst", 324, "min", CHECKIN),
    idadeMin: 40,
    linhaDeBase: { media: 450, dp: 8.17, n: 7, z: -15.43 },
    fonteUrl: URL_LINHA_DE_BASE,
  }),
  estado(A001, "fadiga", 2, "linha_de_base", {
    leitura: leitura(A001, "fadiga", 6, "pontos", CHECKIN),
    idadeMin: 40,
    linhaDeBase: { media: 2, dp: 0.58, n: 7, z: 6.93 },
    fonteUrl: URL_LINHA_DE_BASE,
  }),
  // Verdes com linha de base pronta.
  estado(A001, "spo2", 1, "faixa", {
    leitura: leitura(A001, "spo2", 97, "%", VESTIVEL),
    idadeMin: 10,
    linhaDeBase: { media: 97.14, dp: 0.69, n: 7, z: -0.21 },
    fonteUrl: urlDaFonte("spo2"),
  }),
  estado(A001, "humor", 1, "linha_de_base", {
    leitura: leitura(A001, "humor", 3, "pontos", CHECKIN),
    idadeMin: 40,
    linhaDeBase: { media: 4, dp: 0.58, n: 7, z: -1.73 },
    fonteUrl: urlDaFonte("humor"),
  }),
  estado(A001, "eog_piscadas", 1, "linha_de_base", {
    leitura: leitura(A001, "eog_piscadas", 12.4, "piscadas/min", VESTIVEL, { dispositivoId: "oculos-orbit-simulado" }),
    idadeMin: 10,
    linhaDeBase: { media: 12.73, dp: 0.58, n: 7, z: -0.57 },
    fonteUrl: urlDaFonte("eog_piscadas"),
  }),
  estado(A001, "agua_ingerida", 1, "faixa", {
    leitura: leitura(A001, "agua_ingerida", 1800, "mL", CHECKIN),
    idadeMin: 40,
    linhaDeBase: { media: 1985.71, dp: 134.52, n: 7, z: -1.38 },
    fonteUrl: urlDaFonte("agua_ingerida"),
  }),
  estado(A001, "apetite", 1, "linha_de_base", {
    leitura: leitura(A001, "apetite", 2, "categoria", CHECKIN),
    idadeMin: 40,
    linhaDeBase: { media: 1.29, dp: 0.49, n: 7, z: 1.46 },
    fonteUrl: urlDaFonte("apetite"),
  }),
  estado(A001, "pvt_tempo_reacao", 1, "faixa", {
    leitura: leitura(A001, "pvt_tempo_reacao", 268, "ms", TESTES_FD39),
    idadeMin: 8560,
    linhaDeBase: { media: 270, dp: 3.87, n: 7, z: -0.52 },
    fonteUrl: urlDaFonte("pvt_tempo_reacao"),
  }),
  // Verdes com a linha de base ainda em formação (menos de 7 leituras): vale só a faixa com fonte.
  estado(A001, "pa_sistolica", 1, "faixa", {
    leitura: leitura(A001, "pa_sistolica", 120, "mmHg", KIT),
    idadeMin: 30,
    fonteUrl: urlDaFonte("pa_sistolica"),
  }),
  estado(A001, "pa_diastolica", 1, "faixa", {
    leitura: leitura(A001, "pa_diastolica", 80, "mmHg", KIT),
    idadeMin: 30,
    fonteUrl: urlDaFonte("pa_diastolica"),
  }),
  estado(A001, "glicose", 1, "faixa", {
    leitura: leitura(A001, "glicose", 90, "mg/dL", KIT),
    idadeMin: 30,
    fonteUrl: urlDaFonte("glicose"),
  }),
  estado(A001, "temperatura_corporal", 1, "faixa", {
    leitura: leitura(A001, "temperatura_corporal", 36.8, "°C", KIT),
    idadeMin: 30,
    fonteUrl: urlDaFonte("temperatura_corporal"),
  }),
  estado(A001, "tempo_exercicio", 1, "linha_de_base", {
    leitura: leitura(A001, "tempo_exercicio", 120, "min", KIT),
    idadeMin: 30,
    fonteUrl: urlDaFonte("tempo_exercicio"),
  }),
  estado(A001, "massa_corporal", 1, "linha_de_base", {
    leitura: leitura(A001, "massa_corporal", 78, "kg", KIT),
    idadeMin: 30,
    fonteUrl: urlDaFonte("massa_corporal"),
  }),
  estado(A001, "pvt_lapsos", 1, "linha_de_base", {
    leitura: leitura(A001, "pvt_lapsos", 1, "eventos", TESTES_FD39),
    idadeMin: 8560,
    fonteUrl: urlDaFonte("pvt_lapsos"),
  }),
  estado(A001, "acuidade_perto", 1, "linha_de_base", {
    leitura: leitura(A001, "acuidade_perto", 0, "logMAR", TESTES_FD39),
    idadeMin: 8560,
    fonteUrl: urlDaFonte("acuidade_perto"),
  }),
  estado(A001, "amsler_distorcao", 1, "linha_de_base", {
    leitura: leitura(A001, "amsler_distorcao", 0, "resposta", TESTES_FD39),
    idadeMin: 8560,
    fonteUrl: urlDaFonte("amsler_distorcao"),
  }),
  estado(A001, "dose_acumulada", 1, "faixa", {
    leitura: leitura(A001, "dose_acumulada", 18.9, "mSv", VESTIVEL, { dispositivoId: "radiacao-simulada" }),
    idadeMin: 10,
    fonteUrl: urlDaFonte("dose_acumulada"),
  }),
  // Hemograma: o resultado do FD 23 já passou da validade de 15 dias (vira cinza, com a idade do dado,
  // sem virar verde) e a amostra do FD 38 está a caminho da Terra.
  estado(A001, "hemoglobina", 0, "vencido", {
    leitura: leitura(A001, "hemoglobina", 14.8, "g/dL", HEMOGRAMA_FD23, { origem: "exame", protocolo: "hemograma FD 23" }),
    idadeMin: 31600,
    leituraPendente: leitura(A001, "hemoglobina_fd38", 0, "g/dL", HEMOGRAMA_FD38, {
      indicadorId: "hemoglobina",
      disponibilidade: "pendente_laboratorio",
      origem: "exame",
      protocolo: "hemograma FD 38 (amostra coletada, análise na Terra)",
    }),
  }),
];

const regioesAstro001: Record<string, Nivel> = {
  cerebro: 2,
  olhos: 1,
  ouvidos: 0,
  vestibular: 0,
  coracao: 2,
  pulmoes: 2, // pelo alerta R-CO2-01; a SpO2 de 97 % está normal
  sangue: 1,
  digestao: 1,
  rins: 1,
  ossos: 0,
  musculos: 1,
  corpo: 1,
};

const blocosAstro001: EstadoTripulante["blocos"] = {
  coracao: { nivel: 2, indicadorId: "fc_repouso" },
  oxigenacao: { nivel: 1, indicadorId: "spo2" },
  temperatura: { nivel: 1, indicadorId: "temperatura_corporal" },
  sono: { nivel: 2, indicadorId: "sono_tst" },
  hidratacao: { nivel: 1, indicadorId: "agua_ingerida" },
  radiacao: { nivel: 1, indicadorId: "dose_acumulada" },
  mente: { nivel: 2, indicadorId: "fadiga" },
};

const estadoAstro001: EstadoTripulante = {
  tripulanteId: A001,
  nivelGeral: 2,
  nivelGeralSemMente: 2,
  moduloId: "node3",
  indicadores: completar(A001, IDS_DO_CORPO, indicadoresAstro001),
  regioes: regioesAstro001,
  blocos: blocosAstro001,
};

// --- Tripulantes A, B e C: normais, com as linhas de base do perfis-simulacao.rascunho.json ----------

interface ValoresDoColega {
  fc: number;
  spo2: number;
  temperatura: number;
  sono: number;
  agua: number;
}

function estadoDoColega(id: string, moduloId: string, v: ValoresDoColega): EstadoTripulante {
  const indicadores: EstadoIndicador[] = [
    estado(id, "fc_repouso", 1, "faixa", {
      leitura: leitura(id, "fc_repouso", v.fc, "bpm", VESTIVEL),
      idadeMin: 10,
      fonteUrl: urlDaFonte("fc_repouso"),
    }),
    estado(id, "spo2", 1, "faixa", {
      leitura: leitura(id, "spo2", v.spo2, "%", VESTIVEL),
      idadeMin: 10,
      fonteUrl: urlDaFonte("spo2"),
    }),
    estado(id, "temperatura_corporal", 1, "faixa", {
      leitura: leitura(id, "temperatura_corporal", v.temperatura, "°C", KIT),
      idadeMin: 30,
      fonteUrl: urlDaFonte("temperatura_corporal"),
    }),
    estado(id, "sono_tst", 1, "linha_de_base", {
      leitura: leitura(id, "sono_tst", v.sono, "min", CHECKIN),
      idadeMin: 40,
      fonteUrl: urlDaFonte("sono_tst"),
    }),
    estado(id, "agua_ingerida", 1, "faixa", {
      leitura: leitura(id, "agua_ingerida", v.agua, "mL", CHECKIN),
      idadeMin: 40,
      fonteUrl: urlDaFonte("agua_ingerida"),
    }),
    estado(id, "dose_acumulada", 1, "faixa", {
      leitura: leitura(id, "dose_acumulada", 18.9, "mSv", VESTIVEL, { dispositivoId: "radiacao-simulada" }),
      idadeMin: 10,
      fonteUrl: urlDaFonte("dose_acumulada"),
    }),
    estado(id, "fadiga", 1, "linha_de_base", {
      leitura: leitura(id, "fadiga", 2, "pontos", CHECKIN),
      idadeMin: 40,
      fonteUrl: urlDaFonte("fadiga"),
    }),
    estado(id, "humor", 1, "linha_de_base", {
      leitura: leitura(id, "humor", 4, "pontos", CHECKIN),
      idadeMin: 40,
      fonteUrl: urlDaFonte("humor"),
    }),
  ];
  return {
    tripulanteId: id,
    nivelGeral: 1,
    nivelGeralSemMente: 1,
    moduloId,
    indicadores: completar(id, IDS_DO_CORPO, indicadores),
    regioes: {
      cerebro: 1,
      olhos: 0,
      ouvidos: 0,
      vestibular: 0,
      coracao: 1,
      pulmoes: 1,
      sangue: 0,
      digestao: 0,
      rins: 1,
      ossos: 0,
      musculos: 0,
      corpo: 1,
    },
    blocos: {
      coracao: { nivel: 1, indicadorId: "fc_repouso" },
      oxigenacao: { nivel: 1, indicadorId: "spo2" },
      temperatura: { nivel: 1, indicadorId: "temperatura_corporal" },
      sono: { nivel: 1, indicadorId: "sono_tst" },
      hidratacao: { nivel: 1, indicadorId: "agua_ingerida" },
      radiacao: { nivel: 1, indicadorId: "dose_acumulada" },
      mente: { nivel: 1, indicadorId: "fadiga" },
    },
  };
}

// --- ambiente ---------------------------------------------------------------------------------------

const REAL_GRAVADO = "isslive-2026-11-15T06:14Z";

function leituraAmbiente(
  moduloId: string | null,
  indicadorId: string,
  valor: number,
  unidade: string,
  instanteUtc: string,
  extras: Partial<Leitura>,
): Leitura {
  const dono = moduloId ?? "estacao";
  const { tripulanteId: _semTripulante, ...base } = leitura(dono, indicadorId, valor, unidade, instanteUtc, extras);
  return moduloId === null ? base : { ...base, moduloId };
}

const co2Node3 = leituraAmbiente("node3", "ppco2_modulo", 2.95, "mmHg", "2026-11-15T06:40:00Z", {
  conjuntoDados: "cenario-C1",
  dispositivoId: "eclss-node3",
});
const pio2Node3 = leituraAmbiente("node3", "pio2_cabine", 18.84, "kPa", "2026-11-15T06:30:00Z", {
  origem: "historica",
  conjuntoDados: REAL_GRAVADO,
  dispositivoId: "eclss-node3",
  valorOriginal: 150.67,
  unidadeOriginal: "mmHg",
  protocolo: "PIO2 = (757,64 menos 47) x 150,67 / 757,64 = 141,3 mmHg (ppO2 NODE3000001, pressão total USLAB000058)",
});
const pressaoUsLab = leituraAmbiente("us_lab", "pressao_cabine", 101.0, "kPa", "2026-11-15T06:30:00Z", {
  origem: "historica",
  conjuntoDados: REAL_GRAVADO,
  dispositivoId: "eclss-us-lab",
  valorOriginal: 757.6,
  unidadeOriginal: "mmHg",
});
const protonsGoes = leituraAmbiente(null, "fluxo_protons_goes", 0.21, "pfu", "2026-11-15T06:35:00Z", {
  origem: "historica",
  conjuntoDados: "noaa-integral-protons-7-day:2026-11-15T05:35Z",
});
const kpNoaa = leituraAmbiente(null, "kp", 1, "adimensional", "2026-11-15T06:35:00Z", {
  origem: "historica",
  conjuntoDados: "noaa-planetary-k-index-1m:2026-11-15T05:35Z",
});

const estadoCo2Node3 = estado(null, "ppco2_modulo", 2, "faixa", {
  leitura: co2Node3,
  idadeMin: 0,
  textoRegra: "Acima de 2,8 mmHg: marcador amarelo demonstrativo somente em R-CO2-01, abaixo do requisito de 3 mmHg.",
  fonteUrl: "../../docs/04-cruzamento-de-dados.md",
  regraAtivaId: "R-CO2-01",
});
const estadoPio2Node3 = estado(null, "pio2_cabine", 2, "faixa", {
  leitura: pio2Node3,
  idadeMin: 10,
  textoRegra:
    "Fora do alvo de normoxia de 145 a 155 mmHg, dentro dos limites de exposição: conferir sensor e módulo e acompanhar a tendência com o controle ambiental.",
  fonteUrl: "https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-002-eclss.pdf",
});
const estadoPressaoUsLab = estado(null, "pressao_cabine", 1, "faixa", {
  leitura: pressaoUsLab,
  idadeMin: 10,
  fonteUrl: urlDaFonte("pressao_cabine"),
});
const estadoProtons = estado(null, "fluxo_protons_goes", 1, "faixa", {
  leitura: protonsGoes,
  idadeMin: 5,
  fonteUrl: urlDaFonte("fluxo_protons_goes"),
});
const estadoKp = estado(null, "kp", 1, "linha_de_base", {
  leitura: kpNoaa,
  idadeMin: 5,
  fonteUrl: urlDaFonte("kp"),
});

const ambiente = completar(null, IDS_DO_AMBIENTE, [
  estadoCo2Node3,
  estadoPio2Node3,
  estadoPressaoUsLab,
  estadoProtons,
  estadoKp,
]);

// --- alerta R-CO2-01 ---------------------------------------------------------------------------------

const alertaCo2: Alerta = {
  id: "R-CO2-01.astro-001.node3",
  nivel: 2,
  tipo: "cruzamento",
  regraId: "R-CO2-01",
  tripulanteId: A001,
  moduloId: "node3",
  regioes: ["pulmoes"],
  titulo: "Possível efeito de CO2 elevado no Node 3",
  evidencias: [
    {
      leituraId: co2Node3.id,
      indicadorId: "ppco2_modulo",
      campo: "ewma_ppco2",
      valor: 2.94,
      unidade: "mmHg",
      nivel: 2,
      instanteUtc: "2026-11-15T06:40:00Z",
      origem: "simulada",
    },
    {
      leituraId: co2Node3.id,
      indicadorId: "ppco2_modulo",
      campo: "media_1h_ppco2",
      valor: 2.95,
      unidade: "mmHg",
      nivel: 1,
      instanteUtc: "2026-11-15T06:40:00Z",
      origem: "simulada",
    },
    {
      autoavaliacaoId: checkinDemo.id,
      indicadorId: "sintomas_checkin",
      campo: "dificuldade_concentracao",
      valor: "relatado",
      unidade: "sintoma do check-in",
      nivel: 2,
      instanteUtc: "2026-11-15T06:00:00Z",
      origem: "manual",
    },
  ],
  orientacoes: [
    "Confira módulo, sensor e ventilação; se autorizado, vá para módulo com leitura menor; repita PVT em 2 h conforme o plano e avise controle ambiental e CMO.",
  ],
  gatilhoParaSubir: "Cefaleia intensa, tontura associada ou limite crítico oficial ou aprovado.",
  orientacaoColega: "Ofereça acompanhar a pessoa ou avisar o controle ambiental.",
  fonte: {
    etiqueta: "[INFERÊNCIA] + [OFICIAL]",
    referencia: "Regra em docs/04; OCHMO-TB-004 para relação entre CO2 e sintomas",
    url: "https://www.nasa.gov/ochmo-tb-004-carbon-dioxide-2/",
  },
  estado: "aberto",
  notificacoes: [
    { destino: "tripulante", estado: "enviado" },
    { destino: "cmo", estado: "na_fila" },
    { destino: "controle_ambiental", estado: "na_fila" },
    { destino: "medico_voo", estado: "na_fila" },
  ],
  criadoUtc: "2026-11-15T06:00:00Z",
  atualizadoUtc: AGORA_DEMO,
  // R-AMB-01: fatores ambientais possíveis para a dificuldade de concentração.
  fatoresAmbientais: [
    {
      leituraId: co2Node3.id,
      indicadorId: "ppco2_modulo",
      campo: "fator_de_dificuldade_concentracao",
      valor: 2.95,
      unidade: "mmHg",
      nivel: 2,
      instanteUtc: "2026-11-15T06:40:00Z",
      origem: "simulada",
    },
    {
      leituraId: "lei-astro-001-sono_tst",
      indicadorId: "sono_tst",
      campo: "fator_de_dificuldade_concentracao",
      valor: 324,
      unidade: "min",
      nivel: 2,
      instanteUtc: "2026-11-15T06:00:00Z",
      origem: "simulada",
    },
  ],
  // Também diferentes do padrão pessoal hoje, sem disparar a regra.
  contextoDoDia: [
    {
      leituraId: "lei-astro-001-fc_repouso",
      indicadorId: "fc_repouso",
      campo: "contexto_do_dia",
      valor: 86,
      unidade: "bpm",
      nivel: 2,
      instanteUtc: "2026-11-15T06:30:00Z",
      origem: "simulada",
    },
    {
      leituraId: "lei-astro-001-fadiga",
      indicadorId: "fadiga",
      campo: "contexto_do_dia",
      valor: 6,
      unidade: "pontos",
      nivel: 2,
      instanteUtc: "2026-11-15T06:00:00Z",
      origem: "simulada",
    },
  ],
};

// --- EstadoMissao -------------------------------------------------------------------------------------

export const estadoDemo: EstadoMissao = {
  agoraUtc: AGORA_DEMO,
  tripulantes: {
    "astro-001": estadoAstro001,
    "trip-a": estadoDoColega("trip-a", "us_lab", { fc: 64, spo2: 98, temperatura: 36.7, sono: 370, agua: 2500 }),
    "trip-b": estadoDoColega("trip-b", "node2", { fc: 66, spo2: 98, temperatura: 36.8, sono: 355, agua: 2600 }),
    "trip-c": estadoDoColega("trip-c", "node1", { fc: 68, spo2: 99, temperatura: 36.6, sono: 390, agua: 2400 }),
  },
  ambiente,
  ambientePorModulo: {
    node3: { ppco2_modulo: estadoCo2Node3, pio2_cabine: estadoPio2Node3 },
    us_lab: { pressao_cabine: estadoPressaoUsLab },
    estacao: { fluxo_protons_goes: estadoProtons, kp: estadoKp },
  },
  alertas: [alertaCo2],
};

// --- o que cada audiência vê (o filtro de consentimento já aplicado) ---------------------------------------

const bloco = (
  id: BlocoTripulacao,
  nivel: Nivel,
  valor: number,
  unidade: string,
  instanteUtc: string,
): EstadoTripulanteVisivel["blocos"][BlocoTripulacao] => ({
  bloco: id,
  compartilhado: true,
  nivel,
  valor,
  unidade,
  instanteUtc,
  origem: "simulada",
});

const soEstado = (id: BlocoTripulacao): EstadoTripulanteVisivel["blocos"][BlocoTripulacao] => ({
  bloco: id,
  compartilhado: true,
  nivel: 1,
});

const naoCompartilhado = (id: BlocoTripulacao): EstadoTripulanteVisivel["blocos"][BlocoTripulacao] => ({
  bloco: id,
  compartilhado: false,
});

/**
 * Cartões da tripulação como o Astronauta 001 os vê (audiência `tripulacao`) e o dele mesmo
 * (`so_eu`). A: tudo; B: só o estado dos sistemas; C: tudo menos a mente.
 */
export const visoesDemo: Record<string, EstadoTripulanteVisivel> = {
  "astro-001": {
    tripulanteId: "astro-001",
    audiencia: "so_eu",
    nivelGeral: 2,
    moduloId: "node3",
    blocos: {
      coracao: bloco("coracao", 2, 86, "bpm", VESTIVEL),
      oxigenacao: bloco("oxigenacao", 1, 97, "%", VESTIVEL),
      temperatura: bloco("temperatura", 1, 36.8, "°C", KIT),
      sono: bloco("sono", 2, 324, "min", CHECKIN),
      hidratacao: bloco("hidratacao", 1, 1800, "mL", CHECKIN),
      radiacao: bloco("radiacao", 1, 18.9, "mSv", VESTIVEL),
      mente: { bloco: "mente", compartilhado: true, nivel: 2 },
    },
    precisaApoio: false,
    atencaoCmoSolicitada: false,
  },
  "trip-a": {
    tripulanteId: "trip-a",
    audiencia: "tripulacao",
    nivelGeral: 1,
    moduloId: "us_lab",
    blocos: {
      coracao: bloco("coracao", 1, 64, "bpm", VESTIVEL),
      oxigenacao: bloco("oxigenacao", 1, 98, "%", VESTIVEL),
      temperatura: bloco("temperatura", 1, 36.7, "°C", KIT),
      sono: bloco("sono", 1, 370, "min", CHECKIN),
      hidratacao: bloco("hidratacao", 1, 2500, "mL", CHECKIN),
      radiacao: bloco("radiacao", 1, 18.9, "mSv", VESTIVEL),
      mente: { bloco: "mente", compartilhado: true, nivel: 1 },
    },
    precisaApoio: false,
    atencaoCmoSolicitada: false,
  },
  "trip-b": {
    tripulanteId: "trip-b",
    audiencia: "tripulacao",
    nivelGeral: 1,
    blocos: {
      coracao: soEstado("coracao"),
      oxigenacao: soEstado("oxigenacao"),
      temperatura: soEstado("temperatura"),
      sono: soEstado("sono"),
      hidratacao: soEstado("hidratacao"),
      radiacao: soEstado("radiacao"),
      mente: naoCompartilhado("mente"),
    },
    precisaApoio: false,
    atencaoCmoSolicitada: false,
  },
  "trip-c": {
    tripulanteId: "trip-c",
    audiencia: "tripulacao",
    nivelGeral: 1,
    moduloId: "node1",
    blocos: {
      coracao: bloco("coracao", 1, 68, "bpm", VESTIVEL),
      oxigenacao: bloco("oxigenacao", 1, 99, "%", VESTIVEL),
      temperatura: bloco("temperatura", 1, 36.6, "°C", KIT),
      sono: bloco("sono", 1, 390, "min", CHECKIN),
      hidratacao: bloco("hidratacao", 1, 2400, "mL", CHECKIN),
      radiacao: bloco("radiacao", 1, 18.9, "mSv", VESTIVEL),
      mente: naoCompartilhado("mente"),
    },
    precisaApoio: false,
    atencaoCmoSolicitada: false,
  },
};
