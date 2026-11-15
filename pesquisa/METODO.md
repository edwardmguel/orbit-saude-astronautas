# Método de pesquisa (regras dadas a todos os agentes de pesquisa)

Este arquivo registra o contexto e as regras que cada agente de pesquisa recebeu. Serve para a equipe entender como a pesquisa foi feita e para os próximos agentes seguirem o mesmo padrão.

## Parte A. Contexto do projeto

Somos uma equipe de 4 pessoas (equipe "Fundação Futuro") que vai apresentar à NASA uma solução de monitoramento de saúde para astronautas em missões de longa duração (ISS hoje; Lua, Gateway e Marte no futuro). O desafio oficial: criar uma ferramenta visual que ajude os astronautas a avaliar a própria saúde durante a missão e receber orientações de tratamento e melhoria, coletando indicadores de saúde por qualquer tipo de entrada (sensores automáticos, telemetria, texto digitado, cliques, imagens de câmera, ultrassom etc.).

A solução tem dois entregáveis:

1. **Principal:** um software visual (protótipo funcional em 20 horas) que reúne indicadores de saúde da tripulação e do ambiente da estação, cruza esses dados, mostra o estado de saúde com código de cores, gráficos ao longo do tempo, figura humana clicável por parte do corpo, gamificação de hábitos saudáveis, e diz quando um resultado merece atenção da própria tripulação ou dos médicos de voo (flight surgeons) em solo. Funciona 100% offline dentro da estação, com machine learning embarcado.
2. **Secundário:** óculos IoT chamado "Orbit": áudio por condução óssea (sons de chuva e fauna da cultura de cada astronauta, adaptados ao período do dia, com transição suave para ambientação noturna perto do horário de dormir) + EEG + EOG.

A equipe de desenvolvimento não conhece o domínio espacial nem médico. A pesquisa vira documentação técnica no repositório, que ensina a equipe e serve de contexto para a IA que ajuda no desenvolvimento. Tudo precisa ser coerente com a realidade da NASA: equipamentos reais, dados reais, unidades reais, nomes e siglas reais.

Documentos já existentes no repositório (`C:\Users\ingri\Documents\github\NASA`), que o agente pode ler para contexto: `docs/05-arquitetura-software.md`, `docs/06-modelo-de-dados.md`, `docs/07-design-interface.md`, `docs/04-cruzamento-de-dados.md`, `docs/08-plano-prototipo-20h.md` e as pesquisas anteriores em `pesquisa/bruto/`.

## Parte B. Regras de pesquisa

1. Usar busca na web e ler as fontes primárias. Sem acesso à web, parar e avisar o coordenador.
2. Prioridade de fontes: (a) NASA (nasa.gov, ntrs.nasa.gov, humanresearchroadmap.nasa.gov, standards.nasa.gov, osdr.nasa.gov, data.nasa.gov, api.nasa.gov, technology.nasa.gov); (b) outras agências (ESA, JAXA, CSA, Roscosmos/IBMP, NOAA quando for clima espacial); (c) artigos revisados por pares; (d) fabricantes e documentação oficial de software. Wikipedia e blogs só para achar a fonte primária.
3. Pesquisar por etapas e em profundidade: ao achar um sistema, fazer buscas específicas pelo nome exato, sigla e relatório técnico.
4. Cada afirmação factual relevante leva a URL da fonte, com etiqueta de confiança: [OFICIAL], [PAPER], [FABRICANTE], [DIRETRIZ-TERRA], [TESTADO], [SECUNDÁRIA], [INFERÊNCIA] (com o raciocínio explicado).
5. Nunca inventar números, nomes, datas, endpoints ou unidades. Se não achar, escrever "NÃO ENCONTRADO" e listar o que foi tentado.
6. Registrar datas, responsáveis e status atual (2025 e 2026) de equipamentos e softwares.

## Parte C. Formato de entrega

1. Português do Brasil, mantendo nomes técnicos e siglas em inglês, com a expansão na primeira menção.
2. **Regra de escrita inegociável do dono do projeto:** sem travessão (U+2014), sem meia-risca (U+2013), sem hífen solto entre espaços no papel deles. Usar vírgula, dois-pontos, parênteses ou ponto. Hífen de palavra composta é permitido. Faixas numéricas por extenso ("60 a 100 bpm"). Antes de terminar, procurar no arquivo por "—", "–" e " - " no meio de frases e corrigir. Trechos literais de código ou JSON copiados de resposta real ficam como vieram, dentro de blocos de código.
3. Escrever **somente** no próprio arquivo de saída. Outros agentes escrevem em paralelo em arquivos vizinhos.
4. Markdown estruturado, com tabelas. Profundidade em vez de resumo.
5. Salvar de forma incremental, a cada seção concluída.
6. No final: "Resumo executivo" (10 achados), "Implicações para o software" (ou para o óculos, conforme a tarefa), "Lacunas e dúvidas abertas" e "Fontes" (lista completa de URLs).
7. Ao terminar, responder à mensagem do coordenador com: caminho do arquivo, número de linhas, 5 a 10 achados principais e as lacunas.

## Revisão do coordenador

Cada entrega é revisada antes de ser aprovada: cobertura de todos os itens pedidos, ausência de travessão e meia-risca, URL com etiqueta em cada fato, conferência por amostragem dos números e afirmações mais importantes. Se algo falhar, o coordenador devolve ao agente com a lista de correções.
