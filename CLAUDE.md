@AGENTS.md

---

# Contexto consolidado: Orbit Saúde

> Leia `AGENTS.md` (importado acima) antes deste arquivo. As regras de domínio do `AGENTS.md` são não negociáveis e prevalecem sobre qualquer coisa aqui.

---

## 1. O projeto

**Orbit Saúde** é software offline de automonitoramento de saúde para astronautas em missões longas. Coleta dados do corpo (vestíveis, kit médico, autoavaliações de texto, cliques e câmera) e do ambiente da estação (CO2, O2, pressão, ruído, radiação, clima espacial), compara cada tripulante com a própria linha de base e mostra o estado numa figura humana clicável com código de cores, dizendo o que fazer e quando chamar o médico de voo.

Entregável secundário (não é código deste repositório ainda): **óculos Orbit** com áudio por condução óssea, EEG e EOG.

**Equipe:** Fundação Futuro. **Desafio:** NASA Space Apps Challenge 2026, "Create Health Monitoring Software for Astronauts on Space Missions", nível Intermediate. **Prazo de envio:** 15/11/2026, 23h59 horário local do evento.

---

## 2. O problema central

AUTONOMIA MÉDICA LONGE DA TERRA. Na ISS o médico de voo responde quase em tempo real. Na Lua o atraso é 1,3 s por trecho. Em Marte é de 4 a 24 minutos por trecho, com conjunção solar de 13 dias a 3 semanas sem contato. Astronauta não é médico: sabe medir, mas não sabe se um valor é preocupante para ele, naquele momento da missão. Alterações são lentas e silenciosas. Dados soltos não viram decisão.

**Frase de pitch:** "Transformar cada astronauta no primeiro médico de si mesmo, quando o médico de verdade está a 20 minutos-luz."

---

## 3. Base científica

**5 perigos RIDGE (HRP):** Radiação, Isolamento/confinamento, Distância, Gravity fields, Hostile environments. Os perigos interagem e agravam uns aos outros.

**21 riscos ativos no HRR**, 3 categorias: fisiologia humana (SANS é o principal), comportamento/fatores humanos, radiação.

Pesquisas em andamento que validam a abordagem:
- ARCHeR (Artemis II): actigrafia de pulso para sono e atividade.
- Standard Measures: medidas padronizadas da tripulação (justifica check-in).
- CMO-DA (NASA + Google): apoio à decisão clínica offline (valida IA embarcada).

---

## 4. Código de cores (5 níveis)

| Nível | Cor | Rótulo | Ícone | Quem age |
| --- | --- | --- | --- | --- |
| 0 | Cinza | Saúde: sem dado | ? | Ninguém; verificar se o dado chegou |
| 1 | Verde | Saúde: normal | checkmark | Ninguém |
| 2 | Amarelo | Saúde: atenção | ! | O próprio tripulante |
| 3 | Vermelho | Saúde: acionar médico | X | CMO e médico de voo |
| 4 | Vermelho estático | Saúde: contatar CMO agora | X | CMO imediato |

**Cor final = maior nível entre**: limiar oficial (docs/03), desvio pessoal (z-score) e regras de cruzamento (docs/04). Z-score sozinho nunca gera vermelho. Desvio pessoal: |z| >= 2 = amarelo; |z| > 3 em 2 medições consecutivas = amarelo persistente.

---

## 5. Arquitetura e stack

**Stack:** React + Vite + TypeScript, Tailwind CSS, Apache ECharts, Zustand, IndexedDB via Dexie.js, TypeScript puro para estatística. Sem backend remoto, sem autenticação real, sem banco remoto.

**Estrutura de pastas:**
```
prototipo/
  app/src/
    adapters/      (um por fonte; nunca decide cor)
    domain/        (tipos TypeScript espelhando docs/06)
    engine/        (linha de base, regras, cruzamento, alertas)
    ml/            (z-score, EWMA, tendência)
    ui/            (telas e componentes)
    i18n/          (PT-BR e EN)
  config/
    indicadores.json              (35 indicadores, 6 regras)
    perfis-simulacao.rascunho.json
  dados/
    amostras-reais/
```

**Tokens de cor (tema escuro):** `--bg: #0A0F1E`, `--ok: #22C55E`, `--warn: #F5B800`, `--alert: #EF4444`, `--nodata: #6B7280`, `--accent: #4EA8FF`.

**Fórmulas chave:**
- Linha de base: media e desvio padrao amostral, minimo 7 leituras; nao atualizar com dias amarelos/vermelhos.
- Z-score: z = (x - media) / sigma
- EWMA: St = 0,3 * xt + 0,7 * St-1 (lambda = 0,3)
- Indice de prontidao: media ponderada (sono 0,30, fadiga 0,20, PVT 0,20, HRV 0,15, humor 0,15)

---

## 6. Telas

| ID | Nome | O que mostra |
| --- | --- | --- |
| T1 | Monitor geral | Cartoes dos 4 tripulantes + ambiente; faixa de perigo |
| T1b | Monitor em matriz | Visao condensada para sala de operacoes |
| T2 | Meu corpo | Figura SVG clicavel com regioes; painel de detalhes |
| T3 | Check-in diario | Meta 2 min; escalas, chips, PVT |
| T4 | Detalhe do alerta | Evidencias, regra, fonte, o que fazer |
| T5 | Ambiente e radiacao | Mapa de modulos, dose acumulada, feed NOAA |
| T6 | Sono e oculos Orbit | Hipnograma, modo noturno |
| T7 | Tendencias | Graficos de evolucao |

**Regioes clicaveis em T2 (ids):** `cerebro`, `olhos`, `ouvidos`, `coracao`, `pulmoes`, `sangue`, `digestao`, `rins`, `ossos`, `musculos`, `pele`, `corpo`.

---

## 7. Regras de cruzamento (R-xx)

| ID | Gatilho | Nivel |
| --- | --- | --- |
| R-CO2-01 | EWMA ppCO2 > 2,8 mmHg em 3h + cefaleia ou reacao lenta | 2 |
| R-RAD-01 | Fluxo GOES >= 10 pfu (S1 NOAA) ou alerta SEP na DONKI | 2 toda tripulacao |
| R-SANS-01 | Piora acuidade ou Amsler em 2 testes em 14 dias | 2 |
| R-SONO-01 | Divida de sono > 0 em 3 dias + tarefa critica em 2 dias | 2 |
| R-HID-01 | Ingestao < 1.200 mL/24h por 2 dias + cor urina >= 6/8 | 2 |
| R-AMB-01 | Sintoma relatado + grandeza ambiental fora do verde nas ultimas 6h | sem elevacao, anexa fatores |

---

## 8. Cenarios de demonstracao (C1 a C5)

| ID | O que acontece |
| --- | --- |
| C1 | Pico CO2 + cefaleia + reacao lenta (R-CO2-01) |
| C2 | Evento solar 150 pfu, escala S2, dia 120 (R-RAD-01) |
| C3 | Sinais iniciais de SANS: Amsler + acuidade (R-SANS-01) |
| C4 | Divida de sono antes de EVA (R-SONO-01) |
| C5 | Agua baixa + cor urina (R-HID-01) |

Esses cenarios sao o contrato da demo: cada um deve disparar exatamente o alerta descrito.

---

## 9. O que NAO fazer

- Introduzir qualquer limiar sem fonte em docs/03 (regra de dominio 1).
- Fazer qualquer coisa piscar, emitir som ou usar os rotulos Caution, Warning ou Emergency (regra 10).
- Colocar texto fixo em componentes; toda string vai em `src/i18n/` (regra de escrita).
- Usar travessao (U+2014) ou meia-risca (U+2013) em qualquer texto.
- Componentes de tela calcular estado; o estado chega pronto do motor.
- Adaptador decidir cor ou nivel; adapatador so entrega `Leitura`.
- Tratar ausencia de leitura como "normal"; exibir nivel 0 (cinza, ? sem dado).
- Substituir o alarme da estacao (fogo, despressurizacao, atmosfera toxica).
- Afirmar diagnostico; usar "possivel", "sugere", "compativel com".
- Acesso emergencial irrestrito codificado (privacidade por consentimento).

---

## 10. Roteiro da apresentacao (7 minutos)

| Tempo | Momento | Tela |
| --- | --- | --- |
| 0:00 | Problema: RIDGE, missoes longas, autonomia medica | Slide |
| 1:00 | Bom dia: check-in de 2 minutos | T3 |
| 2:00 | Monitor geral: ambiente + tripulacao; colega em perigo | T1 e T1b |
| 2:45 | Cruzamento ao vivo: CO2 + alerta explicavel | T4 |
| 3:45 | Figura humana: olhos em amarelo, SANS, o que fazer | T2 |
| 4:30 | Radiacao real: feed NOAA e dose acumulada | T5 |
| 5:15 | A noite: modo ambar, sono e oculos Orbit | T6 |
| 6:00 | Viabilidade: offline, massa, computacao | Slide |
| 6:40 | Proximos passos: piloto cruzado, caminho ate a ISS | Slide |

---

## 11. Indice dos arquivos de pesquisa e documentacao

| Arquivo | Conteudo |
| --- | --- |
| `docs/00-reading-guide.md` | Ordem de leitura por perfil e sistema de etiquetas de confianca |
| `docs/01-mission-context.md` | Riscos HRR, rotina da ISS, EVA, 5 perigos RIDGE |
| `docs/02-equipment-and-data.md` | Equipamentos reais da ISS com o que medem, como entregam e unidade |
| `docs/03-indicators-and-thresholds.md` | 73 indicadores documentados, 35 no JSON executavel; faixas com fonte |
| `docs/04-data-cross-referencing.md` | Formulas (z-score, EWMA, linha de base) e regras R-CO2-01 a R-AMB-01 com exemplos resolvidos |
| `docs/05-software-architecture.md` | Stack, estrutura de pastas, cenarios C1 a C5 |
| `docs/06-data-model.md` | Tipos canonicos (Leitura, Alerta, Tripulante etc.) com campos e unidades |
| `docs/07-interface-design.md` | Tokens de cor, componentes, telas T1 a T7, regras visuais |
| `docs/08-prototype-plan-20h.md` | Cronograma, escopo P0/P1/P2, criterios de pronto, riscos |
| `docs/09-orbit-glasses.md` | Especificacao do oculos: EEG, EOG, conducao ossea, pipeline de sinais |
| `docs/10-mass-energy-launch.md` | Numeros de massa, volume, energia e custo de lancamento para o pitch |
| `docs/11-precedents.md` | Sistemas existentes (CMO-DA, AttentivU, Dreem) e diferenciais defensaveis |
| `docs/12-open-data-sources.md` | APIs e arquivos publicos (NOAA, DONKI, OSDR, ISS Live) com campos e licencas |
| `docs/13-glossary.md` | Siglas e termos do dominio |
| `docs/14-answered-questions.md` | 13 perguntas da equipe com resposta curta, correco de imprecisoes e fontes |
| `docs/16-next-steps-and-impact.md` | Artemis, Gateway, Marte, caminho ate voar, aplicacoes na Terra |
| `docs/wireframes/prototype-screens.html` | Wireframes HTML navegaveis das telas |
| `pesquisa/bruto/01-*.md` | Pesquisa bruta: ECLSS, ambiente, radiacao |
| `pesquisa/bruto/02-*.md` | Pesquisa bruta: equipamentos medicos da tripulacao |
| `pesquisa/bruto/03-*.md` | Pesquisa bruta: riscos, indicadores, limiares |
| `pesquisa/bruto/04-*.md` | Pesquisa bruta: precedentes (oculos, sono) |
| `pesquisa/bruto/05 a 19-*.md` | Pesquisa bruta: massa/lancamento, dados abertos, desafio oficial, autoavaliacoes, perfis simulados, orientacoes, amostras reais, IA medica, pipeline sinais, audio, Artemis/Marte, caminho para voar, aplicacoes terra, checagem cruzada |
| `pesquisa/documento-inicial.md` | Documento de partida da equipe (precede a pesquisa; contém imprecisoes corrigidas em docs/14) |
| `prototipo/config/indicadores.json` | 35 indicadores e 6 regras com faixas e fonte; unica fonte de verdade para limiares |
| `prototipo/config/perfis-simulacao.rascunho.json` | Tripulantes ficticios e roteiro de 180 dias para a demo |
| `prototipo/dados/amostras-reais/` | Amostras reais gravadas (NOAA, DONKI etc.) |

---

## 12. Conflitos a resolver pelo dono do projeto

Estes conflitos estao entre `prompt-claude.md` e os documentos do time (`AGENTS.md`, `docs/`). Nao resolver sozinho; aguardar decisao.

**C-01. Idioma da interface**
- `prompt-claude.md` diz: interface em inglês (apresentacao para a NASA).
- `AGENTS.md` (regra de escrita) diz: português do Brasil, com dicionario para inglês em `src/i18n/`.
- **Decisao necessaria:** qual idioma padrão da interface?

**C-02. Animacoes de pulso**
- `prompt-claude.md` diz: pontos amarelos pulsam lento; vermelhos pulsam rapido com efeito radar.
- `AGENTS.md` (regra 10) diz: nada pisca, nada emite som; vermelho e piscar sao do sistema C&W da ISS.
- **Decisao necessaria:** suprimir as animacoes de pulso ou manter como efeito visual suave que nao imite o alarme da estacao?

**C-03. Backend Supabase**
- `prompt-claude.md` cita Supabase como backend (oriundo do Lovable).
- `AGENTS.md` (regra 4) exige app 100% offline com IndexedDB via Dexie.js; sem banco remoto.
- **Decisao necessaria:** suprimir completamente o Supabase ou manter como camada de sincronizacao opcional (atrás de seletor)?

**C-04. Niveis de cor (4 vs. 5)**
- `prompt-claude.md` descreve 4 niveis: verde, amarelo, vermelho, cinza.
- `docs/05` e `docs/07` descrevem 5 niveis: 0=cinza, 1=verde, 2=amarelo, 3=vermelho, 4=vermelho-estatico.
- **Decisao necessaria:** manter os 5 niveis (documentos ganham) ou simplificar para 4 na demo?

**C-05. Nome do projeto**
- `prompt-claude.md` chama o produto de "Órbita".
- `AGENTS.md` e todos os `docs/` chamam de "Orbit Saúde".
- **Decisao necessaria:** qual o nome oficial para o envio?

**C-06. Limiares de sinais vitais sem fonte NASA**
- `prompt-claude.md` traz limiares especificos de FC, pressao, temperatura, glicemia, SpO2, sono.
- `docs/03` classifica esses indicadores como "referencia_terrestre", sem limiar com fonte NASA publicada.
- Pela regra de dominio 1, eles nao podem ter cor de limiar fixo no `indicadores.json`.
- **Decisao necessaria:** exibir esses indicadores so com linha de base pessoal (z-score) e tendencia, sem cor de limiar fixo? Ou o time aceita usar referencia terrestre marcada como tal?

**C-07. Versao comprimida vs. plano de 20 horas**
- `prompt-claude.md` descreve uma demo de 7 minutos com 7 telas.
- `docs/08` tem um plano comprimido de 13 horas (dado que faltavam 15 horas e 20 minutos na hora do kickoff).
- T1b, T6, gamificacao e Amsler interativa caem do escopo comprimido.
- **Decisao necessaria:** qual escopo seguir agora?
