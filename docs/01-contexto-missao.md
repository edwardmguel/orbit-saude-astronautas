# 01. Contexto da missão

> Para quem: toda a equipe, inclusive quem nunca estudou medicina espacial, e quem vai apresentar. É o primeiro documento de domínio da ordem de leitura ([`00-guia-de-leitura.md`](00-guia-de-leitura.md)); leva uns 15 minutos.
> Fontes: [`../pesquisa/bruto/03-riscos-indicadores-limiares.md`](../pesquisa/bruto/03-riscos-indicadores-limiares.md) (perigos, riscos do HRP, inventário de condições, mecanismos e escalonamento), [`../pesquisa/bruto/04-precedentes-oculos-sono.md`](../pesquisa/bruto/04-precedentes-oculos-sono.md), seção 5 (rotina, horário, sono e iluminação), e [`../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md`](../pesquisa/bruto/02-equipamentos-medicos-tripulacao.md), seção D1 (cuidado médico a bordo) e trechos da D2 (exercício e massa corporal). Cada fato importante traz o link oficial copiado da pesquisa. Etiquetas como [PAPER] e [INFERÊNCIA] seguem a legenda do guia de leitura.
> O que **não** está aqui: os limiares verde, amarelo e vermelho. Eles ficam em [`03-indicadores-e-limiares.md`](03-indicadores-e-limiares.md), com fonte. Este documento explica o porquê; o `03` diz quanto.

---

## 1. A ISS em 2 minutos

A Estação Espacial Internacional (ISS, International Space Station) é onde a NASA (National Aeronautics and Space Administration) e seus parceiros mantêm tripulações por meses. É o lugar de onde vêm os dados reais que o nosso protótipo imita.

| O que saber | Por que importa para o Orbit Saúde |
| --- | --- |
| **Onde fica.** Em órbita baixa da Terra (LEO, Low Earth Orbit). Para o Human Research Roadmap (HRR) da NASA, missão "longa" em LEO vai de 30 dias a 1 ano, faixa que inclui as estadias de 6 e de 12 meses na ISS ([HRR, arquitetura](https://humanresearchroadmap.nasa.gov/architecture/)). | É a missão de referência mais próxima da realidade atual. |
| **Quanto tempo se fica.** Estudos de sono acompanham missões de aproximadamente seis meses ([Flynn-Evans et al., 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC8919197/)) [PAPER], e o calendário médico de referência da NASA é escrito para 180 dias ([OCHMO-STD-100.1A, Tabela 8](https://www.nasa.gov/wp-content/uploads/2024/09/ochmo-std-100-1a-rev-a-signed.pdf)). | O software precisa de linha de base e tendência de meses, não só da leitura do dia. |
| **Quantas pessoas.** As fontes deste documento não fixam quantos tripulantes ficam a bordo ao mesmo tempo. O protótipo dimensiona o Monitor geral para até 7 pessoas ([`07`](07-design-interface.md), T1b); número a confirmar em fonte oficial (seção 9). | Define quantos cartões cabem na tela T1. |
| **Que horas são.** A ISS vive num dia de 24 horas em GMT (Greenwich Mean Time), equivalente ao UTC (Tempo Universal Coordenado) no uso operacional ([NASA, ISS Operating an Outpost](https://www.nasa.gov/wp-content/uploads/2018/04/iss-operating_an_outpost-tagged.pdf)). | Todo dado é guardado em UTC e a barra superior mostra GMT ([`../AGENTS.md`](../AGENTS.md), regra 3). |
| **Dia e noite.** A estação dá cerca de 16 voltas na Terra por dia; a tripulação vê 16 nasceres e 16 pores do sol a cada 24 horas ([CSA, Sleeping in space](https://www.asc-csa.gc.ca/eng/astronauts/living-in-space/sleeping-in-space.asp); [ESA, An astronaut's rhythm](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Astronauts/An_astronaut_s_rhythm)). | A janela não serve de relógio. O ritmo do corpo depende do horário, da luz artificial e da rotina; por isso o modo noturno segue o horário, não o Sol. |
| **Dois segmentos.** A pesquisa distingue o segmento americano (USOS, United States Orbital Segment), com os aparelhos de exercício ARED (Advanced Resistive Exercise Device, exercício resistido), CEVIS (Cycle Ergometer with Vibration Isolation and Stabilization, bicicleta) e T2 (esteira), e o segmento russo, com a esteira BD-2 e o cicloergômetro VELO ([NASA, exercício](https://www.nasa.gov/missions/station/iss-research/astronaut-exercise/); [NASA, BD-2](https://gipoc.grc.nasa.gov/pims/pimsdocs/public/ISS%20Handbook/hb_vib_crew_BD-2_Treadmill_Exercise_2022-11-01.pdf)). A massa corporal é medida pelo SLAMMD (Space Linear Acceleration Mass Measurement Device) ou pelo medidor de massa russo (MMD, Mass Measurement Device) ([OCHMO-STD-100.1A](https://ntrs.nasa.gov/api/citations/20240006194/downloads/OCHMO%20STD%20100%201A%2005142024.pdf)). Registros dos dois lados não têm formato comum demonstrado. | Um adaptador por fonte e a unidade original sempre guardada ([`06`](06-modelo-de-dados.md)). |
| **Módulos barulhentos.** Medições publicadas em 2010 mostram ruído típico de 56 a 69 dBA nos módulos e 77 dBA perto da esteira, com uso de protetores auriculares ([NASA, Acoustic Issues](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20100031889.pdf)). É valor histórico, não medição atual de cada módulo. | O ruído entra no mapa de módulos (T5) e na análise do sono (T6). |
| **Onde se dorme.** Cada pessoa tem um compartimento individual, mais ou menos do tamanho de uma cabine telefônica, com saco de dormir preso à parede, ventilação, luz e computador; tampões de ouvido e máscara são comuns ([CSA](https://www.asc-csa.gc.ca/eng/astronauts/living-in-space/sleeping-in-space.asp)). | A cabine de dormir tem ruído e luz próprios, que o software cruza com o sono. |
| **Terra acordada.** O Controle de Missão (Johnson Space Center, Houston) opera 24 horas por dia, 7 dias por semana, em turnos ([NASA Johnson](https://www.nasa.gov/johnson/jsc-mission-control-center/)). | Na ISS há vigilância em terra a qualquer hora; em Marte não haverá conversa em tempo real (seção 7). |
| **Os dados não chegam num fluxo só.** Não há na ISS um fluxo fisiológico único: há leitura direta no aparelho, arquivo transferido pelo tripulante, registro manual em aplicativo, amostra congelada para análise em terra e conversa por voz em conferência médica ([HRR, lacuna Med-07](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=95)). | É o problema que o Orbit Saúde resolve: juntar tudo num lugar e mostrar a idade de cada dado. |

## 2. Um dia na estação

Horário de referência publicado pela NASA ([ISS Operating an Outpost](https://www.nasa.gov/wp-content/uploads/2018/04/iss-operating_an_outpost-tagged.pdf)), com as reservas de tempo da norma NASA-STD-3001 ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/)):

| Horário GMT (aproximado) | O que acontece |
| --- | --- |
| 06:00 | Acordar. A norma reserva 1,5 hora depois de acordar para transição e rotina pessoal. |
| 08:00 | Início do trabalho: experimentos, manutenção, planejamento e conferências com o solo. |
| Ao longo do dia | Refeições, tempo pessoal e o bloco de exercício, de cerca de 2 horas na agenda, contando preparação, troca de aparelho e higiene ([NASA ASCR](https://www.nasa.gov/directorates/esdmd/hhp/astronaut-strength-conditioning-and-rehabilitation/)). |
| 17:00 | Fim do trabalho. |
| 19:30 (conta nossa: 2 h antes do sono) | Começa o período pré-sono de 2 horas reservado pela norma. |
| 21:30 | Início da janela de sono, que vai até 06:00: exatamente as 8,5 horas recomendadas. |

O cronograma de cada dia varia. A janela de 21:30 a 06:00 é referência contemporânea da ISS, não garantia para cada missão ou pessoa ([NASA, Sleep Shifting](https://ntrs.nasa.gov/citations/20240002094)).

### 2.1 Sono programado não é sono dormido

A NASA-STD-3001 recomenda uma **oportunidade de sono de 8,5 horas** e pede que o planejamento evite tarefas críticas no sono nominal e minimize operações na noite biológica ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/)). Na prática, a tripulação dorme bem menos:

| Estudo | Quem e como | Resultado |
| --- | --- | --- |
| [Barger et al., 2014](https://pubmed.ncbi.nlm.nih.gov/25127232/) [PAPER] | 21 astronautas em 13 expedições, actigrafia (relógio de pulso que estima sono pelo movimento) | 6,09 ± 0,67 h por noite em voo, contra 6,95 ± 1,04 h na primeira semana após voltar. 12 de 16 astronautas (75%) usaram remédio para dormir ao menos uma vez; é proporção de pessoas, não de noites. |
| [Flynn-Evans et al., 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC8919197/) [PAPER] | 24 astronautas, missões de cerca de 6 meses, autorrelato | 6,5 ± 1,4 h por noite; só em 5,9% das noites dormiram dentro das 8,5 h programadas. Menos sono veio junto com pior função neurocomportamental e mais estresse. |

Resumo para a apresentação: a agenda oferece 8,5 horas e a tripulação dorme em média de 6 a 6,5 horas, cerca de 2 horas a menos (conta nossa). Os números descrevem grupos estudados, não o normal de cada pessoa: o software nunca pinta "6 h" de verde automaticamente. O Actiwatch Spectrum Plus é usado em voo para estimar sono por movimento e luz ([NASA, Sleep on Station](https://www.nasa.gov/humans-in-space/science-in-space-week-of-sept-15-2023/)). O uso histórico de remédios não autoriza o Orbit a sugerir medicamento, dose ou melatonina; não há fonte primária de uso rotineiro de melatonina a bordo ([NASA, Fatigue Countermeasures Laboratory](https://www.nasa.gov/human-systems-integration-division/human-performance/fatigue-countermeasures-laboratory/)).

### 2.2 Quando chega uma nave: sleep shifting

Num estudo da NASA de 2024 com 19 tripulantes usando acelerômetro de pulso, 8 pessoas tiveram 11 episódios de **sono dividido** em torno da chegada, realocação ou partida de veículos visitantes. O tempo na cama foi em média 2,89 horas no primeiro pedaço e 4,30 horas no segundo ([Jansen et al., NASA NTRS](https://ntrs.nasa.gov/citations/20240002094)). É exceção operacional, não escala de turnos.

### 2.3 Todo mundo dorme ao mesmo tempo?

> **Em regra, sim.** A tripulação tem um dia nominal alinhado a GMT e uma janela de sono planejada em conjunto; não há turno noturno rotativo permanente como padrão. Chegada de veículos, lançamentos, pousos, acoplamentos, realocação de veículos, atividade extraveicular (EVA, Extravehicular Activity) e contingências podem exigir mudança de horário ou sono dividido. Enquanto a tripulação dorme, o Controle de Missão segue em turnos ([ESA](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Astronauts/An_astronaut_s_rhythm); [NASA, Sleep Shifting](https://ntrs.nasa.gov/citations/20240002094); [NASA Mission Control](https://www.nasa.gov/johnson/jsc-mission-control-center/)).

Consequência para o produto: à noite, o Monitor geral mostra quase todos dormindo, e "chegada de veículo" entra como atividade crítica no cenário C4 ([`05`](05-arquitetura-software.md), seção 3.3).

### 2.4 A luz como contramedida

A Solid State Lighting Assembly (SSLA) trocou lâmpadas fluorescentes por LEDs com intensidade e espectro ajustáveis, em três modos de referência: 4500 K para iluminação geral, 6500 K enriquecido em azul para alerta ou para deslocar o relógio biológico, e 2700 K com pouco azul antes do sono. No estudo Lighting Effects, o pré-sono foi descrito como 2700 K com até 50 lux ([NASA, Lighting Effects](https://ntrs.nasa.gov/api/citations/20160006727/downloads/20160006727.pdf); [NASA, SSLA](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20160005080.pdf)). É o mesmo raciocínio do modo noturno âmbar ([`07`](07-design-interface.md), seção 5.1) e da paisagem sonora do óculos. Atenção: a luz é contramedida existente; isso **não** prova que os sons do Orbit melhoram o sono.

## 3. Quem cuida da saúde

### 3.1 O sistema: CHeCS

O Crew Health Care System (CHeCS) é o conjunto de hardware, suprimentos e software de saúde da ISS, em três partes ([NASA, ISS Familiarization, seção 14](https://ntrs.nasa.gov/api/citations/20250005232/downloads/International%20Space%20Station%20Familiarization.pdf)):

| Parte | Para quê |
| --- | --- |
| HMS, Health Maintenance System | Prevenir, avaliar e tratar doença e lesão: kits médicos, remédios, sinais vitais, ECG (eletrocardiograma), ultrassom e exames em voo. |
| EHS, Environmental Health System | Qualidade química e microbiológica do ar, da água e de superfícies. |
| CMS, Countermeasures System | Exercício: avaliar condicionamento, prescrever e monitorar (ARED, esteira, cicloergômetro, monitores de frequência cardíaca e de pressão arterial). |

Nenhuma das três partes é um sensor contínuo que junta todos os exames. A bordo também há pacote de suporte avançado de vida, pacote ambulatorial, suporte respiratório, desfibrilador externo automático e um kit com remédios, medidor de pressão, glicosímetro, oxímetro, termômetro e tabela de acuidade visual ([NASA, lista CHeCS](https://ntrs.nasa.gov/api/citations/20100022009/downloads/20100022009.pdf?attachment=true); [NASA, kit da Expedition 55](https://ntrs.nasa.gov/api/citations/20210020209/downloads/Aunon-Chancellor_Medical%20Challenges.pdf)). Detalhes de cada aparelho em [`02-equipamentos-e-dados.md`](02-equipamentos-e-dados.md).

### 3.2 As pessoas

| Quem | Onde | O que faz |
| --- | --- | --- |
| **CMO** (Crew Medical Officer) | A bordo | Tripulante designado como cuidador médico. **Não precisa ser médico.** Examina e trata colegas com equipamentos e procedimentos treinados, seguindo o médico de voo ([NASA-STD-3001 Vol. 1, V1 5003](https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf)). O treino publicado varia: cerca de 25 h pré-voo numa fonte ([NASA, treino CMO](https://ntrs.nasa.gov/api/citations/20240001015/downloads/Med%20Ops%20Crew%20Training%20%20Ground%20Support%20Training.pdf)), 7 a 13 h em outra, conforme experiência prévia ([NASA, EIMO](https://ntrs.nasa.gov/api/citations/20240000152/downloads/EIMO_TIM_TRAINING_MeetingSummary_FINAL.pdf)); são recortes diferentes, não somar. |
| **Médico de voo** (Flight Surgeon) | Houston | Responsável clínico, com um Deputy Flight Surgeon na equipe de Flight Medicine. Considera condição clínica, dados recentes, prontidão física e tarefa, e avalia o tripulante antes de cada EVA, requisito V1 6006 ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/); [NASA, Health and Medical Care](https://www.nasa.gov/reference/3-0-health-and-medical-care/)). |
| **BME** (Biomedical Engineer) | Controle de Missão | Suporte técnico e operacional ao CHeCS ([NASA, Biomedical Flight Controllers](https://www.nasa.gov/directorates/esdmd/hhp/biomedical-flight-controllers/)). |
| **BHP** (Behavioral Health and Performance) | Terra | Profissional de saúde comportamental que conduz a conferência psicológica privada. |
| **International Medical Group** | Terra | Interface das operações médicas com o controle de voo; o Crew Surgeon coordena e a equipe médica tem a autoridade clínica ([OCHMO-TB-044](https://www.nasa.gov/wp-content/uploads/2025/08/ochmo-tb-044-medical-operations.pdf)). |

### 3.3 Conversas privadas

- **PMC (Private Medical Conference), semanal.** Diária nos primeiros 5 dias após a atracação, depois semanal, com cerca de 15 minutos, mais chamadas antes e depois de EVA e perto do retorno. Acompanha bem-estar, sono, alimentação, sintomas e dúvidas. É entrevista, não telemetria contínua ([OCHMO-STD-100.1A](https://www.nasa.gov/wp-content/uploads/2024/09/ochmo-std-100-1a-rev-a-signed.pdf); [NASA, Crew Health Consoles](https://www.nasa.gov/podcasts/houston-we-have-a-podcast/mission-control-crew-health-consoles/)). A periodicidade é definida pelo médico de voo e a comunicação em tempo real é a preferida, requisito V1 6002 ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/)).
- **PPC (Private Psychological Conference), a cada 14 dias**, com o profissional de BHP; a frequência pode ser ajustada ([OCHMO-STD-100.1A](https://www.nasa.gov/wp-content/uploads/2024/09/ochmo-std-100-1a-rev-a-signed.pdf)).
- **Privacidade é requisito.** Informação médica e psicológica enviada ao solo é privada, requisitos V1 6003 e V1 6011 ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/)). Por isso o Monitor geral nunca mostra conteúdo de conferência, diário ou questionário ([`../AGENTS.md`](../AGENTS.md), regra 9).

### 3.4 Calendário de exames (exemplo de missão de 180 dias)

Síntese da Tabela 8 do [OCHMO-STD-100.1A](https://www.nasa.gov/wp-content/uploads/2024/09/ochmo-std-100-1a-rev-a-signed.pdf), norma do OCHMO (Office of the Chief Health and Medical Officer, o escritório médico-chefe da NASA). É exemplo, não agenda garantida. Legenda: L = lançamento, FD = Flight Day (dia de voo), R = retorno (R-30 é 30 dias antes do retorno; R+3, 3 dias depois).

| Janela | O que acontece |
| --- | --- |
| L-180 a L-90 | Linha de base clínica, condicionamento e amostras; actigrafia em blocos de 2 semanas; visão, audição, saúde bucal e sono. |
| L-90 a L-1 | Teste de capacidade aeróbica, olhos, audição e exame físico pré-lançamento. |
| FD1 a FD7 | PMC diária nos 5 primeiros dias após atracar; depois semanal. |
| Primeira semana e mensal | Massa corporal e avaliação nutricional. |
| FD14, FD75 e FD165 | Teste de capacidade aeróbica; em FD14, também avaliação de saúde pelo CMO. |
| Até FD21, depois a cada 3 meses | Avaliação auditiva em órbita (OOHA, On-Orbit Hearing Assessment) ([versão NTRS](https://ntrs.nasa.gov/api/citations/20240006194/downloads/OCHMO%20STD%20100%201A%2005142024.pdf)). |
| FD30, FD90, a cada 90 dias e R-30 | Exames oculares de SANS: visão, foto de retina, OCT (Optical Coherence Tomography, tomografia de coerência óptica), ultrassom ocular e tonometria ([OCHMO-MTB-001](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)). |
| FD30 e perto de R-30 | Spaceflight Standard Measures, pesquisa padronizada do HRP: cognição, imunidade, sangue e urina, sono ([NASA NTRS, Standard Measures](https://ntrs.nasa.gov/citations/20230014025)). |
| A cada 14 dias | PPC. |
| Diário e semanal | Registro diário de ingestão no ISS FIT (Food Intake Tracker); questionário de dieta semanal; força e condicionamento acompanhados ao menos a cada 30 dias. |
| R-14 a R+14 | Teste aeróbico antes e depois; após o pouso, audição em R+3, aeróbico em R+5, postura diária até estabilizar e densitometria óssea (DXA). |

A tabela publicada lista também FD255, data que não cabe numa missão de 180 dias; é inconsistência do próprio exemplo.

## 4. Os cinco perigos (RIDGE)

O Human Research Program (HRP, Programa de Pesquisa Humana da NASA) organiza os riscos à saúde em cinco perigos, sigla **RIDGE**: Radiation, Isolation and confinement, Distance from Earth, Gravity fields e Hostile/closed environments ([HRR, Evidence](https://humanresearchroadmap.nasa.gov/Evidence/)).

### 4.1 R: Radiação

| Pergunta | Resposta |
| --- | --- |
| O que é | Radiação ionizante: raios cósmicos galácticos, partículas solares e radiação aprisionada. Pode causar dano celular, câncer e efeitos em órgãos e no sistema nervoso ([NASA-STD-3001 Vol. 1, cap. 4](https://www.nasa.gov/reference/4-0-human-performance/)). |
| Exemplo concreto | Um evento de partículas solares pode subir a dose rapidamente; no dia a dia, a dose se acumula ao longo de toda a carreira. |
| Do que depende | Órbita, blindagem, atividade solar e localização dentro da nave. |
| O que dá para monitorar | Dose acumulada e de evento, alertas solares oficiais, tempo em abrigo. Um vestível não mede sozinho o risco biológico, e sintomas não estimam dose com segurança. |

### 4.2 I: Isolamento e confinamento

| Pergunta | Resposta |
| --- | --- |
| O que é | Grupo pequeno, com privacidade e contato social limitados por meses ou anos. Afeta humor, sono, cooperação, cognição e comportamento ([HRR, Evidence](https://humanresearchroadmap.nasa.gov/Evidence/)). |
| Exemplo concreto | Horário de trabalho, luz, ruído e mudanças de rotina podem reduzir o sono; a fadiga aumenta lapsos de atenção; sob estresse, a comunicação da equipe pode piorar. |
| O que dá para monitorar | Sono, autorrelato confidencial, carga de trabalho e indicadores psicossociais, sempre com contexto e proteção de privacidade. |

### 4.3 D: Distância da Terra

| Pergunta | Resposta |
| --- | --- |
| O que é | Quanto mais longe, maior o atraso e a interrupção da comunicação; evacuação e reabastecimento rápidos deixam de existir e o cuidado médico precisa de autonomia ([HRR, risco Medical Conditions](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=95)). |
| Exemplo concreto | Em Marte, uma pergunta ao médico e a resposta podem levar de 8 a 48 minutos só de ida e volta do sinal (seção 7). |
| O que dá para monitorar | Estado da comunicação, inventário médico e capacidade da tripulação. O software precisa continuar útil desconectado. |

### 4.4 G: Campos de gravidade

| Pergunta | Resposta |
| --- | --- |
| O que é | Microgravidade, transições e gravidade parcial (Lua, Marte) alteram fluidos, osso, músculo, equilíbrio, controle motor e a tolerância ao voltar à gravidade ([NASA, OCHMO Technical Briefs](https://www.nasa.gov/ochmo/hsa-standards/ochmo-technical-briefs/)). |
| Exemplo concreto | Rosto inchado e pernas finas logo no início do voo; osso perdendo densidade mês a mês; visão de perto mudando (SANS); tontura ao ficar de pé depois do pouso. |
| O que dá para monitorar | Sinais vitais, testes funcionais, carga de exercício, visão, sintomas de equilíbrio e hidratação, sempre ligados à fase da missão. |

### 4.5 E: Ambientes hostis e fechados

| Pergunta | Resposta |
| --- | --- |
| O que é | Cabine e traje são sistemas fechados: pressão, composição do ar, ruído, temperatura, contaminantes e recursos limitados. Falha ambiental é risco agudo; exposição crônica também afeta a saúde ([NASA-STD-3001 Vol. 2, cap. 6](https://www.nasa.gov/reference/6-0-natural-and-induced-environments-vol-2/)). |
| Exemplo concreto | Dados da ISS associaram CO2 mais alto a dor de cabeça ([OCHMO-TB-004](https://www.nasa.gov/ochmo-tb-004-carbon-dioxide-2/)); ventiladores e bombas fazem ruído o dia todo; a EVA expõe à doença descompressiva. |
| O que dá para monitorar | Sensores ambientais validados e sintomas. Condição fora dos limites do veículo dispara o alarme da própria estação. |

## 5. O que acontece com o corpo (lista ampliada de dores)

O documento inicial ([`../pesquisa/documento-inicial.md`](../pesquisa/documento-inicial.md), aba "Dores e Aliviadores") tinha 15 dores e pedia para ampliar a lista. Cinco delas (Radiação espacial, Isolamento e confinamento, Distância da Terra, Campos de gravidade, Ambientes hostis e fechados) são os próprios perigos RIDGE e viraram os grupos abaixo. As outras dez estão marcadas na coluna "Na lista?":

- **Original**: estava na lista inicial (entre aspas, o nome original quando mudou).
- **Desdobra**: item novo que detalha um item original.
- **Nova**: acrescentada pela pesquisa.

A coluna "Região T2" usa os ids da figura humana ([`07`](07-design-interface.md), seção 4). As janelas de "Quando aparece" são de vigilância, coerentes com a literatura e os protocolos, não previsões para uma pessoa ([pesquisa, D3](../pesquisa/bruto/03-riscos-indicadores-limiares.md)). Um item clínico não vira automaticamente um risco formal do HRP.

### 5.1 Radiação

| Condição | Na lista? | O que é | Quando aparece | Região T2 |
| --- | --- | --- | --- | --- |
| Câncer induzido por radiação | Nova | Dano genético que eleva o risco de câncer ao longo da vida; depende de dose, órgão, idade, sexo e modelo de risco, não de sintomas ([HRR i=96](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=96)). | Anos depois: é risco futuro da dose acumulada. | `corpo` |
| Síndrome aguda da radiação em evento solar | Nova | Exposição grande e rápida pode afetar medula óssea, pele e cristalino; a triagem vem da dosimetria do evento e do médico, não de autodiagnóstico ([V1, cap. 4](https://www.nasa.gov/reference/4-0-human-performance/)). | Agudo: acompanha um evento de partículas solares, que pode ser rápido. | `corpo` |
| Efeitos no coração e nos vasos | Desdobra "Problema vascular" | A NASA limita a dose no sistema circulatório por efeitos não cancerígenos; é proteção de exposição, não previsão de doença individual ([V1 Rev C](https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf)). | Longo prazo, pela dose acumulada. | `coracao` |
| Efeitos no sistema nervoso central | Nova | Radiação, microgravidade, sono e estresse podem somar efeitos na cognição; não há teste curto validado que atribua um déficit à radiação em voo ([HRR i=96](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=96)). | Acumula durante a missão. | `cerebro` |

### 5.2 Isolamento e confinamento

| Condição | Na lista? | O que é | Quando aparece | Região T2 |
| --- | --- | --- | --- | --- |
| Condições comportamentais e psiquiátricas | Original ("Problemas emocionais") | Isolamento, confinamento, carga de trabalho e sono podem afetar humor, ansiedade, cognição e funcionamento; escalas servem para tendência e triagem confidencial, não para diagnóstico ([HRR i=99](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=99)). | Ao longo de meses de isolamento, sem relógio fixo. | `cerebro` |
| Conflitos de equipe e adaptação psicossocial | Nova | Cooperação, comunicação e coordenação podem piorar sob estresse; o risco é coletivo e não se tira de uma escala individual ([HRR i=101](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=101)). | Ao longo da missão. | `cerebro` |
| Perda de sono e desalinhamento circadiano | Nova | Horário, luz, ruído, estresse e mudança de rotina encurtam o sono ou deslocam o relógio biológico; a fadiga aumenta lapsos de atenção ([HRR i=100](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=100)). | Desde a primeira noite ruim; a privação crônica se acumula. | `cerebro` |
| Alterações cognitivas e de desempenho | Nova | Atenção, memória de trabalho, tempo de reação e decisão mudam com sono, estresse, doença, carga e ambiente; só se percebe comparando com a linha de base ([HRR i=99](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=99)). | Já no dia seguinte a uma noite ruim. | `cerebro` |

### 5.3 Distância da Terra

| Condição | Na lista? | O que é | Quando aparece | Região T2 |
| --- | --- | --- | --- | --- |
| Capacidade médica limitada a bordo | Nova | Equipe pequena, suprimento limitado e comunicação atrasada para avaliar, tratar e estabilizar; é risco de sistema, além da condição clínica ([HRR i=175](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=175)). | Qualquer momento; pesa mais quanto mais longe da Terra (seção 6). | Nenhuma (contexto da missão) |
| Falha ou toxicidade de medicamentos | Nova | Prazo, temperatura, radiação, embalagem e mudanças no corpo podem reduzir a eficácia ou aumentar efeitos adversos ([HRR i=177](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=177)). | Depende do remédio, do lote e do armazenamento. | Nenhuma (registro de medicação) |
| Dente, lesão e doença aguda | Nova | Dor de dente, infecção, trauma ou doença podem exigir intervenção longe de consultório e sem evacuação rápida ([HRR i=95](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=95)). | Qualquer momento (agudo). | `corpo` |

### 5.4 Campos de gravidade

| Condição | Na lista? | O que é | Quando aparece | Região T2 |
| --- | --- | --- | --- | --- |
| Alterações de fluidos: rosto inchado e "pernas de pássaro" | Desdobra "Problema vascular" | Sem gravidade, o líquido do corpo sobe para a cabeça e o tronco: o rosto incha e as pernas afinam. Congestão e dor de cabeça também podem vir do CO2 ([OCHMO-MTB-001](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)). | Cedo, logo no início do voo. | `coracao` |
| SANS (síndrome neuro-ocular associada ao voo espacial) | Original ("Risco de SANS") | Edema do disco óptico, dobras na retina, achatamento do globo e mudança de grau. O brief da NASA aponta cerca de 70% com algum sinal e cerca de 18% clinicamente preocupante; uma coorte de 64 astronautas achou 81% ([OCHMO-MTB-001](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf); [coorte NASA/ESA](https://pmc.ncbi.nlm.nih.gov/articles/PMC13462731/)). | Durante missões longas; exames em FD30, FD90 e depois a cada 90 dias. | `olhos` |
| Perda óssea e risco de fratura | Original ("Osteoporose") | Sem carga, o osso perde densidade, sobretudo no quadril e na coluna. Média reportada de cerca de 1 a 1,5% ao mês, descrição de literatura e não limiar ([NASA NTRS](https://ntrs.nasa.gov/citations/20150010417)). O risco ativo se chama fratura; "osteoporose" é nome histórico ([HRR i=77](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=77)). | Meses de voo. | `ossos` |
| Perda de músculo, força e capacidade aeróbica | Original ("Funções motoras") | Menos carga reduz força, resistência e VO2max (consumo máximo de oxigênio); algumas séries históricas observaram perda de 10 a 30% da capacidade aeróbica ([V1, cap. 4](https://www.nasa.gov/reference/4-0-human-performance/); [HRR i=180](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=180)). | Acumula na missão; aparece mais em teste, EVA e retorno. | `musculos` |
| Enjoo espacial e alteração sensorimotora | Original ("Funções motoras") | Conflito entre ouvido interno, visão e percepção do corpo pode causar náusea, mal-estar, desorientação e piora temporária de tarefas motoras ([HRR i=88](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=88)). | Na adaptação ao voo e no retorno à gravidade. | `digestao` (enjoo) e `cerebro` |
| Adaptação cardiovascular e arritmias | Original ("Problema vascular") | Descondicionamento, redistribuição de fluidos e radiação afetam o coração; alteração de ritmo exige profissional, e não existe limiar genérico da NASA que diagnostique arritmia ([HRR i=179](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=179)). | Evolui ao longo da missão. | `coracao` |
| Intolerância ortostática | Desdobra "Problema vascular" | Ao voltar à gravidade, mudanças no coração e no volume de sangue circulante podem causar tontura, quase desmaio ou desmaio ao ficar de pé ([HRR i=179](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=179)). | No retorno. | `coracao` |
| Anemia do voo espacial | Nova | Destruição aumentada de glóbulos vermelhos (hemólise): a hemoglobina média caiu 8,8% quatro dias após o pouso e 5 de 13 astronautas chegaram a anemia clínica, numa amostra pequena ([Trudel et al., 2022](https://www.nature.com/articles/s41591-021-01637-7)) [PAPER]. | Medida após o pouso no estudo; acompanhar como série temporal. | `sangue` |
| Cálculo renal | Nova | Cálcio liberado do osso, sal, pouca água e pouca urina podem favorecer a formação de cristais; dor no flanco, sangue na urina ou dificuldade para urinar pedem médico ([HRR i=81](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=81); [OCHMO-MTB-003](https://www.nasa.gov/ochmo-mtb-003-urinary-health-2/)). | Sem relógio fixo; depende da urina e da hidratação. | `rins` |
| Dor lombar e alongamento da coluna | Nova | Os discos descomprimem, a estatura aumenta temporariamente e pode haver dor nas costas; a preocupação com lesão de disco está marcada como inativa no HRP ([HRR, Evidence](https://humanresearchroadmap.nasa.gov/Evidence/); [NASA NTRS](https://ntrs.nasa.gov/citations/20240005190)). | Durante o voo e na volta à gravidade. | `musculos` |
| Recondicionamento após o retorno | Nova | Força, equilíbrio, mobilidade e tolerância postural podem seguir reduzidos depois do pouso; a recuperação é acompanhada por profissionais ([V1, cap. 3](https://www.nasa.gov/reference/3-0-health-and-medical-care/)). | Dias ou mais após o pouso. | `musculos` |

### 5.5 Ambientes hostis e fechados

| Condição | Na lista? | O que é | Quando aparece | Região T2 |
| --- | --- | --- | --- | --- |
| Hipóxia | Original | Pouca pressão parcial de O2 no ar respirado afeta oxigenação, cognição, sono e desempenho. O limite ambiental não é a mesma coisa que a saturação de oxigênio (SpO2) da pessoa ([HRR i=173](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=173)). | Agudo, após falha ambiental. | `pulmoes` |
| CO2 alto e dor de cabeça | Nova | Dados da ISS associaram exposição a CO2 a dor de cabeça; um efeito cognitivo é possível, sem corte individual estabelecido ([OCHMO-TB-004](https://www.nasa.gov/ochmo-tb-004-carbon-dioxide-2/)). | Horas a dias (a NASA trabalha com médias de 1 hora e de 7 dias). | `pulmoes` e `cerebro` |
| Despressurização e doença descompressiva | Original ("Doença descompressiva") | Mudança de pressão, sobretudo na EVA, pode formar bolhas de gás no corpo (DCS, Decompression Sickness), com sintomas articulares, neurológicos ou cardiopulmonares ([HRR i=168](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=168)). | Agudo, ligado à EVA e à descompressão. | `corpo` |
| Poeira lunar e de outros corpos | Nova | Partículas podem irritar ou lesar olhos, pele e pulmões; a toxicidade varia com a composição ([HRR i=82](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=82)). | Durante e após atividade em superfície; não se aplica à ISS. | `pulmoes`, `olhos` e `pele` |
| Tóxicos e contaminantes da cabine | Nova | Produtos de combustão, compostos orgânicos voláteis, gases e materiais da cabine podem irritar ou intoxicar conforme concentração e duração ([V2, cap. 6](https://www.nasa.gov/reference/6-0-natural-and-induced-environments-vol-2/)). | Agudo após falha ou combustão, ou por exposição prolongada. | `pulmoes` |
| Microrganismos e interação hospedeiro-micróbio | Original ("Micro-organismos") | Micróbios da cabine e da tripulação interagem com imunidade, pele e mucosas ([HRR i=80](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=80)). | Contínuo, durante toda a missão. | `sangue` e `pele` |
| Alterações imunes e inflamação | Original ("Sistema imune") | Células e função imune mudam com voo, estresse, exercício, sono, nutrição e infecção; não há faixa única da NASA para julgar um resultado isolado ([HRR i=85](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=85)). | Durante a missão. | `sangue` |
| Reativação de vírus latentes | Desdobra "Sistema imune" | Vírus que já viviam no corpo (EBV, VZV e CMV: Epstein-Barr, varicela-zóster e citomegalovírus) podem voltar a ser detectados na saliva; detectar não é o mesmo que estar doente ([HRR i=85](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=85)). | Durante a missão; exige amostras seriadas. | `sangue` |
| Alimentação, hidratação e massa corporal | Original ("Alimentação e nutrição") | Comer e beber pouco afeta energia, recuperação, osso, imunidade e trabalho; apetite, cardápio limitado e agenda pesam. A necessidade é individual, sem percentual universal de perda de peso ([HRR i=176](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=176)). | Varia dia a dia; o que importa é a tendência. | `digestao` e `rins` |
| Perda auditiva por ruído | Nova | Ruído acumulado prejudica a audição; o critério de 24 horas usa dose, e uma leitura isolada em dBA não é dose diária ([V2, cap. 6](https://www.nasa.gov/reference/6-0-natural-and-induced-environments-vol-2/)). | Cumulativo, dia após dia. | `ouvidos` |
| Pele e unhas | Nova | Pressão, umidade, atrito, microtrauma e poeira podem afetar pele e unhas; foto documenta a evolução, mas não diagnostica ([HRR i=95](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=95)). | Qualquer momento. | `pele` |
| Lesões de mão e unha na EVA | Nova | Luvas pressurizadas e trabalho repetitivo podem causar dor, inchaço, hematoma ou lesão de unha ([HRR i=84](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=84)). | Durante ou depois da EVA. | `pele` e `musculos` |
| Cargas dinâmicas e lesões | Nova | Aceleração, vibração, pouso, manuseio de carga e tarefas em traje podem causar lesão ([HRR i=167](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=167)). | Lançamento, pouso e tarefas com carga. | `musculos` e `ossos` |
| Erro na interação humano-sistema | Nova | Interfaces, alarmes, automação e procedimentos podem induzir erro; a norma pede detecção e recuperação de erro ([V2, cap. 6](https://www.nasa.gov/reference/6-0-natural-and-induced-environments-vol-2/); [HRR i=175](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=175)). | Qualquer momento. | Nenhuma: vale para o próprio software, que deve mostrar fonte, hora e confiança do dado. |

**Placar da ampliação:** 15 dores na lista inicial viraram 5 grupos e 36 condições: 11 linhas originais, 4 desdobramentos e 21 novas. Notas:

- **"Problema vascular"** foi dividido em quatro linhas porque junta causas diferentes; a pesquisa cita também trombose como causa possível, sem linha própria ([pesquisa, notas de classificação](../pesquisa/bruto/03-riscos-indicadores-limiares.md)).
- **Anemia do voo espacial** foi agrupada em gravidade por nós; a pesquisa não atribui um perigo RIDGE a ela.
- **Correção de números do documento inicial.** O texto inicial dizia "70% a 81%" com sinais de SANS, "15% a 20%" clinicamente preocupantes e "47% a 48% dos olhos" precisando de correção óptica. A pesquisa corrigiu: 70% e cerca de 18% vêm do brief da NASA; 81% vem de outra coorte, de 64 astronautas, com métodos diferentes; e 48,2% (27 de 56 olhos) foi **deslocamento hipermetrópico** médio de +0,12 dioptria numa amostra, não necessidade de óculos novos ([estudo](https://pubmed.ncbi.nlm.nih.gov/40194644/)). O brief da NASA relata mudança de grau de pelo menos 0,75 dioptria em cerca de 15% dos olhos e nenhum tripulante com perda visual incurável naquele levantamento ([OCHMO-MTB-001](https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf)).

## 6. A carteira de riscos do HRP

A carteira consultada pela pesquisa tem 21 riscos ativos no HRR. Cada um recebe uma nota **LxC** (likelihood × consequence, probabilidade × consequência), aprovada pelo Human System Risk Board (HSRB) para cada missão de referência de projeto (DRM, Design Reference Mission) ([HRR, arquitetura](https://humanresearchroadmap.nasa.gov/architecture/); [matriz de risco HSRB](https://ntrs.nasa.gov/api/citations/20240009961/downloads/AIB_Intro_IMEA.pdf)).

> **LxC é risco de programa, não semáforo clínico.** Ele responde "quão provável e quão grave é este problema para uma missão do tipo X", olhando a tripulação e as contramedidas atuais. Não diz se o tripulante A está bem hoje, e não autoriza pintar verde, amarelo ou vermelho a partir dele ([HRR, arquitetura](https://humanresearchroadmap.nasa.gov/architecture/)). As cores do software vêm de [`03`](03-indicadores-e-limiares.md).

Como ler: matriz de 5 por 5; o primeiro número é a probabilidade e o segundo a consequência, quanto maior, pior. Cada célula traz dois pares: **OPS** (impacto nas operações da missão) / **LTH** (Long-Term Health, saúde a longo prazo). LEO longa vai de 30 dias a 1 ano e não separa ISS de 6 e de 12 meses; Marte preparatória tem menos de 1 ano; Marte planetária vai de 730 a 1224 dias.

| Risco (título curto no HRR) | Em português | LEO longa (ISS) | Lua longa (órbita e superfície) | Marte preparatória | Marte planetária | Aprovação |
| --- | --- | --- | --- | --- | --- | --- |
| [Medical Conditions](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=95) | Condições médicas em missão | 4x2 / 4x2 | 5x4 / 4x4 | 5x4 / 4x4 | 5x4 / 5x4 | 05/2021 |
| [Pharm](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=177) | Medicamentos ineficazes ou tóxicos | 1x1 / 1x1 | 4x2 / 2x2 | 4x3 / 3x2 | 5x3 / 5x3 | 12/2021 |
| [Renal Stone](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=81) | Cálculo renal | 3x4 / 2x3 | 3x4 / 2x3 | 3x4 / 3x4 | 4x4 / 4x4 | 04/2022 |
| [Dynamic Loads](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=167) | Lesões por cargas dinâmicas | 4x3 / 3x2 | 4x4 / 4x4 | 4x3 / 3x2 | 4x4 / 4x4 | 12/2023 |
| [DCS](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=168) | Doença descompressiva | 2x2 / 2x1 | 5x3 / 2x1 | 2x2 / 2x1 | 5x3 / 2x1 | 07/2023 |
| [Food and Nutrition](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=176) | Alimentação e nutrição inadequadas | 5x2 / 3x2 | 5x4 / 4x3 | 5x4 / 5x3 | 5x5 / 5x3 | 07/2022 |
| [Hypoxia](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=173) | Hipóxia | 3x2 / 2x2 | 3x3 / 2x2 | 3x3 / 2x2 | 3x3 / 2x2 | 11/2022 |
| [Bone Fracture](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=77) | Fratura por alterações ósseas | 1x2 / 2x2 | 3x3 / 4x2 | 2x2 / 4x2 | 4x4 / 5x2 | 05/2022 |
| [Immune](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=85) | Resposta imune alterada | 4x2 / 4x1 | 4x3 / 4x2 | 4x3 / 4x2 | 4x3 / 4x2 | 11/2023 |
| [SANS](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=105) | Síndrome neuro-ocular | 4x3 / 4x3 | 4x3 / 4x3 | 4x3 / 4x3 | 4x4 / 4x5 | 07/2022 |
| [Fitness](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=180) | Condicionamento físico reduzido | 5x1 / 5x2 | 5x3 / 5x2 | 5x2 / 5x2 | 5x4 / 5x3 | 04/2024 |
| [Sleep](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=100) | Perda de sono, ritmo e sobrecarga | 5x2 / 3x1 | 5x2 / 3x1 | 5x2 / 4x2 | 5x2 / 4x2 | 03/2022 |
| [Dust](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=82) | Poeira de corpos celestes | Não aplicável | 3x3 / 3x4 | Não aplicável | 4x4 / 4x4 | 03/2024 |
| [EVA](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=84) | Lesões e desempenho em EVA | 4x2 / 5x2 | 5x4 / 5x2 | 4x3 / 5x2 | 5x4 / 5x2 | 12/2023 |
| [Carcinogenesis](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=96) | Câncer por radiação (matriz antiga 3x4) | 1x1 / 3x2 | 1x1 / 3x2 | 1x1 / 3x3 | 1x1 / 3x3 | Nota 5x5 atual NÃO ENCONTRADA |
| [Cardiovascular](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=179) | Adaptações cardiovasculares | 4x3 / 1x2 | 4x3 / 1x2 | 4x3 / 1x2 | 4x4 / 2x4 | 05/2024 |
| [Behavioral Health](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=99) | Saúde comportamental e cognição | 5x2 / 2x3 | 5x2 / 2x3 | 5x3 / 2x3 | 5x3 / 2x5 | 07/2024 |
| [Team](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=101) | Cooperação e comunicação da equipe | 4x2 / N/A | 5x3 / N/A | 5x4 / N/A | 5x5 / N/A | 04/2024 |
| [EIHSO](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=175) | Operar de forma independente da Terra | 5x2 / N/A | 5x3 / N/A | 5x4 / N/A | 5x5 / N/A | 02/2023 |
| [Microhost](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=80) | Interação hospedeiro-microrganismo | 2x3 / 2x2 | 2x3 / 2x2 | 2x3 / 2x2 | 4x3 / 4x3 | 12/2024 |
| [Sensorimotor](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=88) | Função sensorimotora e vestibular | 1x2 / 2x2 | 3x5 / 2x2 | 1x2 / 1x2 | 4x5 / 2x2 | 11/2024 |

Cuidados de leitura:

- As notas foram aprovadas em datas diferentes; não são uma fotografia do mesmo momento.
- **Carcinogenesis** ainda usa a matriz antiga de 3 por 4; não compare com as linhas de 5 por 5.
- **Behavioral Health:** o Evidence Report mostra 2x2 no LTH de LEO longa, e a página do risco mostra 2x3; a tabela segue a página, com a divergência a confirmar ([Evidence Report](https://humanresearchroadmap.nasa.gov/Evidence/other/HRP-ER-BMED-HFBP-20250210.pdf)).
- **Team e EIHSO** têm N/A em LTH no próprio HRR; os efeitos de longo prazo ficam em outros riscos.
- **EIHSO não é EIMO.** EIHSO (Earth Independent Human-Systems Operations) é o risco de operar sem a Terra; EIMO (Earth Independent Medical Operations) é o conceito médico da seção 7.
- **Ideia para a apresentação:** os riscos crescem com a distância. Medical Conditions vai de 4x2 na ISS a 5x4 em Marte; Team e EIHSO vão de 4x2 e 5x2 a 5x5.

## 7. Da ISS a Marte

| Aspecto | ISS hoje | Marte |
| --- | --- | --- |
| Atraso da comunicação | Conversa médica em tempo real é a preferida (V1 6002) e o Controle de Missão funciona 24 horas ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/)). | 4 a 24 minutos por trecho, ou 8 a 48 minutos para pergunta e resposta, conforme a distância orbital ([NASA, Space Communications](https://www.nasa.gov/missions/tech-demonstration/space-communications-7-things-you-need-to-know/)); análises da NASA apontam cerca de 4 a 22 minutos ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20240011265/downloads/12-3-24%2020240011265.pdf?attachment=true)). |
| Períodos sem contato | Não tratados nas fontes deste documento. | Janelas e blackouts que dependem da arquitetura da missão e do alinhamento solar ([NASA NTRS](https://ntrs.nasa.gov/api/citations/20240011265/downloads/12-3-24%2020240011265.pdf?attachment=true)). |
| Evacuação | A norma exige capacidade de levar o doente a um nível de cuidado mais alto (V1 3007), mas o retorno depende de veículo, dinâmica orbital e recursos ([NASA, Health and Medical Care](https://www.nasa.gov/reference/3-0-health-and-medical-care/)). | A distância impede evacuação e reabastecimento rápidos ([HRR i=95](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=95)). |
| Quem decide na urgência | A equipe médica em terra tem a autoridade clínica e coordena com o controle de voo ([OCHMO-TB-044](https://www.nasa.gov/wp-content/uploads/2025/08/ochmo-tb-044-medical-operations.pdf)). | A decisão urgente precisa ser tomada a bordo, com os procedimentos da missão; o solo entra em modo armazenar e encaminhar ([NASA, Medical Operations](https://www.nasa.gov/reference/6-0-medical-operations/)). |
| Treino do CMO | 7 a 13 h ou cerca de 25 h, conforme a fonte (seção 3.2). | Propostas de 80 a 120 h foram discutidas para missões com mais autonomia; não é o treino nominal ([NASA, EIMO](https://ntrs.nasa.gov/api/citations/20240000152/downloads/EIMO_TIM_TRAINING_MeetingSummary_FINAL.pdf)). |

**Earth Independent Medical Operations (EIMO)** é a capacidade de a tripulação reconhecer, prevenir, avaliar e tratar condições com autonomia crescente. A NASA estuda um Clinical Decision Support System (CDSS, sistema de apoio à decisão clínica) que combinaria monitoramento passivo e ativo com orientação local em tempo real; a publicação é pesquisa de viabilidade, não um sistema médico autônomo certificado ([NASA Ames, CDSS para EIMO](https://www.nasa.gov/centers-and-facilities/ames/ames-science/ames-space-biosciences/a-clinical-decision-support-system-for-earth-independent-medical-operations/); [HRR i=175](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=175)).

**Por que isso justifica um software offline que explica os dados à própria tripulação:**

1. **Sem resposta imediata da Terra, a primeira leitura é da tripulação.** Com 8 a 48 minutos de ida e volta, o astronauta precisa entender sozinho o que o número significa e o que fazer agora.
2. **O CMO não é médico.** Ele precisa de evidências organizadas, procedimentos locais e um resumo pronto, não de dados crus espalhados em vários aparelhos.
3. **Nada pode depender de rede.** A pesquisa recomenda procedimentos locais versionados, formulário de sintomas, fila segura para sincronizar depois e estados que mostrem o modo de contato: "com suporte em tempo real", "armazenar e encaminhar" ou "sem contato" [INFERÊNCIA da pesquisa, a partir do atraso e do conceito EIMO] ([pesquisa, D6](../pesquisa/bruto/03-riscos-indicadores-limiares.md)).
4. **Explicar gera confiança e evita erro.** O próprio risco de interação humano-sistema pede que o software mostre fonte, hora e confiança do dado (seção 5.5).

## 8. Como isso vira o nosso software

Os limiares de cada indicador estão em [`03`](03-indicadores-e-limiares.md); as regras de cruzamento, em [`04`](04-cruzamento-de-dados.md); as telas, em [`07`](07-design-interface.md).

1. **Radiação → tela T5 e região `corpo`.** Taxa de dose, dose acumulada e clima espacial; cenário C2 (regra R-RAD-01). O software mostra e explica; a decisão de abrigo é do controle de missão, e sintoma nunca estima dose.
2. **Isolamento, lado individual → check-in T3, sono T6 e região `cerebro`.** Sono medido contra as 8,5 h programadas e contra o normal da pessoa, teste de reação (PVT, Psychomotor Vigilance Test), fadiga e humor alimentam o índice de prontidão; cenário C4. Mente e humor ficam privados por padrão no Monitor geral, como as conferências privadas reais.
3. **Isolamento, lado coletivo → Monitor geral T1.** O risco de equipe é coletivo: metas da tripulação inteira, sem ranking, e cuidado mútuo com o botão "Estou indo ver".
4. **Distância → offline e fila para o solo.** Tudo roda a bordo; a barra superior mostra o estado da comunicação; o alerta vermelho gera o resumo para a próxima PMC e, em Marte, abre o protocolo autônomo ([`05`](05-arquitetura-software.md), seção 2.2).
5. **Gravidade, olhos → região `olhos` e testes rápidos.** Grade de Amsler, acuidade de perto e sintomas visuais, que fazem parte do protocolo de SANS da NASA, mais o lembrete do calendário de exames oculares; cenário C3. Câmera comum não classifica nada sozinha.
6. **Gravidade, corpo em descarga → regiões `ossos`, `musculos`, `rins` e `coracao`.** Adesão ao exercício (ARED, CEVIS, T2), massa corporal mensal, hidratação (cenário C5), frequência cardíaca e sua variabilidade contra a linha de base.
7. **Ambiente hostil → T5 e regras de cruzamento.** CO2, O2, pressão, temperatura, umidade e ruído por módulo; CO2 alto com dor de cabeça e reação mais lenta vira o cenário C1 (R-CO2-01). Fogo, despressurização e atmosfera tóxica são do alarme da estação: o software aponta o procedimento e não comanda nada.
8. **Imunidade, micróbios e pele → regiões `sangue` e `pele`.** Sintomas no check-in, temperatura e fotos como registro; exames de laboratório chegam tarde e aparecem sempre com a idade do dado.

Regra que atravessa tudo: onde a pesquisa diz NÃO ENCONTRADO, o indicador aparece só com tendência e linha de base pessoal, sem cor de limiar fixo, e dado ausente é cinza, nunca verde ([`../AGENTS.md`](../AGENTS.md), regras 1 e 7).

## 9. O que a pesquisa deixou em aberto

- **Tamanho da tripulação a bordo:** não consta nas fontes deste documento; o valor de 7 usado em [`07`](07-design-interface.md) precisa de fonte.
- **Limiares de voo não publicados** para marcadores ósseos, cálcio urinário, perda aceitável de massa, SpO2, frequência cardíaca, pressão, arritmias, hemograma, carga viral, pressão intraocular, sintomas psicológicos e cor da urina por câmera ([pesquisa, lacunas](../pesquisa/bruto/03-riscos-indicadores-limiares.md)).
- **Nota LxC atual de Carcinogenesis** e a divergência de Behavioral Health (seção 6).
- **FD255** no calendário de 180 dias (seção 3.4).
- **Validação de câmera, EEG (eletroencefalograma), EOG (eletro-oculograma) e vestíveis** para SANS, pele, hidratação, emoção e urgência ainda não existe; no Orbit, são hipóteses de pesquisa, não medição clínica aprovada.
