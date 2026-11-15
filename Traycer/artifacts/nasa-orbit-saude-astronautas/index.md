---
title: "NASA: Orbit, monitoramento de saúde de astronautas"
kind: story
status: 2
assignee: ""
comments: none
---

# NASA: Orbit, monitoramento de saúde de astronautas

Equipe Fundação Futuro. Passo 0 (pesquisa, documentação e desenho) para o protótipo de 20 horas do software de saúde e para o óculos Orbit (condução óssea + EEG + EOG). Desafio: **"Create Health Monitoring Software for Astronauts on Space Missions"**, NASA International Space Apps Challenge 2026. Documento de origem: [Google Docs "Fundação Futuro"](https://docs.google.com/document/d/1S_IkPR_NH6MWLGBoEADfagqL3BzmjUt7LvfQqnna3tI/edit), copiado em `pesquisa/documento-inicial.md`.

Repositório: [github.com/edwardmguel/orbit-saude-astronautas](https://github.com/edwardmguel/orbit-saude-astronautas) (privado). Cópia local em `C:\Users\ingri\Documents\github\NASA`.

## Resultado do Passo 0 (15/11, 05h50)

| Entrega | Estado |
| --- | --- |
| 19 frentes de pesquisa (agentes GPT-6 Luna), revisadas uma a uma, 4 devolvidas e corrigidas (frentes 3, 5, 9 e 12) | ✅ `pesquisa/bruto/01` a `19` |
| 17 documentos consolidados e didáticos, de `docs/00` a `docs/16` | ✅ |
| Configuração do motor: 35 indicadores e 6 regras com regra de cor numérica e fonte | ✅ `prototipo/config/indicadores.json` |
| Perfis de simulação: 7 tripulantes fictícios, roteiro de 180 dias, cenários C1 a C5 | ✅ `prototipo/config/perfis-simulacao.rascunho.json` |
| Amostras reais gravadas: 3 h de telemetria pública da ISS, NOAA e DONKI | ✅ `prototipo/dados/amostras-reais/` |
| Wireframes de 7 telas, com o Monitor geral pedido pelo dono | ✅ `docs/wireframes/telas-prototipo.html` |
| Contexto para a IA de desenvolvimento | ✅ `AGENTS.md` |
| Cópia desta EPIC no repositório, com instruções de importação | ✅ `Traycer/` (15/11, 08h40) |
| Plano comprimido para caber no prazo de hoje (cerca de 14 horas mais o envio) | ✅ `docs/08`, seção 0.1 |

## O que o dono precisa decidir ao acordar

| Decisão | Por quê | Onde |
| --- | --- | --- |
| **Dar acesso à equipe** (bloqueia a passagem de bastão) | O repositório é privado e o único colaborador é o dono; sem convite, a equipe não abre nada | GitHub: Settings, Collaborators, ou `gh api -X PUT repos/edwardmguel/orbit-saude-astronautas/collaborators/<usuario>` |
| **Prazo:** confirmar o horário de fechamento do evento local | A página oficial diz que o envio fecha hoje, 15/11, às 23h59 no horário do evento local | `docs/08`, seção 0 |
| Licença aberta e repositório público no envio | Termos do Space Apps pedem licença aberta (Apache 2.0 é o padrão) | [Brief](brief) |
| Redistribuição das amostras reais da ISS | Licença do conteúdo não encontrada | `pesquisa/bruto/11` |
| Critérios de julgamento e regra de uso de IA | Página global fora do ar durante a pesquisa | `docs/08`, seção 0 |
| Kickoff com a equipe: perguntas K1 a K8 de design | O layout final é desenhado com a equipe | [Design da interface](design-da-interface) |

## Artefatos

| Artefato | O que tem |
| --- | --- |
| [Brief do épico](brief) | Problema, escopo, entregáveis, decisões tomadas e em aberto |
| [Frentes de pesquisa](frentes-de-pesquisa) | Roteiro das 19 frentes, revisões, achados, lacunas encontradas no caminho, consolidação e cota do Codex |
| [Fontes de dados do software](fontes-de-dados) | As 33 fontes de dados (a bordo, públicas, terrestres e do projeto), item por item: o que ajudam a indicar e como o software as usa |
| [Arquitetura do software](arquitetura) | Offline-first, módulos, fluxo de dados, onde entra o ML |
| [Design da interface](design-da-interface) | Telas, Monitor geral, wireframes, cores alinhadas às convenções da NASA, perguntas de kickoff |
| [Plano do protótipo de 20 horas](plano-prototipo-20h) | Escopo do MVP, cronograma por pessoa, critérios de pronto |

## Regras desta frente

- Tudo que for fato (equipamento, unidade, limiar, data) tem fonte oficial citada no repositório. Limiar sem fonte não entra na configuração de alertas.
- Uma informação, um lugar: o texto completo vive no repositório (`docs/` e `pesquisa/`); a EPIC resume e aponta.
- Sem travessão, meia-risca ou hífen solto em nenhum texto.
