# 11. Amostras reais para a demonstração

Consulta e coleta iniciadas em 15 de novembro de 2026. Responsável: Luna 11. Estado: coleta concluída e análise consolidada. Os arquivos de dados e scripts ficam em `prototipo/dados/amostras-reais/`; dependências locais em `prototipo/dados/amostras-reais/scripts/`.

## Resumo executivo

1. A captura principal ISSLIVE completou 120 minutos, com 158.753 registros de telemetria e 120 posições. O cliente abriu `CONNECTED:WS-STREAMING`, aceitou 22 itens e reconectou após a interrupção de cerca de 26 segundos às 05:57:48Z. [TESTADO](https://push.lightstreamer.com/); [TESTADO](https://api.wheretheiss.at/v1/satellites/25544)
2. A primeira amostra de pressão trouxe ppO₂ Lab 165,85, ppN₂ Lab 577,62, ppCO₂ Lab 2,44 e pressão da cabine 757,74. A ordem de grandeza é compatível com torr ou mmHg, não PSIA; não separa torr de mmHg. [TESTADO](https://push.lightstreamer.com/); [INFERÊNCIA](https://iss-mimic.github.io/Mimic/); [OFICIAL](https://ntrs.nasa.gov/api/citations/20170001943/downloads/20170001943.pdf?__source=newsletter%7Cspacenewsletter)
3. A primeira consulta de posição recebida às 05:30:26Z reportou latitude 36,663729°, longitude -80,169533°, altitude 422,40 km e velocidade 27.583,44 km/h. [TESTADO](https://api.wheretheiss.at/v1/satellites/25544)
4. O JSON GOES integral de 7 dias contém 16.104 registros em oito canais, de 1 a 500 MeV, com intervalo de 5 minutos por canal na maior parte da amostra. [TESTADO](https://services.swpc.noaa.gov/json/goes/primary/integral-protons-7-day.json)
5. O JSON Kp contém 358 registros de um minuto, de 2026-11-14T23:45Z a 2026-11-15T05:42Z. [TESTADO](https://services.swpc.noaa.gov/json/planetary_k_index_1m.json)
6. O arquivo SWPC de alertas preserva 72 mensagens emitidas entre 2026-10-16T14:19:49.850Z e 2026-11-15T05:16:57.317Z. [TESTADO](https://services.swpc.noaa.gov/products/alerts.json)
7. A escala oficial S de tempestades de radiação usa fluxo integral de prótons ≥10 MeV, com níveis de 10, 100, 1.000, 10.000 e 100.000 pfu para S1 a S5. [OFICIAL](https://www.spaceweather.gov/noaa-scales-explanation)
8. DONKI retornou 55 eventos FLR e 11 SEP no intervalo de 90 dias consultado; não houve SEP na segunda janela. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2026-08-17&endDate=2026-10-01&api_key=DEMO_KEY); [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/SEP?startDate=2026-10-02&endDate=2026-11-15&api_key=DEMO_KEY)
9. DONKI retornou 323 CME e 3 GST; a primeira janela GST veio vazia. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/CME?startDate=2026-08-17&endDate=2026-10-01&api_key=DEMO_KEY); [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/GST?startDate=2026-10-02&endDate=2026-11-15&api_key=DEMO_KEY)
10. A tentativa DONKI com 90 dias em uma solicitação retornou HTTP 400 por ultrapassar a janela máxima de 60 dias; duas janelas por tipo geraram oito respostas aceitas. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2026-08-17&endDate=2026-11-15&api_key=DEMO_KEY)

## Método e escopo

O método da pesquisa e os mapas das frentes 1 e 6 foram lidos antes da coleta. Node.js 24.18.0, npm 11.16.0 e Python 3.12.10 estão instalados nesta máquina. [TESTADO, ferramentas locais]

Para ISSLIVE foi usada a biblioteca oficial Node.js Client SDK do Lightstreamer, versão 9.2.2, instalada localmente na pasta de scripts, sem instalação global. O endpoint público respondeu com estado `CONNECTED:WS-STREAMING`, e o servidor aceitou a inscrição em 22 itens. [OFICIAL](https://lightstreamer.com/sdks/ls-nodejs-client/9.2.2/api/index.html); [TESTADO](https://github.com/Lightstreamer/Lightstreamer-example-ISSLive-client-javascript)

O `PUIList.xml` do cliente lista PSIA para ppO₂/ppN₂/ppCO₂ e usa CNT para alguns sensores de temperatura; o mapa comunitário atribui torr ou °C a alguns dos mesmos itens. A amostra observada tem magnitudes de cerca de 150 a 166 para ppO₂, 578 a 594 para ppN₂, 2,4 a 3 para ppCO₂ e 758 para pressão total. As pressões parciais e a pressão total são compatíveis com torr/mmHg, não com psia. A ordem de grandeza não distingue torr de mmHg. As temperaturas têm valores compatíveis com °C, mas a divergência CNT/°C não pode ser resolvida apenas pela magnitude. A unidade transmitida permanece inferência empírica, não correção do catálogo. [SECUNDÁRIA](https://github.com/Lightstreamer/Lightstreamer-example-ISSLive-client-javascript/blob/master/src/assets/PUIList.xml); [SECUNDÁRIA](https://iss-mimic.github.io/Mimic/); [INFERÊNCIA](https://ntrs.nasa.gov/api/citations/20170001943/downloads/20170001943.pdf?__source=newsletter%7Cspacenewsletter); [OFICIAL](https://www.nist.gov/pml/owm/metric-si/unit-conversion/pressure-and-gas-flow-unit-conversions)

## D1. ISS Live / ISSLIVE

A captura principal começou às 2026-11-15T05:30:26Z e encerrou por duração às 07:30:26Z, após 120 minutos. O assinante grava o instante UTC de recebimento, nome do item, valor bruto e os itens de tempo `TIME_000001` e `TIME_000002`, quando recebidos. O mapa comunitário descreve esses itens como horário GMT e ano, mas não documenta epoch nem regra de conversão. Nas amostras, a transformação candidata, início de 2026 acrescido do valor bruto e ajustado 24 horas para trás, alinha com UTC; na captura principal o horário calculado antecedeu o recebimento por mediana de 3,831 segundos. Um exemplo comunitário independente ajusta em 24 horas o campo `TimeStamp` do SDK, mas isso não define o formato do item `TIME_000001`. A conversão deste item permanece inferência, então o CSV mantém o valor bruto. A posição orbital é consultada em paralelo a cada 60 segundos. [TESTADO](https://github.com/Lightstreamer/Lightstreamer-example-ISSLive-client-javascript); [SECUNDÁRIA](https://github.com/joepavitt/node-red-iss-data-streamer); [SECUNDÁRIA](https://qiita.com/stt/items/2206ad4f3acfe1ea2447); [TESTADO](https://push.lightstreamer.com/); [TESTADO](https://wheretheiss.at/w/developer)

Itens assinados: `USLAB000053` a `USLAB000055`, `USLAB000058` a `USLAB000061`, `NODE3000001` a `NODE3000013` e `TIME_000001` a `TIME_000002`. O callback de assinatura foi recebido para 22 itens. Isso confirma a aceitação da assinatura pelo cliente, não a existência de atualização nova para cada item. Os nomes, descrições e unidades vêm de mapas comunitários e do catálogo do exemplo Lightstreamer, que não cobre todos os itens assinados. [TESTADO](https://github.com/Lightstreamer/Lightstreamer-example-ISSLive-client-javascript); [SECUNDÁRIA](https://github.com/joepavitt/node-red-iss-data-streamer)

Arquivos da captura principal: `prototipo/dados/amostras-reais/isslive-telemetria-20261115T053026Z.csv` e `prototipo/dados/amostras-reais/iss-posicao-20261115T053026Z.csv`. A telemetria usa modo MERGE, portanto só grava alterações recebidas. O item `TIME_000001` serve também como indicador de atividade do fluxo. Às 05:57:48Z, o cliente registrou `DISCONNECTED:TRYING-RECOVERY`; às 05:58:14Z, voltou a `CONNECTED:WS-STREAMING` e aceitou novamente os 22 itens. Às 06:11:53Z, o processo seguia ativo e a posição continuava sendo gravada, mas o último registro ISSLIVE permanecia em 06:04:38Z; não havia outro callback de desconexão no log. Isso indica pausa observada no fluxo de valores, sem causa de rede confirmada. Para verificar se uma nova sessão recebia atualização, uma segunda assinatura de 60 minutos começou às 06:14:56Z. Ela criou `isslive-telemetria-20261115T061456Z.csv` e `iss-posicao-20261115T061456Z.csv`, conectou em `WS-STREAMING` às 06:14:57Z e recebeu as 22 amostras iniciais às 06:14:58Z. Nessa segunda assinatura, `TIME_000001` valeu `27583470000`; subtraindo 24 horas da hipótese de milissegundos desde 2026-01-01T00:00Z, o instante candidato é 06:04:30Z, 10 minutos e 28 segundos antes do recebimento. O primeiro registro novo após o congelamento chegou às 06:21:05.970Z; o relógio do feed avançou às 06:21:06.100Z para `27584460898`, correspondente a 06:21:00.898Z pela mesma transformação. Isso confirma uma pausa de cerca de 16 minutos e 31 segundos na série do relógio, seguida de retomada sem callback de desconexão registrado. Às 06:27:15Z, a segunda CSV ISSLIVE tinha 13.578 registros e a captura principal tinha 55.451. [TESTADO](https://push.lightstreamer.com/); [TESTADO](https://api.wheretheiss.at/v1/satellites/25544); [SECUNDÁRIA](https://github.com/joepavitt/node-red-iss-data-streamer); [INFERÊNCIA](https://push.lightstreamer.com/)

A captura de recuperação encerrou por duração às 07:14:56Z, com código de saída 0 e zero falhas de posição. Sua CSV de telemetria contém 97.472 registros entre 06:14:58.112Z e 07:14:55.811Z; a CSV de posição contém 60 pontos entre 06:14:56.565Z e 07:13:56.898Z. A captura principal encerrou às 07:30:26Z, também com código 0 e zero falhas de posição; sua CSV de telemetria contém 158.753 registros entre 05:30:28.144Z e 07:30:26.232Z e a CSV de posição contém 120 pontos entre 05:30:26.290Z e 07:29:34.315Z. [TESTADO](https://push.lightstreamer.com/); [TESTADO](https://api.wheretheiss.at/v1/satellites/25544)

### Unidade, conversão e cadência por item

Descrições e rótulos de unidade foram cruzados com o mapa comunitário e o catálogo `PUIList.xml`. Os valores típicos abaixo são medianas brutas da captura principal completa, encerrada às 07:30:26Z. As taxas são intervalos entre alterações recebidas no modo MERGE, não uma frequência de amostragem prometida pelo sensor. Uma lacuna pode significar valor sem mudança ou interrupção do fluxo. As unidades canônicas são as de [docs/06](../../docs/06-modelo-de-dados.md) [INFERÊNCIA]. [SECUNDÁRIA](https://github.com/joepavitt/node-red-iss-data-streamer); [SECUNDÁRIA](https://github.com/Lightstreamer/Lightstreamer-example-ISSLive-client-javascript/blob/master/src/assets/PUIList.xml); [TESTADO](https://push.lightstreamer.com/)

| Item | Descrição | Unidade observada | Valor típico observado | Conversão para unidade canônica de docs/06 |
|---|---|---|---:|---|
| `USLAB000053` | Pressão parcial de O₂ no U.S. Lab | Escala compatível com torr ou mmHg, divergente de PSIA | 165,85 | 22,11 kPa, se escala torr/mmHg; usar fator aproximado 0,133322 kPa por torr e manter o original. [OFICIAL](https://www.nist.gov/pml/owm/metric-si/unit-conversion/pressure-and-gas-flow-unit-conversions) |
| `USLAB000054` | Pressão parcial de N₂ no U.S. Lab | Escala compatível com torr ou mmHg, divergente de PSIA | 577,62 | Unidade canônica de ppN₂ **NÃO DEFINIDA** em docs/06; preservar valor e unidade originais. |
| `USLAB000055` | Pressão parcial de CO₂ no U.S. Lab | Escala compatível com torr ou mmHg, divergente de PSIA | 2,44 | Canônica mmHg; só manter o valor como mmHg depois de confirmar se a fonte transmite mmHg ou torr. |
| `USLAB000058` | Pressão total da cabine no U.S. Lab | Escala compatível com torr ou mmHg, divergente de PSIA | 757,64 | 101,01 kPa, se escala torr/mmHg; conversão aproximada, guardar o bruto. [OFICIAL](https://www.nist.gov/pml/owm/metric-si/unit-conversion/pressure-and-gas-flow-unit-conversions) |
| `USLAB000059` | Temperatura na entrada da CCAA do U.S. Lab | °C no mapa comunitário; catálogo em conflito | 23,64 | Canônica °C, mas não converter nem aplicar limiar até resolver possível marcação `CNT`. |
| `USLAB000060` | Temperatura do fluido de refrigeração de aviônicos no U.S. Lab | °C no mapa comunitário; catálogo em conflito | 17,23 | Canônica °C, mas manter bruto até confirmar que não é `CNT`. |
| `USLAB000061` | Temperatura do fluido de refrigeração do ar no U.S. Lab | °C no mapa comunitário; catálogo em conflito | 9,31 | Canônica °C, mas manter bruto até confirmar que não é `CNT`. |
| `NODE3000001` | Pressão parcial de O₂ no Node 3 | Escala compatível com torr ou mmHg, divergente de PSIA | 150,67 | 20,09 kPa, se escala torr/mmHg; preservar o original. [OFICIAL](https://www.nist.gov/pml/owm/metric-si/unit-conversion/pressure-and-gas-flow-unit-conversions) |
| `NODE3000002` | Pressão parcial de N₂ no Node 3 | Escala compatível com torr ou mmHg, divergente de PSIA | 593,87 | Unidade canônica de ppN₂ **NÃO DEFINIDA** em docs/06; preservar valor e unidade originais. |
| `NODE3000003` | Pressão parcial de CO₂ no Node 3 | Escala compatível com torr ou mmHg, divergente de PSIA | 2,95 | Canônica mmHg; só manter o valor como mmHg depois de confirmar se a fonte transmite mmHg ou torr. |
| `NODE3000004` | Estado da UPA, código bruto 32, mapeado como STANDBY no catálogo | Código discreto, sem unidade | 32 | Sem conversão; manter código bruto e rotular STANDBY como descrição do catálogo, não como avaliação de saúde. |
| `NODE3000005` | Quantidade do tanque de urina da UPA | Mapa sugere percentual, unidade não confirmada | 50 | **NÃO DEFINIDA** em docs/06; preservar o valor bruto sem exibir como volume. |
| `NODE3000006` | Estado do WPA, código bruto 3, mapeado como STANDBY no catálogo | Código discreto, sem unidade | 3 | Sem conversão; manter código bruto e rotular STANDBY como descrição do catálogo, não como avaliação de saúde. |
| `NODE3000007` | Etapa do WPA, código bruto 2, mapeado como HEATUP no catálogo | Código discreto, sem unidade | 2 | Sem conversão; manter código bruto e rotular HEATUP como descrição do catálogo, não como avaliação de saúde. |
| `NODE3000008` | Quantidade do tanque de água residual do WPA | Catálogo indica PCT; escala física não confirmada | 73,67 | **NÃO DEFINIDA** em docs/06; preservar o valor bruto. |
| `NODE3000009` | Quantidade do armazenamento de água limpa do WPA | Catálogo indica PCT; escala física não confirmada | 57,20 | **NÃO DEFINIDA** em docs/06; preservar o valor bruto. |
| `NODE3000010` | Estado do gerador de O₂ OGA, código bruto 1, mapeado como PROCESS no catálogo | Código discreto, sem unidade | 1 | Sem conversão; associação física atual do item ao OGA não foi confirmada. |
| `NODE3000011` | Taxa de produção de O₂ do OGA | Catálogo PUI indica LBM/D; mapa comunitário indica lb/dia | -59,4569 | **NÃO DEFINIDA** em docs/06; valor negativo requer validação e não deve ser interpretado como produção válida. |
| `NODE3000012` | Temperatura do fluido de refrigeração de aviônicos no Node 3 | °C no mapa comunitário; catálogo em conflito | 17,17 | Canônica °C, mas manter bruto até confirmar que não é `CNT`. |
| `NODE3000013` | Temperatura do fluido de refrigeração do ar no Node 3 | °C no mapa comunitário; catálogo em conflito | 4,31 | Canônica °C, mas manter bruto até confirmar que não é `CNT`. |
| `TIME_000001` | Relógio da estação ou feed | Contador bruto em milissegundos, com hipótese de deslocamento de 24 horas | 27585480336 | Candidata: somar o bruto ao início de 2026 e ajustar 24 horas para trás; mediana de 3,831 s antes da recepção. Manter o bruto e validar a regra antes de preencher UTC. [TESTADO](https://push.lightstreamer.com/); [SECUNDÁRIA](https://qiita.com/stt/items/2206ad4f3acfe1ea2447) |
| `TIME_000002` | Ano associado ao tempo do feed | Ano, sem unidade física | 2026 | Usar como campo de calendário apenas após validar seu vínculo ao relógio do feed. [TESTADO](https://push.lightstreamer.com/); [SECUNDÁRIA](https://github.com/joepavitt/node-red-iss-data-streamer) |

| Item | Alterações na captura principal até 07:30:26Z | Mediana entre alterações | Maior intervalo entre alterações |
|---|---:|---:|---:|
| `USLAB000053` | 3 | 908,580 s | 1.665,803 s |
| `USLAB000054` | 3 | 908,978 s | 1.666,475 s |
| `USLAB000055` | 3 | 908,914 s | 1.666,475 s |
| `USLAB000058` | 11 | 623,486 s | 1.432,850 s |
| `USLAB000059` | 357 | 2,099 s | 1.034,803 s |
| `USLAB000060` | 388 | 2,003 s | 1.065,939 s |
| `USLAB000061` | 409 | 2,052 s | 1.014,934 s |
| `NODE3000001` | 3 | 908,586 s | 1.665,821 s |
| `NODE3000002` | 3 | 908,713 s | 1.665,820 s |
| `NODE3000003` | 3 | 908,585 s | 1.665,821 s |
| `NODE3000004` | 3 | 910,586 s | 1.665,821 s |
| `NODE3000005` | 7 | 80,695 s | 1.665,823 s |
| `NODE3000006` | 3 | 908,715 s | 1.665,823 s |
| `NODE3000007` | 3 | 909,142 s | 1.665,823 s |
| `NODE3000008` | 448 | 10,031 s | 1.001,175 s |
| `NODE3000009` | 361 | 10,128 s | 1.011,795 s |
| `NODE3000010` | 3 | 908,582 s | 1.665,823 s |
| `NODE3000011` | 3 | 908,709 s | 1.665,823 s |
| `NODE3000012` | 1.054 | 2,004 s | 1.185,925 s |
| `NODE3000013` | 559 | 2,045 s | 1.032,879 s |
| `TIME_000001` | 155.123 | 0,024 s | 987,667 s |
| `TIME_000002` | 3 | 910,081 s | 1.665,823 s |

Os períodos de até 1.666 segundos em vários itens incluem o intervalo sem atualização e a retomada observada. O maior intervalo de `TIME_000001` foi 987,667 segundos, cerca de 16 minutos e 28 segundos, sem callback de desconexão registrado para essa pausa. Como o modo MERGE só envia alterações, contagem baixa não demonstra por si só falha do sensor. `TIME_000001` é um sinal de atividade mais útil, mas a hipótese de epoch também precisa de confirmação independente. [TESTADO](https://push.lightstreamer.com/)

## D2. NOAA Space Weather Prediction Center

Os endpoints JSON públicos responderam HTTP 200. Os quatro arquivos ficam em `prototipo/dados/amostras-reais/`. [TESTADO](https://services.swpc.noaa.gov/json/goes/primary/integral-protons-7-day.json); [TESTADO](https://services.swpc.noaa.gov/json/planetary_k_index_1m.json); [TESTADO](https://services.swpc.noaa.gov/products/alerts.json); [TESTADO](https://services.swpc.noaa.gov/products/noaa-scales.json)

| Arquivo | Cobertura e registros | Campos e unidades | Cadência observada |
|---|---|---|---|
| `noaa-integral-protons-7-day.json` | 2026-11-08T05:45Z a 2026-11-15T05:35Z, 16.104 registros, oito canais de energia | `time_tag` em UTC, `satellite` como identificador numérico, `flux` em pfu, `energy` como limiar de energia em MeV | 5 min por canal, com um intervalo máximo de 10 min na amostra |
| `noaa-planetary-k-index-1m.json` | 2026-11-14T23:45Z a 2026-11-15T05:42Z, 358 registros | `time_tag` UTC, `kp_index` e `estimated_kp` numéricos, `kp` como código NOAA; Kp é adimensional | 1 min |
| `noaa-alerts.json` | 72 mensagens, de 2026-10-16T14:19:49.850Z a 2026-11-15T05:16:57.317Z | `product_id`, `issue_datetime` UTC e `message` textual | Por emissão de produto, sem cadência fixa |
| `noaa-scales-snapshot.json` | Captura em 2026-11-15T05:43Z, objeto com cinco chaves: `-1`, `0`, `1`, `2` e `3` | `DateStamp`, `TimeStamp` UTC e escalas `R`, `S`, `G`, com nível e descrição quando publicados | Instantâneo consultado, não uma série contínua |

O fluxo integral de prótons fornece os canais ≥1, ≥5, ≥10, ≥30, ≥50, ≥60, ≥100 e ≥500 MeV. O canal ≥10 MeV é comparável à escala NOAA S. A NOAA define a escala com fluxo integral de prótons ≥10 MeV: S1 menor, 10 pfu; S2 moderada, 100 pfu; S3 forte, 1.000 pfu; S4 severa, 10.000 pfu; S5 extrema, 100.000 pfu. 1 pfu equivale a uma partícula por centímetro quadrado, por segundo, por esterradiano. [OFICIAL](https://www.spaceweather.gov/noaa-scales-explanation); [OFICIAL](https://www.spaceweather.gov/content/space-weather-glossary)

`alerts.json` contém eventos e avisos recentes com o texto bruto de cada produto; `noaa-scales.json` contém um instantâneo de observação e previsão, não substitui as mensagens de alerta. Kp e fluxo GOES são contexto ambiental e não medição da dose individual da tripulação. [OFICIAL](https://www.swpc.noaa.gov/products/notifications-timeline); [INFERÊNCIA](https://ntrs.nasa.gov/api/citations/20240006194/downloads/OCHMO%20STD%20100%201A%2005142024.pdf?attachment=true)

## D3. NASA CCMC DONKI

Usei a base nova `https://ccmc.gsfc.nasa.gov/DONKI-API/get/`, anunciada pela CCMC em 30 de setembro de 2026 como substituta da base antiga. Cada consulta enviou `api_key=DEMO_KEY`. [OFICIAL](https://ccmc.gsfc.nasa.gov/news/major-updates/); [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2026-08-17&endDate=2026-10-01&api_key=DEMO_KEY)

A tentativa inicial de solicitar os 90 dias em uma chamada respondeu HTTP 400 porque a janela não pode exceder 60 dias. A coleta foi refeita com duas janelas não sobrepostas, 2026-08-17 a 2026-10-01 e 2026-10-02 a 2026-11-15, duas chamadas por tipo e oito respostas HTTP 200. Uma segunda coleta de verificação repetiu as oito solicitações. No total, foram feitas 16 solicitações aceitas e uma rejeitada por exceder a janela, abaixo dos limites publicados para `DEMO_KEY` de 30 por hora e 50 por dia caso a chave seja aplicada pelo serviço. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2026-08-17&endDate=2026-11-15&api_key=DEMO_KEY); [OFICIAL](https://api.nasa.gov/assets/html/authentication.html)

| Tipo | Registros no período | Campos e exemplo observado |
|---|---:|---|
| FLR | 55 | Campos do primeiro registro: `flrID`, `catalog`, `instruments`, `beginTime`, `peakTime`, `endTime`, `classType`, `sourceLocation`, `activeRegionNum`, `note`, `link`, `linkedEvents`, `sentNotifications`, `submissionTime`, `versionId`. Exemplo: 2026-08-17T16:18Z, classe C2.0, pico às 16:53Z. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2026-08-17&endDate=2026-10-01&api_key=DEMO_KEY) |
| SEP | 11 | Campos do primeiro registro: `sepID`, `eventTime`, `instruments`, `link`, `linkedEvents`, `sentNotifications`, `submissionTime`, `versionId`. Exemplo: 2026-08-20T20:23Z, instrumento STEREO A IMPACT, faixa de 13 a 100 MeV. O exemplo não apresenta um campo universal de fluxo em pfu. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/SEP?startDate=2026-08-17&endDate=2026-10-01&api_key=DEMO_KEY) |
| CME | 323 | Campos do primeiro registro: `activityID`, `catalog`, `startTime`, `instruments`, `sourceLocation`, `activeRegionNum`, `note`, `cmeAnalyses`, `linkedEvents`, `sentNotifications`, `link`, `submissionTime`, `versionId`. Em `cmeAnalyses`, o exemplo inclui hora de referência, velocidade em km/s, latitude, longitude e meia largura angular em graus. Exemplo: início 2026-08-17T07:15Z, velocidade analisada de 431 km/s. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/CME?startDate=2026-08-17&endDate=2026-10-01&api_key=DEMO_KEY); [OFICIAL](https://ccmc.gsfc.nasa.gov/DONKI/guide/data-reference/) |
| GST | 3 | Campos do primeiro registro: `gstID`, `startTime`, `allKpIndex`, `link`, `linkedEvents`, `sentNotifications`, `submissionTime`, `versionId`. Exemplo: início 2026-10-04T18:00Z e Kp 5,67 observado às 21:00Z; Kp é adimensional. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/GST?startDate=2026-10-02&endDate=2026-11-15&api_key=DEMO_KEY) |

Os arquivos DONKI preservam o JSON de cada tipo e intervalo. As estruturas e unidades internas variam por tipo e por análise. A CCMC define DONKI como uma fonte de prototipagem e pesquisa, sem garantia, e aponta a NOAA SWPC como fonte oficial de previsão operacional. [OFICIAL](https://ccmc.gsfc.nasa.gov/tools/DONKI/)

## D4. Posição orbital e Anomalia do Atlântico Sul

O serviço WhereTheISS.at respondeu ao endpoint `https://api.wheretheiss.at/v1/satellites/25544`. A resposta observada contém latitude e longitude em graus, altitude em quilômetros, velocidade em quilômetros por hora, visibilidade, pegada orbital, timestamp Unix e a indicação de unidades. A documentação do provedor diz que não exige autenticação e limita o uso a aproximadamente uma solicitação por segundo; a coleta desta rodada solicita uma por minuto. [TESTADO](https://api.wheretheiss.at/v1/satellites/25544); [OFICIAL](https://wheretheiss.at/w/developer)

Para uma indicação visual demonstrativa, o adaptador pode marcar coordenadas dentro da janela aproximada longitude -70° a -15° e latitude -43° a -5°. Essa caixa envolve a concentração principal de dose mapeada pelo instrumento ISS-RAD em 2025, centrada perto de longitude -50° e latitude -28°. O mapa NASA documenta que a concentração varia ao longo do tempo, portanto a caixa é apenas uma referência geográfica para a altitude e os dados do mapa citado. A tela deve dizer “região aproximada da SAA”, sem converter posição em dose, exposição individual ou alerta médico. [OFICIAL](https://ntrs.nasa.gov/api/citations/20250008430/downloads/ISS-RAD_SC25_WRMISS-2025-V2.pdf?attachment=true); [INFERÊNCIA](https://ntrs.nasa.gov/api/citations/20030057810/downloads/20030057810.pdf)

Na captura principal de posição, houve 120 registros entre 05:30:26.290Z e 07:29:34.315Z, em intervalos de cerca de um minuto. Vinte e três coordenadas caíram na caixa aproximada em duas passagens: 11 pontos de 05:45:26.382Z a 05:55:33.676Z e 12 pontos de 07:18:34.256Z a 07:29:34.315Z. Isso demonstra cruzamento geométrico da caixa, sem medir dose. A captura de recuperação encerrou com 60 registros entre 06:14:56.565Z e 07:13:56.898Z; nenhum ponto entrou na caixa SAA. [TESTADO](https://api.wheretheiss.at/v1/satellites/25544); [OFICIAL](https://ntrs.nasa.gov/api/citations/20250008430/downloads/ISS-RAD_SC25_WRMISS-2025-V2.pdf?attachment=true)

## D5. Condições de uso e atribuição

| Fonte | Apresentação pública e atribuição |
|---|---|
| NOAA SWPC | A NOAA informa que quase todo o conteúdo NOAA, inclusive produtos de dados, está em domínio público e pode ser usado sem autorização expressa. Creditar NOAA e SWPC, não atribuir endosso governamental e indicar alterações feitas. A política NWS permite uso público salvo anotação específica, mas proíbe modificar o conteúdo e apresentá-lo como material oficial do governo. [OFICIAL](https://www.noaa.gov/office-education/outreach-communication/faq); [OFICIAL](https://verification.nws.noaa.gov/services/public/disclaimer.aspx) |
| NASA CCMC DONKI | A API é pública, mas a página não concede licença de propriedade intelectual; o material é “as is”, sem garantia, e de qualidade para prototipagem e pesquisa. Para a demonstração, exibir crédito NASA CCMC DONKI, link e aviso de que não é alerta operacional. **NÃO ENCONTRADO:** licença de redistribuição separada para estes registros. [OFICIAL](https://ccmc.gsfc.nasa.gov/tools/DONKI/) |
| Feed ISSLIVE | O exemplo da Lightstreamer descreve o serviço como feed público com telemetria NASA real. O SDK Node.js é Apache 2.0, mas essa licença e a licença do exemplo não se aplicam automaticamente ao payload da telemetria. **NÃO ENCONTRADO:** condição específica de redistribuição ou apresentação do feed. Para exibição educativa, atribuir “ISS Live, telemetria pública distribuída por Lightstreamer” e não sugerir certificação ou endosso NASA; confirmar a licença do payload com Lightstreamer antes de republicar o arquivo como dataset. [SECUNDÁRIA](https://lightstreamer.com/customer-story/how-nasa-is-using-lightstreamer/); [FABRICANTE](https://github.com/Lightstreamer/Lightstreamer-lib-client-haxe); [OFICIAL](https://lightstreamer.com/sdks/ls-nodejs-client/9.2.2/api/index.html) |
| WhereTheISS.at | A documentação confirma API sem autenticação e limitação de taxa, mas **NÃO ENCONTRADO:** licença de redistribuição ou exigência de crédito. Identificar o provedor e o caráter de terceiro; o direito de redistribuir o histórico também não foi encontrado. [OFICIAL](https://wheretheiss.at/w/developer) |

A política geral da NASA para dados científicos recomenda citar a fonte original, mas o enquadramento específico do feed ISSLIVE não está documentado em um registro de dataset com licença. A atribuição sugerida acima é uma medida de transparência, não uma licença confirmada. [OFICIAL](https://science.data.nasa.gov/about/license)

## D6. Arquivos e uso no protótipo

As capturas ISSLIVE e de posição foram concluídas: a captura principal durou 120 minutos e a recuperação durou 60 minutos. A tabela registra períodos, contagens, tamanhos e colunas dos arquivos NOAA, DONKI e ISS. Os tamanhos são bytes observados no disco. [TESTADO](https://services.swpc.noaa.gov/products/); [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/); [TESTADO](https://push.lightstreamer.com/); [TESTADO](https://api.wheretheiss.at/v1/satellites/25544)

Os coletores gravam texto em UTF-8: o downloader serializa JSON e os gravadores escrevem CSV nessa codificação. O campo de bytes no manifesto corresponde agora ao tamanho físico de cada JSON, incluindo a quebra de linha final. [TESTADO](../../prototipo/dados/amostras-reais/scripts/fetch-public-sources.cjs); [TESTADO](../../prototipo/dados/amostras-reais/scripts/record-isslive.cjs); [TESTADO](../../prototipo/dados/amostras-reais/scripts/sync-manifest-file-sizes.cjs)

| Arquivo | Origem e período coberto | Registros | Colunas, campos e unidades | Tamanho em bytes |
|---|---|---:|---|---:|
| `noaa-integral-protons-7-day.json` | NOAA GOES, 2026-11-08T05:45Z a 2026-11-15T05:35Z. [TESTADO](https://services.swpc.noaa.gov/json/goes/primary/integral-protons-7-day.json) | 16.104 | `time_tag` UTC; `satellite` código do satélite; `flux` pfu; `energy` limiar de energia em MeV | 2.053.190 |
| `noaa-planetary-k-index-1m.json` | NOAA SWPC, 2026-11-14T23:45Z a 2026-11-15T05:42Z. [TESTADO](https://services.swpc.noaa.gov/json/planetary_k_index_1m.json) | 358 | `time_tag` UTC; `kp_index` e `estimated_kp` adimensionais; `kp` código NOAA | 38.220 |
| `noaa-alerts.json` | NOAA SWPC, mensagens de 2026-10-16T14:19:49.850Z a 2026-11-15T05:16:57.317Z. [TESTADO](https://services.swpc.noaa.gov/products/alerts.json) | 72 | `product_id` código do produto; `issue_datetime` UTC; `message` texto original | 45.678 |
| `noaa-scales-snapshot.json` | NOAA SWPC, instantâneo recebido em 2026-11-15T05:44:55Z, com `TimeStamp` de 05:43Z. [TESTADO](https://services.swpc.noaa.gov/products/noaa-scales.json) | 1 objeto, 5 chaves internas | `DateStamp` data; `TimeStamp` UTC; objetos `R`, `S`, `G` com escala e texto, sem unidade física | 1.593 |
| `donki-flr-2026-08-17-to-2026-10-01.json` | NASA CCMC DONKI, consulta FLR 2026-08-17 a 2026-10-01. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2026-08-17&endDate=2026-10-01&api_key=DEMO_KEY) | 31 | `flrID`; início, pico e fim em UTC; `classType` classe categórica; instrumento, posição, região ativa, notas e eventos relacionados | 21.168 |
| `donki-flr-2026-10-02-to-2026-11-15.json` | NASA CCMC DONKI, consulta FLR 2026-10-02 a 2026-11-15. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=2026-10-02&endDate=2026-11-15&api_key=DEMO_KEY) | 24 | `flrID`; início, pico e fim em UTC; `classType` classe categórica; instrumento, posição, região ativa, notas e eventos relacionados | 16.057 |
| `donki-sep-2026-08-17-to-2026-10-01.json` | NASA CCMC DONKI, consulta SEP 2026-08-17 a 2026-10-01. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/SEP?startDate=2026-08-17&endDate=2026-10-01&api_key=DEMO_KEY) | 11 | `sepID`; `eventTime` UTC; instrumentos e faixa energética quando informada em MeV; eventos relacionados | 7.325 |
| `donki-sep-2026-10-02-to-2026-11-15.json` | NASA CCMC DONKI, consulta SEP 2026-10-02 a 2026-11-15. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/SEP?startDate=2026-10-02&endDate=2026-11-15&api_key=DEMO_KEY) | 0 | Array JSON vazio; sem colunas ou unidade nessa janela | 3 |
| `donki-cme-2026-08-17-to-2026-10-01.json` | NASA CCMC DONKI, consulta CME 2026-08-17 a 2026-10-01. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/CME?startDate=2026-08-17&endDate=2026-10-01&api_key=DEMO_KEY) | 190 | `activityID`; `startTime` UTC; em `cmeAnalyses`, `speed` km/s, latitude, longitude e `halfAngle` em graus; instrumentação e eventos relacionados | 488.031 |
| `donki-cme-2026-10-02-to-2026-11-15.json` | NASA CCMC DONKI, consulta CME 2026-10-02 a 2026-11-15. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/CME?startDate=2026-10-02&endDate=2026-11-15&api_key=DEMO_KEY) | 133 | `activityID`; `startTime` UTC; em `cmeAnalyses`, `speed` km/s, latitude, longitude e `halfAngle` em graus; instrumentação e eventos relacionados | 357.110 |
| `donki-gst-2026-08-17-to-2026-10-01.json` | NASA CCMC DONKI, consulta GST 2026-08-17 a 2026-10-01. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/GST?startDate=2026-08-17&endDate=2026-10-01&api_key=DEMO_KEY) | 0 | Array JSON vazio; sem colunas ou unidade nessa janela | 3 |
| `donki-gst-2026-10-02-to-2026-11-15.json` | NASA CCMC DONKI, consulta GST 2026-10-02 a 2026-11-15. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/GST?startDate=2026-10-02&endDate=2026-11-15&api_key=DEMO_KEY) | 3 | `gstID`; `startTime` UTC; `allKpIndex` com `observedTime` UTC, `kpIndex` adimensional e fonte | 2.800 |
| `manifest-fontes-2026-11-15.json` | Gerado por `scripts/fetch-public-sources.cjs` às 2026-11-15T05:44:53.867Z | 1 objeto, 12 entradas de arquivo | `periodoDonki` datas; `recuperadoEmUtc`; por arquivo: URL, hora UTC, status HTTP, bytes, registros e campos observados | 6.081 |
| `isslive-telemetria-20261115T053026Z.csv` | Lightstreamer ISSLIVE, recebimento de 2026-11-15T05:30:28.144Z a 2026-11-15T07:30:26.232Z. [TESTADO](https://push.lightstreamer.com/) | 158.753 registros | `instante_recebimento_utc` ISO UTC; `item` símbolo; `valor_bruto` texto numérico ou código; `tempo_feed_bruto` e `ano_feed_bruto` valores crus de tempo, ver interpretação em D1 | 12.253.054 |
| `iss-posicao-20261115T053026Z.csv` | WhereTheISS.at, recebimento de 2026-11-15T05:30:26.290Z a 2026-11-15T07:29:34.315Z. [TESTADO](https://api.wheretheiss.at/v1/satellites/25544) | 120 registros | `instante_recebimento_utc` e `instante_origem_utc`; época de origem em s; latitude/longitude em graus; altitude e footprint em km; velocidade em km/h; visibilidade categórica; `unidades_origem` | 22.085 |
| `isslive-telemetria-20261115T061456Z.csv` | Lightstreamer ISSLIVE, recebimento de 2026-11-15T06:14:58.112Z a 2026-11-15T07:14:55.811Z. [TESTADO](https://push.lightstreamer.com/) | 97.472 registros | `instante_recebimento_utc` ISO UTC; `item` símbolo; `valor_bruto` texto numérico ou código; `tempo_feed_bruto` e `ano_feed_bruto` valores crus de tempo, ver interpretação em D1 | 7.514.018 |
| `iss-posicao-20261115T061456Z.csv` | WhereTheISS.at, recebimento de 2026-11-15T06:14:56.565Z a 2026-11-15T07:13:56.898Z. [TESTADO](https://api.wheretheiss.at/v1/satellites/25544) | 60 registros | `instante_recebimento_utc` e `instante_origem_utc`; época de origem em s; latitude/longitude em graus; altitude e footprint em km; velocidade em km/h; visibilidade categórica; `unidades_origem` | 11.102 |

Os trechos seguintes reproduzem as cinco linhas iniciais de cada arquivo não vazio. Arquivos que contêm apenas `[]` têm uma linha porque não há registros.

`isslive-telemetria-20261115T053026Z.csv`

```csv
instante_recebimento_utc,item,valor_bruto,tempo_feed_bruto,ano_feed_bruto
"2026-11-15T05:30:28.144Z","USLAB000054","577.6220246572876249047112651169300079345703125","",""
"2026-11-15T05:30:28.145Z","USLAB000055","2.43509767988890413192848427570424973964691162109375","",""
"2026-11-15T05:30:28.146Z","USLAB000058","757.74481201171875","",""
"2026-11-15T05:30:28.147Z","USLAB000059","23.511928558349609375","",""
```

`iss-posicao-20261115T053026Z.csv`

```csv
instante_recebimento_utc,instante_origem_utc,timestamp_origem_epoch_s,latitude_deg,longitude_deg,altitude_km,velocidade_kmh,visibilidade,footprint_km,unidades_origem
"2026-11-15T05:30:26.290Z","2026-11-15T05:30:27.000Z","1794720627","36.663729035072","-80.169533054624","422.40218399231","27583.440542301","eclipsed","4519.6645588393","kilometers"
"2026-11-15T05:31:26.303Z","2026-11-15T05:31:26.000Z","1794720686","34.182397218418","-76.86496377902","422.24732186605","27582.136205206","eclipsed","4518.8791992007","kilometers"
"2026-11-15T05:32:26.306Z","2026-11-15T05:32:26.000Z","1794720746","31.55910762076","-73.715295387768","422.10011037349","27580.762115363","eclipsed","4518.1324841875","kilometers"
"2026-11-15T05:33:26.311Z","2026-11-15T05:33:26.000Z","1794720806","28.849644006499","-70.75367644674","421.97423877306","27579.331351459","eclipsed","4517.4938941585","kilometers"
```

`noaa-integral-protons-7-day.json`

```json
[
  {
    "time_tag": "2026-11-08T05:45:00Z",
    "satellite": 18,
```

`noaa-planetary-k-index-1m.json`

```json
[
  {
    "time_tag": "2026-11-14T23:45:00",
    "kp_index": 1,
    "estimated_kp": 1.33
```

`noaa-alerts.json`

```json
[
  {
    "product_id": "EF3A",
    "issue_datetime": "2026-11-15 05:16:57.317",
    "message": "Space Weather Message Code: ALTEF3\r\nSerial Number: 3776\r\nIssue Time: 2026 Nov 15 0516 UTC\r\n\r\nCONTINUED ALERT: Electron 2MeV Integral Flux exceeded 1,000pfu\nContinuation of Serial Number: 3775\nBegin Time: 2026 Nov 08 2245 UTC\n\nYesterday Maximum 2MeV Flux: 5837 pfu\nMax time: 2026 Nov 14 1300 UTC",
```

`noaa-scales-snapshot.json`

```json
{
  "0": {
    "DateStamp": "2026-11-15",
    "TimeStamp": "05:43:00",
    "R": {
```

`donki-flr-2026-08-17-to-2026-10-01.json`

```json
[
  {
    "flrID": "2026-08-17T16:18:00-FLR-001",
    "catalog": "M2M_CATALOG",
    "instruments": [
```

`donki-flr-2026-10-02-to-2026-11-15.json`

```json
[
  {
    "flrID": "2026-10-04T06:13:00-FLR-001",
    "catalog": "M2M_CATALOG",
    "instruments": [
```

`donki-sep-2026-08-17-to-2026-10-01.json`

```json
[
  {
    "sepID": "2026-08-20T20:23:00-SEP-001",
    "eventTime": "2026-08-20T20:23Z",
    "instruments": [
```

`donki-sep-2026-10-02-to-2026-11-15.json` e `donki-gst-2026-08-17-to-2026-10-01.json`: `[]`, retorno sem evento para as janelas consultadas. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/)

`donki-cme-2026-08-17-to-2026-10-01.json`

```json
[
  {
    "activityID": "2026-08-17T07:15:00-CME-001",
    "catalog": "M2M_CATALOG",
    "startTime": "2026-08-17T07:15Z",
```

`donki-cme-2026-10-02-to-2026-11-15.json`

```json
[
  {
    "activityID": "2026-10-02T00:53:00-CME-001",
    "catalog": "M2M_CATALOG",
    "startTime": "2026-10-02T00:53Z",
```

`donki-gst-2026-10-02-to-2026-11-15.json`

```json
[
  {
    "gstID": "2026-10-04T18:00:00-GST-001",
    "startTime": "2026-10-04T18:00Z",
    "allKpIndex": [
```

`manifest-fontes-2026-11-15.json`

```json
{
  "periodoDonki": {
    "inicio": "2026-08-17",
    "fim": "2026-11-15"
```

`isslive-telemetria-20261115T061456Z.csv`

```csv
instante_recebimento_utc,item,valor_bruto,tempo_feed_bruto,ano_feed_bruto
"2026-11-15T06:14:58.112Z","USLAB000053","165.848984880285257759169326163828372955322265625","",""
"2026-11-15T06:14:58.113Z","USLAB000054","577.6220246572876249047112651169300079345703125","",""
"2026-11-15T06:14:58.113Z","USLAB000055","2.43509767988890413192848427570424973964691162109375","",""
```

`iss-posicao-20261115T061456Z.csv`

```csv
instante_recebimento_utc,instante_origem_utc,timestamp_origem_epoch_s,latitude_deg,longitude_deg,altitude_km,velocidade_kmh,visibilidade,footprint_km,unidades_origem
"2026-11-15T06:14:56.565Z","2026-11-15T06:14:57.000Z","1794723297","-41.364389056641","80.513830958764","431.61674294816","27549.832163087","daylight","4566.0982547814","kilometers"
"2026-11-15T06:15:56.568Z","2026-11-15T06:15:57.000Z","1794723357","-39.100834545224","84.365812154008","430.34846480168","27553.133577787","daylight","4559.741488767","kilometers"
"2026-11-15T06:16:56.570Z","2026-11-15T06:16:57.000Z","1794723417","-36.70070652384","87.957577089918","429.03291176449","27556.549744296","daylight","4553.1362933596","kilometers"
```

### Como usar no protótipo

1. Na pasta `prototipo/dados/amostras-reais/scripts/`, executar `npm install` uma vez para instalar localmente o cliente oficial Lightstreamer. Para gravar novas leituras e posição por duas horas, executar `npm run record:iss -- 120`. Para atualizar os arquivos NOAA e DONKI, executar `node fetch-public-sources.cjs`.
2. O adaptador deve percorrer os CSVs e arrays JSON, mantendo o valor original, o nome do item ou campo, o timestamp da fonte e o timestamp de recebimento. Em [docs/06](../../docs/06-modelo-de-dados.md) [INFERÊNCIA], preencher `valorOriginal`, `unidadeOriginal`, `instanteUtc`, `instanteDisponivelUtc`, `dispositivoId`, `moduloId`, `protocolo`, `qualidade` e `origem`.
3. Em conexão real, usar `origem: "ao_vivo"`; em reprodução dos arquivos gravados, usar `origem: "simulada"`. O horário de recebimento alimenta `instanteDisponivelUtc`. O mapa comunitário descreve `TIME_000001` como GMT e `TIME_000002` como ano. A magnitude de `TIME_000001` é compatível com milissegundos desde o início de 2026, mas o epoch não está documentado; validar essa interpretação antes de preencher `instanteUtc`. [SECUNDÁRIA](https://github.com/joepavitt/node-red-iss-data-streamer); [INFERÊNCIA](https://push.lightstreamer.com/)
4. Converter pressões somente com a unidade confirmada e guardar ambos os valores. O canônico de ppO₂ é kPa, o de ppCO₂ é mmHg e o da pressão total é kPa, conforme a tabela de [docs/06](../../docs/06-modelo-de-dados.md) [INFERÊNCIA]. `docs/06` não define unidade canônica para ppN₂, produção de O₂ ou nível de tanque; até decisão de domínio, preservar o valor bruto e a unidade da fonte. Sinais com `CNT`, valores negativos ou associação histórica devem receber `qualidade: "duvidosa"` e não gerar limiar.
5. Cada linha numérica de telemetria, prótons ou Kp deve virar uma `Leitura` com `indicadorId` já configurado, unidade canônica, valor original, fonte e `origem` apropriada. As linhas de eventos DONKI devem permanecer como `EventoClimaEspacial`, entidade já definida em [docs/06](../../docs/06-modelo-de-dados.md) [INFERÊNCIA], com `tipo`, intervalos UTC, fonte e URL; elas não contêm sempre um valor numérico para preencher `Leitura.valor`. Não inventar um indicador numérico para evento sem revisar o modelo.

## Implicações para o software

1. `instanteDisponivelUtc` recebe o horário UTC de gravação. `instanteUtc` vem do feed ou do campo `time_tag` somente quando a conversão estiver validada. Guardar `valorOriginal` e `unidadeOriginal`, e usar `origem: "ao_vivo"` durante a assinatura ou `origem: "simulada"` ao reproduzir CSV/JSON. [INFERÊNCIA](../../docs/06-modelo-de-dados.md)
2. Pressões em escala compatível com torr/mmHg podem ser convertidas para ppO₂ em kPa, ppCO₂ em mmHg e pressão total em kPa, preservando a escala original. Não classificar temperaturas `CNT`, produção O₂ negativa ou status e tanques sem unidade canônica e mapeamento confiáveis. [INFERÊNCIA](../../docs/06-modelo-de-dados.md); [OFICIAL](https://www.nist.gov/pml/owm/metric-si/unit-conversion/pressure-and-gas-flow-unit-conversions)
3. O limite S da NOAA compara o fluxo integral de prótons ≥10 MeV com pfu. É contexto de clima espacial, não dose individual da tripulação. [OFICIAL](https://www.spaceweather.gov/noaa-scales-explanation); [INFERÊNCIA](https://ntrs.nasa.gov/api/citations/20240006194/downloads/OCHMO%20STD%20100%201A%2005142024.pdf?attachment=true)
4. Para destacar uma passagem aproximada pela SAA, testar latitude e longitude contra a janela geográfica registrada em D4, associando a posição ao ponto temporal mais próximo. A amostragem de um minuto e o contorno aproximado não representam dose nem exposição individual. [OFICIAL](https://ntrs.nasa.gov/api/citations/20250008430/downloads/ISS-RAD_SC25_WRMISS-2025-V2.pdf?attachment=true); [INFERÊNCIA](https://ntrs.nasa.gov/api/citations/20030057810/downloads/20030057810.pdf)
5. Preservar alertas SWPC como texto original e eventos DONKI como `EventoClimaEspacial`; posição orbital serve como contexto. Nenhum desses arquivos comprova estado clínico ou substitui procedimento/alarmes da estação. [INFERÊNCIA](../../docs/06-modelo-de-dados.md); [OFICIAL](https://ccmc.gsfc.nasa.gov/tools/DONKI/)

## Lacunas e limites encontrados

1. **NÃO ENCONTRADO:** dicionário NASA oficial, versionado e completo do ISSLIVE com unidade de engenharia, calibração, semântica e cadência garantidas por item. As descrições usadas vêm de mapas comunitários e do catálogo do exemplo Lightstreamer. [SECUNDÁRIA](https://github.com/Lightstreamer/Lightstreamer-example-ISSLive-client-javascript/blob/master/src/assets/PUIList.xml); [SECUNDÁRIA](https://github.com/joepavitt/node-red-iss-data-streamer)
2. **NÃO ENCONTRADO:** distinção empírica entre torr e mmHg para os valores de pressão. A escala é incompatível com PSIA pela ordem de grandeza, mas a confirmação formal exige dicionário de engenharia. [INFERÊNCIA](https://ntrs.nasa.gov/api/citations/20170001943/downloads/20170001943.pdf?__source=newsletter%7Cspacenewsletter); [OFICIAL](https://www.nist.gov/pml/owm/metric-si/unit-conversion/pressure-and-gas-flow-unit-conversions)
3. **NÃO ENCONTRADO:** conversão calibrada dos valores de temperatura `CNT` para °C. O mapa comunitário indica °C, enquanto o catálogo do exemplo marca CNT para itens Node 3. Até validação, não converter nem aplicar limiar. [SECUNDÁRIA](https://github.com/Lightstreamer/Lightstreamer-example-ISSLive-client-javascript/blob/master/src/assets/PUIList.xml); [SECUNDÁRIA](https://iss-mimic.github.io/Mimic/)
4. **NÃO DEFINIDO em docs/06:** unidade canônica para ppN₂, produção de O₂, níveis de tanque e códigos discretos de estado ECLSS. Também não há entidade de posição orbital; manter coordenadas como contexto temporal até decisão de modelo. [INFERÊNCIA](../../docs/06-modelo-de-dados.md)
5. O mapa comunitário relaciona `NODE3000010` e `NODE3000011` ao OGA no Node 3, enquanto um documento NASA informa retorno do equipamento ao U.S. Lab em setembro de 2022. A associação física atual do valor ao hardware é **NÃO ENCONTRADA**. [SECUNDÁRIA](https://iss-mimic.github.io/Mimic/); [OFICIAL](https://ntrs.nasa.gov/api/citations/20240007995/downloads/ICES2024141%20ISS%20ECLS%20Presentaton%20RevA.pdf)
6. **NÃO ENCONTRADO:** termos específicos de redistribuição do payload ISSLIVE e licença de redistribuição de WhereTheISS.at. As atribuições recomendadas em D5 são transparência de fonte, não licença confirmada. [SECUNDÁRIA](https://lightstreamer.com/customer-story/how-nasa-is-using-lightstreamer/); [OFICIAL](https://wheretheiss.at/w/developer)
7. O mapa ISS-RAD de 2025 sustenta uma referência aproximada da região de maior dose, mas não fornece um contorno fixo de SAA para usar como limiar clínico. [OFICIAL](https://ntrs.nasa.gov/api/citations/20250008430/downloads/ISS-RAD_SC25_WRMISS-2025-V2.pdf?attachment=true)

## Fontes

As URLs individuais de cada arquivo NOAA e das oito consultas DONKI estão na tabela D6. As fontes de documentação, unidade, posição e condições de uso são:

### ISSLIVE, ECLSS e unidades

1. [FABRICANTE](https://lightstreamer.com/sdks/ls-nodejs-client/9.2.2/api/index.html), Lightstreamer Node.js Client 9.2.2, API e recuperação de conexão; [FABRICANTE](https://github.com/Lightstreamer/Lightstreamer-lib-client-haxe), SDK Node.js e licença Apache 2.0.
2. [FABRICANTE](https://github.com/Lightstreamer/Lightstreamer-example-ISSLive-client-javascript), exemplo do cliente ISSLIVE.
3. [SECUNDÁRIA](https://github.com/Lightstreamer/Lightstreamer-example-ISSLive-client-javascript/blob/master/src/assets/PUIList.xml), catálogo de símbolos e unidades publicado com o exemplo.
4. [SECUNDÁRIA](https://iss-mimic.github.io/Mimic/), mapa comunitário dos itens de telemetria.
5. [SECUNDÁRIA](https://github.com/joepavitt/node-red-iss-data-streamer), descrições comunitárias dos itens; [SECUNDÁRIA](https://qiita.com/stt/items/2206ad4f3acfe1ea2447), exemplo independente de conversão de horários com ressalva de hipótese.
6. [SECUNDÁRIA](https://lightstreamer.com/customer-story/how-nasa-is-using-lightstreamer/), relato da Lightstreamer sobre o uso do serviço no contexto NASA.
7. [OFICIAL](https://ntrs.nasa.gov/api/citations/20170001943/downloads/20170001943.pdf?__source=newsletter%7Cspacenewsletter), requisitos CCT-REQ-1130 para ambiente de cabine e pressão.
8. [OFICIAL](https://ntrs.nasa.gov/api/citations/20240007995/downloads/ICES2024141%20ISS%20ECLS%20Presentaton%20RevA.pdf), status e localização publicada do Oxygen Generation Assembly.
9. [OFICIAL](https://www.nist.gov/pml/owm/metric-si/unit-conversion/pressure-and-gas-flow-unit-conversions), conversão de torr/mmHg para kPa.

### NOAA e clima espacial

10. [TESTADO](https://services.swpc.noaa.gov/json/goes/primary/integral-protons-7-day.json), JSON GOES de prótons integrais por sete dias.
11. [TESTADO](https://services.swpc.noaa.gov/json/planetary_k_index_1m.json), JSON Kp planetário de um minuto.
12. [TESTADO](https://services.swpc.noaa.gov/products/alerts.json), JSON de alertas e avisos.
13. [TESTADO](https://services.swpc.noaa.gov/products/noaa-scales.json), JSON de instantâneo das escalas.
14. [OFICIAL](https://www.spaceweather.gov/noaa-scales-explanation), limiares das escalas NOAA R, S e G.
15. [OFICIAL](https://www.spaceweather.gov/content/space-weather-glossary), definição de pfu.
16. [OFICIAL](https://www.swpc.noaa.gov/products/notifications-timeline), emissão de notificações SWPC.
17. [OFICIAL](https://www.noaa.gov/office-education/outreach-communication/faq), domínio público, atribuição NOAA e não endosso; [OFICIAL](https://verification.nws.noaa.gov/services/public/disclaimer.aspx), uso permitido salvo anotação específica e não apresentação de versão modificada como material oficial.
18. [OFICIAL](https://ntrs.nasa.gov/api/citations/20240006194/downloads/OCHMO%20STD%20100%201A%2005142024.pdf?attachment=true), contexto NASA para monitoramento de radiação espacial e dose.

### NASA CCMC DONKI

19. [TESTADO](https://ccmc.gsfc.nasa.gov/DONKI-API/get/), base consultada da API DONKI. Cada URL de requisição e janela está individualizada na tabela D6.
20. [OFICIAL](https://ccmc.gsfc.nasa.gov/news/major-updates/), anúncio de migração para a base nova em 2026.
21. [OFICIAL](https://ccmc.gsfc.nasa.gov/DONKI/guide/data-reference/), referência de campos, análises CME e unidades de velocidade.
22. [OFICIAL](https://ccmc.gsfc.nasa.gov/tools/DONKI/), escopo, qualidade de prototipagem/pesquisa e aviso de ausência de garantia.
23. [OFICIAL](https://api.nasa.gov/assets/html/authentication.html), limites documentados da chave pública `DEMO_KEY` da API NASA.

### Posição da ISS, SAA e dados de origem

24. [TESTADO](https://api.wheretheiss.at/v1/satellites/25544), endpoint de posição utilizado.
25. [OFICIAL](https://wheretheiss.at/w/developer), esquema, autenticação e limite de uso da API de posição.
26. [OFICIAL](https://ntrs.nasa.gov/api/citations/20250008430/downloads/ISS-RAD_SC25_WRMISS-2025-V2.pdf?attachment=true), mapa ISS-RAD de dose por posição e altitude em 2025.
27. [INFERÊNCIA](https://ntrs.nasa.gov/api/citations/20030057810/downloads/20030057810.pdf), contexto de mudança temporal e geográfica da Anomalia do Atlântico Sul.
28. [OFICIAL](https://science.data.nasa.gov/about/license), orientação geral de citação de dados científicos NASA.
29. [INFERÊNCIA](../../docs/06-modelo-de-dados.md), unidades canônicas, modelo `Leitura`, `EventoClimaEspacial` e marcação de origem no protótipo.
