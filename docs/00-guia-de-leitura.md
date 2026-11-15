# 00. Guia de leitura

> Ninguém precisa ler tudo. Escolha o seu perfil e siga a ordem. Tempo estimado entre parênteses.

## Todo mundo (40 minutos, antes do kickoff)

1. [`../README.md`](../README.md): o que é o projeto e como o repositório está organizado (3 min).
2. [`01-contexto-missao.md`](01-contexto-missao.md): a ISS, a rotina da tripulação, os 5 perigos (RIDGE) e o que acontece com o corpo no espaço (15 min).
3. [`07-design-interface.md`](07-design-interface.md) e os wireframes em [`wireframes/telas-prototipo.html`](wireframes/telas-prototipo.html) (abrir no navegador) (10 min).
4. [`08-plano-prototipo-20h.md`](08-plano-prototipo-20h.md): quem faz o quê e quando (7 min).
5. [`14-perguntas-respondidas.md`](14-perguntas-respondidas.md): as respostas às dúvidas que o time levantou (5 min).

## Por perfil, depois do kickoff

| Perfil | Leia nesta ordem | Para quê |
| --- | --- | --- |
| **Dev de interface** (Dev A) | `07` → `05` (seções 1 e 3) → `06` (tipos que a tela recebe) → `03` (só a tabela mestra, para os textos de explicação) | Montar telas e componentes |
| **Dev de dados e entrada** (Dev B) | `06` → `02` → `12` → `03` (faixas para o simulador) → `05` (seção 3.3, cenários) | Gerador simulado, check-in, testes rápidos |
| **Dev do motor e ML** (Dev C) | `03` → `04` → `06` → `05` (seções 2 e 4) | Regras, linha de base, cruzamentos, alertas |
| **Dono do projeto (óculos)** | `09` → `10` → `11` → `pesquisa/bruto/04` e `05` | Óculos Orbit, massa, energia, pitch |
| **Quem apresenta** | `08` (seção 0 e 6) → `01` → `11` → `10` → `16` → `14` | Prazo, narrativa, precedentes, números de viabilidade e slides finais |
| **Quem executa o código no Lovable** | `17` → `18` (com os desenhos em `wireframes/orbita-responsivo.html`) → `19` (o prompt para colar) | Construir o ORBITA já conectado à pesquisa |
| **IA de desenvolvimento** | [`../AGENTS.md`](../AGENTS.md) primeiro, depois o documento da tarefa | Regras de domínio e convenções |

## Mapa dos documentos

| # | Documento | Pergunta que responde |
| --- | --- | --- |
| 00 | Guia de leitura | Por onde começo? |
| 01 | [Contexto da missão](01-contexto-missao.md) | O que acontece com o corpo no espaço e por quê? |
| 02 | [Equipamentos e dados](02-equipamentos-e-dados.md) | Que equipamentos existem na ISS, o que medem, como entregam o dado e em que unidade? |
| 03 | [Indicadores e limiares](03-indicadores-e-limiares.md) | Quando um valor é verde, amarelo ou vermelho, segundo quem? |
| 04 | [Cruzamento de dados](04-cruzamento-de-dados.md) | Como calcular cada indicador e como combinar dados de fontes diferentes? |
| 05 | [Arquitetura do software](05-arquitetura-software.md) | Como o sistema é montado, na NASA e no protótipo? |
| 06 | [Modelo de dados](06-modelo-de-dados.md) | Quais entidades, campos e unidades? |
| 07 | [Design da interface](07-design-interface.md) | Quais telas, cores e componentes? |
| 08 | [Plano de 20 horas](08-plano-prototipo-20h.md) | Quem faz o quê e quando? |
| 09 | [Óculos Orbit](09-oculos-orbit.md) | Como é o óculos e que dados ele entrega ao software? |
| 10 | [Massa, energia e lançamento](10-massa-energia-lancamento.md) | Quanto pesa, quanto consome, quanto custa levar ao espaço? |
| 11 | [Precedentes](11-precedentes.md) | A NASA já faz algo parecido? Onde está o nosso diferencial? |
| 12 | [Fontes de dados abertas](12-fontes-de-dados-abertas.md) | Que dados reais da NASA e da NOAA o protótipo pode usar? |
| 13 | [Glossário](13-glossario.md) | O que significa cada sigla? |
| 14 | [Perguntas respondidas](14-perguntas-respondidas.md) | Respostas às dúvidas do documento inicial |
| 15 | [Referências](15-referencias.md) | Lista de fontes oficiais usadas |
| 16 | [Próximos passos e impacto](16-proximos-passos-e-impacto.md) | O que muda para Lua e Marte, como chegar à ISS e para que serve na Terra? (base dos slides finais) |
| 17 | [Revisão do prompt ORBITA](17-revisao-prompt-orbita.md) | O que o prompt da equipe para o Lovable acerta e o que precisa mudar para bater com a pesquisa? |
| 18 | [Design do ORBITA responsivo](18-design-orbita-responsivo.md) e [desenhos das telas](wireframes/orbita-responsivo.html) | Como é cada tela do ORBITA no celular, no laptop e na tela grande? |
| 19 | [Prompt do Lovable revisado](19-prompt-lovable-revisado.md) | Qual prompt colar no Lovable para construir o app já alinhado à pesquisa? |

## Como ler as etiquetas de fonte

A pesquisa marca cada afirmação com o nível de confiança:

| Etiqueta | Significa |
| --- | --- |
| [OFICIAL] | Documento da NASA ou de outra agência espacial |
| [PAPER] | Artigo científico revisado por pares |
| [FABRICANTE] | Página ou datasheet do fabricante |
| [DIRETRIZ-TERRA] | Diretriz clínica usada na Terra, quando a NASA não define um valor próprio |
| [TESTADO] | A equipe de pesquisa abriu o endpoint e confirmou o formato |
| [SECUNDÁRIA] | Imprensa ou outra fonte indireta |
| [INFERÊNCIA] | Dedução da pesquisa, com o raciocínio explicado |
