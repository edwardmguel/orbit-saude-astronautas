# Orbit: orçamento de massa, energia, computação embarcada e lançamento

**Data de corte da pesquisa:** 15 de novembro de 2026  
**Escopo:** estimativas rastreáveis para um protótipo wearable e para o processamento de saúde a bordo.  
**Convenção de evidência:** [OFICIAL] agência espacial ou documento normativo; [PAPER] publicação científica; [FABRICANTE] fabricante ou datasheet; [SECUNDÁRIA] fonte técnica não primária; [INFERÊNCIA] conta ou proposta ainda não validada em ensaio.

> Os valores de projeto abaixo não são certificação de voo nem cotação comercial. Onde não há massa de montagem publicada, a massa aparece como estimativa e precisa ser conferida por pesagem do protótipo. O monitoramento não substitui diagnóstico clínico nem decisão médica.

## D1. Orçamento de massa do óculos Orbit

### Arquitetura e referências comerciais

Óculos leves convencionais são uma referência de massa, não uma prova de conforto universal. A JINS informou para o JINS MEME uma armação de cerca de 20 a 21 g, excluindo o módulo CORE de 6 g e as lentes. A versão de óculos escuros pesava 25 a 26 g com as lentes, mas ainda sem o CORE. Portanto, os totais Orbit calculados abaixo não incluem as lentes e são limites inferiores até o conjunto óptico ser definido. O produto combinava três pontos de eletrooculografia (EOG), sensor de movimento de seis eixos e Bluetooth Low Energy (BLE); a própria fabricante publicou autonomia diferente conforme o uso do giroscópio. [FABRICANTE, fonte primária](https://www.jins.com/jp/client_info/JINSJINS/infoimage/20211006_Press%20Release1.pdf), [FABRICANTE, FAQ](https://faq-jp.jins.com/jp/faq/glasses/faq_detail.html?category=3043&id=1639&page=1)

O Shokz OpenRun pesa 26 g como headset completo e publica 8 h de reprodução, com bateria de 160 mAh. Esse número é uma referência de headset de condução óssea, não massa isolada de cada transdutor. [FABRICANTE](https://shokz.com/products/openrun), [FABRICANTE, suporte](https://help.shokz.com/s/product-detail?Id=a174x000006OuLYAA0)

Um transdutor avulso da ISL Products, modelo SPK-I-81368, declara 9 g por unidade, dimensões de 22 × 14 × 7,5 mm, impedância de 4 Ω e potência nominal de 3 W. A ficha também declara corrente máxima de 5 mA, número incompatível com 3 W em 4 Ω; portanto, uso apenas a massa e as dimensões como referência e considero a potência elétrica/acústica não resolvida até ensaio. [FABRICANTE, datasheet](https://media.digikey.com/pdf/Data%20Sheets/ISL%20PDFs/SPK-I-81368.pdf)

### EEG e EOG na armação

O front-end analógico (AFE, *analog front end*) ADS1299 da Texas Instruments integra conversores de 24 bits e oito canais simultâneos, com taxa de amostragem a partir de 250 amostras por segundo. A versão ADS1299-4 tem quatro canais e dissipa tipicamente 22 mW em operação normal nas condições da ficha; a versão de oito canais dissipa 39 mW. O componente de oito canais ocupa pacote TQFP de 12 × 12 mm. [FABRICANTE, ficha ADS1299](https://www.ti.com/lit/ds/symlink/ads1299.pdf), [FABRICANTE, página do produto](https://www.ti.com/product/ADS1299)

Como alternativa de baixo consumo, o ADS1292 tem dois canais e especifica cerca de 335 µW por canal. Isso pode atender uma configuração de poucos sinais, mas dois canais não registram simultaneamente um EEG e EOG horizontal e vertical com canais independentes. [FABRICANTE, ficha ADS1292](https://www.ti.com/lit/ds/symlink/ads1292.pdf), [FABRICANTE, página do produto](https://www.ti.com/product/ADS1292)

**Proposta mínima de canais, [INFERÊNCIA]:** três canais diferenciais simultâneos, um EEG frontal ou temporal, um EOG horizontal e um EOG vertical. Um quarto canal permite redundância, registro de referência ou segunda derivação EEG. A geometria possível inclui contatos secos na testa acima das lentes, nas têmporas, perto dos cantos externos dos olhos e nas plaquetas da ponte nasal. As posições exatas dependem da anatomia, pressão de contato, impedância pele-eletrodo e rejeição de artefato de movimento; precisam de teste com usuários e comparação com EEG clínico. A quantidade física de contatos pode ser reduzida por referência compartilhada, mas isso pode acoplar canais e não deve ser assumido sem validação.

Eletrodos secos de ouro, polímero condutor ou material metalizado são candidatos de integração, mas ainda não há fornecedor, geometria, massa nem desempenho de contato selecionados para este orçamento. Eletrodos de Ag/AgCl com gel são uma referência clínica conhecida, mas o uso prolongado na armação demanda teste de conforto, secagem e manutenção. A massa de eletrodos, suportes e fios na tabela é, portanto, [INFERÊNCIA], não dado de datasheet.

### MCU, registro offline e sensores

O Nordic nRF52840 tem núcleo Arm Cortex-M4F de 64 MHz, 1 MB de flash interna e 256 kB de RAM. A ficha do fabricante informa correntes de pico aproximadas de 4,8 mA na transmissão BLE a 0 dBm e 4,6 mA na recepção. Essa memória interna não comporta o registro bruto de uma noite de sinais multicanais. [FABRICANTE](https://www.nordicsemi.com/products/nrf52840), [FABRICANTE, especificação](https://docs.nordicsemi.com/r/bundle/ps_nrf52840/page/keyfeatures_html5.html)

Com quatro canais, 250 Hz e três bytes por amostra de 24 bits, o fluxo bruto é:

```text
4 canais × 250 amostras/s × 3 bytes/amostra = 3.000 bytes/s
3.000 bytes/s × 3.600 s/h × 9 h = 97.200.000 bytes, cerca de 97,2 MB
```

O número ainda não inclui carimbos de tempo, metadados, checksum e margem para dados auxiliares. Planejar pelo menos 128 MB úteis, preferivelmente 256 MB ou mais, é [INFERÊNCIA] para uma noite de nove horas com quatro canais. Para oito canais, só a amostra bruta já ocupa cerca de 194,4 MB. Armazenamento microSD ou flash externa maior é mais adequado que a flash interna de 1 MB do nRF52840.

O IMU LSM6DSOX da STMicroelectronics integra acelerômetro e giroscópio em pacote de 2,5 × 3 × 0,83 mm; o fabricante informa consumo típico próximo de 0,55 mA em modo de alto desempenho combinado. [FABRICANTE, datasheet](https://www.st.com/resource/en/datasheet/lsm6dsox.pdf) Sensor de luz ambiente e temperatura de pele são opcionais. Como não foi escolhida uma peça comercial e a posição de contato térmico não foi definida, estes itens ficam como reserva de placa e não recebem massa ou consumo próprios nesta versão.

### Bateria e cenários de massa

Uma bateria Li-polymer TinyCircuits de 500 mAh tem massa publicada aproximada de 8 g, tensão nominal de 3,7 V e energia nominal de 1,85 Wh. A ficha de uma bateria equivalente de 500 mAh também informa 8 g e dimensões de aproximadamente 52 × 34 × 2 mm. [FABRICANTE](https://files.tinycircuits.com/Datasheets/ASR00035_500mAh.pdf), [FABRICANTE, ficha de produto equivalente](https://www.fpbattery.com/wp-content/uploads/2024/06/fpbattery-293450-3.7V-500mAh-Lithium-Polymer-Battery-Specification.pdf)

**Orçamento de energia, [INFERÊNCIA]:** assumindo eletrônica de aquisição e registro com média de 35 mW durante 17 h, mais 30 mW médios para condução óssea durante as 9 h de sono:

```text
Eletrônica: 35 mW × 17 h = 0,595 Wh
Áudio noturno: 30 mW × 9 h = 0,27 Wh
Energia útil estimada = 0,865 Wh
Com 30% de reserva e 85% de eficiência de conversão:
energia nominal necessária = 0,865 Wh ÷ (0,70 × 0,85) = 1,454 Wh
Capacidade a 3,7 V = 1,454 Wh ÷ 3,7 V = 0,393 Ah, cerca de 393 mAh
```

Uma bateria de 500 mAh cobre este cenário estimado com margem limitada, mas a autonomia depende do nível de áudio, dos eletrodos, do ciclo de rádio e do armazenamento. No cenário de consumo alto, com 50 mW de eletrônica por 17 h e 100 mW de áudio por 9 h, a energia útil sobe para 1,75 Wh. Aplicando a mesma reserva e eficiência, seriam cerca de 795 mAh nominais. Uma bateria de 800 mAh, aproximada linearmente em 12,8 g a partir da unidade de 500 mAh, seria um alvo prudente para esse cenário; essa massa escalada é [INFERÊNCIA] e requer pesagem da peça selecionada.

| Bloco | Mínimo de conceito | Realista para protótipo | Base e ressalva |
|---|---:|---:|---|
| Armação leve | 21 g | 21 g | Referência JINS MEME, exclui CORE e lentes; o total Orbit também exclui lentes. |
| Transdutor ósseo | 9 g, mono | 18 g, estéreo | 9 g por peça, ficha ISL; a massa real do transdutor escolhido precisa ser confirmada. |
| Bateria | 8 g, 500 mAh | 12,8 g, 800 mAh | 500 mAh é dado de fabricante; 800 mAh é extrapolação linear de massa. |
| Placa, AFE, MCU, flash e sensores | 6 g | 8 g | Estimativa de montagem, sem placa escolhida nem cotação de massa. |
| Eletrodos, suportes e fiação | 4 g | 6 g | Estimativa para contatos secos e fixação; geometria não selecionada. |
| Caixa, proteção, conectores e retenção | 6 g | 6 g | Estimativa; precisa incluir isolação, vedação apropriada e fixação. |
| **Total estimado** | **54 g** | **71,8 g, arredondado para 72 g** | **[INFERÊNCIA] orçamento inicial, não massa pesada.** |

O cenário mínimo usa som mono e quatro canais disponíveis para EEG/EOG, com sensor e rádio em ciclo de trabalho reduzido. O cenário realista usa som estéreo, bateria maior e mais margem mecânica. As duas massas são metas para protótipo, pois placa, eletrodos e retenção ainda não têm números de fabricante.

### Amplificação de áudio por condução óssea

O amplificador classe D TPA2012D2 da Texas Instruments é estéreo, aceita alimentação de 2,5 a 5,5 V e especifica até 720 mW por canal em 3,6 V com carga de 8 Ω. O pacote WQFN mede aproximadamente 4 × 4 mm. A ficha informa corrente em repouso na ordem de 5 mA e desligamento de cerca de 1,5 µA. O valor de potência de saída é capacidade máxima de áudio, não consumo médio da bateria. [FABRICANTE, página](https://www.ti.com/product/TPA2012D2), [FABRICANTE, datasheet](https://www.ti.com/lit/ds/symlink/tpa2012d2.pdf)

Para a conta de bateria, usei 30 mW elétricos médios para reproduzir som de natureza durante a noite, [INFERÊNCIA] de projeto. O valor real depende do transdutor, impedância, pressão sonora desejada, transmissão mecânica e volume. A especificação de corrente máxima da peça ISL citada acima entra em conflito com a potência nominal, por isso a etapa de áudio não pode ser dimensionada apenas pela ficha e requer medição de corrente, vibração e nível de áudio no crânio. O áudio não deve encobrir alarmes operacionais nem impedir comunicação da tripulação.

### Conforto, gravidade e integração em cabine

Um estudo sobre armações cita recomendações da ISO 12870: contato total de plaquetas nasais de pelo menos 200 mm² para armações até 25 g e 250 mm² quando a armação supera 25 g. Isso é recomendação geométrica, não um limite universal de conforto. Os protótipos Orbit estimados em 54 g e 72 g excedem a referência de 25 g e devem distribuir a carga também pelas hastes e laterais, com áreas de contato suaves e ajuste individual. [PAPER](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1475-1313.2010.00755.x)

Em um estudo de head-mounted displays (HMDs) com massa de centenas de gramas, o aumento de massa reduziu o tempo de uso considerado confortável. Os autores não estudaram óculos leves nem microgravidade, portanto o resultado serve apenas como evidência de que a massa e a distribuição importam, não como modelo numérico direto para o Orbit. [PAPER](https://pubmed.ncbi.nlm.nih.gov/37718832/)

A massa do dispositivo continua sendo 54 a 72 g na ISS. Na microgravidade, o carregamento estático de gravidade sobre o nariz quase desaparece, mas a inércia continua: acelerações da cabeça, movimentos, vibração e retenção ainda podem exercer força e gerar pressão nos pontos de contato. Em superfícies lunar e marciana, a gravidade parcial volta. A NASA explica que massa e inércia permanecem embora a leitura de peso em queda livre seja próxima de zero. [OFICIAL](https://www.nasa.gov/centers-and-facilities/glenn/what-is-microgravity/)

| Massa | Força gravitacional na Terra, 9,81 m/s² | Lua, aproximadamente 1/6 da gravidade terrestre | Marte, aproximadamente 0,38 da gravidade terrestre |
|---:|---:|---:|---:|
| 54 g | 0,53 N | 0,088 N | 0,20 N |
| 72 g | 0,71 N | 0,118 N | 0,27 N |

Os valores da tabela são [INFERÊNCIA], calculados como força = massa × aceleração gravitacional, com conversão de gramas para quilogramas. No ambiente da ISS, essa carga gravitacional não se traduz em pressão nasal constante; pressão das hastes, fixação do headset, contato de eletrodos e impactos continuam sendo riscos de conforto que exigem ensaio.

### Segurança e qualificação para uso a bordo

O JSC-20793 Rev. D é um requisito de segurança para baterias em veículos tripulados, equipamentos portáteis, cargas e equipamentos da tripulação. A revisão D, de 8 de março de 2017, aparece ativa no catálogo de padrões NASA. Antes de aprovar voo, devem ser avaliados os perigos da bateria e verificados projeto, proteção e controles na configuração real. [OFICIAL, ficha do padrão](https://standards.nasa.gov/standard/JSC/JSC-20793_D), [OFICIAL, documento](https://standards.nasa.gov/sites/default/files/standards/JSC/D/0/jsc-20793_revd.pdf)

Para o Orbit, a avaliação deve cobrir célula e montagem final, proteção contra sobrecorrente e curto, carga e descarga, monitoramento e limites de temperatura, isolamento, contenção de falha, chicote e conectores, fixação para lançamento, uso e armazenamento, e carregador aprovado. Não se deve assumir que uma célula Li-polymer comercial ou uma porta USB autorizada satisfaz esses requisitos por si só. A aplicabilidade exata e a evidência de verificação são definidas pelo programa e pela autoridade de segurança da missão. [OFICIAL](https://standards.nasa.gov/sites/default/files/standards/JSC/D/0/jsc-20793_revd.pdf)

NASA-STD-6001 B com Change 3 é a revisão ativa identificada em 9 de junho de 2025. Ela cobre avaliação, ensaios e seleção de materiais, inclusive inflamabilidade e produtos de desgaseificação. A lista de ensaios aplicável depende do uso e da forma final do material. Polímeros da armação, adesivos, espumas, isolamento de fios, revestimentos, encapsulantes e partes de bateria devem ser encaminhados à avaliação de materiais, não aprovados apenas pela ficha comercial. [OFICIAL, ficha atual](https://standards.nasa.gov/standard/nasa/nasa-std-6001), [OFICIAL, documento](https://standards.nasa.gov/sites/default/files/standards/NASA/B-w/CHANGE-3/3/2025_06_25_NASA-STD-6001B_w_Change_3_FINAL_Admin-Change-FINAL.pdf)

Para carga pressurizada da ISS, o catálogo de padrões da NASA aponta SSP 30237, SSP 30238, SSP 30240, SSP 30242 e SSP 30245 para emissões e suscetibilidade eletromagnética, técnicas de compatibilidade, aterramento, cabos e ligações. O acesso à versão vigente é controlado pelo sistema de documentos da ISS. O equipamento deve passar pela avaliação EMI/EMC aplicável à configuração, incluindo emissões conduzidas e radiadas, suscetibilidade, cabos, aterramento e descarga eletrostática conforme aplicável. [OFICIAL, lista de padrões ISS](https://standards.nasa.gov/sites/default/files/standards/GSFC/B/0/gsfc-std-7000b_signature_cycle_04_28_2021_fixed_links.pdf)

Bluetooth e Wi-Fi aparecem em sistemas e dispositivos da ISS, mas isso não equivale a autorização automática para qualquer rádio ou frequência. O Orbit precisa de autorização de integração e testes de coexistência/EMC no arranjo aprovado. A NASA relata tablets e conectividade Wi-Fi em atividades da estação, e seus serviços de EMI avaliam configuração específica. [OFICIAL, exemplo de Wi-Fi a bordo](https://www.nasa.gov/blogs/stationreport/2024/07/26/iss-daily-summary-report-7-26-2024/), [OFICIAL, laboratório EMI/EMC](https://www.nasa.gov/centers-and-facilities/glenn/electromagnetic-interference-laboratory/)

Temperatura de contato não tem um único teto universal aplicável a todo material e duração. NASA-STD-3001 Vol. 2 Rev. F usa limites de temperatura de pele de 43 °C e 15 °C para dor ou perda de desempenho e estabelece cálculo de temperatura permissível do material conforme condutividade térmica e tempo de contato. O brief da NASA apresenta a faixa de 15 °C a 43 °C como referência não perigosa, com exceções que exigem controle. A placa, bateria e contatos junto à pele precisam de análise térmica e medição na operação contínua. [OFICIAL, padrão vigente](https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf), [OFICIAL, resumo técnico de touch temperature](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-009-touch-temperature.pdf)

**Pacote de evidências esperado antes do voo:** identificação e rastreio de todas as células e materiais; revisão de perigos de bateria e testes aplicáveis; ensaios de inflamabilidade e offgassing para materiais aplicáveis; análise térmica e testes de contato; verificação mecânica e de retenção; compatibilidade EMI/EMC e rádio; inspeção elétrica e de carregamento; análise operacional de falha e procedimento de uso. Isso é uma lista de trabalho derivada dos padrões citados, não uma lista universal de certificação nem uma aprovação já obtida.

## D2. Computação embarcada e uso offline

### O que a ISS já demonstra

A página do processo de software de voo do Johnson Space Center lista Station Support Computers (SSC) como HP ZBook 15 Gen 2 e iPads, mas avisa para não presumir que o sistema operacional mais recente esteja instalado. Um documento de 2020 descreve laptops comerciais HP ZBook modificados para o ambiente interno da ISS. Nenhuma dessas referências prova qual é o modelo atual exato do parque de SSC em 15 de novembro de 2026. A configuração precisa ser confirmada pelo responsável de integração antes de prometer CPU, memória ou GPU. [OFICIAL, catálogo SSC](https://tsc.jsc.nasa.gov/roi-swprocess/sw_platforms.html), [OFICIAL, apresentação técnica NASA](https://ntrs.nasa.gov/api/citations/20205011808/downloads/IntroductionISSCrewDisplays.pdf)

O Spaceborne Computer-2 (SBC-2) foi instalado na estação em 2021. Uma apresentação do Jet Propulsion Laboratory descreve dois computadores HPE COTS com processadores Intel Xeon Silver 5215 de 10 núcleos e quatro GPUs NVIDIA Tesla, além de kits Qualcomm Snapdragon 855 com Intel Myriad X em experimentos separados. A instalação é infraestrutura de laboratório, não um computador pequeno para uso pessoal da tripulação. [NASA/JPL](https://ai.jpl.nasa.gov/public/documents/presentations/FSW-2022-Snapdragon-Presentation.pdf)

O SBC-2 demonstrou processamento a bordo de dados de sequenciamento do BioMole: a análise de DNA/RNA passou do dado bruto a perfis taxonômicos no computador de estação, com resultados que acompanharam a análise processada em solo. A NASA registrou em 2025 a troca de um cartucho de processador do equipamento, evidência de que a plataforma continuava em uso no trabalho científico. [PAPER/NTRS](https://ntrs.nasa.gov/citations/20220013040), [OFICIAL, atividade de 2025](https://www.nasa.gov/blogs/spacestation/2025/06/05/science-software-hardware/)

A NASA também testa CIMON, assistente móvel de inteligência artificial da ESA, e os robôs Astrobee, que executam software embarcado em computadores internos e apoiam experimentos de autonomia. Esses exemplos comprovam atividades com inteligência artificial e autonomia em órbita, mas não equivalem à aprovação do Orbit ou de qualquer placa comercial. [OFICIAL, CIMON em 2018](https://www.nasa.gov/blogs/spacestation/2018/11/15/us-cargo-mission-slips-a-day-station-tests-free-flying-ai-assistant/), [OFICIAL, Astrobee](https://software.nasa.gov/software/ARC-17994-1)

Para o HPE Edgeline EL4000, o datasheet de produto publica formato de rack de cerca de 615 × 435 × 43 mm e a ficha QuickSpecs indica configurações de cerca de 17,2 a 17,6 kg, consumo típico de 400 a 600 W e máximo de 800 W. A ficha de suporte também lista chassis de cerca de 14 kg antes de algumas configurações. É uma referência de infraestrutura pesada, não de um módulo pessoal que se levaria no óculos. [FABRICANTE, suporte HPE](https://support.hpe.com/hpesc/public/docDisplay?docId=c05352431&docLocale=en_US&page=GUID-B9F31957-D823-420A-AEA7-FD09620FF0BA.html), [FABRICANTE, QuickSpecs](https://www.hpe.com/psnow/downloadDoc/HPE%20Edgeline%20EL4000%20Converged%20IoT%20System-c05211375.pdf)

### Estimativa das operações por tarefa

As estimativas abaixo tratam de inferência e processamento de sinais. A aquisição precisa continuar funcionando se uma etapa de inteligência artificial falhar. Cada alerta deve conservar o sinal original, a qualidade do dado, a versão do modelo e a justificativa verificável. O software não deve transformar uma inferência em diagnóstico sem validação médica.

| Tarefa | Premissa reproduzível | Ordem de grandeza | Memória de modelo | Interpretação |
|---|---|---:|---:|---|
| Filtros, EEG/EOG | 4 canais × 250 amostras/s; 2 biquads por canal; cerca de 5 multiplicações e 5 somas por seção/amostra | Cerca de 20 mil operações/s | Kilobytes a poucas centenas de kB | [INFERÊNCIA] muito abaixo da capacidade de MCU, Pi 5 ou laptop. |
| FFT e potência por banda | 4 canais; FFT de 256 pontos; aproximação de 5N log₂N operações por FFT, mais soma de potência em bandas | Cerca de 41 mil operações por conjunto de 4 FFTs; poucas milhares/s se uma janela a cada 30 s | Buffer de poucos kB por canal, conforme janela e sobreposição | [INFERÊNCIA] desprezível frente a qualquer CPU atual. |
| DeepSleepNet original | CNNs mais BiLSTM, EEG de um canal; arquitetura original para épocas de 30 s | FLOPs por época não localizados nas fontes primárias consultadas | Comparações posteriores reportam cerca de 21M a 24,7M parâmetros: 84 a 98,8 MB em float32 ou 21 a 24,7 MB em int8, só pesos | [PAPER original](https://arxiv.org/abs/1703.04046), [SalientSleepNet](https://ijcai.org/proceedings/2021/0360.pdf), [DeepSleepNet-Lite e comparação](https://arxiv.org/abs/2108.10600). O artigo original descreve a arquitetura, não apresenta essa contagem de pesos. |
| TinySleepNet | CNN mais LSTM, EEG bruto de um canal | FLOPs por época não localizados nas fontes primárias consultadas | Cerca de 1,3 milhão de parâmetros: 5,2 MB em float32 ou 1,3 MB em int8, só pesos | [PAPER, IEEE EMBC 2020](https://ieeexplore.ieee.org/document/9176741/), [código dos autores](https://github.com/akaraspt/tinysleepnet), [contagem comparativa](https://arxiv.org/abs/2108.10600). |
| DeepSleepNet-Lite | Variante simplificada, CNN feed-forward, sequência de 90 s, equivalente a três épocas de 30 s | FLOPs por época não localizados na fonte primária do modelo | Cerca de 0,6 milhão de parâmetros: 2,4 MB em float32 ou 0,6 MB em int8, só pesos | [PAPER](https://arxiv.org/abs/2108.10600). O artigo reporta 84,0% de acurácia e kappa 0,78 no Sleep-EDF v1, e 80,3% e kappa 0,73 no v2, em protocolos próprios. |
| Comparação de SleepMFormer, números que motivaram a revisão | A tabela de comparação rotula os modelos como DeepSleepNet e TinySleepNet; calcula uma época de EEG de 30 s a 100 Hz | Reporta 30,60 MFLOPs para “DeepSleepNet” e 6,84 MFLOPs para “TinySleepNet” | Reporta 0,78 milhão de parâmetros para “DeepSleepNet” e 0,41 milhão para “TinySleepNet” | [PAPER, tabela 1](https://www.mdpi.com/2076-3425/16/1/95). Esses valores não coincidem com as contagens comparativas dos modelos canônicos, 24,7M e 1,3M. O artigo não identifica uma variante Lite nem explica essa diferença. Não usar para estimar a memória do DeepSleepNet original. |
| YASA, alternativa por características | Características estatísticas e espectrais por época, depois LightGBM, um classificador de árvores de gradient boosting; publicação informa 500 estimadores e profundidade máxima 5 | A publicação informa menos de 5 s para processar uma noite inteira de PSG a 100 Hz em laptop básico. Para uma noite de 8 h, 960 épocas, isso equivale a menos de 5,2 ms/época, [INFERÊNCIA] por divisão, incluindo o pipeline e sem equivalência direta a FLOPs | Número de parâmetros e bytes do classificador não publicados; não é uma rede neural de pesos densos | [PAPER, Vallat e Walker, eLife 2021](https://elifesciences.org/articles/70092). Concordância mediana de 87,5% em 585 noites de teste; em avaliação separada contra consenso de cinco especialistas, acurácia mediana de 86,6% em adultos saudáveis e 84,3% em pacientes com apneia obstrutiva do sono. |
| Estágio do sono com U-Sleep | Modelo de aproximadamente 3,1 milhões de parâmetros, publicado para sinais EEG/EOG e uso multissujeito | O artigo comparativo consultado não traz FLOPs diretamente comparáveis por janela | Cerca de 12,5 MB em float32 ou 3,1 MB em int8, sem runtime | [PAPER](https://www.nature.com/articles/s41746-021-00440-5), [comparação de parâmetros](https://www.nature.com/articles/s41746-026-03406-7.pdf). |
| Anomalia em série temporal | 24 características/s; 100 árvores de Isolation Forest com profundidade média 8 | Aproximadamente 19.200 comparações/s | Menor que 1 MB para o exemplo | [INFERÊNCIA] estimativa 24 × 100 × 8 por segundo. Um autoencoder pequeno de 1.792 pesos exige cerca de 3.584 MAC/s em uma amostra por segundo. |
| Classificação de imagem ResNet-18 | Uma imagem por inferência, tamanho de entrada típico de benchmark | Aproximadamente 1,8 GFLOP/imagem; a cada 60 s equivale a cerca de 30 MFLOP/s de média | 11,7 milhões de parâmetros, cerca de 47 MB em float32 | [DOCUMENTAÇÃO DE SOFTWARE](https://docs.pytorch.org/vision/2.0/models/generated/torchvision.models.resnet18.html). A cada 10 s a média seria 180 MFLOP/s. |
| Classificação MobileNetV2 | Uma imagem por inferência | 300 milhões de multiplicações e somas por imagem, cerca de 0,3 GMAC ou até 0,6 GFLOP se multiplicação e soma forem contadas separadamente | 3,4 milhões de parâmetros, cerca de 13,6 MB em float32 | [PAPER, CVPR 2018](https://openaccess.thecvf.com/content_cvpr_2018/papers/Sandler_MobileNetV2_Inverted_Residuals_CVPR_2018_paper.pdf). |
| Modelo de linguagem local de 1 a 8 bilhões de parâmetros | Pesos quantizados a 4 bits, sem incluir cache, runtime e memória do sistema | 0,5 a 4 GB para pesos brutos; precisa reservar memória adicional para contexto e execução | Um modelo de 8B requer vários GB em 4 bits | [INFERÊNCIA] 4 bits equivalem a 0,5 byte por parâmetro; quantização tem metadados e memória auxiliar. Não é requisito para classificar sinais. |

Para sinal de quatro canais, duas seções biquad e uma operação por amostra, a conta do filtro é: 4 × 250 × 2 × 10, cerca de 20.000 operações/s. A tabela 1 do artigo SleepMFormer imprime 0,78 milhão de parâmetros e 30,60 milhões de FLOPs para um modelo chamado DeepSleepNet, em uma época de EEG de 30 s amostrada a 100 Hz. A mesma tabela imprime 0,41 milhão para TinySleepNet. Porém, SalientSleepNet compara o DeepSleepNet original com 21 milhões de parâmetros, e DeepSleepNet-Lite reporta cerca de 24,7 milhões para o mesmo modelo original e 1,3 milhão para TinySleepNet. O artigo SleepMFormer não descreve qual variante ou configuração produz seus valores menores, portanto não confirmo que 0,78 milhão e 30,60 milhões representem o DeepSleepNet original. Trato-os como resultado daquela tabela de comparação, não como dado de dimensionamento dos modelos canônicos. [PAPER, SleepMFormer, tabela 1](https://www.mdpi.com/2076-3425/16/1/95), [PAPER, SalientSleepNet](https://ijcai.org/proceedings/2021/0360.pdf), [PAPER, DeepSleepNet-Lite e comparação de parâmetros](https://arxiv.org/abs/2108.10600)

Para recalcular apenas o armazenamento de pesos, use parâmetros × bytes por peso: float32 usa 4 bytes e int8 usa 1 byte por peso. Assim, DeepSleepNet com 21M a 24,7M resulta em 84 a 98,8 MB em float32 ou 21 a 24,7 MB em int8; TinySleepNet com 1,3M resulta em 5,2 MB ou 1,3 MB; DeepSleepNet-Lite com 0,6M resulta em 2,4 MB ou 0,6 MB. São valores decimais dos pesos, sem buffers de entrada, ativações, runtime, metadados de quantização ou espaço do sistema operacional. Os artigos consultados não dão uma contagem de FLOPs uniforme por época para os três modelos. [PAPER, contagens comparativas](https://arxiv.org/abs/2108.10600), [PAPER, SalientSleepNet](https://ijcai.org/proceedings/2021/0360.pdf)

Para estágio de sono com pipeline tradicional, YASA calcula características por época e usa LightGBM com árvores de gradient boosting. Os autores informam processamento de uma noite de PSG a 100 Hz em menos de 5 s num laptop básico e concordância mediana de 87,5% em 585 noites de teste. Uma avaliação separada contra o consenso de cinco especialistas reportou acurácia de 86,6% em adultos saudáveis e 84,3% em pacientes com apneia obstrutiva do sono. A configuração publicada usa EEG central, EOG e EMG, então a aplicação ao Orbit sem EMG e com eletrodos em armação exige validação própria. Essa execução local é uma alternativa de baixo custo computacional; o artigo não fornece FLOPs nem tamanho de modelo em bytes. Para o estágio de sono, a CPU de um laptop ou computador de borda é suficiente em capacidade teórica; GPU não é requisito, mas o SSC e a implementação finais ainda precisam de benchmark. [PAPER, Vallat e Walker](https://elifesciences.org/articles/70092), [documentação YASA](https://yasa-sleep.org/generated/yasa.SleepStaging.html)

O uso de visão deve ser eventual, por exemplo analisar uma imagem de fundo de olho ou tomografia de coerência óptica (OCT), e não um fluxo permanente. ResNet-18 ou MobileNetV2 executam uma inferência por imagem; mesmo a ResNet-18 representa apenas cerca de 30 MFLOP/s se a imagem for analisada uma vez por minuto. O gargalo de um caso real tende a ser obtenção da imagem, processamento clínico validado, armazenamento e aprovação médica. [DOCUMENTAÇÃO DE SOFTWARE, ResNet-18](https://docs.pytorch.org/vision/2.0/models/generated/torchvision.models.resnet18.html), [PAPER, MobileNetV2](https://openaccess.thecvf.com/content_cvpr_2018/papers/Sandler_MobileNetV2_Inverted_Residuals_CVPR_2018_paper.pdf)

Um modelo de linguagem local pode explicar uma tendência em linguagem natural, porém não precisa tomar decisões nem gerar terapia. Para um protótipo, modelos de 1 a 3 bilhões de parâmetros com quantização e textos controlados cabem em módulos de borda; os pesos de um modelo 8B em 4 bits já consomem cerca de 4 GB antes de buffers. Em teste publicado pela NVIDIA com JetPack 6.2 e quantização INT4 via MLC, Jetson Orin Nano 8 GB no modo Super gerou cerca de 19,1 tokens/s com Llama 3.1 8B, 43,1 tokens/s com Llama 3.2 3B e 64,5 tokens/s com SmolLM2 1.7B. É benchmark de fabricante, não garantia de desempenho num gabinete térmico de voo. [FABRICANTE, metodologia e tabela](https://developer.nvidia.com/blog/?p=95089)

### Plataformas candidatas e limites de radiação

| Plataforma | Massa, dimensões | Consumo e desempenho | Preço público encontrado | Uso plausível |
|---|---|---|---|---|
| SSC disponível na estação | Massa adicional ao projeto: 0 g se o laptop já estiver disponível; massa total e SKU atual não confirmados publicamente | A CPU e a memória do SSC atual não estão confirmadas por fonte pública atual. A página histórica lista HP ZBook 15 Gen 2. | Equipamento da estação, sem custo incremental de lançamento do protótipo | [INFERÊNCIA] melhor configuração mínima: usar laptop aprovado e software autorizado, se o responsável liberar processamento local e acesso aos dados. |
| Raspberry Pi 5, 8 GB | Dimensões da placa de cerca de 85 × 56 mm; massa não encontrada em fonte primária consultada | BCM2712, quatro núcleos Cortex-A76 a 2,4 GHz. A documentação lista média ativa de 0,8 A em 5,1 V, cerca de 4,1 W; picos de carga podem chegar a cerca de 12 W. | US$ 175 de preço de lista para 8 GB no resumo de produto consultado em 15/11/2026 | Filtros, inferência de sono e anomalias. ResNet-18 em baixo volume é possível com execução otimizada, mas sem acelerador de IA dedicado. |
| Jetson Orin Nano Super Developer Kit | 175 g e 100 × 79 × 21 mm no kit desenvolvedor, incluindo solução térmica de referência | Até 67 TOPS INT8 esparsos, 33 TOPS densos; modos de módulo 7 W, 15 W e 25 W. | Página NVIDIA consultada em 15/11/2026 listava US$ 399 e sem estoque; anúncio oficial de 17/12/2024 publicou preço de lançamento de US$ 249. | Opção adequada para prova de conceito com visão e modelo pequeno de linguagem. Kit de desenvolvedor não é pacote espacial qualificado. |
| Jetson Orin NX, módulo | Dimensão do módulo da família cerca de 69,6 × 45 mm; massa do módulo não localizada em fonte oficial consultada | Orin NX 16 GB: até 100 TOPS INT8 esparsos, 50 TOPS densos; modos documentados de 10 W a 40 W no JetPack 6.2. | Cotação de módulo depende do integrador; preço atual verificável não encontrado | Integração dedicada menor que o kit completo, exigindo placa carrier, armazenamento, dissipação térmica, gabinete e fonte próprios. |
| HPE Edgeline EL4000 com aceleradores | Aproximadamente 17,2 a 17,6 kg na configuração publicada, dimensões de rack de 615 × 435 × 43 mm | 400 a 600 W típicos; até 800 W conforme configuração | Cotação empresarial, sem preço unitário atual aberto localizado | Laboratório de estação, inadequado como adição individual de baixo consumo. |

Fontes do Pi 5: ficha oficial com processador, memória, conectividade, dimensões e preços de lista, [Raspberry Pi](https://pip-assets.raspberrypi.com/categories/892-raspberry-pi-5/documents/RP-008348-DS-10-raspberry-pi-5-product-brief.pdf); consumo em uso ativo, [documentação de energia](https://www.raspberrypi.com/documentation/hardware/raspberrypi/power.html). Fontes Jetson: especificações e modos, [NVIDIA](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/), massa e dimensão do kit, [desenho de engenharia](https://developer.nvidia.com/downloads/assets/embedded/secure/jetson/orin_nano/docs/jetson_orin_nano_devkit_carrier_board_specification_sp.pdf), preço listado em 15/11/2026, [loja NVIDIA](https://marketplace.nvidia.com/en-us/enterprise/robotics-edge/jetson-orin-nano-super-developer-kit/), especificações do Orin NX, [datasheet de módulos](https://developer.nvidia.com/downloads/jetson-orin-nx-module-series-data-sheet).

**Radiação e tolerância:** a NASA informa que SBC-1 operou 207 dias sem reset e realizou mais de 1 trilhão de cálculos por segundo; SBC-2 testa computação COTS e recuperação de erro por radiação. Uma plataforma Snapdragon 855 com Myriad X foi testada e não apresentou efeitos adversos observados durante a missão descrita, mas isso não é qualificação radiológica genérica. [OFICIAL](https://www.nasa.gov/missions/station/iss-research/new-research-launching-to-space-station-aboard-northrop-grummans-15th-resupply-mission/), [NASA/JPL, payload e rádio desligado](https://ai.jpl.nasa.gov/public/documents/presentations/FSW-2022-Snapdragon-Presentation.pdf), [OFICIAL, teste de SBC-2](https://www.nasa.gov/blogs/stationreport/2022/07/25/iss-daily-summary-report-7-25-2022/)

Em circuitos comerciais, efeitos de evento singular podem corromper bits ou interromper uma tarefa. As mitigacões de software recomendadas para o protótipo são watchdog com recuperação, gravação atômica, checksums, reinício de inferência sem perder a aquisição, checkpoint periódico, cópia redundante das configurações e descarte explícito de amostras corrompidas. ECC só ajuda onde a memória realmente o suporta. Nenhuma dessas medidas substitui dose, tipo de órbita, shielding, ambiente eletrônico e avaliação do integrador da missão.

**Configuração mínima recomendada, [INFERÊNCIA]:** reutilizar um SSC aprovado já instalado, mais o Orbit wearable estimado em 54 a 72 g. A massa adicional da computação de análise fica próxima de zero, e o processamento de sinal e sono cabe em CPU. A autorização para executar software e acessar dados do computador de estação precisa vir do processo de integração.

**Configuração dedicada recomendada, [INFERÊNCIA]:** um módulo Orin NX 16 GB com placa carrier, armazenamento e dissipador, limitado em perfil de potência a 15 a 25 W para o protótipo e com massa integrada alvo de 0,5 a 1,0 kg. O intervalo de massa é uma meta de engenharia para o conjunto completo, não especificação de fabricante. Usar kit Orin Nano Super como computador de bancada e demonstração, 175 g e 7 a 25 W segundo o fabricante. Não é necessário usar GPU dedicada para as tarefas básicas; o módulo dedicado só se justifica se a equipe exigir visão e linguagem local com menor latência, isolamento do software da estação ou redundância computacional.

### Energia e conectividade da estação

Um painel de serviço da ISS disponibiliza 120 V em corrente contínua para cargas de utilidade. A existência de uma tomada de serviço não autoriza ligar qualquer fonte: carregador, conversão, cabo, bateria e proteção devem ser aprovados para a configuração. [OFICIAL, painel de utilidade](https://www.nasa.gov/blogs/stationreport/2021/05/07/iss-daily-summary-report-5-07-2021/)

A equipe deve tratar 28 V DC como tensão a confirmar no ponto de interface previsto. Não foi localizada nesta pesquisa uma especificação pública atual que identifique uma tomada de tripulação 28 V DC com autorização para uso geral do Orbit. Não presumir que barramento interno seja conector disponível ao usuário.

O Raspberry Pi 5 espera alimentação de 5 V e recomenda fonte de até 27 W para periféricos; o Jetson Orin Nano tem perfis de módulo de 7 W a 25 W. A integração em estação exige fonte isolada aprovada, conversão regulada para o módulo, carregador de bateria compatível e proteção contra falha. [FABRICANTE, Pi 5](https://www.raspberrypi.com/documentation/computers/getting-started.html?file=README.md), [FABRICANTE, Jetson](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/)

Para um habitat marciano, a NASA descreve o programa Fission Surface Power na classe de 40 kW elétricos para energia contínua; estudo de arquitetura para quatro tripulantes usa ordem de grandeza semelhante, com 15 kW como mínimo avaliado para certas funções de suporte à vida. Uma carga dedicada de 25 W seria 0,0625% de 40 kW. [OFICIAL, programa NASA](https://www.nasa.gov/exploration-systems-development-mission-directorate/fission-surface-power/), [PAPER/NTRS](https://ntrs.nasa.gov/citations/20170006519)

## D3. Lançamento, entrega à ISS e combustível adicional

### Preços publicados e custo alocado por massa

A auditoria do NASA Office of Inspector General (OIG) de 2018 calculou custo médio estimado de US$ 63.200/kg para Commercial Resupply Services 1 (CRS-1) e projetou US$ 71.800/kg para CRS-2 em 2016. Na mesma tabela, CRS-1 tinha custo médio de US$ 191,3 milhões por missão e CRS-2 projetava US$ 300,6 milhões. O CRS-2 projetado era 14% mais caro por quilograma que CRS-1, segundo a comparação do OIG. Os números incluem contratos e serviços de transporte à estação; não são preço atual de uma cotação de massa. [OFICIAL, OIG 2018](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-18-016.pdf)

O relatório OIG de 2014 apresenta uma comparação então corrente entre os veículos: média calculada de US$ 133,3 milhões por missão SpaceX/Dragon e capacidade combinada indicada de 3.310 kg; US$ 237,5 milhões por missão Orbital/Cygnus e capacidade indicada de 2.700 kg. A divisão aritmética dá cerca de US$ 40.300/kg para Dragon e US$ 88.000/kg para Cygnus. Esses quocientes são [INFERÊNCIA] de um contrato histórico dividido por capacidade máxima, não tarifas publicadas por quilograma. O próprio relatório observa que preço médio por missão era cálculo do OIG e que, em voos passados, volume da cápsula podia se esgotar antes de atingir massa máxima. [OFICIAL, OIG 2014](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-14-031.pdf), [OFICIAL, OIG 2018, nota sobre capacidade Dragon](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-18-016.pdf)

| Referência | Data e moeda | Preço ou capacidade publicada | Leitura correta |
|---|---|---:|---|
| CRS-1 agregado, Dragon e Cygnus | Auditoria OIG publicada em 26/04/2018, USD | US$ 63.200/kg estimado; US$ 191,3M por missão em média | Contrato de transporte e logística à ISS, não custo marginal de um grama. |
| CRS-2 agregado, Dragon, Cygnus e Dream Chaser | Projeção inicial de 2016 revisada no relatório OIG de 2018, USD | US$ 71.800/kg projetado; US$ 300,6M por voo | Projeção anterior à adjudicação de todos os voos; não cotação atual. |
| SpaceX Dragon | Valor médio por missão calculado pelo OIG em 2014, USD | US$ 133,3M por voo; capacidade indicada 3.310 kg, combinada pressurizada e não pressurizada | Divisão dá aproximadamente US$ 40.300/kg de capacidade teórica. |
| Orbital ATK Cygnus | Valor médio por missão calculado pelo OIG em 2014, USD | US$ 237,5M por voo; 2.700 kg de capacidade indicada | Divisão dá aproximadamente US$ 88.000/kg de capacidade teórica. |
| Falcon 9 | Tabela SpaceX consultada em 15/11/2026, USD | US$ 74M por lançamento, preço padrão até 2026; até 22.000 kg para LEO se totalmente descartável | US$ 3.364/kg é divisão da etiqueta de lançamento pela capacidade máxima, não preço de carga entregue à ISS. |
| Falcon Heavy | Capacidade SpaceX consultada em 15/11/2026; preço histórico, USD | 63.800 kg para LEO; 16.800 kg em trajetória para Marte. Preço de US$ 97M reportado em 2022 por fonte secundária. | Não foi localizada cotação pública atual da SpaceX; valor de 2022 não deve ser apresentado como preço atual. |
| Rideshare Transporter | Página SpaceX consultada em 15/11/2026, USD | A partir de US$ 350.000 para 50 kg em órbita síncrona ao Sol; US$ 7.000/kg adicional | Órbita e contrato de rideshare não são serviço de abastecimento da ISS. |

Fontes de capacidades e preço Falcon: [SpaceX, guia de capacidades e serviços](https://www.spacex.com/assets/media/Capabilities%26Services.pdf), [SpaceX, Falcon Heavy](https://new.spacex.com/vehicles/falcon-heavy), [SpaceX, rideshare](https://new.spacex.com/rideshare), [preço histórico Falcon Heavy em 2022, fonte secundária](https://www.space.com/spacex-raises-prices-launch-starlink-inflation).

A divisão de US$ 74 milhões pelo desempenho máximo declarado de Falcon 9 em LEO resulta em US$ 3.364/kg; para trajetória de escape/Mars, US$ 74 milhões divididos por 4.020 kg dá cerca de US$ 18.408/kg. A SpaceX condiciona a capacidade máxima a um voo totalmente descartável. Essas médias de preço por capacidade não incluem entrega em cápsula pressurizada à ISS, acoplagem, integração, embalagem, operações de carga, requisitos de segurança, retorno ou descarte. [FABRICANTE](https://www.spacex.com/assets/media/Capabilities%26Services.pdf)

O custo CRS é maior porque compra a missão de logística inteira: carga pressurizada, veículo e cápsula, integração de segurança, preparação de carga, aproximação e operação na estação, capacidade de retorno ou descarte e cronograma de entrega. A capacidade de massa teórica nem sempre é a quantidade efetivamente entregue. O OIG inclui no custo contratual integração e modificações, e aponta despesas de integração de pelo menos US$ 700 milhões no início de CRS-2. [OFICIAL, OIG](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-18-016.pdf)

### Conta de alocação para a ISS

Para transformar as médias históricas de serviço CRS em uma conta de referência:

~~~
Custo alocado = massa transportada × custo médio histórico por kg
~~~

| Massa considerada | Conta com US$ 63.200/kg, CRS-1 | Conta com US$ 71.800/kg, CRS-2 projetado |
|---:|---:|---:|
| 0,05 kg, aproximação de 50 g | US$ 3.160 | US$ 3.590 |
| 2 kg, quatro unidades e acessórios | US$ 126.400 | US$ 143.600 |
| 5 kg, kit com módulo de borda e peças | US$ 316.000 | US$ 359.000 |

São [INFERÊNCIA] de alocação usando médias do relatório de 2018. Uma armação de 54 g teria parcela de US$ 3.413 a US$ 3.877; a versão de 72 g, US$ 4.550 a US$ 5.170. Na operação real, a agência não contrata uma fração de missão para um wearable e o lançamento não queima uma quantidade de combustível proporcional a cada grama. A carga ocupa parte da capacidade pressurizada e de volume de uma missão planejada; o custo marginal negociado depende de espaço, integração, prioridade e contrato.

### Massa necessária para Marte e limite de custo conhecido

A NASA descreve “gear ratio” como o aumento da massa inicial do veículo quando um quilograma adicional de carga inerte é incluído. Ele varia conforme missão, duração, trajetória, propulsão e arquitetura; não é um preço nem um fator universal. [OFICIAL, revisão de arquitetura NASA 2023](https://ntrs.nasa.gov/api/citations/20230016121/downloads/Round-Trip%20Mars%20Mission%20Mass%20Challenges.pdf)

Um exemplo de arquitetura de entrega unidirecional à superfície marciana apresentado em material NASA de 2022 usa aerocaptura: 7,4 kg no ponto LEO para adicionar 1 kg de carga útil na superfície, e 148 kg no ponto Terra para o mesmo quilograma pousado. O material ilustra propulsor e massas de etapas, não um orçamento de voo atual. Outra relação mostrada nesse material, 11,3 kg em LEO para 1 kg de propelente já na superfície, é um caso distinto; não deve ser confundido com a razão de carga útil pousada. [OFICIAL, apresentação NASA de 15/02/2022](https://ntrs.nasa.gov/api/citations/20220002258/downloads/Trademark%20FAU%20for%20export%20-2.15.2022%20BE%20No%20One%20Has%20Gone%202.0.pdf), [NASA, exemplo de massas](https://ntrs.nasa.gov/api/citations/20160005017/downloads/20160005017.pdf?attachment=true)

| Carga útil adicionada na superfície de Marte | Massa incremental de referência em LEO, fator 7,4 | Massa inicial de referência na Terra, fator 148 |
|---:|---:|---:|
| 0,05 kg | 0,37 kg | 7,4 kg |
| 2 kg | 14,8 kg | 296 kg |
| 5 kg | 37 kg | 740 kg |

Todos esses números são [INFERÊNCIA] por multiplicação dos fatores de uma arquitetura NASA específica. A massa em LEO inclui o que aquela arquitetura precisa para movimentar a carga útil pelas etapas consideradas; a massa na Terra não é só combustível e não representa uma carga de lançamento contratada. A NASA ressalta em sua análise de 2023 que projetos complexos dividem propulsionamento entre veículo de trânsito, lander, veículo de ascensão e equipamentos pré-posicionados. Missões tripuladas redondas são muito mais exigentes: uma análise de 2023 estima cerca de 10,6 kg de propelente por kg de carga da missão de ida e volta em 1.100 dias, ou 34,4 kg/kg em um cenário de 850 dias. [OFICIAL](https://ntrs.nasa.gov/api/citations/20230016121/downloads/Round-Trip%20Mars%20Mission%20Mass%20Challenges.pdf)

Não foi encontrada uma tarifa pública atual para entregar um quilograma na superfície de Marte. O preço Falcon 9 por capacidade em trajetória de Marte, US$ 18.408/kg, é apenas um indicador de lançamento até uma trajetória interplanetária, sem pouso. Multiplicar essa tarifa pela massa do objeto sem lander, propelente de descida, proteção térmica e integração daria uma conta incompleta. Não há preço de voo Starship para entrega de carga marciana publicado em fonte comercial com validade de cotação nesta pesquisa.

### O que a equação do foguete diz

A equação ideal de Tsiolkovsky relaciona a mudança de velocidade, massa e eficiência do motor. A NASA explica que a forma ideal não inclui arrasto e que os efeitos externos precisam ser adicionados ao projeto de trajetória. [OFICIAL, NASA Glenn](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/ideal-rocket-equation/)

~~~
delta-v = Isp × g0 × ln(m0 / mf)
~~~

- delta-v é a mudança de velocidade exigida pela manobra, em m/s.
- Isp é o impulso específico do motor, em segundos. Quanto maior, menor o propelente para uma dada manobra.
- g0 é a gravidade padrão, 9,80665 m/s².
- m0 é a massa inicial com propelente e carga.
- mf é a massa ao fim da queima, sem o propelente consumido.
- ln é o logaritmo natural.

Na trajetória de um lançamento, atingir LEO requer velocidade orbital de aproximadamente 7,8 km/s, além das perdas por gravidade, arrasto e direção. Um documento NASA de engenharia mostra uma velocidade ideal para LEO próxima de 9,26 km/s; para as contas de exemplo uso 9,4 km/s, [INFERÊNCIA] representativa de 9,3 a 9,5 km/s incluindo perdas, não uma trajetória de foguete específica. [OFICIAL, cálculo ideal NASA](https://ntrs.nasa.gov/api/citations/20080013338/downloads/20080013338.pdf?attachment=true), [OFICIAL, voo até órbita](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/flight-to-orbit/)

Para demonstrar a sensibilidade da massa de propelente, escolho Isp = 348 s, valor típico atribuído à versão Merlin Vacuum do Falcon 9. Guias atuais SpaceX identificam a configuração MVac, mas não dão um valor de Isp diretamente; a referência de 348 s não foi localizada em ficha oficial atual e é [SECUNDÁRIA]. A ficha histórica NASA para Merlin 1D mostrava cerca de 340 s no vácuo para uma geração anterior. [FABRICANTE, identificação do MVac](https://www.spacex.com/assets/media/falcon-users-guide-2025-05-09.pdf), [OFICIAL, valores históricos NASA](https://sma.nasa.gov/LaunchVehicle/assets/spacex-falcon-9-data-sheet.pdf), [SECUNDÁRIA, referência 348 s](https://spacelaunchlive.com/engines/merlin-1d-vacuum/)

Com esse valor: Isp × g0 = 348 s × 9,80665 m/s² = 3.412,7 m/s. Para delta-v de 9.400 m/s, a razão ideal de massa inicial para final é R = exp(9.400 ÷ 3.412,7) = 15,71. Em palavras, cada quilograma que precisa continuar no estágio depois da queima exige 15,71 kg no início nesse estágio idealizado, dos quais 14,71 kg são propelente.

Se a estrutura do estágio não aumentar, cada quilograma adicional de carga útil aumenta a massa final seca em 1 kg. Para manter o mesmo delta-v, a massa inicial cresce R × 1 kg, e a diferença é o propelente adicional:

~~~
R = exp(delta-v / (Isp × g0))
propelente adicional por carga = (R − 1) × massa adicional
~~~

Usando R = 15,71, o fator de propelente adicional é 14,71 kg por kg de carga:

| Carga adicional | Conta idealizada para lançamento a LEO |
|---:|---:|
| 0,05 kg | 14,71 × 0,05 = 0,74 kg de propelente |
| 2 kg | 14,71 × 2 = 29,42 kg de propelente |
| 5 kg | 14,71 × 5 = 73,56 kg de propelente |

Essa conta assume um único estágio idealizado com Isp constante, sem massa estrutural adicional, propelente residual, reservatórios, motor, margem, restrição de empuxo ou perda de desempenho com a atmosfera. Não é um cálculo de missão Falcon 9 e não é necessariamente um limite superior ou inferior. O Falcon 9 real usa múltiplos estágios, que descartam tanques e motores vazios. Cada etapa tem seu Isp, sua massa seca e seu delta-v; a razão de massa total combina essas etapas e a trajetória. Uma conta confiável de voo precisa do modelo do veículo e da distribuição de massa por estágio.

Para injeção trans-Marte a partir de LEO, um exemplo Hohmann depende do alinhamento planetário e fica em torno de 3,6 km/s. A NASA Trajectory Browser calcula essa injeção a partir de C3 e uma órbita de referência de 200 km; o valor de 3,6 km/s é [INFERÊNCIA] representativa, não requisito fixo. [OFICIAL, navegador de trajetórias NASA](https://trajbrowser.arc.nasa.gov/user_guide.php)

O RL10 é um motor criogênico de estágio superior. L3Harris publica Isp de 465,5 s para uma variante RL10, enquanto outras variantes na mesma ficha ficam entre 449,7 e 460,9 s. A razão ideal com 3,6 km/s e 465,5 s é exp(3.600 ÷ (465,5 × 9,80665)) = 2,20, ou cerca de 1,20 kg de propelente adicional por kg extra de massa final do estágio. [FABRICANTE](https://www.l3harris.com/sites/default/files/2024-07/l3harris-ar-rl10-spec-sheet.pdf)

| Massa adicional colocada no estágio de injeção | Conta idealizada de propelente RL10 para delta-v de 3,6 km/s |
|---:|---:|
| 0,05 kg | 1,20 × 0,05 = 0,06 kg |
| 2 kg | 1,20 × 2 = 2,40 kg |
| 5 kg | 1,20 × 5 = 6,00 kg |

A tabela de RL10 trata de massa acrescentada ao estágio de injeção, não de massa pousada em Marte. Não se deve somá-la novamente ao fator 7,4 kg em LEO por kg pousado da tabela anterior, pois o gear ratio de uma arquitetura já engloba massa e propulsionamento da missão. A conta simples serve para explicar a mecânica da equação; não substitui um modelo de pouso marciano.

Entre motores com valores públicos de referência, Merlin 1D sea-level é citado em torno de 282 s e MVac entre 340 e 348 s conforme versão e fonte; RL10 tem valores de aproximadamente 450 a 465,5 s por variante; Raptor é motor metano/oxigênio da SpaceX e estimativas públicas de Isp são tipicamente da faixa de 330 a 350 s em configuração de nível do mar, mas a SpaceX não publica uma ficha de desempenho completa atual para todas as variantes. Para decisões numéricas, usar o Isp da variante exata do motor e a trajetória exata, e marcar qualquer valor Raptor sem ficha como [SECUNDÁRIA] ou [INFERÊNCIA]. [OFICIAL, Raptor e variantes](https://new.spacex.com/vehicles/starship), [FABRICANTE, RL10](https://www.l3harris.com/sites/default/files/2024-07/l3harris-ar-rl10-spec-sheet.pdf), [NASA, Merlin 1D histórico](https://sma.nasa.gov/LaunchVehicle/assets/spacex-falcon-9-data-sheet.pdf)

### Duas leituras para comunicar combustível e custo

**Leitura didática da equação:** em estágio idealizado de subida, 50 g de carga representam cerca de 0,74 kg de propelente adicional sob as premissas escolhidas. Para a manobra ideal de injeção trans-Marte, 50 g representam 0,06 kg de propelente adicional no estágio RL10. São exercícios de sensibilidade, não massas que a equipe de lançamento adicionará ao tanque.

**Leitura de operação e contrato:** foguete e missão já são dimensionados para uma carga planejada. Um acessório pequeno ocupa uma fração da margem de massa e do volume disponível, ou pode fazer o integrador alterar o empacotamento ou a missão. O lançamento não abastece combustível proporcional à massa de cada item; para o pitch, use o custo alocado de serviço, acrescido do custo de integração e certificação que vier a ser cotado.

### Tabela de custo de transporte do Orbit

A tabela separa preço de serviço, custo médio dividido por capacidade e ausência de tarifa de superfície. Todos os preços de contrato e lista estão em USD, sem conversão cambial, pois câmbio não é necessário para comparar as fontes originais. Os preços por quilograma usam fontes históricas e devem ser atualizados por uma cotação de voo antes de uma proposta orçamentária.

| Cenário | Massa modelada | Referência de preço para ISS | Conta de alocação ISS | Marte, massa de missão de referência | Preço de Marte |
|---|---:|---|---:|---|---|
| Mínimo, um Orbit | 0,054 kg na versão mínima | CRS histórico: US$ 63.200 a US$ 71.800/kg | US$ 3.413 a US$ 3.877 | 0,40 kg em LEO; 7,99 kg de massa inicial de referência na Terra | Sem tarifa de superfície. Falcon 9: US$ 18.408/kg em capacidade de trajetória a Marte é só proxy de lançamento, sem pouso. |
| Dedicado, um Orbit e módulo | 0,572 a 1,072 kg, Orbit de 72 g mais 0,5 a 1,0 kg de módulo integrado alvo | CRS histórico: US$ 63.200 a US$ 71.800/kg | US$ 36.150 a US$ 76.970 | 4,23 a 7,93 kg em LEO; 84,66 a 158,66 kg de massa inicial de referência na Terra | Sem tarifa de superfície. O preço requer modelo de veículo, lander e integração. |
| Lote inicial de quatro tripulantes | 2 kg, acessórios e sobressalentes incluídos por hipótese | CRS histórico: US$ 63.200 a US$ 71.800/kg | US$ 126.400 a US$ 143.600 | 14,8 kg em LEO; 296 kg de massa inicial de referência na Terra | Sem tarifa de superfície; uma cotação de lançamento não equivale a pouso em Marte. |
| Kit dedicado de demonstração | 5 kg, margem para computador, cabos e sobressalentes | CRS histórico: US$ 63.200 a US$ 71.800/kg | US$ 316.000 a US$ 359.000 | 37 kg em LEO; 740 kg de massa inicial de referência na Terra | Sem tarifa de superfície; incluir veículo de descida e proteção térmica em orçamento futuro. |

As massas marcianas da tabela usam o fator NASA de 7,4 entre LEO e superfície e 148 entre Terra e superfície, aplicado como analogia de massa de sistema para carga útil adicional. O cenário dedicado soma o wearable de 72 g ao intervalo de massa alvo do computador, sem afirmar que o hardware esteja pronto para voo. As faixas de preço ISS são médias históricas do OIG. A multiplicação final é [INFERÊNCIA], e não uma oferta de transportador.




## D4. Orçamento final de massa, energia e volume

| Item | Massa (g) | Consumo (mW ou W) | Volume aproximado | Fonte | Observação |
|---|---:|---:|---|---|---|
| Armação leve | 21 | 0 mW | Envelope de óculos, cerca de 0,78 L | [JINS, fabricante](https://www.jins.com/jp/client_info/JINSJINS/infoimage/20211006_Press%20Release1.pdf) | Massa exclui lentes e CORE. O envelope é [INFERÊNCIA], dimensões aproximadas 140 × 140 × 40 mm. |
| Transdutor ósseo, mono | 9 por unidade | Até 30 mW médios no cenário de áudio noturno, [INFERÊNCIA] | 2,31 cm³ por peça, calculado de 22 × 14 × 7,5 mm | [ISL, fabricante](https://media.digikey.com/pdf/Data%20Sheets/ISL%20PDFs/SPK-I-81368.pdf) | 4 Ω e 3 W nominais na ficha, mas a corrente máxima de 5 mA é incoerente com essa potência. Validar componente e saída. |
| Par de transdutores ósseos, estéreo | 18 | Parte dos 30 mW médios estimados para o bloco de áudio | Cerca de 4,62 cm³ | [ISL, fabricante](https://media.digikey.com/pdf/Data%20Sheets/ISL%20PDFs/SPK-I-81368.pdf) | Duas unidades em dois lados da armação. Massa real depende do transdutor selecionado. |
| Amplificador classe D TPA2012D2 | Massa de montagem incluída na estimativa da placa, N/D isolada | Corrente de repouso próxima de 5 mA a 3,6 V; saída máxima de 720 mW/canal, não consumo médio | Pacote 4 × 4 mm; corpo, menos de 0,1 cm³ | [TI, datasheet](https://www.ti.com/lit/ds/symlink/tpa2012d2.pdf) | 30 mW é consumo médio estimado do áudio, incluindo amplificação em uso, não pico nem potência acústica. |
| AFE ADS1299-4 para EEG/EOG | Integrada à placa, massa isolada N/D | 22 mW típicos | Pacote TQFP 12 × 12 mm | [TI, datasheet](https://www.ti.com/lit/ds/symlink/ads1299.pdf) | Quatro canais, 24 bits. Alternativa ADS1292 consome cerca de 335 µW/canal, mas oferece dois canais. |
| Eletrodos, suportes e fios | 4 mínimo; 6 realista, [INFERÊNCIA] | Abaixo de 1 mW em contatos passivos | Estimativa de 1 a 3 cm³ distribuídos na armação | [TI ADS1299, referência de aquisição](https://www.ti.com/product/ADS1299) | Material e formato sem seleção; não são massa de datasheet. |
| MCU nRF52840, placa e rádio BLE | Incluída nos 6 g mínimos ou 8 g realistas de placa e sensores | Pico aproximado de 14 mW na transmissão a 0 dBm, 14 mW na recepção; média estimada de 5 a 15 mW conforme ciclo de rádio | Chip conforme pacote escolhido; montagem total ainda não definida | [Nordic, especificação](https://docs.nordicsemi.com/r/bundle/ps_nrf52840/page/keyfeatures_html5.html) | Flash interna de 1 MB não guarda uma noite de dados multicanais brutos. |
| Flash externa ou cartão para dados | N/D, peça não selecionada | N/D; reservar 5 mW em média para a conta de sistema, [INFERÊNCIA] | 128 MB úteis como mínimo projetado; dimensões dependem do meio | [Nordic nRF52840, capacidade interna](https://www.nordicsemi.com/products/nrf52840) | Quatro canais, 250 Hz, amostras de 24 bits, nove horas resultam em 97,2 MB brutos. Reservar 128 a 256 MB ou mais. |
| IMU LSM6DSOX | Incluída nos 6 g mínimos ou 8 g realistas de placa e sensores | Cerca de 1 mW calculado a 0,55 mA e 1,8 V em modo combinado | 2,5 × 3 × 0,83 mm, aproximadamente 0,006 cm³ | [ST, datasheet](https://www.st.com/resource/en/datasheet/lsm6dsox.pdf) | A massa do componente não foi localizada na ficha. |
| Sensor de luz ambiente | N/D, ainda não selecionado | Reserva de 1 mW, [INFERÊNCIA] | N/D | [ams OSRAM, catálogo](https://ams-osram.com/products/sensor-solutions/ambient-light-color-spectral-proximity-sensors/ams-tsl25911-ambient-light-sensor) | Opcional; selecionar após definir precisão e posição da lente/sensor. |
| Sensor de temperatura da pele | N/D, ainda não selecionado | Reserva de 1 mW, [INFERÊNCIA] | N/D | Nenhum modelo selecionado | Opcional. Exige contato estável, calibração e avaliação de temperatura de toque. |
| Bateria Li-polymer, 500 mAh | 8 | Energia nominal de 1,85 Wh | Cerca de 3,5 cm³, geometria nominal 52 × 34 × 2 mm | [TinyCircuits, fabricante](https://files.tinycircuits.com/Datasheets/ASR00035_500mAh.pdf), [FPBattery, fabricante](https://www.fpbattery.com/wp-content/uploads/2024/06/fpbattery-293450-3.7V-500mAh-Lithium-Polymer-Battery-Specification.pdf) | Compatibilidade elétrica não significa qualificação de voo. |
| Bateria Li-polymer, 800 mAh, estimada | 12,8 | Energia nominal estimada de 2,96 Wh | Cerca de 5,7 cm³ se escala geométrica linear, [INFERÊNCIA] | Escala linear da referência de 500 mAh | Alvo para cenário de maior consumo, validar dimensão e massa da peça real. |
| Placa Orbit, componentes eletrônicos agregados | 6 mínimo; 8 realista, [INFERÊNCIA] | 35 mW médios de aquisição e registro no cenário-base, sem áudio | Aproximadamente 3 a 5 cm³, [INFERÊNCIA] | Soma de blocos TI, Nordic, ST e flash | Massa e volume da placa não foram pesados. A média de 35 mW inclui AFE, MCU, memória, sensores e perda de conversão estimada. |
| Carcaça, conectores, cabos e retenção | 6, [INFERÊNCIA] | 0 mW | Cerca de 3 a 5 cm³, distribuídos | Estimativa de integração | Precisa conter bateria, contatos elétricos e transdutores sem pontos de pressão. |
| **Orbit mínimo, sem lentes** | **54** | **35 mW em aquisição; cerca de 65 mW com áudio noturno** | **Envelope geral aproximado de 0,78 L** | **Soma de referências e estimativas** | **Limite inferior. Adicionar massa de lentes, cabos e fixações que ainda não foram definidos.** |
| **Orbit realista, sem lentes** | **72** | **35 mW em aquisição; cerca de 65 mW com áudio noturno, alvo** | **Envelope geral aproximado de 0,78 L** | **Soma de referências e estimativas** | **Limite inferior. O áudio real pode elevar a demanda média.** |
| Raspberry Pi 5, 8 GB | Massa não encontrada em fonte oficial consultada | Cerca de 4,1 W em uso ativo de placa nua; carga elevada pode se aproximar de 12 W | Placa de 85 × 56 mm; altura depende de conectores e dissipação | [Raspberry Pi, produto](https://pip-assets.raspberrypi.com/categories/892-raspberry-pi-5/documents/RP-008348-DS-10-raspberry-pi-5-product-brief.pdf), [consumo](https://www.raspberrypi.com/documentation/hardware/raspberrypi/power.html) | Não adequado para montar na armação; massa da placa não foi atribuída sem pesagem. |
| Jetson Orin Nano Super Developer Kit | 175 | 7 a 25 W conforme perfil | 100 × 79 × 21 mm, aproximadamente 166 cm³ | [NVIDIA, kit e desempenho](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/), [desenho mecânico](https://developer.nvidia.com/downloads/assets/embedded/secure/jetson/orin_nano/docs/jetson_orin_nano_devkit_carrier_board_specification_sp.pdf) | Kit de desenvolvedor inclui placa carrier e solução térmica; não é módulo qualificado para voo. |
| NVIDIA Jetson Orin NX 16 GB | Massa do módulo não localizada | Perfis publicados de 10 a 40 W | Pegada do módulo 69,6 × 45 mm; volume final depende da placa carrier e dissipador | [NVIDIA, módulos e perfis](https://developer.nvidia.com/blog/?p=95089), [datasheet](https://developer.nvidia.com/downloads/jetson-orin-nx-module-series-data-sheet) | Desempenho até 100 TOPS INT8 esparsos. O alvo de conjunto completo é 0,5 a 1,0 kg, [INFERÊNCIA]. |
| HPE Edgeline EL4000 | 14 kg só chassis; configurações de 17,2 a 17,6 kg | 400 a 600 W típicos; máximo de 800 W | 615 × 435 × 43 mm | [HPE, suporte](https://support.hpe.com/hpesc/public/docDisplay?docId=c05352431&docLocale=en_US&page=GUID-B9F31957-D823-420A-AEA7-FD09620FF0BA.html), [HPE, QuickSpecs](https://www.hpe.com/psnow/downloadDoc/HPE%20Edgeline%20EL4000%20Converged%20IoT%20System-c05211375.pdf) | Infraestrutura de rack e referência da estação, não equipamento individual de baixa massa. |

### Leitura da tabela e escolha de arquitetura

O cenário de 54 g usa uma referência de armação sem lentes, um único transdutor ósseo, bateria de 500 mAh, placa customizada e quatro canais de AFE. O cenário de 72 g usa estéreo, bateria de 800 mAh e margens adicionais de placa/contatos. Ambos excluem as lentes; o Orbit real pesará mais quando lente, prescrição, proteção e fixação forem definidos.

Para uma primeira demonstração, usar o SSC autorizado na estação deixa a massa incremental de computação praticamente nula. Se a equipe precisar de compute independente, o Orin NX de 16 GB como módulo integrado é uma alternativa de engenharia, com alvo de 0,5 a 1 kg e 15 a 25 W em perfil restrito. Para o pitch, não incluir GPU dedicada como requisito funcional. Ela compra capacidade para visão e linguagem generativa, enquanto aquisição EEG/EOG, análise de bandas, estágio de sono e detecção simples de anomalias cabem em CPU.

## Resumo executivo

1. A estimativa de massa do Orbit é 54 g no conceito mínimo e 72 g no protótipo realista, ambas sem lentes e sem pesagem de componentes montados.
2. Uma bateria de 500 mAh pesa cerca de 8 g, tem 1,85 Wh nominais e atende apenas com margem limitada o orçamento-base estimado de 0,865 Wh úteis por ciclo de dia e noite.
3. Quatro canais a 250 Hz, 24 bits, durante nove horas geram 97,2 MB brutos; projetar 128 a 256 MB ou mais.
4. O ADS1299-4 consome 22 mW típicos e dá quatro canais, 24 bits, suficientes para uma proposta mínima de EEG/EOG.
5. Comparações posteriores reportam DeepSleepNet original com 21M a 24,7M de parâmetros, ou 84 a 98,8 MB em float32; TinySleepNet tem 1,3M e DeepSleepNet-Lite 0,6M. YASA reporta menos de 5 s para processar uma noite inteira de PSG a 100 Hz num laptop básico. Os números 0,78M e 30,6M FLOPs vêm de uma tabela comparativa que não explica a divergência e não servem para dimensionar o modelo original.
6. Orin Nano Super tem 67 TOPS INT8 esparsos, pesa 175 g como kit de desenvolvimento e opera em modos de 7 a 25 W; seu preço NVIDIA consultado era US$ 399 sem estoque em 15/11/2026, depois de anúncio de US$ 249 em 17/12/2024.
7. O NASA OIG registrou US$ 63.200/kg como média CRS-1 e projetou US$ 71.800/kg para CRS-2; a alocação histórica de um wearable de 54 a 72 g fica em aproximadamente US$ 3.413 a US$ 5.170.
8. Falcon 9 estava listado por US$ 74 milhões até 2026 e com capacidade máxima de 22.000 kg em LEO, uma divisão simples de US$ 3.364/kg que não equivale a preço de entrega à ISS.
9. Um exemplo NASA de arquitetura unidirecional a Marte requer 7,4 kg de massa de referência em LEO e 148 kg na Terra para cada quilograma de carga útil na superfície, com alta dependência da arquitetura.
10. A equação idealizada de subida, usando Isp de 348 s e delta-v de 9,4 km/s, resulta em 14,71 kg de propelente adicional por quilograma extra de massa final; isso explica sensibilidade, não abastecimento real de uma missão pequena.

## Lacunas e dúvidas abertas

- Massa de lente e óptica, massa final da placa, eletrodos, fiação, carcaça e transdutores precisam ser pesadas no protótipo. Os totais de 54 g e 72 g são limites inferiores sem lentes.
- A ficha do transdutor ISL tem conflito interno entre corrente máxima de 5 mA e potência nominal de 3 W. Não fechar áudio ou bateria sem medição em carga, vibração e nível acústico.
- Não há seleção de eletrodos secos nem evidência de qualidade de sinal EEG em têmpora, testa, nariz ou mastoide com os movimentos de tripulantes. O estágio de sono requer validação clínica local.
- Modelo e política de uso de Wi-Fi/Bluetooth a bordo, aprovação EMI/EMC e conectores de energia devem ser confirmados com o integrador ISS.
- A página pública de SSC disponível lista HP ZBook 15 Gen 2, mas não prova o modelo e a configuração atual. Confirmar memória, CPU, permissões e sistema operacional com o dono do processo.
- 28 V DC foi solicitada como referência, mas não foi identificada tomada pública de serviço da tripulação com essa tensão. Está confirmada a saída de utilidade de 120 V DC, cuja utilização também requer fonte e interface aprovadas.
- As avaliações de baterias JSC-20793, materiais NASA-STD-6001, EMI/EMC, temperatura de toque e retenção não foram realizadas para o Orbit.
- O preço CRS por kg vem de contratos OIG de 2018 e projeções de 2016; falta cotação atual de carga útil pequena, custos de integração, manuseio, embalagem e retorno.
- O preço Falcon 9 de US$ 74 milhões e as capacidades publicadas são valores de lista para o veículo; não formam preço de transporte à estação nem de entrega na superfície marciana.
- Não foi encontrada tarifa de pouso em Marte. As razões 7,4 e 148 são fatores de uma arquitetura NASA apresentada em 2022, não uma massa ou preço fixo para missão tripulada.
- O Isp de 348 s do Merlin Vacuum não aparece no guia SpaceX atual consultado; o valor é tratado como secundário. O RL10 tem ficha atual de fabricante. A faixa Raptor segue sem ficha oficial pública completa por variante.
- O modo offline elimina dependência da rede para inferência, mas ainda falta definir sincronização segura quando o laptop aprovado estiver acessível, retenção, cópia de segurança e governança médica dos dados.

## Fontes

### Óculos, sensores, bateria e áudio

- [JINS MEME, comunicado oficial de 2021](https://www.jins.com/jp/client_info/JINSJINS/infoimage/20211006_Press%20Release1.pdf)
- [JINS MEME, informação sobre EOG e sensores](https://faq-jp.jins.com/jp/faq/glasses/faq_detail.html?category=3043&id=1639&page=1)
- [Shokz OpenRun, página do produto](https://shokz.com/products/openrun)
- [Shokz OpenRun, ficha de suporte](https://help.shokz.com/s/product-detail?Id=a174x000006OuLYAA0)
- [ISL Products, datasheet SPK-I-81368](https://media.digikey.com/pdf/Data%20Sheets/ISL%20PDFs/SPK-I-81368.pdf)
- [Texas Instruments, ADS1299](https://www.ti.com/product/ADS1299)
- [Texas Instruments, datasheet ADS1299](https://www.ti.com/lit/ds/symlink/ads1299.pdf)
- [Texas Instruments, ADS1292](https://www.ti.com/product/ADS1292)
- [Texas Instruments, datasheet ADS1292](https://www.ti.com/lit/ds/symlink/ads1292.pdf)
- [Nordic Semiconductor, nRF52840](https://www.nordicsemi.com/products/nrf52840)
- [Nordic Semiconductor, especificação nRF52840](https://docs.nordicsemi.com/r/bundle/ps_nrf52840/page/keyfeatures_html5.html)
- [STMicroelectronics, datasheet LSM6DSOX](https://www.st.com/resource/en/datasheet/lsm6dsox.pdf)
- [ams OSRAM, sensor ambiente TSL2591](https://ams-osram.com/products/sensor-solutions/ambient-light-color-spectral-proximity-sensors/ams-tsl25911-ambient-light-sensor)
- [TinyCircuits, bateria Li-polymer de 500 mAh](https://files.tinycircuits.com/Datasheets/ASR00035_500mAh.pdf)
- [FPBattery, especificação de bateria 500 mAh](https://www.fpbattery.com/wp-content/uploads/2024/06/fpbattery-293450-3.7V-500mAh-Lithium-Polymer-Battery-Specification.pdf)
- [Texas Instruments, TPA2012D2](https://www.ti.com/product/TPA2012D2)
- [Texas Instruments, datasheet TPA2012D2](https://www.ti.com/lit/ds/symlink/tpa2012d2.pdf)

### Conforto e requisitos espaciais

- [PAPER, massa e áreas de contato em armações](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1475-1313.2010.00755.x)
- [PAPER, conforto e massa em HMDs](https://pubmed.ncbi.nlm.nih.gov/37718832/)
- [NASA Glenn, massa e peso em microgravidade](https://www.nasa.gov/centers-and-facilities/glenn/what-is-microgravity/)
- [NASA, JSC-20793 Rev. D](https://standards.nasa.gov/standard/JSC/JSC-20793_D)
- [NASA, PDF JSC-20793 Rev. D](https://standards.nasa.gov/sites/default/files/standards/JSC/D/0/jsc-20793_revd.pdf)
- [NASA, NASA-STD-6001 B com Change 3](https://standards.nasa.gov/standard/nasa/nasa-std-6001)
- [NASA, PDF NASA-STD-6001 B com Change 3](https://standards.nasa.gov/sites/default/files/standards/NASA/B-w/CHANGE-3/3/2025_06_25_NASA-STD-6001B_w_Change_3_FINAL_Admin-Change-FINAL.pdf)
- [NASA, requisitos EMC para cargas ISS, GSFC-STD-7000B](https://standards.nasa.gov/sites/default/files/standards/GSFC/B/0/gsfc-std-7000b_signature_cycle_04_28_2021_fixed_links.pdf)
- [NASA, exemplo de Wi-Fi na ISS](https://www.nasa.gov/blogs/stationreport/2024/07/26/iss-daily-summary-report-7-26-2024/)
- [NASA Glenn, laboratório EMI/EMC](https://www.nasa.gov/centers-and-facilities/glenn/electromagnetic-interference-laboratory/)
- [NASA-STD-3001 Vol. 2 Rev. F](https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf)
- [NASA OCHMO, brief de temperatura de toque](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-009-touch-temperature.pdf)

### Computação, ISS e energia

- [NASA JSC, plataformas de software SSC](https://tsc.jsc.nasa.gov/roi-swprocess/sw_platforms.html)
- [NASA NTRS, laptops e interfaces da ISS](https://ntrs.nasa.gov/api/citations/20205011808/downloads/IntroductionISSCrewDisplays.pdf)
- [NASA/JPL, configuração Spaceborne Computer-2 e SoC COTS](https://ai.jpl.nasa.gov/public/documents/presentations/FSW-2022-Snapdragon-Presentation.pdf)
- [NASA NTRS, processamento BioMole a bordo](https://ntrs.nasa.gov/citations/20220013040)
- [NASA, Spaceborne Computer-2 em 2025](https://www.nasa.gov/blogs/spacestation/2025/06/05/science-software-hardware/)
- [NASA, computador Spaceborne e tolerância operacional](https://www.nasa.gov/missions/station/iss-research/new-research-launching-to-space-station-aboard-northrop-grummans-15th-resupply-mission/)
- [NASA, teste de recuperação de erro SBC-2](https://www.nasa.gov/blogs/stationreport/2022/07/25/iss-daily-summary-report-7-25-2022/)
- [NASA, demonstração CIMON](https://www.nasa.gov/blogs/spacestation/2018/11/15/us-cargo-mission-slips-a-day-station-tests-free-flying-ai-assistant/)
- [NASA Software Catalog, Astrobee](https://software.nasa.gov/software/ARC-17994-1)
- [HPE, especificação Edgeline EL4000](https://support.hpe.com/hpesc/public/docDisplay?docId=c05352431&docLocale=en_US&page=GUID-B9F31957-D823-420A-AEA7-FD09620FF0BA.html)
- [HPE, QuickSpecs Edgeline EL4000](https://www.hpe.com/psnow/downloadDoc/HPE%20Edgeline%20EL4000%20Converged%20IoT%20System-c05211375.pdf)
- [PAPER, DeepSleepNet original](https://arxiv.org/abs/1703.04046)
- [PAPER, TinySleepNet, IEEE EMBC 2020](https://ieeexplore.ieee.org/document/9176741/)
- [Código original dos autores, TinySleepNet](https://github.com/akaraspt/tinysleepnet)
- [PAPER, DeepSleepNet-Lite e contagens comparativas](https://arxiv.org/abs/2108.10600)
- [PAPER, SalientSleepNet e DeepSleepNet com 21M de parâmetros](https://ijcai.org/proceedings/2021/0360.pdf)
- [PAPER, SleepMFormer, tabela de parâmetros e FLOPs](https://www.mdpi.com/2076-3425/16/1/95)
- [PAPER, YASA, Vallat e Walker, eLife 2021](https://elifesciences.org/articles/70092)
- [Código e materiais de reprodução de YASA](https://github.com/raphaelvallat/yasa_classifier)
- [PAPER, U-Sleep](https://www.nature.com/articles/s41746-021-00440-5)
- [PAPER, AnySleep, comparação de parâmetros com U-Sleep](https://www.nature.com/articles/s41746-026-03406-7)
- [PAPER, YASA](https://elifesciences.org/articles/70092.pdf)
- [YASA, documentação SleepStaging](https://yasa-sleep.org/generated/yasa.SleepStaging.html)
- [Torchvision, ficha do modelo ResNet-18](https://docs.pytorch.org/vision/2.0/models/generated/torchvision.models.resnet18.html)
- [PAPER, MobileNetV2, CVPR 2018](https://openaccess.thecvf.com/content_cvpr_2018/papers/Sandler_MobileNetV2_Inverted_Residuals_CVPR_2018_paper.pdf)
- [NVIDIA, benchmark de linguagem local em Jetson](https://developer.nvidia.com/blog/?p=95089)
- [NVIDIA, Orin Nano Super](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/)
- [NVIDIA, preço listado do Orin Nano Super](https://marketplace.nvidia.com/en-us/enterprise/robotics-edge/jetson-orin-nano-super-developer-kit/)
- [NVIDIA, desenho mecânico do kit](https://developer.nvidia.com/downloads/assets/embedded/secure/jetson/orin_nano/docs/jetson_orin_nano_devkit_carrier_board_specification_sp.pdf)
- [NVIDIA, datasheet Orin NX](https://developer.nvidia.com/downloads/jetson-orin-nx-module-series-data-sheet)
- [Raspberry Pi 5, resumo do produto](https://pip-assets.raspberrypi.com/categories/892-raspberry-pi-5/documents/RP-008348-DS-10-raspberry-pi-5-product-brief.pdf)
- [Raspberry Pi, consumo elétrico](https://www.raspberrypi.com/documentation/hardware/raspberrypi/power.html)
- [NASA, painel de utilidade 120 V DC da ISS](https://www.nasa.gov/blogs/stationreport/2021/05/07/iss-daily-summary-report-5-07-2021/)
- [NASA, Fission Surface Power](https://www.nasa.gov/exploration-systems-development-mission-directorate/fission-surface-power/)
- [NASA NTRS, requisito elétrico de referência para quatro tripulantes](https://ntrs.nasa.gov/citations/20170006519)

### Transporte e foguetes

- [NASA OIG, auditoria CRS-1 e CRS-2](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-18-016.pdf)
- [NASA OIG, comparação de Dragon e Cygnus](https://oig.nasa.gov/wp-content/uploads/2024/02/IG-14-031.pdf)
- [SpaceX, guia de capacidades e serviços](https://www.spacex.com/assets/media/Capabilities%26Services.pdf)
- [SpaceX, página Falcon Heavy](https://new.spacex.com/vehicles/falcon-heavy)
- [SpaceX, preços de rideshare](https://new.spacex.com/rideshare)
- [SpaceX, referência histórica de preço Falcon Heavy em 2022, fonte secundária](https://www.space.com/spacex-raises-prices-launch-starlink-inflation)
- [SpaceX, Falcon Payload User's Guide 2025](https://www.spacex.com/assets/media/falcon-users-guide-2025-05-09.pdf)
- [NASA Space Launch Report, ficha histórica Falcon 9](https://sma.nasa.gov/LaunchVehicle/assets/spacex-falcon-9-data-sheet.pdf)
- [NASA Glenn, equação ideal do foguete](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/ideal-rocket-equation/)
- [NASA Glenn, voo até a órbita](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/flight-to-orbit/)
- [NASA NTRS, estimativa de delta-v ideal para LEO](https://ntrs.nasa.gov/api/citations/20080013338/downloads/20080013338.pdf?attachment=true)
- [NASA Trajectory Browser, guia de cálculo para injeção](https://trajbrowser.arc.nasa.gov/user_guide.php)
- [L3Harris, datasheet RL10](https://www.l3harris.com/sites/default/files/2024-07/l3harris-ar-rl10-spec-sheet.pdf)
- [SpaceX, Starship e motores Raptor](https://new.spacex.com/vehicles/starship)
- [NASA, exemplo de gear ratio em apresentação de 2022](https://ntrs.nasa.gov/api/citations/20220002258/downloads/Trademark%20FAU%20for%20export%20-2.15.2022%20BE%20No%20One%20Has%20Gone%202.0.pdf)
- [NASA NTRS, massas para um kg de propelente em Marte](https://ntrs.nasa.gov/api/citations/20160005017/downloads/20160005017.pdf?attachment=true)
- [NASA, análise de gear ratio de missão humana de ida e volta](https://ntrs.nasa.gov/api/citations/20230016121/downloads/Round-Trip%20Mars%20Mission%20Mass%20Challenges.pdf)




