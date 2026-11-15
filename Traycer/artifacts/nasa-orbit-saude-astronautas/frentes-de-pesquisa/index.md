---
title: "Frentes de pesquisa (agentes Luna)"
kind: spec
comments: none
---

# Frentes de pesquisa

Roteiro completo das pesquisas executadas por agentes GPT-6 Luna (Codex, esforço máximo). Cada agente escreve só no próprio arquivo em `pesquisa/bruto/`, segue as regras de `pesquisa/METODO.md` e responde ao coordenador quando termina. O coordenador revisa, devolve correções ou aprova, consolida em `docs/` e abre a próxima frente quando houver vaga, com **no máximo 3 agentes simultâneos** (os 6 abertos antes de 02h25 terminam normalmente; nenhuma frente nova abre até restarem menos de 3).

Pedidos do dono, 15/11: *"Mantenha os 6 agentes simultâneos por vez."* (02h05), substituído por *"Nesse ritmo o luna vai acabar muito rápido, mantenha apenas 3 lunas por vez a partir dos próximos que forem encerrando."* (02h25) · *"Já desenhe todas as frentes de pesquisa que você irá mandar os Lunas executarem, se encontrar potenciais novas pesquisas adicione nesse mesmo arquivo."* · *"Sempre que terminar uma tarefa atualize a EPIC."*

## 1. Roteiro completo

Estado: ✅ aprovada · 🔄 em execução · ↩️ devolvida para correção · ⬜ na fila.

| # | Frente | Entrega principal | Depende de | Prioridade | Estado |
| --- | --- | --- | --- | --- | --- |
| 1 | ECLSS, ambiente da cabine, radiação e telemetria pública da ISS | `01-eclss-ambiente-radiacao.md` (581 linhas, 121 fontes) |  | Alta | ✅ 02h19 |
| 2 | Equipamentos médicos e fisiológicos da tripulação | `02-equipamentos-medicos-tripulacao.md` (452 linhas, 91 fontes) |  | Alta | ✅ 01h59 |
| 3 | Riscos do HRP, indicadores, limiares verde, amarelo e vermelho; autoavaliação; escalonamento | `03-riscos-indicadores-limiares.md` (564 linhas, 79 fontes na lista final) |  | Alta | ✅ 02h28, após 1 correção |
| 4 | Precedentes do óculos: condução óssea, EEG, EOG, óculos inteligentes, sono e rotina, sons de natureza | `04-precedentes-oculos-sono.md` (426 linhas, 75 fontes) |  | Alta | ✅ 01h59 |
| 5 | Massa do óculos, computação embarcada para ML, energia, custo de lançamento e combustível | `05-massa-computacao-lancamento.md` (470 linhas, 76 fontes) |  | Alta | ✅ 02h17, após 1 correção |
| 6 | Bases de dados abertas, software de saúde da NASA, tempo real, fluxo estação e solo, privacidade | `06-dados-abertos-software-fluxo.md` (548 linhas, 302 fontes, 9 endpoints testados) |  | Alta | ✅ 02h19 |
| 7 | Desafio oficial (página, recursos, julgamento); padrões de interface e alarme da NASA; monitoramento entre colegas | `07-desafio-oficial-padroes-interface.md` (323 linhas, 44 fontes) |  | Alta | ✅ 02h44 |
| 8 | Autoavaliações implementáveis: PVT, sonolência, fadiga, humor, dor, enjoo, Amsler, acuidade, cor da urina | `08-autoavaliacoes-implementaveis.md` (427 linhas, 72 fontes) |  | Alta | ✅ 02h50 |
| 9 | Perfis de dados simulados realistas para o gerador | `09-perfis-dados-simulados.md` e `perfis-simulacao.rascunho.json` (35 indicadores, 7 perfis fictícios) | 1, 2, 3 | Alta | ✅ 03h36, após 1 correção |
| 10 | Biblioteca de orientações e contramedidas ("o que fazer" de cada alerta) | `10-orientacoes-contramedidas.md` (821 linhas, 158 fontes) | 2, 3 | Alta | ✅ 02h55 |
| 11 | Amostras reais para o modo demonstração (ISS Live, NOAA SWPC, DONKI) | `11-amostras-reais.md` (387 linhas) e `prototipo/dados/amostras-reais/` (23 arquivos, 21,8 MB) | 1, 6 | Alta | ✅ 04h34 |
| 12 | Consolidação dos limiares e rascunho de `indicadores.json` | `docs/03-indicadores-e-limiares.md` e `prototipo/config/indicadores.json` (35 indicadores, 6 regras) | 3, 8, 10 | Alta | ✅ 04h41, após 1 correção |
| 13 | IA médica embarcada: precedentes e requisitos | `13-ia-medica-embarcada.md` (327 linhas, 55 fontes) | 5, 6 | Média alta | ✅ 04h01 |
| 14 | Óculos Orbit: pipeline de sinais EEG e EOG | `14-oculos-pipeline-sinais.md` (302 linhas, 53 fontes) | 4, 5 | Média | ✅ 04h25 |
| 15 | Óculos Orbit: áudio por condução óssea e acervo sonoro cultural | `15-oculos-audio-acervo.md` (212 linhas, 36 fontes) | 4 | Média | ✅ 04h48 |
| 16 | Artemis II e Marte: o que muda para o software | `16-artemis-marte.md` (265 linhas, 52 fontes) | 6 | Média | ✅ 04h53 |
| 17 | Caminho até voar: estudo com grupo controle, ética, certificação de hardware, prazos | `17-caminho-ate-voar.md` (292 linhas, 75 fontes) | 4, 5 | Média | ✅ 05h14 |
| 18 | Aplicações na Terra e impacto | `18-aplicacoes-terra-impacto.md` (209 linhas, 40 fontes) |  | Baixa média | ✅ 05h09 |
| 19 | Checagem cruzada final de fatos nos `docs/` e no pitch | `19-checagem-cruzada.md` (154 linhas, 40 itens) | todas | Alta, no fim | ✅ 05h40 |

## Consolidação em `docs/`

O coordenador transforma as frentes aprovadas em documentos didáticos para a equipe. A redação de cada documento grande é delegada a um agente Claude com especificação fechada e revisada pelo coordenador; a cota do Codex fica reservada para as frentes Luna.

| Documento | Vem das frentes | Estado |
| --- | --- | --- |
| `docs/02-equipamentos-e-dados.md` | 1, 2 | ✅ 02h42, 494 linhas, 117 fontes, 29 tabelas; 13 divergências entre fontes registradas no próprio documento |
| `docs/09-oculos-orbit.md` | 4, 5 | ✅ 02h43, 430 linhas, 52 fontes |
| `docs/10-massa-energia-lancamento.md` | 5 | ✅ 02h43, 346 linhas, 43 fontes, contas refeitas por script |
| `docs/12-fontes-de-dados-abertas.md` | 6, 1 | ✅ 02h47, 450 linhas, 141 fontes |
| `docs/14-perguntas-respondidas.md` | 1, 2, 4, 6 | ✅ 02h47, 335 linhas, 116 fontes, abre com tabela de correções ao documento inicial |
| `docs/01-contexto-missao.md` | 3, 4, 2 | ✅ 02h45, 320 linhas, 68 fontes; lista de dores ampliada de 15 para 36 condições |
| `docs/03-indicadores-e-limiares.md` e `indicadores.json` | 3, 8, 10 | ✅ 04h41, escritos pela frente 12 e revisados pelo coordenador |
| `docs/11-precedentes.md` | 4, 6, 7, 13 | ✅ 04h56, 281 linhas, 84 fontes conferidas por script; alerta para o pitch: a figura humana clicável é o exemplo do próprio enunciado e não diferencia sozinha |
| `docs/16-proximos-passos-e-impacto.md` (novo, para os slides finais) | 16, 17, 18 | ✅ 05h30, 306 linhas, 119 links conferidos, seção O que não dizer com 19 frases; corrigiu divergências entre documentos (nome do SSC, análogos, título do slide das 6:40) |
| `docs/13-glossario.md` e `docs/15-referencias.md` | todas | ✅ 05h46, 470 termos e 958 URLs únicas (contagem conferida por método independente) |
| Reparo de acentos em `docs/03` e `indicadores.json` | frente 12 | ✅ 05h51: a correção da frente 12 tinha regravado letras acentuadas como `?`; restauradas pelo contexto 68 posições no docs/03 e 473 no JSON, só nas posições corrompidas, JSON válido, nenhum `?` fora de URLs |

## 2. Escopo das frentes da fila

**9. Perfis de dados simulados.** Para cada indicador do protótipo: valor típico em astronauta saudável, variação ao longo do dia (ritmo circadiano), ruído de medida, tendência em 180 dias (massa, osso, músculo, VO2, sono, visão), e magnitudes dos cenários C1 a C5 baseadas em dados publicados (séries reais de CO2 da ISS, taxa de dose diária e picos da Anomalia do Atlântico Sul, sono em voo, perda de massa). Inclui um roteiro de missão de 180 dias com eventos (EVA, chegada de veículo, evento solar). Serve ao Dev B.

**10. Biblioteca de orientações e contramedidas.** O desafio pede "orientações sobre tratamentos e melhorias". Para cada indicador e alerta: o que o próprio astronauta faz, o que o CMO faz, quando chamar o médico de voo, e as contramedidas oficiais da NASA (exercício prescrito, hidratação, higiene do sono, mitigação de CO2, abrigo de radiação, SANS, enjoo, dor lombar, pele, nutrição, saúde comportamental), tudo com fonte e em texto curto pronto para a tela.

**11. Amostras reais para o modo demonstração.** Conectar de fato à telemetria pública da ISS (Lightstreamer, ISSLIVE), aos feeds da NOAA SWPC e à DONKI; gravar amostras em `prototipo/dados/amostras-reais/`; **resolver a divergência de unidade do CO2 da telemetria pública** (frente 1 diz torr, frente 6 diz psia) pelo valor observado; documentar o formato e o script mínimo de coleta.

**12. Consolidação dos limiares.** Transformar a tabela mestra da frente 3 em configuração: cada indicador classificado como requisito oficial, referência terrestre, linha de base pessoal ou gatilho por sintoma; valores de demonstração marcados como tal; textos de explicação e de orientação vindos da frente 10. O coordenador revisa e publica em `docs/03`.

**13. IA médica embarcada.** Precedentes de apoio à decisão clínica para tripulações (por exemplo o assistente digital do Crew Medical Officer testado pela NASA, os protótipos do Exploration Medical Capability), modelos de linguagem offline, detecção de anomalias em dados fisiológicos de astronautas e de análogos, explicabilidade, validação e riscos. Sustenta o argumento de machine learning do pitch.

**14. Pipeline de sinais do óculos.** Posições de eletrodo possíveis numa armação, qualidade de eletrodo seco, artefatos (movimento, suor, microgravidade), algoritmos de piscada, sacada, fadiga e sonolência por EOG, estagiamento do sono com canal frontal, bases públicas para treino, e o contrato de dados que o óculos entrega ao software (formato, frequência).

**15. Áudio e acervo sonoro do óculos.** Níveis seguros e potência da condução óssea frente ao ruído da ISS, curva de transição circadiana (volume e espectro), bancos de sons de natureza por bioma e cultura com licença livre, como montar o perfil cultural com o próprio tripulante, e como não interferir nos alarmes da estação.

**16. Artemis II e Marte.** Dados de saúde coletados no Artemis II, Orion, Gateway e trânsito a Marte; atraso de comunicação e conjunção solar; Earth Independent Medical Operations; como os níveis de alerta e a sincronização do software mudam por destino.

**17. Caminho até voar.** Como uma tecnologia como o Orbit chega à ISS: chamadas de pesquisa (HRP, ISS National Lab), comitê de ética, desenho do estudo com grupo controle e tamanho de amostra viável, certificação do hardware (bateria, materiais, compatibilidade eletromagnética, revisões de segurança), prazos e custos típicos.

**18. Aplicações na Terra.** Telemedicina em áreas remotas (Amazônia, Antártida, plataformas, submarinos), monitoramento de idosos, spinoffs de saúde da NASA. Fortalece o critério de impacto do julgamento.

**19. Checagem cruzada final.** Os números citados nos `docs/` consolidados e no roteiro da apresentação, conferidos contra as fontes, e a lista de divergências entre frentes.

## 3. Pesquisas potenciais encontradas no caminho

Lacunas que as frentes registraram e o destino de cada uma.

| Origem | Lacuna | Destino |
| --- | --- | --- |
| Frentes 1 e 6 | Unidade e escala dos itens de CO2, O2 e pressão da telemetria pública (torr ou psia); não há dicionário oficial versionado | **Resolvido pela frente 11:** torr ou mmHg, não psia (ppCO2 do laboratório com mediana de 2,44 mmHg em 2 h); temperaturas (°C ou CNT) e tanques seguem sem unidade confirmada; `docs/02` e `docs/12` atualizados |
| Frente 11 | Licença de redistribuição do conteúdo do ISSLIVE e do WhereTheISS.at não encontrada | Decisão do dono antes de tornar o repositório público |
| Frente 1 | Faixa de dose em 6 meses: 80 a 160 mSv (estimativa alta) versus 50 a 100 mSv (resumo técnico da NASA de 2024) | Frente 19; `docs/` usa as duas com a ressalva |
| Frente 2 | Formato de arquivo e canais do Bio-Monitor não são públicos | Pergunta para a NASA e a CSA na apresentação, não pesquisa |
| Frente 2 | Modelo e protocolo atuais do oxímetro de pulso a bordo | Pergunta para a NASA; o protótipo usa SpO2 do vestível |
| Frente 2 | Uso rotineiro do Ultrasound 3 depois do checkout de fevereiro de 2026 | Frente 16, se houver notícia nova |
| Frente 3 | LxC de 7 riscos do HRP não capturados por timeout | Recuperados na correção; resta a divergência BMed 2x3 versus 2x2 entre páginas da NASA |
| Frente 3 | A NASA não publica limiar numérico em voo para a maioria dos sinais vitais e para SANS; só requisitos ambientais e metas de programa | Frente 12 classifica cada indicador (requisito oficial, referência terrestre, linha de base, sintoma) e marca valores de demonstração |
| Frente 4 | Condução óssea nunca validada em microgravidade; sons naturais nunca estudados para sono de astronautas; EOG não detecta SANS | Frentes 15 e 17 (é justamente o estudo que propomos) |
| Frente 5 | Ficha do transdutor de condução óssea com corrente e potência incompatíveis | Frente 15 confirmou a incoerência (ISL SPK-I-81368: 3 W em 4 Ω com 5 mA); pedir errata ao fabricante e medir a peça; alternativas Dayton BCE-1 e Adafruit 1674 |
| Frente 15 | Fonoteca Neotropical (Unicamp) restringe uso comercial; Xeno-canto tem licença por gravação | Escolher sons de domínio público (NPS) ou CC0 para a demonstração; o dono decide o acervo brasileiro |
| Frente 6 | Coleções biomédicas públicas de Axiom, Polaris Dawn e CHAPEA não confirmadas | Frente 9, como fonte de valores típicos se existirem |
| Frente 7 | Página global do desafio, critérios de julgamento, formato de envio e regra de uso de IA não confirmados (site fora do ar) | Frente 19 tenta de novo; o dono confere na página do evento local |
| Frente 7 | Tabelas integrais de cores da V2 Rev F e o SSP 50313 (padrão de telas da ISS) não acessíveis; regra de caracteres ASCII da V2 conflita com português acentuado | Registro para a apresentação; não afeta o protótipo |
| Frente 7 | Não existe regra pública da NASA para monitor coletivo de saúde nem exceção de acesso emergencial do CMO | Aplicado: consentimento granular por audiência no `docs/07` e no `docs/06`; pergunta para a NASA na apresentação |
| Redação do docs/01 | Tamanho da tripulação e lista de módulos sem fonte nas frentes | Frente 19 |
| Frente 17 | Ajuste Brasil e NASA de 1997 sobre cargas úteis listado como suspenso pela AEB; elegibilidade brasileira em cada chamada não confirmada | Pergunta para a AEB e para a NASA; registrado no `docs/16` |
| Redação do docs/14 | Nenhuma contramedida preventiva de SANS aprovada aparece nas frentes 1 a 6; só vigilância e lentes | Frente 10 (em execução) cobre thigh cuffs e pressão negativa como pesquisa |
| Redação do docs/12 | Respostas [TESTADO] da frente 6 foram anotadas em texto, sem JSON literal | Frente 11 grava respostas reais |
| Redação do docs/09 | Orçamento de energia apertado: componentes somam 33 a 45 mW contra 35 mW de base; amplificador TPA2012D2 gasta 18 mW em repouso e espera 8 Ω, transdutor tem 4 Ω | Frentes 14 e 15 (hardware do óculos); recomendação atual: planejar 50 mW e bateria de 800 mAh |
| Redação do docs/09 | Áudio durante o sono: a frente 5 orçou 30 mW nas 9 h de sono, mas a frente 4 recomenda não tocar enquanto a pessoa dorme | Decidido: faixa "dormir" silenciosa por padrão (`docs/09` e `docs/06`); frente 15 aprofunda |
| Redação do docs/09 | Duração do PVT: o `docs/04` usa 3 minutos; o NASA PVT+ citado na frente 4 recomenda pelo menos 5 minutos para estudo | Resolvido pela frente 8: PVT-B de 3 minutos (paradigma do Reaction Self Test da ISS), lapso ≥ 355 ms e registro também de ≥ 500 ms; `docs/04` atualizado |
| Frente 8 | Licença e versão atual do Reaction Self Test, versões em português e permissões de escalas protegidas (PSQI, POMS, Amsler e cartelas) | Protótipo usa só escalas livres e perguntas autorais; pergunta para a NASA |

## 4. Ciclo de revisão

Pedido do dono, 15/11: *"Ao passo que o luna for entregando, revise as informações e veja se ele entregou como precisava, se não informe ele sobre os erros e peça para ele retomar e corrigir esses pontos."*

| Frente | Revisão automática | Conferência por amostragem | Resultado |
| --- | --- | --- | --- |
| 1 | 0 travessões, 121 fontes, etiquetas no formato "OFICIAL, [link]" | CO2 da ISS em média de 24 h ≤ 3 mmHg desde 2016; datas do REM (2012) e ISS-RAD (2016); faixa de dose de 6 meses | ✅ aprovada |
| 2 | 0 travessões, 91 fontes, 394 etiquetas | Datas do Ultrasound 2 e 3, Bio-Monitor, calendário OCHMO | ✅ aprovada |
| 3 | 0 travessões, 140 fontes, 301 etiquetas | SANS (70% e 18% no brief; 81% na coorte de 64; 47 a 48% é deslocamento hipermetrópico, não necessidade de óculos), CO2 ≤ 3 mmHg em 1 h (V2 6004), limites de radiação da tabela 4.8-1 conferem | ↩️ 02h13: ruído NC-50 e NC-40 em dBA errados, duas linhas coladas na tabela mestra, LxC de 7 riscos faltando, letra da revisão da V2. ✅ 02h28: NC-50 ≈ 58 dBA e NC-40 ≈ 49 dBA (77 e 67 eram marcadores das curvas NC-70 e NC-60), tabela sem linhas coladas, V2 Rev F, LxC recuperados (Carcinogenesis com rating legado; divergência BMed 2x3 versus 2x2 registrada) |
| 4 | 0 travessões, 75 fontes, 141 etiquetas | Dreem na ISS (Pesquet 2021), Sleep in Orbit (2023, EEG no ouvido), lentes de antecipação, rotina GMT | ✅ aprovada (corrigiu um erro do briefing sobre o EEG de Mogensen) |
| 5 | 0 travessões, 76 fontes, 116 etiquetas | Equação do foguete, taxa de dados do EEG, valores do OIG (IG-18-016) | ↩️ 02h07 parâmetros do DeepSleepNet; ✅ 02h17 corrigido (21 a 24,7 milhões no original; TinySleepNet, DeepSleepNet-Lite e YASA acrescentados) |
| 7 | 0 travessões, 44 fontes | Título, edição 2026, nível e prazo na página oficial; requisitos V2 Rev F de interface; privacidade médica V1 7003, 6003 e 6011 | ✅ aprovada. Página global do desafio e regras de julgamento estavam fora do ar (HTTP 502): o texto do desafio veio de cópia secundária, marcado como tal |
| 8 | 0 travessões, 72 fontes | Parâmetros do PVT-B (1 a 4 s, 355 ms) e do PVT padrão (2 a 10 s, 500 ms); exemplo de pontuação refeito | ✅ aprovada |
| 10 | 0 travessões, 158 fontes | 48 blocos (42 indicadores e 6 regras) no formato pedido; nenhum remédio ou dose recomendada; exercício distingue média observada (cerca de 2 h) de bloco programado (cerca de 2,5 h) | ✅ aprovada |
| 9 | 0 travessões, 51 fontes, JSON válido com 33 indicadores | ids consistentes; CO2 por módulo do OCHMO-TB-004; dosimetria com integração de 5 min | ↩️ 03h20: faltam glicose (exemplo citado no desafio oficial) e hemoglobina (anemia do voo espacial). ✅ 03h36: os dois acrescentados; a hemólise 54% maior (Trudel 2022) não foi convertida em queda de hemoglobina porque o estudo não mediu hemograma em série |
| 13 | 0 travessões, 55 fontes | CMO Digital Assistant (NASA e Google, agosto de 2025) confere com a imprensa: prova de conceito, cenários simulados, sem uso em voo | ✅ aprovada. O coordenador acrescenta na consolidação que a imprensa descreve o CMO-DA rodando na plataforma de nuvem Vertex AI, o que reforça o diferencial offline do Orbit |
| 12 | 0 travessões; JSON válido; nenhuma faixa sem fonte | Política de 4 classes correta (10 oficiais, 8 referência terrestre, 16 linha de base, 1 sintoma); CO2, PIO2, pressão, dose de carreira e curvas NC conferem; valores de demonstração separados | ↩️ 04h10: faixas só em texto, o motor precisa de regraCor numérica e exemplosTeste por indicador; humor passa de 0 a 100 para 1 a 5 (docs/04 e tela T3). ✅ 04h41: os 35 indicadores têm regraCor e exemplosTeste; nível 4 só por sintoma; o coordenador ajustou os cenários para casar com os limiares (C1: pico de CO2 de 2,95 mmHg e PVT +15%; C5: 1.000 mL por dia) e os wireframes (2,9 mmHg) |
| 14 | 0 travessões, 53 fontes | Estagiamento do sono: YASA 85,12% com um EEG e 86,92% com EEG e EOG (coerente com os 87,5% da montagem completa citados na frente 5); Dreem 83,5% em montagem seca; ADS1299-4 e BLE de 24 kbit/s coerentes com docs/09 | ✅ aprovada |
| 11 | 0 travessões, 68 marcações [TESTADO] | Gravação real: 158.753 registros em 120 min, 2 passagens pela região da SAA, 55 FLR, 11 SEP, 323 CME; ppCO2 do laboratório com mediana de 2,44 mmHg, coerente com a NASA | ✅ aprovada |
| 15 | 0 travessões, 36 fontes | 115 dBA é teto de áudio pessoal da V2 Rev F, não nível confortável; incoerência da ficha do transdutor ISL registrada sem correção por suposição; licenças por banco de sons | ✅ aprovada |
| 16 | 0 travessões, 52 fontes | Artemis II de 1 a 10/04/2026 com Wiseman, Glover, Koch e Hansen; reformulação de fevereiro de 2026 (Artemis III em órbita da Terra em 2027, IV com pouso em 2028) confirmada na imprensa | ✅ aprovada |
| 18 | 0 travessões, 40 fontes, nenhuma faixa com hífen | Números brasileiros com data e fonte (Parintins, DSEI, NR-37); nenhum impacto do Orbit apresentado como comprovado | ✅ aprovada |
| 17 | 0 travessões, 75 fontes | Rotas HERO, ISS National Lab, SBIR e STTR; ajuste Brasil e NASA de 1997 listado como suspenso pela AEB (fonte oficial da AEB); piloto cruzado de 8 a 12 participantes; prazos marcados como estimativa | ✅ aprovada |
| 19 | 0 travessões; revisão adversarial | 40 números conferidos; nenhum DIVERGE grave fora da fila; 3 correções P0 e 6 P1 | ✅ aprovada. Aplicado pelo coordenador às 05h40: exemplo de CO2 do docs/03 alinhado ao C1; docs/02 na Rev F com as janelas de 1 h, 24 h e 7 dias; gatilho do C2 (150 pfu, S2 da NOAA, SEP); janela inclusiva do C3; R-HID-01, C4 e C5 sem linguagem de diagnóstico; METODO sem a sequência proibida. Pendente: rubrica e regra de IA do Space Apps (site global com HTTP 502) |
| 6 | 0 travessões, 302 fontes, 9 endpoints testados | OSDR (OSD-575 da Inspiration4), feeds da NOAA, Artemis II em abril de 2026 com vestíveis de pulso (ARCHeR) | ✅ aprovada |

## 5. Achados por frente

### Frente 1: ambiente da estação e radiação

- Os segmentos americano (USOS) e russo (ROS) têm sistemas próprios; a ventilação mistura o ar quando as escotilhas estão abertas, mas a leitura de um módulo não vale automaticamente para os outros. **O software precisa saber em que módulo cada tripulante está**.
- CO2: regra operacional pública da ISS de média de 24 h ≤ 3 mmHg (desde 2016); a NASA-STD-3001 Vol 2 também limita a média de 1 h a 3 mmHg. Dados de 2025 mostram 1,7 a 2,1 mmHg típicos.
- O sistema 4B CO2 é o primário atual; 98% de recuperação de água foi demonstrada (WPA, UPA, BPA), mas é capacidade, não leitura instantânea.
- Monitores de qualidade do ar e da água (AQM, SAM, ANITA, TOCA, kits de microbiologia) funcionam por amostra ou campanha; não existe feed público contínuo e uniforme.
- A telemetria pública ISSLIVE publica uma seleção de itens (pressões parciais de O2, N2 e CO2 do Lab e dos nós, temperaturas); identificadores e unidades vêm de mapas da comunidade e precisam de validação.
- Radiação: o dosímetro pessoal ativo (CAD) grava continuamente e tem downlink; o passivo (CPD) e vários monitores de área só são lidos depois. Limite de carreira da NASA: menos de 600 mSv.

### Frente 2: equipamentos médicos da tripulação

- O cuidado médico a bordo (CHeCS) tem três partes separadas: HMS (clínica), EHS (ambiente) e CMS (exercício). Não existe hoje um fluxo fisiológico único nem um painel contínuo com todos os sinais vitais. **Esse é o espaço do nosso software.**
- A maior parte das medidas do corpo é pontual, por campanha ou de pesquisa: conferência médica privada semanal, exames de olhos em janelas (FD30, FD90, R-30), sangue e urina congelados para análise na Terra.
- O Bio-Monitor (CSA, Carré Technologies) é o vestível multiparâmetro mais próximo do que queremos consumir: na ISS desde dezembro de 2018, grava até 48 h (ECG 256 Hz, respiração 128 Hz, SpO2 e acelerometria 64 Hz) e descarrega depois da sessão.
- SANS não tem limiar único de alerta publicado; é acompanhado por exames seriados.
- **Aplicado em `docs/06`:** dado do corpo tem latência e estados próprios (gravado, aguardando transferência, pendente de laboratório).

### Frente 4: precedentes do óculos, sono e rotina

- **O Orbit não é inédito na combinação de tecnologias.** O AttentivU (MIT Media Lab) já juntou EEG, EOG e retorno por condução óssea numa armação de óculos e foi testado em voo parabólico com seis participantes; não foi validado na ISS nem para sono.
- A NASA avaliou condução óssea para o traje xEMU (ICES 2024) só quanto a ajuste e conforto, em cinco participantes.
- O Dreem (faixa com EEG seco) já monitorou sono na ISS (Thomas Pesquet, 2021).
- **Não há evidência de que EOG detecte SANS.** O argumento do óculos para SANS é que todo tripulante já leva pelo menos três pares de lentes de graus diferentes; o Orbit ocupa um lugar que já existe no rosto.
- Rotina: horário GMT; referência de acordar 06h00 e dormir 21h30; a NASA-STD-3001 recomenda 8,5 h de oportunidade de sono; a tripulação dorme no mesmo período, com ajustes quando chegam veículos.
- **Diferencial defensável:** integração com o painel de saúde, operação offline, personalização cultural escolhida pelo tripulante e validação em missão com grupo controle.

### Frente 5: massa, computação e lançamento

- Orbit estimado em 54 g (mínimo) a 72 g (realista), sem lentes e sem pesagem de protótipo.
- Quatro canais de EEG e EOG a 250 Hz e 24 bits geram 97,2 MB numa noite de 9 h.
- Estagiamento do sono não exige GPU: YASA roda uma noite inteira em menos de 5 s num laptop comum. **Configuração mínima: reaproveitar o laptop de bordo, massa adicional de computação próxima de zero.**
- Custo histórico de carga para a ISS (NASA OIG): US$ 63.200/kg no CRS-1 e US$ 71.800/kg projetado no CRS-2; um Orbit custaria cerca de US$ 3.400 a 5.200 em fatia de carga.
- Equação do foguete com Isp de 348 s e 9,4 km/s: 14,71 kg de propelente por kg adicional num estágio idealizado (explica sensibilidade, não combustível que um foguete real acrescentaria).

### Frente 6: dados abertos, software e fluxo de dados

- Sinais vitais da tripulação **não** são monitorados continuamente no dia a dia da ISS; o ambiente (ECLSS) sim, pelos controladores ETHOS e pelo BME no controle de missão.
- OSDR tem API testada (OSD-575, Inspiration4 com painel metabólico e citocinas); LSDA e LSAH exigem solicitação formal para dado individual.
- NOAA SWPC (prótons do GOES, Kp, alertas) e DONKI funcionam abertos e foram testados.
- Artemis II voou em abril de 2026; o ARCHeR usou vestíveis de pulso para movimento e sono; os dados são pedidos via LSDA, sem API aberta.
- Latência de Marte, interrupções e privacidade justificam operação offline, sincronização assíncrona e permissões por perfil, como já está na arquitetura.

## 6. Cota do Codex

| Medida | Janela de 5 h | Janela semanal | Agentes em execução |
| --- | --- | --- | --- |
| 02h03 | 21% | 5% | 6 |
| 02h25 | 33% | 7% | 6 |
| 02h36 | 36% | 8% | 5 |
| 02h56 | 42% | 9% | 3 |
| 03h36 | 49% | 10% | 3 |
| 04h16 | 57% | 11% | 3 |
| 04h37 | 61% | 12% | 3 |
| 04h57 | 64% | 12% | 2 |
| 05h36 | 68% | 13% | 1 |
| 05h51 | Todas as 19 frentes concluídas; nenhum agente parou por cota; tarefas agendadas canceladas |  | 0 |

Ritmo com 6 agentes: cerca de 33 pontos por hora, o que esgotaria a janela por volta de 04h30. Com 3 agentes, o consumo cai para perto da metade e a janela deve durar até o reinício às **06h29**. Lembrete agendado para 06h33 para retomar agentes que parem por cota, e verificação a cada 20 minutos.

## 7. Regras dadas aos agentes

Ver `pesquisa/METODO.md` no repositório: fonte primária com URL e etiqueta de confiança em cada fato, "NÃO ENCONTRADO" em vez de número inventado, português sem travessão, escrever só no próprio arquivo, salvar a cada seção.
