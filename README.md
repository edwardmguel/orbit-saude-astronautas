# Orbit Saúde · Fundação Futuro

Software de monitoramento de saúde para astronautas em missões de longa duração, com o óculos **Orbit** (áudio por condução óssea, EEG e EOG) como entregável secundário.

> **Estado em 15/11/2026:** Passo 0 concluído (pesquisa, documentação e desenho). O protótipo do software começa no kickoff da equipe, com prazo de 20 horas.

## O problema

Missões longas expõem a tripulação a radiação, isolamento, distância da Terra, gravidade alterada e um ambiente fechado. Os efeitos no corpo (perda óssea e muscular, mudanças no coração, na imunidade e nos olhos, sono ruim, humor) aparecem devagar, e quanto mais longe da Terra, mais a própria tripulação precisa percebê-los e agir sem esperar o médico de voo em solo.

## A solução, em uma frase

Um painel **offline** que junta dados do corpo (vestíveis, equipamentos médicos, autoavaliações por texto, cliques e câmera) com dados do ambiente da estação (CO2, O2, pressão, ruído, radiação, clima espacial), compara cada astronauta com a própria linha de base e mostra o estado com código de cores numa **figura humana clicável**, dizendo o que fazer e quando chamar o médico de voo.

## Comece por aqui

| Se você é | Leia |
| --- | --- |
| Da equipe, primeira vez | [`docs/00-guia-de-leitura.md`](docs/00-guia-de-leitura.md) |
| Desenvolvedor | [`docs/08-plano-prototipo-20h.md`](docs/08-plano-prototipo-20h.md) e [`docs/05-arquitetura-software.md`](docs/05-arquitetura-software.md) |
| Uma IA ajudando no código | [`AGENTS.md`](AGENTS.md) |
| Quem vai apresentar | [`docs/01-contexto-missao.md`](docs/01-contexto-missao.md), [`docs/11-precedentes.md`](docs/11-precedentes.md), [`docs/10-massa-energia-lancamento.md`](docs/10-massa-energia-lancamento.md) |

Wireframes das telas: abra [`docs/wireframes/telas-prototipo.html`](docs/wireframes/telas-prototipo.html) no navegador.

## Organização do repositório

```text
AGENTS.md                 contexto e regras para a IA de desenvolvimento (CLAUDE.md aponta para cá)
docs/                     documentação consolidada, didática, com fontes
  wireframes/             telas do protótipo em HTML
pesquisa/
  documento-inicial.md    cópia do documento de origem (Google Docs, todas as abas)
  bruto/                  pesquisa completa das 6 frentes, com todas as citações
prototipo/
  config/                 configuração de indicadores e cenários, derivada de docs/03 e docs/05
```

## Como a pesquisa foi feita

Seis frentes de pesquisa em paralelo, cada uma com um agente de IA instruído a usar fontes primárias (nasa.gov, NASA Technical Reports Server, Human Research Roadmap, NASA-STD-3001, OSDR, outras agências e artigos revisados por pares), citar a URL de cada fato com uma etiqueta de confiança e escrever "NÃO ENCONTRADO" em vez de inventar. A coordenação consolidou os resultados em `docs/`. O texto integral de cada frente está em `pesquisa/bruto/`.

| Frente | Arquivo |
| --- | --- |
| 1. ECLSS, ambiente da cabine, radiação e telemetria pública | [`pesquisa/bruto/01-eclss-ambiente-radiacao.md`](pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| 2. Equipamentos médicos e fisiológicos da tripulação | [`pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| 3. Riscos, indicadores e limiares de alerta | [`pesquisa/bruto/03-riscos-indicadores-limiares.md`](pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| 4. Precedentes do óculos, sono e rotina | [`pesquisa/bruto/04-precedentes-oculos-sono.md`](pesquisa/bruto/04-precedentes-oculos-sono.md) |
| 5. Massa, computação embarcada e custo de lançamento | [`pesquisa/bruto/05-massa-computacao-lancamento.md`](pesquisa/bruto/05-massa-computacao-lancamento.md) |
| 6. Dados abertos, software da NASA e fluxo de dados | [`pesquisa/bruto/06-dados-abertos-software-fluxo.md`](pesquisa/bruto/06-dados-abertos-software-fluxo.md) |

## Aviso

Projeto acadêmico e de demonstração. Não é um dispositivo médico, não foi validado clinicamente e não substitui o julgamento de médicos de voo nem os sistemas de alarme da estação. Nomes de tripulantes e dados individuais nas telas são fictícios.
