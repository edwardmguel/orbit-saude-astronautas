# Prompt da equipe: ORBITA (cópia para referência)

> Cópia da aba "Prompt de Desenvolvimento" do documento Fundação Futuro, lida em 15/11/2026 às 10h35.
> Mudanças só de forma: escapes do Google Docs removidos e travessões trocados por dois-pontos (regra de escrita do dono). O conteúdo é o da equipe.
> Revisão: [`../docs/17-orbita-prompt-review.md`](../docs/17-orbita-prompt-review.md). Versão corrigida: [`../docs/19-revised-lovable-prompt.md`](../docs/19-revised-lovable-prompt.md).

---

# PROMPT OFICIAL: ORBITA

## Sistema Inteligente de Monitoramento da Saúde de Astronautas

### NASA SPACE APPS CHALLENGE 2026

Quero que você desenvolva um aplicativo mobile chamado **ORBITA**, destinado ao monitoramento da saúde de astronautas durante missões espaciais de curta e longa duração.

O projeto será apresentado no NASA Space Apps Challenge 2026 e tem como objetivo ajudar astronautas a acompanhar sua saúde física e comportamental, identificar alterações em indicadores de saúde e receber orientações preventivas durante missões espaciais.

**IMPORTANTE: siga rigorosamente a proposta apresentada neste documento. Não mude o conceito, não invente funcionalidades que desviem da ideia principal e não transforme o aplicativo em um dashboard médico genérico.**

Quero um aplicativo com identidade tecnológica, futurista e espacial, mas que mantenha uma interface minimalista, organizada e intuitiva. O astronauta deverá conseguir compreender suas informações de saúde rapidamente, sem precisar navegar por telas excessivamente carregadas.

Desenvolva efetivamente o protótipo, com telas, interações, navegação, animações e dados demonstrativos. Não quero apenas uma imagem estática ou um planejamento de interface.

---

# 1. IDENTIDADE VISUAL DO ORBITA

O nome do aplicativo será:

**ORBITA**

Subtítulo:

Sistema de Monitoramento de Saúde para Astronautas em Missões Espaciais.

Utilize o ícone oficial do ORBITA que será enviado como referência visual.

**É FUNDAMENTAL preservar a identidade do ícone.** Não redesenhe, não altere sua geometria e não crie outra logo. Utilize a imagem fornecida como referência para a identidade visual do aplicativo.

### Paleta de cores

Toda a interface deverá seguir as cores do ícone:

- Azul-marinho profundo: #07111F

- Azul-marinho secundário: #0B1B2B

- Ciano principal: #21C5EF

- Azul turquesa: #16A9C4

- Branco: #F4F8FC

- Cinza azulado: #91A4B8

As cores de estado deverão ser:

- Verde: normal.

- Amarelo: atenção.

- Laranja: alerta.

- Vermelho: crítico.

Utilize as cores de estado somente nos indicadores e avisos correspondentes.

### Estilo visual

O aplicativo deve apresentar:

- Interface predominantemente escura.

- Elementos arredondados.

- Cartões com bordas discretas.

- Efeitos de iluminação em ciano, utilizados com moderação.

- Animações suaves e fluidas.

- Ícones minimalistas.

- Gráficos modernos.

- Tipografia tecnológica e extremamente legível.

- Transições entre páginas.

- Hierarquia visual muito bem definida.

Não utilize excesso de informações, muitos cartões ou efeitos luminosos exagerados.

O objetivo é transmitir a sensação de um software científico utilizado em uma missão espacial real.

**Priorize exclusivamente o formato mobile, com proporção de smartphones modernos.** A interface deve funcionar bem em diferentes tamanhos de tela, principalmente em dispositivos com telas de aproximadamente 6 a 6,8 polegadas.

---

# 2. PRIMEIRO ACESSO: TELA DE CADASTRO

Ao abrir o aplicativo pela primeira vez, o astronauta deverá encontrar uma tela de cadastro pessoal.

Essa etapa será obrigatória para iniciar o monitoramento.

### Elementos da tela

No topo:

- Logo ORBITA.

- Título: Cadastro do Astronauta.

- Descrição: Crie seu perfil para personalizar o monitoramento da sua saúde durante a missão.

### Campos obrigatórios

1. Nome completo.

2. Sexo:

   - Masculino.

   - Feminino.

3. Peso corporal (kg).

4. Altura (cm).

### Campo opcional

5. Observações pessoais.

Esse campo poderá receber informações importantes para o acompanhamento individual, como restrições, condições preexistentes ou observações relevantes.

### Botão

**SALVAR E CONTINUAR**

### Comportamento

- Todos os campos obrigatórios deverão ser validados.

- O sexo selecionado determinará o modelo corporal apresentado posteriormente.

- O perfil deverá ser armazenado localmente.

- As informações deverão permanecer salvas ao fechar e abrir o aplicativo.

- O cadastro não deverá aparecer novamente depois de concluído, a menos que o usuário escolha editar seu perfil.

O design deverá ser limpo, com campos bem distribuídos e sem excesso de informações.

---

# 3. ANIMAÇÃO DE INICIALIZAÇÃO DO ORBITA

Após o preenchimento e a confirmação do cadastro, deverá aparecer uma tela exclusiva de inicialização.

Essa tela é extremamente importante para a identidade do aplicativo.

Utilize o ícone oficial do ORBITA enviado como referência.

### Animação desejada

O ícone deverá aparecer centralizado em um fundo azul-marinho profundo.

O elemento circular azul menor, localizado na extremidade do símbolo orbital, deverá realizar uma volta completa de 360 graus seguindo precisamente o anel elíptico que envolve o círculo central.

A animação deverá:

1. Exibir o ícone inicialmente estático.

2. Fazer o pequeno círculo ciano percorrer toda a trajetória orbital.

3. Completar uma volta de 360 graus.

4. Criar um pequeno efeito luminoso durante o movimento.

5. Finalizar a órbita.

6. Fazer o ícone inteiro se dissolver suavemente, como partículas ou luz desaparecendo.

7. Revelar a tela principal do ORBITA por meio de uma transição suave.

A animação deverá ser elegante e fluida, sem parecer uma animação de carregamento convencional.

**Não altere a estrutura do símbolo original.** A movimentação deverá respeitar a geometria do ícone enviado.

Utilize animações via CSS, SVG ou tecnologia apropriada para garantir fluidez em smartphones.

A tela deverá ter duração suficiente para apresentar a identidade visual, mas sem criar uma espera desnecessária.

---

# 4. TELA PRINCIPAL: DASHBOARD DE SAÚDE

Após a animação, o astronauta será direcionado para a tela central do aplicativo.

Essa será a tela mais utilizada durante a missão.

### Cabeçalho

Na parte superior:

- Ícone oficial do ORBITA.

- Nome ORBITA.

- Notificação de alertas.

- Identificação resumida do astronauta.

Exemplo:

ASTRONAUTA 001

MISSÃO MARS-01

DIA 045

O ícone ao lado da palavra ORBITA deverá ser interativo, conforme explicado na seção de navegação.

### A. Monitoramento automático

Criar um painel superior chamado:

**MONITORAMENTO AUTOMÁTICO**

Apresentar quatro indicadores em cartões compactos e visualmente organizados.

**1. Frequência cardíaca**

- Valor em bpm.

- Histórico resumido.

- Estado do indicador.

- Comparação com o padrão individual.

**2. Dosimetria de radiação**

- Exposição acumulada.

- Unidade de medição.

- Histórico.

- Estado do acompanhamento.

**3. Oximetria**

- Saturação de oxigênio em porcentagem.

- Último registro.

- Histórico.

- Estado do indicador.

**4. Atenção ocular (EOG)**

- Indicador relacionado aos padrões oculares.

- Frequência de piscadas, quando disponível.

- Estimativa experimental relacionada à fadiga e ao estado de alerta.

- Estado do acompanhamento.

Não apresente o EOG como diagnóstico definitivo de desatenção.

Cada cartão deverá utilizar um pequeno gráfico ou indicador visual, sem ocupar muito espaço.

Os valores deverão ser simulados inicialmente e identificados como dados demonstrativos.

### B. Monitoramento manual

Logo abaixo do painel automático, criar uma seção chamada:

**AVALIAÇÃO PESSOAL**

Essa seção deverá concentrar todos os dados preenchidos manualmente pelo astronauta.

Os registros deverão ficar sempre no mesmo local, permitindo consultar os valores anteriores e atualizar as informações.

Organizar os indicadores em duas periodicidades.

#### Avaliação diária: últimas 24 horas

**Hidratação**

- Quantidade de água ingerida.

- Unidade em litros.

- Possibilidade de atualizar o registro.

**Fadiga**

- Escala de 0 a 10.

- Seleção por controle deslizante ou escala interativa.

**Apetite**

- Normal.

- Reduzido.

- Muito reduzido.

Esses três indicadores deverão solicitar atualização a cada 24 horas.

Após salvar, apresentar os valores registrados diretamente nos cartões da seção Avaliação Pessoal.

Exibir também a data e o horário do último registro.

#### Avaliação periódica: a cada 15 dias

**Hemograma**

Criar um cartão específico para acompanhamento dos exames laboratoriais.

O aplicativo deverá:

- Informar quando o próximo hemograma deverá ser registrado.

- Solicitar atualização a cada 15 dias.

- Permitir inserir os resultados do exame.

- Permitir registrar a data do exame.

- Armazenar resultados anteriores.

- Exibir a evolução dos parâmetros ao longo do tempo.

Os campos poderão incluir:

- Hemoglobina.

- Hematócrito.

- Leucócitos.

- Plaquetas.

- Outros parâmetros disponíveis no exame.

Os resultados deverão ser interpretados considerando os referenciais laboratoriais e a avaliação médica, sem criar diagnósticos automáticos.

Após o registro, os dados deverão continuar aparecendo no mesmo cartão, com a indicação da última coleta e da próxima solicitação.

### Comportamento dos registros

- Os dados não deverão desaparecer depois de preenchidos.

- Os registros mais recentes deverão aparecer primeiro.

- O astronauta poderá consultar os registros anteriores.

- A avaliação diária deverá reiniciar sua solicitação de preenchimento a cada novo período de 24 horas.

- O hemograma deverá possuir controle de periodicidade de 15 dias.

---

# 5. MAPA CORPORAL INTERATIVO: MODELO HUMANO 3D

Essa será uma das áreas de maior destaque visual do ORBITA.

Abaixo dos painéis de monitoramento na tela principal, deverá existir uma seção chamada:

**MAPA CORPORAL**

Sua função será apresentar um modelo tridimensional do corpo humano, permitindo que o astronauta explore os riscos relacionados a diferentes regiões e sistemas do organismo.

### Modelo corporal

O sistema deverá apresentar um modelo humano 3D, selecionado conforme o sexo informado no cadastro:

- Masculino.

- Feminino.

A representação deverá ser centralizada e possuir aparência anatômica tecnológica, com iluminação em ciano e tons azulados.

O corpo deverá ser apresentado preferencialmente de frente, com possibilidade de rotação e aproximação, caso a implementação permita.

### Regiões interativas

O modelo corporal deverá possuir áreas selecionáveis.

Ao clicar ou tocar em determinada região, o sistema deverá destacar a área selecionada e apresentar um painel com os riscos relacionados.

Organize as regiões da seguinte maneira:

**1. Cabeça e cérebro**

Possíveis riscos:

- Alterações neurológicas.

- Alterações comportamentais.

- Alterações cognitivas.

- Alterações sensorimotoras e vestibulares.

**2. Olhos e visão**

Possíveis riscos:

- SANS: Síndrome Neuro-Ocular Associada aos Voos Espaciais.

- Alterações de pressão e estrutura ocular.

- Alterações visuais.

- Alterações relacionadas à microgravidade.

**3. Coração e sistema cardiovascular**

Possíveis riscos:

- Adaptações cardiovasculares.

- Alterações circulatórias.

- Redução do condicionamento cardiorrespiratório.

**4. Pulmões e sistema respiratório**

Possíveis riscos:

- Hipóxia.

- Alterações relacionadas à oxigenação.

- Problemas ambientais e respiratórios.

**5. Sistema imunológico**

Possíveis riscos:

- Alterações das respostas imunológicas.

- Interação entre hospedeiro e microrganismos.

- Maior atenção a possíveis infecções.

**6. Abdômen e sistema digestivo**

Possíveis riscos:

- Alimentação inadequada.

- Nutrição insuficiente.

- Alterações de apetite.

**7. Ossos**

Possíveis riscos:

- Alterações ósseas induzidas por voos espaciais.

- Redução de densidade mineral óssea.

- Riscos relacionados à perda de massa óssea.

**8. Músculos e membros**

Possíveis riscos:

- Redução da aptidão musculoesquelética.

- Perda de força muscular.

- Alterações motoras.

- Lesões relacionadas às atividades extraveiculares.

**9. Corpo inteiro**

Possíveis riscos:

- Radiação espacial.

- Isolamento e confinamento.

- Ambientes hostis.

- Exposição a fatores ambientais da missão.

**10. Sistema vestibular e equilíbrio**

Possíveis riscos:

- Alterações de equilíbrio.

- Tontura.

- Alterações de orientação espacial.

- Adaptação aos campos gravitacionais.

### Funcionamento da interação

Ao tocar em uma região:

1. O ponto correspondente deverá apresentar destaque luminoso.

2. A região deverá ser visualmente identificada no modelo.

3. Um painel deverá surgir com o nome da região.

4. O painel deverá mostrar os possíveis riscos.

5. Deverá apresentar uma explicação simples de cada risco.

6. Deverá informar os indicadores relacionados.

7. Deverá disponibilizar a opção SAIBA MAIS.

Exemplo:

O astronauta seleciona os olhos.

O sistema apresenta:

REGIÃO OCULAR

SANS: Síndrome Neuro-Ocular Associada aos Voos Espaciais.

Descrição:

Condição associada a alterações neuro-oculares observadas em astronautas durante voos espaciais, que pode envolver mudanças na estrutura ocular e na visão.

Indicadores relacionados:

- Relato de alterações visuais.

- Avaliação de acuidade visual.

- Exames oftalmológicos especializados.

O sistema deverá apresentar uma explicação semelhante para as demais regiões.

**IMPORTANTE:** o mapa corporal é um painel educativo e de apoio ao acompanhamento. Ele não deverá afirmar que todos os riscos podem ser detectados diretamente pelos indicadores automáticos.

Se não houver um modelo 3D anatômico adequado disponível, implemente uma representação interativa com qualidade visual elevada, mas mantenha o objetivo de apresentar um corpo humano tridimensional. Não substitua essa funcionalidade por uma lista simples de textos.

---

# 6. CÓDIGO DE CORES: INTERPRETAÇÃO DOS INDICADORES

O aplicativo deverá utilizar um padrão visual de cores para facilitar a interpretação da saúde do astronauta.

O código de cores deverá aparecer discretamente nos cartões de indicadores, no mapa corporal e nos relatórios.

### Estados

**VERDE: NORMAL**

O indicador está dentro dos critérios definidos para acompanhamento individual.

**AMARELO: ATENÇÃO**

Foi identificada uma alteração leve ou uma tendência que merece acompanhamento.

**LARANJA: ALERTA**

Existe uma alteração relevante que deve ser avaliada de acordo com os protocolos da missão.

**VERMELHO: CRÍTICO**

Foi atingido um critério de escalonamento médico previamente estabelecido. O astronauta deverá seguir o protocolo de atendimento correspondente.

**CINZA: SEM DADOS**

Não existem informações suficientes ou o indicador não foi atualizado.

O código de cores deverá ser acompanhado de textos e ícones, nunca dependendo exclusivamente da percepção da cor.

Os critérios clínicos deverão ser configuráveis e não deverão ser apresentados como limites oficiais da NASA quando não houver referência correspondente.

---

# 7. MENU DE NAVEGAÇÃO: ÍCONE ORBITA

Em todas as telas internas, o cabeçalho deverá apresentar o ícone oficial ao lado da palavra ORBITA.

Esse ícone será interativo.

Ao clicar no ícone ou na área do logotipo, deverá abrir um menu lateral (drawer), contendo as opções de navegação do aplicativo.

A abertura deverá acontecer por meio de uma animação suave, deslizando da lateral da tela.

### Organização do menu

No topo:

- Logo ORBITA.

- Nome do aplicativo.

- Botão para fechar o menu.

Em seguida:

1. Visão geral.

2. Mapa corporal.

3. Avaliação de saúde.

4. ORBITA IA.

5. Relatórios.

6. Rotina da missão.

7. Riscos espaciais.

8. Gamificação.

9. Perfil do astronauta.

Na parte inferior:

- Identificação do astronauta.

- Missão atual.

- Dia da missão.

- Status de conectividade.

O menu deverá apresentar ícones minimalistas e indicar visualmente qual página está selecionada.

Evitar uma navegação excessivamente complexa.

---

# 8. ORBITA IA: ASSISTENTE VIRTUAL OFFLINE

Criar uma área exclusiva chamada:

**ORBITA IA**

Subtítulo:

Assistente inteligente de saúde espacial.

Essa ferramenta será responsável por responder dúvidas do astronauta sobre sua saúde, indicadores e riscos relacionados ao ambiente espacial.

### Conceito

A ORBITA IA deverá funcionar localmente, sem depender obrigatoriamente de conexão com a internet.

Sua base de conhecimento deverá ser organizada a partir dos conteúdos científicos e materiais oficiais fornecidos pelo NASA Human Research Program.

A intenção é possibilitar que o astronauta consulte informações mesmo quando estiver distante da Terra ou com comunicação limitada.

### Interface

Criar uma tela de conversa semelhante a um assistente virtual.

Elementos:

- Ícone da ORBITA IA.

- Identificação de funcionamento offline.

- Caixa de mensagens.

- Campo para digitar perguntas.

- Botão de envio.

- Sugestões de perguntas frequentes.

### Perguntas que o astronauta poderá fazer

- Como está minha saúde hoje?

- Quais indicadores precisam de atenção?

- Por que minha frequência cardíaca mudou?

- O que é o risco de SANS?

- Quais são os efeitos da microgravidade no organismo?

- Como a radiação espacial afeta o corpo?

- Por que preciso acompanhar minha hidratação?

- Quais são os riscos de dormir inadequadamente?

- Quando devo realizar minha próxima avaliação?

- O que significa o alerta apresentado no meu mapa corporal?

### Base de conhecimento

A ORBITA IA deverá conseguir utilizar:

1. Informações científicas da NASA.

2. Informações dos cinco perigos dos voos espaciais.

3. Explicações sobre os riscos identificados.

4. Dados pessoais registrados pelo astronauta.

5. Histórico das avaliações.

6. Indicadores disponíveis no sistema.

As respostas deverão ser fundamentadas nas informações disponíveis.

Não inventar informações científicas, não prescrever medicamentos e não apresentar diagnósticos médicos.

### Funcionamento offline

Para o protótipo:

- Criar uma base local de conhecimento.

- Implementar respostas contextuais por meio de mecanismos locais de busca e regras.

- Permitir perguntas predefinidas e perguntas digitadas.

- Apresentar respostas relacionadas ao contexto do astronauta.

- Mostrar as fontes consultadas quando disponíveis.

A arquitetura deverá permitir futura integração com modelos de IA executados localmente, mas o protótipo deverá funcionar mesmo sem API KEY e sem internet.

---

# 9. RELATÓRIOS: GRÁFICOS DINÂMICOS

Criar uma página chamada:

**RELATÓRIOS DE SAÚDE**

Ela deverá apresentar a evolução dos indicadores do astronauta ao longo da missão.

A finalidade é permitir identificar mudanças graduais e comparar os resultados entre diferentes dias.

### Gráficos

Criar gráficos dinâmicos para:

1. Frequência cardíaca.

2. Dosimetria acumulada.

3. Oximetria.

4. Indicadores EOG.

5. Hidratação.

6. Fadiga.

7. Apetite.

8. Hemograma, conforme os exames registrados.

### Organização

Permitir selecionar:

- Últimos 7 dias.

- Últimos 15 dias.

- Últimos 30 dias.

- Toda a missão.

Os gráficos deverão ser interativos.

Ao selecionar determinado dia, apresentar os valores registrados naquele período.

Permitir alternar entre indicadores sem precisar sair da página.

### Tabela de histórico

Abaixo dos gráficos, apresentar uma tabela simples com:

- Data.

- Indicador.

- Valor registrado.

- Estado.

- Observações.

Os dados deverão ser persistidos e atualizados automaticamente após novos registros.

O hemograma deverá apresentar um histórico próprio, respeitando a periodicidade de 15 dias.

Os gráficos deverão permitir identificar tendências, mas não deverão interpretar uma simples variação isolada como diagnóstico.

---

# 10. ROTINA DA MISSÃO: LEMBRETES E AÇÕES

O ORBITA deverá possuir uma área chamada:

**ROTINA DA MISSÃO**

Sua função será solicitar ao astronauta que realize avaliações ou ações específicas em determinados períodos.

### Atividades diárias

- Registrar hidratação.

- Informar nível de fadiga.

- Atualizar apetite.

- Realizar avaliação de bem-estar.

- Conferir os indicadores automáticos.

- Informar horas de sono.

- Registrar possíveis sintomas.

### Atividades periódicas

- Hemograma a cada 15 dias.

- Avaliações complementares conforme cronograma.

- Atualização de registros especializados.

- Revisão periódica do histórico.

### Interface

Cada atividade deverá apresentar:

- Nome.

- Descrição.

- Periodicidade.

- Horário ou prazo.

- Estado: pendente ou concluída.

Quando uma atividade for concluída, o sistema deverá atualizar automaticamente o estado da tarefa.

Criar uma barra de progresso diário mostrando quantas atividades foram concluídas.

O objetivo é ajudar o astronauta a manter uma rotina organizada de acompanhamento da própria saúde.

Os lembretes deverão respeitar a programação da missão e não interferir indevidamente em períodos de descanso ou operações críticas.

---

# 11. GAMIFICAÇÃO: ENGAJAMENTO DO ASTRONAUTA

Adicionar uma área complementar chamada:

**MISSÃO: SAÚDE EM DIA**

A gamificação deverá incentivar o astronauta a manter a rotina de monitoramento e realizar ações preventivas.

Não deve parecer um jogo infantil.

Deverá ter uma estética profissional, tecnológica e relacionada à exploração espacial.

### Funcionalidades

- Pontos de experiência (XP).

- Níveis de progresso.

- Conquistas.

- Sequência de dias com avaliações realizadas.

- Desafios de rotina.

Exemplos de conquistas:

**HIDRATAÇÃO CONSISTENTE**

Registrar hidratação durante cinco dias consecutivos.

**ROTINA EM DIA**

Concluir todas as avaliações diárias durante sete dias.

**EXPLORADOR DA SAÚDE**

Consultar e acompanhar todas as categorias de indicadores.

**SONO MONITORADO**

Registrar os dados de sono durante sete dias.

Exibir:

- Nível atual.

- XP acumulado.

- Próximo nível.

- Conquistas desbloqueadas.

- Desafios da missão.

Os pontos deverão ser concedidos por ações de acompanhamento e prevenção, nunca por apresentar resultados de saúde considerados melhores.

---

# 12. RISCOS ESPACIAIS: BASE CIENTÍFICA NASA

Criar uma área chamada:

**RISCOS DOS VOOS ESPACIAIS**

Essa seção deverá apresentar os cinco perigos principais identificados pelo NASA Human Research Program:

1. Radiação espacial.

2. Isolamento e confinamento.

3. Distância da Terra.

4. Campos gravitacionais.

5. Ambientes hostis e fechados.

Cada risco deverá possuir:

- Ícone ilustrativo.

- Título.

- Descrição resumida.

- Possíveis impactos na saúde.

- Indicadores associados.

- Link para o material oficial da NASA.

Além dos cinco perigos, organizar os riscos específicos:

- Alterações do sistema imunológico.

- Funções motoras e vestibulares.

- Adaptações cardiovasculares.

- Doença descompressiva.

- Interações entre hospedeiro e microrganismos.

- Hipóxia.

- Alimentação e nutrição inadequadas.

- Lesões e desempenho em caminhadas espaciais.

- Redução da aptidão cardiorrespiratória e musculoesquelética.

- SANS.

- Alterações ósseas.

- Alterações comportamentais e transtornos psiquiátricos.

- Trabalho em equipe inadequado.

- Sono inadequado e horários irregulares.

- Suporte inadequado às operações do sistema.

- Lesões relacionadas a cargas dinâmicas.

- Câncer induzido por radiação.

Organizar os riscos por categoria e relacioná-los às regiões do mapa corporal quando aplicável.

Os conteúdos científicos deverão ser apresentados em linguagem simples, preservando a fundamentação original da NASA.

---

# 13. NOTIFICAÇÕES E ALERTAS

Criar um sistema visual de notificações no aplicativo.

Exemplos:

- Sua avaliação diária está pendente.

- Seu próximo hemograma está próximo.

- Foi identificada uma alteração na frequência cardíaca em relação ao seu padrão habitual.

- Sua avaliação de hidratação está pendente.

- Existe um novo registro para consultar.

- Foi identificada uma alteração que merece acompanhamento.

As notificações deverão possuir classificação visual conforme o código de cores.

Ao clicar em uma notificação, o astronauta deverá ser direcionado para a página ou indicador relacionado.

---

# 14. DADOS PARA DEMONSTRAÇÃO DO PROTÓTIPO

O sistema deverá iniciar com um perfil fictício para facilitar a apresentação aos jurados.

Perfil demonstrativo:

Nome: Astronauta 001.

Sexo: Masculino.

Peso: 78 kg.

Altura: 180 cm.

Missão: MARS-01.

Dia da missão: 45.

### Dados automáticos simulados

Frequência cardíaca: 86 bpm.

Dosimetria: 0,42 mSv de exposição demonstrativa.

Oximetria: 97%.

Indicador EOG: 12,4 registros por minuto, como métrica ilustrativa de acompanhamento ocular.

### Dados manuais simulados

Hidratação: 1,8 litros.

Fadiga: 8/10.

Apetite: Reduzido.

Hemograma: último registro há 7 dias.

### Linha de base individual demonstrativa

Frequência cardíaca habitual: 64 bpm.

Sono habitual: 7,5 horas.

Fadiga habitual: 2/10.

Humor habitual: 8/10.

Os valores acima são exclusivamente fictícios e deverão estar identificados como dados simulados.

Criar um botão de demonstração chamado:

**RESTAURAR DADOS INICIAIS**

Esse botão deverá permitir repetir o cenário durante a apresentação.

Também deverá ser possível alterar os valores para demonstrar como o aplicativo reage a novos registros.

---

# 15. FONTES OFICIAIS DA NASA

Utilize os seguintes materiais como base para a biblioteca de conhecimento do aplicativo.

**Cinco perigos dos voos espaciais:**

https://www.nasa.gov/hrp/hazards/

**Radiação espacial:**

https://www.nasa.gov/hrp/hazard-space-radiation/

**Isolamento e confinamento:**

https://www.nasa.gov/hrp/hazard-isolation-and-confinement/

**Distância da Terra:**

https://www.nasa.gov/hrp/hazard-distance-from-earth/

**Campos gravitacionais:**

https://www.nasa.gov/hrp/hazard-gravity-fields/

**Ambientes hostis e fechados:**

https://www.nasa.gov/hrp/hazard-hostile-closed-environments/

**Riscos dos voos tripulados:**

https://www.nasa.gov/hrp/risks/

**Sistema imunológico:**

https://www.nasa.gov/reference/risk-of-altered-immune-system-responses/

**Funções motoras e vestibulares:**

https://www.nasa.gov/reference/risk-of-altered-sensorimotor-and-vestibular-function/

**Riscos cardiovasculares:**

https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/

**Doença descompressiva:**

https://www.nasa.gov/reference/risk-of-decompression-sickness/

**Interação hospedeiro-microrganismos:**

https://www.nasa.gov/reference/risk-of-host-microorganism-interactions/

**Hipóxia:**

https://www.nasa.gov/reference/risk-of-hypoxia/

**Alimentação e nutrição:**

https://www.nasa.gov/reference/risk-of-inadequate-food-and-nutrition/

**Atividades extraveiculares:**

https://www.nasa.gov/reference/risk-of-injury-and-compromised-performance-from-extravehicular-activity-eva/

**Aptidão cardiorrespiratória e musculoesquelética:**

https://www.nasa.gov/reference/risk-of-reduced-cardiorespiratory-and-musculoskeletal-fitness/

**SANS:**

https://www.nasa.gov/reference/risk-of-spaceflight-associated-neuro-ocular-syndrome-sans/

**Alterações ósseas:**

https://www.nasa.gov/reference/risk-of-spaceflight-induced-bone-changes/

**Alterações comportamentais:**

https://www.nasa.gov/reference/risk-of-behavioral-conditions-and-psychiatric-disorders/

**Trabalho em equipe:**

https://www.nasa.gov/reference/risk-of-inadequate-teamwork/

**Sono inadequado:**

https://www.nasa.gov/reference/risk-from-inadequate-sleep-and-irregular-schedules/

**Suporte às operações do sistema:**

https://www.nasa.gov/reference/risk-of-inadequate-systems-operations-support/

**Lesões por cargas dinâmicas:**

https://www.nasa.gov/reference/risk-of-injury-from-dynamic-loads/

**Câncer induzido por radiação:**

https://www.nasa.gov/reference/risk-of-radiation-induced-cancers/

**Corpo humano no espaço:**

https://www.nasa.gov/humans-in-space/the-human-body-in-space/

Essas fontes deverão estar disponíveis na seção de riscos e na biblioteca da ORBITA IA.

Não inventar informações ou apresentar hipóteses como se fossem resultados oficiais da NASA.

---

# 16. REGRAS DE FUNCIONAMENTO DO PROTÓTIPO

O aplicativo deverá ser funcional, mesmo sem integração com equipamentos médicos reais.

Nesta primeira versão:

- Os indicadores automáticos utilizarão dados simulados.

- Os dados manuais serão inseridos pelo usuário.

- O formulário deverá salvar os registros.

- O histórico deverá ser atualizado.

- Os gráficos deverão reagir aos novos registros.

- Os lembretes deverão respeitar os períodos definidos.

- O mapa corporal deverá permitir selecionar as regiões.

- A ORBITA IA deverá responder utilizando uma base local de conhecimento.

- O menu deverá permitir navegar entre todas as páginas.

- A gamificação deverá atualizar o XP conforme as tarefas concluídas.

Utilize armazenamento local para preservar os dados e permitir a demonstração sem depender de uma infraestrutura complexa.

Todos os elementos interativos deverão funcionar.

Não crie botões decorativos sem ação.

Não simule conexões reais com sensores ou equipamentos quando elas não estiverem implementadas.

Diferencie claramente:

- Dados simulados.

- Dados inseridos pelo astronauta.

- Dados provenientes de equipamentos, em uma futura integração.

- Dados de exames laboratoriais.

O aplicativo é uma ferramenta de monitoramento e apoio à decisão, não um sistema de diagnóstico médico.

---

# 17. EXPERIÊNCIA DE NAVEGAÇÃO

A experiência precisa ser muito simples.

O fluxo principal deverá ser:

**PRIMEIRO ACESSO**

Abertura do ORBITA → Cadastro do astronauta → Animação orbital → Dashboard principal.

**USO DIÁRIO**

Dashboard → Conferência dos indicadores automáticos → Avaliação manual → Atualização dos registros → Consulta do mapa corporal.

**CONSULTA**

Ícone ORBITA → Menu lateral → ORBITA IA / Relatórios / Rotina da missão / Riscos espaciais / Gamificação.

**ACOMPANHAMENTO**

Relatórios → Seleção do período → Visualização dos gráficos → Consulta das alterações.

O astronauta deverá conseguir acessar as funcionalidades sem precisar retornar constantemente à tela inicial.

---

# 18. REQUISITOS TÉCNICOS E DE QUALIDADE

Desenvolva o projeto utilizando uma arquitetura moderna e adequada ao Lovable.

Preferencialmente:

- React.

- TypeScript.

- Tailwind CSS.

- Componentes reutilizáveis.

- Lucide Icons.

- Recharts para gráficos.

- Three.js ou React Three Fiber para o modelo corporal, quando viável.

Não torne a arquitetura excessivamente complexa.

Priorize carregamento rápido, boa performance e animações suaves.

Utilize componentes independentes para:

- Cadastro.

- Animação orbital.

- Dashboard.

- Indicadores.

- Avaliações manuais.

- Mapa corporal.

- Detalhes das regiões.

- ORBITA IA.

- Relatórios.

- Rotina.

- Gamificação.

- Menu lateral.

Persistir o perfil e os registros no armazenamento local, garantindo que o usuário possa fechar e abrir o aplicativo sem perder os dados.

Se não for possível implementar algum recurso avançado integralmente, entregue uma versão simplificada, mas funcional, mantendo o comportamento e a identidade visual pretendidos.

Não deixe páginas vazias, links quebrados ou controles sem funcionalidade.

---

# 19. RESULTADO FINAL ESPERADO

Quero um aplicativo mobile completo em termos de experiência visual e fluxo de navegação, com identidade futurista e científica.

O ORBITA deverá parecer um software desenvolvido especificamente para monitoramento de saúde em missões espaciais, e não um aplicativo convencional de saúde com uma identidade espacial aplicada superficialmente.

A interface deverá ser minimalista, elegante e tecnológica.

O destaque deverá estar em:

1. Cadastro personalizado do astronauta.

2. Animação exclusiva do ícone ORBITA.

3. Dashboard com indicadores automáticos e manuais.

4. Mapa corporal 3D interativo.

5. Código de cores para identificação rápida dos estados.

6. ORBITA IA funcionando offline.

7. Relatórios com gráficos dinâmicos.

8. Rotina de missão e lembretes.

9. Gamificação para incentivar a prevenção.

10. Biblioteca científica baseada nas referências da NASA.

**DIRETRIZ MAIS IMPORTANTE: NÃO FUJA DA ESTRUTURA E DO CONCEITO APRESENTADOS NESTE PROMPT.**

Não transforme o projeto em uma plataforma exageradamente complexa. Não acrescente módulos aleatórios. Não sobrecarregue as telas.

Quero um produto visualmente muito bem executado, com funcionalidades interativas e uma apresentação convincente para os jurados do NASA Space Apps Challenge 2026.

Comece desenvolvendo a identidade visual e a estrutura de navegação. Em seguida, implemente as telas e suas funcionalidades, mantendo consistência entre todas elas.

**O resultado deve ser o ORBITA: um copiloto inteligente de saúde para astronautas durante missões espaciais.**

  