# Orbit Saúde · Fundação Futuro

Software de monitoramento de saúde para astronautas em missões de longa duração, com o óculos **Orbit** (áudio por condução óssea, EEG e EOG) como entregável secundário. Resposta ao desafio **"Create Health Monitoring Software for Astronauts on Space Missions"** do NASA International Space Apps Challenge 2026.

> **Estado em 15/11/2026, 05h50:** Passo 0 concluído. 19 frentes de pesquisa aprovadas, 17 documentos consolidados, configuração de indicadores e perfis de simulação prontos, amostras reais gravadas para a demonstração. O protótipo do software começa no kickoff da equipe.
>
> **Prazo:** pela página oficial do evento, o envio fecha **domingo, 15/11, às 23h59 no horário do evento local**. Ver [`docs/08-plano-prototipo-20h.md`](docs/08-plano-prototipo-20h.md), seção 0.

## O problema

Missões longas expõem a tripulação a radiação, isolamento, distância da Terra, gravidade alterada e um ambiente fechado. Os efeitos no corpo (perda óssea e muscular, mudanças no coração, na imunidade e nos olhos, sono ruim, humor) aparecem devagar, e quanto mais longe da Terra, mais a própria tripulação precisa percebê-los e agir sem esperar o médico de voo em solo. Na ISS, hoje, o ambiente é monitorado continuamente, mas os dados do corpo chegam por sessão, exame ou amostra, em sistemas separados.

## A solução, em uma frase

Um painel **offline** que junta dados do corpo (vestíveis, equipamentos médicos, autoavaliações por texto, cliques e câmera) com dados do ambiente da estação (CO2, O2, pressão, ruído, radiação, clima espacial), compara cada astronauta com a própria linha de base, mostra o estado numa **figura humana clicável** e num **monitor geral da tripulação** (com consentimento de cada um), e diz o que fazer e quando chamar o médico de voo, sempre com a fonte de cada limiar.

## Comece por aqui

| Se você é | Leia |
| --- | --- |
| Da equipe, primeira vez | [`docs/00-guia-de-leitura.md`](docs/00-guia-de-leitura.md) |
| Desenvolvedor | [`docs/08-plano-prototipo-20h.md`](docs/08-plano-prototipo-20h.md), [`docs/05-arquitetura-software.md`](docs/05-arquitetura-software.md) e [`docs/03-indicadores-e-limiares.md`](docs/03-indicadores-e-limiares.md) |
| Quem executa o código no Lovable (app ORBITA) | [`docs/17`](docs/17-revisao-prompt-orbita.md) (revisão do prompt da equipe), [`docs/18`](docs/18-design-orbita-responsivo.md) e [`docs/wireframes/orbita-responsivo.html`](docs/wireframes/orbita-responsivo.html) (design e desenhos das telas), [`docs/19`](docs/19-prompt-lovable-revisado.md) (prompt para colar) |
| Uma IA ajudando no código | [`AGENTS.md`](AGENTS.md) |
| Quem vai apresentar | [`docs/08`](docs/08-plano-prototipo-20h.md) (seções 0 e 6), [`docs/01`](docs/01-contexto-missao.md), [`docs/11`](docs/11-precedentes.md), [`docs/10`](docs/10-massa-energia-lancamento.md), [`docs/16`](docs/16-proximos-passos-e-impacto.md) |
| Quem constrói o óculos | [`docs/09`](docs/09-oculos-orbit.md), [`pesquisa/bruto/14`](pesquisa/bruto/14-oculos-pipeline-sinais.md) e [`pesquisa/bruto/15`](pesquisa/bruto/15-oculos-audio-acervo.md) |

Wireframes das telas: abra [`docs/wireframes/telas-prototipo.html`](docs/wireframes/telas-prototipo.html) no navegador.

## Organização do repositório

```text
AGENTS.md                     contexto e regras para a IA de desenvolvimento (CLAUDE.md aponta para cá)
docs/                         documentação consolidada, didática, com fontes (00 a 19)
  wireframes/                 telas do protótipo em HTML (telas-prototipo.html e orbita-responsivo.html)
pesquisa/
  METODO.md                   regras dadas aos agentes de pesquisa e ciclo de revisão
  documento-inicial.md        cópia do documento de origem (Google Docs, todas as abas)
  bruto/                      as 19 frentes de pesquisa completas, com todas as citações
prototipo/
  config/
    indicadores.json          37 indicadores e 6 regras de cruzamento com regra de cor e fonte (de docs/03)
    perfis-simulacao.rascunho.json   37 indicadores, 7 tripulantes fictícios, roteiro de 180 dias e cenários C1 a C5
    orbita-ia-base.json       65 respostas da ORBITA IA (offline), cada uma com fonte
  dados/amostras-reais/       telemetria pública da ISS, NOAA SWPC e DONKI gravadas em 15/11/2026, com scripts
Traycer/                      cópia da EPIC do Traycer deste projeto e instruções para importá-la em outro computador
```

## Como a pesquisa foi feita

Dezenove frentes de pesquisa, cada uma com um agente de IA instruído a usar fontes primárias (nasa.gov, NASA Technical Reports Server, Human Research Roadmap, NASA-STD-3001, OSDR, outras agências e artigos revisados por pares), citar a URL de cada fato com uma etiqueta de confiança e escrever "NÃO ENCONTRADO" em vez de inventar. Cada entrega foi revisada pelo coordenador (checagem automática, conferência por amostragem e devolução para correção quando necessário) antes de ser aprovada, e a frente 19 fez uma checagem cruzada final dos números principais. Método completo em [`pesquisa/METODO.md`](pesquisa/METODO.md); todas as fontes em [`docs/15-referencias.md`](docs/15-referencias.md).

| Frente | Arquivo |
| --- | --- |
| 1. ECLSS, ambiente da cabine, radiação e telemetria pública | [`01-eclss-ambiente-radiacao.md`](pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| 2. Equipamentos médicos e fisiológicos da tripulação | [`02-equipamentos-medicos-tripulacao.md`](pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| 3. Riscos, indicadores e limiares de alerta | [`03-riscos-indicadores-limiares.md`](pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| 4. Precedentes do óculos, sono e rotina | [`04-precedentes-oculos-sono.md`](pesquisa/bruto/04-precedentes-oculos-sono.md) |
| 5. Massa, computação embarcada e custo de lançamento | [`05-massa-computacao-lancamento.md`](pesquisa/bruto/05-massa-computacao-lancamento.md) |
| 6. Dados abertos, software da NASA e fluxo de dados | [`06-dados-abertos-software-fluxo.md`](pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| 7. Desafio oficial e padrões de interface e alarme da NASA | [`07-desafio-oficial-padroes-interface.md`](pesquisa/bruto/07-desafio-oficial-padroes-interface.md) |
| 8. Autoavaliações implementáveis | [`08-autoavaliacoes-implementaveis.md`](pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| 9. Perfis de dados simulados | [`09-perfis-dados-simulados.md`](pesquisa/bruto/09-perfis-dados-simulados.md) |
| 10. Orientações e contramedidas | [`10-orientacoes-contramedidas.md`](pesquisa/bruto/10-orientacoes-contramedidas.md) |
| 11. Amostras reais para a demonstração | [`11-amostras-reais.md`](pesquisa/bruto/11-amostras-reais.md) |
| 12. Consolidação dos limiares | resultou em [`docs/03`](docs/03-indicadores-e-limiares.md) e [`indicadores.json`](prototipo/config/indicadores.json) |
| 13. IA médica embarcada | [`13-ia-medica-embarcada.md`](pesquisa/bruto/13-ia-medica-embarcada.md) |
| 14. Pipeline de sinais do óculos | [`14-oculos-pipeline-sinais.md`](pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| 15. Áudio e acervo sonoro do óculos | [`15-oculos-audio-acervo.md`](pesquisa/bruto/15-oculos-audio-acervo.md) |
| 16. Artemis II, Gateway e Marte | [`16-artemis-marte.md`](pesquisa/bruto/16-artemis-marte.md) |
| 17. Caminho até voar | [`17-caminho-ate-voar.md`](pesquisa/bruto/17-caminho-ate-voar.md) |
| 18. Aplicações na Terra e impacto | [`18-aplicacoes-terra-impacto.md`](pesquisa/bruto/18-aplicacoes-terra-impacto.md) |
| 19. Checagem cruzada final | [`19-checagem-cruzada.md`](pesquisa/bruto/19-checagem-cruzada.md) |

## Decisões pendentes do dono

- **Licença e visibilidade do repositório no envio.** Os termos do Space Apps pedem licença aberta para as contribuições originais (Apache 2.0 é o padrão). O repositório está privado.
- **Redistribuição das amostras reais.** A licença do conteúdo da telemetria pública da ISS e da API de posição não foi encontrada; decidir antes de tornar o repositório público.
- **Critérios de julgamento e regra de uso de IA.** A página global estava fora do ar; conferir na página do evento local.

## Aviso

Projeto acadêmico e de demonstração. Não é um dispositivo médico, não foi validado clinicamente e não substitui o julgamento de médicos de voo nem os sistemas de alarme da estação. Nomes de tripulantes e dados individuais nas telas são fictícios. Pesquisa feita com agentes de IA sob revisão humana e do coordenador.
