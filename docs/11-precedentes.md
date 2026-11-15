# 11. Precedentes

> Para quem: quem apresenta à NASA e o dono do projeto.
> Pergunta que responde: a NASA já faz algo parecido? Onde está o nosso diferencial?
> Como usar: a seção 1 é a resposta para abrir a conversa. As seções 2 a 5 trazem as provas por tema (óculos, software, IA médica, cuidado entre colegas). A seção 6 junta tudo numa matriz. A seção 7 tem frases prontas para o slide, cada uma com fonte, e a seção 8 lista o que a pesquisa não conseguiu confirmar.
> Fontes: [`../pesquisa/bruto/04-precedentes-oculos-sono.md`](../pesquisa/bruto/04-precedentes-oculos-sono.md) (frente 4, seções 1 a 4 e 8), [`../pesquisa/bruto/06-dados-abertos-software-fluxo.md`](../pesquisa/bruto/06-dados-abertos-software-fluxo.md) (seções 2 e 3), [`../pesquisa/bruto/07-desafio-oficial-padroes-interface.md`](../pesquisa/bruto/07-desafio-oficial-padroes-interface.md) (D3 e D5) e [`../pesquisa/bruto/13-ia-medica-embarcada.md`](../pesquisa/bruto/13-ia-medica-embarcada.md) (D1, D2 e D5). Única fonte externa: uma reportagem do TechCrunch sobre o CMO Digital Assistant, marcada [SECUNDÁRIA]. Etiquetas de confiança como em [`00-guia-de-leitura.md`](00-guia-de-leitura.md).
> Regra de leitura: "usado no espaço" quer dizer que uma fonte registra voo ou operação. Demonstração não é adoção operacional, certificação nem prova de eficácia. **NÃO ENCONTRADO** descreve o resultado das buscas da pesquisa, não prova de que a coisa não existe.

---

## 1. Resposta curta

**A NASA e outras agências já testaram quase todas as peças do Orbit, mas cada uma separada.
Condução óssea: a NASA avaliou fones comerciais para a voz no traje xEMU em 2024, só em solo e só quanto ao conforto.
EEG e EOG medem o sono em voo desde o Skylab (1973); a faixa Dreem (2021) e o Sleep in Orbit (2023) levaram EEG vestível à ISS.
A combinação do óculos não é inédita: o AttentivU, do MIT, já reuniu EEG, EOG e condução óssea numa armação e voou em avião parabólico em 2022.
No software, a NASA tem sistemas de saúde separados, modelos de risco e protótipos de apoio à decisão, mas nenhum aplicativo único que junte todos os sensores, e os sinais vitais da tripulação não são monitorados de forma contínua.
O diferencial defensável é a integração: óculos ligado ao painel de saúde, operação offline, alerta explicado com a fonte, personalização cultural escolhida pelo tripulante, cuidado mútuo com consentimento e validação progressiva até a missão.**

| Já existe, com precedente | O que o Orbit propõe e a pesquisa não achou pronto |
| --- | --- |
| Condução óssea em estudo de traje da NASA | Óculos com sensores ligado ao painel de saúde da tripulação |
| EEG e EOG para sono em experimentos de voo | Sons de natureza escolhidos pela própria pessoa, com pausa imediata e respeito aos alarmes |
| EEG, EOG e condução óssea juntos numa armação (AttentivU) | Monitor coletivo com consentimento por indicador, audiência e período |
| Sistemas de saúde a bordo e em solo, separados | Painel único e offline com corpo e ambiente, e evidência e fonte em cada alerta |
| Protótipos de IA de apoio ao médico de bordo (CMO-DA) | Linha de base pessoal exibida numa figura humana, com o próximo passo em linguagem simples |

A coluna da direita é [INFERÊNCIA] da comparação feita nas frentes 4 e 13 ([bruto 04, seção 8.2](../pesquisa/bruto/04-precedentes-oculos-sono.md); [bruto 13, D5](../pesquisa/bruto/13-ia-medica-embarcada.md)): nenhum precedente citado demonstra essa combinação completa em missão. Ela é hipótese de produto, não resultado validado.

**Cuidado com a figura humana.** A figura com partes clicáveis é o exemplo central do próprio enunciado do desafio [SECUNDÁRIA, [cópia local do desafio](https://hackathlone.com/challenges/health-monitoring-software)]. Outras equipes provavelmente terão uma. Sozinha ela não diferencia o Orbit Saúde; o que diferencia é o que está por trás dela (linha de base pessoal, ambiente da estação, evidência e fonte de cada estado).

---

## 2. Precedentes do óculos

### 2.1 Condução óssea: só em estudo de traje

O artigo de Bridget Cavanaugh (NASA Johnson Space Center, ICES-2024-209, julho de 2024) estudou condução óssea como alternativa para o áudio recebido no capacete do traje xEMU, porque alto-falantes abertos e microfones causavam eco. O texto trata a condução óssea como **solução de reserva em desenvolvimento**, não como equipamento adotado. Foram cinco fones comerciais, cinco pessoas de engenharia (não astronautas) e seis horas com cada fone. O estudo mediu ajuste, estabilidade, pontos de pressão e conforto; **não** mediu inteligibilidade, música, sono nem efeito terapêutico. [OFICIAL, [Cavanaugh, ICES-2024-209](https://ntrs.nasa.gov/api/citations/20240005885/downloads/ICES_final_manuscript_Cavanaugh.pdf)]

**NÃO ENCONTRADO:** validação de fone de condução óssea em astronautas em voo ou medição da transmissão óssea em microgravidade. Um estudo de inclinação da cabeça (análogo terrestre) não achou mudança auditiva clinicamente significativa, mas não responde à pergunta em voo. [PAPER, [análogo de microgravidade](https://pubmed.ncbi.nlm.nih.gov/8214826/)]

Outros dois precedentes já juntam condução óssea a sensores: a faixa Dreem tem transdutores ósseos, desligados na validação publicada [PAPER, [Debellemanière et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC7751170/)], e o AttentivU usa um piezoelétrico de condução óssea para feedback auditivo [PAPER, [Kosmyna et al., 2019](https://dam-prod.media.mit.edu/x/2019/05/29/1570522368.pdf)]. Física, pontos de contato e limites de ruído estão em [`09-oculos-orbit.md`](09-oculos-orbit.md), seção 7.

### 2.2 EEG e EOG em voo: experimentos delimitados, nunca monitor de rotina

A história é longa. No **Skylab** (1973), uma touca com EEG e EOG e um painel na cabine de sono estimavam o estágio do sono a bordo, com um astronauta estudado por missão [OFICIAL, [relatório NASA M133](https://ntrs.nasa.gov/citations/19750019675)]. No **Neurolab** (STS-90, 1998), uma polissonografia com quatro canais de EEG, dois de EOG, dois de EMG (eletromiografia) e canais cardiorrespiratórios gerou 16 registros de sono de quatro astronautas [OFICIAL, [NASA PI-in-a-Box](https://ntrs.nasa.gov/api/citations/20020073385/downloads/20020073385.pdf)]. Na **Mir**, o programa soviético e russo registrou EEG, EOG, EMG e ECG do sono com o aparelho búlgaro Son-3 [OFICIAL, [NASA, tradução de literatura soviética](https://ntrs.nasa.gov/api/citations/19910017355/downloads/19910017355.pdf)], e o **Nightcap**, da NASA, classificou vigília, REM (sono de movimentos oculares rápidos) e não-REM por movimento de pálpebras e do corpo, com 120 noites em voo de cinco participantes [OFICIAL, [NASA Phase 1 Science Report](https://www.nasa.gov/wp-content/uploads/static/history/SP-4225/science/issphase1sci.pdf)].

Na ISS, a ESA usou EEG em pesquisa cognitiva (**NeuroCOG**, 2002) e uma touca de 62 eletrodos no módulo Columbus (**Neurospat**, 2009 a 2013, cinco astronautas) [OFICIAL, [ESA Neurospat](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/PromISSe/Neurospat)]. Os vestíveis vieram depois: Thomas Pesquet usou a faixa de EEG seco **Dreem** em 2021, em três sessões de duas noites, e a NASA registrou novo uso em 2023 [OFICIAL, [CNES, missão Alpha](https://cnes.fr/en/projects/mission-alpha); [NASA, 10 jul. 2023](https://www.nasa.gov/blogs/stationreport/2023/07/10/iss-daily-summary-report-7-10-2023/)]. Em 2023, o **Sleep in Orbit** (ESA e Aarhus University, missão Huginn de Andreas Mogensen) registrou EEG dentro do ouvido, em peças moldadas sob medida, com 20 noites de boa qualidade de sinal [OFICIAL, [ESA](https://www.esa.int/articles/about-us/directorates/human-and-robotic-exploration/health-science-in-orbit)]. A NASA também demonstrou um headset portátil de EEG em 2022 (**Neurowellness in Space**), sem publicar canais nem resultados [OFICIAL, [NASA, 12 abr. 2022](https://www.nasa.gov/blogs/stationreport/2022/04/12/iss-daily-summary-report-4-12-2022/)].

O **Eye Tracking Device (ETD)** mede os olhos com **câmeras** num headset, não com EOG; foram observados 31 astronautas nas Expedições 9, 11, 13, 14 e 16 [OFICIAL, [NASA, ISS Research Results](https://www.nasa.gov/wp-content/uploads/2022/03/iss_technical_publication_030116.pdf)]. E a coleta de rotina de sono da NASA (Spaceflight Standard Measures) usa actigrafia de pulso com questionários, que não mede ondas cerebrais [OFICIAL, [NASA, Sleep on Station](https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023/)].

Conclusão da frente 4: há EEG e EOG para sono desde o Skylab, mas em experimentos delimitados com amostras pequenas, **não como monitor pessoal contínuo de toda a tripulação**. [OFICIAL, [Skylab M133](https://ntrs.nasa.gov/citations/19750019675); PAPER, [Dijk et al., Neurolab](https://journals.physiology.org/doi/full/10.1152/ajpregu.2001.281.5.R1647)]

### 2.3 Óculos inteligentes, realidade aumentada e lentes

A NASA e a ESA já levaram óculos e headsets para a ISS, mas para **procedimentos**, não para saúde: o HoloLens do Project Sidekick (NASA/JPL e Microsoft, chegada em dezembro de 2015 e novos testes em 2021), o T2AR para manutenção da esteira (2021) e o mobiPV com Google Glass (ESA, missão iriss de Andreas Mogensen, 2015). Nenhum deles integrava EEG, EOG, áudio de natureza e software de saúde da tripulação. [OFICIAL, [NASA, AR e VR na ISS](https://www.nasa.gov/missions/station/nine-ways-we-use-ar-and-vr-on-the-international-space-station/); [ESA, Saving time in space](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Research/Saving_time_in_space); INFERÊNCIA, frente 4, seção 4.1] **NÃO ENCONTRADO:** registro primário de uso de Vuzix ou Epson Moverio na ISS.

Fora do espaço, há óculos com sensores: o JINS MEME tem três eletrodos de EOG na armação, sem voo espacial localizado e com venda direta encerrada em 27 de março de 2024 [FABRICANTE, [JINS MEME Platform](https://jins-meme.github.io/jinsmeme-platform/en/hardware.html); [FAQ JINS](https://faq-jp.jins.com/jp/faq/glasses/faq_detail.html?category=3043&id=1639&page=1)]. O AttentivU tem dois canais de EEG nas hastes (TP9 e TP10), dois eletrodos de EOG nas plaquetas, referência na ponte (Fpz), amostragem de 1.000 Hz, Bluetooth e condução óssea; em maio de 2022, seis pessoas o usaram num voo parabólico com 20 parábolas, com apoio da NASA [PAPER, [Kosmyna et al., 2019](https://dam-prod.media.mit.edu/x/2019/05/29/1570522368.pdf); [AIAA 2023-4656](https://www.abstractscorecard.com/uploads/Tasks/upload/21810/DPPWZUCK-1650206-1-PDF.pdf)].

**Lentes de antecipação.** Toda a tripulação leva ao menos três pares de lentes prescritas de poderes diferentes, e as "Space Anticipation Glasses" são lentes corretivas, não óculos com sensores, câmera ou tela [OFICIAL, [NASA OCHMO, briefing de SANS](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)]. É daí que vem o argumento "a armação já está no kit" ([`09-oculos-orbit.md`](09-oculos-orbit.md), seção 2).

### 2.4 Tabela dos precedentes do óculos

| Dispositivo ou experimento | Agência | Ano | O que fez | Status | Fonte |
| --- | --- | --- | --- | --- | --- |
| Condução óssea para o xEMU | NASA JSC | 2024 | Ajuste e conforto de cinco fones comerciais para a voz no traje, em cinco engenheiros | Pesquisa em solo, solução de reserva, sem adoção | [ICES-2024-209](https://ntrs.nasa.gov/api/citations/20240005885/downloads/ICES_final_manuscript_Cavanaugh.pdf) |
| Skylab M133 | NASA | 1973 | Touca com EEG e EOG e estimativa de estágio do sono a bordo; três participantes | Experimento histórico | [NASA M133](https://ntrs.nasa.gov/citations/19750019675) |
| Sleep and Respiration, Neurolab | NASA e equipe acadêmica | 1998 | Polissonografia de 20 canais (4 EEG, 2 EOG); 4 astronautas, 16 registros | Experimento concluído | [NASA](https://ntrs.nasa.gov/api/citations/20020073385/downloads/20020073385.pdf) |
| Son-K e Son-3, Mir | Programa soviético e russo, com a Bulgária | Relatórios NASA de 1991 e 1993 | EEG, EOG, EMG e ECG do sono, com processamento posterior | Pesquisa histórica | [NASA](https://ntrs.nasa.gov/api/citations/19910017355/downloads/19910017355.pdf) |
| Nightcap (E663), Mir | NASA e Instituto de Saúde Mental de Massachusetts | Anos 1990 (Mir 23 e 24) | Vigília, REM e não-REM por movimento de pálpebras e do corpo; 5 participantes | Histórico; reanálise publicada em 2025 | [NASA Phase 1](https://www.nasa.gov/wp-content/uploads/static/history/SP-4225/science/issphase1sci.pdf) |
| NeuroCOG | ESA | 2002 | EEG em tarefas de percepção espacial | Pesquisa de missão | [ESA](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Cervantes_Mission/Life_sciences) |
| Neurospat | ESA | 2009 a 2013 | Touca de 62 eletrodos no Columbus; 5 astronautas | Pesquisa, não monitor | [ESA](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/PromISSe/Neurospat) |
| Dreams com Dreem | CNES/CADMOS, CHU de Toulouse e Dreem | 2021 (Pesquet); uso registrado em 2023 | Faixa de EEG seco; o produto tem condução óssea, sem uso sonoro demonstrado em voo | Testada na ISS | [CNES](https://cnes.fr/en/projects/mission-alpha); [NASA](https://www.nasa.gov/blogs/stationreport/2023/07/10/iss-daily-summary-report-7-10-2023/) |
| Neurowellness in Space | NASA | 2022 | Headset portátil de EEG | Demonstração sem resultados públicos | [NASA](https://www.nasa.gov/blogs/stationreport/2022/04/12/iss-daily-summary-report-4-12-2022/) |
| Sleep in Orbit | ESA e Aarhus University | 2023 | EEG dentro do ouvido; 20 noites com bom sinal | Demonstração e pesquisa | [ESA](https://www.esa.int/articles/about-us/directorates/human-and-robotic-exploration/health-science-in-orbit); [Aarhus](https://ece.au.dk/forskning/forskningscentre/center-for-ear-eeg/projects/sleep-in-orbit) |
| Eye Tracking Device | DLR/ESA e Charité | Expedições 9, 11, 13, 14 e 16 | Rastreamento ocular por câmera; 31 astronautas; não é EOG | Pesquisa ocular em voo | [NASA](https://www.nasa.gov/wp-content/uploads/2022/03/iss_technical_publication_030116.pdf) |
| Actiwatch, Standard Measures | NASA | Coleta longitudinal | Actigrafia de pulso e questionários de sono, humor e equipe | Parte da coleta de rotina | [NASA](https://www.nasa.gov/humans-in-space/spaceflight-standard-measures-characterizing-how-humans-adapt-in-space/) |
| AttentivU e P-POP | MIT Media Lab, com apoio da NASA no voo | 2019 e 2022 | EEG, EOG e condução óssea numa armação; voo parabólico com 6 pessoas | Protótipo; não foi à ISS; foco em atenção | [Kosmyna](https://dam-prod.media.mit.edu/x/2019/05/29/1570522368.pdf); [AIAA](https://www.abstractscorecard.com/uploads/Tasks/upload/21810/DPPWZUCK-1650206-1-PDF.pdf) |
| JINS MEME | JINS (fabricante) | Década de 2010 | Três eletrodos de EOG na armação; piscadas e sonolência | Terrestre; venda direta encerrada em 2024 | [JINS](https://jins-meme.github.io/jinsmeme-platform/en/hardware.html) |
| Project Sidekick (HoloLens) | NASA/JPL e Microsoft | 2015 a 2016; 2021 | Realidade mista para procedimentos e suporte remoto | Demonstração, sem sensor biométrico | [NASA](https://www.nasa.gov/news-release/nasa-microsoft-collaborate-to-bring-science-fiction-to-science-fact/) |
| T2AR | NASA | 2021 | Realidade aumentada para manutenção da esteira T2 | Demonstração | [NASA](https://www.nasa.gov/blogs/stationreport/2021/05/12/iss-daily-summary-report-5-12-2021/) |
| mobiPV com Google Glass | ESA, Space Applications Services e Skytek | 2015 | Procedimentos mãos livres e visão do astronauta para o solo | Teste operacional, não de saúde | [ESA](https://blogs.esa.int/iriss/2015/09/11/introducing-mobipv/) |
| VAMB (VR Mental Care) | ESA | 2023 | Vídeo 360 graus com sons para relaxamento | Demonstração; eficácia não publicada | [NASA](https://www.nasa.gov/blogs/stationreport/2023/12/06/iss-daily-summary-report-12-06-2023/) |
| Space Anticipation Glasses | NASA | Briefing de 2024 | Lentes corretivas de poderes variados | Em uso; sem sensores | [NASA OCHMO](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) |

### 2.5 O que isso muda no pitch

- **Não diga que a combinação é inédita.** O AttentivU já integra EEG, EOG e condução óssea numa armação e voou em parábolas; a Dreem já combina EEG seco e condução óssea e esteve na ISS. [INFERÊNCIA, frente 4, seção 3.4]
- **Diga o que a pesquisa não encontrou demonstrado:** óculos com esses sinais e sons escolhidos pela pessoa, ligados ao acompanhamento de saúde da tripulação, em operação na ISS. [INFERÊNCIA, frente 4, seção 3.4]
- **Não diga que o EOG detecta SANS** (síndrome neuro-ocular associada ao voo espacial). A pesquisa não achou evidência disso; SANS é acompanhada com fundoscopia, OCT (tomografia de coerência óptica), ultrassom e acuidade. [INFERÊNCIA, distinção feita a partir de [NASA OCHMO](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)]

---

## 3. Precedentes do software

### 3.1 Software de saúde usado na ISS e em solo

Leitura do status, como na frente 6: "confirmado" quando uma fonte recente da NASA mostra uso; "última evidência" quando a fonte é histórica; "não confirmado" quando não houve prova pública de uso em 2025 ou 2026. A tabela completa está em [`12-fontes-de-dados-abertas.md`](12-fontes-de-dados-abertas.md), seção 6; aqui ficam os itens que importam para o diferencial.

| Nome | Função | Quem desenvolveu | Desde quando | Ainda em uso | Fonte |
| --- | --- | --- | --- | --- | --- |
| CHeCS e Medical Equipment Computer (MEC) | Arquitetura de saúde a bordo (saúde, ambiente, contramedidas); o MEC é o laptop de operações médicas para registros e transferência | NASA JSC; fornecedor do software não nomeado | Catálogos de 2008 e 2011 | Função confirmada em 2025; versão atual não pública | [catálogo](https://ntrs.nasa.gov/api/citations/20090021477/downloads/20090021477.pdf); [ISS Familiarization](https://ntrs.nasa.gov/api/citations/20250005232/downloads/International%20Space%20Station%20Familiarization.pdf) |
| Space Station Computer (SSC) | Laptop geral onde rodam WinSCAT, KUDUwave e o visualizador de procedimentos | NASA JSC mantém | Citado em requisitos de voo | Sim; não é aplicação clínica única | [LSDA](https://nlsp.nasa.gov/explore/api/v1/getfiles3?alias=lsda&id=IDP-LSDA_DOCUMENT-0000000000002936&type=lsda_document) |
| Medical Information Systems and Tools (MIST) | Suíte em solo: prontuário eletrônico, imagens, banco do LSAH, repositório de missão, exercício, radiação | NASA JSC | Descrição publicada em 2023 | Função confirmada; versão não | [NASA](https://www.nasa.gov/general/medical-information-systems-and-tools-mist/) |
| WinSCAT | Triagem cognitiva autoaplicada | NASA JSC, operações médicas | Expedition 1 | Sim até 2025, mensal; 2026 não confirmado | [PAPER](https://ntrs.nasa.gov/citations/20100036584); [OFICIAL](https://ntrs.nasa.gov/api/citations/20250011491/downloads/BHP%20Operations%20Overview_Navy_Revised.pdf) |
| Cognition Test Battery (CTB) | Dez testes cognitivos de pesquisa | University of Pennsylvania para o HRP | Em voo desde 2016 | Pesquisa; rotina 2025/26 não confirmada; não substitui o WinSCAT | [NASA](https://www.nasa.gov/humans-in-space/spaceflight-standard-measures-characterizing-how-humans-adapt-in-space/); [HRP](https://humanresearchroadmap.nasa.gov/evidence/reports/HRP-ER-BMED-HFBP-20250210.pdf) |
| Reaction Self Test (RST) | Teste de vigilância psicomotora (PVT) de cerca de 3 min, mais sono, fadiga e estresse autorrelatados | NASA com University of Pennsylvania | Estudo com 24 astronautas; projeto concluído (TechPort, 2024) | Rotina 2025/26 não confirmada | [TechPort](https://techport.nasa.gov/projects/23201) |
| ISS Food Intake Tracker (ISS FIT) | App de iPad para registrar alimentos, com envio semanal a nutricionistas | NASA com Topcoder e Astronaut Office | ISS em 2016 | Confirmado até 2024 | [NASA](https://www.nasa.gov/directorates/esdmd/hhp/nutritional-biochemistry/) |
| OnePortal | Interface comum dos equipamentos de exercício (ARED, T2, CEVIS, MED-2) | NASA JSC | Primeiro uso no MED-2 | Ativo | [NASA](https://www.nasa.gov/reference/jsc-exercise-countermeasures/) |
| On-Orbit Hearing Assessment (OOHA) | Audiometria a bordo, revisada em solo | NASA; KUDUwave no SSC | EarQ de 2000 a 2021, depois KUDUwave | KUDUwave usado em 2023 | [PAPER](https://ntrs.nasa.gov/citations/20240009887); [NASA](https://www.nasa.gov/blogs/stationreport/2023/06/21/iss-daily-summary-report-6-21-2023/) |
| Bio-Monitor | Vestível fisiológico (Hexoskin) com tablet, sessões de até 48 h | Canadian Space Agency (CSA) com indústria | Comissionado em 2019 | Instrumento de pesquisa | [CSA](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp) |
| Integrated Medical Model (IMM) | Modelo probabilístico de risco médico e de kit antes do voo, com cerca de 100 condições | NASA HRP | Anos 2000 | Sim, padrão aceito de quantificação de risco (2025) | [NASA](https://www.nasa.gov/nasa-integrated-medical-model-imm-overview/); [NTRS](https://ntrs.nasa.gov/citations/20240012058) |
| MEDPRAT (e IMPACT) | Simulação por eventos discretos; motor do IMPACT, sucessor do IMM em desenvolvimento | ExMC com NASA Glenn, Johnson, Banner Quality Management e Aegis Aerospace | Versões 1.0 e 2.0 avaliadas em 2025 | Engenharia de cenários; não substituiu o IMM | [NTRS](https://ntrs.nasa.gov/citations/20240012058) |
| Medical Data Architecture (MDA) e CDSS | Arquitetura para reunir registros, sensores e imagens, controlar acesso e sustentar apoio à decisão clínica | NASA ExMC | Protótipos em 2018; arquitetura em 2023 | Recomendação, não sistema de voo; tarefa encerrada e passada ao CHP-IDA | [NTRS](https://ntrs.nasa.gov/citations/20220017869); [HRR](https://humanresearchroadmap.nasa.gov/Tasks/task.aspx?i=2134) |
| CHP-IDA | Integração de dados de saúde e desempenho para voo e solo | HRP com NASA JSC/ExMC | Requisitos em FY22 | Em desenvolvimento; demonstração tecnológica em 2025 | [NTRS](https://ntrs.nasa.gov/citations/20240008508); [IWS 2025](https://ntrs.nasa.gov/api/citations/20250000330/downloads/CHP-IDSP%20Project%20Updates_IWS%202025.pdf) |
| Exploration EHR (xEHR) | Prontuário embarcado com envio assíncrono | NASA JSC | Requisitos em 2023 | Projeto; o prontuário de 2023 era só de solo | [NTRS](https://ntrs.nasa.gov/citations/20230003216) |

### 3.2 Monitoramento em tempo real hoje

**O ambiente é contínuo; os sinais vitais da tripulação não são.** O sistema de suporte à vida (ECLSS) controla ar, água, ventilação e pressão, e no Mission Control a posição ETHOS (Environmental and Thermal Operating Systems) acompanha os sistemas ambientais e térmicos; ETHOS é posição de controle, não nome de software, e o software dela não é público. [OFICIAL, [NASA, ECLSS](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/); [NTRS](https://ntrs.nasa.gov/api/citations/20160012370/downloads/20160012370.pdf); [ICES-2025-125](https://ntrs.nasa.gov/api/citations/20250003953/downloads/ICES-2025-125%20Final_Rev%20C.pdf)] O BME (Biomedical Engineer), representante técnico do CHeCS, monitora em tempo real dados bioambientais como CO2 e O2 e encaminha dados fisiológicos e de hardware aos especialistas. [OFICIAL, [NASA, BME](https://www.nasa.gov/directorates/esdmd/hhp/biomedical-flight-controllers/)]

Já para o corpo, a NASA descreve dispositivos médicos separados, usados periodicamente; não há monitoramento contínuo de todos os sinais vitais de cada astronauta na rotina da ISS. [OFICIAL, [NASA Glenn, dispositivos médicos](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/multifunctional-integrated-medical-devices/)] As exceções são pontuais:

| Situação | O que se monitora | Limite | Fonte |
| --- | --- | --- | --- |
| Atividade extraveicular (EVA) | ECG e frequência cardíaca, metabolismo (historicamente estimado a cada 2 minutos), estado do traje, O2 e CO2 do traje | Só na EVA; traje russo Orlan: **NÃO ENCONTRADO** | [NASA-STD-3001 Vol. 2 Rev. B](https://standards.nasa.gov/sites/default/files/standards/NASA/B/0/nasa-std-3001_vol_2_rev_b.pdf); [PAPER](https://ntrs.nasa.gov/citations/20210024317) |
| Exercício | ECG ou frequência cardíaca, desempenho e prescrição, via OnePortal e CHeCS | Por sessão | [NASA](https://www.nasa.gov/reference/jsc-exercise-countermeasures/) |
| Emergência médica | ECG, pressão, SpO2, temperatura e ultrassom, conforme o kit | Acionado por sintoma | [NASA OCHMO](https://www.nasa.gov/wp-content/uploads/2025/08/ochmo-tb-044-medical-operations.pdf) |
| Sessões do Bio-Monitor | ECG, respiração, temperatura da pele, SpO2 e atividade, até 48 h | Pesquisa; dados descarregados depois | [CSA](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp) |
| Smart Flight Suit 2 | Colete de ECG e pulseira de pressão e temperatura, em 2024 | Demonstração, não sistema permanente | [NASA](https://www.nasa.gov/blogs/stationreport/2024/01/25/iss-daily-summary-report-1-25-2024/) |
| Artemis II (ARCHeR) | Pulseiras registraram movimento e sono continuamente | Actigrafia não é sinal vital | [NASA](https://www.nasa.gov/reference/archer/) |

### 3.3 Consoles médicos do Mission Control

O Flight Surgeon coordena a resposta clínica em solo com o BME e especialistas. Entre as atividades publicadas do BME estão monitorar CO2 e O2, encaminhar resultados de exames, doses de radiação e dados de exercício, acompanhar qualidade do ar, da água e ruído, e operar remotamente equipamentos do CHeCS. [OFICIAL, [NASA, Mission Control Crew Health Consoles](https://www.nasa.gov/podcasts/houston-we-have-a-podcast/mission-control-crew-health-consoles/); [NASA, BME](https://www.nasa.gov/directorates/esdmd/hhp/biomedical-flight-controllers/)] Uma análise do console do Flight Surgeon, de 2000, registra a necessidade de integrar dados de várias fontes com entrega oportuna, confiável e segura; é registro histórico, não a tela atual. [PAPER, [NASA NTRS](https://ntrs.nasa.gov/api/citations/20030064063/downloads/20030064063.pdf)]

**NÃO ENCONTRADO:** capturas atuais de painéis clínicos com dados individuais, seus campos, limiares ou regras de acesso. E atenção: esses consoles têm outro usuário, outra finalidade e outro regime de acesso. Não são precedente para mostrar sinais vitais de todos à tripulação. [INFERÊNCIA, frente 7, D3]

### 3.4 Resposta direta

Não existe um aplicativo único da NASA, em 2025 ou 2026, que receba todos os sensores e prescreva tratamento. Existem sistemas de voo separados (CHeCS/MEC, SSC, OnePortal, procedimentos), suítes de solo (MIST) e projetos de integração (MDA, CHP-IDA). Em 2024, a NASA ainda registrava dados de saúde da ISS em locais distintos e baixados à mão. [OFICIAL, [NTRS, CHP-IDA](https://ntrs.nasa.gov/citations/20240008508); INFERÊNCIA, [MDA](https://ntrs.nasa.gov/citations/20220017869)] É nessa lacuna que o Orbit Saúde se posiciona, sem alegar equivalência a um sistema certificado.

---

## 4. Precedentes de IA médica

### 4.1 CMO Digital Assistant e Doc-in-a-Box

Em 7 de agosto de 2025, o Google Public Sector descreveu com a NASA o **Crew Medical Officer Digital Assistant (CMO-DA)**, prova de conceito multimodal para apoiar o Crew Medical Officer (CMO) quando a comunicação com o solo for limitada, treinada com literatura de medicina espacial e avaliada em cenários no formato OSCE (exame clínico objetivo estruturado). A publicação não informa modelo, hardware, métricas numéricas nem prova de operação offline. [FABRICANTE, [Google Cloud](https://cloud.google.com/blog/topics/public-sector/how-google-and-nasa-are-testing-ai-for-medical-care-in-space/)] A imprensa descreve que o sistema roda na plataforma Vertex AI do Google Cloud [SECUNDÁRIA, [TechCrunch, 8 ago. 2025](https://www.techcrunch.com/2025/08/08/nasa-and-google-are-building-an-ai-medical-assistant-to-keep-mars-bound-astronauts-healthy/)]; **a fonte oficial não confirma operação offline.**

Em 2026, um resumo da NASA descreve o CMO-DA integrando modelos de medicina espacial, a Integrated Medical Evidence Library, risco probabilístico, ultrassom Butterfly iQ3 e o AMOS, com demonstração em missão espacial **simulada**. [OFICIAL, [NTRS, 2026](https://ntrs.nasa.gov/citations/20260001797)] O programa da AsMA 2026 cita uma demonstração em computador de borda com MedGemma e um classificador de imagem com 98% de acurácia para cálculo renal; os 98% são desse classificador, não do CMO-DA inteiro, e a demonstração não prova equipamento qualificado para voo. [PAPER, [AsMA 2026](https://asma.org/wp-content/uploads/2026/04/AsMA_Program-Book_edited_draft-1.pdf)]

O **Doc-in-a-Box**, do projeto LuCCI, é um modelo de linguagem de 8 bilhões de parâmetros, reduzido do OpenBio LLM de 80 bilhões e treinado com livros de medicina aeroespacial. Na avaliação OSCE, três médicos deram de 68 a 83 pontos em 100 (média 76), com dificuldade em casos atípicos e nota menor em terapia. O resumo escreve "sem diferença significativa (p < 0,05)", formulação inconsistente; não repita esse resultado estatístico sem esclarecimento. Nada prova que seja o mesmo modelo do CMO-DA. [PAPER, [NTRS, AsMA 2025](https://ntrs.nasa.gov/api/citations/20240012747/downloads/AsMA%202025%20OSCE%20for%20AI%20project_EC.pdf)]

### 4.2 ExMC, CDSS, MDA, EIMO e AMOS

**EIMO** (Earth-Independent Medical Operations) é a transferência gradual da decisão médica para recursos a bordo, à medida que crescem atraso de comunicação e impossibilidade de evacuação; a NASA descreve a ISS como dependente do solo em tempo quase real. [OFICIAL, [NTRS](https://ntrs.nasa.gov/citations/20240001402); [NASA Ames, CDSS para EIMO](https://www.nasa.gov/centers-and-facilities/ames/ames-science/ames-space-biosciences/a-clinical-decision-support-system-for-earth-independent-medical-operations/)] A **ExMC** (Exploration Medical Capability) trata o apoio clínico de bordo como combinação de dados, equipamentos, procedimentos, conhecimento e treinamento, não só de um modelo de IA; o documento de casos de uso é base de requisitos, não médico virtual aprovado. [OFICIAL, [ExMC, casos de uso de CDS](https://ntrs.nasa.gov/api/citations/20220017885/downloads/HRP-48069%20ExMC%20CDS%20Use%20Cases%20Doc%20Rev.%20B%20-%20MK%20BB%20BE%20AM%20signed.pdf)]

A **MDA** é o precedente mais próximo do painel do Orbit Saúde: o Test Bed 1.5 juntou dados biométricos de um vestível (Astroskin) por telemetria com dados ambientais de um simulador do ECLSS, em teste de solo na NASA Johnson. O relatório chama os produtos de protótipos e não relata validação clínica em astronautas. [OFICIAL, [status do MDA, 2018](https://www.nasa.gov/wp-content/uploads/2018/04/medical_data_architecture_project_status-_m._krihak.pdf)]

O **AMOS** (Autonomous Medical Officer Support) é a demonstração com evidência operacional mais forte: orientação passo a passo para ultrassom renal e vesical, demonstrada na ISS em abril de 2020 e junho de 2022 com operadores sem treinamento específico. Orienta o procedimento; não recebe todos os dados nem decide tratamento. [OFICIAL, [NTRS, 2024](https://ntrs.nasa.gov/citations/20240012964)]

### 4.3 CIMON: a lição da nuvem

O CIMON (Crew Interactive MObile companioN), da Airbus para o DLR, com IBM Watson e a LMU de Munique, demonstrou interação por voz e apoio a tarefas na ISS em 2018, sem função médica. A fala dependia da IBM Cloud por enlace de satélite, então o desenho **não era offline**. O CIMON-2 foi à ISS em dezembro de 2019; operação em 2025 e 2026 não confirmada. [OFICIAL, [DLR, 2018](https://www.dlr.de/en/latest/news/2018/4/20181116_cimon-alexander-gerst-iss); [DLR, 2020](https://www.dlr.de/en/latest/news/2020/02/20200415_cimon-2-makes-its-debut-on-the-iss/)]

### 4.4 Tabela dos precedentes de IA

| Nome | Quem | Ano | O que faz | Offline? | Status | Fonte |
| --- | --- | --- | --- | --- | --- | --- |
| CMO-DA | NASA HRP, Google Public Sector e parceiros clínicos | 2025 a 2026 | Apoio multimodal ao CMO, com imagem e procedimentos | Não confirmado pela fonte oficial; imprensa cita Vertex AI [SECUNDÁRIA]; teste de borda em 2026 sem qualificação | Prova de conceito e missão simulada | [Google](https://cloud.google.com/blog/topics/public-sector/how-google-and-nasa-are-testing-ai-for-medical-care-in-space/); [NASA](https://ntrs.nasa.gov/citations/20260001797); [TechCrunch](https://www.techcrunch.com/2025/08/08/nasa-and-google-are-building-an-ai-medical-assistant-to-keep-mars-bound-astronauts-healthy/) |
| Doc-in-a-Box | Projeto LuCCI (NASA, KBR, universidades) | 2025 | Modelo de linguagem de 8 bilhões de parâmetros testado em OSCE | NÃO ENCONTRADO | Avaliação preliminar | [NTRS](https://ntrs.nasa.gov/api/citations/20240012747/downloads/AsMA%202025%20OSCE%20for%20AI%20project_EC.pdf) |
| ExMC CDSS e MDA | NASA ExMC/HRP | 2017 a 2023 | Arquitetura de dados clínicos, sensores, ambiente e apoio à decisão | Conceito de bordo; conectividade não publicada | Protótipos e requisitos | [MDA](https://www.nasa.gov/wp-content/uploads/2018/04/medical_data_architecture_project_status-_m._krihak.pdf) |
| EIMO | NASA | Em curso | Levar a decisão médica para bordo | É o próprio objetivo | Paradigma de pesquisa | [NTRS](https://ntrs.nasa.gov/citations/20240001402) |
| AMOS | NASA JSC/ExMC e KBR | 2020 a 2024 | Orientação passo a passo de ultrassom | Compatível com autonomia; implementação offline não publicada | Demonstrado na ISS; sem rotina | [NTRS](https://ntrs.nasa.gov/citations/20240012964) |
| IMCA | Contratado SBIR da NASA | 2021 a 2026 | Assistente de voz com procedimentos, AR/VR e ML de risco | NÃO ENCONTRADO | Concluído; sem voo | [TechPort](https://techport.nasa.gov/projects/113303) |
| MedICS | NASA Ames e SGT | 2020 | Redes profundas para imagens e prontuários, com dados terrestres | NÃO ENCONTRADO | Desenvolvimento em 2020 | [NTRS](https://ntrs.nasa.gov/citations/20200000615) |
| CIMON e CIMON-2 | DLR, Airbus, IBM e LMU | 2018 a 2020 | Robô conversacional, sem diagnóstico | Não: a fala dependia da IBM Cloud | Demonstração histórica | [DLR](https://www.dlr.de/en/latest/news/2018/4/20181116_cimon-alexander-gerst-iss) |

### 4.5 O que isso muda no pitch

Não diga "primeira IA médica espacial", "sem precedentes" ou "roda no computador da ISS". A NASA já documentou arquitetura médica integrada e apoio clínico para autonomia, e o CMO-DA trabalha com informação multimodal. O recorte defensável é a forma de organizar a experiência: linha de base pessoal com leituras do corpo e do ambiente, numa figura humana, com estado, evidências, origem do dado e próximo passo. [INFERÊNCIA, frente 13, D5; OFICIAL, [ExMC](https://ntrs.nasa.gov/api/citations/20220017885/downloads/HRP-48069%20ExMC%20CDS%20Use%20Cases%20Doc%20Rev.%20B%20-%20MK%20BB%20BE%20AM%20signed.pdf)] O protótipo explica alertas com regras e evidências aprovadas, sem texto gerado livremente; modelo de linguagem local fica para a visão operacional. [INFERÊNCIA, frente 13, D2; [`05-arquitetura-software.md`](05-arquitetura-software.md), seção 4]

---

## 5. Monitoramento entre colegas

### 5.1 O que existe

| Precedente | O que mostra | O que não autoriza | Fonte |
| --- | --- | --- | --- |
| Crew Medical Officer (CMO) | Tripulante designado, com treinamento médico específico; pode ou não ser médico; ao menos dois CMOs treinados por veículo ou plataforma | Acesso irrestrito de todos aos registros médicos | [OFICIAL, V1 5003 e V1 3006](https://www.nasa.gov/reference/5-0-training/) |
| CMO na JAXA | Faz testes médicos e atende colega doente ou ferido, seguindo o Flight Surgeon em solo | Cuidado sem o suporte profissional do solo | [OFICIAL, JAXA](https://humans-in-space.jaxa.jp/en/biz-lab/med-in-space/healthcare/medops/system/) |
| Treinamento médico geral | Cada tripulante treina para cuidar de si e dos outros | Monitor coletivo de sinais vitais identificados | [OFICIAL, V1 5002](https://www.nasa.gov/reference/5-0-training/) |
| Sistema buddy na EVA | EV1 e EV2 trabalham juntos; segurança é responsabilidade compartilhada | Dados clínicos de rotina visíveis a todos | [PAPER, NTRS](https://ntrs.nasa.gov/api/citations/20140013480/downloads/20140013480.pdf?attachment=true) |
| SIRIUS (isolamento em solo) | Um tripulante faz papel de médico; verificações diárias vão direto aos médicos; há conferência privada; quem nota desvio avisa a equipe médica | Transformar o painel de todos em prontuário coletivo | [PAPER, MDPI](https://www.mdpi.com/2226-4310/10/6/518) |
| Estações na Antártida | O médico pergunta ao paciente se quer compartilhar informação médica com a comunidade, e quanto | Regra universal de agência (é relato de um médico) | [PAPER, relato](https://journals.sagepub.com/doi/10.1580/1080-6032-020.004.0383) |

### 5.2 A regra que falta

A NASA exige tratamento seguro dos registros de saúde e, citando o Privacy Act de 1974, diz que não podem ser divulgados sem consentimento (V1 7003); as comunicações médicas e psicológicas com o solo são privadas (V1 6003 e V1 6011). [OFICIAL, [NASA-STD-3001 Vol. 1, registros](https://www.nasa.gov/reference/7-0-crew-health-records/); [operações médicas](https://www.nasa.gov/reference/6-0-medical-operations/)] A orientação ética das National Academies para missões longas alerta que a exposição pode causar estigma e que o receio de divulgação pode reduzir a disposição de relatar problemas de saúde. [DIRETRIZ-TERRA, [National Academies, 2014](https://www.nationalacademies.org/read/18576/chapter/7)]

**NÃO ENCONTRADO:** regra pública da NASA que autorize mostrar dados clínicos individuais num monitor coletivo; exceção geral que deixe o CMO ignorar a configuração de privacidade; política pública da ISS sobre quais indicadores os colegas podem ver; estudo em HERA, SIRIUS ou NEEMO que teste um painel coletivo de saúde e meça estigma ou subnotificação. Isso não é permissão nem proibição; é ausência de regra pública. [OFICIAL, [V1 6008 e V1 6009](https://www.nasa.gov/reference/6-0-medical-operations/); INFERÊNCIA, frente 7, D5]

### 5.3 Consequência no Orbit Saúde

Como não há regra pública, o Monitor geral (T1) só mostra o que cada pessoa escolheu compartilhar, com quem (só eu, CMO, médico de voo, colega escolhido ou tripulação) e por quanto tempo. "Não compartilhado" é texto neutro, nunca cor de alerta; a filtragem acontece no motor; não há acesso emergencial irrestrito codificado. Detalhes em [`07-design-interface.md`](07-design-interface.md), T1, e regra 9 do [`../AGENTS.md`](../AGENTS.md). Esse é um diferencial real: os precedentes de cuidado mútuo são papéis e conversas, nenhum é ferramenta digital com consentimento granular. [INFERÊNCIA, frente 7, D5]

---

## 6. Matriz de diferencial

Legenda: ✓ coberto; ◐ parcial, ou demonstrado sem validação no uso proposto; vazio: não cobre ou a fonte não informa. Na coluna "Validação em missão", ✓ é uso ou teste em voo espacial e ◐ é só análogo, voo parabólico, missão simulada ou voo sem resultado de eficácia publicado. A matriz compara a função demonstrada, não a simples presença de uma peça. [INFERÊNCIA, a partir das seções 2 a 5 e da [frente 4, seção 8.2](../pesquisa/bruto/04-precedentes-oculos-sono.md)]

| Precedente | Painel corpo e ambiente | Offline | Explicável com fonte | Figura humana | Colegas com consentimento | Condução óssea | EEG | EOG | Sons culturais | Validação em missão |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| NASA xEMU (2024) | | | | | | ✓ voz no traje | | | | |
| Skylab M133 (1973) | | | | | | | ✓ | ✓ | | ✓ |
| Neurolab (1998) | | | | | | | ✓ | ✓ | | ✓ |
| Nightcap, Mir | | | | | | | | ◐ pálpebra e corpo | | ✓ |
| Dreem / Dreams (2021) | | | | | | ◐ no produto, sem uso em voo | ✓ | | ◐ sons de pré-sono, sem natureza nem cultura | ✓ |
| Sleep in Orbit (2023) | | | | | | | ✓ no ouvido | | | ✓ |
| AttentivU / P-POP | | | | | | ✓ | ✓ | ✓ | ◐ feedback de áudio | ◐ voo parabólico |
| ETD da ISS | | | | | | | | ◐ câmera, não EOG | | ✓ |
| JINS MEME | | | | | | | | ✓ na armação | | |
| ESA VAMB (2023) | | | | | | | | | ◐ natureza em vídeo e som, sem cultura | ◐ sem eficácia publicada |
| CHeCS/MEC e console do BME | ◐ sistemas separados, dados ao solo | | | | | | | | | ✓ em operação |
| MDA e CHP-IDA | ◐ vestível e simulador do ECLSS em solo | ◐ conceito de bordo | ◐ recomenda linhagem do dado | | | | | | | |
| CMO-DA (NASA e Google) | | ◐ teste de borda, sem qualificação | | | | | | | | ◐ missão simulada |
| AMOS | | ◐ não publicado | | | | | | | | ✓ ISS, 2020 e 2022 |
| CIMON | | não, nuvem IBM | | | | | | | | ✓ sem função médica |
| CMO e buddy na EVA | | | | | ◐ papéis, sem ferramenta | | | | | ✓ |
| SIRIUS | | | | | ◐ colegas avisam a equipe médica | | | | | ◐ análogo |
| Antártida (relato médico) | | | | | ◐ paciente escolhe o que compartilhar | | | | | ◐ análogo |
| **Orbit (proposta)** | **✓ proposto** | **✓ proposto** | **✓ regra, leituras e fonte** | **✓ sugerida pelo desafio** | **✓ por indicador, audiência e período** | **✓ opcional, a validar** | **✓ a validar contra PSG** | **✓ auxiliar, sem SANS** | **✓ escolha da pessoa, sem validação** | **◐ plano: solo, análogo e voo** |

Como ler:

1. **A linha do Orbit é proposta, não demonstração.** O ✓ ali quer dizer "o projeto propõe", com autorização, privacidade, validação e protocolo clínico ainda por definir. [INFERÊNCIA, frente 4, seção 8.2] O plano de validação está em [`09-oculos-orbit.md`](09-oculos-orbit.md), seção 9.
2. **Nenhum precedente atravessa as colunas de hardware e de software.** Os experimentos do óculos não têm painel nem cuidado mútuo; os sistemas de software não têm sensores no rosto; os precedentes de cuidado mútuo não têm ferramenta digital. As sobreposições mais próximas são o AttentivU e a Dreem (óculos) e a MDA e o CMO-DA (software).
3. **Explicável com fonte e consentimento granular** são as colunas mais vazias. São também as que mais dependem de regra de projeto ([`../AGENTS.md`](../AGENTS.md), regras 1, 7 e 9) e menos de hardware, o que as torna demonstráveis já no protótipo.

---

## 7. Frases para o slide

Cada frase cabe num slide e tem a fonte ao lado.

1. **"Na ISS, o ambiente é acompanhado o tempo todo; os sinais vitais de cada astronauta, só periodicamente, com aparelhos separados."** [OFICIAL, [NASA, BME](https://www.nasa.gov/directorates/esdmd/hhp/biomedical-flight-controllers/); [NASA Glenn](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/multifunctional-integrated-medical-devices/)]
2. **"Em 2024, a própria NASA registrava dados de saúde da ISS em lugares diferentes e baixados à mão. O Orbit Saúde junta corpo e ambiente numa tela só."** [OFICIAL, [NTRS, CHP-IDA](https://ntrs.nasa.gov/citations/20240008508)]
3. **"Quanto mais longe da Terra, mais a medicina precisa funcionar a bordo; a NASA chama isso de EIMO. O Orbit Saúde foi desenhado para funcionar sem rede."** [OFICIAL, [NTRS, EIMO](https://ntrs.nasa.gov/citations/20240001402); [`05-arquitetura-software.md`](05-arquitetura-software.md), P1]
4. **"EEG, EOG e condução óssea numa armação já existem (AttentivU, MIT). O nosso passo é ligar o óculos ao painel de saúde da tripulação, offline, com sons que cada pessoa escolhe."** [PAPER, [Kosmyna et al., 2019](https://dam-prod.media.mit.edu/x/2019/05/29/1570522368.pdf); INFERÊNCIA, frente 4, seção 8.2]
5. **"A NASA trata a comunicação médica como privada e não tem regra pública para um monitor coletivo de saúde. No Orbit, cada tripulante decide o que mostra, a quem e por quanto tempo."** [OFICIAL, [V1 7003](https://www.nasa.gov/reference/7-0-crew-health-records/); [V1 6003](https://www.nasa.gov/reference/6-0-medical-operations/); NÃO ENCONTRADO, frente 7, D5]
6. **"A NASA e o Google testam desde 2025 um assistente de IA para o médico de bordo, ainda em prova de conceito. O Orbit não diagnostica: cada alerta mostra as leituras, a regra e a fonte."** [FABRICANTE, [Google Cloud](https://cloud.google.com/blog/topics/public-sector/how-google-and-nasa-are-testing-ai-for-medical-care-in-space/); OFICIAL, [NTRS, 2026](https://ntrs.nasa.gov/citations/20260001797); [`../AGENTS.md`](../AGENTS.md), regras 5 e 7]

Frases a evitar, com o motivo: "combinação inédita de EEG, EOG e condução óssea" (AttentivU); "primeira IA médica espacial" ou "sem precedentes" (CMO-DA, MDA, AMOS); "detecta SANS" (sem evidência); "roda no computador da ISS", "aprovado pela NASA" ou "certificado" (nada foi qualificado); "terapia sonora" ou "melhora o sono" (sem estudo com astronautas). [INFERÊNCIA, frente 4, seções 3.4 e 6.1; frente 13, D5]

---

## 8. Lacunas

O que a pesquisa não conseguiu confirmar. Nada disso entra no pitch como fato.

- **Condução óssea em microgravidade:** nenhum teste auditivo com transdutor ósseo numa tripulação em voo. Faltam inteligibilidade de alarmes, vazamento de som e conforto em uso longo.
- **EOG e SANS:** nenhuma evidência de que EOG em armação preveja edema de disco óptico ou outra manifestação de SANS.
- **Sons e cultura:** nenhum estudo localizado testou som de natureza por condução óssea como intervenção de sono com astronautas, nem sons escolhidos por cultura como intervenção de saúde. Buscas em HERA, Mars-500, SIRIUS e HI-SEAS não acharam intervenção sonora isolada.
- **CMO-DA:** modelo, tamanho, hardware, inferência offline e métricas consolidadas não foram encontrados. A plataforma Vertex AI aparece só na imprensa [SECUNDÁRIA]. Não se sabe se o Doc-in-a-Box é o mesmo modelo.
- **Doc-in-a-Box:** a frase sobre significância estatística ("sem diferença significativa" junto de "p < 0,05") é ambígua; não reinterpretar sem os autores.
- **Status em 2025 e 2026:** WinSCAT em 2026, ISS FIT, CTB e RST em 2025/26, rotina do AMOS, operação do CIMON-2 e implantação do CHP-IDA não estão confirmados em fonte pública.
- **Consoles e software interno:** telas atuais do Flight Surgeon e do BME, software do ETHOS e APIs do CHeCS e do MIST não são públicos. Não inventar nome de produto nem tela.
- **Traje russo Orlan:** campos biomédicos e frequência: NÃO ENCONTRADO.
- **Óculos de mercado na ISS:** Vuzix e Epson Moverio: NÃO ENCONTRADO.
- **Monitor coletivo:** regra pública para monitor de saúde entre colegas, acesso emergencial do CMO e estudo de usabilidade que meça estigma ou subnotificação: NÃO ENCONTRADO (seção 5.2).
- **Validação de produto:** nenhum dos diferenciais da seção 6 foi testado com tripulantes. O caminho proposto é solo, depois análogo (HERA, CHAPEA ou estação polar) e só então voo. [INFERÊNCIA, frente 4, seção 7.3]

**Divergências entre as fontes, para quem for manter este documento:**

- A frente 13 etiqueta o blog do Google sobre o CMO-DA como [FABRICANTE] em D1 e na tabela de precedentes, mas como [OFICIAL] na tabela de D5 e no resumo executivo. Este documento usa [FABRICANTE], porque é publicação do parceiro e não relatório da NASA.
- Sobre a MDA, a frente 6 a descreve como "recomendação, não sistema de voo", a frente 7 diz que a tarefa foi encerrada e o trabalho passou ao CHP-IDA, e a frente 13 diz que a mesma página ainda classifica o produto como protótipo de arquitetura de dados. As três leituras são compatíveis: protótipo encerrado, sucedido pelo CHP-IDA.
- O AMOS aparece na frente 6 como "demonstração na ISS" sem data; a frente 13 dá abril de 2020 e junho de 2022. Este documento usa as datas da frente 13.
