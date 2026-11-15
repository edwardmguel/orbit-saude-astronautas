# 19. Prompt revisado do ORBITA para o Lovable

> Para quem: quem vai colar o prompt no Lovable e a equipe de desenvolvimento.
> O que é: o prompt da equipe (aba "Prompt de Desenvolvimento" do documento Fundação Futuro, lida em 15/11/2026 às 10h35; cópia em [`../pesquisa/prompt-orbita-equipe.md`](../pesquisa/prompt-orbita-equipe.md)) com as oito correções de [`17-revisao-prompt-orbita.md`](17-revisao-prompt-orbita.md) aplicadas dentro de cada seção. A estrutura de 19 seções, o tom e o nome ORBITA são da equipe.
> Design: o desenho de cada tela, nos quatro tamanhos de tela, está em [`18-design-orbita-responsivo.md`](18-design-orbita-responsivo.md) e os desenhos em [`wireframes/orbita-responsivo.html`](wireframes/orbita-responsivo.html). Decisão do dono em 15/11: o ORBITA é um web app responsivo (celular, tablet, laptop e tela grande), e a Visão geral também abre em monitor compartilhado e no telão da apresentação.
> Onde estão os números: faixas, unidades e regras de cor vêm de [`../prototipo/config/indicadores.json`](../prototipo/config/indicadores.json) e de [`03-indicadores-e-limiares.md`](03-indicadores-e-limiares.md); regras de cruzamento, de [`04-cruzamento-de-dados.md`](04-cruzamento-de-dados.md); escalas, de [`../pesquisa/bruto/08-autoavaliacoes-implementaveis.md`](../pesquisa/bruto/08-autoavaliacoes-implementaveis.md); orientações, de [`../pesquisa/bruto/10-orientacoes-contramedidas.md`](../pesquisa/bruto/10-orientacoes-contramedidas.md).

---

## Antes de colar: guia rápido

### 1. Como colar

O prompt é longo. Se o Lovable recusar a mensagem inteira, cole em cinco partes, nesta ordem, e espere cada parte ficar pronta antes da seguinte. Comece cada parte nova com a frase: "Continue o mesmo projeto ORBITA; não refaça o que já existe e mantenha o contrato de dados da seção 6."

| Parte | O que colar | Por quê |
| --- | --- | --- |
| 1. Identidade e navegação | Abertura do prompt e seções 1, 6, 7, 16, 17 e 18 | Tokens, estados de cor, contrato de dados, menu e regras gerais primeiro; tudo o mais depende disso |
| 2. Telas principais | Seções 2, 3, 4, 13 e 14 | Cadastro, animação, visão geral (painel pessoal e painel da missão em tela grande), avaliação, detalhe do alerta e dados da demonstração |
| 3. Mapa corporal | Seções 5 e 12 | As 12 regiões apontam para os riscos espaciais |
| 4. Telas de consulta | Seções 8, 9, 10, 11 e 15 | ORBITA IA, relatórios, rotina, gamificação e fontes |
| 5. Revisão | Seção 19 | Lista final de conferência |

### 2. Arquivos para anexar ou colar

| Arquivo do repositório | Para quê | Onde colocar no projeto do Lovable |
| --- | --- | --- |
| `prototipo/config/indicadores.json` (37 indicadores, 6 regras de cruzamento) | Único lugar dos números de cor; o app lê daqui | `public/config/indicadores.json` |
| `prototipo/config/orbita-ia-base.json` (65 entradas) | Base local da ORBITA IA, com fontes | `public/config/orbita-ia-base.json` |
| `prototipo/config/perfis-simulacao.rascunho.json` | Perfis de demonstração: tripulantes fictícios, linhas de base e cenários C1 a C5 | `public/config/perfis-simulacao.json` |
| `prototipo/dados/amostras-reais/` (opcional) | Telemetria pública da ISS e dados da NOAA gravados em 15/11/2026, para o painel de ambiente | `public/dados/amostras-reais/` |
| Ícone oficial do ORBITA em SVG | Animação e cabeçalho | `public/marca/orbita-icone.svg` (ainda não enviado; ver item 4) |

Se o Lovable não aceitar anexos desse tamanho, ligue o projeto ao GitHub e copie os arquivos para `public/config/`. Em último caso, a tabela "Contrato de dados" da seção 6 já traz todos os números usados nas telas.

### 3. Ordem de construção (cerca de 13 horas, até o envio às 23h59)

Prioridades P0, P1 e P2 de [`17-revisao-prompt-orbita.md`](17-revisao-prompt-orbita.md), seção 5.

| Fase | Tempo | Telas | Pronto quando |
| --- | --- | --- | --- |
| Base | 1 h | Tokens, pontos de quebra (celular, tablet, laptop e tela grande), M18 Menu lateral, barra inferior, armazenamento local, leitura dos JSON, motor de cor | O motor passa os exemplos de `exemplosTeste` do `indicadores.json` e o exemplo resolvido de z-score (3,24); a navegação muda certo nos quatro tamanhos |
| P0 | 6 h | M01 Cadastro, M02 Inicialização orbital, M03 Visão geral no celular, **M03 Visão geral em tela grande (painel da missão, 1920 por 1080, é a tela do telão)**, M04 Avaliação de saúde, M05 Mapa corporal, M06 Painel da região, M07 Detalhe do indicador e do alerta | A demonstração mostra três amarelos e o alerta "Possível efeito de CO2 elevado" (seção 14) no celular e no painel da missão, sem rolagem no telão |
| P1 | 3 h 30 | M08 Exames laboratoriais, M09 ORBITA IA, M10 Relatórios, M11 Rotina da missão, M13 Riscos espaciais, M14 Notificações, M15 Perfil e privacidade, M16 Tripulação em lista no celular | Todas as entradas do menu abrem telas funcionais, sem botão decorativo |
| P2 | 1 h 30 | M12 Missão: Saúde em Dia, M17 Sono e óculos Orbit | Telas simples e honestas; o que faltar fica com aviso "em construção" fora da demonstração |
| Fechamento | 1 h | Botão "Restaurar dados iniciais", ensaio da demonstração no celular e no telão, gravação e envio | A história da seção 14 roda do começo ao fim em menos de 3 minutos, e o painel da missão fica legível do fundo da sala |

### 4. Decisões já aplicadas e decisões abertas

| Decisão | O que o prompt usa | Se a equipe decidir diferente |
| --- | --- | --- |
| Nome da missão | ISS EXP-01, dia 45 (recomendação de `docs/17`): todos os dados reais que temos são da ISS | Com MARS-01, troque o nome, use cerca de 1,8 mSv por dia (trânsito) na dosimetria e tire os nomes de módulos da ISS do painel de ambiente |
| Mapa corporal | Figura SVG de alta qualidade primeiro; 3D só se sobrar tempo | Nada muda no contrato de dados |
| Formato | Web app responsivo, mobile primeiro, com quatro pontos de quebra (celular, tablet, laptop e tela grande); a Visão geral tem um segundo layout, o painel da missão, para monitor compartilhado e telão (decisão do dono em 15/11) | Nada muda no contrato de dados |
| Ícone | Falta o SVG oficial em `prototipo/marca/orbita-icone.svg` | Até chegar, o app usa um marcador provisório que não é tratado como logo |

---

## O prompt (copie a partir da linha abaixo)

---

# PROMPT OFICIAL: ORBITA (versão revisada em 15/11/2026)

## Sistema Inteligente de Monitoramento da Saúde de Astronautas

### NASA SPACE APPS CHALLENGE 2026

Quero que você desenvolva um web app responsivo chamado **ORBITA**, destinado ao monitoramento da saúde de astronautas durante missões espaciais de curta e longa duração. Ele é pensado primeiro para o celular e funciona bem também no tablet, no laptop e em telas grandes (monitor compartilhado da estação e telão da apresentação).

O projeto será apresentado no NASA Space Apps Challenge 2026 e tem como objetivo ajudar astronautas a acompanhar sua saúde física e comportamental, comparar cada indicador com o próprio padrão (linha de base individual), cruzar os dados do corpo com o ambiente do módulo, receber orientações preventivas e saber quando chamar o CMO (Crew Medical Officer, o tripulante responsável pelo cuidado médico a bordo) e o médico de voo.

**IMPORTANTE: siga rigorosamente a proposta apresentada neste documento. Não mude o conceito, não invente funcionalidades que desviem da ideia principal e não transforme o aplicativo em um dashboard médico genérico.**

Quero um aplicativo com identidade tecnológica, futurista e espacial, mas que mantenha uma interface minimalista, organizada e intuitiva. O astronauta deverá conseguir compreender suas informações de saúde rapidamente, sem precisar navegar por telas excessivamente carregadas.

Desenvolva efetivamente o protótipo, com telas, interações, navegação, animações e dados demonstrativos. Não quero apenas uma imagem estática ou um planejamento de interface.

**Os números de faixas, unidades e regras de cor deste prompt vêm do arquivo `indicadores.json` (anexo) e estão copiados na seção 6. Não invente, não arredonde e não altere nenhum deles.** Cada tela tem um código (M01 a M18) para facilitar a conversa.

---

# 1. IDENTIDADE VISUAL DO ORBITA

O nome do aplicativo será:

**ORBITA**

Subtítulo:

Sistema de Monitoramento de Saúde para Astronautas em Missões Espaciais.

O app se chama ORBITA. O óculos com áudio por condução óssea, EEG e EOG, proposto pela mesma equipe, se chama **óculos Orbit**; ele aparece no app como fonte de dados proposta, sempre com selo de dado simulado.

Utilize o ícone oficial do ORBITA que será enviado como referência visual (arquivo `orbita-icone.svg`).

**É FUNDAMENTAL preservar a identidade do ícone.** Não redesenhe, não altere sua geometria e não crie outra logo. Enquanto o SVG oficial não estiver no projeto, use um marcador provisório simples (círculo central, anel elíptico e um pequeno círculo ciano), identificado no código como provisório, e troque pelo SVG oficial assim que ele chegar.

### Paleta de cores

Toda a interface deverá seguir as cores do ícone. Defina como variáveis CSS e no `tailwind.config`:

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#07111F` (azul-marinho profundo) | Fundo das telas |
| `--surface` | `#0B1B2B` (azul-marinho secundário) | Cartões, menu e barras |
| `--primary` | `#21C5EF` (ciano principal) | Destaque, ação principal, séries de gráfico |
| `--primary-2` | `#16A9C4` (azul turquesa) | Destaque secundário |
| `--text` | `#F4F8FC` (branco) | Texto principal |
| `--muted` | `#91A4B8` (cinza azulado) | Texto secundário |
| `--border` | `#91A4B8` com 20% de opacidade | Bordas discretas |

As cores de estado são cinco, sempre com ícone e palavra (detalhes e regras na seção 6):

| Nível | Cor | Token e valor | Ícone (Lucide) | Rótulo na tela |
| --- | --- | --- | --- | --- |
| 0 | Cinza | `--estado-sem-dado` `#A3ADBA` | `CircleHelp` (?) | Sem dado |
| 1 | Verde | `--estado-normal` `#22C55E` | `CircleCheck` (✓) | Saúde: normal |
| 2 | Amarelo | `--estado-atencao` `#F5B800` | `CircleAlert` (!) | Saúde: atenção |
| 3 | Laranja | `--estado-alerta` `#F97316` | `CircleX` (✕) | Saúde: alerta, acionar CMO |
| 4 | Vermelho | `--estado-critico` `#FF6B6B` | `OctagonX` | Saúde: crítico, contatar CMO agora |

Utilize as cores de estado somente nos indicadores e avisos correspondentes. Lembretes de rotina usam cinza ou ciano, nunca as cores de estado.

### Estilo visual

O aplicativo deve apresentar:

- Interface predominantemente escura (menos luz perto do horário de dormir).
- Elementos arredondados.
- Cartões com bordas discretas e superfície neutra; o estado aparece no contorno, no ícone e na palavra, nunca como fundo colorido.
- Efeitos de iluminação em ciano, utilizados com moderação.
- Animações suaves e fluidas na navegação e na abertura. **Em alertas e estados de saúde, nenhuma animação: nada pisca, nada pulsa, nada emite som ou vibração.** Respeite a preferência do sistema por menos movimento (`prefers-reduced-motion`).
- Ícones minimalistas (Lucide).
- Gráficos modernos.
- Tipografia tecnológica e extremamente legível: números grandes em 26 px com a unidade menor ao lado, texto em 14 px, rótulos com pelo menos 12 px, contraste mínimo de 6:1 entre texto e fundo.
- Transições entre páginas.
- Hierarquia visual muito bem definida.

Não utilize excesso de informações, muitos cartões ou efeitos luminosos exagerados.

O objetivo é transmitir a sensação de um software científico utilizado em uma missão espacial real.

### Formato: web app responsivo, mobile primeiro

O ORBITA é um web app responsivo. Desenhe primeiro para o celular e adapte para os outros tamanhos. A tripulação da ISS usa iPads e laptops, e a Visão geral também será aberta em telas grandes: o monitor compartilhado da estação, um laptop ligado a um projetor e o telão da apresentação.

| Tamanho | Largura | Navegação | Visão geral |
| --- | --- | --- | --- |
| Celular | 360 a 430 px (telas de cerca de 6 a 6,8 polegadas) | Barra inferior com 4 atalhos e menu aberto pelo logo (gaveta lateral) | Painel pessoal do astronauta, em uma coluna |
| Tablet | 768 a 1024 px | Menu lateral fixo e recolhível (só ícones quando recolhido) | Painel pessoal em duas colunas |
| Laptop | a partir de 1280 px | Menu lateral fixo e recolhível | Painel pessoal em três colunas, com o mapa corporal ao lado |
| Tela grande | a partir de 1920 px (referência: 1920 por 1080) | Modo exibição, sem menu | Painel da missão para monitor compartilhado (seção 4, layout 2) |

Entre esses intervalos, o layout acompanha o tamanho mais próximo, sem rolagem horizontal. Use `clamp()` nas fontes para crescerem com a tela.

---

# 2. PRIMEIRO ACESSO: TELA DE CADASTRO (M01)

Ao abrir o aplicativo pela primeira vez, o astronauta deverá encontrar uma tela de cadastro pessoal.

Essa etapa será obrigatória para iniciar o monitoramento.

### Elementos da tela

No topo:

- Logo ORBITA.
- Título: Cadastro do Astronauta.
- Descrição: Crie seu perfil para personalizar o monitoramento da sua saúde durante a missão.

### Campos obrigatórios

1. Nome completo.
2. Sexo: Masculino ou Feminino. Define o modelo corporal do mapa e a faixa de referência da hemoglobina, que é diferente por sexo.
3. Massa corporal (kg). Escreva "massa corporal", não "peso": no espaço se mede massa.
4. Altura (cm).
5. Nome da missão (padrão: ISS EXP-01).
6. Data de início da missão. O app calcula o dia de missão (FD, Flight Day) a partir dela.
7. Horário de sono programado, em GMT (padrão: 21:30 a 06:00, referência publicada pela NASA para a ISS).

### Campo opcional

8. Observações pessoais (restrições, condições preexistentes ou observações relevantes). É dado médico sensível: guarde só no aparelho, mostre o selo "privado" e nunca exiba na tela Tripulação nem envie a outro lugar.

### Compartilhamento com a tripulação

Uma pergunta simples, com três chaves: "O que seus colegas podem ver na tela Tripulação?"

- Estado por sistema (cor e ícone, sem números).
- Valores (sinais vitais, sono, hidratação, radiação) e módulo onde estou.
- Mente e humor (só o estado).

Padrão conservador para um tripulante novo: estado por sistema visível só para o CMO e o médico de voo; valores, módulo e humor em "só eu". O texto explica a finalidade, o efeito e que o consentimento pode ser revogado a qualquer momento em Perfil e privacidade. O perfil de demonstração compartilha tudo com a tripulação.

### Botão

**SALVAR E CONTINUAR**

### Comportamento

- Todos os campos obrigatórios deverão ser validados (preenchidos, numéricos onde couber, com unidade visível).
- O sexo selecionado determinará o modelo corporal apresentado posteriormente.
- O perfil deverá ser armazenado localmente.
- As informações deverão permanecer salvas ao fechar e abrir o aplicativo.
- O cadastro não deverá aparecer novamente depois de concluído, a menos que o usuário escolha editar seu perfil.

O design deverá ser limpo, com campos bem distribuídos e sem excesso de informações.

---

# 3. ANIMAÇÃO DE INICIALIZAÇÃO DO ORBITA (M02)

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

Utilize animações via CSS ou SVG para garantir fluidez no celular e nas telas grandes.

Duração: no máximo 2,5 segundos, com toque em qualquer lugar para pular. Depois do primeiro acesso, use uma versão curta de 1 segundo. Com `prefers-reduced-motion`, mostre só o ícone estático com um esmaecimento simples.

---

# 4. TELA PRINCIPAL: VISÃO GERAL DE SAÚDE (M03)

Após a animação, o astronauta será direcionado para a tela central do aplicativo.

Essa será a tela mais utilizada durante a missão.

A Visão geral tem **dois layouts**, com os mesmos dados e o mesmo motor:

- **Layout 1, painel pessoal** (celular, tablet e laptop): a saúde do próprio astronauta. É descrito nas partes A a C abaixo.
- **Layout 2, painel da missão** (tela grande, 1920 por 1080): a estação e a tripulação inteira num monitor compartilhado ou no telão da apresentação. É descrito no fim desta seção.

O layout 2 abre automaticamente, sem menu, quando a janela tem 1920 px de largura ou mais. Em qualquer tamanho, um seletor **"Modo exibição"** no cabeçalho (e no menu) abre o painel da missão sem menu, por exemplo num laptop ligado ao projetor; o mesmo seletor volta ao painel pessoal.

## Layout 1: painel pessoal

### Cabeçalho

Na parte superior:

- Ícone oficial do ORBITA e o nome ORBITA. No celular, tocar no ícone ou no nome abre o menu lateral (seção 7) e, ao lado, um ícone de menu visível (três linhas) ajuda quem não sabe que o logo abre o menu. Em tablet e laptop o menu já fica fixo à esquerda.
- Seletor "Modo exibição", que abre o painel da missão (layout 2).
- Sino de notificações com contador.
- Identificação resumida do astronauta. Exemplo:

ASTRONAUTA 001 · MISSÃO ISS EXP-01 · DIA 045

- Horário oficial da ISS no formato "GMT dia do ano / hh:mm" (exemplo: GMT 319 / 08:20). Todo dado é guardado em UTC.
- Selo fixo "DADOS SIMULADOS" enquanto houver dado de demonstração na tela.

Se houver alerta ativo, logo abaixo do cabeçalho aparece uma faixa com superfície neutra, contorno na cor do nível, ícone e texto, por exemplo "! Saúde: atenção. Possível efeito de CO2 elevado no Node 3". Tocar abre o detalhe do alerta (M07). A faixa não pisca.

### A. Monitoramento automático

Criar um painel superior chamado:

**MONITORAMENTO AUTOMÁTICO**

Apresentar quatro indicadores em cartões compactos e visualmente organizados. Cada cartão mostra: nome, valor com unidade, mini gráfico dos últimos 7 dias, estado (cor, ícone e palavra), comparação com o padrão individual, idade do dado ("atualizado há 5 min") e selo de origem. Na ISS o dado do corpo não é contínuo (chega por sessão, exame ou amostra), por isso a idade do dado sempre aparece; depois da validade do indicador, o cartão fica cinza.

**1. Frequência cardíaca** (`fc_repouso`)

- Valor em bpm.
- Histórico resumido.
- Estado do indicador.
- Comparação com o padrão individual, por exemplo "86 bpm hoje · seu padrão: 64 bpm". Este é o melhor exemplo do conceito: 86 bpm está dentro da referência terrestre de 60 a 100 bpm e mesmo assim fica amarelo, porque está muito acima do normal desta pessoa.
- Texto pequeno: "referência terrestre, não limite de voo".

**2. Dosimetria de radiação** (`dose_acumulada`)

- Dose efetiva estimada do dia, em mSv (exemplo: 0,42 mSv hoje), calculada como a diferença diária de `dose_acumulada`. Nunca converter `taxa_dose_radiacao` (µGy/h, dose absorvida) direto em mSv: a conversão depende do fator de qualidade informado pelo instrumento (`docs/04`, A1 e A7).
- Acumulado da missão em mSv e barra de progresso contra o limite de carreira de 600 mSv da NASA (NASA-STD-3001 Vol. 1, requisito V1 4030). Exemplo: 18,9 mSv, 3,2% do limite.
- Histórico.
- Estado do acompanhamento.
- Na ISS a dose típica fica perto de 0,28 a 0,56 mSv por dia (50 a 100 mSv em seis meses). Nunca converta gray em sievert por conta própria.

**3. Oximetria** (`spo2`)

- Saturação de oxigênio em porcentagem.
- Último registro.
- Histórico.
- Estado do indicador.
- Texto pequeno: "referência terrestre de 95 a 100%, não limite de voo".

**4. Atenção ocular (EOG)** (`eog_piscadas`)

- Frequência de piscadas por minuto.
- Selo: "óculos Orbit (proposto) · simulado · experimental".
- Estado do acompanhamento, decidido **só** pelo desvio da linha de base pessoal, nunca por limiar.
- Texto fixo: "Sinal experimental de sonolência. Não é diagnóstico de desatenção e não detecta SANS."

Os valores deverão ser simulados inicialmente e identificados como dados demonstrativos.

### A2. Ambiente do módulo

Logo abaixo, um cartão compacto chamado **AMBIENTE DO MÓDULO**, com o módulo onde o astronauta está (exemplo: Node 3):

- CO2 do módulo (`ppco2_modulo`), em mmHg, com seta de tendência.
- O2 do módulo (`pio2_cabine`), em kPa: é a PIO2 calculada da ppO2 e da pressão total (`docs/04`, A1), nunca a ppO2 crua.
- Pressão da cabine (`pressao_cabine`), em kPa.
- Clima espacial: prótons do satélite GOES (`fluxo_protons_goes`, em pfu) e índice Kp (`kp`).

Cada valor com estado, idade do dado e selo de origem. Os valores de O2, pressão e clima espacial da demonstração são reais, gravados da telemetria pública da ISS e da NOAA em 15/11/2026 (selo "real gravado"). Um seletor "ao vivo", desligado por padrão, pode buscar dados atuais quando houver rede; sem rede, o app usa sempre o arquivo gravado.

Texto pequeno no rodapé do cartão: "O ORBITA não comanda nenhum equipamento e não substitui o alarme da estação." Tocar no cartão abre o detalhe do ambiente, com o gráfico das últimas horas de cada grandeza.

### B. Avaliação pessoal (M04)

Logo abaixo, criar uma seção chamada:

**AVALIAÇÃO PESSOAL**

Essa seção deverá concentrar todos os dados preenchidos manualmente pelo astronauta. Os registros deverão ficar sempre no mesmo local, permitindo consultar os valores anteriores e atualizar as informações. Cada resposta vira uma leitura com origem "manual", horário UTC e unidade.

Organizar os indicadores em três blocos.

#### Avaliação diária: últimas 24 horas (meta: 2 minutos)

**Sono** (`sono_tst`)

- Horas de sono da última noite (a tela mostra horas; o dado é guardado em minutos).
- Comparação com o horário programado e com o padrão pessoal; dívida de sono dos últimos dias.

**Fadiga** (`fadiga`)

- Escala de 1 a 7, em sete posições (formato Samn-Perelli), em que número maior é mais cansaço.
- Seleção por controle de sete botões grandes. Não reproduza os textos das âncoras da escala original (licença não confirmada); use só os números e os extremos "pouco cansado" e "muito cansado".

**Humor** (`humor`)

- Escala autoral de 1 a 5, com cinco botões grandes. Privado por padrão.

**Hidratação** (`agua_ingerida`)

- Quantidade de água ingerida. A tela mostra litros; o dado é guardado em mililitros.
- Botões de atalho de +250 mL e possibilidade de editar o registro.
- Cor da urina, opcional, em escala própria de 1 a 8 criada pela equipe (não copie cartelas publicadas).

**Apetite** (`apetite`)

- Normal (1).
- Reduzido (2).
- Muito reduzido (3).

**Sintomas** (opcional)

- Lista de toque rápido, com opção "nenhum". Cada sintoma é um item separado, nunca somado. Os sintomas de alarme levam a laranja ou vermelho conforme a tabela "Sintomas que mudam o nível", na seção 6.

Esses indicadores deverão solicitar atualização a cada 24 horas.

Após salvar, apresentar os valores registrados diretamente nos cartões da seção Avaliação Pessoal, com a data e o horário GMT do último registro e o botão privado "Falar com o CMO".

#### Sinais vitais: quando medir com o kit

Registro opcional, porque são exemplos citados no texto oficial do desafio:

- Pressão arterial sistólica e diastólica (`pa_sistolica`, `pa_diastolica`), em mmHg, com a postura registrada.
- Glicose (`glicose`), em mg/dL, com a marcação "em jejum" (a regra de cor vale só para jejum).
- Temperatura corporal (`temperatura_corporal`), em °C, oral.

#### Testes rápidos: semanais, se o médico de voo aprovar

- **Teste de visão:** grade de Amsler e acuidade de perto (`amsler_distorcao`, `acuidade_perto`), um olho de cada vez, sempre com a mesma distância (35 a 40 cm), luz e óculos. Use estímulos originais da equipe; não copie a grade da AAO nem cartelas licenciadas. Registre por olho o tipo de alteração e a área tocada. Rótulo: "teste de rastreio, não diagnóstico".
- **Teste de reação, PVT de 3 minutos** (`pvt_tempo_reacao`, `pvt_lapsos`): o tripulante toca na tela assim que o estímulo aparece, com intervalo sorteado de 1 a 4 segundos. Guarde o tempo médio de reação em ms, os lapsos (respostas de 355 ms ou mais e, à parte, de 500 ms ou mais) e os falsos inícios (toques sem estímulo). Meça o tempo com `performance.now()`. Nenhum desses números é limiar clínico.

A frequência semanal é proposta do protótipo, não cadência da NASA; a tela diz "sujeito à aprovação do médico de voo".

#### Avaliação periódica: Exames laboratoriais (M08)

Criar um cartão **Exames laboratoriais** que abre a tela M08. Em órbita, quase todo sangue é centrifugado, congelado e analisado na Terra, e o resultado chega dias ou meses depois. Por isso o hemograma tem três estados reais:

1. **Coleta agendada** (com a data prevista).
2. **Amostra coletada, análise na Terra** (com a data da coleta).
3. **Resultado disponível** (com a data da coleta e a data de chegada do resultado).

A tela M08 deverá:

- Informar quando a próxima coleta deverá ser feita. Periodicidade configurável, padrão de 15 dias.
- Permitir registrar a coleta (muda para "amostra coletada") e depois inserir o resultado.
- Campos: hemoglobina (g/dL), hematócrito (%), leucócitos (células/µL), plaquetas (unidade do laudo) e "outros parâmetros" com nome, valor e unidade.
- Para cada campo, guardar também a faixa de referência impressa no laudo do laboratório.
- Armazenar resultados anteriores e exibir a evolução de cada parâmetro ao longo do tempo.

Cor: só a hemoglobina tem regra no `indicadores.json` (amarelo fora da faixa terrestre do sexo do cadastro; nunca vermelho automático). Hematócrito, leucócitos e plaquetas mostram valor, unidade, tendência e a faixa do próprio laudo, sem cor automática. Os resultados deverão ser interpretados pela equipe médica, sem diagnósticos automáticos.

Após o registro, os dados deverão continuar aparecendo no mesmo cartão, com a indicação da última coleta, do estado atual e da próxima solicitação.

### Comportamento dos registros

- Os dados não deverão desaparecer depois de preenchidos.
- Os registros mais recentes deverão aparecer primeiro.
- O astronauta poderá consultar os registros anteriores.
- A avaliação diária deverá reiniciar sua solicitação de preenchimento a cada novo período de 24 horas.
- O hemograma deverá possuir controle de periodicidade (padrão de 15 dias) e os três estados acima.

### C. Detalhe do indicador e do alerta (M07)

Tocar em qualquer cartão, região ou notificação abre o detalhe.

**Detalhe do indicador:** valor e unidade, estado (cor, ícone e palavra), gráfico com a faixa da linha de base pessoal e, quando houver, a faixa com fonte, "Por que importa no espaço" (campo `explicacao`), "O que fazer agora" (campo `orientacoes.amarelo` ou `orientacoes.vermelho`, conforme o nível), "Como ajudar um colega" (`orientacoes.colega`), "Quando subir de nível" (`orientacoes.gatilhoParaSubir`), fonte com link, origem e idade do dado.

**Detalhe do alerta:** quatro blocos fixos, sempre na mesma ordem:

1. **Cabeçalho:** nível com cor, ícone e quem age; título curto com "possível" (exemplo: "Possível efeito de CO2 elevado no Node 3"); astronauta, módulo e horário GMT.
2. **Por que estou vendo isto:** cada dado que disparou a regra, com valor, unidade e estado, e o id da regra de cruzamento (exemplo: R-CO2-01).
3. **O que fazer agora:** passos numerados e o gatilho que faria o alerta subir de nível.
4. **Fonte da regra e quem já sabe:** referência oficial e estado das notificações (você, CMO, solo).

Embaixo, um gráfico com os sinais envolvidos sobrepostos e a linha do limite. Todo alerta guarda as evidências, o id da regra e a fonte.

## Layout 2: painel da missão em tela grande (M03, 1920 por 1080)

É a tela do monitor compartilhado da estação e do telão da apresentação. Tudo cabe numa única tela, **sem rolagem**, e é legível a distância.

Organização, de cima para baixo:

1. **Barra da missão:** logo ORBITA, missão (ISS EXP-01), dia da missão, horário "GMT dia do ano / hh:mm", estado da comunicação com o solo, selo "DADOS SIMULADOS" e o seletor "Modo exibição".
2. **Faixa "precisa de apoio"**, só quando alguém da tripulação está em laranja ou vermelho: quem, há quanto tempo e o que fazer ("Oferecer apoio", "Chamar CMO"). Superfície neutra, contorno na cor do nível, sem fundo vermelho e sem piscar. O sintoma ou o valor só aparece se a pessoa compartilhou aquele dado com a tripulação.
3. **Ambiente da estação:** uma faixa com o módulo de cada leitura e CO2, O2, pressão da cabine, prótons do GOES e índice Kp, com estado, idade do dado e selo de origem.
4. **Tripulação inteira:** um cartão por astronauta, lado a lado (4 cartões na demonstração: Astronauta 001 e Tripulantes A, B e C), com o mesmo conteúdo da tela Tripulação (seção 7): codinome, módulo, selo de estado geral, mini figura humana com as regiões coloridas e os blocos Coração, Oxigenação, Temperatura, Sono, Hidratação, Radiação e Mente. Cada cartão mostra **só o que aquela pessoa consentiu compartilhar com a tripulação**; o resto aparece como "não compartilhado", em texto neutro. Nenhum detalhe clínico, nenhuma observação pessoal, nenhum questionário.
5. **Alertas abertos:** lista curta com nível (cor, ícone e palavra), título com "possível", tripulante (se compartilhado), módulo e horário, por exemplo "! Saúde: atenção. Possível efeito de CO2 elevado no Node 3, Astronauta 001, há 40 min".

Regras do painel da missão:

- **Legível a distância:** números grandes e rótulos curtos. Comece com números de cerca de 56 px e rótulos de cerca de 24 px a 1920 px de largura e confira no telão real: a norma da NASA pede rótulos de pelo menos 0,4 grau de ângulo visual na distância de uso (NASA-STD-3001 Vol. 2, V2 10066), e tamanho em pixel de CSS não prova isso.
- **Sem interação clínica:** tocar ou clicar num cartão não abre prontuário nem detalhe clínico; no máximo mostra o que já está visível em tamanho maior. O detalhe do alerta (M07) só abre no aparelho da própria pessoa.
- **Tela cheia é ativada de propósito**, pelo botão "Tela cheia" da barra da missão, nunca sozinha. Depois de alguns minutos sem uso, o painel esconde os valores e mantém só os estados (cor, ícone e palavra).
- As mesmas regras de cor: nada pisca, nada toca, "não compartilhado" nunca vira cor de alerta.

---

# 5. MAPA CORPORAL INTERATIVO (M05 e M06)

Essa será uma das áreas de maior destaque visual do ORBITA.

Abaixo dos painéis de monitoramento na tela principal, deverá existir uma seção chamada:

**MAPA CORPORAL**

Sua função será apresentar o corpo humano, permitindo que o astronauta explore os riscos relacionados a diferentes regiões e sistemas do organismo e veja o estado atual de cada uma.

### Modelo corporal

O sistema deverá apresentar um modelo humano selecionado conforme o sexo informado no cadastro:

- Masculino.
- Feminino.

A representação deverá ser centralizada e possuir aparência anatômica tecnológica, com iluminação em ciano e tons azulados.

**Comece com uma figura em SVG de alta qualidade, de frente e de costas, com cada região como um `<path>` próprio e brilho ciano.** Troque por um modelo 3D (Three.js ou React Three Fiber) só se sobrar tempo depois de todas as telas P0 e P1. Não substitua o mapa por uma lista simples de textos.

### Regiões interativas

São 12 regiões. Cada região assume a cor do **pior** indicador dela (maior nível). Região sem indicador monitorado no protótipo fica cinza com a frase "sem indicador no protótipo", nunca verde.

| # | Região (id) | Possíveis riscos | Indicadores no ORBITA | SAIBA MAIS |
| --- | --- | --- | --- | --- |
| 1 | Cabeça e cérebro (`cerebro`) | Alterações neurológicas, comportamentais e cognitivas; sono inadequado; possível efeito do CO2 na concentração | Sono, fadiga, humor, PVT, piscadas do óculos Orbit (experimental) | [Comportamento](https://www.nasa.gov/reference/risk-of-behavioral-conditions-and-psychiatric-disorders/), [sono](https://www.nasa.gov/reference/risk-from-inadequate-sleep-and-irregular-schedules/) |
| 2 | Olhos e visão (`olhos`) | SANS; alterações de pressão e estrutura ocular; alterações visuais ligadas à microgravidade | Grade de Amsler, acuidade de perto | [SANS](https://www.nasa.gov/reference/risk-of-spaceflight-associated-neuro-ocular-syndrome-sans/) |
| 3 | Coração e sistema cardiovascular (`coracao`) | Adaptações cardiovasculares; alterações circulatórias; tontura ao ficar de pé no retorno | Frequência cardíaca, pressão arterial | [Cardiovascular](https://www.nasa.gov/reference/risk-of-cardiovascular-adaptations/) |
| 4 | Pulmões e sistema respiratório (`pulmoes`) | Hipóxia; alterações de oxigenação; CO2 e contaminantes da cabine | SpO2, CO2 do módulo, O2 do módulo | [Hipóxia](https://www.nasa.gov/reference/risk-of-hypoxia/) |
| 5 | Sistema imunológico e sangue (`sangue`) | Respostas imunes alteradas; interação com microrganismos; anemia do voo espacial | Glicose, hemograma | [Imunidade](https://www.nasa.gov/reference/risk-of-altered-immune-system-responses/), [microrganismos](https://www.nasa.gov/reference/risk-of-host-microorganism-interactions/) |
| 6 | Abdômen e sistema digestivo (`digestao`) | Alimentação inadequada; nutrição insuficiente; alterações de apetite; enjoo nos primeiros dias | Apetite, massa corporal | [Nutrição](https://www.nasa.gov/reference/risk-of-inadequate-food-and-nutrition/) |
| 7 | Ossos (`ossos`) | Perda de densidade mineral óssea; risco de fratura | Densidade óssea (medida antes e depois do voo: cinza, "sem medida em voo") | [Ossos](https://www.nasa.gov/reference/risk-of-spaceflight-induced-bone-changes/) |
| 8 | Músculos e membros (`musculos`) | Perda de força e de aptidão; lesões em EVA; lesões por cargas dinâmicas | Tempo de exercício | [Aptidão](https://www.nasa.gov/reference/risk-of-reduced-cardiorespiratory-and-musculoskeletal-fitness/), [EVA](https://www.nasa.gov/reference/risk-of-injury-and-compromised-performance-from-extravehicular-activity-eva/) |
| 9 | Corpo inteiro (`corpo`) | Radiação espacial; isolamento e confinamento; ambientes hostis; doença descompressiva | Dose acumulada, temperatura corporal | [Radiação](https://www.nasa.gov/hrp/hazard-space-radiation/), [câncer por radiação](https://www.nasa.gov/reference/risk-of-radiation-induced-cancers/) |
| 10 | Sistema vestibular e equilíbrio (`vestibular`) | Alterações de equilíbrio; tontura; orientação espacial; adaptação aos campos gravitacionais | Sem indicador no protótipo (registre tontura e enjoo nos sintomas) | [Sensorimotor e vestibular](https://www.nasa.gov/reference/risk-of-altered-sensorimotor-and-vestibular-function/) |
| 11 | Rins e hidratação (`rins`) | Cálculo renal, favorecido pelo cálcio liberado do osso e por pouca água | Água ingerida, cor da urina | [Cálculo renal](https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=81) |
| 12 | Ouvidos (`ouvidos`) | Perda auditiva pelo ruído contínuo de ventiladores e bombas | Sem indicador no protótipo (ruído do módulo como contexto) | [Acústica, OCHMO-TB-035](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-035-acoustics.pdf) |

O texto de cada risco, em linguagem simples, está na base da ORBITA IA (`orbita-ia-base.json`, entradas `regiao-...`); use esse texto no painel.

### Funcionamento da interação (painel da região, M06)

Ao tocar em uma região:

1. O ponto correspondente deverá apresentar destaque luminoso (sem piscar).
2. A região deverá ser visualmente identificada no modelo.
3. Um painel deverá surgir de baixo (folha inferior) com o nome da região.
4. O painel deverá mostrar os possíveis riscos.
5. Deverá apresentar uma explicação simples de cada risco.
6. Deverá informar os indicadores relacionados, **cada um com o estado atual** (cor, ícone, palavra, valor e idade do dado), com toque para o detalhe (M07).
7. Deverá disponibilizar a opção SAIBA MAIS, com o link oficial da NASA da tabela acima.

Exemplo:

O astronauta seleciona os olhos.

O sistema apresenta:

REGIÃO OCULAR · ✓ Saúde: normal

SANS: Síndrome Neuro-Ocular Associada aos Voos Espaciais.

Descrição:

Condição associada a alterações neuro-oculares observadas em astronautas durante voos espaciais, que pode envolver mudanças na estrutura ocular e na visão. A NASA acompanha com exames oculares em datas fixas da missão.

Indicadores relacionados:

- Grade de Amsler: sem distorção nova · ✓ normal · último teste há 6 dias.
- Acuidade de perto: igual ao seu padrão · ✓ normal · último teste há 6 dias.
- Exames oftalmológicos especializados (OCT, fundo de olho): feitos pela equipe médica, fora do app.

O sistema deverá apresentar uma explicação semelhante para as demais regiões.

**IMPORTANTE:** o mapa corporal é um painel educativo e de apoio ao acompanhamento. Ele não deverá afirmar que todos os riscos podem ser detectados diretamente pelos indicadores, e nunca afirma diagnóstico.

---

# 6. CÓDIGO DE CORES E CONTRATO DE DADOS

O aplicativo deverá utilizar um padrão visual de cores para facilitar a interpretação da saúde do astronauta.

O código de cores deverá aparecer discretamente nos cartões de indicadores, no mapa corporal, na tela Tripulação e nos relatórios.

### Estados

**CINZA: SEM DADO (nível 0)**

Não existe leitura válida, o dado é inválido ou passou da validade de exibição do indicador. Cinza nunca é "normal".

**VERDE: SAÚDE: NORMAL (nível 1)**

O indicador tem leitura válida, está dentro da faixa com fonte e não se afastou do padrão individual.

**AMARELO: SAÚDE: ATENÇÃO (nível 2)**

Foi identificada uma alteração leve ou uma tendência que merece acompanhamento pelo próprio astronauta: fora de uma faixa com fonte, diferente do padrão pessoal ou uma regra de cruzamento ativa.

**LARANJA: SAÚDE: ALERTA, ACIONAR CMO (nível 3)**

Existe uma alteração relevante que deve ser avaliada pelo CMO e pelo médico de voo, de acordo com os protocolos da missão.

**VERMELHO: SAÚDE: CRÍTICO, CONTATAR CMO AGORA (nível 4)**

Foi relatado um sintoma de alarme. O astronauta deverá contatar o CMO agora e abrir o procedimento oficial. A tela mostra dois botões: "Contatar CMO agora" e "Abrir procedimento oficial".

O código de cores deverá ser acompanhado de textos e ícones, nunca dependendo exclusivamente da percepção da cor.

### Regras que não mudam

1. **Vermelho só vem de sintoma de alarme relatado.** Nenhum número isolado de sinal vital gera vermelho.
2. **Laranja vem de requisito oficial excedido** (exemplos: CO2 do módulo com média de 1 hora acima de 3 mmHg; dose de carreira de 600 mSv ou mais), **de corte clínico com fonte** (SpO2 em ou abaixo de 92%), de sintoma que pede o CMO ou do escalonamento de uma regra de cruzamento.
3. **Amarelo vem de faixa com fonte, de desvio da linha de base pessoal ou de regra de cruzamento.** O desvio pessoal sozinho nunca passa de amarelo.
4. **Cor final = maior nível** entre faixa com fonte, desvio pessoal, sintoma e regras de cruzamento. A região do corpo assume a cor do pior indicador dela.
5. **Nada pisca, nada toca som, nada vibra** em nenhum nível. Os rótulos começam com "Saúde:". Nunca use as palavras em inglês do sistema de alarme da estação (Caution, Warning, Emergency): vermelho piscando, som e luz são do sistema de Caution and Warning da ISS, e o ORBITA não pode parecer com ele.
6. **Linguagem de apoio, não de diagnóstico:** "possível", "sugere", "compatível com". Todo amarelo, laranja e vermelho tem um "o que fazer" e o gatilho para subir de nível.
7. Os critérios ficam no `indicadores.json` (configuráveis) e não deverão ser apresentados como limites oficiais da NASA quando não houver referência correspondente. Quando a faixa for terrestre, a tela escreve "referência terrestre, não limite de voo". Valores marcados como `valorDeDemonstracao` aparecem com o selo "valor de demonstração".

### Como o motor decide a cor

- **Validade:** sem leitura válida e dentro da validade, o estado é cinza. Validade de exibição: 1 hora para dados de ambiente, 24 horas para dados pessoais e 2.160 horas (90 dias) para os testes de visão.
- **Faixa com fonte:** o motor avalia `regraCor.regras` na ordem declarada; cada condição satisfeita propõe o seu nível.
- **Linha de base:** média e desvio padrão amostral de pelo menos 7 leituras válidas. z = (valor menos média) dividido pelo desvio padrão. |z| de 2 ou mais gera amarelo ("diferente do seu normal"); |z| acima de 3 em 2 leituras seguidas gera amarelo persistente, com sugestão de conversar com o CMO. A linha de base não é atualizada com dias amarelos ou mais altos. Com menos de 7 leituras, a tela mostra "linha de base em formação" e vale só a faixa com fonte. Respeite o campo `direcao` (para o apetite, só a categoria maior pede atenção).
- **Ambiente:** cor pela média móvel exponencial (EWMA) com λ = 0,3; o gráfico mostra o valor bruto.
- **Sintomas e regras de cruzamento:** avaliados à parte; o estado final é o maior nível.
- **Teste obrigatório do motor:** frequência cardíaca de 7 manhãs (56, 58, 57, 60, 55, 59 e 57 bpm) dá média de 57,43 bpm e desvio padrão de 1,72 bpm; uma leitura de 63 bpm dá z = 3,24.

### Contrato de dados: indicadores usados pelo ORBITA

Números copiados de `regraCor` do `indicadores.json`. Nível 2 é amarelo, 3 é laranja e 4 é vermelho. "Só linha de base" quer dizer: sem limiar numérico, amarelo por |z| de 2 ou mais, nunca vermelho pela linha de base. Os valores de demonstração estão explicados na seção 14.

| id | Nome na tela | Unidade | Origem no protótipo | Como a cor é decidida (`regraCor`) | Valor de demonstração |
| --- | --- | --- | --- | --- | --- |
| `fc_repouso` | Frequência cardíaca | bpm | Simulada (vestível) | Nível 2 fora de 60 a 100 bpm (referência terrestre); linha de base; nível 4 só com sintoma: dor torácica, síncope, falta de ar importante ou instabilidade | 86 bpm; padrão de 64 bpm → amarelo |
| `dose_acumulada` | Dosimetria | mSv | Simulada (dose efetiva estimada) | Nível 3 em 600 mSv de carreira ou mais (NASA-STD-3001 Vol. 1, V1 4030); abaixo disso, verde | 0,42 mSv hoje; 18,9 mSv na missão; 3,2% do limite → verde |
| `spo2` | Oximetria | % | Simulada | Nível 3 com urgência imediata em ou abaixo de 88%; nível 3 em ou abaixo de 92%; nível 2 fora de 95 a 100% (referência terrestre); nível 4 só com sintoma: dificuldade respiratória importante ou sinais compatíveis com hipóxia | 97% → verde |
| `eog_piscadas` | Atenção ocular (EOG) | piscadas/min | Simulada; óculos Orbit (proposto); experimental | Só linha de base; nunca vermelho; sem limiar | 12,4 piscadas/min, dentro do padrão → verde |
| `ppco2_modulo` | CO2 do módulo | mmHg | Simulada (cenário C1); pico igual ao valor real gravado no Node 3 em 15/11/2026 | Nível 3 com média de 1 h acima de 3 mmHg (NASA-STD-3001 Vol. 2, V2 6004); nível 2 com EWMA acima de 2,8 mmHg **só dentro da regra R-CO2-01** (valor de demonstração); nível 3 com cefaleia intensa ou tontura no contexto de CO2 | 2,95 mmHg no Node 3 → atenção pelo alerta R-CO2-01 |
| `pio2_cabine` | O2 do módulo (PIO2, calculada da ppO2 e da pressão total; não é a ppO2) | kPa | Real gravado (ppO2 do Node 3 e pressão do US Lab, ISS) | Nível 2 fora do alvo de normoxia de 19,33 a 20,67 kPa (145 a 155 mmHg); nível 3 com média de 1 h abaixo de 16,93 kPa (127 mmHg), qualquer leitura abaixo de 16,27 kPa (122 mmHg) ou acima de 47,46 kPa (356 mmHg) | 18,84 kPa (141,3 mmHg) → amarelo |
| `pressao_cabine` | Pressão da cabine | kPa | Real gravado (US Lab, ISS) | Nível 3 em ou abaixo de 34,47 kPa ou acima de 103,42 kPa (5 a 15 psia) | 101,0 kPa (757,6 mmHg) → verde |
| `fluxo_protons_goes` | Prótons GOES, 10 MeV ou mais | pfu | Real gravado (NOAA) | Nível 2 em 10 pfu ou mais (início do nível S1 da NOAA); não é dose pessoal nem vermelho | 0,21 pfu (15/11/2026, 05h35 UTC) → verde |
| `kp` | Índice Kp | adimensional | Real gravado (NOAA) | Só linha de base; contexto ambiental | 1 → verde |
| `sono_tst` | Sono da última noite | min (tela em h) | Manual | Só linha de base; nível 3 só com sintoma: incapacidade de cumprir tarefa crítica com segurança | 5,4 h; padrão de 7,5 h → amarelo |
| `fadiga` | Fadiga | pontos, 1 a 7 | Manual | Só linha de base; nível 3 só com sintoma: incapacidade de cumprir tarefa crítica com segurança | 6 de 7; padrão de 2 de 7 → amarelo |
| `humor` | Humor | pontos, 1 a 5 | Manual | Só linha de base; nível 4 só com risco imediato relatado (contato humano imediato) | 3 de 5; padrão de 4 de 5 → verde (dentro da variação pessoal) |
| `agua_ingerida` | Hidratação | mL (tela em L) | Manual | Linha de base; menos de 1.200 mL em 24 h por 2 dias vale **só dentro da regra R-HID-01** (valor de demonstração, não meta) | 1,8 L → verde |
| `cor_urina` | Cor da urina (opcional) | categoria 1 a 8 | Manual | Linha de base; categoria 6 ou mais vale **só dentro da regra R-HID-01** (valor de demonstração) | Sem registro na demonstração |
| `apetite` | Apetite | categoria 1 a 3 | Manual | Só linha de base (só a categoria maior pede atenção); nível 3 só com sintoma: incapacidade de comer ou beber com piora clínica | 2, reduzido, dentro do padrão → verde |
| `pa_sistolica` | Pressão sistólica | mmHg | Manual (kit) | Nível 2 fora de 90 a 120 mmHg (referência terrestre); nível 4 só com sintoma: síncope, confusão, dor torácica ou déficit neurológico | 120 mmHg → verde |
| `pa_diastolica` | Pressão diastólica | mmHg | Manual (kit) | Nível 2 fora de 60 a 80 mmHg (referência terrestre); nível 4 só com os mesmos sintomas | 80 mmHg → verde |
| `glicose` | Glicose em jejum | mg/dL | Manual (kit) | Nível 2 de 100 a 125 mg/dL; nível 2 em 126 mg/dL ou mais, pedindo confirmação (referência terrestre); sem vermelho por número | 90 mg/dL → verde |
| `temperatura_corporal` | Temperatura | °C | Manual (kit) | Nível 2 fora de 36,5 a 37,3 °C oral (referência terrestre); nível 3 com febre ou hipotermia suspeita junto a sintomas | 36,8 °C → verde |
| `acuidade_perto` | Acuidade de perto | escala da cartela, por olho | Manual (teste no app) | Só linha de base; entra na regra R-SANS-01 | Último teste há 6 dias, igual ao padrão → verde |
| `amsler_distorcao` | Grade de Amsler | resposta por olho | Manual (teste no app) | Só linha de base; entra na regra R-SANS-01 | Sem distorção nova → verde |
| `pvt_tempo_reacao` | Teste de reação | ms | Manual (teste no app) | Só linha de base; piora acima de 10% vale **só dentro da regra R-CO2-01** (valor de demonstração) | Último teste há 6 dias: 268 ms; padrão de 270 ms → verde |
| `pvt_lapsos` | Lapsos no teste de reação | eventos por sessão | Manual (teste no app) | Só linha de base | 1 lapso → verde |
| `hemoglobina` | Hemoglobina | g/dL | Exame | Nível 2 fora de 13 a 18 g/dL (homens) ou 12 a 16 g/dL (mulheres), conforme o sexo do cadastro; nunca vermelho automático; nível 3 só com síncope ou dispneia em repouso | Último resultado 14,8 g/dL (coleta do dia 23); nova amostra coletada no dia 38, análise na Terra |
| `massa_corporal` | Massa corporal | kg | Manual | Só linha de base | 78 kg (cadastro) → linha de base em formação |
| `tempo_exercicio` | Exercício | min | Manual | Só linha de base | 120 min hoje (valor típico do perfil de simulação) → verde |
| `densidade_ossea` | Densidade óssea | % da linha de base | Exame (antes e depois do voo) | Nível 3 abaixo de 95% no quadril ou na coluna, ou de 90% no colo femoral (V1 4027) | Sem medida em voo → cinza |

Os demais indicadores do `indicadores.json` (por exemplo, ruído, temperatura e umidade da cabine, taxa de dose) ficam disponíveis para o detalhe do ambiente e para versões futuras; não precisam de tela própria agora.

### Sintomas que mudam o nível

Os sintomas da avaliação diária são itens separados. Estes mudam o nível do indicador ligado a eles:

| Sintoma relatado | Nível | De onde vem a regra |
| --- | --- | --- |
| Dor no peito | 4, vermelho | `fc_repouso`, `pa_sistolica`, `dor` |
| Desmaio ou quase desmaio | 4, vermelho | `fc_repouso`, `pa_sistolica` |
| Falta de ar importante | 4, vermelho | `fc_repouso`, `spo2`, `frequencia_respiratoria` |
| Confusão, perda súbita de força ou de fala | 4, vermelho | `pa_sistolica`, `pa_diastolica` |
| "Preciso de apoio agora" (risco imediato para mim) | 4, vermelho, com contato humano imediato | `humor` |
| Perda súbita de visão ou visão dupla | 3, laranja | escalonamento de R-SANS-01 |
| Febre com mal-estar | 3, laranja | `temperatura_corporal` |
| "Não consigo cumprir uma tarefa crítica com segurança" | 3, laranja | `sono_tst`, `fadiga` |
| "Não consigo comer ou beber" | 3, laranja | `apetite` |
| Dor de cabeça, com intensidade de 0 a 10 | 2 se nova ou persistente; 3 se for 7 ou mais junto com CO2 alto (R-CO2-01, valor de demonstração) | `dor` |
| Tontura | Entra em R-CO2-01 (sobe para 3 com CO2 alto) e em R-AMB-01 | Regras de cruzamento |
| Dificuldade de concentração | Entra em R-CO2-01 e em R-AMB-01 | Regras de cruzamento |
| Visão borrada, náusea, irritação nos olhos ou na pele, sono ruim | Registro; R-AMB-01 lista fatores ambientais possíveis | Regras de cruzamento |

### Regras de cruzamento (todas no `indicadores.json`)

| id | Quando dispara | Nível | Texto na tela |
| --- | --- | --- | --- |
| R-CO2-01 | EWMA do CO2 do módulo acima de 2,8 mmHg numa janela de 3 h e ao menos um: dor de cabeça, dificuldade de concentração ou PVT mais de 10% mais lento que o padrão (números de demonstração). Sobe para 3 com dor de cabeça de 7 ou mais em 10, tontura ou média de 1 h acima de 3 mmHg | 2 | "Possível efeito de CO2 elevado no módulo" |
| R-RAD-01 | Prótons GOES em 10 pfu ou mais (S1) ou alerta de partículas solares na DONKI, enquanto durar o evento; vale para toda a tripulação | 2 | "Evento solar em andamento: a dose de radiação pode subir" |
| R-SANS-01 | Piora da acuidade de perto ou distorção nova na Amsler em 2 testes seguidos, com até 14 dias entre eles. Sobe para 3 com dor de cabeça persistente, visão dupla ou perda súbita de visão | 2 | "Mudança na visão: vale antecipar o exame de olhos com o médico de voo" |
| R-SONO-01 | Dívida de sono nos últimos 3 dias e atividade crítica (EVA, chegada de veículo, braço robótico) nos próximos 2 dias; sem vermelho automático | 2 | "Sono abaixo do programado antes de uma atividade crítica" |
| R-HID-01 | Água abaixo de 1.200 mL em 24 h por 2 dias e cor da urina 6 ou mais na escala de 8 (números de demonstração); sem vermelho automático | 2 | "Registro de hidratação abaixo do parâmetro demonstrativo; revisar plano individual" |
| R-AMB-01 | Sintoma relatado e grandeza ambiental fora do verde no módulo mais ocupado nas últimas 6 h | Não muda o nível | Anexa "fatores ambientais possíveis" ao detalhe |

As orientações de cada regra (o que fazer, como ajudar um colega e quando subir de nível) estão no campo `orientacoes` de cada regra no `indicadores.json`.

---

# 7. MENU DE NAVEGAÇÃO: ÍCONE ORBITA (M18)

Em todas as telas internas, o cabeçalho deverá apresentar o ícone oficial ao lado da palavra ORBITA.

A navegação muda com o tamanho da tela (seção 1):

- **Celular:** ao clicar no ícone, na área do logotipo ou no ícone de menu visível ao lado, abre um menu lateral (drawer) com as opções de navegação. A abertura acontece por meio de uma animação suave, deslizando da lateral da tela. Embaixo, a barra fixa com 4 atalhos.
- **Tablet e laptop:** o mesmo menu fica fixo à esquerda e pode ser recolhido para uma coluna só de ícones; sem barra inferior.
- **Tela grande:** modo exibição, sem menu (painel da missão, seção 4, layout 2). O seletor "Modo exibição" volta ao layout com menu.

### Organização do menu

No topo:

- Logo ORBITA.
- Nome do aplicativo.
- Botão para fechar o menu.

Em seguida:

1. Visão geral (M03).
2. Mapa corporal (M05).
3. Avaliação de saúde (M04).
4. Exames laboratoriais (M08).
5. ORBITA IA (M09).
6. Relatórios (M10).
7. Rotina da missão (M11).
8. Tripulação (M16).
9. Sono e óculos Orbit (M17).
10. Riscos espaciais (M13).
11. Missão: Saúde em Dia (M12).
12. Perfil e privacidade (M15).

As notificações (M14) ficam no sino do cabeçalho, não no menu.

Na parte inferior:

- Identificação do astronauta.
- Missão atual.
- Dia da missão.
- Status de conectividade, em duas linhas separadas: "Offline: funcionando localmente" e "Comunicação com o solo: em tempo real", "armazenar e encaminhar" ou "sem contato". A cor de saúde nunca muda por causa da rede.

O menu deverá apresentar ícones minimalistas e indicar visualmente qual página está selecionada.

### Barra inferior (só no celular)

Uma barra fixa com 4 atalhos: **Início**, **Mapa**, **Avaliar** e **IA**. Evite uma navegação excessivamente complexa.

### Tela Tripulação (M16): monitor geral com consentimento

No celular, a tela Tripulação é uma lista de cartões, um por pessoa, em uma coluna. Em tablet e laptop, os cartões ficam lado a lado. Em tela grande, a Tripulação passa a ser o painel da missão (seção 4, layout 2), que reúne estes mesmos cartões com o ambiente da estação e os alertas abertos. O conteúdo de cada cartão é o mesmo em todos os tamanhos, sempre com os mesmos blocos na mesma ordem. Na demonstração: Astronauta 001 e os Tripulantes A, B e C, todos fictícios.

- **Cabeçalho do cartão:** codinome, módulo onde está agora (se compartilhado) e selo de estado geral (cor, ícone e palavra).
- **Mini figura humana** com as regiões coloridas, na mesma lógica do mapa.
- **Blocos:** Coração (bpm), Oxigenação (%), Temperatura (°C), Sono da última noite, Hidratação, Radiação (dose da missão em mSv) e Mente (só o estado: o pior entre fadiga, humor e estresse, igual ao da região Cabeça e cérebro do mapa; na demonstração, o Astronauta 001 aparece com Mente em atenção por causa da fadiga de 6 de 7). Quem compartilha só o estado aparece com o ícone e a palavra do estado e o texto "só o estado" no lugar do valor.
- **Rodapé:** idade do dado e, se houver alerta, uma frase do que está acontecendo e do que o colega pode fazer para ajudar (campo `orientacoes.colega`).
- **Faixa "precisa de apoio"**, no topo da tela, só quando alguém está em laranja ou vermelho: quem, há quanto tempo e os botões "Oferecer apoio" e "Chamar CMO". O sintoma ou o valor só aparece se a pessoa compartilhou aquele dado; sem consentimento, a faixa diz apenas "Tripulante C: atenção do CMO solicitada". "A caminho" só aparece depois que o colega aceita a ajuda. A faixa usa superfície neutra, sem fundo vermelho.
- **Faixa compacta do ambiente:** CO2, O2, pressão e prótons do GOES.
- **Barra do cuidado mútuo:** a meta cooperativa do dia (seção 11), sem ranking.

Regras de privacidade (obrigatórias):

- Cada pessoa só aparece com o que consentiu compartilhar, com quem e até quando. O filtro acontece no motor, antes de o dado chegar à tela.
- "Não compartilhado" é texto neutro, sem cor de estado, sem ícone de alerta e sem clique.
- Detalhes clínicos, observações pessoais, questionários e conversas médicas nunca aparecem.
- Não existe acesso emergencial irrestrito codificado no app.

Demonstração: Tripulante A compartilha tudo; Tripulante B compartilha só o estado por sistema (os valores aparecem como "não compartilhado"); Tripulante C compartilha tudo menos a mente ("não compartilhado"). Os valores de hoje dos três são as linhas de base dos tripulantes fictícios `trip-a`, `trip-b` e `trip-c` do arquivo de perfis, e os três estão em "Saúde: normal"; o Astronauta 001 aparece em "Saúde: atenção", com o alerta de CO2.

### Tela Sono e óculos Orbit (M17)

- Cartões: sono da última noite, eficiência do sono e ruído da cabine de dormir (cinza, "sem dado", enquanto não houver medida).
- Hipnograma estimado da última noite, rotulado "estimativa de demonstração, não é polissonografia" (base pública Sleep-EDF quando disponível no projeto; senão, simulado e rotulado).
- Paisagem sonora do dia: perfil cultural escolhido pelo astronauta (exemplo: Mata Atlântica) e a programação por período (manhã, tarde, pré-sono, dormir).
- Sinais do óculos: piscadas por minuto (EOG) e potência alfa (EEG), com o selo "óculos Orbit (proposto) · simulado · experimental".
- Texto fixo: "O som pausa na hora diante de qualquer alarme da estação e nunca cobre alarmes. Ainda não há estudo que mostre que o óculos melhora o sono."

---

# 8. ORBITA IA: ASSISTENTE VIRTUAL OFFLINE (M09)

Criar uma área exclusiva chamada:

**ORBITA IA**

Subtítulo:

Assistente inteligente de saúde espacial.

Essa ferramenta será responsável por responder dúvidas do astronauta sobre sua saúde, indicadores e riscos relacionados ao ambiente espacial.

### Conceito

A ORBITA IA deverá funcionar localmente, sem depender de conexão com a internet e sem chave de API.

Sua base de conhecimento é o arquivo `orbita-ia-base.json` (anexo), montado a partir dos conteúdos científicos e materiais oficiais do NASA Human Research Program e das normas da NASA, com a fonte de cada resposta. Cada entrada tem `id`, `perguntas` (variações e palavras-chave), `resposta`, `maisDetalhes` (opcional), `indicadores`, `regioes` e `fontes`.

A intenção é possibilitar que o astronauta consulte informações mesmo quando estiver distante da Terra ou com comunicação limitada.

### Interface

Criar uma tela de conversa semelhante a um assistente virtual.

Elementos:

- Ícone da ORBITA IA.
- Identificação de funcionamento offline ("Offline: base local").
- Caixa de mensagens.
- Campo para digitar perguntas.
- Botão de envio.
- Sugestões de perguntas frequentes (as 10 abaixo, como botões).
- Abaixo de cada resposta: as fontes como links e o botão "Mais detalhes" quando existir.
- Aviso fixo no topo, com o campo `aviso` do arquivo.

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

### Como responder

1. Normalize a pergunta (minúsculas, sem acentos e sem pontuação) e compare com o campo `perguntas` de cada entrada, por palavras em comum. Escolha a entrada de maior pontuação.
2. Se a pergunta tiver palavra de emergência (emergência, fogo, incêndio, despressurização, atmosfera tóxica, alarme, socorro, dor no peito), responda primeiro com a entrada `emergencia` e mostre os botões "Contatar CMO agora" e "Abrir procedimento oficial".
3. Se nenhuma entrada tiver pontuação suficiente, responda: "Não encontrei isso na base local do ORBITA. Posso falar sobre:" e mostre três sugestões. Nunca invente.
4. Algumas respostas têm marcadores entre chaves, que o app preenche com os estados atuais calculados pelo motor (nunca pela IA). Marcador sem dado vira "sem dado"; lista vazia vira "nenhum".

| Marcador | O que o app coloca |
| --- | --- |
| `{missao}`, `{diaMissao}`, `{horaGmt}` | Missão, dia de missão e "GMT dia do ano / hh:mm" |
| `{qtdVerde}`, `{qtdAmarelo}`, `{qtdLaranja}`, `{qtdVermelho}`, `{qtdSemDado}` | Quantidade de indicadores em cada nível |
| `{indicadoresAmarelos}`, `{indicadoresLaranja}`, `{indicadoresVermelhos}`, `{indicadoresSemDado}` | Lista com nome, valor e unidade, por exemplo "frequência cardíaca 86 bpm, acima do seu padrão de 64 bpm" |
| `{alertasAtivos}` | Título e id de cada alerta ativo |
| `{listaAtencao}`, `{oQueFazerAtencao}` | Indicadores em amarelo ou acima e o primeiro passo de `orientacoes` de cada um |
| `{fcValor}`, `{fcLinhaDeBase}`, `{fcEstado}` | Frequência cardíaca de hoje, média da linha de base e estado |
| `{proximaAvaliacaoDiaria}`, `{estadoHemograma}`, `{proximoHemograma}`, `{proximoTesteVisao}`, `{proximoPvt}` | Datas e estados da Rotina da missão |
| `{regiaoSelecionada}`, `{estadoRegiao}`, `{indicadoresDaRegiao}` | Região do mapa, estado e indicadores dela |
| `{alertaTitulo}`, `{alertaRegra}`, `{alertaEvidencias}`, `{alertaOQueFazer}`, `{alertaGatilho}`, `{alertaFonte}` | Os quatro blocos do detalhe do alerta (M07) |

As respostas deverão ser fundamentadas nas informações disponíveis.

Não inventar informações científicas, não prescrever medicamentos nem doses e não apresentar diagnósticos médicos.

### Funcionamento offline

Para o protótipo:

- Usar a base local `orbita-ia-base.json`.
- Implementar respostas contextuais por meio de busca local e regras.
- Permitir perguntas predefinidas e perguntas digitadas.
- Apresentar respostas relacionadas ao contexto do astronauta (marcadores).
- Mostrar sempre as fontes consultadas.

A arquitetura deverá permitir futura integração com modelos de IA executados localmente, mas o protótipo deverá funcionar mesmo sem API KEY e sem internet.

---

# 9. RELATÓRIOS: GRÁFICOS DINÂMICOS (M10)

Criar uma página chamada:

**RELATÓRIOS DE SAÚDE**

Ela deverá apresentar a evolução dos indicadores do astronauta ao longo da missão.

A finalidade é permitir identificar mudanças graduais e comparar os resultados entre diferentes dias.

### Gráficos

Criar gráficos dinâmicos (Recharts) para:

1. Frequência cardíaca.
2. Dosimetria acumulada.
3. Oximetria.
4. Indicadores EOG.
5. Hidratação.
6. Fadiga.
7. Apetite.
8. Hemograma, conforme os exames registrados.

E também para sono, humor, pressão arterial, glicose, temperatura e CO2 do módulo.

Cada gráfico mostra:

- A faixa da linha de base pessoal (média e 2 desvios padrão para cima e para baixo), pontilhada.
- A faixa com fonte, quando existir, com o rótulo da fonte ("referência terrestre, não limite de voo" quando for o caso).
- Os eventos marcados no eixo do tempo: evento solar, EVA, coleta de sangue, início do alerta.
- Os pontos na cor do estado de cada leitura, com ícone no toque.

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

- Data e hora (GMT).
- Indicador.
- Valor registrado, com unidade.
- Estado (cor, ícone e palavra).
- Origem (simulada, manual, exame, real gravado).
- Observações.

Os dados deverão ser persistidos e atualizados automaticamente após novos registros.

O hemograma deverá apresentar um histórico próprio, respeitando a periodicidade configurada e os estados de coleta.

Os gráficos deverão permitir identificar tendências, mas não deverão interpretar uma simples variação isolada como diagnóstico.

---

# 10. ROTINA DA MISSÃO: LEMBRETES E AÇÕES (M11)

O ORBITA deverá possuir uma área chamada:

**ROTINA DA MISSÃO**

Sua função será solicitar ao astronauta que realize avaliações ou ações específicas em determinados períodos.

Todos os horários em GMT, seguindo a rotina de referência da ISS: acordar por volta de 06:00, trabalho das 08:00 às 17:00, pré-sono a partir de 19:30 e janela de sono de 21:30 a 06:00 (ou o horário do cadastro).

### Atividades diárias

- Avaliação diária de 2 minutos: sono, fadiga, humor, hidratação, apetite e sintomas.
- Registrar hidratação ao longo do dia.
- Conferir os indicadores automáticos e o ambiente do módulo.
- Registrar sinais vitais quando medir com o kit.

### Atividades periódicas

- Hemograma, padrão de 15 dias, com os estados "coleta agendada", "amostra coletada, análise na Terra" e "resultado disponível".
- Teste de visão (Amsler e acuidade de perto), semanal, como proposta sujeita à aprovação do médico de voo. Os exames oculares oficiais de SANS da NASA são em FD30, FD90 e depois a cada 90 dias.
- Teste de reação (PVT de 3 minutos), semanal, como proposta.
- Revisão periódica do histórico.

### Interface

Cada atividade deverá apresentar:

- Nome.
- Descrição.
- Periodicidade.
- Horário GMT ou prazo.
- Estado: pendente ou concluída (o hemograma usa os seus três estados).

Quando uma atividade for concluída, o sistema deverá atualizar automaticamente o estado da tarefa.

Criar uma barra de progresso diário mostrando quantas atividades foram concluídas.

O objetivo é ajudar o astronauta a manter uma rotina organizada de acompanhamento da própria saúde.

Os lembretes deverão respeitar a programação da missão: **nenhum lembrete na janela de sono nem durante atividades críticas marcadas no plano** (EVA, chegada de veículo). Lembretes usam cinza ou ciano, nunca as cores de estado.

---

# 11. GAMIFICAÇÃO: ENGAJAMENTO DO ASTRONAUTA (M12)

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
- **Meta da tripulação:** uma meta cooperativa por dia (exemplo: "toda a tripulação registrou hidratação hoje"), sem ranking e sem comparação entre colegas.
- **Ligação com o óculos Orbit:** conquistas liberam novos sons do perfil cultural escolhido para a paisagem sonora.

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

Os pontos deverão ser concedidos por ações de acompanhamento e prevenção, nunca por apresentar resultados de saúde considerados melhores. Não há metas numéricas de ingestão ou de treino criadas pelo app: a meta é concluir o plano individual.

---

# 12. RISCOS ESPACIAIS: BASE CIENTÍFICA NASA (M13)

Criar uma área chamada:

**RISCOS DOS VOOS ESPACIAIS**

Essa seção deverá apresentar os cinco perigos principais identificados pelo NASA Human Research Program (sigla RIDGE):

1. Radiação espacial.
2. Isolamento e confinamento.
3. Distância da Terra.
4. Campos gravitacionais.
5. Ambientes hostis e fechados.

Cada risco deverá possuir:

- Ícone ilustrativo.
- Título.
- Descrição resumida (use as entradas `perigo-...` do `orbita-ia-base.json`).
- Possíveis impactos na saúde.
- Indicadores associados no ORBITA.
- Link para o material oficial da NASA (seção 15).

Além dos cinco perigos, organizar os riscos específicos e relacioná-los às regiões do mapa corporal (toque leva à região):

| Risco | Região do mapa |
| --- | --- |
| Alterações do sistema imunológico | `sangue` |
| Funções motoras e vestibulares | `vestibular`, `musculos` |
| Adaptações cardiovasculares | `coracao` |
| Doença descompressiva | `corpo` |
| Interações entre hospedeiro e microrganismos | `sangue` |
| Hipóxia | `pulmoes` |
| Alimentação e nutrição inadequadas | `digestao` |
| Lesões e desempenho em caminhadas espaciais | `musculos` |
| Redução da aptidão cardiorrespiratória e musculoesquelética | `musculos`, `coracao` |
| SANS | `olhos` |
| Alterações ósseas | `ossos` |
| Alterações comportamentais e transtornos psiquiátricos | `cerebro` |
| Trabalho em equipe inadequado | `cerebro` (risco coletivo; ver tela Tripulação) |
| Sono inadequado e horários irregulares | `cerebro` |
| Suporte inadequado às operações do sistema | Nenhuma (contexto da missão) |
| Lesões relacionadas a cargas dinâmicas | `musculos`, `ossos` |
| Câncer induzido por radiação | `corpo` |
| Cálculo renal | `rins` |
| Perda auditiva por ruído | `ouvidos` |

Organizar os riscos por categoria (os cinco perigos).

Os conteúdos científicos deverão ser apresentados em linguagem simples, preservando a fundamentação original da NASA.

---

# 13. NOTIFICAÇÕES E ALERTAS (M14)

Criar um sistema visual de notificações no aplicativo, acessado pelo sino do cabeçalho.

Exemplos:

- Sua avaliação diária está pendente.
- Seu próximo hemograma está próximo.
- Sua frequência cardíaca está diferente do seu padrão habitual.
- Sua avaliação de hidratação está pendente.
- Existe um novo resultado de exame para consultar.
- Possível efeito de CO2 elevado no Node 3: veja o que fazer.

Regras:

- Notificações de saúde têm a cor do nível, o ícone e a palavra (seção 6). Lembretes de rotina usam cinza ou ciano, nunca as cores de estado.
- **Nenhum som, nenhuma vibração e nada piscando**, em nenhum nível.
- Ao tocar numa notificação de saúde, abrir o detalhe do alerta ou do indicador (M07), com o porquê, o que fazer e a fonte da regra. Ao tocar num lembrete, abrir a página relacionada.
- Histórico das notificações, mais recente primeiro, com horário GMT.

---

# 14. DADOS PARA DEMONSTRAÇÃO DO PROTÓTIPO

O sistema deverá iniciar com um perfil fictício para facilitar a apresentação aos jurados. Todos os dados do corpo são fictícios e aparecem com o selo de dado simulado.

### Perfil demonstrativo

| Campo | Valor |
| --- | --- |
| Nome | Astronauta 001 |
| Sexo | Masculino |
| Massa corporal | 78 kg |
| Altura | 180 cm |
| Missão | ISS EXP-01 |
| Dia da missão | 45 (a data de início é "hoje menos 44 dias", para o dia 45 aparecer sempre) |
| Horário de sono | 21:30 a 06:00 GMT |
| Módulo atual | Node 3 |
| Compartilhamento | Tudo com a tripulação (perfil de demonstração) |

Todos os horários da demonstração são relativos ao momento em que os dados são restaurados.

### Dados automáticos simulados

| Indicador | Hoje | Linha de base (7 dias anteriores) | Estado |
| --- | --- | --- | --- |
| Frequência cardíaca | 86 bpm | 60, 62, 64, 68, 66, 62 e 66 bpm (média 64 bpm) | Amarelo: diferente do seu padrão |
| Dosimetria | 0,42 mSv hoje (dose efetiva estimada) | 0,42 mSv por dia; acumulado de 18,9 mSv em 45 dias, 3,2% do limite de carreira de 600 mSv (sem missões anteriores) | Verde |
| Oximetria | 97% | 97, 98, 97, 96, 97, 98 e 97% | Verde |
| Atenção ocular (EOG) | 12,4 piscadas/min (óculos Orbit, simulado) | 13,0; 12,1; 13,5; 12,8; 11,9; 12,6 e 13,2 | Verde |

### Ambiente do módulo (Node 3)

| Grandeza | Valor | Origem | Estado |
| --- | --- | --- | --- |
| CO2 | Base de 1,9 mmHg; há 2 horas subiu para 2,95 mmHg e ficou lá (cenário C1; o mesmo valor aparece na telemetria pública da ISS gravada em 15/11/2026). Com leituras a cada 10 minutos e λ = 0,3, a EWMA passa de 2,8 mmHg em cerca de 60 minutos; a média de 1 hora fica em 2,95 mmHg, abaixo do requisito de 3 mmHg | Simulado | Atenção pelo alerta R-CO2-01 |
| O2 (PIO2) | 141,3 mmHg (18,84 kPa), calculada da ppO2 de 150,67 mmHg do Node 3 e da pressão total de 757,64 mmHg: PIO2 = (pressão total menos 47) × ppO2 ÷ pressão total (`docs/04`, A1) | Real gravado | Amarelo: fora do alvo de normoxia de 145 a 155 mmHg, muito acima dos limites de 127 e 122 mmHg. Texto: "O2 um pouco abaixo do alvo no Node 3; confira o sensor e acompanhe a tendência" |
| Pressão da cabine | 757,6 mmHg (101,0 kPa), US Lab | Real gravado | Verde |
| Prótons GOES, 10 MeV ou mais | 0,21 pfu; máximo dos últimos 7 dias, 0,48 pfu | Real gravado (NOAA) | Verde |
| Índice Kp | 1 | Real gravado (NOAA) | Verde |

### Dados manuais simulados (avaliação de hoje)

| Indicador | Hoje | Linha de base (7 dias anteriores) | Estado |
| --- | --- | --- | --- |
| Sono | Última noite 5,4 h | 440, 455, 450, 465, 445, 450 e 445 min (média 7,5 h) | Amarelo: dívida de sono |
| Fadiga | 6 de 7 | 2, 2, 3, 2, 1, 2 e 2 (média 2 de 7) | Amarelo |
| Humor | 3 de 5 | 4, 4, 5, 4, 3, 4 e 4 (média 4 de 5) | Verde (variação dentro do padrão) |
| Hidratação | 1,8 L | 2.000, 1.900, 2.100, 1.800, 2.000, 2.200 e 1.900 mL | Verde |
| Apetite | Reduzido (2) | 1, 1, 2, 1, 1, 2 e 1 | Verde (dentro do padrão) |
| Sintomas | Dificuldade de concentração, relatada há 40 minutos | | Entra na regra R-CO2-01 |
| Pressão arterial | 120 por 80 mmHg | Linha de base em formação | Verde |
| Glicose em jejum | 90 mg/dL | Linha de base em formação | Verde |
| Temperatura | 36,8 °C | Linha de base em formação | Verde |
| Exercício | 120 min | Linha de base em formação | Verde |
| Teste de visão | Último há 6 dias: sem distorção nova; acuidade igual ao padrão | | Verde |
| Teste de reação | Último há 6 dias: 268 ms, 1 lapso; padrão de 270 ms | | Verde |
| Hemograma | Coleta do dia 38 (há 7 dias): "amostra coletada, análise na Terra". Resultado anterior (coleta do dia 23): hemoglobina 14,8 g/dL, dentro da referência terrestre de 13 a 18 g/dL para homens. Próxima coleta no dia 53 | | O resultado de 22 dias aparece com a idade do dado, sem virar verde |

Os valores de pressão arterial, glicose, temperatura, exercício e teste de reação vêm dos valores típicos do arquivo de perfis de simulação.

### História da demonstração

Com esses valores, a tela inicial mostra **três amarelos** no corpo (frequência cardíaca, fadiga e sono), **um alerta explicável de CO2**, o **O2 do Node 3 em amarelo** no cartão de ambiente (dado real: o mesmo módulo com CO2 mais alto e O2 abaixo do alvo sugere ventilação local, assunto do controle ambiental) e todo o resto em verde, além do cinza honesto onde não há medida em voo (ossos, ouvidos e vestibular no mapa).

O alerta aparece assim no detalhe (M07):

1. **Cabeçalho:** "! Saúde: atenção. Possível efeito de CO2 elevado no Node 3" · quem age: você, com aviso ao CMO e ao controle ambiental · horário GMT.
2. **Por que estou vendo isto:** CO2 do Node 3 com EWMA acima de 2,8 mmHg há mais de 1 hora (pico de 2,95 mmHg; média de 1 hora abaixo do requisito de 3 mmHg, NASA-STD-3001 Vol. 2, V2 6004); dificuldade de concentração relatada há 40 minutos; regra R-CO2-01. Fatores possíveis (R-AMB-01): CO2 do módulo e sono curto na última noite (5,4 h). Também diferentes do seu padrão hoje: frequência cardíaca de 86 bpm e fadiga de 6 de 7.
3. **O que fazer agora:** (1) confira o módulo, o sensor e a ventilação; (2) se autorizado, vá para um módulo com leitura menor; (3) hidrate-se conforme o plano; (4) repita o teste de reação em 2 horas; (5) avise o controle ambiental e o CMO. Sobe para laranja se: dor de cabeça de 7 ou mais em 10, tontura ou média de 1 hora acima de 3 mmHg. Como um colega pode ajudar: oferecer acompanhar a pessoa ou avisar o controle ambiental.
4. **Fonte e quem já sabe:** regra R-CO2-01 (valores de demonstração do protótipo); NASA OCHMO-TB-004 e NASA-STD-3001 Vol. 2 Rev. F, V2 6004. Você: avisado; CMO: na fila; solo: na fila para a próxima passagem.

No mapa, Coração e Cabeça e cérebro ficam amarelos pelos indicadores, e Pulmões fica amarelo pelo alerta de CO2 do módulo.

**No telão (painel da missão, 1920 por 1080):** a faixa do ambiente mostra o Node 3 com CO2 de 2,95 mmHg e O2 (PIO2) de 18,84 kPa em atenção; os quatro cartões da tripulação aparecem lado a lado (Astronauta 001 em "Saúde: atenção" e os Tripulantes A, B e C em "Saúde: normal", com os "não compartilhado" em texto neutro); a lista de alertas abertos mostra "Possível efeito de CO2 elevado no Node 3". A faixa "precisa de apoio" não aparece, porque ninguém está em laranja ou vermelho; ela aparece quando a demonstração registra SpO2 de 92% ou o sintoma "dor no peito" (parágrafo seguinte).

Para mostrar o escalonamento aos jurados, a demonstração permite alterar valores: registrar SpO2 de 92% deixa a oximetria laranja ("acionar CMO"); marcar o sintoma "dor no peito" leva o coração a vermelho com "Contatar CMO agora" e "Abrir procedimento oficial", sem piscar e sem som.

Criar um botão de demonstração chamado:

**RESTAURAR DADOS INICIAIS**

Esse botão deverá permitir repetir o cenário durante a apresentação, recalculando todos os horários a partir do momento atual.

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

### Normas e briefs que dão os números

**NASA-STD-3001 Vol. 1 Rev. C** (saúde da tripulação; limite de carreira de radiação V1 4030, meta óssea V1 4027, privacidade):

https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf

https://www.nasa.gov/reference/4-0-human-performance/

**NASA-STD-3001 Vol. 2 Rev. F** (ambiente da cabine: CO2 V2 6004, O2, pressão; alarmes e telas):

https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf

**Brief de SANS da OCHMO (OCHMO-MTB-001):**

https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf

**Outros briefs da OCHMO usados nas regras:** CO2 (OCHMO-TB-004), https://www.nasa.gov/ochmo-tb-004-carbon-dioxide-2/ ; sono (OCHMO-TB-041), https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-041-sleep-accommodations.pdf ; saúde urinária (OCHMO-MTB-003), https://www.nasa.gov/ochmo-mtb-003-urinary-health-2/ ; acústica (OCHMO-TB-035), https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-035-acoustics.pdf

**Cálculo renal (região Rins):**

https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=81

**Clima espacial (NOAA):**

https://www.swpc.noaa.gov/products/notifications-timeline

**Referências terrestres usadas com o rótulo "referência terrestre, não limite de voo":** MedlinePlus, sinais vitais, https://medlineplus.gov/ency/article/002341.htm ; MedlinePlus, oximetria, https://www.medlineplus.gov/lab-tests/pulse-oximetry/ ; MedlinePlus, hemograma, https://medlineplus.gov/ency/article/003642.htm ; American Diabetes Association, https://diabetes.org/about-diabetes/diagnosis?loc=db-slabnav

Essas fontes deverão estar disponíveis na seção de riscos, no detalhe de cada indicador e na biblioteca da ORBITA IA.

Não inventar informações ou apresentar hipóteses como se fossem resultados oficiais da NASA.

---

# 16. REGRAS DE FUNCIONAMENTO DO PROTÓTIPO

O aplicativo deverá ser funcional, mesmo sem integração com equipamentos médicos reais.

Nesta primeira versão:

- Os indicadores automáticos utilizarão dados simulados.
- Os dados de ambiente usarão o arquivo real gravado, com seletor "ao vivo" opcional e desligado por padrão.
- Os dados manuais serão inseridos pelo usuário.
- O formulário deverá salvar os registros.
- O histórico deverá ser atualizado.
- Os gráficos deverão reagir aos novos registros.
- Os lembretes deverão respeitar os períodos definidos.
- O mapa corporal deverá permitir selecionar as regiões.
- A ORBITA IA deverá responder utilizando a base local de conhecimento.
- O menu deverá permitir navegar entre todas as páginas.
- A gamificação deverá atualizar o XP conforme as tarefas concluídas.

Utilize armazenamento local para preservar os dados e permitir a demonstração sem depender de uma infraestrutura complexa. **O app inteiro funciona com a rede desligada.**

Todos os elementos interativos deverão funcionar.

Não crie botões decorativos sem ação.

Não simule conexões reais com sensores ou equipamentos quando elas não estiverem implementadas.

Diferencie claramente, com um selo em cada leitura (campo `origem`):

| `origem` | Selo na tela |
| --- | --- |
| `simulada` | Simulado |
| `manual` | Registrado por você |
| `automatica` | Equipamento (integração futura) |
| `exame` | Exame de laboratório |
| `historica` | Real gravado (data) |
| `ao_vivo` | Ao vivo |

E também a disponibilidade de cada leitura: "disponível", "gravado, aguardando transferência" ou "amostra coletada, análise na Terra". O motor só avalia leituras disponíveis.

Outras regras:

- Todo número aparece com unidade, na tela, nos dados e nos testes. Faixas por extenso: "60 a 100 bpm".
- Todo horário é guardado em UTC (ISO 8601) e mostrado como "GMT dia do ano / hh:mm".
- O ORBITA mostra e aponta o procedimento, mas não substitui o alarme da estação e não comanda nada. Fogo, despressurização e atmosfera tóxica têm alarme próprio da ISS: o app nunca diz que detectou essas emergências.
- Privacidade: a tela Tripulação mostra só o que cada pessoa consentiu compartilhar; o filtro fica no motor, antes da tela.
- Nenhum remédio, nenhuma dose, nenhum diagnóstico. Linguagem de apoio: "possível", "sugere", "compatível com".
- Textos de interface em português do Brasil, num dicionário com versão em inglês (sem texto fixo espalhado nos componentes).

O aplicativo é uma ferramenta de monitoramento e apoio à decisão, não um sistema de diagnóstico médico.

---

# 17. EXPERIÊNCIA DE NAVEGAÇÃO

A experiência precisa ser muito simples.

O fluxo principal deverá ser:

**PRIMEIRO ACESSO**

Abertura do ORBITA → Cadastro do astronauta (M01) → Animação orbital (M02) → Visão geral (M03).

**USO DIÁRIO**

Visão geral → Conferência dos indicadores automáticos e do ambiente → Avaliação diária de 2 minutos (M04) → Atualização dos registros → Consulta do mapa corporal (M05 e M06) → Detalhe do alerta, se houver (M07).

**CONSULTA**

Ícone ORBITA ou barra inferior → Menu lateral → ORBITA IA / Relatórios / Rotina da missão / Exames laboratoriais / Riscos espaciais / Missão: Saúde em Dia / Sono e óculos Orbit.

**CUIDADO MÚTUO**

Menu → Tripulação (M16) → ver quem precisa de apoio → "Oferecer apoio" ou "Chamar CMO".

**MONITOR COMPARTILHADO E APRESENTAÇÃO**

Tela de 1920 px ou mais (ou seletor "Modo exibição") → Painel da missão (layout 2), sem menu → botão "Tela cheia" → ambiente da estação, tripulação inteira e alertas abertos, sem rolagem.

**ACOMPANHAMENTO**

Relatórios → Seleção do período → Visualização dos gráficos → Consulta das alterações.

O astronauta deverá conseguir acessar as funcionalidades sem precisar retornar constantemente à tela inicial.

---

# 18. REQUISITOS TÉCNICOS E DE QUALIDADE

Desenvolva o projeto utilizando uma arquitetura moderna e adequada ao Lovable.

Preferencialmente:

- React.
- TypeScript estrito.
- Tailwind CSS.
- Componentes reutilizáveis.
- Lucide Icons.
- Recharts para gráficos.
- Mapa corporal em SVG; Three.js ou React Three Fiber só como melhoria opcional, se houver tempo.

Não torne a arquitetura excessivamente complexa.

Priorize carregamento rápido, boa performance e animações suaves.

Responsividade: defina no `tailwind.config` os quatro pontos de quebra da seção 1 (celular de 360 a 430 px, tablet de 768 a 1024 px, laptop a partir de 1280 px e tela grande a partir de 1920 px) e teste cada tela nesses tamanhos. O painel da missão é testado em 1920 por 1080 sem rolagem.

Organização mínima:

- `src/domain/`: tipos com os nomes do modelo de dados (`Leitura`, `Indicador`, `Alerta`, `Tripulante`, `indicadorId`, `origem`, `disponibilidade`, `compartilhamento`).
- `src/engine/`: funções puras de cálculo (linha de base, z-score, EWMA, avaliação de `regraCor`, regras de cruzamento, filtro de consentimento), com testes unitários usando os exemplos resolvidos (z = 3,24) e os `exemplosTeste` do `indicadores.json`.
- `src/adapters/`: um adaptador por fonte (simulador, arquivo real gravado, registro manual). O adaptador nunca decide cor; só entrega leituras.
- `src/i18n/`: dicionário pt-BR e en.
- `public/config/`: `indicadores.json`, `orbita-ia-base.json` e `perfis-simulacao.json`, lidos no início, sem rede.
- Componentes de tela não calculam estado: recebem o estado pronto do motor.

Utilize componentes independentes para:

- Cadastro.
- Animação orbital.
- Visão geral: painel pessoal e painel da missão em tela grande, com o seletor "Modo exibição".
- Indicadores e ambiente do módulo.
- Avaliações manuais e testes rápidos.
- Exames laboratoriais.
- Mapa corporal.
- Detalhes das regiões.
- Detalhe do indicador e do alerta.
- ORBITA IA.
- Relatórios.
- Rotina.
- Gamificação.
- Tripulação.
- Sono e óculos Orbit.
- Menu lateral (gaveta no celular, fixo e recolhível em tablet e laptop) e barra inferior.

Persistir o perfil e os registros no armazenamento local, garantindo que o usuário possa fechar e abrir o aplicativo sem perder os dados.

Se não for possível implementar algum recurso avançado integralmente, entregue uma versão simplificada, mas funcional, mantendo o comportamento e a identidade visual pretendidos.

Não deixe páginas vazias, links quebrados ou controles sem funcionalidade.

---

# 19. RESULTADO FINAL ESPERADO

Quero um web app responsivo completo em termos de experiência visual e fluxo de navegação, com identidade futurista e científica: mobile primeiro, bom no tablet e no laptop, e com o painel da missão em tela grande.

O ORBITA deverá parecer um software desenvolvido especificamente para monitoramento de saúde em missões espaciais, e não um aplicativo convencional de saúde com uma identidade espacial aplicada superficialmente.

A interface deverá ser minimalista, elegante e tecnológica.

O destaque deverá estar em:

1. Cadastro personalizado do astronauta, com dados da missão e consentimento.
2. Animação exclusiva do ícone ORBITA.
3. Visão geral com indicadores automáticos, ambiente do módulo e avaliação pessoal no celular, e o painel da missão (ambiente da estação, tripulação inteira com consentimento e alertas abertos) em tela grande, legível a distância e sem rolagem.
4. Mapa corporal interativo com 12 regiões e estado atual de cada uma.
5. Código de cores de 5 níveis, com cor, ícone e palavra, sem piscar e sem som.
6. Alerta explicável: por que, o que fazer, quando subir de nível e a fonte.
7. ORBITA IA funcionando offline, com fontes.
8. Relatórios com gráficos dinâmicos, linha de base e faixas com fonte.
9. Rotina de missão em GMT, respeitando o sono.
10. Tripulação com consentimento e cuidado mútuo.
11. Gamificação para incentivar a prevenção, sem ranking.
12. Biblioteca científica baseada nas referências da NASA.

Conferência final antes de entregar:

- A história da seção 14 roda do começo ao fim: três amarelos, o alerta "Possível efeito de CO2 elevado" com os quatro blocos, e o botão "Restaurar dados iniciais" repete tudo.
- O painel da missão abre em 1920 por 1080 sem rolagem e sem menu, e cada tela funciona no celular, no tablet e no laptop.
- Nenhum número de faixa diferente do `indicadores.json`; toda leitura com unidade, origem e idade do dado.
- Nada pisca, nada toca, nenhum vermelho sem sintoma de alarme, nenhum "não compartilhado" colorido.
- O app abre e funciona com a rede desligada.

**DIRETRIZ MAIS IMPORTANTE: NÃO FUJA DA ESTRUTURA E DO CONCEITO APRESENTADOS NESTE PROMPT.**

Não transforme o projeto em uma plataforma exageradamente complexa. Não acrescente módulos aleatórios. Não sobrecarregue as telas.

Quero um produto visualmente muito bem executado, com funcionalidades interativas e uma apresentação convincente para os jurados do NASA Space Apps Challenge 2026.

Comece desenvolvendo a identidade visual e a estrutura de navegação. Em seguida, implemente as telas na ordem P0, P1 e P2, mantendo consistência entre todas elas.

**O resultado deve ser o ORBITA: um copiloto inteligente de saúde para astronautas durante missões espaciais.**
