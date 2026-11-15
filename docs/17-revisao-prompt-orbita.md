# 17. Revisão do prompt ORBITA: conectando funcionalidades e pesquisa

> Para quem: a equipe de desenvolvimento e quem vai executar o código no Lovable.
> O que é: análise, seção por seção, do prompt "ORBITA: Sistema Inteligente de Monitoramento da Saúde de Astronautas" (aba "Prompt de Desenvolvimento" do documento Fundação Futuro, lida em 15/11/2026 às 10h40), comparado com a pesquisa e a documentação deste repositório.
> Resultado: o que manter, o que corrigir e por quê. O design de cada tela está em [`18-design-orbita-mobile.md`](18-design-orbita-mobile.md) e os desenhos em [`wireframes/orbita-mobile.html`](wireframes/orbita-mobile.html). O prompt corrigido, pronto para colar no Lovable, está em [`19-prompt-lovable-revisado.md`](19-prompt-lovable-revisado.md).

---

## 1. Resumo

**O prompt está muito bem pensado e já acerta o essencial que a pesquisa recomenda:** linha de base individual, dados simulados marcados, código de cores com texto e ícone, critérios configuráveis que não fingem ser limites da NASA, IA offline sem diagnóstico e sem remédio, gamificação que premia ação e não resultado, mapa corporal educativo e fontes oficiais do Human Research Program. A estrutura, o nome **ORBITA** e a identidade visual ficam como estão.

**Oito correções são necessárias para o ORBITA ficar coerente com a pesquisa e com o desafio oficial:**

| # | Correção | Por quê |
| --- | --- | --- |
| 1 | Incluir os indicadores que o próprio desafio cita: **pressão arterial, glicose (mg/dL), temperatura, horas de sono e humor** | O texto oficial do Space Apps 2026 dá esses exemplos; hoje o prompt não pede nenhum deles na avaliação diária (frente 7) |
| 2 | Acrescentar um cartão **Ambiente do módulo** (CO2, O2, pressão, clima espacial) | O cruzamento corpo mais ambiente é o principal diferencial do projeto e já tem dado real gravado da ISS e da NOAA (frentes 1, 3, 11; `docs/04`, regra R-CO2-01) |
| 3 | Acrescentar a tela **Tripulação** (monitor geral com consentimento) | Pedido explícito do dono do projeto em 15/11; está desenhada em `docs/07` (T1) |
| 4 | Corrigir a **dosimetria**: 0,42 mSv não é dose acumulada de 45 dias | Na ISS a dose típica é de cerca de 0,28 a 0,56 mSv por dia (50 a 100 mSv em 6 meses, frente 1). 0,42 mSv é a dose de **um dia**; em 45 dias o acumulado fica perto de 19 mSv |
| 5 | Mapear o **laranja** para o nosso nível 3 e manter as regras de alarme da NASA: nada pisca, nada toca som, rótulos com "Saúde:" | Vermelho, piscar e som pertencem ao sistema de Caution and Warning da ISS (frente 7, NASA-STD-3001 Vol 2 Rev F) |
| 6 | Usar as **escalas validadas** já escolhidas: fadiga de 1 a 7 (Samn-Perelli), humor de 1 a 5 | São as escalas do `indicadores.json` e do índice de prontidão (`docs/04`, A12); a de 0 a 10 não tem validação nem fonte (frente 8) |
| 7 | **Hemograma** com estados reais: coleta agendada, amostra coletada, resultado disponível | Sangue em órbita é congelado e analisado na Terra; o resultado chega depois (frente 2, `docs/06`, campo `disponibilidade`) |
| 8 | Acrescentar os **testes rápidos** de visão (Amsler e acuidade de perto) e de reação (PVT de 3 minutos) | São a forma de o astronauta acompanhar SANS e fadiga sozinho; o PVT é o paradigma do teste usado na ISS (frentes 3 e 8, regras R-SANS-01 e R-SONO-01) |

**Uma decisão para a equipe:** a missão de demonstração se chama **MARS-01**, mas todos os dados reais que temos (telemetria, módulos, radiação, passagens pela Anomalia do Atlântico Sul) são da **ISS**. Recomendamos chamar a missão de demonstração de **ISS EXP-01** e mostrar Marte no slide "Pensado para Marte" (`docs/16`). Se a equipe preferir manter MARS-01, a dose diária passa para cerca de 1,8 mSv por dia (trânsito) e o painel de ambiente deixa de citar módulos da ISS.

---

## 2. Análise seção por seção

Legenda: ✅ manter · 🔧 ajustar · ➕ acrescentar.

### Seção 1. Identidade visual

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Nome ORBITA e subtítulo | ✅ | O app passa a se chamar ORBITA e o óculos continua Orbit; os documentos usam "ORBITA" a partir daqui |
| Paleta azul-marinho e ciano | ✅ | Coerente com o tema escuro de `docs/07` (pouca luz antes de dormir). O ciano `#21C5EF` vira a cor de destaque |
| Cores de estado (verde, amarelo, laranja, vermelho) | 🔧 | Acrescentar os valores exatos e o cinza. Laranja = nível 3 (CMO e médico de voo), vermelho = nível 4 (só por sintoma de alarme). Tokens em `docs/18` |
| Interface escura, cartões, ciano com moderação | ✅ | Igual ao design de `docs/07` |
| Animações suaves | 🔧 | Permitidas na navegação e na abertura; **proibidas em alertas** (nada pisca, frente 7). Respeitar a preferência do sistema por menos movimento |
| Somente smartphone de 6 a 6,8 polegadas | 🔧 | Manter mobile como principal, mas o layout deve funcionar em tablet: a tripulação da ISS usa iPads e laptops, não celulares (frente 7) |

### Seção 2. Cadastro

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Nome, sexo, peso, altura, observações | ✅ | Sexo também escolhe a faixa de referência de hemoglobina, que é diferente por sexo (frente 9) |
| Observações pessoais (condições preexistentes) | 🔧 | É dado médico sensível: guardar só no aparelho, marcar como privado e nunca mostrar na tela Tripulação (NASA-STD-3001 Vol 1, V1 7003) |
| Dados da missão | ➕ | Acrescentar nome da missão e data de início (o app calcula o dia de missão, FD) e horário de sono programado em GMT (referência da ISS: 21h30 a 06h00) |
| Compartilhamento com a tripulação | ➕ | Uma pergunta simples: o que os colegas podem ver (estado por sistema; valores; humor). Padrão conservador, demonstração com tudo compartilhado (`docs/07`, T1) |
| "Peso" | 🔧 | Escrever "massa corporal (kg)"; no espaço se mede massa, não peso (frente 5) |

### Seção 3. Animação de inicialização

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Círculo ciano percorrendo a órbita do ícone, dissolução e transição | ✅ | Ótima para a identidade |
| Duração | 🔧 | No máximo 2,5 s, com toque para pular; depois do primeiro acesso, versão de 1 s |
| Arquivo do ícone | ➕ | O ícone oficial precisa estar no repositório em SVG (`prototipo/marca/orbita-icone.svg`) para a animação seguir a geometria real; ainda não foi enviado |

### Seção 4. Dashboard

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Cabeçalho com astronauta, missão e dia | ✅ | Acrescentar horário GMT (horário oficial da ISS) e o selo "dados simulados" |
| Frequência cardíaca comparada ao padrão individual | ✅ | É exatamente o z-score da linha de base (`docs/04`, A3). Com 86 bpm e linha de base de 64 bpm, o cartão fica amarelo por desvio pessoal, mesmo estando dentro da referência terrestre de 60 a 100 bpm. **É a melhor demonstração do conceito** |
| Dosimetria | 🔧 | Mostrar taxa do dia e acumulado da missão contra o limite de carreira de 600 mSv (NASA-STD-3001 Vol 1, V1 4030). Corrigir o valor (ver resumo, item 4) |
| Oximetria | ✅ | Referência terrestre de 95 a 100%, com o rótulo "referência terrestre, não limite de voo"; em ou abaixo de 92% chama o CMO (`indicadores.json`) |
| Atenção ocular (EOG) | 🔧 | Correto não chamar de diagnóstico. Indicar a origem: **óculos Orbit (proposto)**, dado simulado. Cor só por desvio da linha de base, nunca por limiar. **EOG não detecta SANS** (frente 4) |
| Ambiente do módulo | ➕ | Cartão compacto com CO2 (mmHg), O2 e pressão, e clima espacial (prótons do GOES). Dado real gravado disponível (`prototipo/dados/amostras-reais/`) |
| Avaliação pessoal diária (hidratação, fadiga, apetite) | 🔧 | Manter e acrescentar **sono (horas)** e **humor**. Fadiga de 1 a 7, humor de 1 a 5. Hidratação em litros na tela, mililitros nos dados |
| Sinais vitais manuais | ➕ | Pressão arterial, glicose e temperatura como registro opcional ("quando medir com o kit"), porque são exemplos do desafio oficial |
| Hemograma a cada 15 dias | 🔧 | Ver resumo, item 7. Periodicidade configurável (padrão 15 dias); a faixa de referência vem do laudo do laboratório; nunca vermelho automático |
| Registros persistentes, mais recente primeiro | ✅ | Igual ao modelo de dados (`docs/06`) |

### Seção 5. Mapa corporal 3D

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Modelo por sexo, tecnológico, com regiões clicáveis | ✅ | Coração da proposta, pedido no próprio desafio |
| 10 regiões | 🔧 | Acrescentar **rins e hidratação** (cálculo renal, ligado à perda óssea) e **ouvidos** (ruído da estação). Manter vestibular, que nós não tínhamos e é bom. Lista final de 12 regiões em `docs/18` |
| Painel com riscos, explicação e indicadores | 🔧 | Mostrar também o **estado atual** de cada indicador relacionado (a região assume a cor do pior indicador dela, `docs/07`) e o link do risco no Human Research Program |
| Modelo 3D com Three.js | 🔧 | Arriscado no prazo de hoje. Começar com figura em SVG de alta qualidade (frente e costas, brilho ciano) e trocar por 3D só se sobrar tempo, como o próprio prompt permite |
| "Educativo, não detecta tudo" | ✅ | Coerente com a pesquisa |

### Seção 6. Código de cores

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Verde, amarelo, laranja, vermelho, cinza com texto e ícone | ✅ | Mapeamento: cinza = nível 0, verde = 1, amarelo = 2, laranja = 3, vermelho = 4 |
| Critérios configuráveis, não apresentar como limites da NASA sem referência | ✅ | É a política de classes do `docs/03` (requisito oficial, referência terrestre, linha de base, sintoma) |
| Vermelho "crítico" | 🔧 | Só por sintoma de alarme ou requisito oficial excedido; nunca por um número isolado de sinal vital. Rótulos com "Saúde:" para não parecer o alarme da estação |

### Seção 7. Menu lateral

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Drawer aberto pelo ícone ORBITA | 🔧 | Manter, mas acrescentar um ícone de menu visível ao lado do logo (descobrível) e uma barra inferior com 4 atalhos (Início, Mapa, Avaliar, IA) |
| Itens do menu | ➕ | Acrescentar **Tripulação** e **Sono e óculos Orbit**; Notificações fica no sino do cabeçalho |
| Status de conectividade | ✅ | Mostrar "Offline: funcionando localmente" e "Comunicação com o solo" (ver `docs/12`, fluxo estação e solo) |

### Seção 8. ORBITA IA offline

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Assistente local, sem chave de API, sem diagnóstico, com fontes | ✅ | É o que a frente 13 recomenda. O precedente da NASA (assistente do CMO, 2025) roda na nuvem; o ORBITA offline é diferencial |
| Base de conhecimento | ➕ | Usar o conteúdo já pesquisado: `docs/01`, `docs/03`, `docs/14` e as orientações da frente 10. A base pronta para o protótipo está em `prototipo/config/orbita-ia-base.json` |
| "Como está minha saúde hoje?" | 🔧 | A resposta lê os estados atuais do motor e cita a regra e a fonte; nunca inventa |

### Seção 9. Relatórios

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Gráficos de 8 indicadores, períodos 7, 15, 30 dias e missão, tabela | ✅ | Igual à T7 de `docs/07` |
| Faixas no gráfico | ➕ | Mostrar a faixa da linha de base pessoal e, quando houver, a faixa com fonte; marcar eventos (por exemplo evento solar) |
| Recharts | ✅ | Substitui o ECharts sugerido antes; sem problema |

### Seção 10. Rotina da missão

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Tarefas diárias e periódicas, progresso | ✅ | Coerente com o check-in de `docs/07` (T3) |
| Horários | 🔧 | Em GMT, respeitando a rotina da ISS (acordar por volta de 06h00, dormir por volta de 21h30); sem lembretes no período de sono nem em atividades críticas (frente 4) |
| Tarefas | ➕ | Acrescentar teste de visão semanal e PVT; hemograma com estado de coleta |

### Seção 11. Gamificação

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| XP, níveis, conquistas, sequências; pontos por ação e nunca por resultado | ✅ | Excelente e alinhado a `docs/07` |
| Metas da tripulação | ➕ | Uma meta cooperativa (por exemplo, toda a tripulação registrou hidratação hoje), sem ranking entre colegas |
| Ligação com o óculos | ➕ | Conquistas liberam sons do perfil cultural no óculos Orbit |

### Seção 12. Riscos espaciais

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| 5 perigos e riscos específicos com links da NASA | ✅ | Igual a `docs/01`. As URLs da seção 15 são páginas oficiais do Human Research Program |
| Relacionar à região do corpo | ✅ | Usar a tabela de regiões de `docs/18` |

### Seção 13. Notificações

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Avisos com cor e destino | ✅ | |
| Som e vibração | 🔧 | Nenhum som e nenhum piscar para alerta de saúde (frente 7); lembretes de rotina em cinza ou ciano, não nas cores de estado |
| Alerta explicável | ➕ | Tocar num alerta abre o detalhe: por que, o que fazer, fonte da regra (`docs/07`, T4) |

### Seção 14. Dados de demonstração

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Perfil fictício, linha de base, botão "Restaurar dados iniciais" | ✅ | Ótimo para os jurados |
| Valores | 🔧 | Ver a tabela da seção 4 deste documento |
| História da demonstração | ➕ | Ligar os dados a um cenário: frequência cardíaca acima do padrão, fadiga alta e sono curto, com CO2 do módulo em 2,95 mmHg. O app mostra o alerta "Possível efeito de CO2 elevado" (cenário C1 de `docs/05`) |

### Seção 15. Fontes oficiais

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Links do Human Research Program | ✅ | |
| Normas de limiares | ➕ | Acrescentar NASA-STD-3001 Vol 1 e Vol 2 e o brief de SANS (OCHMO), que são a fonte dos números (`docs/03`, `docs/15`) |

### Seções 16 a 19. Regras, navegação, técnica e resultado

| Item | Avaliação | Ajuste e base |
| --- | --- | --- |
| Diferenciar simulado, manual, equipamento e exame | ✅ | Igual à regra 11 do `AGENTS.md` (campo `origem`) |
| Armazenamento local, nada decorativo, sem conexão fingida | ✅ | |
| React, TypeScript, Tailwind, Lucide, Recharts | ✅ | Igual à stack de `docs/05` |
| Three.js | 🔧 | Opcional; ver seção 5 |
| Prazo | 🔧 | O envio fecha hoje às 23h59. A ordem de construção recomendada está no `docs/19` |

---

## 3. As duas jornadas conectadas

Cada funcionalidade do prompt, ligada ao que a pesquisa entrega.

| Funcionalidade do ORBITA | Documento | Dado (`indicadorId`) | Regra de cor | Fonte do número |
| --- | --- | --- | --- | --- |
| Frequência cardíaca | `docs/03`, `docs/04` A3 | `fc_repouso` | Linha de base (z-score) e referência terrestre | MedlinePlus [DIRETRIZ-TERRA] |
| Dosimetria | `docs/03`, `docs/14` | `taxa_dose_radiacao`, `dose_acumulada` | Requisito oficial (carreira menor que 600 mSv) | NASA-STD-3001 Vol 1, V1 4030 |
| Oximetria | `docs/03` | `spo2` | Referência terrestre; 92% chama o CMO | MedlinePlus [DIRETRIZ-TERRA] |
| Atenção ocular (EOG) | `docs/09`, frente 14 | `eog_piscadas` (novo) | Só linha de base | Experimental, sem limiar |
| Ambiente do módulo | `docs/02`, `docs/12` | `ppco2_modulo`, `pio2_cabine`, `pressao_cabine`, `fluxo_protons_goes` | Requisito oficial | NASA-STD-3001 Vol 2 Rev F; NOAA |
| Hidratação | `docs/04` R-HID-01 | `agua_ingerida` | Linha de base; valor de demonstração 1,2 L | [INFERÊNCIA] marcada |
| Fadiga | `docs/03`, frente 8 | `fadiga` (1 a 7) | Linha de base | Samn-Perelli |
| Apetite | frente 8, frente 10 | `apetite` (novo) | Linha de base | Sem limiar |
| Sono | `docs/04` A8 | `sono_tst` | Linha de base; 8,5 h programadas | NASA-STD-3001 Vol 1 |
| Humor | `docs/03` | `humor` (1 a 5) | Linha de base | Autoral |
| Pressão, glicose, temperatura | `docs/03` | `pa_sistolica`, `pa_diastolica`, `glicose`, `temperatura_corporal` | Referência terrestre | MedlinePlus, ADA [DIRETRIZ-TERRA] |
| Hemograma | `docs/02` seção 4.5 | `hemoglobina` e demais do laudo | Faixa de referência do próprio laudo; nunca vermelho automático | Laboratório |
| Testes de visão | `docs/04` R-SANS-01 | `acuidade_perto`, `amsler_distorcao` | Dois testes piores em até 14 dias | OCHMO-MTB-001 |
| PVT | `docs/04` A10 | `pvt_tempo_reacao`, `pvt_lapsos` | Linha de base | Frente 8 |
| Mapa corporal | `docs/07` T2, `docs/01` | Todos, por `regiaoCorpo` | Pior estado da região | `docs/03` |
| ORBITA IA | `docs/14`, frente 10, frente 13 | Estados do motor | Não decide cor | Base local com fontes |
| Tripulação | `docs/07` T1 | Estados com consentimento | Igual aos cartões | `docs/06` (compartilhamento) |
| Sono e óculos Orbit | `docs/09`, frentes 14 e 15 | `SessaoSono` | Linha de base | Sleep-EDF (demonstração) |

Os dois indicadores novos (`apetite` e `eog_piscadas`) entram no `docs/03` e no `indicadores.json` como linha de base, sem limiar numérico, seguindo a regra 1 do `AGENTS.md`.

---

## 4. Valores de demonstração revisados

| Dado | Prompt original | Revisado | Por quê |
| --- | --- | --- | --- |
| Missão | MARS-01, dia 45 | ISS EXP-01, dia 45 (recomendado) | Coerência com os dados reais da ISS |
| Frequência cardíaca | 86 bpm, linha de base 64 | Igual | Demonstra o desvio pessoal (amarelo) |
| Dosimetria | 0,42 mSv | 0,42 mSv/dia hoje; 18,9 mSv acumulados; 3,2% do limite de carreira | 0,42 mSv é dose diária típica da ISS |
| Oximetria | 97% | Igual | Verde |
| EOG | 12,4 por minuto | Igual, rotulado "óculos Orbit, simulado" | |
| Hidratação | 1,8 L | Igual | Verde |
| Fadiga | 8/10, linha de base 2/10 | 6 de 7, linha de base 2 de 7 | Escala Samn-Perelli |
| Apetite | Reduzido | Igual | |
| Sono | Linha de base 7,5 h | Última noite 5,4 h, linha de base 7,5 h | Mostra dívida de sono (amarelo) |
| Humor | Linha de base 8/10 | 3 de 5, linha de base 4 de 5 | Escala do `indicadores.json` |
| CO2 do módulo | Ausente | 2,95 mmHg no Node 3 | Dispara R-CO2-01 com a frequência cardíaca e a fadiga |
| Hemograma | Há 7 dias | Coleta há 7 dias, "amostra coletada, análise na Terra"; resultado anterior de 14,8 g/dL de hemoglobina | Estados reais |

Com esses valores, a tela inicial mostra três amarelos (frequência cardíaca, fadiga, sono), um alerta explicável de CO2 e todo o resto verde. É uma história clara para os jurados.

---

## 5. Inventário de telas

Códigos usados no `docs/18`, nos desenhos e no `docs/19`.

| Código | Tela | Origem | Prioridade hoje |
| --- | --- | --- | --- |
| M01 | Cadastro | Prompt seção 2, ajustada | P0 |
| M02 | Inicialização orbital | Prompt seção 3 | P0 |
| M03 | Visão geral (dashboard) | Prompt seção 4, ajustada | P0 |
| M04 | Avaliação de saúde (diária, sinais vitais, testes) | Prompt seção 4B, ampliada | P0 |
| M05 | Mapa corporal | Prompt seção 5 | P0 |
| M06 | Painel da região (folha inferior) | Prompt seção 5 | P0 |
| M07 | Detalhe do indicador e do alerta | `docs/07` T4 | P0 |
| M08 | Exames laboratoriais (hemograma) | Prompt seção 4B, ajustada | P1 |
| M09 | ORBITA IA | Prompt seção 8 | P1 |
| M10 | Relatórios | Prompt seção 9 | P1 |
| M11 | Rotina da missão | Prompt seção 10 | P1 |
| M12 | Missão: Saúde em Dia (gamificação) | Prompt seção 11 | P2 |
| M13 | Riscos espaciais | Prompt seção 12 | P1 |
| M14 | Notificações | Prompt seção 13 | P1 |
| M15 | Perfil e privacidade | Prompt seção 7, item 9 | P1 |
| M16 | Tripulação (monitor geral) | Pedido do dono, `docs/07` T1 | P1 |
| M17 | Sono e óculos Orbit | `docs/07` T6, `docs/09` | P2 |
| M18 | Menu lateral | Prompt seção 7 | P0 |

---

## 6. Decisões para a equipe

| Decisão | Recomendação |
| --- | --- |
| Nome da missão de demonstração | ISS EXP-01 (dados reais coerentes); Marte no slide |
| Mapa corporal 3D ou SVG | SVG de alta qualidade primeiro; 3D se sobrar tempo |
| Mobile apenas ou também tablet | Mobile primeiro, responsivo até tablet |
| Arquivo do ícone ORBITA | Enviar o SVG oficial ao repositório (`prototipo/marca/`) antes de começar a animação |
