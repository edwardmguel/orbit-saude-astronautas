---
kind: spec
title: "Brief do épico: Orbit, saúde do astronauta"
comments: none
---

# Brief do épico

## Problema

Missões longas expõem a tripulação aos cinco perigos que o Human Research Program da NASA resume como RIDGE: radiação, isolamento e confinamento, distância da Terra, campos de gravidade alterados e ambiente fechado e hostil. Os efeitos (perda óssea e muscular, alterações cardiovasculares e imunológicas, SANS, sono ruim, problemas de humor) aparecem devagar e, quanto mais longe da Terra, mais a própria tripulação precisa percebê-los e agir sem depender do médico de voo em solo. Em Marte, a comunicação tem minutos de atraso por trecho e períodos sem contato.

## O que vamos entregar

| # | Entregável | Dono | Prazo |
| --- | --- | --- | --- |
| 1 | Passo 0: pesquisa validada em fontes oficiais, documentação didática para a equipe e para a IA de desenvolvimento, desenho do software | Coordenação (este épico) | Manhã de 15/11/2026 |
| 2 | Protótipo funcional do software de saúde (principal) | Equipe de desenvolvimento | 20 horas a partir do kickoff |
| 3 | Óculos Orbit: condução óssea + EEG + EOG (secundário) | Dono do projeto | Em paralelo ao protótipo |

## O software, em uma frase

Um painel offline que junta dados do corpo (sensores, vestíveis, exames, autoavaliações por texto, cliques e câmera) com dados do ambiente da estação (CO2, O2, pressão, ruído, radiação, clima espacial), compara cada astronauta com a própria linha de base, mostra o estado com código de cores numa figura humana clicável e diz o que fazer: ação da própria tripulação, ou acionar o médico de voo.

## Escopo

**Dentro:** catálogo de equipamentos reais da ISS com o que medem, como entregam o dado e em qual unidade; tabela de indicadores com faixas verde, amarelo e vermelho com fonte; regras de cruzamento de dados explicadas passo a passo; arquitetura offline; modelo de dados; design de telas; plano de 20 horas; orçamento de massa, computação e custo de lançamento; precedentes na NASA e em outras agências.

**Fora do Passo 0:** escrever o código do protótipo (é da equipe); firmware e eletrônica do óculos (é do dono, com base no orçamento de massa documentado); validação clínica real.

## Decisões tomadas

| Quando | Decisão |
| --- | --- |
| 15/11 01h30 | Pesquisa dividida em 6 frentes, cada uma com um agente GPT-6 Luna em esforço máximo, escrevendo em arquivo próprio em `pesquisa/bruto/`. Ver [Frentes de pesquisa](../frentes-de-pesquisa). |
| 15/11 01h30 | O software é offline-first: tudo roda num computador dentro da estação. Fontes públicas ao vivo (telemetria pública da ISS, clima espacial da NOAA) entram só como modo de demonstração do protótipo, nunca como dependência. |
| 15/11 01h30 | Limiar de alerta só entra na configuração com fonte citada (NASA-STD-3001, Human Research Roadmap, OCHMO ou diretriz clínica terrestre marcada como tal). |
| 15/11 01h50 | Repositório [edwardmguel/orbit-saude-astronautas](https://github.com/edwardmguel/orbit-saude-astronautas) criado como privado; o dono decide se abre ou adiciona a equipe como colaboradora. |

| 15/11 02h12 | A tela inicial vira o **Monitor geral da tripulação** (cartões e matriz, tela cheia para monitor compartilhado), com níveis de compartilhamento escolhidos por cada tripulante. Dono: *"os astronautas que podem monitorar uns aos outros nessa tela geral"*. Ver [Design da interface](../design-da-interface). |
| 15/11 08h38 | Artefatos desta story exportados para a pasta `Traycer/` do repositório, com README de importação, para o dono continuar em outro computador. Dono: *"se em algum momento eu pedir para você importar para outro computador o outro agente já deve saber o que eu estou falando"*. Só esta story foi exportada; o épico também guarda o projeto Sementes Nativas. |
| 15/11 08h38 | Plano de 20 horas ganhou uma versão comprimida (cerca de 15 horas), porque o envio fecha hoje às 23h59. Ver [Plano do protótipo](../plano-prototipo-20h). |
| 15/11 02h45 | **Prazo do desafio descoberto pela frente 7:** Space Apps 2026, "Create Health Monitoring Software for Astronauts on Space Missions"; envio fecha **hoje, 15/11, às 23h59 no horário do evento local**. Termos pedem licença aberta (Apache 2.0 por padrão). Registrado em `docs/08`, seção 0. |
| 15/11 02h45 | Design alinhado às convenções da NASA (frente 7): estados com prefixo "Saúde:", nada pisca nem toca som (são do Caution and Warning da ISS), vermelho só como contorno; Monitor geral com consentimento granular por audiência e "Oferecer apoio"; tripulantes da demo compartilham tudo, então a tela que o dono pediu continua completa na apresentação. |
| 15/11 02h25 | Limite de **3 agentes Luna simultâneos** para poupar a cota do Codex (33% da janela de 5 h usada às 02h25, reinício às 06h29). Os 6 em execução terminam normalmente; nenhuma frente nova abre até restarem menos de 3. Dono: *"mantenha apenas 3 lunas por vez a partir dos próximos que forem encerrando"*. |
| 15/11 02h05 | Cada entrega dos agentes Luna passa por revisão do coordenador; erros voltam ao agente para correção; aprovação libera a vaga para a próxima frente, mantendo 6 agentes simultâneos. Dono: *"Mantenha os 6 agentes simultâneos por vez."* |

## Decisões em aberto (para o kickoff com a equipe)

| Decisão | O que trava | Recomendação |
| --- | --- | --- |
| Licença e visibilidade do repositório no envio | Envio ao Space Apps | Escolher licença aberta (Apache 2.0 é o padrão dos termos) e tornar público o que for enviado; decisão do dono |
| Stack do protótipo | Início do código | React + Vite + TypeScript, rodando no navegador, sem servidor obrigatório. Detalhe em `docs/05-software-architecture.md`. |
| Estilo visual e cores | Telas finais | Tema escuro com modo noturno âmbar (pouca luz azul antes de dormir) e status em verde, amarelo e vermelho sempre acompanhados de ícone e texto. Ver [Design da interface](../design-da-interface). |
| Quantas pessoas desenvolvem | Cronograma de 20 h | O plano assume 3 pessoas no software e o dono no óculos. Ver [Plano de 20 horas](../plano-prototipo-20h). |
