---
kind: spec
title: "Frentes de pesquisa (agentes Luna)"
---

# Frentes de pesquisa

**Estado em 15/11, 08h45: as 19 frentes estão concluídas e aprovadas.** Período de execução: 01h30 a 05h40. Quatro frentes voltaram uma vez para correção (3, 5, 9 e 12) e todas foram aprovadas na segunda entrega. Nenhum agente parou por falta de cota (a janela de 5 horas do Codex fechou em 68%).

Cada frente foi executada por um agente GPT-6 Luna (Codex, esforço máximo), escreveu só no próprio arquivo em `pesquisa/bruto/`, seguiu as regras de `pesquisa/METODO.md` e foi revisada pelo coordenador antes de aprovada (checagem automática de travessão, meia-risca, fontes e tabelas, mais conferência por amostragem dos números-chave). O texto completo de cada frente está no repositório; aqui ficam o andamento e os achados.

Pedidos do dono, 15/11: *"Mantenha os 6 agentes simultâneos por vez."* (02h05), substituído por *"mantenha apenas 3 lunas por vez a partir dos próximos que forem encerrando"* (02h25) · *"Ao passo que o luna for entregando, revise as informações [...] se não informe ele sobre os erros e peça para ele retomar e corrigir"* · *"Já desenhe todas as frentes de pesquisa [...] se encontrar potenciais novas pesquisas adicione nesse mesmo arquivo"* · *"Sempre que terminar uma tarefa atualize a EPIC."*

## 1. Painel geral

| # | Frente | Aberta | Devolvida | Aprovada | Entrega | Alimentou |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | ECLSS, ambiente da cabine, radiação e telemetria pública | 01h30 | | ✅ 02h19 | `01-eclss-ambiente-radiacao.md` (581 linhas, 121 fontes) | `docs/02`, `docs/12` |
| 2 | Equipamentos médicos e fisiológicos da tripulação | 01h30 | | ✅ 01h59 | `02-equipamentos-medicos-tripulacao.md` (452 linhas, 91 fontes) | `docs/02`, `docs/06`, `docs/14` |
| 3 | Riscos do HRP, indicadores e limiares | 01h30 | ↩️ 02h13 | ✅ 02h28 | `03-riscos-indicadores-limiares.md` (564 linhas) | `docs/01`, `docs/03` |
| 4 | Precedentes do óculos, sono e rotina | 01h30 | | ✅ 02h00 | `04-precedentes-oculos-sono.md` (426 linhas, 75 fontes) | `docs/09`, `docs/11`, `docs/14` |
| 5 | Massa, computação embarcada e custo de lançamento | 01h30 | ↩️ 02h07 | ✅ 02h17 | `05-massa-computacao-lancamento.md` (470 linhas, 76 fontes) | `docs/09`, `docs/10` |
| 6 | Dados abertos, software da NASA e fluxo de dados | 01h30 | | ✅ 02h19 | `06-dados-abertos-software-fluxo.md` (548 linhas, 302 fontes) | `docs/12`, `docs/14` |
| 7 | Desafio oficial, padrões de interface e alarme, monitoramento entre colegas | 02h05 | | ✅ 02h44 | `07-desafio-oficial-padroes-interface.md` (323 linhas, 44 fontes) | `docs/07`, `docs/08`, `docs/11` |
| 8 | Autoavaliações implementáveis | 02h05 | | ✅ 02h50 | `08-autoavaliacoes-implementaveis.md` (427 linhas, 72 fontes) | `docs/03`, `docs/04` |
| 9 | Perfis de dados simulados | 02h22 | ↩️ 03h20 | ✅ 03h36 | `09-perfis-dados-simulados.md` e `perfis-simulacao.rascunho.json` | gerador simulado do protótipo |
| 10 | Orientações e contramedidas | 02h22 | | ✅ 02h55 | `10-orientacoes-contramedidas.md` (821 linhas, 158 fontes) | `docs/03`, `indicadores.json` |
| 11 | Amostras reais para o modo demonstração | 02h22 | | ✅ 04h34 | `11-amostras-reais.md` e `prototipo/dados/amostras-reais/` (23 arquivos) | `docs/02`, `docs/12` |
| 12 | Consolidação dos limiares | 02h56 | ↩️ 04h10 | ✅ 04h41 | `docs/03` e `prototipo/config/indicadores.json` | motor de regras |
| 13 | IA médica embarcada | 03h37 | | ✅ 04h01 | `13-ia-medica-embarcada.md` (327 linhas, 55 fontes) | `docs/11` |
| 14 | Pipeline de sinais do óculos | 04h03 | | ✅ 04h25 | `14-oculos-pipeline-sinais.md` (302 linhas, 53 fontes) | construção do óculos |
| 15 | Áudio e acervo sonoro do óculos | 04h27 | | ✅ 04h48 | `15-oculos-audio-acervo.md` (212 linhas, 36 fontes) | construção do óculos |
| 16 | Artemis II, Gateway e Marte | 04h37 | | ✅ 04h53 | `16-artemis-marte.md` (265 linhas, 52 fontes) | `docs/16` |
| 17 | Caminho até voar | 04h43 | | ✅ 05h14 | `17-caminho-ate-voar.md` (292 linhas, 75 fontes) | `docs/16` |
| 18 | Aplicações na Terra e impacto | 04h49 | | ✅ 05h09 | `18-aplicacoes-terra-impacto.md` (209 linhas, 40 fontes) | `docs/16` |
| 19 | Checagem cruzada final | 05h15 | | ✅ 05h40 | `19-checagem-cruzada.md` (154 linhas, 40 itens) | correções em `docs/02`, `03`, `04`, `05` e perfis |

## 2. Andamento e achados de cada frente

### Frente 1: ECLSS, ambiente da cabine e radiação
- **Andamento:** aberta 01h30; aprovada 02h19 sem correção. Etiquetas no formato "OFICIAL, [link]", aceitas.
- **Achados:** os segmentos americano e russo têm sistemas próprios, e a leitura de um módulo não vale para os outros (o software precisa saber onde cada tripulante está). Regra operacional da ISS para CO2: média de 24 h até 3 mmHg desde 2016; NASA-STD-3001 Vol 2 limita a média de 1 h a 3 mmHg; dados de 2025 mostram 1,7 a 2,1 mmHg típicos. 4B CO2 é o sistema primário; 98% de recuperação de água demonstrada. Monitores de ar e água funcionam por amostra ou campanha, sem feed contínuo público. Radiação: dosímetro pessoal ativo (CAD) com downlink, passivo (CPD) lido depois; limite de carreira menor que 600 mSv; a faixa de 80 a 160 mSv do documento inicial é estimativa alta, e um resumo técnico da NASA de 2024 traz 50 a 100 mSv.

### Frente 2: equipamentos médicos da tripulação
- **Andamento:** aberta 01h30; entregue 01h56; aprovada 01h59 sem correção.
- **Achados:** o cuidado médico a bordo (CHeCS) tem três partes separadas (HMS clínica, EHS ambiente, CMS exercício) e não existe painel contínuo com todos os sinais vitais; esse é o espaço do software. A maior parte das medidas do corpo é pontual, por campanha ou de pesquisa (conferência médica semanal, exames de olhos em FD30, FD90 e R-30, sangue e urina analisados na Terra). Bio-Monitor (CSA) na ISS desde dezembro de 2018, sessões de até 48 h. Oxímetro existe no kit, sem modelo publicado. Ultrasound 3 chegou em 2025 para substituir o Ultrasound 2 (desde 2011). **Aplicado no `docs/06`:** dado do corpo tem latência e estados próprios.

### Frente 3: riscos, indicadores e limiares
- **Andamento:** aberta 01h30; devolvida 02h13 (ruído NC-50 e NC-40 em dBA errados, duas linhas coladas na tabela mestra, LxC de 7 riscos faltando, revisão da norma sem letra); aprovada 02h28.
- **Achados:** LxC do HRP é risco de programa, não semáforo clínico. SANS: cerca de 70% com algum sinal e 18% clinicamente preocupante (brief da NASA); 81% numa coorte de 64; "47 a 48%" é deslocamento hipermetrópico de olhos, não necessidade de óculos. Requisitos oficiais com número: CO2 média de 1 h até 3 mmHg (V2 6004), PIO2 de 145 a 155 mmHg, pressão acima de 5 até 15 psia, carreira menor que 600 mSv e limites por órgão em mGy-Eq, ruído NC-50 (cerca de 58 dBA) e NC-40 (cerca de 49 dBA), sono planejado de 8,5 h. Para a maioria dos sinais vitais e para SANS a NASA não publica limiar de voo; valores terrestres ficam marcados como tal.

### Frente 4: precedentes do óculos, sono e rotina
- **Andamento:** aberta 01h30; aprovada 02h00 sem correção (corrigiu um erro do próprio briefing sobre o EEG de Mogensen).
- **Achados:** o AttentivU (MIT) já juntou EEG, EOG e condução óssea numa armação, então a combinação não é inédita. A NASA avaliou condução óssea para o xEMU (2024) só quanto a ajuste e conforto. O Dreem monitorou sono na ISS (Pesquet, 2021). **Não há evidência de que EOG detecte SANS**; o argumento do óculos é que todo tripulante já leva pelo menos três pares de lentes. Rotina em GMT, acordar por volta de 06h00 e dormir por volta de 21h30, todos no mesmo período. Diferencial defensável: integração com o painel, offline, personalização cultural, validação em missão.

### Frente 5: massa, computação e lançamento
- **Andamento:** aberta 01h30; devolvida 02h07 (parâmetros do DeepSleepNet atribuídos errado); aprovada 02h17.
- **Achados:** óculos de 54 a 72 g sem lentes; 4 canais a 250 Hz geram 97,2 MB por noite. Estagiamento do sono não precisa de GPU (DeepSleepNet original tem 21 a 24,7 milhões de parâmetros; TinySleepNet, DeepSleepNet-Lite e YASA são leves). Configuração mínima reaproveita o laptop de bordo. Custo de carga para a ISS (NASA OIG): US$ 63.200/kg no CRS-1 e US$ 71.800/kg projetado no CRS-2. Equação do foguete: 14,71 kg de propelente por kg num estágio idealizado.

### Frente 6: dados abertos, software e fluxo de dados
- **Andamento:** aberta 01h30; aprovada 02h19 sem correção.
- **Achados:** sinais vitais da tripulação não são monitorados continuamente; o ambiente sim, pelos controladores ETHOS e BME. OSDR com API testada (Inspiration4); LSDA e LSAH exigem solicitação formal. NOAA SWPC e DONKI abertos e testados. Artemis II usou vestíveis de pulso (ARCHeR). Inventário do software de saúde da NASA (CHeCS, WinSCAT, Cognition, ISS FIT, OOHA, IMM, MDA e outros) com quem fez e se segue em uso.

### Frente 7: desafio oficial e padrões de interface
- **Andamento:** aberta 02h05; acréscimo de monitoramento entre colegas 02h12 (pedido do Monitor geral); aprovada 02h44 sem correção.
- **Achados:** o desafio é "Create Health Monitoring Software for Astronauts on Space Missions", Space Apps 2026, nível Intermediate; envio fecha em **15/11 às 23h59 no horário do evento local**; termos pedem licença aberta (Apache 2.0 por padrão); 5 recursos oficiais (3 NASA, 2 CSA); critérios de julgamento e regra de IA não confirmados (página global com HTTP 502). Na ISS, vermelho, amarelo, piscar e som pertencem ao sistema de Caution and Warning. **Aplicado no design:** prefixo "Saúde:", nada pisca nem toca som, vermelho só como contorno; Monitor geral com consentimento granular por audiência e "Oferecer apoio" (privacidade médica pela NASA-STD-3001 Vol 1, V1 7003, 6003 e 6011).

### Frente 8: autoavaliações implementáveis
- **Andamento:** aberta 02h05; aprovada 02h50 sem correção.
- **Achados:** PVT-B de 3 minutos é o paradigma do Reaction Self Test da ISS (intervalo de 1 a 4 s, lapso a partir de 355 ms; registrar também 500 ms); PVT padrão de 10 minutos com intervalo de 2 a 10 s. Cognition e WinSCAT são ferramentas fechadas. KSS e Samn-Perelli são de uso livre; PSQI e POMS são protegidos; PHQ-9 exige resposta humana no item 9. Propostas de check-in diário de 2 minutos e semanal de 10 minutos com escalas livres. **Aplicado no `docs/04`.**

### Frente 9: perfis de dados simulados
- **Andamento:** aberta 02h22; devolvida 03h20 (faltavam glicose, exemplo citado no desafio, e hemoglobina); aprovada 03h36.
- **Achados:** 35 indicadores com valor típico, variação, ruído, ritmo diário e tendência em 180 dias; 7 tripulantes fictícios; roteiro de missão; magnitudes dos cenários C1 a C5. CO2 por módulo a partir do OCHMO-TB-004. A hemólise 54% maior em voo (Trudel 2022) não foi convertida em queda de hemoglobina, porque o estudo não mediu hemograma em série. Cenários C1 e C5 ajustados depois pelo coordenador para casar com os limiares (CO2 de 2,95 mmHg; água de 1.000 mL por dia).

### Frente 10: orientações e contramedidas
- **Andamento:** aberta 02h22; aprovada 02h55 sem correção.
- **Achados:** um bloco de orientação para cada um dos 42 indicadores da tabela mestra e das 6 regras de cruzamento (o que o astronauta faz, como o colega ajuda, o que o CMO faz, gatilho para subir de nível, por que importa). Exercício: média observada de cerca de 2 h por dia e bloco programado de cerca de 2,5 h. Contramedidas de SANS como thigh cuffs e pressão negativa são pesquisa, não rotina. **Nenhum remédio ou dose recomendado.**

### Frente 11: amostras reais para a demonstração
- **Andamento:** aberta 02h22; gravação ao vivo de 3 horas; aprovada 04h34 sem correção.
- **Achados:** telemetria pública da ISS gravada por 120 minutos (158.753 registros) mais 60 minutos de recuperação, com a posição da estação e duas passagens pela região da Anomalia do Atlântico Sul; NOAA (prótons do GOES, Kp, alertas) e DONKI dos últimos 90 dias (55 FLR, 11 SEP, 323 CME, 3 GST). **Resolveu a divergência de unidade:** as pressões do feed são torr ou mmHg, não psia; ppCO2 do laboratório com mediana de 2,44 mmHg. Licença de redistribuição do feed não encontrada.

### Frente 12: consolidação dos limiares
- **Andamento:** aberta 02h56; devolvida 04h10 (faixas só em texto, sem camada numérica para o motor; humor em 0 a 100); aprovada 04h41; reparo de acentos corrompidos concluído às 05h51 por um agente Claude.
- **Achados:** `docs/03` com 73 indicadores e `indicadores.json` com 35 indicadores e 6 regras, em 4 classes (10 requisito oficial, 8 referência terrestre, 16 linha de base, 1 sintoma). Cada indicador tem `regraCor` determinística e `exemplosTeste`; o nível 4 só vem de sintoma. Valores de demonstração separados e marcados (por exemplo CO2 acima de 2,8 mmHg para amarelo). Humor em escala de 1 a 5.

### Frente 13: IA médica embarcada
- **Andamento:** aberta 03h37; aprovada 04h01 sem correção.
- **Achados:** o assistente digital do CMO (NASA e Google, agosto de 2025) é prova de conceito com cenários simulados, sem uso em voo; a imprensa o descreve rodando na nuvem do Google, o que reforça o diferencial offline. Doc-in-a-Box: 76 de 100 em avaliação clínica estruturada. IMM e MEDPRAT são modelos de risco de missão, não IA clínica. CIMON dependia de nuvem. Modelo de linguagem local de 1 a 8 bilhões de parâmetros cabe em 0,5 a 4 GB. Recomendação: no protótipo, tendências pessoais explicáveis e YASA; modelo de linguagem fica para a visão futura; humano sempre no circuito.

### Frente 14: pipeline de sinais do óculos
- **Andamento:** aberta 04h03; aprovada 04h25 sem correção.
- **Achados:** montagem mínima de 3 canais (EEG frontal, EOG horizontal e vertical) com 6 contatos; ADS1299-4 a 250 Hz; Bluetooth precisa de cerca de 24 kbit/s, com gravação local íntegra. Não há evidência de eletrodo seco de armação em microgravidade. Estagiamento: YASA 85,12% com um EEG e 86,92% com EEG e EOG; Dreem 83,5% em montagem seca (resultados terrestres). Bases públicas com licença, contrato de dados com o software e roteiro de construção até a validação contra polissonografia.

### Frente 15: áudio e acervo sonoro do óculos
- **Andamento:** aberta 04h27; aprovada 04h48 sem correção.
- **Achados:** 115 dBA é o teto da NASA para áudio pessoal, não nível confortável; dose de ruído de 24 h limitada a 100. A ficha do transdutor ISL citado na frente 5 é incoerente (pedir errata e medir); alternativas Dayton BCE-1 e Adafruit 1674; amplificador TPA2015D1 com 1,7 mA em repouso. Pré-sono a partir de 19h30 GMT; som desligado durante o sono. Evidência de sons e sono é fraca e heterogênea. NPS Sound Gallery em domínio público; Fonoteca Neotropical restringe uso comercial. O tripulante escolhe o próprio perfil cultural.

### Frente 16: Artemis II, Gateway e Marte
- **Andamento:** aberta 04h37; aprovada 04h53 sem correção (reformulação do Artemis conferida na imprensa).
- **Achados:** Artemis II voou de 1 a 10 de abril de 2026 (Wiseman, Glover, Koch, Hansen); estudos de saúde em análise, dados futuros pelo LSDA. Em fevereiro de 2026 o Artemis III virou teste em órbita da Terra (2027) e o pouso passou para o Artemis IV (2028). Orion tem kit para 128 condições. Marte: atraso de 4 a 24 minutos por trecho e cerca de 13 dias a três semanas sem contato direto na conjunção solar; Earth Independent Medical Operations.

### Frente 17: caminho até voar
- **Andamento:** aberta 04h43; aprovada 05h14 sem correção.
- **Achados:** não existe inscrição única para voar; a rota passa por chamada ou patrocinador, pesquisador principal, ética e segurança. **O ajuste Brasil e NASA de 1997 sobre cargas úteis está listado como suspenso pela AEB**, então a participação brasileira não é automática. Piloto cruzado de 8 a 12 participantes focado em viabilidade. Revisões de segurança por fases para o hardware. Análogos viáveis: HERA e Concordia (NEEMO descontinuado, CHAPEA 2 encerrada). Estimativa de 3 a 6 anos até o voo.

### Frente 18: aplicações na Terra e impacto
- **Andamento:** aberta 04h49; aprovada 05h09 sem correção.
- **Achados:** Estação Antártica Comandante Ferraz com médico e enfermeiro e teste de telemedicina em 2022; Parintins com 22 pontos de telessaúde (9 ribeirinhos) e 1.116 teleconsultas de janeiro a agosto de 2026; telessaúde em 24 dos 34 Distritos Sanitários Especiais Indígenas; NR-37 nas plataformas. Limiares personalizados melhoram o valor preditivo em insuficiência cardíaca. Regulação: ANVISA e LGPD. Nenhum impacto do Orbit apresentado como comprovado.

### Frente 19: checagem cruzada final
- **Andamento:** aberta 05h15; aprovada 05h40; correções aplicadas pelo coordenador às 05h40.
- **Achados:** 40 números e fatos conferidos, sem erro grave fora da fila. Correções aplicadas: exemplo de CO2 do `docs/03` alinhado ao cenário C1; `docs/02` na Rev F com as janelas de CO2 de 1 h, 24 h e 7 dias diferenciadas; gatilho do cenário C2 (150 pfu, escala S2 da NOAA, evento SEP); janela inclusiva de 14 dias no C3; regra de hidratação e cenários C4 e C5 sem linguagem de diagnóstico; `METODO.md` sem a sequência proibida. Pendente: rubrica de julgamento e regra de IA do Space Apps (site global ainda com HTTP 502).

## 3. Consolidação em `docs/`

A redação dos documentos grandes foi delegada a agentes Claude com especificação fechada e revisada pelo coordenador; a cota do Codex ficou reservada para as frentes Luna.

| Documento | Vem das frentes | Estado |
| --- | --- | --- |
| `docs/01-contexto-missao.md` | 2, 3, 4 | ✅ 02h45, 320 linhas; lista de dores ampliada de 15 para 36 condições |
| `docs/02-equipamentos-e-dados.md` | 1, 2 | ✅ 02h42, 494 linhas, 117 fontes |
| `docs/03-indicadores-e-limiares.md` e `indicadores.json` | 3, 8, 10, 12 | ✅ 04h41; acentos restaurados às 05h51 |
| `docs/09-oculos-orbit.md` | 4, 5 | ✅ 02h43, 430 linhas |
| `docs/10-massa-energia-lancamento.md` | 5 | ✅ 02h43, 346 linhas, contas refeitas por script |
| `docs/11-precedentes.md` | 4, 6, 7, 13 | ✅ 04h56, 281 linhas, 84 fontes conferidas por script |
| `docs/12-fontes-de-dados-abertas.md` | 1, 6, 11 | ✅ 02h47, 450 linhas |
| `docs/13-glossario.md` e `docs/15-referencias.md` | todas | ✅ 05h46, 470 termos e 958 URLs únicas |
| `docs/14-perguntas-respondidas.md` | 1, 2, 3, 4, 6 | ✅ 02h47, 335 linhas, com tabela de correções ao documento inicial |
| `docs/16-proximos-passos-e-impacto.md` | 16, 17, 18 | ✅ 05h30, 306 linhas, com lista do que não dizer |

Os `docs/00`, `04`, `05`, `06`, `07` e `08` foram escritos pelo coordenador e atualizados com os achados das frentes 2, 7, 8, 9, 11, 12 e 19.

## 4. Ciclo de revisão

| Frente | Por que voltou | O que mudou na segunda entrega |
| --- | --- | --- |
| 3 | Ruído NC-50 e NC-40 em 77 e 67 dBA; linhas coladas na tabela mestra; LxC de 7 riscos faltando; revisão da norma sem letra | NC-50 cerca de 58 dBA e NC-40 cerca de 49 dBA (os 77 e 67 eram marcadores das curvas NC-70 e NC-60); tabela corrigida; LxC recuperados; Vol 2 Rev F |
| 5 | DeepSleepNet com 0,78 milhão de parâmetros | 21 a 24,7 milhões no original, mais TinySleepNet, DeepSleepNet-Lite e YASA |
| 9 | Faltavam glicose e hemoglobina | Os dois acrescentados, com referência terrestre e anemia do voo espacial |
| 12 | Faixas só em texto; humor em 0 a 100 | `regraCor` e `exemplosTeste` em todos os indicadores; humor de 1 a 5 |

Conferências por amostragem com busca na web: valores do OIG (IG-18-016), parâmetros do DeepSleepNet, equivalência NC em dBA (NTRS 20090043801), assistente do CMO (NASA e Google, 2025), reformulação do Artemis (fevereiro de 2026). Problema detectado depois da aprovação: a correção da frente 12 tinha regravado acentos como "?" (o console também mostra acentos como "?", o que mascarou o problema); restaurado às 05h51.

## 5. Pesquisas potenciais e lacunas encontradas no caminho

| Origem | Lacuna | Destino ou resultado |
| --- | --- | --- |
| Frentes 1 e 6 | Unidade dos itens de pressão da telemetria pública (torr ou psia) | ✅ Resolvido pela frente 11: torr ou mmHg; temperaturas e tanques seguem sem unidade confirmada |
| Frente 1 | Dose de 6 meses: 80 a 160 mSv versus 50 a 100 mSv | ✅ Documentos citam as duas com a fonte de cada uma (frente 19) |
| Frente 2 | Formato de arquivo do Bio-Monitor e modelo do oxímetro a bordo não públicos | Pergunta para a NASA e a CSA na apresentação |
| Frente 3 | NASA não publica limiar de voo para a maioria dos sinais vitais e para SANS | ✅ Frente 12 classificou cada indicador e marcou valores de demonstração |
| Frente 3 | Divergência BMed 2x3 versus 2x2 entre páginas da NASA | Registrada no `docs/01` |
| Frente 4 | Condução óssea nunca validada em microgravidade; sons naturais nunca estudados para sono de astronautas | É o estudo que o Orbit propõe (frentes 15 e 17, `docs/16`) |
| Frente 5 | Ficha do transdutor de condução óssea incoerente | ✅ Frente 15: pedir errata, medir a peça, alternativas listadas |
| Frente 7 | Página global, rubrica e regra de IA do Space Apps fora do ar | ⚠️ Frente 19 tentou de novo, ainda HTTP 502; o dono confere no evento local |
| Frente 7 | Sem regra pública da NASA para monitor coletivo de saúde | ✅ Consentimento granular aplicado no `docs/06` e no `docs/07`; pergunta para a NASA |
| Frente 8 | Licença e versão atual do Reaction Self Test; escalas protegidas | Protótipo usa escalas livres e perguntas autorais |
| Frente 11 | Licença de redistribuição do feed da ISS e da API de posição | ⚠️ Decisão do dono antes de tornar o repositório público |
| Frente 15 | Licenças por banco de sons (Fonoteca Neotropical não comercial) | Usar domínio público ou CC0 na demonstração; o dono decide o acervo brasileiro |
| Frente 17 | Ajuste Brasil e NASA de 1997 suspenso; elegibilidade brasileira em cada chamada | Pergunta para a AEB e a NASA; registrado no `docs/16` |
| Redação do `docs/01` | Tamanho da tripulação e lista de módulos sem fonte nas frentes | Em aberto; o protótipo testa até 7 tripulantes sem afirmar número oficial |
| Redação do `docs/09` | Orçamento de energia do óculos apertado | Recomendação: planejar 50 mW e bateria de 800 mAh |

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
| 05h51 | Todas as 19 frentes concluídas; nenhum agente parou por cota; tarefas agendadas canceladas | | 0 |

Com 6 agentes o consumo foi de cerca de 33 pontos por hora; com 3, cerca de 10 a 12.

## 7. Regras dadas aos agentes

Ver `pesquisa/METODO.md` no repositório: fonte primária com URL e etiqueta de confiança em cada fato, "NÃO ENCONTRADO" em vez de número inventado, português sem travessão nem meia-risca, escrever só no próprio arquivo, salvar a cada seção, responder ao coordenador ao terminar.
