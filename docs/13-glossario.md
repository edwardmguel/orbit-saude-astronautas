# 13. Glossário

> Para quem: toda a equipe, inclusive a IA de desenvolvimento.
> Pergunta que responde: o que significa cada sigla ou termo técnico usado nos documentos e na pesquisa?
> Como usar: procure o termo na tabela, em ordem alfabética. A coluna "Onde aparece" leva ao documento em que o termo é mais usado ou explicado.

## Como a lista foi feita

- Varredura de todos os documentos de `docs/` (00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 14, 16) e das pesquisas de `pesquisa/bruto/` (frentes 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 13, 14, 15, 16, 17, 18, 19; não existe frente 12), feita em 15/11/2026. Foram extraídas todas as palavras com duas ou mais maiúsculas ou com maiúscula e número, depois filtradas à mão para tirar ids de código, nomes de componentes, etiquetas de evidência e palavras comuns em caixa alta.
- **Expansão** só aparece quando está escrita em algum dos documentos. Quando o documento traz apenas a tradução, a coluna diz "em português: ...". Quando nenhum documento expande o termo, a coluna diz "expansão não registrada nos documentos". Nomes próprios, unidades e palavras que não são siglas levam "não é sigla".
- **O que é** resume, em uma frase, o que os próprios documentos dizem do termo. Não é definição oficial.
- **Onde aparece**: número do documento em `docs/` ou da frente em `pesquisa/bruto/`. Vale o documento de `docs/` com mais ocorrências do termo; quando ele aparece uma vez só em `docs/`, vale a frente de pesquisa com mais ocorrências. Em termos com dois sentidos e em siglas centrais, foi fixado o documento que explica o termo.
- Termos com dois sentidos (AR, HERA, REM, T2) têm uma linha para cada sentido.
- As etiquetas de evidência ([OFICIAL], [PAPER], [FABRICANTE], [DIRETRIZ-TERRA], [TESTADO], [SECUNDÁRIA], [INFERÊNCIA]) estão explicadas em [`00-guia-de-leitura.md`](00-guia-de-leitura.md) e não se repetem aqui.
- Siglas pedidas que não aparecem em nenhum documento (por exemplo AOS e LOS) ficaram de fora.

Total: **470 termos**, dos quais 137 sem expansão registrada e 61 que não são siglas.

## Tabela

| Sigla ou termo | Expansão em inglês (quando houver) | O que é | Onde aparece |
| --- | --- | --- | --- |
| **4B CO2** | Four Bed CO2 Scrubber | Removedor de CO2 do segmento americano com leitos de zeólita; aparece como remoção primária de CO2 em 2026. | [02](02-equipamentos-e-dados.md) |
| **4BMS** | expansão não registrada nos documentos | Outro nome usado para o Four Bed CO2 Scrubber (4B CO2). | [02](02-equipamentos-e-dados.md) |
| **AAO** | American Academy of Ophthalmology | Academia americana de oftalmologia, citada para acuidade visual, grade de Amsler e pressão ocular. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **AASM** | expansão não registrada nos documentos | Fonte dos critérios de filtragem de EEG e EOG citados como diretriz terrestre. | [frente 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **ACI** | As Clinically Indicated | Marca, no calendário médico, um exame feito quando clinicamente indicado. | [02](02-equipamentos-e-dados.md) |
| **ACS** | Atmosphere Control and Supply | Subsistema do ECLSS que controla a pressão da cabine e adiciona O2 e N2. | [02](02-equipamentos-e-dados.md) |
| **actigrafia** | não é sigla | Registro por relógio de pulso que estima o sono pelo movimento (e, em alguns modelos, pela luz). | [01](01-contexto-missao.md) |
| **Actiwatch** | não é sigla | Relógio actígrafo usado em voo para estimar sono por movimento e luz. | [02](02-equipamentos-e-dados.md) |
| **ADA** | American Diabetes Association | Associação americana de diabetes, fonte das faixas terrestres de glicose usadas como referência. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **ADS1299** | não é sigla | Circuito da Texas Instruments que digitaliza EEG e EOG com 24 bits; a versão de 4 canais é o AFE previsto no óculos. | [09](09-oculos-orbit.md) |
| **AEB** | expansão não registrada nos documentos | Órgão brasileiro que registra um ajuste de 1997 com os EUA para equipamentos e cargas úteis da ISS, hoje suspenso. | [16](16-proximos-passos-e-impacto.md) |
| **AED** | Automated External Defibrillator | Desfibrilador externo automático dos kits de resposta médica da ISS. | [02](02-equipamentos-e-dados.md) |
| **AFE** | analog front end (em português: front-end analógico) | Circuito que capta e digitaliza os sinais de EEG e EOG do óculos. | [09](09-oculos-orbit.md) |
| **Ag/AgCl** | expansão não registrada nos documentos | Eletrodo com gel, referência clínica para EEG; o uso prolongado na armação exige teste de conforto e secagem. | [frente 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **AIAA** | expansão não registrada nos documentos | Aparece no código do artigo AIAA 2023-4656, sobre óculos sem fio com EEG e EOG em voo parabólico. | [11](11-precedentes.md) |
| **ALARA** | expansão não registrada nos documentos | Critério do plano de exposição à radiação ao qual a dose por órgão deve ser integrada. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **ALSDA** | Ames Life Sciences Data Archive | Arquivo de dados de ciências da vida do centro Ames, hoje integrado ao OSDR. | [12](12-fontes-de-dados-abertas.md) |
| **ALSP** | Advanced Life Support Pack | Kit de suporte avançado de vida da ISS. | [02](02-equipamentos-e-dados.md) |
| **ALTEA** | expansão não registrada nos documentos | Detector de radiação no módulo Columbus ao qual o LIDAL acrescenta a medida de íons leves. | [02](02-equipamentos-e-dados.md) |
| **AMO** | Autonomous Medical Operations | Projeto da NASA para apoiar o CMO em operações médicas com mais autonomia. | [frente 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **AMOS** | Autonomous Medical Officer Support | Projeto de apoio a procedimentos médicos a bordo, usado em demonstrações de IA médica em missão simulada. | [11](11-precedentes.md) |
| **AMP** | Ambulatory Medical Pack; também Assisted Medical Procedures | Nos kits da ISS, pacote médico ambulatorial; em outro contexto, projeto da NASA de procedimentos médicos assistidos. | [02](02-equipamentos-e-dados.md) |
| **Amsler (grade de)** | não é sigla | Teste em que se olha uma grade e se marcam linhas onduladas, borradas ou ausentes; faz parte do protocolo de SANS. | [03](03-indicadores-e-limiares.md) |
| **ANAM** | Automated Neuropsychological Assessment Metrics | Triagem neurocognitiva breve de cinco tarefas que mede velocidade e exatidão. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **ANITA** | expansão não registrada nos documentos | Espectrômetro FTIR da ESA que analisa 32 contaminantes do ar; o ANITA-2 é a versão compacta lançada em 2021. | [02](02-equipamentos-e-dados.md) |
| **ANPD** | expansão não registrada nos documentos | Órgão brasileiro citado sobre as hipóteses legais para tratar dados de saúde pela LGPD. | [16](16-proximos-passos-e-impacto.md) |
| **AO** | expansão não registrada nos documentos | Chamada de pesquisa, como as da CSA para ciências da vida na ISS (2024 e 2026) e a da ESA para Concordia (AO-2026). | [16](16-proximos-passos-e-impacto.md) |
| **API** | expansão não registrada nos documentos | Interface de programação pela qual o software consulta dados como DONKI, OSDR e RadLab. | [12](12-fontes-de-dados-abertas.md) |
| **AQM** | Air Quality Monitor | Monitor que mede compostos orgânicos voláteis do ar por GC-DMS. | [02](02-equipamentos-e-dados.md) |
| **AR** | Atmosphere Revitalization | Parte do ECLSS que remove CO2, água e contaminantes do ar; inclui CDRA, TCCS e OGA. | [02](02-equipamentos-e-dados.md) |
| **AR** | em português: realidade aumentada | Tecnologia de óculos e headsets já levada à ISS para procedimentos e manutenção, não para saúde. | [11](11-precedentes.md) |
| **ARCHeR** | Artemis Research for Crew Health and Readiness | Estudo da Artemis II que registrou movimento e sono da tripulação com pulseiras. | [16](16-proximos-passos-e-impacto.md) |
| **ARED** | Advanced Resistive Exercise Device | Aparelho de exercício resistido do segmento americano. | [01](01-contexto-missao.md) |
| **Artemis II** | não é sigla | Missão tripulada de sobrevoo lunar (abril de 2026, cerca de 9 dias) que voou com sensores HERA e pulseiras de sono. | [16](16-proximos-passos-e-impacto.md) |
| **ASCR** | Astronaut Strength, Conditioning and Rehabilitation | Equipe que prescreve e avalia o exercício dos astronautas. | [02](02-equipamentos-e-dados.md) |
| **AsMA** | expansão não registrada nos documentos | Entidade cujo programa de 2026 cita uma demonstração do CMO-DA em computador de borda com MedGemma. | [11](11-precedentes.md) |
| **Astroskin** | não é sigla | Vestimenta de monitoramento da Carré Technologies avaliada pela NASA; não deve ser confundida com o Bio-Monitor. | [14](14-perguntas-respondidas.md) |
| **ATS** | American Thoracic Society | Sociedade americana citada como fonte da escala SSS e do GAD-7. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **AttentivU** | não é sigla | Óculos de pesquisa com EEG nas hastes, voltado a atenção e engajamento, não a sono. | [09](09-oculos-orbit.md) |
| **ATU** | Audio Terminal Units | Terminais de áudio da ISS com microfone, alto-falante, teclado e circuitos de conferência. | [frente 04](../pesquisa/bruto/04-precedentes-oculos-sono.md) |
| **AUA** | American Urological Association | Associação americana de urologia, fonte de diretrizes terrestres sobre cálculo renal e volume urinário. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **AUC** | expansão não registrada nos documentos | Medida de desempenho de classificadores (AUC ROC) citada em estudos de detecção de anomalias. | [frente 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **AWS** | Amazon Web Services | Nuvem onde há cópia dos dados abertos do OSDR. | [12](12-fontes-de-dados-abertas.md) |
| **Ax-1, Ax-4** | expansão não registrada nos documentos | Missões privadas da Axiom Space à ISS; a Ax-1 demonstrou análise de urina e a Ax-4 é citada como rota comercial de pesquisa. | [16](16-proximos-passos-e-impacto.md) |
| **B2B** | Business-to-Business | Rota comercial do ISS National Lab em que o cliente paga seus custos e os do provedor. | [frente 17](../pesquisa/bruto/17-caminho-ate-voar.md) |
| **BAA** | expansão não registrada nos documentos | Edital da NASA em cujos anexos são divulgados os tópicos de SBIR e STTR. | [frente 17](../pesquisa/bruto/17-caminho-ate-voar.md) |
| **BD-2** | expansão não registrada nos documentos | Esteira do segmento russo. | [02](02-equipamentos-e-dados.md) |
| **BEAM** | expansão não registrada nos documentos | Módulo da ISS onde seis monitores de radiação RAM ficaram até dezembro de 2017. | [02](02-equipamentos-e-dados.md) |
| **BHP** | Behavioral Health and Performance | Profissional de saúde comportamental em terra que conduz a PPC. | [01](01-contexto-missao.md) |
| **BiLSTM** | em português: rede recorrente LSTM bidirecional | Tipo de rede neural usada no DeepSleepNet junto com redes convolucionais. | [frente 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **Bio-Monitor** | não é sigla | Vestimenta da CSA (camiseta e faixa de cabeça instrumentadas) que grava sinais por até 48 h. | [02](02-equipamentos-e-dados.md) |
| **BLE** | Bluetooth Low Energy | Rádio de baixo consumo do microcontrolador do óculos e de vestíveis. | [09](09-oculos-orbit.md) |
| **BMD** | expansão não registrada nos documentos | Indicador ósseo que diminui sem a carga mecânica normal, o que eleva o cálcio na urina. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **BME** | Biomedical Engineer | Controlador do Controle de Missão que dá suporte técnico e operacional ao CHeCS. | [01](01-contexto-missao.md) |
| **BMMD** | expansão não registrada nos documentos | Nome às vezes usado para o medidor de massa russo (MMD); a NASA não confirma que seja o nome vigente. | [02](02-equipamentos-e-dados.md) |
| **BPA** | Brine Processor Assembly | Retira água da salmoura da urina; com ele a ISS demonstrou recuperar 98% da água. | [02](02-equipamentos-e-dados.md) |
| **bpm** | expansão não registrada nos documentos | Batimentos por minuto, unidade da frequência cardíaca. | [02](02-equipamentos-e-dados.md) |
| **BSAP** | em português: fosfatase alcalina óssea | Marcador laboratorial de formação óssea. | [frente 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **BSFS** | Bristol Stool Form Scale | Escala que classifica as fezes em sete tipos. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **C&W** | Caution and Warning | Sistema de alarmes da ISS, dono do vermelho, do piscar e do som; o Orbit Saúde não o imita. | [07](07-design-interface.md) |
| **C1 a C5** | expansão não registrada nos documentos | Cenários roteirizados da demonstração; cada um deve disparar o alerta descrito (C1 é CO2 alto com dor de cabeça e reação lenta). | [05](05-arquitetura-software.md) |
| **CAD** | Crew Active Dosimeter | Dosímetro vestível pessoal que mede radiação continuamente. | [02](02-equipamentos-e-dados.md) |
| **CADMOS** | expansão não registrada nos documentos | Parceiro do CNES na coordenação do estudo de sono Dreams com a faixa Dreem na ISS. | [frente 04](../pesquisa/bruto/04-precedentes-oculos-sono.md) |
| **CASAI** | expansão não registrada nos documentos | Unidade da atenção à saúde indígena onde foi implantada telessaúde, segundo relatório da CGU. | [16](16-proximos-passos-e-impacto.md) |
| **CASIS** | expansão não registrada nos documentos | Entidade ligada ao ISS National Lab, que publica chamadas competitivas de pesquisa. | [frente 17](../pesquisa/bruto/17-caminho-ate-voar.md) |
| **CBC** | em português: hemograma completo | Exame de sangue presente em atlas de dados de missões, como o SOMA. | [frente 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **CC BY, CC0** | Creative Commons | Licenças abertas: CC BY permite usar e adaptar com crédito; CC0 equivale a domínio público. | [12](12-fontes-de-dados-abertas.md) |
| **CCAA** | Common Cabin Air Assembly | Conjunto que circula o ar da cabine, retira calor e condensa umidade. | [02](02-equipamentos-e-dados.md) |
| **CCMC** | Community Coordinated Modeling Center | Centro da NASA responsável pela base DONKI de clima espacial. | [12](12-fontes-de-dados-abertas.md) |
| **CDB** | Coliform Detection Bag | Bolsa do kit de microbiologia que testa coliformes na água. | [02](02-equipamentos-e-dados.md) |
| **CDC** | expansão não registrada nos documentos | Órgão de saúde cuja documentação técnica é citada para detecção de tendência; aparece junto com o NIOSH. | [frente 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **CDRA** | Carbon Dioxide Removal Assembly | Equipamento que retira o CO2 do ar com leitos de zeólita. | [02](02-equipamentos-e-dados.md) |
| **CDS** | Clinical Decision Support | Apoio à decisão clínica, tema dos casos de uso da ExMC. | [frente 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **CDSS** | Clinical Decision Support System | Sistema de apoio à decisão clínica que a NASA estuda para missões com autonomia médica crescente. | [01](01-contexto-missao.md) |
| **CÉAMS** | expansão não registrada nos documentos | Instituição de Montreal que mantém a base de sono MASS. | [frente 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **CEVIS** | Cycle Ergometer with Vibration Isolation and Stabilization | Bicicleta ergométrica do segmento americano. | [01](01-contexto-missao.md) |
| **CFU** | colony forming units | Unidade de contagem de microrganismos em cultura, por mL ou por 100 mL de água. | [02](02-equipamentos-e-dados.md) |
| **CGU** | expansão não registrada nos documentos | Órgão cujo relatório de monitoramento informa a telessaúde implantada na saúde indígena. | [16](16-proximos-passos-e-impacto.md) |
| **CHAPEA** | Crew Health and Performance Exploration Analog | Análogo terrestre de missão de exploração, citado como lugar para testar o óculos. | [16](16-proximos-passos-e-impacto.md) |
| **CHeCS** | Crew Health Care System | Conjunto de hardware, suprimentos e software de saúde da ISS, dividido em HMS, EHS e CMS. | [01](01-contexto-missao.md) |
| **CHIPS** | Charcoal HEPA Integrated Particle Scrubbers | Filtros de carvão e HEPA do controle de temperatura e umidade. | [02](02-equipamentos-e-dados.md) |
| **CHP-IDA** | Crew Health and Performance Integrated Data Architecture | Arquitetura do HRP para integrar dados de saúde e desempenho em voo e em solo. | [11](11-precedentes.md) |
| **CHU** | em português: Hospital Universitário (de Toulouse) | Hospital parceiro do estudo de sono Dreams na ISS. | [09](09-oculos-orbit.md) |
| **CIMON** | Crew Interactive MObile companioN | Assistente de voz da Airbus para o DLR, testado na ISS sem função médica; ilustra o risco de depender da nuvem. | [11](11-precedentes.md) |
| **CME** | coronal mass ejections | Ejeções de massa coronal, um dos tipos de evento de clima espacial da DONKI. | [12](12-fontes-de-dados-abertas.md) |
| **CMO** | Crew Medical Officer | Tripulante designado como cuidador médico a bordo; não precisa ser médico. | [01](01-contexto-missao.md) |
| **CMO-DA** | Crew Medical Officer Digital Assistant | Protótipo de IA do Google com a NASA para apoiar o CMO na decisão clínica. | [11](11-precedentes.md) |
| **CMP** | em português: painel metabólico sérico | Exame de sangue do conjunto Inspiration4 no OSDR. | [12](12-fontes-de-dados-abertas.md) |
| **CMRS** | Crew Medical Restraint System | Item dos kits de resposta médica de emergência da ISS, listado com ALSP, AMP, RSP e AED. | [02](02-equipamentos-e-dados.md) |
| **CMS** | Countermeasures System | Parte do CHeCS para exercício: avaliar condicionamento, prescrever e monitorar. | [01](01-contexto-missao.md) |
| **CMV** | cytomegalovirus | Citomegalovírus, um dos vírus latentes que podem voltar a ser detectados na saliva durante o voo. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **CNES** | expansão não registrada nos documentos | Instituição que, com o CADMOS, coordenou o estudo Dreams de sono na ISS (missão Alpha, 2021). | [11](11-precedentes.md) |
| **CNN** | em português: redes convolucionais | Tipo de rede neural usada em modelos de estadiamento do sono. | [10](10-massa-energia-lancamento.md) |
| **CNPq** | expansão não registrada nos documentos | Órgão brasileiro de fomento cujo PROANTAR pode financiar pesquisa antártica. | [16](16-proximos-passos-e-impacto.md) |
| **CNT** | em português: contagens | Unidade bruta em que algumas temperaturas da telemetria pública aparecem, em vez de °C. | [12](12-fontes-de-dados-abertas.md) |
| **CO** | expansão não registrada nos documentos | Gás de combustão medido em ppm pelo CSA-CP depois de suspeita de fogo. | [02](02-equipamentos-e-dados.md) |
| **CO2** | em português: dióxido de carbono | Gás exalado pela tripulação que se acumula na cabine; ligado a dor de cabeça e base do cenário C1. | [02](02-equipamentos-e-dados.md) |
| **COLBERT** | expansão não registrada nos documentos | Outro nome da esteira T2 do segmento americano. | [frente 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **Columbus** | não é sigla | Módulo laboratório da ESA na ISS. | [02](02-equipamentos-e-dados.md) |
| **Concordia** | não é sigla | Estação antártica usada como análogo de isolamento, confinamento, luz sazonal e sono. | [16](16-proximos-passos-e-impacto.md) |
| **condução óssea** | não é sigla | Forma de tocar áudio usada pelo óculos Orbit; a NASA a estudou como alternativa para o áudio no capacete do traje xEMU. | [09](09-oculos-orbit.md) |
| **COTS** | em português: computação comercial de prateleira | Equipamento comercial comum, como os servidores do Spaceborne Computer-2, testado contra erros de radiação. | [frente 05](../pesquisa/bruto/05-massa-computacao-lancamento.md) |
| **CPD** | Crew Passive Dosimeter; também Charged Particle Detector | Dosímetro passivo pessoal (TLD, OSLD e PNTD) lido em laboratório; no RAD, é o detector de partículas carregadas. | [02](02-equipamentos-e-dados.md) |
| **CPU** | em português: processador central | Processador comum de computador, onde cabem filtros, FFT e estadiamento do sono. | [10](10-massa-energia-lancamento.md) |
| **CR-39** | expansão não registrada nos documentos | Plástico detector de traços de partículas usado no Area PADLES. | [02](02-equipamentos-e-dados.md) |
| **CRS** | Commercial Resupply Services | Contratos de carga da NASA para a ISS (Dragon e Cygnus), base das contas de custo por kg. | [10](10-massa-energia-lancamento.md) |
| **CSA** | Canadian Space Agency | Agência espacial canadense, dona do Bio-Monitor. | [02](02-equipamentos-e-dados.md) |
| **CSA-CP** | Compound Specific Analyzer for Combustion Products | Analisador portátil de CO, HCl, HCN e O2 usado após suspeita de combustão. | [02](02-equipamentos-e-dados.md) |
| **CSD** | Consensus Sleep Diary | Diário de sono de consenso, com núcleo de nove campos. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **CSP** | Commercial Service Provider | Provedor comercial pelo qual se entra na rota B2B do ISS National Lab. | [16](16-proximos-passos-e-impacto.md) |
| **CSV** | expansão não registrada nos documentos | Formato de tabela em texto, usado por exemplo na exportação de dados de estudos. | [02](02-equipamentos-e-dados.md) |
| **CTB** | Cognition Test Battery | Bateria de dez testes cognitivos da University of Pennsylvania usada pelo HRP. | [11](11-precedentes.md) |
| **CTX** | expansão não registrada nos documentos | Marcador de remodelação óssea medido em urina ou sangue. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **Cupola** | não é sigla | Módulo da ISS citado em medições de ruído (49,2 dBA). | [02](02-equipamentos-e-dados.md) |
| **Cygnus** | não é sigla | Veículo de carga que leva suprimentos e equipamentos à ISS (por exemplo o ultrassom U3). | [10](10-massa-energia-lancamento.md) |
| **dB HL** | decibéis Hearing Level | Limiar auditivo por frequência registrado no audiograma. | [frente 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **dBA** | expansão não registrada nos documentos | Nível de ruído com ponderação A, em decibéis; os módulos da ISS registraram de 56 a 69 dBA. | [02](02-equipamentos-e-dados.md) |
| **DCS** | Decompression Sickness | Doença descompressiva: bolhas de gás no corpo após mudança de pressão, sobretudo na EVA. | [01](01-contexto-missao.md) |
| **DeepSleepNet** | não é sigla | Modelo de estadiamento do sono com CNN e BiLSTM, pesado (21 a 24,7 milhões de parâmetros). | [10](10-massa-energia-lancamento.md) |
| **Destiny** | não é sigla | Laboratório americano (US Lab) da ISS, onde ficam equipamentos de revitalização do ar. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **DGCS** | Display and Graphics Commonality Standard | Norma de telas da ISS (SSP 50313) que regula cores de alerta. | [frente 07](../pesquisa/bruto/07-desafio-oficial-padroes-interface.md) |
| **DLR** | expansão não registrada nos documentos | Instituição alemã que encomendou o CIMON e participa de experimentos de radiação (DOSIS-3D, DOSTEL). | [11](11-precedentes.md) |
| **DMS** | em português: espectrometria de mobilidade diferencial | Parte do GC-DMS do AQM que identifica compostos pela mobilidade dos íons. | [02](02-equipamentos-e-dados.md) |
| **Doc-in-a-Box (DIB)** | Doc-in-a-Box | Modelo de linguagem médico de 8 bilhões de parâmetros do projeto LuCCI. | [11](11-precedentes.md) |
| **DOD** | Dreem Open Datasets | Bases abertas de sono da Dreem (DOD-H, pessoas saudáveis, e DOD-O). | [frente 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **DONKI** | Database Of Notifications, Knowledge, Information | Base da NASA (CCMC) de eventos de clima espacial: FLR, SEP, CME e GST. | [12](12-fontes-de-dados-abertas.md) |
| **DORELI** | expansão não registrada nos documentos | Conjunto de dados de radiação no RadLab com resolução de 300 s. | [02](02-equipamentos-e-dados.md) |
| **DOSIS-3D** | expansão não registrada nos documentos | Experimento da ESA e do DLR com dosímetros passivos em 11 pontos do Columbus. | [02](02-equipamentos-e-dados.md) |
| **DOSTEL** | Dose Telescope | Telescópio de silício ativo que mede radiação no Columbus. | [02](02-equipamentos-e-dados.md) |
| **Dragon** | não é sigla | Veículo de carga da SpaceX usado nos contratos CRS. | [10](10-massa-energia-lancamento.md) |
| **Dreem** | não é sigla | Faixa de cabeça com EEG seco usada no estudo Dreams na ISS em 2021. | [11](11-precedentes.md) |
| **DRM** | Design Reference Mission | Missão de referência de projeto para a qual o HSRB aprova a nota de risco. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **DSEI** | expansão não registrada nos documentos | Unidades pelas quais o SUS organiza a atenção à saúde indígena (34 no total). | [16](16-proximos-passos-e-impacto.md) |
| **DTI** | diffusion tensor imaging | Técnica de imagem cerebral usada no estudo Brain-DTI. | [frente 04](../pesquisa/bruto/04-precedentes-oculos-sono.md) |
| **DXA** | Dual-energy X-ray absorptiometry | Exame de densidade mineral óssea feito na Terra, antes e depois do voo. | [02](02-equipamentos-e-dados.md) |
| **EACF** | Estação Antártica Comandante Ferraz | Estação antártica brasileira que mantém médico e enfermeiro durante o ano. | [16](16-proximos-passos-e-impacto.md) |
| **EarQ** | expansão não registrada nos documentos | Sistema de audiometria usado na ISS de 2000 a 2021, antes do KUDUwave. | [14](14-perguntas-respondidas.md) |
| **EAU** | European Association of Urology | Associação europeia de urologia, fonte de critérios terrestres para urina e cálculo renal. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **EBV** | Epstein-Barr virus | Vírus latente que pode voltar a ser detectado na saliva durante o voo. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **ECG** | em português: eletrocardiograma | Registro da atividade elétrica do coração. | [12](12-fontes-de-dados-abertas.md) |
| **ECLSS** | Environmental Control and Life Support System | Sistema de controle ambiental e suporte à vida da ISS: atmosfera, água, temperatura, umidade e resposta a incêndio. | [02](02-equipamentos-e-dados.md) |
| **EDA** | Environmental Data Application | Conjunto histórico de dados ambientais da ISS (temperatura, CO2, UR e dose por missão). | [12](12-fontes-de-dados-abertas.md) |
| **EDF** | expansão não registrada nos documentos | Formato de arquivo de biossinais (EDF, EDF+ e EDF++) usado em bases de sono como a Sleep-EDF. | [12](12-fontes-de-dados-abertas.md) |
| **EEG** | em português: eletroencefalografia (eletroencefalograma) | Registro da atividade elétrica do cérebro; no óculos, usado para sono e fadiga. | [09](09-oculos-orbit.md) |
| **EHR** | Electronic Health Record | Prontuário eletrônico; o da NASA em 2023 era só de solo (ver xEHR). | [12](12-fontes-de-dados-abertas.md) |
| **EHS** | Environmental Health System | Parte do CHeCS para qualidade química e microbiológica do ar, da água e das superfícies. | [01](01-contexto-missao.md) |
| **EIHSO** | Earth Independent Human-Systems Operations | Risco do HRP de operar de forma independente da Terra; não é o mesmo que EIMO. | [01](01-contexto-missao.md) |
| **EIMO** | Earth Independent Medical Operations | Operações médicas independentes da Terra, necessárias em missões distantes. | [16](16-proximos-passos-e-impacto.md) |
| **Elektron** | não é sigla | Equipamento do segmento russo que fornece O2 por eletrólise da água, no Zvezda. | [02](02-equipamentos-e-dados.md) |
| **EMG** | em português: eletromiografia | Registro da atividade elétrica dos músculos, usado no estadiamento do sono. | [11](11-precedentes.md) |
| **EMI e EMC** | em português: interferência e compatibilidade eletromagnética | Ensaios exigidos de equipamentos a bordo (SSP 30237 a 30245). | [09](09-oculos-orbit.md) |
| **EMSI** | expansão não registrada nos documentos | Citada com os agentes indígenas como parte da atenção à saúde indígena nos DSEI. | [frente 18](../pesquisa/bruto/18-aplicacoes-terra-impacto.md) |
| **EMU** | expansão não registrada nos documentos | Traje de atividade extraveicular citado para não confundir seus campos com os do traje Orlan. | [frente 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **EOG** | em português: eletrooculografia (eletro-oculograma) | Registro do potencial elétrico dos olhos; no óculos, usado para piscadas, movimentos oculares e fadiga. | [09](09-oculos-orbit.md) |
| **ESA** | expansão não registrada nos documentos | Agência espacial dona do módulo Columbus e de experimentos como ANITA, MyotonPRO e Neurospat. | [11](11-precedentes.md) |
| **ETD** | Eye Tracking Device | Aparelho que mediu os olhos na ISS, citado como precedente do óculos. | [09](09-oculos-orbit.md) |
| **ETHOS** | Environmental and Thermal Operating Systems | Posição do Controle de Missão que acompanha os sistemas ambientais e térmicos. | [12](12-fontes-de-dados-abertas.md) |
| **EVA** | Extravehicular Activity | Atividade extraveicular, a caminhada espacial. | [01](01-contexto-missao.md) |
| **EWMA** | em português: média móvel exponencial | Média que pesa mais as leituras recentes; o motor a usa para suavizar sinais como a ppCO2. | [04](04-cruzamento-de-dados.md) |
| **ExMC** | Exploration Medical Capability | Elemento do HRP que trata do apoio clínico em missões de exploração. | [11](11-precedentes.md) |
| **Falcon 9** | não é sigla | Lançador da SpaceX usado como referência de preço de lançamento por kg. | [10](10-massa-energia-lancamento.md) |
| **FC** | expansão não registrada nos documentos | Abreviação usada nos documentos para frequência cardíaca, medida em bpm. | [02](02-equipamentos-e-dados.md) |
| **FD** | Flight Day | Dia de voo contado desde o lançamento (FD30 é o 30º dia). | [01](01-contexto-missao.md) |
| **FDA** | expansão não registrada nos documentos | Órgão regulador citado sobre oxímetros e software de apoio à decisão clínica. | [16](16-proximos-passos-e-impacto.md) |
| **FDS** | Fire Detection and Suppression | Detecção e supressão de incêndio do ECLSS. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **FFT** | em português: transformada rápida de Fourier | Cálculo que passa o sinal para frequências; custa pouco para EEG e EOG. | [10](10-massa-energia-lancamento.md) |
| **FIT** | Food Intake Tracker | Registro diário de ingestão de alimentos na ISS (ISS FIT). | [01](01-contexto-missao.md) |
| **float32 e int8** | não é sigla | Formatos de número dos parâmetros de um modelo: float32 usa 4 bytes e int8 usa 1 byte. | [10](10-massa-energia-lancamento.md) |
| **FLOPs** | expansão não registrada nos documentos | Contagem de operações de cálculo de um modelo; para vários modelos de sono não foi localizada. | [10](10-massa-energia-lancamento.md) |
| **FLR** | flares | Explosões solares registradas na DONKI. | [12](12-fontes-de-dados-abertas.md) |
| **FND** | Fast Neutron Detector | Detector de nêutrons rápidos do RAD. | [02](02-equipamentos-e-dados.md) |
| **FNJV** | Fonoteca Neotropical Jacques Vielliard | Acervo sonoro da Unicamp com gravações protegidas, que exige solicitação de pesquisador. | [frente 15](../pesquisa/bruto/15-oculos-audio-acervo.md) |
| **Fpz, TP9, TP10** | expansão não registrada nos documentos | Posições de eletrodos de EEG na cabeça, usadas por AttentivU e Dreem e consideradas para a armação. | [09](09-oculos-orbit.md) |
| **FTIR** | em português: espectrômetro de infravermelho por transformada de Fourier | Técnica do ANITA para medir contaminantes do ar. | [02](02-equipamentos-e-dados.md) |
| **GAD-7** | Generalized Anxiety Disorder-7 | Questionário clínico terrestre de sete itens (total de 0 a 21); não entra no check-in sem licença e governança clínica. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **Gateway** | não é sigla | Estação lunar pequena, de ocupação intermitente, operada remotamente quando vazia. | [16](16-proximos-passos-e-impacto.md) |
| **GC-DMS** | em português: cromatografia gasosa com espectrometria de mobilidade diferencial | Técnica do AQM para separar e identificar VOCs. | [02](02-equipamentos-e-dados.md) |
| **GC/MS** | em português: cromatógrafo e espectrômetro de massa | Técnica do SAM, miniaturizada pelo JPL. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **GCR** | Galactic Cosmic Rays | Raios cósmicos galácticos, fundo contínuo de radiação. | [frente 09](../pesquisa/bruto/09-perfis-dados-simulados.md) |
| **GeneLab** | não é sigla | Banco de dados de biologia espacial integrado ao OSDR. | [12](12-fontes-de-dados-abertas.md) |
| **GMT** | Greenwich Mean Time | Horário oficial da ISS, equivalente ao UTC no uso operacional; a barra do app mostra GMT dia-do-ano / hh:mm. | [01](01-contexto-missao.md) |
| **GO/NO-GO** | expansão não registrada nos documentos | Decisão de aptidão para seguir ou não com uma tarefa; o NASA PVT+ avisa que não serve para isso. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **GOES** | expansão não registrada nos documentos | Satélites da NOAA cujo fluxo de prótons (canal de 10 MeV ou mais) define a escala S. | [12](12-fontes-de-dados-abertas.md) |
| **GPU** | em português: placa de processamento gráfico | Processador gráfico; não é requisito do Orbit, só amplia capacidade para visão e linguagem. | [frente 05](../pesquisa/bruto/05-massa-computacao-lancamento.md) |
| **GST** | geomagnetic storms | Tempestades geomagnéticas, tipo de evento da DONKI com série de Kp. | [12](12-fontes-de-dados-abertas.md) |
| **Gy** | gray | Unidade de dose absorvida (com mGy e µGy); sozinha não diz o dano biológico. | [02](02-equipamentos-e-dados.md) |
| **HALO** | expansão não registrada nos documentos | Módulo do Gateway que, com o PPE, receberá os primeiros conjuntos de pesquisa de radiação. | [frente 16](../pesquisa/bruto/16-artemis-marte.md) |
| **HCl e HCN** | expansão não registrada nos documentos | Gases de combustão medidos em ppm pelo CSA-CP. | [02](02-equipamentos-e-dados.md) |
| **HemoCue** | não é sigla | Analisador portátil que lê hemoglobina ou leucócitos com diferencial em microcuvete. | [02](02-equipamentos-e-dados.md) |
| **HEPA** | expansão não registrada nos documentos | Tipo de filtro de partículas presente nos CHIPS. | [02](02-equipamentos-e-dados.md) |
| **HERA** | Human Exploration Research Analog | Análogo terrestre de isolamento da NASA usado em estudos de sono, humor, cognição e desempenho. | [12](12-fontes-de-dados-abertas.md) |
| **HERA** | Hybrid Electronic Radiation Assessor | Sensor Timepix de radiação feito para o C&W da Orion e testado na ISS. | [02](02-equipamentos-e-dados.md) |
| **HERO** | expansão não registrada nos documentos | Chamadas de pesquisa do HRP publicadas no NSPIRES. | [16](16-proximos-passos-e-impacto.md) |
| **HI-SEAS** | expansão não registrada nos documentos | Análogo de isolamento citado na busca por intervenções sonoras. | [frente 04](../pesquisa/bruto/04-precedentes-oculos-sono.md) |
| **HIDH** | Human Integration Design Handbook | Manual da NASA de projeto para integração humana, citado para cores e exercício. | [frente 07](../pesquisa/bruto/07-desafio-oficial-padroes-interface.md) |
| **hipnograma** | não é sigla | Sequência de estágios do sono ao longo da noite (acordado, N1, N2, N3 e REM). | [frente 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **HMS** | Health Maintenance System | Parte do CHeCS para prevenir, avaliar e tratar doença e lesão. | [01](01-contexto-missao.md) |
| **HoloLens** | não é sigla | Headset de realidade mista do Project Sidekick (NASA/JPL e Microsoft) levado à ISS em 2015. | [11](11-precedentes.md) |
| **HREDA** | Human and Robotic Exploration Data Archive | Arquivo de dados da ESA que guarda, por exemplo, dados do Mars-500. | [frente 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **HRMRB** | Human Research Multilateral Review Board | Comitê multilateral que aprova estudos com tripulantes. | [16](16-proximos-passos-e-impacto.md) |
| **HRP** | Human Research Program | Programa de Pesquisa Humana da NASA, que organiza os riscos à saúde nos cinco perigos RIDGE. | [01](01-contexto-missao.md) |
| **HRR** | Human Research Roadmap | Roteiro do HRP com os riscos, as evidências e as notas LxC. | [01](01-contexto-missao.md) |
| **HRV** | em português: variabilidade da frequência cardíaca | Variação do intervalo entre batimentos, em ms (por exemplo, RMSSD). | [04](04-cruzamento-de-dados.md) |
| **HSRB** | Human System Risk Board | Conselho da NASA que aprova as notas LxC dos riscos. | [01](01-contexto-missao.md) |
| **i-STAT** | não é sigla | Analisador portátil de sangue com cartuchos descartáveis. | [02](02-equipamentos-e-dados.md) |
| **IA** | em português: inteligência artificial | Modelos que aprendem com dados, citados para apoio clínico, estadiamento do sono e explicação. | [11](11-precedentes.md) |
| **IBGE** | expansão não registrada nos documentos | Órgão brasileiro citado para biomas e acesso à internet em domicílios e UBS. | [16](16-proximos-passos-e-impacto.md) |
| **IBMP** | expansão não registrada nos documentos | Instituição que conduz os análogos NEK, SIRIUS e Mars-500 com a NASA e a ESA. | [12](12-fontes-de-dados-abertas.md) |
| **ICES** | International Conference on Environmental Systems | Conferência onde a NASA publica relatórios de status do ECLSS e o estudo de áudio do xEMU. | [02](02-equipamentos-e-dados.md) |
| **IEC** | expansão não registrada nos documentos | Prefixo de normas técnicas citadas para simuladores acústicos (IEC 60318). | [frente 15](../pesquisa/bruto/15-oculos-audio-acervo.md) |
| **IMCA** | Intelligent Medical Crew Assistant | Assistente de voz contratado por SBIR da NASA, com procedimentos, AR/VR e ML de risco. | [frente 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **IMM** | Integrated Medical Model | Modelo probabilístico de risco médico e de kit antes do voo, com cerca de 100 condições. | [14](14-perguntas-respondidas.md) |
| **IMPACT** | Informing Mission Planning via Analysis of Complex Tradespaces | Ferramenta sucessora do IMM em desenvolvimento, com o MEDPRAT como motor. | [11](11-precedentes.md) |
| **IMU** | em português: unidade de medida inercial | Sensor de movimento (acelerômetro e giroscópio) do óculos. | [09](09-oculos-orbit.md) |
| **IMV** | Intermodule Ventilation | Ventilação que move o ar entre os módulos. | [02](02-equipamentos-e-dados.md) |
| **IPEV e PNRA** | expansão não registrada nos documentos | Instituições que, com a ESA, abriram em 2026 uma chamada para experimentos biomédicos e psicológicos em Concordia. | [16](16-proximos-passos-e-impacto.md) |
| **IPV** | International Procedure Viewer | Visualizador de procedimentos a bordo no SSC. | [14](14-perguntas-respondidas.md) |
| **IRB** | Institutional Review Board | Comitê de ética institucional que aprova pesquisa com humanos. | [16](16-proximos-passos-e-impacto.md) |
| **ISA** | Investigation, Study, Assay | Hierarquia de metadados do OSDR. | [frente 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **ISO** | expansão não registrada nos documentos | Prefixo de normas técnicas; a ISO 8601 é o formato de data e hora em UTC usado no projeto. | [06](06-modelo-de-dados.md) |
| **Isolation Forest** | não é sigla | Método de detecção de anomalias multivariadas previsto como opção no motor. | [05](05-arquitetura-software.md) |
| **ISS** | International Space Station | Estação Espacial Internacional, em órbita baixa da Terra. | [01](01-contexto-missao.md) |
| **ISS-Mimic** | não é sigla | Projeto comunitário que mapeia a telemetria pública da ISS. | [02](02-equipamentos-e-dados.md) |
| **ISS-RAD (RAD)** | ISS Radiation Assessment Detector | Detector ativo de radiação com CPD e FND, feito pelo SwRI e operado pelo SRAG. | [02](02-equipamentos-e-dados.md) |
| **ISSLIVE** | expansão não registrada nos documentos | Serviço ISS Live da NASA que publica parte da telemetria da ISS via Lightstreamer. | [12](12-fontes-de-dados-abertas.md) |
| **IV&V** | em português: verificação e validação independente | Prática de garantia de software exigida pela NASA. | [frente 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **JAXA** | expansão não registrada nos documentos | Agência espacial japonesa, dona do módulo Kibo e do Area PADLES. | [16](16-proximos-passos-e-impacto.md) |
| **JEM** | expansão não registrada nos documentos | Outro nome do módulo Kibo, da JAXA. | [02](02-equipamentos-e-dados.md) |
| **Jetson** | não é sigla | Módulo de computação da NVIDIA (Orin NX ou Orin Nano) da configuração dedicada do Orbit. | [10](10-massa-energia-lancamento.md) |
| **JINS MEME** | não é sigla | Óculos comercial com EOG, usado como referência de massa da armação do Orbit. | [09](09-oculos-orbit.md) |
| **JPL** | Jet Propulsion Laboratory | Laboratório da NASA que fez o SAM e participou do Project Sidekick. | [02](02-equipamentos-e-dados.md) |
| **JSC** | Johnson Space Center | Centro da NASA onde fica o SRAG, que analisa a radiação da tripulação. | [02](02-equipamentos-e-dados.md) |
| **JSC-20793** | expansão não registrada nos documentos | Requisito de segurança de baterias em veículos tripulados (Rev. D, 2017). | [16](16-proximos-passos-e-impacto.md) |
| **JSC-63414** | expansão não registrada nos documentos | Documento das diretrizes de exposição à água (SWEG). | [02](02-equipamentos-e-dados.md) |
| **JSON** | expansão não registrada nos documentos | Formato de dados em texto usado nos feeds da NOAA e nos arquivos de configuração do protótipo. | [12](12-fontes-de-dados-abertas.md) |
| **kappa** | não é sigla | Medida de concordância usada para avaliar modelos de estadiamento do sono. | [10](10-massa-energia-lancamento.md) |
| **Kibo** | não é sigla | Módulo japonês da ISS (JEM), onde fica o Area PADLES. | [02](02-equipamentos-e-dados.md) |
| **Kp** | expansão não registrada nos documentos | Índice planetário de atividade geomagnética, em escala adimensional da NOAA. | [12](12-fontes-de-dados-abertas.md) |
| **kPa** | expansão não registrada nos documentos | Unidade de pressão; no projeto, unidade canônica da PIO2 (145 a 155 mmHg equivalem a cerca de 19,33 a 20,67 kPa). | [04](04-cruzamento-de-dados.md) |
| **KSS** | Karolinska Sleepiness Scale | Escala de sonolência de 1 a 9. | [03](03-indicadores-e-limiares.md) |
| **KUDUwave** | não é sigla | Sistema de audiometria usado na OOHA desde 2021, no lugar do EarQ. | [12](12-fontes-de-dados-abertas.md) |
| **L e R (L-90, R+3)** | em português: L = lançamento; R = retorno | Contagem de dias antes do lançamento (L-90) ou em relação ao retorno (R-30 antes, R+3 depois) no calendário médico. | [01](01-contexto-missao.md) |
| **LBNP** | em português: pressão negativa na parte inferior do corpo | Contramedida estudada para SANS, ainda não aprovada como rotina. | [frente 10](../pesquisa/bruto/10-orientacoes-contramedidas.md) |
| **LED** | expansão não registrada nos documentos | Luzes de estado sólido das SSLA. | [02](02-equipamentos-e-dados.md) |
| **LEO** | Low Earth Orbit | Órbita baixa da Terra, onde fica a ISS. | [01](01-contexto-missao.md) |
| **LET** | Linear Energy Transfer | Medida da qualidade da radiação, em keV/µm; não é dose. | [02](02-equipamentos-e-dados.md) |
| **LGPD** | expansão não registrada nos documentos | Lei brasileira de proteção de dados (Lei nº 13.709/2018), que trata dados de saúde como categoria protegida. | [16](16-proximos-passos-e-impacto.md) |
| **LIDAL** | Light Ions Detector for ALTEA | Acréscimo ao ALTEA que mede íons leves no Columbus. | [02](02-equipamentos-e-dados.md) |
| **Lightstreamer** | não é sigla | Servidor de streaming pelo qual a NASA publica a telemetria ISSLIVE. | [12](12-fontes-de-dados-abertas.md) |
| **linha de base** | não é sigla | O normal de cada tripulante, calculado com média e desvio padrão das próprias leituras; o software compara cada valor com ela. | [04](04-cruzamento-de-dados.md) |
| **LiOH** | em português: hidróxido de lítio | Reserva química de remoção de CO2 no segmento russo. | [02](02-equipamentos-e-dados.md) |
| **LLM** | em português: modelo de linguagem | Modelo de linguagem grande, como o OpenBio LLM do qual deriva o Doc-in-a-Box. | [frente 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **LSAH** | Lifetime Surveillance of Astronaut Health | Vigilância de longo prazo da saúde dos astronautas. | [12](12-fontes-de-dados-abertas.md) |
| **LSDA** | Life Sciences Data Archive | Arquivo de dados de ciências da vida da NASA. | [12](12-fontes-de-dados-abertas.md) |
| **LSM6DSOX** | não é sigla | IMU da STMicroelectronics (acelerômetro e giroscópio) prevista para o óculos. | [09](09-oculos-orbit.md) |
| **LSTM** | expansão não registrada nos documentos | Tipo de rede neural recorrente usada no TinySleepNet e, na forma bidirecional, no DeepSleepNet. | [10](10-massa-energia-lancamento.md) |
| **LTH** | Long-Term Health | Saúde a longo prazo, segundo par da nota LxC (OPS / LTH). | [01](01-contexto-missao.md) |
| **LuCCI** | Lunar Command and Control Interoperability | Projeto em que o Doc-in-a-Box foi desenvolvido. | [11](11-precedentes.md) |
| **lux** | expansão não registrada nos documentos | Unidade de iluminância; o pré-sono foi descrito com até 50 lux. | [02](02-equipamentos-e-dados.md) |
| **LxC** | likelihood x consequence | Nota de risco do HRP: probabilidade vezes consequência. | [01](01-contexto-missao.md) |
| **M133** | expansão não registrada nos documentos | Experimento de sono do Skylab (1973), precedente de EEG em voo. | [11](11-precedentes.md) |
| **Mars-500** | não é sigla | Isolamento terrestre de longa duração do IBMP, usado como análogo. | [12](12-fontes-de-dados-abertas.md) |
| **MAS** | Microbial Air Sampler | Aparelho que aspira o ar sobre meio de cultura para detectar bactérias e fungos. | [02](02-equipamentos-e-dados.md) |
| **MASS** | Montreal Archive of Sleep Studies | Base de polissonografias do CÉAMS. | [12](12-fontes-de-dados-abertas.md) |
| **Matryoshka-R** | não é sigla | Manequim cheio de dosímetros para estudar a dose dentro do corpo. | [02](02-equipamentos-e-dados.md) |
| **MCA** | Major Constituent Analyzer | Espectrômetro de massa que acompanha N2, O2, H2, CO2, CH4 e vapor de água. | [02](02-equipamentos-e-dados.md) |
| **MCC** | Mission Control Center (MCC-H: Mission Control Center Houston) | Controle de Missão em terra, que coordena diagnóstico e resposta com a tripulação. | [02](02-equipamentos-e-dados.md) |
| **MCTI** | expansão não registrada nos documentos | Órgão brasileiro com acordo com a NASA (calibração de precipitação) e papel ao lado da AEB em parcerias. | [16](16-proximos-passos-e-impacto.md) |
| **MCU** | em português: microcontrolador | Chip que comanda o óculos (nRF52840, com BLE). | [09](09-oculos-orbit.md) |
| **MDA** | Medical Data Architecture | Arquitetura da NASA para reunir registros, sensores e imagens e sustentar o apoio clínico. | [11](11-precedentes.md) |
| **MDSS** | Medical Decision Support System | Projeto da NASA de apoio à decisão do CMO. | [12](12-fontes-de-dados-abertas.md) |
| **MEC** | Medical Equipment Computer | Laptop médico do CHeCS. | [11](11-precedentes.md) |
| **MedGemma** | não é sigla | Modelo de IA médica usado na demonstração do CMO-DA em computador de borda. | [frente 13](../pesquisa/bruto/13-ia-medica-embarcada.md) |
| **MEDPRAT** | Medical Extensible Dynamic Probabilistic Risk Assessment Tool | Simulador de risco médico por eventos discretos, motor do IMPACT. | [14](14-perguntas-respondidas.md) |
| **MELFI** | Minus Eighty-Degree Laboratory Freezer for ISS | Congelador de amostras a cerca de menos 80 °C. | [02](02-equipamentos-e-dados.md) |
| **MeV** | expansão não registrada nos documentos | Unidade de energia de partículas; o canal de prótons de 10 MeV ou mais define a escala S. | [03](03-indicadores-e-limiares.md) |
| **mGy-Eq** | em português: Gy-equivalente | Unidade de dose por órgão usada nos limites de efeitos não cancerígenos; não se soma com mSv. | [03](03-indicadores-e-limiares.md) |
| **microgravidade** | não é sigla | Condição em órbita em que a flutuabilidade não gera convecção natural, o que exige ventilação forçada e muda o corpo. | [02](02-equipamentos-e-dados.md) |
| **MIMIC-IV** | não é sigla | Base hospitalar de UTI do PhysioNet, de acesso controlado. | [frente 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **MIST** | Medical Information Systems and Tools | Suíte de solo com prontuário eletrônico, imagens e banco do LSAH. | [11](11-precedentes.md) |
| **MIT-BIH** | expansão não registrada nos documentos | Base de ECG com 48 registros no PhysioNet. | [12](12-fontes-de-dados-abertas.md) |
| **ML** | em português: aprendizado de máquina | Modelos que aprendem com dados; no protótipo, z-score, EWMA e Isolation Forest. | [05](05-arquitetura-software.md) |
| **MMD** | Mass Measurement Device | Medidor de massa russo, que tira a massa do período de oscilação de uma mola. | [02](02-equipamentos-e-dados.md) |
| **mmHg** | expansão não registrada nos documentos | Unidade de pressão em que as normas da NASA expressam CO2 e PIO2. | [02](02-equipamentos-e-dados.md) |
| **mobiPV** | expansão não registrada nos documentos | Sistema móvel de procedimentos da ESA com Google Glass, testado na ISS em 2015. | [11](11-precedentes.md) |
| **MSFC** | Marshall Space Flight Center | Centro da NASA que desenvolveu sistemas do ECLSS, como OGA e WRS. | [02](02-equipamentos-e-dados.md) |
| **mSv** | sievert (Sv) | Unidade de dose equivalente e efetiva; a dose efetiva em mSv é usada no limite de carreira. | [02](02-equipamentos-e-dados.md) |
| **MyotonPRO** | não é sigla | Aparelho da ESA que dá um toque mecânico sobre o músculo e mede a vibração de resposta. | [frente 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **N1, N2, N3** | expansão não registrada nos documentos | Estágios do sono não REM no hipnograma. | [05](05-arquitetura-software.md) |
| **NASA** | National Aeronautics and Space Administration | Agência que, com seus parceiros, mantém tripulações na ISS; é a principal fonte dos documentos. | [01](01-contexto-missao.md) |
| **NASA PVT+** | expansão não registrada nos documentos | Aplicativo de PVT da NASA, que avisa não ser teste de aptidão nem ferramenta GO/NO-GO. | [09](09-oculos-orbit.md) |
| **NASA-STD-3001** | expansão não registrada nos documentos | Norma de saúde e desempenho humano em voo da NASA (Vol. 1, tripulação; Vol. 2, projeto), fonte de vários limiares. | [03](03-indicadores-e-limiares.md) |
| **NASA-STD-6001** | expansão não registrada nos documentos | Norma de inflamabilidade e desgaseificação de materiais. | [frente 17](../pesquisa/bruto/17-caminho-ate-voar.md) |
| **NASA-TLX** | NASA Task Load Index | Avaliação subjetiva de carga de trabalho. | [03](03-indicadores-e-limiares.md) |
| **NC-40 e NC-50** | Noise Criteria | Curvas de ruído por banda: NC-50 para áreas de trabalho e NC-40 para áreas de sono. | [02](02-equipamentos-e-dados.md) |
| **NEEMO** | expansão não registrada nos documentos | Missões no laboratório submarino Aquarius, usadas como análogo e descontinuadas em 2023. | [16](16-proximos-passos-e-impacto.md) |
| **NEK** | Nezemnyy Eksperimental’nyy Kompleks | Complexo terrestre do IBMP onde ocorrem os isolamentos SIRIUS. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **NESC** | expansão não registrada nos documentos | Grupo da NASA cuja análise deu a referência de teste de 50 µGy/min, que não é limiar de abrigo. | [02](02-equipamentos-e-dados.md) |
| **NeuroCOG** | expansão não registrada nos documentos | Pesquisa cognitiva da ESA com EEG na ISS (2002). | [11](11-precedentes.md) |
| **Neurospat** | expansão não registrada nos documentos | Experimento da ESA com touca de 62 eletrodos de EEG no Columbus (2009 a 2013). | [11](11-precedentes.md) |
| **NIAC** | expansão não registrada nos documentos | Origem de uma proposta que estima 80 a 160 mSv de dose em seis meses; não é valor universal. | [02](02-equipamentos-e-dados.md) |
| **NIH** | expansão não registrada nos documentos | Instituição de saúde que publica o MedlinePlus, citado para oximetria e exames. | [frente 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **NIOSH** | expansão não registrada nos documentos | Órgão que relaciona fadiga de trabalho a pior tempo de reação, atenção, memória e julgamento. | [16](16-proximos-passos-e-impacto.md) |
| **NLSP** | NASA Life Sciences Portal | Portal de descoberta e pedido de dados de ciências da vida da NASA. | [12](12-fontes-de-dados-abertas.md) |
| **NOAA** | expansão não registrada nos documentos | Órgão que mantém o SWPC e os satélites GOES de clima espacial. | [12](12-fontes-de-dados-abertas.md) |
| **Node 3 (Tranquility)** | não é sigla | Módulo do segmento americano onde ficam o WPA, o UPA e o compartimento WHC. | [02](02-equipamentos-e-dados.md) |
| **NODE3000xxx e USLAB0000xx** | expansão não registrada nos documentos | Identificadores de itens da telemetria pública ISSLIVE, conhecidos por mapas comunitários. | [02](02-equipamentos-e-dados.md) |
| **NORS** | Nitrogen/Oxygen Recharge System | Tanques que recarregam nitrogênio e oxigênio no Airlock Quest. | [02](02-equipamentos-e-dados.md) |
| **NPR** | expansão não registrada nos documentos | Norma interna da NASA; a NPR 7100.1C trata da proteção de participantes humanos de pesquisa. | [16](16-proximos-passos-e-impacto.md) |
| **NR (NR-22, NR-30, NR-37)** | expansão não registrada nos documentos | Normas do Ministério do Trabalho citadas para aplicações terrestres; a NR-37 exige profissional de saúde e enfermaria em plataformas offshore conforme o número de trabalhadores. | [16](16-proximos-passos-e-impacto.md) |
| **nRF52840** | não é sigla | Microcontrolador da Nordic com BLE previsto para o óculos (Cortex-M4F, 1 MB de flash). | [09](09-oculos-orbit.md) |
| **NRHO** | expansão não registrada nos documentos | Órbita do Gateway, projetada para manter visibilidade de comunicação com a Terra. | [frente 16](../pesquisa/bruto/16-artemis-marte.md) |
| **NRS** | em português: escala numérica de dor | Escala de dor autorrelatada de 0 a 10. | [03](03-indicadores-e-limiares.md) |
| **NSPIRES** | expansão não registrada nos documentos | Sistema onde a NASA publica chamadas de pesquisa como HRP/HERO. | [frente 17](../pesquisa/bruto/17-caminho-ate-voar.md) |
| **NTRS** | NASA Technical Reports Server | Repositório de relatórios técnicos da NASA. | [02](02-equipamentos-e-dados.md) |
| **NTx** | em português: N-telopeptídeo | Marcador laboratorial de reabsorção óssea. | [frente 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **NutrISS** | não é sigla | Protocolo de pesquisa de composição corporal por bioimpedância na ISS. | [02](02-equipamentos-e-dados.md) |
| **O2** | expansão não registrada nos documentos | Oxigênio; a pressão parcial inspirada de O2 da cabine (PIO2) tem faixa normóxica definida pela NASA. | [02](02-equipamentos-e-dados.md) |
| **OCHMO** | Office of the Chief Health and Medical Officer | Escritório médico-chefe da NASA, autor de normas e technical briefs. | [01](01-contexto-missao.md) |
| **OCHMO-STD-100.1A** | expansão não registrada nos documentos | Norma do OCHMO com o calendário médico de referência para missão de 180 dias. | [02](02-equipamentos-e-dados.md) |
| **OCHMO-TB e OCHMO-MTB** | Technical Brief (TB) | Resumos técnicos do OCHMO por tema; por exemplo, TB-004 trata de CO2 e MTB-001 de SANS. | [03](03-indicadores-e-limiares.md) |
| **OCT** | Optical Coherence Tomography | Tomografia de coerência óptica, exame de imagem do olho usado no acompanhamento de SANS. | [01](01-contexto-missao.md) |
| **ODC-By** | Open Data Commons Attribution | Licença aberta com atribuição obrigatória, usada por Sleep-EDF e MIT-BIH. | [12](12-fontes-de-dados-abertas.md) |
| **OGA** | Oxygen Generation Assembly | Gera O2 por eletrólise da água no segmento americano. | [02](02-equipamentos-e-dados.md) |
| **OGS** | Oxygen Generation System | Sistema de geração de oxigênio do qual o OGA faz parte, lançado em 2006. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **OIG** | Office of Inspector General | Auditoria interna da NASA, fonte dos custos de carga por kg. | [10](10-massa-energia-lancamento.md) |
| **ONSD** | em português: (diâmetro da) bainha do nervo óptico | Medida por ultrassom ocular, marcador indireto estudado em relação à pressão intracraniana. | [02](02-equipamentos-e-dados.md) |
| **OOHA** | On-Orbit Hearing Assessment | Avaliação auditiva em órbita. | [02](02-equipamentos-e-dados.md) |
| **OPTIMIS** | expansão não registrada nos documentos | Sistema de cronograma da tripulação e dos controladores. | [12](12-fontes-de-dados-abertas.md) |
| **Orion** | não é sigla | Veículo tripulado da Artemis II, que voou com seis sensores internos HERA. | [16](16-proximos-passos-e-impacto.md) |
| **OSCE** | Objective Structured Clinical Examination | Formato de exame clínico estruturado usado para avaliar o Doc-in-a-Box. | [11](11-precedentes.md) |
| **OSD-575** | expansão não registrada nos documentos | Identificador do conjunto Inspiration4 no OSDR. | [12](12-fontes-de-dados-abertas.md) |
| **OSDR** | Open Science Data Repository | Repositório aberto da NASA com dados de biologia espacial e de astronautas. | [12](12-fontes-de-dados-abertas.md) |
| **OSI** | expansão não registrada nos documentos | Organização cujas licenças abertas são exigidas pelos termos do Space Apps (Apache 2.0 como padrão). | [08](08-plano-prototipo-20h.md) |
| **OSLD** | Optically Stimulated Luminescence Dosimeter | Dosímetro passivo que faz parte do CPD. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **OSTPV** | Onboard Short Term Plan Viewer | Visualizador do cronograma de curto prazo a bordo. | [12](12-fontes-de-dados-abertas.md) |
| **P1NP** | expansão não registrada nos documentos | Marcador de remodelação óssea medido em urina ou sangue. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **PADLES** | Passive Dosimeter for Life Science Experiments in Space | Dosímetros passivos da JAXA no Kibo (TLD e CR-39). | [02](02-equipamentos-e-dados.md) |
| **PANAS** | Positive and Negative Affect Schedule | Escala de afeto positivo e negativo. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **PBA** | Portable Breathing Apparatus | Cilindro de O2 com máscara para fogo, despressurização ou contaminação. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **PCA** | Pressure Control Assembly | Controla a pressão da cabine e adiciona O2 e N2. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **PCR** | expansão não registrada nos documentos | Método laboratorial que mede vírus em amostras como presença ou cópias por volume. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **PFE** | Periodic Fitness Evaluation | Teste periódico de capacidade aeróbica. | [frente 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **PFS e PPFS** | Pulmonary Function System; Portable PFS | Analisam gases inspirados e expirados, ventilação e consumo de oxigênio. | [02](02-equipamentos-e-dados.md) |
| **pfu** | expansão não registrada nos documentos | Unidade de fluxo de partículas: partículas/(cm²·s·sr); 10 pfu de prótons de 10 MeV ou mais marca S1. | [12](12-fontes-de-dados-abertas.md) |
| **PHQ-9** | Patient Health Questionnaire-9 | Questionário clínico terrestre de nove itens sobre sintomas de depressão; não entra no check-in sem licença e governança clínica. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **PhysioNet** | não é sigla | Repositório de bases de sinais fisiológicos (Sleep-EDF, MIT-BIH, MIMIC-IV). | [12](12-fontes-de-dados-abertas.md) |
| **PI** | em português: investigador principal | Pesquisador responsável por uma proposta; para equipe brasileira, a pesquisa sugere PI e instituição nos EUA. | [16](16-proximos-passos-e-impacto.md) |
| **PIO2** | em português: pressão parcial inspirada de O2 | Oxigênio disponível no ar respirado; faixa normóxica de 145 a 155 mmHg. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **PMC** | Private Medical Conference | Conversa médica privada e semanal entre o tripulante e o médico de voo. | [01](01-contexto-missao.md) |
| **PNTD** | Plastic Nuclear Track Detector | Detector plástico de traços que faz parte do CPD. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **POC** | point-of-care | Exame feito no local, com resultado em minutos. | [frente 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **POMS** | Profile of Mood States | Questionário de estado de humor (POMS-2 é licenciado). | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **PPC** | Private Psychological Conference | Conversa privada a cada 14 dias com o profissional de BHP. | [01](01-contexto-missao.md) |
| **ppCO2** | em português: pressão parcial de CO2 | Parte da pressão do ar devida ao CO2; base da regra R-CO2-01. | [02](02-equipamentos-e-dados.md) |
| **PPE** | expansão não registrada nos documentos | Módulo do Gateway que, com o HALO, receberá os primeiros conjuntos de pesquisa de radiação. | [frente 16](../pesquisa/bruto/16-artemis-marte.md) |
| **PPG** | expansão não registrada nos documentos | Sensor óptico de pulso de relógios; isolado, pode gerar artefato e não diagnostica arritmia. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **ppO2 e ppN2** | em português: pressão parcial de O2 e de N2 | Partes da pressão do ar devidas ao O2 e ao N2, publicadas na telemetria ISSLIVE. | [02](02-equipamentos-e-dados.md) |
| **PROANTAR** | expansão não registrada nos documentos | Linha do CNPq de financiamento à pesquisa antártica. | [frente 17](../pesquisa/bruto/17-caminho-ate-voar.md) |
| **PSD** | em português: densidade espectral de potência | Potência do EEG por frequência, em µV²/Hz. | [frente 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **PSG** | em português: polissonografia | Exame de sono de referência contra o qual o óculos precisa ser validado. | [09](09-oculos-orbit.md) |
| **psia** | expansão não registrada nos documentos | Unidade de pressão em que a telemetria pública lista ppO2, ppN2 e ppCO2; a cabine fica perto de 14,7 psia. | [12](12-fontes-de-dados-abertas.md) |
| **PSQI** | Pittsburgh Sleep Quality Index | Questionário de qualidade do sono, com direitos da University of Pittsburgh. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **PSS** | Perceived Stress Scale | Escala de estresse percebido; a versão PSS-10 tem dez itens. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **PUIList** | não é sigla | Dicionário (PUIList.xml) do cliente de exemplo do Lightstreamer que lista os itens e unidades da telemetria. | [12](12-fontes-de-dados-abertas.md) |
| **PVT** | Psychomotor Vigilance Test (também Task) | Teste de tempo de reação a estímulos, usado no índice de prontidão e no cenário C4. | [03](03-indicadores-e-limiares.md) |
| **PVT-B** | expansão não registrada nos documentos | Versão do PVT que define lapso como tempo de reação de pelo menos 355 ms. | [03](03-indicadores-e-limiares.md) |
| **PWD e xPWD** | Potable Water Dispenser | Dispensador de água potável, quente ou ambiente. | [02](02-equipamentos-e-dados.md) |
| **QCT** | expansão não registrada nos documentos | Exame de imagem óssea citado junto com a DXA. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **Quest** | não é sigla | Airlock do segmento americano, onde ficam tanques de gás de alta pressão. | [02](02-equipamentos-e-dados.md) |
| **R-CO2-01 e demais regras** | expansão não registrada nos documentos | Ids das regras de cruzamento do motor (CO2, radiação, SANS, sono, ambiente e hidratação). | [04](04-cruzamento-de-dados.md) |
| **RadLab** | não é sigla | Serviço de dados de radiação da NASA, com API e conjuntos históricos. | [02](02-equipamentos-e-dados.md) |
| **RAM** | Radiation Area Monitor | Dosímetro passivo de área, sem energia, que acumula dose no ponto onde fica. | [02](02-equipamentos-e-dados.md) |
| **Raspberry Pi 5** | não é sigla | Computador pequeno usado como referência de capacidade de processamento. | [10](10-massa-energia-lancamento.md) |
| **RDC** | expansão não registrada nos documentos | Resoluções da Anvisa, como a RDC 657/2022 (SaMD) e a RDC 751/2022 (classes de risco). | [16](16-proximos-passos-e-impacto.md) |
| **REM** | em português: movimentos oculares rápidos | Estágio do sono no hipnograma; o óculos não é detector de sono REM. | [09](09-oculos-orbit.md) |
| **REM** | Radiation Environment Monitor | Detector Timepix de radiação na ISS (REM e REM-2). | [02](02-equipamentos-e-dados.md) |
| **REST** | expansão não registrada nos documentos | Estilo de API usado por OSDR e DONKI. | [12](12-fontes-de-dados-abertas.md) |
| **rHEALTH** | expansão não registrada nos documentos | Citômetro de fluxo miniaturizado (rHEALTH ONE) demonstrado na ISS. | [02](02-equipamentos-e-dados.md) |
| **RIDGE** | Radiation, Isolation and confinement, Distance from Earth, Gravity fields e Hostile/closed environments | Os cinco perigos do voo humano segundo o HRP. | [01](01-contexto-missao.md) |
| **RMSSD** | expansão não registrada nos documentos | Medida de variabilidade da frequência cardíaca, em ms, comparada com a linha de base pessoal. | [04](04-cruzamento-de-dados.md) |
| **RNFL** | expansão não registrada nos documentos | Medida feita no OCT, citada no acompanhamento de SANS. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **ROS** | Russian Orbital Segment | Segmento russo da ISS, com suporte à vida próprio. | [02](02-equipamentos-e-dados.md) |
| **RSP** | Respiratory Support Pack | Kit de suporte respiratório da ISS. | [02](02-equipamentos-e-dados.md) |
| **RST** | Reaction Self Test | Teste de reação de 3 minutos documentado para a ISS. | [03](03-indicadores-e-limiares.md) |
| **S1 a S5 e G1 a G5** | expansão não registrada nos documentos | Escalas NOAA de tempestade de radiação (S, que começa em 10 pfu) e geomagnética (G). | [03](03-indicadores-e-limiares.md) |
| **SAA** | South Atlantic Anomaly | Anomalia do Atlântico Sul: trecho da órbita com dose maior e previsível pela posição. | [12](12-fontes-de-dados-abertas.md) |
| **Sabatier** | não é sigla | Reator que combina o H2 do OGA com CO2 para recuperar parte do oxigênio; estava fora de serviço desde 2017. | [02](02-equipamentos-e-dados.md) |
| **SAM** | Spacecraft Atmosphere Monitor | Demonstração do JPL de GC/MS miniaturizado (também chamada SCRAM-2). | [02](02-equipamentos-e-dados.md) |
| **SaMD** | em português: software como dispositivo médico | Categoria regulatória da Anvisa para software com finalidade médica. | [16](16-proximos-passos-e-impacto.md) |
| **Samn-Perelli** | não é sigla | Escala de fadiga de 1 a 7, em que 7 é exaustão. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **SANS** | Spaceflight Associated Neuro-ocular Syndrome | Síndrome neuro-ocular associada ao voo espacial: mudanças no olho e na visão em missões longas. | [14](14-perguntas-respondidas.md) |
| **SAS** | Space Adaptation Sickness | Enjoo de adaptação ao espaço, com escala própria citada pela NASA. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **SBC-1 e SBC-2** | Spaceborne Computer-1 e Spaceborne Computer-2 | Computadores comerciais da HPE testados na ISS contra erros de radiação. | [10](10-massa-energia-lancamento.md) |
| **SBIR e STTR** | expansão não registrada nos documentos | Programas de financiamento da NASA: SBIR exige pequena empresa dos EUA; STTR exige também instituição de pesquisa parceira. | [16](16-proximos-passos-e-impacto.md) |
| **SciSpacE CORA** | expansão não registrada nos documentos | Canal da ESA para propostas de experimentos de saúde humana na ISS. | [16](16-proximos-passos-e-impacto.md) |
| **SDK** | expansão não registrada nos documentos | Biblioteca de cliente; a pesquisa usou o Node.js Client SDK do Lightstreamer. | [frente 11](../pesquisa/bruto/11-amostras-reais.md) |
| **SEP** | Solar Energetic Particles | Partículas solares energéticas, tipo de evento da DONKI e gatilho da regra R-RAD-01. | [12](12-fontes-de-dados-abertas.md) |
| **SESAI** | expansão não registrada nos documentos | Estrutura do Ministério da Saúde responsável pela atenção à saúde indígena. | [16](16-proximos-passos-e-impacto.md) |
| **SFOG** | Solid Fuel Oxygen Generator | Cartucho químico que libera O2 em contingência (TGK no segmento russo). | [02](02-equipamentos-e-dados.md) |
| **SHHS** | Sleep Heart Health Study | Base de polissonografias do PhysioNet. | [frente 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **SIRIUS** | expansão não registrada nos documentos | Isolamentos terrestres do IBMP com a NASA (SIRIUS-17, 19 e 21). | [11](11-precedentes.md) |
| **SLAMMD** | Space Linear Acceleration Mass Measurement Device | Mede a massa corporal em microgravidade. | [02](02-equipamentos-e-dados.md) |
| **Sleep-EDF** | não é sigla | Base pública de polissonografias do PhysioNet usada para o hipnograma do protótipo. | [12](12-fontes-de-dados-abertas.md) |
| **SMAC** | Spacecraft Maximum Allowable Concentration | Limite de concentração de cada composto no ar, que depende da duração; não existe um SMAC geral. | [02](02-equipamentos-e-dados.md) |
| **SOMA** | Space Omics and Medical Atlas | Atlas que integra dados de missões, como Twins Study e Inspiration4. | [12](12-fontes-de-dados-abertas.md) |
| **SPE** | Solar Particle Event | Evento de partículas solares, episódico. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **SpO2** | em português: saturação de oxigênio | Saturação de oxigênio no sangue medida por oxímetro; não é o mesmo que o O2 da cabine. | [02](02-equipamentos-e-dados.md) |
| **SRAG** | Space Radiation Analysis Group | Grupo do JSC que analisa a radiação da tripulação. | [02](02-equipamentos-e-dados.md) |
| **SSC** | Station Support Computer | Laptop de apoio da estação, já aprovado, candidato a rodar o Orbit Saúde. | [10](10-massa-energia-lancamento.md) |
| **SSLA** | Solid State Lighting Assembly | Luminárias de LED com modos para rotina, pré-sono e alerta. | [02](02-equipamentos-e-dados.md) |
| **SSP** | expansão não registrada nos documentos | Documentos do programa da ISS, como SSP 30237 (EMC) e SSP 50313 (telas). | [frente 05](../pesquisa/bruto/05-massa-computacao-lancamento.md) |
| **SSS** | Stanford Sleepiness Scale | Escala de sonolência de sete posições. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **STARwatch** | não é sigla | Trabalho de actigrafia e sono financiado pelo HRP via SBIR. | [16](16-proximos-passos-e-impacto.md) |
| **SUS** | expansão não registrada nos documentos | Sistema de saúde brasileiro citado como destino de aplicações terrestres (telessaúde, saúde indígena). | [16](16-proximos-passos-e-impacto.md) |
| **SWEG** | Spacecraft Water Exposure Guidelines | Limites por composto para a água de bordo (JSC-63414). | [02](02-equipamentos-e-dados.md) |
| **SWPC** | Space Weather Prediction Center | Centro da NOAA que publica prótons do GOES, Kp e alertas. | [12](12-fontes-de-dados-abertas.md) |
| **SwRI** | Southwest Research Institute | Instituto que fabricou o RAD. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **T1 a T7** | expansão não registrada nos documentos | Telas do protótipo: T1 Monitor geral, T2 Meu corpo, T3 Check-in, T4 Detalhe do alerta, T5 Ambiente e radiação, T6 Sono e óculos, T7 Tendências. | [07](07-design-interface.md) |
| **T2** | Second Generation Treadmill | Esteira do segmento americano (também chamada COLBERT), que substituiu a TVIS em 2009. | [01](01-contexto-missao.md) |
| **T2AR** | expansão não registrada nos documentos | Aplicação de realidade aumentada testada em 2021 para manutenção da esteira T2. | [11](11-precedentes.md) |
| **TCCS** | Trace Contaminant Control Subassembly | Remove contaminantes-traço do ar. | [02](02-equipamentos-e-dados.md) |
| **TDRS** | Tracking and Data Relay Satellite | Satélites geoestacionários do Space Network que ligam a ISS ao solo. | [12](12-fontes-de-dados-abertas.md) |
| **TDU1 e TDU2** | expansão não registrada nos documentos | Unidades do SAM: a TDU1 mediu gases principais e a TDU2, VOCs. | [02](02-equipamentos-e-dados.md) |
| **TEPC** | Tissue Equivalent Proportional Counter | Câmara de gás com parede equivalente a tecido que estima a energia depositada. | [02](02-equipamentos-e-dados.md) |
| **THC** | Temperature and Humidity Control | Controle de temperatura e umidade do ECLSS. | [02](02-equipamentos-e-dados.md) |
| **TIB** | em português: tempo na cama | Fim menos início do período na cama. | [04](04-cruzamento-de-dados.md) |
| **TinySleepNet** | não é sigla | Modelo pequeno de estadiamento do sono (CNN e LSTM, cerca de 1,3 milhão de parâmetros). | [10](10-massa-energia-lancamento.md) |
| **TLD** | Thermoluminescent Dosimeter | Dosímetro termoluminescente, usado no CPD e no Area PADLES. | [02](02-equipamentos-e-dados.md) |
| **TOC** | em português: carbono orgânico total | Medida da água feita pelo TOCA, em mg/L. | [02](02-equipamentos-e-dados.md) |
| **TOCA** | Total Organic Carbon Analyzer | Analisador de carbono orgânico total, pH e condutividade da água. | [02](02-equipamentos-e-dados.md) |
| **Tono-Pen** | não é sigla | Tonômetro de voo que estima a pressão dentro do olho tocando a córnea. | [frente 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **TOPS** | em português: trilhões de operações por segundo | Medida de aceleradores de IA, como o Jetson. | [10](10-massa-energia-lancamento.md) |
| **torr** | expansão não registrada nos documentos | Unidade de pressão usada pelo MCA e pela telemetria pública. | [02](02-equipamentos-e-dados.md) |
| **TPA2012D2** | não é sigla | Amplificador de áudio classe D da Texas Instruments previsto para a condução óssea. | [09](09-oculos-orbit.md) |
| **TST** | em português: tempo total de sono | Número de épocas de sono vezes 0,5 min. | [04](04-cruzamento-de-dados.md) |
| **TVIS** | expansão não registrada nos documentos | Esteira antiga substituída pela T2 em 2009. | [02](02-equipamentos-e-dados.md) |
| **TWA** | em português: nível médio ponderado no tempo | Nível de ruído médio no tempo, em dBA; a referência é 75 dBA em 8 h. | [02](02-equipamentos-e-dados.md) |
| **U2 e U3** | Ultrasound 2; Ultrasound 3 | Ultrassons da ISS: o U2 faz imagem de órgãos, vasos, músculos e olho; o U3 é o sucessor, entregue em 2025. | [02](02-equipamentos-e-dados.md) |
| **UBS** | expansão não registrada nos documentos | Unidades de saúde usadas como base de comparação de conectividade na Amazônia Legal. | [16](16-proximos-passos-e-impacto.md) |
| **UCD** | Urine Collection Device | Saco com válvula para coleta de urina. | [frente 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **UPA** | Urine Processor Assembly | Pré-trata e destila a urina para o ciclo de água. | [02](02-equipamentos-e-dados.md) |
| **UR** | em português: umidade relativa | Umidade do ar da cabine, em %. | [02](02-equipamentos-e-dados.md) |
| **USOS** | United States Orbital Segment | Segmento americano da ISS. | [02](02-equipamentos-e-dados.md) |
| **UTAS** | United Technologies Aerospace Systems | Empresa parceira da NASA no OGA. | [02](02-equipamentos-e-dados.md) |
| **UTC** | em português: Tempo Universal Coordenado | Padrão de horário em que todos os dados do projeto são guardados (ISO 8601). | [01](01-contexto-missao.md) |
| **V1 e V2** | expansão não registrada nos documentos | Prefixos dos requisitos dos volumes 1 e 2 da NASA-STD-3001 (por exemplo, V1 5003). | [03](03-indicadores-e-limiares.md) |
| **VAS** | em português: escala visual analógica | Escala visual entre dois extremos definidos para a pergunta. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **VELO** | expansão não registrada nos documentos | Cicloergômetro do segmento russo. | [02](02-equipamentos-e-dados.md) |
| **VGE** | expansão não registrada nos documentos | Avaliação usada nos testes de câmara de protocolos de descompressão. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **VO2max e VO2peak** | em português: consumo máximo de oxigênio | Capacidade aeróbica; o VO2peak é o pico medido no teste PFE. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **VOC** | em português: compostos orgânicos voláteis | Contaminantes do ar medidos pelo AQM. | [02](02-equipamentos-e-dados.md) |
| **Vozdukh** | não é sigla | Equipamento que remove CO2 no segmento russo, com LiOH como reserva. | [02](02-equipamentos-e-dados.md) |
| **VR** | em português: realidade virtual | Usada em estudo antártico de restauração com cenas de natureza ou cidade. | [11](11-precedentes.md) |
| **VZV** | varicella-zoster virus | Vírus da varicela-zóster, latente, que pode voltar a ser detectado no voo. | [frente 03](../pesquisa/bruto/03-riscos-indicadores-limiares.md) |
| **W3C** | expansão não registrada nos documentos | Fonte das especificações web Event Timing e Frame Timing, citadas para medir reação em tela. | [frente 08](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md) |
| **WASO** | em português: acordado após dormir | Tempo acordado entre o primeiro e o último sono. | [frente 14](../pesquisa/bruto/14-oculos-pipeline-sinais.md) |
| **WBC** | expansão não registrada nos documentos | Contagem de leucócitos com diferencial feita pelo HemoCue WBC DIFF. | [frente 02](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md) |
| **WFDB** | expansão não registrada nos documentos | Formato de arquivos do PhysioNet usado pela base MIT-BIH. | [frente 06](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) |
| **WHC** | Waste and Hygiene Compartment | Compartimento do Node 3 que recolhe urina e resíduos sólidos. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **WinSCAT** | Spaceflight Cognitive Assessment Tool for Windows | Bateria cognitiva breve no laptop (memória, atenção), mensal até 2025. | [11](11-precedentes.md) |
| **WMK** | Water Microbiology Kit | Kit de microbiologia da água, com MCD e CDB. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **WPA** | Water Processor Assembly | Trata condensado e urina destilada para produzir água potável. | [02](02-equipamentos-e-dados.md) |
| **WRM** | Water Recovery and Management | Subsistema do ECLSS de recuperação e gestão de água (WPA, UPA, BPA). | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **WRS** | Water Recovery System | Sistema de recuperação de água da ISS, em operação desde 2008. | [frente 01](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) |
| **xEHR** | Exploration Electronic Health Record | Proposta de prontuário embarcado com envio assíncrono. | [14](14-perguntas-respondidas.md) |
| **xEMU** | expansão não registrada nos documentos | Traje da NASA no qual se avaliou áudio por condução óssea no capacete (ICES-2024-209). | [09](09-oculos-orbit.md) |
| **YASA** | expansão não registrada nos documentos | Algoritmo publicado de estadiamento do sono por características do EEG, leve o bastante para CPU. | [10](10-massa-energia-lancamento.md) |
| **z-score** | não é sigla | Quantos desvios padrão uma leitura se afasta da linha de base pessoal; sozinho nunca produz vermelho. | [04](04-cruzamento-de-dados.md) |
| **Zvezda** | não é sigla | Módulo de serviço do segmento russo, onde ficam Elektron e Vozdukh. | [02](02-equipamentos-e-dados.md) |
