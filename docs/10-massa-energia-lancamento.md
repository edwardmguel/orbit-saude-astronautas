# 10. Massa, energia e lançamento

> Para quem: quem apresenta e o dono do projeto.
> Como usar: cada seção responde uma pergunta com a conta resolvida passo a passo, para que qualquer pessoa da equipe consiga refazer o número na frente da banca. Os números prontos para o slide estão na seção 10.
> Fonte: [`../pesquisa/bruto/05-massa-computacao-lancamento.md`](../pesquisa/bruto/05-massa-computacao-lancamento.md) (frente 5). Estimativas da frente 5 continuam marcadas [INFERÊNCIA]. Preços em dólar (US$), sem conversão, com a data da fonte.
> Aviso: nada aqui é cotação de voo nem certificação. O hardware do óculos está em [`09-oculos-orbit.md`](09-oculos-orbit.md).

---

## 1. Massa e peso: a diferença que importa em órbita

| Grandeza | O que é | Unidade | Muda no espaço? |
| --- | --- | --- | --- |
| **Massa** | Quantidade de matéria do objeto | kg | Não |
| **Peso** | Força com que a gravidade puxa essa massa: peso = massa × aceleração da gravidade | newton (N) | Sim: na ISS (Estação Espacial Internacional) a balança marca quase zero |

A NASA explica que, em queda livre (que é o que a órbita é), a leitura de peso fica perto de zero, mas **massa e inércia continuam**. [OFICIAL, [NASA Glenn, What is microgravity](https://www.nasa.gov/centers-and-facilities/glenn/what-is-microgravity/)]

Duas consequências práticas:

1. **O custo de lançar depende da massa**, não do peso. Um óculos de 72 g custa para subir como 72 g, mesmo que lá em cima "não pese nada".
2. **O óculos não pesa no nariz, mas empurra quando a cabeça se move.** Acelerações, vibração e retenção continuam criando pressão nos pontos de contato. Na Lua e em Marte, a gravidade parcial volta. [INFERÊNCIA, frente 5]

**Conta resolvida: peso do óculos em cada lugar** (força = massa × gravidade; gramas viram quilogramas dividindo por 1.000). [INFERÊNCIA, frente 5]

| Massa | Terra (9,81 m/s²) | Lua (cerca de 1/6 da Terra) | Marte (cerca de 0,38 da Terra) | ISS |
| ---: | ---: | ---: | ---: | --- |
| 54 g | 0,054 × 9,81 = **0,53 N** | 0,53 ÷ 6 = **0,088 N** | 0,53 × 0,38 = **0,20 N** | quase zero de peso; massa segue 54 g |
| 72 g | 0,072 × 9,81 = **0,71 N** | 0,71 ÷ 6 = **0,118 N** | 0,71 × 0,38 = **0,27 N** | quase zero de peso; massa segue 72 g |

---

## 2. O que precisa subir

| Item | Massa | Base |
| --- | ---: | --- |
| Óculos Orbit, cenário mínimo (sem lentes) | 54 g = 0,054 kg | [INFERÊNCIA, frente 5], detalhe em [`09-oculos-orbit.md`](09-oculos-orbit.md), seção 4 |
| Óculos Orbit, cenário realista (sem lentes) | 72 g = 0,072 kg | idem |
| Computação na configuração mínima (laptop de bordo já instalado) | 0 g adicional | [INFERÊNCIA, frente 5] |
| Computação na configuração dedicada (módulo de borda completo) | 0,5 a 1,0 kg, alvo de engenharia | [INFERÊNCIA, frente 5] |
| Lote inicial para quatro tripulantes, com acessórios e sobressalentes | 2 kg, hipótese | [INFERÊNCIA, frente 5] |
| Kit dedicado de demonstração (computador, cabos, sobressalentes) | 5 kg, margem | [INFERÊNCIA, frente 5] |

---

## 3. Quanta computação cada tarefa de ML precisa

### 3.1 Vocabulário mínimo

- **Operação**: uma multiplicação ou uma soma. **FLOP** é uma operação com número decimal (ponto flutuante); MFLOP é um milhão, GFLOP é um bilhão. **MAC** (multiplicação e acumulação) junta uma multiplicação e uma soma.
- **Parâmetros**: os números que um modelo de aprendizado de máquina (ML) aprendeu. Ocupam memória: **float32** usa 4 bytes por parâmetro e **int8** usa 1 byte.
- **TOPS**: trilhões de operações por segundo, medida de aceleradores de IA.

### 3.2 Tabela por tarefa (frente 5, com os números corrigidos)

| Tarefa | Premissa | Custo de processamento | Memória do modelo (só pesos) | Fonte |
| --- | --- | --- | --- | --- |
| Filtros de EEG e EOG | 4 canais × 250 amostras/s; 2 filtros biquad por canal; cerca de 10 operações por filtro e amostra | cerca de 20 mil operações/s | kilobytes | [INFERÊNCIA] |
| FFT (transformada rápida de Fourier) e potência por banda | 4 canais; FFT de 256 pontos; cerca de 5 × N × log₂N operações por FFT | cerca de 41 mil operações por conjunto de 4 FFTs | poucos kB por canal | [INFERÊNCIA] |
| **DeepSleepNet original** | Redes convolucionais (CNN) mais BiLSTM (rede recorrente LSTM bidirecional), 1 canal de EEG (eletroencefalograma), épocas de 30 s | FLOPs por época não localizados | **21 a 24,7 milhões de parâmetros: 84 a 98,8 MB em float32, 21 a 24,7 MB em int8** | [PAPER, original](https://arxiv.org/abs/1703.04046); contagens em [SalientSleepNet](https://ijcai.org/proceedings/2021/0360.pdf) e [DeepSleepNet-Lite](https://arxiv.org/abs/2108.10600) |
| **TinySleepNet** | CNN mais LSTM, EEG bruto de 1 canal | FLOPs por época não localizados | **1,3 milhão: 5,2 MB em float32, 1,3 MB em int8** | [PAPER, IEEE EMBC 2020](https://ieeexplore.ieee.org/document/9176741/); [contagem comparativa](https://arxiv.org/abs/2108.10600) |
| **DeepSleepNet-Lite** | CNN simplificada, sequência de 90 s (três épocas) | FLOPs não localizados | **0,6 milhão: 2,4 MB em float32, 0,6 MB em int8**. Acurácia de 84,0 % (kappa 0,78) no Sleep-EDF v1 e 80,3 % (kappa 0,73) no v2, em protocolos próprios | [PAPER](https://arxiv.org/abs/2108.10600) |
| **YASA** (por características) | Características estatísticas e espectrais por época, depois LightGBM (árvores de gradient boosting, 500 estimadores, profundidade máxima 5) | **menos de 5 s para uma noite inteira** de PSG (polissonografia) a 100 Hz num laptop básico | não publicada; não é rede neural densa | [PAPER, Vallat e Walker, eLife 2021](https://elifesciences.org/articles/70092). Concordância mediana de 87,5 % em 585 noites; 86,6 % em adultos saudáveis e 84,3 % em apneia obstrutiva contra consenso de cinco especialistas |
| U-Sleep | cerca de 3,1 milhões de parâmetros, EEG e EOG (eletrooculografia) | sem FLOPs comparáveis | cerca de 12,4 MB em float32 (3,1 milhões × 4 bytes; a frente 5 escreve cerca de 12,5 MB), 3,1 MB em int8 | [PAPER](https://www.nature.com/articles/s41746-021-00440-5) |
| Anomalia em série temporal (Isolation Forest) | 24 características/s; 100 árvores; profundidade média 8 | cerca de 19.200 comparações/s | menos de 1 MB | [INFERÊNCIA] |
| Imagem eventual com ResNet-18 (fundo de olho ou OCT, tomografia de coerência óptica) | 1 imagem por inferência | 1,8 GFLOP por imagem | 11,7 milhões, cerca de 47 MB em float32 | [DOCUMENTAÇÃO](https://docs.pytorch.org/vision/2.0/models/generated/torchvision.models.resnet18.html) |
| Imagem com MobileNetV2 | 1 imagem por inferência | 0,3 GMAC (até 0,6 GFLOP) por imagem | 3,4 milhões, cerca de 13,6 MB em float32 | [PAPER, CVPR 2018](https://openaccess.thecvf.com/content_cvpr_2018/papers/Sandler_MobileNetV2_Inverted_Residuals_CVPR_2018_paper.pdf) |
| Modelo de linguagem local de 1 a 8 bilhões de parâmetros | pesos em 4 bits | precisa de memória extra para contexto e execução | 0,5 a 4 GB só de pesos | [INFERÊNCIA]; não é requisito para classificar sinais |

### 3.3 Contas resolvidas

| Conta | Passo a passo | Resultado |
| --- | --- | --- |
| Filtros | 4 canais × 250 amostras/s × 2 filtros × 10 operações | 20.000 operações/s |
| Uma FFT de 256 pontos | 5 × 256 × log₂(256) = 5 × 256 × 8 | 10.240 operações |
| Quatro FFTs | 4 × 10.240 | 40.960, cerca de 41 mil operações |
| FFTs a cada 30 s | 40.960 ÷ 30 | cerca de 1.365 operações/s |
| Pesos do DeepSleepNet em float32 | 21.000.000 × 4 bytes a 24.700.000 × 4 bytes | 84 a 98,8 MB |
| Pesos do DeepSleepNet em int8 | 21.000.000 × 1 byte a 24.700.000 × 1 byte | 21 a 24,7 MB |
| Pesos do TinySleepNet | 1.300.000 × 4 bytes; × 1 byte | 5,2 MB; 1,3 MB |
| Pesos do DeepSleepNet-Lite | 600.000 × 4 bytes; × 1 byte | 2,4 MB; 0,6 MB |
| Épocas numa noite de 8 h | 8 × 3.600 s ÷ 30 s | 960 épocas |
| YASA por época | 5 s ÷ 960 épocas | menos de 5,2 ms por época |
| Isolation Forest | 24 × 100 × 8 | 19.200 comparações/s |
| ResNet-18, uma imagem por minuto | 1,8 GFLOP ÷ 60 s | 30 MFLOP/s (uma a cada 10 s: 180 MFLOP/s) |
| Modelo de linguagem de 8 bilhões em 4 bits | 8.000.000.000 × 0,5 byte | 4 GB só de pesos |

Leitura da frente 5: filtros e FFT ficam muito abaixo da capacidade de um microcontrolador, de um Raspberry Pi 5 ou de um laptop, e são desprezíveis frente a qualquer CPU (processador central) atual; para comparar, o kit Orin Nano Super anuncia 67 TOPS, ou seja, 67 trilhões de operações por segundo (seção 4.1). [INFERÊNCIA, frente 5]

### 3.4 A correção do DeepSleepNet

A tabela 1 do artigo SleepMFormer imprime **0,78 milhão de parâmetros e 30,60 MFLOPs** para um modelo chamado "DeepSleepNet" (época de 30 s a 100 Hz) e 0,41 milhão (6,84 MFLOPs) para "TinySleepNet". Esses valores **não coincidem** com as contagens dos modelos canônicos: SalientSleepNet compara o DeepSleepNet original com 21 milhões de parâmetros, e o artigo do DeepSleepNet-Lite reporta cerca de 24,7 milhões para o original e 1,3 milhão para o TinySleepNet. O SleepMFormer não explica qual variante produziu os números menores. **Não use 0,78 milhão nem 30,6 MFLOPs para dimensionar o DeepSleepNet original.** O artigo original descreve a arquitetura, mas não traz a contagem de pesos. [PAPER, [SleepMFormer](https://www.mdpi.com/2076-3425/16/1/95); [SalientSleepNet](https://ijcai.org/proceedings/2021/0360.pdf); [DeepSleepNet-Lite](https://arxiv.org/abs/2108.10600)]

### 3.5 Conclusão para o pitch

Aquisição de EEG e EOG, potência por banda, estadiamento do sono e detecção simples de anomalia **cabem em CPU**. GPU (placa de processamento gráfico) não é requisito; ela só compra capacidade para visão e linguagem generativa. [INFERÊNCIA, frente 5] O YASA é a opção de menor custo, mas a configuração publicada usa EEG central, EOG e EMG (eletromiografia); sem EMG e com eletrodos na armação, precisa de validação própria. [PAPER, [Vallat e Walker](https://elifesciences.org/articles/70092)]

Se a equipe quiser linguagem local: em teste da NVIDIA (JetPack 6.2, INT4 via MLC), o Jetson Orin Nano 8 GB no modo Super gerou cerca de 19,1 tokens/s com Llama 3.1 8B, 43,1 com Llama 3.2 3B e 64,5 com SmolLM2 1.7B. É benchmark de fabricante, não desempenho garantido num gabinete de voo. [FABRICANTE, [NVIDIA](https://developer.nvidia.com/blog/?p=95089)]

---

## 4. As duas configurações

| | **Mínima** | **Dedicada** |
| --- | --- | --- |
| Computador | SSC (Station Support Computer, o laptop de apoio da estação) já aprovado | Módulo NVIDIA Jetson Orin NX 16 GB com placa carrier, armazenamento e dissipador |
| Massa adicional de computação | **quase zero** (0 g se o laptop já estiver disponível) | **0,5 a 1,0 kg**, alvo de engenharia para o conjunto, não especificação de fabricante |
| Potência | a do laptop que já está ligado | **15 a 25 W**, em perfil de potência restrito |
| Massa total a levar | 54 a 72 g (só o óculos) | 0,572 a 1,072 kg (óculos de 72 g + módulo) |
| Quando faz sentido | Sinal, sono e anomalia | Visão e linguagem local com menor latência, isolamento do software da estação ou redundância |
| O que falta | Autorização para rodar software e acessar dados; confirmar CPU, memória e sistema do SSC atual | Qualificação, gabinete térmico, fonte aprovada; o kit de desenvolvedor não é pacote espacial |

Fonte das duas configurações: [INFERÊNCIA, frente 5]. Para bancada e demonstração, a frente 5 sugere o kit Orin Nano Super (175 g, 7 a 25 W).

Sobre o SSC: a página do processo de software do Johnson Space Center lista HP ZBook 15 Gen 2 e iPads e avisa para não presumir o sistema operacional mais recente; um documento de 2020 descreve HP ZBook modificados para a ISS. Nenhuma das duas prova o modelo atual. [OFICIAL, [catálogo SSC](https://tsc.jsc.nasa.gov/roi-swprocess/sw_platforms.html); [NASA NTRS](https://ntrs.nasa.gov/api/citations/20205011808/downloads/IntroductionISSCrewDisplays.pdf)]

### 4.1 Plataformas candidatas

| Plataforma | Massa e tamanho | Consumo e desempenho | Preço público | Fonte |
| --- | --- | --- | --- | --- |
| SSC na estação | 0 g adicional; modelo atual não confirmado | CPU e memória atuais não confirmadas | sem custo incremental de lançamento | [OFICIAL](https://tsc.jsc.nasa.gov/roi-swprocess/sw_platforms.html) |
| Raspberry Pi 5, 8 GB | placa de cerca de 85 × 56 mm; massa não encontrada | 4 núcleos Cortex-A76 a 2,4 GHz; 0,8 A × 5,1 V = cerca de 4,1 W ativo; picos perto de 12 W | US$ 175 (lista, consultado em 15/11/2026) | [FABRICANTE](https://pip-assets.raspberrypi.com/categories/892-raspberry-pi-5/documents/RP-008348-DS-10-raspberry-pi-5-product-brief.pdf), [consumo](https://www.raspberrypi.com/documentation/hardware/raspberrypi/power.html) |
| Jetson Orin Nano Super (kit) | 175 g; 100 × 79 × 21 mm | 67 TOPS INT8 esparsos (33 densos); modos de 7, 15 e 25 W | US$ 399 sem estoque (15/11/2026); lançamento a US$ 249 (17/12/2024) | [FABRICANTE](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/), [loja](https://marketplace.nvidia.com/en-us/enterprise/robotics-edge/jetson-orin-nano-super-developer-kit/) |
| Jetson Orin NX 16 GB (módulo) | 69,6 × 45 mm; massa não localizada | até 100 TOPS INT8 esparsos (50 densos); 10 a 40 W | depende do integrador | [FABRICANTE](https://developer.nvidia.com/downloads/jetson-orin-nx-module-series-data-sheet) |
| HPE Edgeline EL4000 (referência de infraestrutura) | 17,2 a 17,6 kg; rack de 615 × 435 × 43 mm | 400 a 600 W típicos, até 800 W | cotação empresarial | [FABRICANTE](https://www.hpe.com/psnow/downloadDoc/HPE%20Edgeline%20EL4000%20Converged%20IoT%20System-c05211375.pdf) |

A ISS já roda computação comercial: o Spaceborne Computer-2 (instalado em 2021, com dois servidores HPE, processadores Intel Xeon Silver 5215 de 10 núcleos e quatro GPUs NVIDIA Tesla) processou dados de sequenciamento do BioMole a bordo. É infraestrutura de laboratório, não computador pessoal da tripulação. [NASA/JPL, [apresentação](https://ai.jpl.nasa.gov/public/documents/presentations/FSW-2022-Snapdragon-Presentation.pdf); PAPER/NTRS, [BioMole](https://ntrs.nasa.gov/citations/20220013040)]

### 4.2 Radiação

O SBC-1 (Spaceborne Computer-1) operou 207 dias sem reinício [OFICIAL, [NASA](https://www.nasa.gov/missions/station/iss-research/new-research-launching-to-space-station-aboard-northrop-grummans-15th-resupply-mission/)]; o SBC-2 testa computação comercial de prateleira (COTS) e recuperação de erro por radiação. Isso não qualifica qualquer placa. Mitigações de software recomendadas pela frente 5 para o protótipo: watchdog com recuperação, gravação atômica, checksums, reinício da inferência sem perder a aquisição, checkpoint periódico, cópia redundante das configurações e descarte explícito de amostras corrompidas; ECC (correção de erro na memória) só onde o hardware suporta. [INFERÊNCIA, frente 5]

---

## 5. Energia

### 5.1 Quanto cada parte consome por dia

| Parte | Conta | Energia por dia |
| --- | --- | --- |
| Óculos, energia útil (cenário-base) | 35 mW × 17 h + 30 mW × 9 h | 0,865 Wh |
| Óculos, energia tirada da tomada para recarregar | 0,865 Wh ÷ (0,70 × 0,85) | 1,454 Wh |
| Módulo dedicado ligado 24 h a 15 W | 15 W × 24 h | 360 Wh |
| Módulo dedicado ligado 24 h a 25 W | 25 W × 24 h | 600 Wh |

As linhas do óculos são [INFERÊNCIA, frente 5] (conta completa em [`09-oculos-orbit.md`](09-oculos-orbit.md), seção 5). As do módulo são conta nossa sobre a faixa de 15 a 25 W. Leitura: um dia de módulo dedicado a 15 W gasta tanta energia quanto cerca de 250 recargas do óculos (360 ÷ 1,454 = 248).

### 5.2 Energia na ISS

- Um painel de serviço da ISS fornece **120 V em corrente contínua** para cargas de utilidade. Ter a tomada não autoriza ligar qualquer fonte: carregador, conversão, cabo, bateria e proteção precisam de aprovação para a configuração. [OFICIAL, [NASA, painel de utilidade](https://www.nasa.gov/blogs/stationreport/2021/05/07/iss-daily-summary-report-5-07-2021/)]
- **28 V DC não foi confirmado** como tomada pública da tripulação; não presumir que um barramento interno seja conector disponível. [INFERÊNCIA, frente 5]
- O Raspberry Pi 5 espera 5 V e recomenda fonte de até 27 W; o Jetson Orin Nano tem perfis de 7 a 25 W. Ambos exigem fonte isolada aprovada e conversão regulada. [FABRICANTE, [Pi 5](https://www.raspberrypi.com/documentation/computers/getting-started.html?file=README.md); [Jetson](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/)]

### 5.3 Energia num habitat em Marte

A NASA descreve o programa Fission Surface Power na classe de **40 kW elétricos** contínuos; um estudo de arquitetura para quatro tripulantes avalia 15 kW como mínimo para certas funções de suporte à vida. [OFICIAL, [NASA, Fission Surface Power](https://www.nasa.gov/exploration-systems-development-mission-directorate/fission-surface-power/); PAPER/NTRS, [quatro tripulantes](https://ntrs.nasa.gov/citations/20170006519)]

```text
25 W ÷ 40.000 W × 100 = 0,0625 %
25 W ÷ 15.000 W × 100 = 0,17 %
```

Mesmo o módulo dedicado no perfil máximo seria uma fração muito pequena da energia de um habitat.

---

## 6. Quanto custa levar à ISS

### 6.1 As referências de preço

| Referência | Data | Valor | Leitura correta |
| --- | --- | --- | --- |
| CRS-1 (Commercial Resupply Services 1: Dragon e Cygnus) | Auditoria do OIG (Office of Inspector General, a auditoria interna da NASA) publicada em 26/04/2018 | **US$ 63.200/kg** estimado; US$ 191,3 milhões por missão em média | Contrato de transporte e logística à ISS, não custo marginal de um grama |
| CRS-2 (Dragon, Cygnus e Dream Chaser) | Projeção de 2016 revista no mesmo relatório de 2018 | **US$ 71.800/kg** projetado; US$ 300,6 milhões por voo | 14 % mais caro por kg que o CRS-1 (71.800 ÷ 63.200 = 1,136); projeção, não cotação atual |
| Dragon (CRS-1) | OIG, 2014 | US$ 133,3 milhões por voo; 3.310 kg de capacidade indicada | 133.300.000 ÷ 3.310 = cerca de US$ 40.300/kg de capacidade teórica [INFERÊNCIA] |
| Cygnus (CRS-1) | OIG, 2014 | US$ 237,5 milhões por voo; 2.700 kg | 237.500.000 ÷ 2.700 = cerca de US$ 88.000/kg [INFERÊNCIA] |
| Falcon 9 | Tabela SpaceX consultada em 15/11/2026 | US$ 74 milhões por lançamento; até 22.000 kg em LEO (órbita baixa da Terra) se totalmente descartável | 74.000.000 ÷ 22.000 = US$ 3.364/kg; não é preço de carga entregue à ISS |

Fontes: [OFICIAL, OIG 2018](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-18-016.pdf); [OFICIAL, OIG 2014](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-14-031.pdf); [FABRICANTE, SpaceX](https://www.spacex.com/assets/media/Capabilities%26Services.pdf).

**Por que o CRS custa tanto mais que a divisão do Falcon 9:** o CRS compra a missão de logística inteira: cápsula pressurizada, integração de segurança, preparação da carga, aproximação e operação na estação, retorno ou descarte e cronograma. O OIG aponta despesas de integração de pelo menos US$ 700 milhões no início do CRS-2, e a cápsula pode esgotar o volume antes da massa máxima. [OFICIAL, [OIG 2018](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-18-016.pdf)]

### 6.2 Conta de alocação

```text
custo alocado = massa transportada × custo médio histórico por kg
```

| Massa | Conta com US$ 63.200/kg (CRS-1) | Conta com US$ 71.800/kg (CRS-2 projetado) |
| ---: | ---: | ---: |
| 0,05 kg (50 g) | 0,05 × 63.200 = US$ 3.160 | 0,05 × 71.800 = US$ 3.590 |
| 0,054 kg (óculos mínimo) | US$ 3.413 | US$ 3.877 |
| 0,072 kg (óculos realista) | US$ 4.550 | US$ 5.170 |
| 2 kg (lote de quatro) | US$ 126.400 | US$ 143.600 |
| 5 kg (kit dedicado) | US$ 316.000 | US$ 359.000 |

[INFERÊNCIA, frente 5, sobre as médias do OIG de 2018]

> **Ressalva obrigatória na apresentação:** esses valores **não são cotação marginal**. A agência não compra uma fração de missão para um vestível, e o lançamento não queima combustível proporcional a cada grama. A carga ocupa parte da capacidade e do volume de uma missão já planejada; o custo real depende de espaço, integração, prioridade e contrato. Use a frase "parcela histórica do custo médio de transporte". [INFERÊNCIA, frente 5]

---

## 7. A equação do foguete, passo a passo

### 7.1 A ideia em uma frase

Para ganhar velocidade, o foguete joga massa para trás (o propelente queimado). Mais carga pede mais propelente, e esse propelente extra também precisa ser acelerado enquanto não é queimado; por isso a conta cresce de forma exponencial, não em linha reta.

### 7.2 Os ingredientes

| Símbolo | Nome | O que significa | Valor usado |
| --- | --- | --- | --- |
| Δv (delta-v) | Mudança de velocidade | Quanto a manobra precisa acelerar, em m/s | 9.400 m/s para chegar à órbita baixa [INFERÊNCIA, frente 5] |
| Isp | Impulso específico | Eficiência do motor, em segundos: quanto maior, menos propelente para a mesma manobra | 348 s (Merlin Vacuum do Falcon 9) [SECUNDÁRIA] |
| g0 | Gravidade padrão | Constante de conversão | 9,80665 m/s² |
| m0 | Massa inicial | Estágio cheio: estrutura, propelente e carga | |
| mf | Massa final | O que sobra depois da queima | |
| R | Razão de massa | m0 ÷ mf | calculada |
| ln e exp | Logaritmo natural e exponencial | exp desfaz o ln: se y = ln(x), então x = exp(y); exp(y) é o número 2,718 elevado a y | |

Sobre os valores: atingir a órbita baixa exige velocidade orbital de cerca de 7,8 km/s, mais perdas por gravidade, arrasto e direção; um documento NASA mostra velocidade ideal perto de 9,26 km/s, e a frente 5 usa 9,4 km/s como valor representativo de 9,3 a 9,5 km/s. [OFICIAL, [NASA NTRS](https://ntrs.nasa.gov/api/citations/20080013338/downloads/20080013338.pdf?attachment=true); [NASA Glenn, voo até a órbita](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/flight-to-orbit/)] O Isp de 348 s não está em ficha oficial atual da SpaceX (por isso [SECUNDÁRIA](https://spacelaunchlive.com/engines/merlin-1d-vacuum/)); a ficha histórica da NASA para uma geração anterior do Merlin 1D mostrava cerca de 340 s no vácuo. [OFICIAL, [NASA](https://sma.nasa.gov/LaunchVehicle/assets/spacex-falcon-9-data-sheet.pdf)]

### 7.3 A fórmula

A forma ideal (sem arrasto) da equação de Tsiolkovsky, segundo a NASA: [OFICIAL, [NASA Glenn, equação ideal do foguete](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/ideal-rocket-equation/)]

```text
Δv = Isp × g0 × ln(m0 ÷ mf)

Isolando a razão de massa:
R = m0 ÷ mf = exp(Δv ÷ (Isp × g0))

Propelente extra para cada massa extra que precisa chegar ao fim da queima:
propelente adicional = (R − 1) × massa adicional
```

### 7.4 Conta resolvida: subida até a órbita baixa

| Passo | O que fazer | Conta | Resultado |
| --- | --- | --- | --- |
| 1 | Multiplicar Isp por g0 (o resultado sai em m/s) | 348 s × 9,80665 m/s² | 3.412,7 m/s |
| 2 | Dividir o delta-v por esse valor | 9.400 ÷ 3.412,7 | 2,7544 |
| 3 | Aplicar a exponencial | exp(2,7544) | R = 15,71 |
| 4 | Tirar 1 para ficar só com o propelente | 15,71 menos 1 | **14,71 kg de propelente por kg de carga** |
| 5 | Ver a fração de propelente no estágio | 14,71 ÷ 15,71 | 0,936: 94 % da massa inicial seria propelente |

Em palavras: num estágio idealizado, cada quilograma que precisa continuar no estágio depois da queima exige 15,71 kg no início, dos quais 14,71 kg são propelente. [INFERÊNCIA, frente 5]

### 7.5 Exemplos

A coluna "Conta" mostra o fator arredondado; os resultados usam o fator sem arredondar (14,7117), por isso 5 kg dão 73,56 kg e não 73,55 kg:

| Carga adicional | Conta | Propelente adicional idealizado |
| ---: | --- | ---: |
| 0,05 kg (50 g) | 14,71 × 0,05 | **0,74 kg** |
| 0,054 kg (óculos mínimo) | 14,71 × 0,054 | 0,79 kg |
| 0,072 kg (óculos realista) | 14,71 × 0,072 | 1,06 kg |
| 2 kg | 14,71 × 2 | **29,42 kg** |
| 5 kg | 14,71 × 5 | **73,56 kg** |

**Por que "exponencial" importa:** com o delta-v ideal de 9,26 km/s em vez de 9,4 km/s, o fator cai de 14,71 para 14,08 kg/kg. Um delta-v 1,5 % menor muda o fator em cerca de 4 %. [conta nossa com a mesma fórmula]

### 7.6 Conta resolvida: injeção para Marte

Para sair da órbita baixa rumo a Marte, uma injeção de exemplo fica em torno de 3,6 km/s (depende do alinhamento dos planetas) [INFERÊNCIA, frente 5, a partir do [NASA Trajectory Browser](https://trajbrowser.arc.nasa.gov/user_guide.php)]. Com o motor criogênico RL10, Isp de 465,5 s numa variante (outras ficam entre 449,7 e 460,9 s) [FABRICANTE, [L3Harris](https://www.l3harris.com/sites/default/files/2024-07/l3harris-ar-rl10-spec-sheet.pdf)]:

| Passo | Conta | Resultado |
| --- | --- | --- |
| 1 | 465,5 × 9,80665 | 4.565,0 m/s |
| 2 | 3.600 ÷ 4.565,0 | 0,7886 |
| 3 | exp(0,7886) | R = 2,20 |
| 4 | 2,20 menos 1 | 1,20 kg de propelente por kg |
| Exemplos | 0,05 kg; 2 kg; 5 kg | 0,06 kg; 2,40 kg; 6,00 kg |

O fator é bem menor porque o motor é mais eficiente e a manobra pede menos velocidade. Essa tabela trata de massa no estágio de injeção, não de massa pousada; não some com o fator de Marte da seção 8. [INFERÊNCIA, frente 5]

### 7.7 O que essa conta não é

- É um **único estágio idealizado** com Isp constante, sem estrutura extra, propelente residual, tanques, motor, margem ou perdas atmosféricas. Não é um cálculo de missão Falcon 9: o foguete real tem vários estágios, cada um com seu Isp e sua massa seca, e descarta tanques vazios. [INFERÊNCIA, frente 5]
- **Leitura didática:** 50 g de carga "valem" cerca de 0,74 kg de propelente na subida idealizada. **Leitura de operação:** o foguete já é dimensionado para a carga planejada; um acessório pequeno ocupa margem de massa e volume, e ninguém acrescenta 0,74 kg ao tanque por causa dele. No pitch, mostre a equação como **sensibilidade**, e use o custo alocado (seção 6) como número de custo. [INFERÊNCIA, frente 5]

---

## 8. Marte: o "gear ratio"

A NASA chama de **gear ratio** o aumento da massa inicial do veículo quando se inclui 1 kg extra de carga. Ele varia com missão, duração, trajetória, propulsão e arquitetura; não é preço nem fator universal. [OFICIAL, [NASA, revisão de arquitetura de 2023](https://ntrs.nasa.gov/api/citations/20230016121/downloads/Round-Trip%20Mars%20Mission%20Mass%20Challenges.pdf)]

Exemplo de uma arquitetura de entrega só de ida à superfície, com aerocaptura, num material NASA de 15/02/2022: **7,4 kg em órbita baixa e 148 kg na Terra para cada 1 kg de carga pousada em Marte**. Outra relação do mesmo material (11,3 kg em órbita baixa para 1 kg de propelente já na superfície) é um caso diferente e não deve ser confundida. [OFICIAL, [apresentação NASA de 2022](https://ntrs.nasa.gov/api/citations/20220002258/downloads/Trademark%20FAU%20for%20export%20-2.15.2022%20BE%20No%20One%20Has%20Gone%202.0.pdf); [NASA, exemplo de massas](https://ntrs.nasa.gov/api/citations/20160005017/downloads/20160005017.pdf?attachment=true)]

| Carga na superfície de Marte | Em órbita baixa (× 7,4) | Na Terra (× 148) |
| ---: | ---: | ---: |
| 0,05 kg | 0,37 kg | 7,4 kg |
| 0,054 kg (óculos mínimo) | 0,40 kg | 7,99 kg |
| 0,072 kg (óculos realista) | 0,53 kg | 10,66 kg |
| 2 kg | 14,8 kg | 296 kg |
| 5 kg | 37 kg | 740 kg |

[INFERÊNCIA, multiplicação dos fatores de uma arquitetura NASA específica] A massa na Terra **não é só combustível**: inclui tudo o que aquela arquitetura precisa para mover a carga pelas etapas. Por isso 148 é muito maior que os 14,71 da seção 7: o gear ratio soma subida, viagem, descida, proteção térmica e estágios.

Missões tripuladas de ida e volta são bem mais exigentes: a análise NASA de 2023 estima cerca de 10,6 kg de propelente por kg de carga numa missão de 1.100 dias e 34,4 kg/kg num cenário de 850 dias. [OFICIAL, [NASA 2023](https://ntrs.nasa.gov/api/citations/20230016121/downloads/Round-Trip%20Mars%20Mission%20Mass%20Challenges.pdf)]

**Não existe tarifa pública para pousar 1 kg em Marte.** O Falcon 9 leva até 4.020 kg em trajetória para Marte; 74.000.000 ÷ 4.020 = US$ 18.408/kg, mas isso é só lançamento até a trajetória, sem pouso, lander nem proteção térmica. [FABRICANTE, [SpaceX](https://www.spacex.com/assets/media/Capabilities%26Services.pdf); INFERÊNCIA, frente 5]

---

## 9. Tabela final de custo por cenário

| Cenário | Massa | Alocação ISS (US$ 63.200 a 71.800/kg) | Propelente idealizado na subida (14,71 kg/kg) | Marte: em órbita baixa (× 7,4) | Marte: na Terra (× 148) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mínimo: um óculos | 0,054 kg | US$ 3.413 a 3.877 | 0,79 kg | 0,40 kg | 7,99 kg |
| Realista: um óculos | 0,072 kg | US$ 4.550 a 5.170 | 1,06 kg | 0,53 kg | 10,66 kg |
| Dedicado: um óculos e módulo | 0,572 a 1,072 kg | US$ 36.150 a 76.970 | 8,42 a 15,77 kg | 4,23 a 7,93 kg | 84,66 a 158,66 kg |
| Lote inicial de quatro tripulantes | 2 kg | US$ 126.400 a 143.600 | 29,42 kg | 14,8 kg | 296 kg |
| Kit dedicado de demonstração | 5 kg | US$ 316.000 a 359.000 | 73,56 kg | 37 kg | 740 kg |

Como ler: a alocação ISS é parcela histórica do custo médio do OIG (na linha dedicada, do menor peso com o menor preço ao maior peso com o maior preço); o propelente é sensibilidade da equação, não abastecimento real; as massas de Marte usam os fatores de uma arquitetura NASA de 2022. Em Marte não há preço: falta tarifa de superfície, e qualquer orçamento futuro precisa incluir veículo de descida e proteção térmica. As linhas mínimo, dedicado, lote e kit reproduzem a tabela D3 da frente 5; a linha realista e a coluna de propelente são contas nossas com os mesmos fatores. [INFERÊNCIA]

---

## 10. Números para o slide

| # | Número | Frase sugerida | Fonte |
| --- | --- | --- | --- |
| 1 | **54 a 72 g** | "O óculos Orbit pesa, pela estimativa, entre 54 e 72 g, sem as lentes." | Estimativa da frente 5 sobre fichas [JINS](https://www.jins.com/jp/client_info/JINSJINS/infoimage/20211006_Press%20Release1.pdf), [ISL](https://media.digikey.com/pdf/Data%20Sheets/ISL%20PDFs/SPK-I-81368.pdf) e [TinyCircuits](https://files.tinycircuits.com/Datasheets/ASR00035_500mAh.pdf) |
| 2 | **97,2 MB por noite** | "Quatro canais de EEG e EOG gravados a noite toda geram 97,2 MB." | Conta da frente 5 sobre a [ficha do ADS1299](https://www.ti.com/lit/ds/symlink/ads1299.pdf) |
| 3 | **8 g e 1,85 Wh** | "Uma bateria de 8 g cobre um dia de uso (0,865 Wh); recarga diária." | [TinyCircuits](https://files.tinycircuits.com/Datasheets/ASR00035_500mAh.pdf); orçamento [INFERÊNCIA] da frente 5 |
| 4 | **Quase zero de massa extra** | "Toda a análise roda no laptop que já está na estação; o modelo de sono cabe em CPU." | [INFERÊNCIA, frente 5]; YASA processa uma noite em menos de 5 s ([eLife](https://elifesciences.org/articles/70092)) |
| 5 | **0,5 a 1,0 kg e 15 a 25 W** | "Se a NASA quiser um computador dedicado, é um módulo de até 1 kg e 25 W." | [INFERÊNCIA, frente 5]; perfis do [Orin NX](https://developer.nvidia.com/downloads/jetson-orin-nx-module-series-data-sheet) |
| 6 | **US$ 63.200/kg** | "Pela média histórica do OIG, levar um óculos à ISS equivale a cerca de US$ 3.400 a US$ 5.200 do custo de transporte." | [OIG 2018](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-18-016.pdf); alocação, não cotação |
| 7 | **14,71 kg de propelente por kg** | "Na equação ideal do foguete, cada quilo extra pediria quase 15 kg de propelente: por isso cada grama conta." | [NASA Glenn](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/ideal-rocket-equation/); premissas da frente 5 |
| 8 | **148 kg na Terra por kg em Marte** | "Em Marte, cada quilo pousado custa 148 kg na Terra, num exemplo de arquitetura da NASA." | [NASA, 2022](https://ntrs.nasa.gov/api/citations/20220002258/downloads/Trademark%20FAU%20for%20export%20-2.15.2022%20BE%20No%20One%20Has%20Gone%202.0.pdf) |

Regras para quem apresenta: diga "estimativa" nos números 1 a 5; diga "média histórica, não cotação" no número 6; diga "conta idealizada" no número 7; diga "exemplo de uma arquitetura" no número 8.

---

## 11. Lacunas

- Massas de lente, placa, eletrodos, fiação, carcaça e transdutor precisam ser pesadas; 54 g e 72 g são limites inferiores.
- O modelo, a CPU, a memória e as permissões do SSC atual precisam ser confirmados com o responsável pelo processo.
- 28 V DC não foi identificado como tomada da tripulação; 120 V DC está confirmado, mas também exige fonte e interface aprovadas.
- O preço por kg vem de contratos do OIG de 2018 e projeções de 2016; falta cotação atual de carga pequena, integração, embalagem e retorno.
- O Isp de 348 s é de fonte secundária; o Raptor não tem ficha oficial pública completa por variante.
- As razões 7,4 e 148 são de uma arquitetura NASA de 2022, não massa nem preço fixos; não há tarifa de pouso em Marte.
- Nenhuma plataforma de computação foi testada em benchmark com os dados do Orbit; radiação, térmica e EMI do módulo dedicado não foram avaliadas.
