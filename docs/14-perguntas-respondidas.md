# 14. Perguntas respondidas

> Para quem: toda a equipe.
> De onde vêm as perguntas: aba "Dúvidas" e seção "Precedentes" do "Passo 0" do [documento inicial](../pesquisa/documento-inicial.md).
> Como ler: cada seção traz a resposta curta em negrito, a explicação e as fontes (URL oficial e o documento que aprofunda). Onde a pesquisa mostrou que o documento inicial estava impreciso, a correção vem marcada como **Correção**.
> Etiquetas de confiança como em [`00-guia-de-leitura.md`](00-guia-de-leitura.md). Fatos verificados em 15/11/2026 pela pesquisa em [`../pesquisa/bruto/`](../pesquisa/bruto/).

---

## 0. Correções ao documento inicial, em uma tabela

| O documento inicial dizia | A pesquisa mostrou | Seção |
| --- | --- | --- |
| "70% a 81% dos astronautas" têm sinal de SANS e "15% a 20%" têm nível preocupante | A NASA informa cerca de 70% com ao menos um sinal e cerca de 18% clinicamente preocupante. Os 81% (52 de 64) vêm de outra coorte, com métodos variados. Não é uma faixa única | 2 |
| "47% a 48% dos olhos" exigem correção óptica | 48,2% dos olhos (27 de 56) tiveram deslocamento hipermetrópico médio de +0,12 dioptria. Mudar o grau não é precisar de nova correção | 2 |
| Oftalmoscópio, OCT e tonômetro servem para mitigar o SANS | São instrumentos de vigilância e diagnóstico, não de mitigação | 2 |
| Dose de 80 a 160 mSv em seis meses | Faixa de uma proposta de estudo; a síntese técnica posterior da NASA traz 50 a 100 mSv | 3 |
| Astroskin mede pressão arterial | Estima só a sistólica, pelo tempo de trânsito do pulso, sem manguito | 1 |
| Astroskin monitora as funções básicas de vida | É vestível de pesquisa usado em sessões, não monitor contínuo da tripulação | 1 |
| Tempus PRO aparece como equipamento médico da ISS | É candidato para exploração, testado em solo; não confirmado como operacional na ISS | 4 e 5 |
| CAD "do tamanho de duas pilhas AA" | NÃO ENCONTRADO nas fontes da pesquisa | 3 |
| Dados do corpo apresentados "em tempo real" | Na ISS só o ambiente é contínuo; o dado do corpo chega por sessão, exame ou amostra | 13 |

---

## 1. Como funciona a roupa Astroskin? E qual a diferença para o Bio-Monitor?

**Astroskin é uma camiseta instrumentada da Carré Technologies (família Hexoskin), com faixa de cabeça para SpO2 e um módulo que grava ECG, respiração, SpO2, pressão sistólica estimada, temperatura da pele e movimento. O Bio-Monitor é o sistema da Canadian Space Agency (CSA) levado à ISS em dezembro de 2018; as fontes não permitem afirmar que sejam o mesmo aparelho.**

Como cada sensor funciona [OFICIAL](https://www.asc-csa.gc.ca/eng/funding-programs/funding-opportunities/ao/2018-lsrs.asp) [OFICIAL](https://ntrs.nasa.gov/api/citations/20150021842/downloads/20150021842.pdf):

| Sinal | Como mede | Unidade | Taxa publicada |
| --- | --- | --- | --- |
| Eletrocardiograma (ECG) | Eletrodos têxteis no tórax captam a atividade elétrica do coração (duas derivações no Astroskin) | mV; frequência cardíaca em bpm | 256 Hz |
| Respiração | Sensores na malha sobre tórax e abdômen captam a expansão | respirações/min; volume corrente em mL; ventilação em L/min | 128 Hz |
| SpO2 | Sensor óptico na faixa de cabeça | % e pulso em bpm | Pelo menos 64 Hz (Bio-Monitor) |
| Pressão arterial | **Estimada** pelo tempo de trânsito entre o ECG e a onda de pulso; só sistólica | mmHg | 1 Hz (estudo do Astroskin) |
| Temperatura da pele | Sensor em contato com a pele | °C | Atualização a 1 Hz |
| Movimento | Acelerômetro triaxial no módulo | g | Pelo menos 64 Hz |

| Diferença | Astroskin (documentos da NASA) | Bio-Monitor (CSA, na ISS) |
| --- | --- | --- |
| Onde foi usado | Avaliações da NASA Ames e da CSA em solo e em análogos [OFICIAL](https://ntrs.nasa.gov/api/citations/20205009977/downloads/NASA_TM_20205009977.pdf) | Chegou à ISS em dezembro de 2018, comissionado em 2019 [OFICIAL](https://www.nasa.gov/blogs/stationreport/2019/02/28/iss-daily-summary-report-2-28-2019/) |
| Gravação | Até 24 h, quatro pilhas AA | Até 48 h de gravação contínua [OFICIAL](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp) |
| Aplicativo | App móvel por Bluetooth Low Energy; software no laptop importa a sessão | Tablet dedicado |
| Arquivo | CSV no estudo da NASA | Formato bruto NÃO ENCONTRADO |
| Saída para o solo | Descarga para computador depois da sessão | Módulo na base, depois downlink pelas comunicações da estação |
| Uso | Pesquisa | Pesquisa (Vascular Aging, Space Health, Vascular Calcium); não é telemetria médica de todos |

**Correção.** O documento inicial lista "pressão arterial" e chama a camiseta de monitor das "funções básicas de vida". Na verdade a pressão é só sistólica estimada, sem manguito, e o uso é por sessão de pesquisa, não monitoramento contínuo. Para o software, isso vira os estados "gravado, aguardando transferência" de `Leitura.disponibilidade` em [`06-modelo-de-dados.md`](06-modelo-de-dados.md).

**Fontes:** [CSA, Bio-Monitor](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp); [CSA, especificação de 2018](https://www.asc-csa.gc.ca/eng/funding-programs/funding-opportunities/ao/2018-lsrs.asp); [NASA, avaliação do Astroskin](https://ntrs.nasa.gov/api/citations/20205009977/downloads/NASA_TM_20205009977.pdf); [NASA, estudo de amostragem do Astroskin](https://ntrs.nasa.gov/api/citations/20150021842/downloads/20150021842.pdf). Aprofundar: [`../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md), seção D3.

---

## 2. O que é feito para mitigar ou reduzir o SANS?

**Hoje a NASA vigia e corrige: exames oculares em janelas fixas da missão (acuidade, grade de Amsler, fundo de olho, OCT, ultrassom e tonometria) e óculos de graus diferentes para a mudança de visão. As fontes da pesquisa não registram uma contramedida preventiva aprovada, e a causa do SANS ainda não é totalmente conhecida.**

A Spaceflight Associated Neuro-ocular Syndrome (SANS) reúne edema do disco óptico, achatamento posterior do globo, dobras coriorretinianas e mudanças de refração em parte dos tripulantes de missões longas. A hipótese é a redistribuição de fluidos em direção à cabeça; a patogênese permanece incompletamente conhecida. [OFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) [OFICIAL](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=105)

**Correção dos números.** O briefing técnico da NASA (OCHMO-MTB-001) diz que cerca de **70%** da tripulação de missões longas tem ao menos um sinal e cerca de **18%** tem SANS clinicamente preocupante. Uma coorte histórica NASA/ESA achou pelo menos um critério em **81%** (52 de 64 astronautas), com métodos e momentos de exame variados. São estimativas de coortes e definições diferentes. [OFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) [PAPER](https://pmc.ncbi.nlm.nih.gov/articles/PMC13462731/) O dado de "47% a 48% dos olhos" vem de um estudo em que 27 de 56 olhos (48,2%) tiveram **deslocamento hipermetrópico** médio de +0,12 dioptria; isso não significa que esses olhos precisaram de correção. [PAPER](https://pubmed.ncbi.nlm.nih.gov/40194644/) O briefing da NASA relata mudança de pelo menos 0,75 dioptria em cerca de 15% dos olhos ou participantes e nenhuma perda visual incurável no levantamento. [OFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)

O que existe hoje:

| Medida | O que é | Detalhe |
| --- | --- | --- |
| Vigilância programada | Exames em FD30, FD90, depois a cada 90 dias, R-30 e pós-voo | Acuidade e Amsler podem ser feitos pelo próprio tripulante; OCT, fundo de olho e tonometria exigem equipamento e protocolo [OFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) |
| Correção óptica | Cada tripulante leva ao menos três pares de lentes de graus diferentes ("Space Anticipation Glasses") | Compensa o deslocamento hipermetrópico; não trata a causa [OFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) |
| Conduta pós-voo | Aumento de pelo menos 55 µm na espessura retiniana peripapilar e/ou edema Frisén grau I ou maior leva a considerar punção lombar | Critério pós-voo, não alarme em voo [OFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) |

**Correção do papel dos instrumentos.** Oftalmoscópio (fundo de olho), OCT e tonômetro não mitigam: eles detectam e acompanham. O tonômetro mede pressão **intraocular**, não intracraniana. [OFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)

No Orbit Saúde: o cenário C3 ([`05-arquitetura-software.md`](05-arquitetura-software.md), 3.3) usa Amsler e acuidade como autoavaliação e sugere exame com o médico de voo; nunca diagnostica. Sem queixa não quer dizer sem SANS, porque há sinais objetivos com pouca percepção [OFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf), e não há evidência de que o EOG do óculos detecte SANS ([seção 11](#11-a-nasa-já-usa-eeg-e-eog-portátil-ou-em-módulo)).

**Fontes:** [NASA OCHMO-MTB-001, SANS](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf); [NASA HRR, risco SANS](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=105); [coorte de 64 astronautas](https://pmc.ncbi.nlm.nih.gov/articles/PMC13462731/); [estudo de refração](https://pubmed.ncbi.nlm.nih.gov/40194644/). Aprofundar: [`../pesquisa/bruto/03-riscos-indicadores-limiares.md`](../pesquisa/bruto/03-riscos-indicadores-limiares.md) (SANS) e [`../pesquisa/bruto/04-precedentes-oculos-sono.md`](../pesquisa/bruto/04-precedentes-oculos-sono.md), 4.2.

---

## 3. Como é medida a radiação na ISS?

**Em três camadas: instrumentos de área ativos (RAD, REM, HERA, DOSTEL) e passivos (RAM, Area PADLES); dosímetros pessoais (CAD ativo e CPD passivo, lido na Terra); e a análise do Space Radiation Analysis Group (SRAG), no Johnson Space Center, que transforma as medidas em dose por órgão e dose efetiva. Para seis meses, a síntese técnica mais recente da NASA traz 50 a 100 mSv, não 80 a 160 mSv.**

| Camada | Instrumento | Como funciona e situação |
| --- | --- | --- |
| Área, ativo | ISS-RAD (RAD) | Partículas carregadas e nêutrons rápidos; feito pelo Southwest Research Institute; no LAB106 desde maio de 2020; pode gerar alarme local de taxa de dose [OFICIAL](https://ntrs.nasa.gov/api/citations/20250008430/downloads/ISS-RAD_SC25_WRMISS-2025-V2.pdf) [OFICIAL](https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm) |
| Área, ativo | REM e HERA (tecnologia Timepix) | Pixels de silício registram cada partícula; REM na ISS desde 2012; HERA, feito para o alerta do Orion, coleta dados na ISS desde abril de 2021 [OFICIAL](https://three.jsc.nasa.gov/articles/CurrentActiveDetectors.pdf) [OFICIAL](https://techport.nasa.gov/projects/10581) |
| Área, ativo e passivo | DOSIS-3D e DOSTEL (ESA/DLR) | 11 pontos passivos no Columbus e telescópios de silício ativos [OFICIAL](https://sdg.esa.int/activity/dosis-3d-4039) |
| Área, passivo | RAM e Area PADLES (JAXA) | Acumulam dose no local e são lidos na Terra; sem leitura em tempo real [OFICIAL](https://ntrs.nasa.gov/api/citations/20180006494/downloads/20180006494.pdf) [OFICIAL](https://iss.jaxa.jp/en/kiboexp/pm/padles/) |
| Pessoal, ativo | Crew Active Dosimeter (CAD) | Direct Ion Storage: a radiação altera a carga num transistor e a calibração traduz em dose. Tem display de papel eletrônico e Bluetooth; mede dose absorvida acumulada e taxa recente. Feito pela Mirion (tecnologia Instadose), em uso desde 2020 (Crew-1). Dados vão a laptops e descem ao SRAG; não calcula dose efetiva [OFICIAL](https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm) [OFICIAL](https://ntrs.nasa.gov/api/citations/20230009510/downloads/Barzilla_ICES2023_RGaza_compressed.pdf) [PAPER](https://three.jsc.nasa.gov/bibliography/) |
| Pessoal, passivo | Crew Passive Dosimeter (CPD) | TLD, OSLD e PNTD usados o tempo todo, inclusive em EVA; leitura em laboratório depois do voo [OFICIAL](https://ntrs.nasa.gov/api/citations/20090021477/downloads/20090021477.pdf) |
| Análise | SRAG (JSC) | Junta detectores, modelos do campo magnético e órbita; apoio ampliado em eventos solares e EVA [OFICIAL](https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm) |

O LIDAL, citado no documento inicial, fica no Columbus e voltou à EXPRESS Rack 3 em setembro de 2021; não há prova aberta de que siga ativo em novembro de 2026. [OFICIAL](https://www.nasa.gov/blogs/stationreport/2021/09/10/iss-daily-summary-report-9-10-2021/) O tamanho do CAD citado no documento inicial ("duas pilhas AA") é NÃO ENCONTRADO nas fontes.

Unidades: gray (Gy) mede dose **absorvida**; sievert (Sv) mede dose **equivalente** ou **efetiva**. Uma não vira a outra sem o fator do tipo de radiação. [OFICIAL](https://ntrs.nasa.gov/citations/20080026203)

**Correção da dose.** A faixa de 80 a 160 mSv em seis meses aparece numa proposta NIAC; uma síntese técnica posterior da NASA resume 50 a 100 mSv, cerca de 0,28 a 0,56 mSv por dia de dose efetiva média. O valor muda com ciclo solar, órbita e blindagem. [OFICIAL](https://ntrs.nasa.gov/api/citations/20250002403/downloads/NIAC_2022_PhI_DOnghia_CREWHat.pdf) [OFICIAL](https://ntrs.nasa.gov/api/citations/20240008451/downloads/PASM_070124_to%20pubpress_Final.pdf) Limite de carreira: menos de 600 mSv efetivos. Limites de 30 dias por órgão: medula 0,25 Gy-eq, cristalino 1,0 e pele 1,5. [OFICIAL](https://ntrs.nasa.gov/api/citations/20240006194/downloads/OCHMO%20STD%20100%201A%2005142024.pdf?attachment=true) Em evento solar, NOAA avisa o SRAG, que coordena com o controle e o médico de voo; a tripulação pode se abrigar nos Crew Quarters, no US Lab ou na parte de trás do Service Module. [OFICIAL](https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm)

**Fontes:** [NASA SRAG](https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm); [resumo de proteção radiológica](https://ntrs.nasa.gov/api/citations/20240008451/downloads/PASM_070124_to%20pubpress_Final.pdf); [OCHMO-STD-100.1A](https://ntrs.nasa.gov/api/citations/20240006194/downloads/OCHMO%20STD%20100%201A%2005142024.pdf?attachment=true). Aprofundar: [`../pesquisa/bruto/01-eclss-ambiente-radiacao.md`](../pesquisa/bruto/01-eclss-ambiente-radiacao.md), D3; dados de RadLab em [`12-fontes-de-dados-abertas.md`](12-fontes-de-dados-abertas.md), 2.2.

---

## 4. Como é medida a oximetria?

**Por oxímetro de pulso: luz vermelha (cerca de 660 nm) e infravermelha (cerca de 940 nm) atravessam o tecido, e a razão entre a parte pulsátil das duas absorções, aplicada a uma curva de calibração, dá a saturação (SpO2). Na ISS há oxímetro no kit de exame físico e canal de SpO2 no Bio-Monitor; a medida é pontual ou por sessão, não contínua.**

A oxi-hemoglobina e a desoxi-hemoglobina absorvem as duas luzes de forma diferente. O aparelho calcula R = (AC660/DC660) ÷ (AC940/DC940) e converte R em SpO2 por uma curva empírica feita comparando com sangue arterial. Ele não mede CO2, ventilação nem pressão da cabine. [PAPER](https://pubs.asahq.org/anesthesiology/article-pdf/70/1/98/317265/0000542-198901000-00019.pdf) [OFICIAL](https://www.fda.gov/medical-devices/products-and-medical-procedures/pulse-oximeters)

| Equipamento | Situação na ISS | Detalhe |
| --- | --- | --- |
| Oxímetro do kit de exame físico | Confirmado em material de treinamento [OFICIAL](https://ntrs.nasa.gov/api/citations/20210020209/downloads/Aunon-Chancellor_Medical%20Challenges.pdf) | Modelo e taxa: NÃO ENCONTRADO; uso em sintoma ou emergência, por decisão do CMO |
| Bio-Monitor | Sessões de pesquisa [OFICIAL](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp) | Sensor na faixa de cabeça, pelo menos 64 Hz, faixa de engenharia de 30% a 100% |
| Tempus PRO | **Não confirmado na ISS**; candidato para exploração, testado em solo no HESTIA em 2023 [OFICIAL](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/multifunctional-integrated-medical-devices/) | Monitor multiparâmetro (ECG, pressão, SpO2, temperatura) |
| Portable Oxygen Monitor | Usado na pré-respiração de EVA [OFICIAL](https://ntrs.nasa.gov/api/citations/20260003925/downloads/20260003925.pdf) | Mede O2 do **ambiente**, não a saturação da pessoa |

Limitações: baixa perfusão, frio, movimento, pigmentação da pele, esmalte, luz ambiente e anemia alteram a leitura; valor discrepante deve ser repetido. [OFICIAL](https://www.fda.gov/media/176236/download) A referência terrestre de 95% a 100% em repouso não é limiar de voo. [OFICIAL](https://www.medlineplus.gov/lab-tests/pulse-oximetry/)

**Fontes:** [FDA, oxímetros](https://www.fda.gov/medical-devices/products-and-medical-procedures/pulse-oximeters); [NASA, kit médico](https://ntrs.nasa.gov/api/citations/20210020209/downloads/Aunon-Chancellor_Medical%20Challenges.pdf); [CSA, Bio-Monitor](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp). Aprofundar: [`../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md), "Oximetria de pulso".

---

## 5. Quais são os equipamentos de medição médica ou de suporte à vida do ambiente?

**Do ambiente: o Environmental Control and Life Support System (ECLSS) gera oxigênio, remove CO2 e contaminantes, controla temperatura e umidade, recicla água e detecta fogo, e analisadores como o MCA medem a atmosfera continuamente. Da medicina: o Crew Health Care System (CHeCS), com três partes (HMS para cuidado médico, EHS para saúde ambiental e CMS para exercício), mais kits, ultrassom e OCT.**

Ambiente (detalhes em [`../pesquisa/bruto/01-eclss-ambiente-radiacao.md`](../pesquisa/bruto/01-eclss-ambiente-radiacao.md)):

| Equipamento | Função | Mede o quê, em que unidade | Contínuo? |
| --- | --- | --- | --- |
| OGA (USOS) e Elektron-VM (ROS) | Geram O2 por eletrólise da água; OGA até 9,25 kg por dia [OFICIAL](https://ntrs.nasa.gov/api/citations/20240007995/downloads/ICES2024141%20ISS%20ECLS%20Presentaton%20RevA.pdf) | Não são sensores | Operam conforme comando |
| CDRA e 4B CO2 (USOS), Vozdukh (ROS) | Removem CO2; o 4B CO2 aparece como remoção primária em 2026 [OFICIAL](https://ntrs.nasa.gov/citations/20260007665) | Não são sensores | Ciclos |
| TCCS | Remove contaminantes traço [OFICIAL](https://ntrs.nasa.gov/citations/20030065986) | Não mede | Contínuo |
| CCAA | Temperatura e umidade, 200 a 400 ft³/min [OFICIAL](https://ntrs.nasa.gov/api/citations/20240007333/downloads/ICES_085_Presentation_Final.pdf) | °C, % | Contínuo |
| WPA, UPA e BPA | Reciclam água; 98% de recuperação demonstrada em 2023 [OFICIAL](https://www.nasa.gov/missions/station/iss-research/nasa-achieves-water-recovery-milestone-on-international-space-station/) | Níveis e estados | Contínuo |
| Major Constituent Analyzer (MCA) | Espectrômetro de massa [OFICIAL](https://ntrs.nasa.gov/citations/20060023360) | N2, O2, H2, CO2, CH4, vapor; mmHg ou torr | **Sim** |
| AQM, ANITA-2, SAM | Compostos orgânicos voláteis [OFICIAL](https://ntrs.nasa.gov/citations/20170002579) [OFICIAL](https://www.esa.int/sv/articles/anita-air-quality-monitoring-for-the-international-space-station) | ppm ou ppb por composto | Não (AQM duas vezes por semana; o ANITA original, ciclo de 6 min) |
| CSA-CP | Produtos de combustão [OFICIAL](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20170002222.pdf) | CO, HCl, HCN em ppm | Sob demanda |
| Detectores de fumaça | Alarme de fogo [OFICIAL](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf) | Alarme discreto | Sim |
| TOCA, kit de microbiologia da água, amostradores de ar e superfície | Qualidade da água e micróbios [OFICIAL](https://ntrs.nasa.gov/api/citations/20250005232/downloads/International%20Space%20Station%20Familiarization.pdf) | mg/L, pH, µS/cm, CFU | Não; amostra e incubação |
| Monitor acústico SV102A+ | Ruído [OFICIAL](https://ntrs.nasa.gov/api/citations/20240006442/downloads/ICES-2024-354%20ISS%20Acoustics.pdf?attachment=true) | dBA | Pontual ou campanha |
| Iluminação SSLA | LED com modos de 4500 K, 6500 K e 2700 K [OFICIAL](https://ntrs.nasa.gov/api/citations/20160006727/downloads/20160006727.pdf) | K | Por rotina |

Medicina (CHeCS) [OFICIAL](https://ntrs.nasa.gov/api/citations/20250005232/downloads/International%20Space%20Station%20Familiarization.pdf):

| Parte | Equipamentos |
| --- | --- |
| HMS, cuidado médico | Kits ALSP, AMP, CMRS, RSP, desfibrilador (AED) [OFICIAL](https://ntrs.nasa.gov/api/citations/20100022009/downloads/20100022009.pdf?attachment=true) e Medical Kit com pressão, glicemia, acuidade visual, oxímetro, termômetro e estetoscópio [OFICIAL](https://ntrs.nasa.gov/api/citations/20210020209/downloads/Aunon-Chancellor_Medical%20Challenges.pdf); ultrassom U2 (desde 2011) e U3 (entregue em 2025, checkout em fevereiro de 2026, substituirá o U2) [OFICIAL](https://www.nasa.gov/blogs/spacestation/2026/02/05/dragon-preps-artificial-intelligence-and-medical-gear-fill-crews-day/); OCT, câmera de fundo de olho e tonômetro [OFICIAL](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) |
| EHS, saúde ambiental | Qualidade química e microbiológica do ar, da água e de superfícies (tabela acima) |
| CMS, contramedidas | ARED (resistência, desde 2008), CEVIS (bicicleta, desde 2001), T2 (esteira, desde 2009), monitor de frequência cardíaca e de pressão [OFICIAL](https://www.nasa.gov/missions/station/iss-research/astronaut-exercise/) |
| Outros | SLAMMD (massa por F = m·a, precisão de 0,5 lb) [OFICIAL](https://www.nasa.gov/wp-content/uploads/2023/11/roi-iss-facilities-june2023.pdf?emrc=698425c585f1b); PFS para gases respiratórios; KUDUwave para audição |

**Correção.** O Tempus PRO, listado na aba "Links" como equipamento da ISS, não é confirmado como operacional na estação ([seção 4](#4-como-é-medida-a-oximetria)).

**Fontes:** [NASA, ECLSS](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/); [NASA, ISS Familiarization](https://ntrs.nasa.gov/api/citations/20250005232/downloads/International%20Space%20Station%20Familiarization.pdf). Aprofundar: [`../pesquisa/bruto/01-eclss-ambiente-radiacao.md`](../pesquisa/bruto/01-eclss-ambiente-radiacao.md) e [`../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md).

---

## 6. Quais são os equipamentos pessoais de coleta de informação dos astronautas?

**Poucos são de uso diário: o dosímetro CAD e o iPad com o ISS FIT (registro de comida e líquidos). Os outros vestíveis (Bio-Monitor, Actiwatch, Holter, sensores de temperatura, faixas de EEG) entram em sessões ou campanhas de pesquisa, e o kit médico é usado de forma pontual.**

| Equipamento | Mede | Como entrega | Uso |
| --- | --- | --- | --- |
| CAD [OFICIAL](https://srag.jsc.nasa.gov/SpaceRadiation/How/How.cfm) | Dose e taxa de radiação | Display, Bluetooth para laptop, downlink ao SRAG | Durante a missão |
| CPD [OFICIAL](https://ntrs.nasa.gov/api/citations/20090021477/downloads/20090021477.pdf) | Dose integrada | Lido em laboratório depois do voo | Contínuo, sem leitura a bordo |
| iPad com ISS FIT [OFICIAL](https://www.nasa.gov/directorates/esdmd/hhp/nutritional-biochemistry/) | Alimentos, kcal, proteína, sódio, líquidos em mL | Envio semanal a nutricionistas e médicos | Diário, desde 2016 |
| Bio-Monitor [OFICIAL](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp) | ECG, respiração, SpO2, pressão sistólica estimada, pele, movimento | Base e downlink depois da sessão | Sessões de até 48 h |
| Actiwatch Spectrum [OFICIAL](https://ntrs.nasa.gov/api/citations/20200001281/downloads/20200001281.pdf) | Movimento e luz (estimativa de sono) | Arquivo sincronizado para o solo | Campanhas de duas semanas |
| Holter (ESA Cardiolab) [OFICIAL](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Research/Cardiolab) | ECG ambulatorial | Descarga para análise em solo | Estudos de cerca de 24 h |
| Thermolab e Double Sensor [OFICIAL](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Research/Circadian_Rhythms) | Temperatura da pele (ritmo circadiano) | Análise com diário de sono | Estudos |
| Personal CO2 Monitor [OFICIAL](https://www.nasa.gov/missions/station/iss-research/wearable-tech-for-space-station-research/) | CO2 perto do rosto | iPad (2016) | Demonstração |
| Smart Flight Suit 2 [OFICIAL](https://www.nasa.gov/blogs/stationreport/2024/01/25/iss-daily-summary-report-1-25-2024/) | ECG, pressão e temperatura | Demonstração | 2024 |
| Faixa Dreem e EEG no ouvido [OFICIAL](https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023/) | EEG de sono | Dados à equipe científica | Experimentos de 2021 e 2023 |
| Kit médico (oxímetro, manguito, termômetro, glicosímetro) [OFICIAL](https://ntrs.nasa.gov/api/citations/20210020209/downloads/Aunon-Chancellor_Medical%20Challenges.pdf) | Sinais vitais e glicemia | Leitura registrada pelo CMO | Sintoma ou emergência |
| Testes no laptop (WinSCAT, Reaction Self Test) [OFICIAL](https://ntrs.nasa.gov/api/citations/20080009715/downloads/20080009715.pdf) | Cognição, tempo de reação, lapsos | Resultado enviado ao solo | Mensal ou por protocolo |

No software, cada um vira um `Dispositivo` com `tipo` próprio e leituras com a `disponibilidade` certa ([`06-modelo-de-dados.md`](06-modelo-de-dados.md)).

**Fontes:** as URLs da tabela. Aprofundar: [`../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md), D2 e tabela mestra.

---

## 7. Como funciona a medição sanguínea? Até que ponto se analisa em órbita, e quais os desafios?

**A maior parte do sangue coletado em órbita é centrifugada, congelada a até menos 80 °C no freezer MELFI e analisada na Terra, com resultado dias ou meses depois. A bordo, só testes pontuais e limitados: o i-STAT com cartuchos (química básica e troponina, segundo relatório da NASA), tiras de urina e o glicosímetro do kit. HemoCue e rHEALTH ONE foram demonstrações, não rotina.**

Como é feito: tripulantes treinados fazem coleta venosa assistida ou autocoleta, com contenção do corpo. A primeira coleta de sangue na ISS foi em outubro de 2006, na Expedição 14. O tubo vai à Refrigerated Centrifuge, é aliquotado, congelado e volta em veículo de carga; a NASA registra entrega aos pesquisadores em cerca de 72 horas após a reentrada da Dragon. [OFICIAL](https://www.nasa.gov/wp-content/uploads/2023/03/human-adaptation-2020-final.pdf) [OFICIAL](https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf)

Quando: no Spaceflight Standard Measures, coletas em FD30 e por volta de R-30 [OFICIAL](https://ntrs.nasa.gov/citations/20230014025); no estudo Biochemical Profile, FD15, FD30, FD60, FD120, FD180 e R-14. São protocolos de pesquisa, não obrigação clínica para todos. [OFICIAL](https://nlsp.nasa.gov/search/data/details/2a30c3f0-93d8-5060-b546-ba229f740cc3?dataType=EXPERIMENTS)

| Recurso | O que faz a bordo | Situação |
| --- | --- | --- |
| i-STAT | Cartuchos descartáveis; resultado em minutos | No kit, citado para troponina e química básica [OFICIAL](https://ntrs.nasa.gov/api/citations/20250001074/downloads/NASA%20SP-20250001074%20REV1.pdf?attachment=true); lista atual de cartuchos NÃO ENCONTRADA |
| Tiras de urina | pH, densidade, glicose, sangue, proteína, cetonas | Leitura visual pontual [PAPER](https://academic.oup.com/clinchem/article/69/5/442/7113323) |
| HemoCue WBC DIFF | Leucócitos e diferencial | Demonstração em 2020 e 2021 [OFICIAL](https://ntrs.nasa.gov/citations/20240004905) |
| rHEALTH ONE | Citometria de fluxo com cerca de 10 µL | Demonstração em maio de 2022 [OFICIAL](https://ntrs.nasa.gov/citations/20230001079) |
| Saliva | Cortisol, vírus latentes (EBV, VZV, CMV) | Analisada só na Terra [OFICIAL](https://ntrs.nasa.gov/citations/20100040666) |

Desafios: em microgravidade o líquido não cai no tubo (tensão superficial, bolhas, capilaridade); há risco biológico e de perfurocortantes; a cadeia de identificação da amostra precisa ser preservada; o espaço no freezer e o retorno dependem da logística de carga; e o resultado chega com atraso, o que impede uso clínico imediato. [OFICIAL](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/in-situ-lab-analysis/)

No software: a leitura nasce `pendente_laboratorio` e o resultado entra depois, com `instanteUtc` da coleta e `instanteDisponivelUtc` da chegada ([`06-modelo-de-dados.md`](06-modelo-de-dados.md)). Resultado de point-of-care e laudo de laboratório ficam separados.

**Fontes:** [NASA, In-Situ Lab Analysis](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/in-situ-lab-analysis/); [NASA, Human Adaptation to Spaceflight](https://www.nasa.gov/wp-content/uploads/2023/03/human-adaptation-2020-final.pdf). Aprofundar: [`../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md), "Sangue, urina, saliva".

---

## 8. Todo mundo fica acordado na ISS ou existe revezamento?

**Não há revezamento fixo. A tripulação segue um dia comum em GMT/UTC, com janela de sono planejada para todos (referência: 21:30 a 06:00 GMT). O sono muda ou se divide em exceções, como chegada e partida de veículos, EVA e contingências. Quem fica acordado é o Mission Control, que opera 24 horas por dia em turnos.**

Dia de referência publicado pela NASA: acordar por volta de 06:00 GMT, trabalho das 08:00 às 17:00, início da janela de sono por volta de 21:30. [OFICIAL](https://www.nasa.gov/wp-content/uploads/2018/04/iss-operating_an_outpost-tagged.pdf) A norma NASA-STD-3001 recomenda oportunidade de sono de 8,5 horas e evitar tarefas críticas no sono nominal. [OFICIAL](https://www.nasa.gov/reference/6-0-medical-operations/) A estação dá cerca de 16 voltas na Terra por dia, com 16 amanheceres; luz e horário controlados dão o ritmo. [OFICIAL](https://www.asc-csa.gc.ca/eng/astronauts/living-in-space/sleeping-in-space.asp)

| Dado | Valor | Fonte |
| --- | --- | --- |
| Sono medido por actigrafia em voo | 6,09 ± 0,67 h por noite (21 astronautas) | [PAPER](https://pubmed.ncbi.nlm.nih.gov/25127232/) |
| Sono autorrelatado em missões de seis meses | 6,5 ± 1,4 h; só 5,9% das noites dentro das 8,5 h | [PAPER](https://pmc.ncbi.nlm.nih.gov/articles/PMC8919197/) |
| Sono dividido por operações de veículos | 8 de 19 tripulantes, 11 episódios; 2,89 h e 4,30 h em média | [OFICIAL](https://ntrs.nasa.gov/citations/20240002094) |
| Uso de remédio para dormir | 12 de 16 astronautas (75%) ao menos uma vez | [PAPER](https://pubmed.ncbi.nlm.nih.gov/25127232/) |

Cada pessoa tem um compartimento individual do tamanho de uma cabine telefônica, e tampões e máscara são comuns. [OFICIAL](https://www.asc-csa.gc.ca/eng/astronauts/living-in-space/sleeping-in-space.asp) A iluminação SSLA muda para 2700 K antes do sono. [OFICIAL](https://ntrs.nasa.gov/api/citations/20160006727/downloads/20160006727.pdf) Isso alimenta `Tripulante.horarioSono` em `docs/06` e o cenário C4 (dívida de sono antes de EVA).

**Fontes:** [ESA, An astronaut's rhythm](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Astronauts/An_astronaut_s_rhythm); [NASA, Sleep Shifting](https://ntrs.nasa.gov/citations/20240002094); [NASA, Mission Control Center](https://www.nasa.gov/johnson/jsc-mission-control-center/). Aprofundar: [`../pesquisa/bruto/04-precedentes-oculos-sono.md`](../pesquisa/bruto/04-precedentes-oculos-sono.md), seção 5.

---

## 9. Quais são as bases de dados abertas que a NASA disponibiliza sobre o suporte à vida dos astronautas?

**As principais são o Open Science Data Repository (OSDR, com GeneLab, ALSDA, EDA e RadLab), o NASA Life Sciences Portal (NLSP) com LSDA e LSAH (estes por solicitação), data.nasa.gov, o NTRS e a API DONKI; fora da NASA, a NOAA SWPC. Nenhuma traz dado médico individual de astronauta em aberto.**

| Base | O que tem | Acesso |
| --- | --- | --- |
| OSDR [OFICIAL](https://science.nasa.gov/biological-physical/data/osdr/) | Estudos biológicos e humanos de pesquisa; API REST testada | Aberto; parte controlada |
| EDA e RadLab (no OSDR) [OFICIAL](https://visualization.osdr.nasa.gov/eda/) | Ambiente e radiação históricos da ISS | Aberto |
| NLSP, LSDA, LSAH [OFICIAL](https://nlsp.nasa.gov/) | Pesquisas humanas e saúde longitudinal | Catálogo aberto; dado por pedido formal e revisão ética |
| data.nasa.gov e NTRS [OFICIAL](https://data.nasa.gov/) [OFICIAL](https://ntrs.nasa.gov/) | Catálogo de datasets e relatórios técnicos (inclusive ECLSS) | Aberto |
| DONKI [OFICIAL](https://ccmc.gsfc.nasa.gov/tools/DONKI/) | Eventos de clima espacial | Aberto; a rota antiga de api.nasa.gov deu 404 |
| NOAA SWPC [OFICIAL](https://www.swpc.noaa.gov/products/goes-proton-flux) | Prótons do GOES, Kp, alertas | Aberto |
| ISS Live [SECUNDÁRIA](https://github.com/Lightstreamer/Lightstreamer-example-ISSLive-client-javascript) | Parte da telemetria do ECLSS | Aberto, sem dicionário oficial |

A aba "Links" acertou a regra de privacidade (agregado livre, individual por solicitação e comitê de ética). Dois ajustes: a "telemetria ambiental de cabine" do OSDR é histórica, por campanha, e não feed ao vivo; e a contagem de "mais de 500 estudos" não foi conferida pela pesquisa. [OFICIAL](https://github.com/nasa/OSDR_Tutorials/blob/main/source/pages/guides/environmental_data_application.md)

**Fontes:** as da tabela. Aprofundar: [`12-fontes-de-dados-abertas.md`](12-fontes-de-dados-abertas.md), com campos, formatos, licenças e respostas testadas.

---

## 10. A NASA já usa óculos de condução óssea?

**Usa em pesquisa, não em operação. Em 2024 a NASA avaliou cinco fones comerciais de condução óssea para a voz recebida no traje xEMU (o PDF da aba "Links"), medindo só ajuste e conforto em cinco engenheiros, sem testar inteligibilidade, sono ou bem-estar. A pesquisa não achou uso em voo por astronautas.**

| Aspecto | O que o estudo ICES-2024-209 (Cavanaugh, NASA JSC) reportou |
| --- | --- |
| Motivo | Eco no capacete: o microfone captava o áudio dos alto-falantes; condução óssea seria a reserva para o áudio recebido |
| Aparelhos | Code Red Battle Zero-M, Motorola RMN5114A, PMLN4585A, RMN5048B e Shokz OpenComm |
| Método | 5 participantes (3 homens, 2 mulheres), 6 horas por fone, questionários de conforto |
| Resultado | Três empataram no ajuste; o Shokz foi o mais confortável, mas a bateria Bluetooth não atendia uma EVA longa |
| Não testado | Inteligibilidade (meta proposta de 90% para teste futuro), música, sono, efeito psicológico |
| Desenho | Ponto lateral perto do côndilo, força de contato de cerca de 4,9 N, melhor sensibilidade perto de 1 kHz |

[OFICIAL](https://ntrs.nasa.gov/api/citations/20240005885/downloads/ICES_final_manuscript_Cavanaugh.pdf)

Outros precedentes com condução óssea: a faixa de sono Dreem, usada na ISS, tem transdutores ósseos, desligados na validação publicada e sem uso sonoro demonstrado em voo [PAPER](https://pmc.ncbi.nlm.nih.gov/articles/PMC7751170/); o protótipo AttentivU, do MIT, usa piezoelétrico de condução óssea e voou em avião parabólico em 2022 [PAPER](https://www.abstractscorecard.com/uploads/Tasks/upload/21810/DPPWZUCK-1650206-1-PDF.pdf). Nenhum estudo localizado mediu condução óssea em microgravidade. [INFERÊNCIA](https://pubmed.ncbi.nlm.nih.gov/8214826/)

Para o óculos Orbit: ruído histórico de 56 a 69 dBA nos módulos [OFICIAL](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20100031889.pdf) e regras de alarme e de áudio pessoal da NASA-STD-3001 [OFICIAL](https://www.nasa.gov/reference/6-0-natural-and-induced-environments-vol-2/) exigem pausar o som na hora e nunca mascarar alarmes.

**Fontes:** [Cavanaugh, ICES-2024-209](https://ntrs.nasa.gov/api/citations/20240005885/downloads/ICES_final_manuscript_Cavanaugh.pdf). Aprofundar: [`../pesquisa/bruto/04-precedentes-oculos-sono.md`](../pesquisa/bruto/04-precedentes-oculos-sono.md), seção 1.

---

## 11. A NASA já usa EEG e EOG, portátil ou em módulo?

**Sim, mas só em experimentos: desde o Skylab (1973), passando pelo Neurolab (1998), pela Mir e pelo Neurospat (touca de 62 eletrodos no módulo Columbus, 2009 a 2013), até vestíveis recentes como a faixa Dreem (2021 e 2023) e o EEG no ouvido do Sleep in Orbit (2023). Nenhum é monitor de rotina, e nenhum EOG em armação de óculos foi usado na ISS.**

| Tipo | Precedente | O que foi |
| --- | --- | --- |
| Laboratório a bordo | Skylab M133, NASA, 1973 | Touca com EEG e EOG e painel na cabine de sono que estimava o estágio do sono; um astronauta por missão [OFICIAL](https://ntrs.nasa.gov/citations/19750019675) |
| Laboratório a bordo | Neurolab, ônibus espacial STS-90, 1998 | Polissonografia de 20 canais (4 EEG, 2 EOG); 4 astronautas, 16 noites [OFICIAL](https://ntrs.nasa.gov/api/citations/20020073385/downloads/20020073385.pdf) |
| Laboratório a bordo | Son-3, estação Mir | EEG, EOG, EMG e ECG do programa russo-búlgaro [OFICIAL](https://ntrs.nasa.gov/api/citations/19910017355/downloads/19910017355.pdf) |
| Módulo da ISS | Neurospat, ESA, 2009 a 2013 | Touca de 62 eletrodos no Columbus, cinco astronautas [OFICIAL](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/PromISSe/Neurospat) |
| Módulo da ISS, câmera | Eye Tracking Device, Expedições 9, 11, 13, 14 e 16 | Rastreamento ocular por câmera, 31 astronautas; não é EOG [OFICIAL](https://www.nasa.gov/wp-content/uploads/2022/03/iss_technical_publication_030116.pdf) |
| Portátil | Nightcap, Mir, anos 1990 | Movimento de pálpebra e corpo para vigília, REM e não-REM; 5 participantes [OFICIAL](https://www.nasa.gov/wp-content/uploads/static/history/SP-4225/science/issphase1sci.pdf) |
| Portátil | Dreams com Dreem, CNES, 2021 e 2023 | Faixa de EEG seco usada na ISS [OFICIAL](https://cnes.fr/en/projects/mission-alpha) [OFICIAL](https://www.nasa.gov/blogs/stationreport/2023/07/10/iss-daily-summary-report-7-10-2023/) |
| Portátil | Sleep in Orbit, ESA e Aarhus, 2023 | EEG em peças auriculares moldadas; 20 noites com bom sinal [OFICIAL](https://www.esa.int/articles/about-us/directorates/human-and-robotic-exploration/health-science-in-orbit) |
| Portátil | Neurowellness in Space, NASA, 2022 | Headset portátil de EEG; canais e resultados não publicados [OFICIAL](https://www.nasa.gov/blogs/stationreport/2022/04/12/iss-daily-summary-report-4-12-2022/) |
| Portátil, fora da ISS | AttentivU (MIT) e JINS MEME | Óculos com EEG e EOG (AttentivU, voo parabólico) e com EOG (JINS MEME, só em solo) [PAPER](https://dam-prod.media.mit.edu/x/2019/05/29/1570522368.pdf) [FABRICANTE](https://jins-meme.github.io/jinsmeme-platform/en/hardware.html) |

O que dá para prometer: EEG estima estágios de sono e é estimativa, não polissonografia; EOG capta piscadas e movimento ocular como sinal auxiliar de sonolência. Não há evidência de que EOG detecte SANS. [INFERÊNCIA](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf) Para o pitch: o AttentivU já junta EEG, EOG e condução óssea numa armação, então a combinação sozinha não é inédita; o diferencial está na integração com o painel de saúde, offline, com sons escolhidos pelo tripulante. [INFERÊNCIA](https://dam-prod.media.mit.edu/x/2019/05/29/1570522368.pdf)

**Fontes:** as da tabela. Aprofundar: [`../pesquisa/bruto/04-precedentes-oculos-sono.md`](../pesquisa/bruto/04-precedentes-oculos-sono.md), seções 2, 3 e 8.

---

## 12. Que software de saúde a NASA usa? Quem desenvolveu, quando, e ainda usa?

**Não há um aplicativo único. A bordo: CHeCS com o computador MEC, laptops SSC, WinSCAT (cognição, desde a Expedition 1, mensal até 2025), OnePortal (exercício), ISS FIT (dieta, desde 2016), KUDUwave (audição, substituiu o EarQ em 2021) e o visualizador de procedimentos IPV. Em solo, a suíte MIST. Os projetos de apoio à decisão (MDA, CDSS, xEHR) ainda não voam como sistema operacional.**

| Software | Quem | Desde | Ainda em uso? | Substituiu |
| --- | --- | --- | --- | --- |
| CHeCS e MEC | NASA JSC | Catálogos de 2008 e 2011 | Função confirmada em 2025 [OFICIAL](https://ntrs.nasa.gov/api/citations/20250005232/downloads/International%20Space%20Station%20Familiarization.pdf) | |
| WinSCAT | NASA JSC | Expedition 1 | Sim até 2025 [OFICIAL](https://ntrs.nasa.gov/api/citations/20250011491/downloads/BHP%20Operations%20Overview_Navy_Revised.pdf) | |
| Cognition (CTB) | University of Pennsylvania para o HRP | 2016 | Pesquisa | Não substitui o WinSCAT |
| Reaction Self Test | NASA e University of Pennsylvania | Projeto concluído em 2024 [OFICIAL](https://techport.nasa.gov/projects/23201) | Não confirmado | |
| ISS FIT | NASA com Topcoder | 2016 | Até 2024 [OFICIAL](https://www.nasa.gov/directorates/esdmd/hhp/nutritional-biochemistry/) | Planilhas e questionários |
| OnePortal | NASA JSC | Primeiro uso no MED-2 | Ativo [OFICIAL](https://www.nasa.gov/reference/jsc-exercise-countermeasures/) | |
| OOHA com KUDUwave | NASA | EarQ de 2000 a 2021 | Sim (2023) [PAPER](https://ntrs.nasa.gov/citations/20240009887) | EarQ |
| MIST (solo) | NASA JSC | Descrito em 2023 | Sim [OFICIAL](https://www.nasa.gov/general/medical-information-systems-and-tools-mist/) | |
| IMM e MEDPRAT | NASA HRP e ExMC | IMM atualizado em 2026 | IMM é o padrão aceito [OFICIAL](https://ntrs.nasa.gov/citations/20240012058) | MEDPRAT evolui o IMM |
| OPTIMIS | NASA JSC | 2015 | Sim [OFICIAL](https://ntrs.nasa.gov/api/citations/20230007636/downloads/AsMa%20CSpine%20Presentation%20-%20Markings%20Removed%20v3.pdf) | OSTPV |
| IPV | NASA e parceiros | IPV 4.1.2 em 2024 | Sim em 2024 | |
| MDA, CDSS, CHP-IDA, xEHR | NASA ExMC e HRP | Protótipos e requisitos de 2018 a 2023 | Em desenvolvimento [OFICIAL](https://ntrs.nasa.gov/citations/20220017869) | |
| CIMON | DLR, Airbus e IBM | 2018 | Demonstração [OFICIAL](https://www.nasa.gov/image-article/robot-colleagues-meet-aboard-international-space-station/) | |

Em 2024 a NASA ainda registrava dados de saúde dispersos e baixados à mão; é a lacuna que o Orbit Saúde ataca. [OFICIAL](https://ntrs.nasa.gov/citations/20240008508)

**Fontes:** as da tabela. Aprofundar: [`12-fontes-de-dados-abertas.md`](12-fontes-de-dados-abertas.md), seção 6 (tabela completa) e [`../pesquisa/bruto/06-dados-abertos-software-fluxo.md`](../pesquisa/bruto/06-dados-abertos-software-fluxo.md), seção 2.

---

## 13. Existe monitoramento em tempo real das funções básicas de suporte à vida?

**Sim para o ambiente: o ECLSS é acompanhado continuamente pelos controladores ETHOS e pelo Biomedical Engineer (BME) no Mission Control. Não para os sinais vitais: na rotina, as medidas do corpo são pontuais, por sessão ou por amostra. As exceções são a EVA (telemetria do traje e ECG), as emergências médicas e as sessões de pesquisa.**

| O que | Em tempo real? | Quem acompanha |
| --- | --- | --- |
| Atmosfera, pressão, água, ventilação, fogo | Sim | ETHOS (posição de controle, não software) e BME [OFICIAL](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/) [OFICIAL](https://www.nasa.gov/directorates/esdmd/hhp/biomedical-flight-controllers/) |
| Sinais vitais na rotina | Não; dispositivos separados, uso periódico [OFICIAL](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/multifunctional-integrated-medical-devices/) | Tripulante, CMO, médico de voo |
| EVA | Sim, durante a atividade: ECG, frequência cardíaca, metabolismo, estado do traje [OFICIAL](https://standards.nasa.gov/sites/default/files/standards/NASA/B/0/nasa-std-3001_vol_2_rev_b.pdf) | Controle de voo e médico |
| Emergência médica | Medidas dirigidas ao caso [OFICIAL](https://www.nasa.gov/wp-content/uploads/2025/08/ochmo-tb-044-medical-operations.pdf) | CMO com o médico de voo |
| Exercício, Bio-Monitor | Por sessão, com descarga depois | Especialistas e pesquisadores |
| Conversa médica | PMC semanal, privada [OFICIAL](https://www.nasa.gov/directorates/esdmd/hhp/flight-surgeons/) | Médico de voo |

Isso define o papel do Orbit Saúde: mostrar ao próprio tripulante, a bordo e sem rede, o que hoje fica disperso, com cada dado marcado pela sua origem e idade.

**Fontes:** as da tabela. Aprofundar: [`12-fontes-de-dados-abertas.md`](12-fontes-de-dados-abertas.md), seção 5, e [`../pesquisa/bruto/06-dados-abertos-software-fluxo.md`](../pesquisa/bruto/06-dados-abertos-software-fluxo.md), seção 3.
