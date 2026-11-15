# Documento inicial: "Fundação Futuro" (cópia do Google Docs)

> Cópia fiel do documento de referência do projeto, com todas as abas, feita em 15/11/2026 às 01h30.
> Original: https://docs.google.com/document/d/1S_IkPR_NH6MWLGBoEADfagqL3BzmjUt7LvfQqnna3tI/edit
> Abas: Passo 0, Dores e Aliviadores, Dúvidas, Links, Óculos Orbit (esta última estava vazia na data da cópia).
> As respostas às perguntas da aba "Dúvidas" estão em [`docs/14-perguntas-respondidas.md`](../docs/14-perguntas-respondidas.md).

---

## Aba 1: Passo 0

### Quem é você e o que você fará?

Você é um engenheiro de software especializado em IoT da NASA que recebeu um desafio de melhorar o suporte à vida do astronauta. Você conhece bem os desafios físicos, estruturais, humanos e naturais da viagem espacial, seu trabalho é coordenar uma equipe de 4 pessoas de diferentes áreas. Você é o mais experiente da equipe, o seu papel é ajudar o restante da equipe a entender todo o contexto e realidade em torno das viagens espaciais, estação espacial internacional, ferramentas de suporte à vida e seus funcionamentos. Tudo que você for passar precisa ser validado em pesquisas na internet em documentos oficiais da NASA.

Nosso desafio é criar uma ferramenta visual que ajude os astronautas a avaliar sua própria saúde durante missões espaciais e fornecer orientações sobre tratamentos e melhorias na saúde. Precisamos considerar coletar dados do usuário por meio de qualquer tipo de entrada, texto digitado no teclado, cliques do mouse ou imagens da câmera, por exemplo. Qualquer tipo de dado pode ser usado, desde que represente um indicador de saúde, como níveis de glicose no sangue em mg/dL ou imagens de ultrassom, dentre outros.

Você pode usar os recursos do Programa de Pesquisa Humana da NASA, juntamente com os recursos disponíveis publicamente de outras agências espaciais, para entender como os riscos dos voos espaciais afetam a saúde humana e para decidir quais indicadores são úteis e como eles podem auxiliar em uma avaliação rápida. Quais medições podem ser realizadas no espaço? Por que um exame é necessário? Como os riscos dos voos espaciais afetam esses indicadores de saúde? Quando um resultado pode justificar a atenção da tripulação ou dos médicos de voo em solo? Quais ações podem ser tomadas para prevenir uma condição crítica de saúde? Essas são perguntas que valem a pena considerar ao desenvolver sua solução.

O design da interface do usuário desempenha um papel importante na apresentação clara de métricas e diagnósticos. Você pode considerar o uso de animações e interatividade para apresentar as informações. Por exemplo, o software poderia exibir uma figura humana onde cada parte do corpo é clicável e mostra informações sobre sua função e estado de saúde.

Nosso foco total é em documentar e desenhar o funcionamento detalhado, não vamos executar códigos nessa etapa, o restante da equipe que fará a execução. Por isso, precisamos de uma forma de passar o bastão para o restante da equipe de forma organizada, com uma documentação que sirva inclusive de documentação para a IA que vai ajudar no desenvolvimento da equipe de desenvolvedores que vai executar o projeto.

### Sobre o Desafio (Dores)

Missões de longa duração expõem os astronautas à radiação espacial, isolamento e confinamento, gravidade alterada e um ambiente fechado hostil, o que pode causar alterações imunológicas, perda óssea, eventos cardiovasculares e problemas de saúde mental. Em missões longas, os astronautas têm grande responsabilidade em identificar essas alterações em si mesmos. Seu desafio é desenvolver um software de monitoramento de saúde que colete indicadores de saúde e permita que os astronautas avaliem e ajam de acordo com seu estado de saúde.

Com o aumento dos investimentos em tecnologia e pesquisa espacial, as missões espaciais tornaram-se mais ambiciosas. O programa Artemis da NASA realizou recentemente um sobrevoo lunar tripulado, e a NASA e outras agências têm planos de enviar humanos a Marte no futuro. Com missões cada vez mais longas, os astronautas ficarão mais expostos ao ambiente hostil do espaço, o que acarreta riscos tanto para a saúde física quanto mental.

### Nossa proposta (Solução)

Nossa ideia é propor parte da tecnologia IoT, um óculos que transmite áudio por condução óssea, permitindo ouvir sons de chuva e fauna ambientados na cultura de cada astronauta, além de ambientar esses sons aos períodos do dia, mudando suavemente para ambientação noturna próximo do horário do astronauta dormir. Além disso, o óculos contará com EEG (eletroencefalograma) e EOG (Eletro Oculografia), juntando tecnologias que já existem e direcionando elas para a utilização pela NASA para a melhoria da qualidade de vida do astronauta e medição de informações para ajudar no suporte à vida. E como o propósito principal do astronauta é a criação de um software, vamos organizar e apresentar essas informações coletadas aos tripulantes em tempo real para que possam agir também em tempo real.

A utilização dos óculos é estratégica por conta do Risco de SANS (Síndrome Neuro-Ocular Associada ao Voo Espacial), cerca de 70% a 81% dos astronautas em voos de longa duração apresentam algum sinal da condição na parte posterior dos olhos, enquanto 15% a 20% desenvolvem níveis clinicamente preocupantes. Aproximadamente 47% a 48% dos olhos avaliados sofrem alteração de grau suficiente para exigir correção óptica.

Sugestão de ideia: caso a solução seja adotada pela NASA na ISS, como nem todos os participantes precisam de óculos, podemos usar essa diferença como grupo controle para medir a diferença entre os que usaram o óculos e não usaram os óculos. Como parte da solução supõe a melhora na qualidade de vida com os sons ambientes, podemos validar se existem melhores ou piores resultados nos que usaram o equipamento.

### A Tarefa

Com base nas pesquisas iniciais que fizemos e no desenho das dores e dos aliviadores, vamos aprofundar a pesquisa em busca de entender o funcionamento de todos os instrumentos de suporte à vida atuais na ISS.

#### Desafios que precisamos mapear e documentar

- Peso do dispositivo: Como vamos implantar no mesmo aparelho 3 tecnologias, precisamos entender qual o menor peso possível de cada uma dessas tecnologias. Precisamos encontrar uma forma viável de colocar as 3 no mesmo dispositivo mantendo o peso leve para não incomodar o astronauta.
- Peso do hardware envolvido no funcionamento da solução: o módulo da ISS ou no futuro módulo de marte precisa usar uma tecnologia offline, logo, qualquer solução precisa funcionar toda dentro da instalação espacial. Como nosso foco é criar uma solução baseada em machine learning, precisaremos quantificar qual o poder de processamento que precisaremos e medir o peso do equipamento para apresentar os dados e o peso adicional que será enviado para a órbita, podendo fazer o cálculo de combustível necessário adicional.
- Tempo de apresentação: Temos 20 horas para apresentar um protótipo em funcionamento do software que vai apresentar os dados coletados, então, esse passo 0 de mapeamento, documentação e desenho precisa ocupar um espaço que ainda sobra tempo para a equipe de desenvolvimento.
- O que já existe dentro da ISS de suporte de vida que podemos usar os dados coletados para englobar o nosso software. Precisamos pensar no cruzamento desses dados, quais dados entram, como podemos transformá-los para ampliar a capacidade de entrega de informações, como podemos apresentar aos astronautas. Nessa passagem de bastão, pense que a equipe já pode ter em mente um estilo, layout de entrega dos dados, cores, quando for documentar os próximos passos, entenda o que eles querem e a partir disso desenhe junto com eles esse layout de entrega dos dados aos astronautas.
- Hoje pela manhã eu vou continuar de outro computador, então, vamos criar um repositório no Github e subir todas essas documentações, pesquisas para esse repositório, tanto para a equipe poder trabalhar a partir dela, quanto para eu poder usar no outro computador. Os dados da EPIC eu posso exportar um .md e PDF direto do Traycer para continuar em outro computador.

#### Precedentes

Um dos pontos que precisamos validar, é se hoje a NASA já utiliza algum tipo de solução que execute isso que propomos:

- Óculos de condução óssea (já identificamos que a nasa já pesquisa na área o PDF está na guia links);
- Monitoramento EEG e EOG, tanto de forma portátil, quanto no módulo da ISS;
- Em relação a Software, o que eles usam hoje que ajudam no suporte à vida. Precisamos saber quem desenvolveu, quando e se ainda estão usando essa ferramenta. Ferramentas anteriores.
- Existe algum monitoramento em tempo real das funções básicas que fazem parte do suporte à vida do astronauta?

#### Dados para os gráficos e indicadores

Hoje a ISS já conta com diversas ferramentas de suporte à vida do astronauta, gerando diversos dados que podemos usar para ampliar a qualidade dos dados e a precisão no diagnóstico em tempo real.

Vamos mapear os dados que estão disponíveis em bases de dados da NASA, várias já estão na guia links, porém, vamos nos certificar de documentar todas disponíveis para o uso.

Além dos dados disponíveis nas bases de dados oficiais da NASA, precisamos mapear todos os equipamentos de suporte à vida que geram informações que podemos usar no software, tanto sendo inseridos por meio de automações, quanto manualmente pelos astronautas. Essas informações serão fundamentais para o desenvolvimento do software que é o primeiro entregável em formato de protótipo.

Vamos focar um esforço maior em entregar o software, para isso precisamos entender todo o contexto do suporte à vida da NASA.

Um dos locais que você pode pesquisar é no próprio site da NASA: https://www.nasa.gov/?search=HEALTH

Ao fazer pesquisas por HEALTH, apareceram milhares de artigos explicando o funcionamento da NASA. Pesquise por outros termos, procure por outros links que possuem informações importantes para o projeto além desse que eu já informei.

Busque entender a fundo o funcionamento de cada uma das tecnologias, faça uma pesquisa por etapas. Em cada texto que encontrar informações sobre o funcionamento geral e suas tecnologias, busque entender mais a fundo o funcionamento delas para passar esse conhecimento profundo à equipe. Para essas pesquisas longas, use agentes com o gpt 6 luna no max e forneça informações detalhadas do que você precisa que ele faça, ele segue melhor as instruções quando elas estão completas e bem detalhadas. Abra no máximo 6 agentes com o luna para executar essas tarefas.

Foque nos artigos relacionados às tecnologias de suporte à vida que podemos extrair informações para o software. Ao passo que o Luna for entregando os dados que for encontrando, você vai mapear eles na EPIC e nas documentações do projeto local para ir para o github. Você precisa documentar e organizar tudo pensando nas próximas etapas, anote o equipamento, o que ele faz, como ele entrega essas informações e em qual unidade de medida.

Você precisa ajudar a equipe a processar e projetar o cruzamento e entrega das informações aos astronautas. Eles não entendem esses dados, então você precisará explicar e ensinar eles a fazerem esses cálculos nas documentações e desenhar o funcionamento dos dados na plataforma. Lembre-se que precisaremos apresentar um projeto à NASA que seja coerente com a realidade da NASA, com dados reais que a NASA pode fornecer ao software se a solução for adotada pela agência espacial.

Eu vou dormir e vou te deixar coordenando as pesquisas e documentações, hoje pela manhã quando eu acordar eu preciso das pesquisas documentadas e prontas para eu passar para a equipe que vai desenvolver o software.

Enquanto eles desenvolvem o software depois de nossas pesquisas, documentação e desenho do projeto, eu vou focar no óculos que é um entregável secundário.

Siga por conta própria orquestrando as pesquisas com os agentes Luna.

---

## Aba 2: Dores e Aliviadores

### Criar software de monitoramento de saúde para astronautas em missões espaciais

#### Dores

- Radiação espacial
- Isolamento e confinamento
- Distância da Terra
- Campos de gravidade
- Ambientes hostis e fechados
- Sistema imune
- Funções motoras
- Problema vascular
- Doença descompressiva
- Micro-organismos
- Hipóxia
- Alimentação e nutrição
- Risco de SANS
- Osteoporose
- Problemas emocionais

Tarefa: Ampliar a lista para podermos pelo menos visualizar todas as questões que os astronautas passam em relação à própria saúde. (Lista ampliada em [`docs/01-contexto-missao.md`](../docs/01-contexto-missao.md).)

#### Possíveis soluções

**Óculos de condução óssea com monitoramento com EEG e EOG**

> O óculos emite um som natural via condução óssea. Isso permite ouvir sons importantes ao mesmo tempo que coleta informações importantes para um sistema que processa os padrões cerebrais.

OBS: Na própria descrição do desafio é citado que o astronauta tem grande responsabilidade com sua própria saúde, podemos usar isso ao nosso favor para desenhar um software que o próprio astronauta participa ativamente em passar informações sobre sua própria saúde, sem grandes atritos com aderência pelo processo. Porém, não devemos supor que o astronauta já vá saber tudo sobre sua própria saúde, dessa forma, podemos ajudar o astronauta com informações fáceis em formatos como:

- Um sistema de gamificação para ajudar os astronautas a se envolverem em tarefas que contribuam para a sua saúde.
- Gráficos dinâmicos que mostram como os indicadores de saúde dos astronautas mudam ao longo do tempo.
- Código de cores que ajuda o astronauta a interpretar o estado de um indicador de saúde rapidamente.

##### Métricas para avaliar com o software

**Automáticos**

- Frequência cardíaca
- Dosimetria (radiação)
- Oximetria
- Desatenção (EOG)

**Manuais**

- Hemograma (exame de sangue)
- Hidratação
- Fadiga
- Apetite

---

## Aba 3: Dúvidas

**Como funciona a roupa Astroskin?**

- ECG
- Frequência respiratória
- Pressão arterial
- Temperatura da pele
- Acelerometria
- Saturação sanguínea

Ela é uma camiseta tecnológica que ajuda a monitorar o corpo do astronauta e suas funções básicas de vida.

**O que é feito para mitigar ou reduzir o SANS?**

Existem ferramentas como:

- Oftalmoscópio
- OCT (Tomografia de Coerência Óptica)
- Tonômetro

**Como é medida a radiação na ISS?**

- **Dosímetro Ativo da Tripulação (Crew Active Dosimeter, CAD):** Pequenos aparelhos portáteis (do tamanho de duas pilhas AA) usados pelos astronautas. Eles utilizam a tecnologia *Direct Ion Storage™* (Armazenamento Direto de Íons), na qual a radiação ionizante altera a carga elétrica de um transístor, permitindo calcular a dose absorvida continuamente.
- **Dosímetros pessoais e passivos:** Além dos ativos, os astronautas usam crachás ou dispositivos passivos (como dosímetros termoluminescentes) que registram a dose total de radiação ao longo de semanas ou meses de missão.
- **Instrumentos de bordo e detectores de espectro (como o LIDAL):** A ISS conta com equipamentos fixos e experimentos científicos dedicados a mapear o ambiente de radiação em diferentes direções ortogonais e regiões geomagnéticas (incluindo a Anomalia do Atlântico Sul e as altas latitudes). Eles medem a taxa de dose e o fluxo de partículas carregadas (como raios cósmicos galácticos e prótons solares).

A quantidade de radiação absorvida pelo corpo humano é quantificada em **milisieverts (mSv)** ou em frações de rads/grays. Em média, a tripulação da ISS absorve entre **80 mSv e 160 mSv** em uma estadia típica de seis meses, dependendo do ciclo de atividade do Sol.

**Como é medida a Oximetria?**

**Quais são os equipamentos de medição médica ou de suporte à vida do ambiente?**

**Quais são os equipamentos pessoais utilizados para coleta de informações dos astronautas?**

**Como funcionam e quais equipamentos temos para medição sanguínea, até que ponto em órbita conseguem coletar informações e quais os desafios?**

**Todo mundo fica acordado na ISS ou existe algum revezamento?**

**Quais são as bases de dados abertas que a Nasa disponibiliza sobre o suporte de vida dos astronautas?**

---

## Aba 4: Links

Equipamentos médicos da ISS:

- Tempus PRO: [Multifunctional Integrated Medical Devices, NASA](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/human-health-performance/exploration-medical-technologies/multifunctional-integrated-medical-devices/)

Equipamento sonoro de condução óssea:

- [Bone Conduction Headphone Research and Testing for xEMU Communications Applications](https://ntrs.nasa.gov/api/citations/20240005885/downloads/ICES_final_manuscript_Cavanaugh.pdf)

Onde obter informações da base de dados abertas da NASA sobre suporte de vida dos astronautas?

As informações abertas da [NASA](https://science.nasa.gov/biological-physical/data/osdr/) sobre **suporte de vida e saúde dos astronautas** estão distribuídas em portais específicos de acordo com o tipo de dado (fisiológico, ambiental, telemetria ou engenharia). Os principais repositórios gratuitos para consulta e download são:

1. Saúde e Fisiologia dos Astronautas
   - [**NASA Life Sciences Portal (NLSP)**](https://www.nasa.gov/hrp/nlsp/): É a porta de entrada principal para dados de pesquisas humanas em voos espaciais desde o Projeto Mercury (1961) até a Estação Espacial Internacional (ISS). Integra o *Life Sciences Data Archive (LSDA)* e o programa de Vigilância da Saúde dos Astronautas ao Longo da Vida (*LSAH*). [[1](https://www.nasa.gov/hrp/nlsp/), [2](https://data.nasa.gov/dataset/nasa-life-sciences-portal-nlsp)]
   - [**NASA Open Science Data Repository (OSDR)**](https://osdr.nasa.gov/bio/repo): Reúne mais de 500 estudos e 1.000 conjuntos de dados biológicos, clínicos e biomédicos. Inclui telemetria ambiental de cabine, amostras microbiológicas, dosimetria de radiação e dados processados de astronautas (como os da missão Inspiration4). Também possui acesso direto via AWS Open Data e APIs REST. [[1](https://academic.oup.com/nar/article/53/D1/D1697/7903386), [2](https://pmc.ncbi.nlm.nih.gov/articles/PMC11701653/), [3](https://www.nasa.gov/osdr-latest-news-i4-mission-datasets/), [4](https://pubmed.ncbi.nlm.nih.gov/39558178/), [5](https://registry.opendata.aws/nasa-osdr/)]
2. Engenharia de Sistemas de Suporte de Vida (ECLSS)
   Para dados técnicos sobre reciclagem de água, geração de oxigênio, controle de dióxido de carbono (CO₂) e trajes espaciais, o termo técnico usado pela agência é **ECLSS** (*Environmental Control and Life Support Systems*). [[1](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/)]
   - [**NASA Technical Reports Server (NTRS)**](https://ntrs.nasa.gov/): É o banco de relatórios técnicos, artigos de engenharia e especificações da NASA. Pesquisar por termos como "ECLSS", "Life Support Systems" ou "Water Recovery System" retorna documentos detalhados sobre o funcionamento dos sistemas da ISS e das missões Artemis. [[1](https://ntrs.nasa.gov/citations/19920039128), [2](https://www.nasa.gov/headquarters/library/find/databases/), [3](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/)]
   - [**Portal Data.nasa.gov**](https://data.nasa.gov/dataset/): Funciona como o catálogo central de metadados da agência. Permite filtrar conjuntos de dados brutos, modelos 3D de trajes extraveiculares (EMU) e planilhas de testes de subsistemas de sobrevivência. [[1](https://data.nasa.gov/dataset/?tags=astronaut)]

Dicas para agilizar sua busca:

- **Use termos em inglês:** Quase todos os conjuntos de dados e relatórios não possuem tradução. Utilize palavras-chave como *ECLSS*, *Life Support*, *Cabin Environment*, *Spaceflight Physiology* e *Environmental Telemetry*.
- **Privacidade de dados médicos:** Dados ambientais e fisiológicos agregados são de acesso livre. Registros médicos individuais identificáveis ou sequenciamentos genéticos brutos de astronautas exigem solicitação formal e aprovação de comitê de ética diretamente nos portais.

---

## Aba 5: Óculos Orbit

(Vazia na data da cópia. A documentação do óculos está em [`docs/09-oculos-orbit.md`](../docs/09-oculos-orbit.md).)
