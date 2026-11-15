---
kind: spec
title: "Plano do protótipo de 20 horas"
comments: none
---

# Plano do protótipo de 20 horas

Texto completo, com cronograma em Gantt e roteiro da apresentação: `docs/08-plano-prototipo-20h.md` no repositório. Premissa: 3 pessoas no software (Dev A interface, Dev B dados e entrada, Dev C motor e ML) e o dono no óculos.

## Prazo real: versão comprimida

O envio do Space Apps fecha hoje, 15/11, às 23h59 no horário do evento local. Às 08h40 restavam cerca de 15 horas e 20 minutos: um kickoff até as 9h deixa cerca de 14 horas de trabalho mais 1 hora de envio, menos que as 20 horas do plano. Nesse caso vale a versão comprimida de `docs/08`, seção 0.1:

| Hora desde o kickoff | Marco |
| --- | --- |
| 0h45 | Kickoff fechado (K1 a K8 em no máximo 20 minutos) |
| 5h30 | T1 Monitor geral com cores da `regraCor` |
| 9h | Cenário C1 de ponta a ponta (T1, T2, T4); escopo congelado |
| 11h | T3 com PVT e T5 com prótons da NOAA gravados |
| 12h | Só correção; vídeo e página do projeto |
| 13h | Envio, com pelo menos 1 hora de folga (kickoff às 9h significa envio às 22h) |

Saem do escopo comprimido: T1b, T6 (mostrado como wireframe), gamificação, Amsler interativo, modo ao vivo, anomalia multivariada, T7.

## Escopo por prioridade

| Prioridade | Itens |
| --- | --- |
| P0, sem isso não há demo | Esqueleto e tema; modelo de dados e gerador simulado com 4 tripulantes e o cenário C1; motor de regras lendo `config/indicadores.json`; T1 Painel; T2 Meu corpo; T4 Detalhe do alerta; linha de base e z-score |
| P1, deixa a demo forte | T3 Check-in; teste de reação PVT; T5 Ambiente; cenários C2 e C3; regras R-CO2-01, R-RAD-01, R-SANS-01; T6 Sono e Orbit |
| P2, se sobrar tempo | Modo ao vivo (NOAA, telemetria pública da ISS); Amsler interativo e foto; gamificação; anomalia multivariada; T7 Tendências; seletor de perfil |
| Fora | Backend, login, banco remoto, app nativo, firmware do óculos |

## Pontos de controle

| Hora | Marco | Critério |
| --- | --- | --- |
| 1h | Fim do kickoff | Stack e K1 a K8 decididos |
| 8h | Integração 1 | Painel com 4 tripulantes e cores vindas do motor |
| 14h | Integração 2 | C1 de ponta a ponta; escopo congelado |
| 18h | Ensaio | Só correção daqui em diante |
| 20h | Apresentação | Roteiro de 7 minutos ensaiado duas vezes |

## Critério de pronto

Roda sem internet; todo número com unidade; todo estado com cor, ícone e palavra; todo limiar vem do `config/indicadores.json` com fonte; C1, C2 e C3 disparam exatamente os alertas descritos.
