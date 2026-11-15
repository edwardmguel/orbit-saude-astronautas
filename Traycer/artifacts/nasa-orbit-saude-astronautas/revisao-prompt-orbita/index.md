---
title: "Revisão do prompt ORBITA e design responsivo"
kind: spec
comments: none
---

# Revisão do prompt ORBITA e design responsivo

A equipe escreveu um prompt para construir no Lovable o app **ORBITA** (aba "Prompt de Desenvolvimento" do documento Fundação Futuro, lida em 15/11 às 10h35). Esta revisão conecta as funcionalidades do prompt com a pesquisa e a documentação. Textos completos no repositório:

| Entrega | Onde | Estado |
| --- | --- | --- |
| Revisão seção por seção | `docs/17-revisao-prompt-orbita.md` | ✅ 10h39, atualizada para responsivo às 11h05 |
| Cópia do prompt original | `pesquisa/prompt-orbita-equipe.md` | ✅ 10h39 |
| Design das telas (design system, pontos de quebra, M01 a M18, pendências resolvidas) | `docs/18-design-orbita-responsivo.md` | ✅ 12h, revisado |
| Desenhos das telas: 21 quadros de celular, um de laptop e a Visão geral em tela grande | `docs/wireframes/orbita-responsivo.html` | ✅ 12h, conferidos renderizados; tela grande aprovada pelo dono às 11h50 |
| Prompt corrigido para o Lovable (19 seções, guia para colar em 5 partes, ordem de construção em cerca de 13 h) | `docs/19-prompt-lovable-revisado.md` | ✅ 11h20, revisado |
| Base de conhecimento da ORBITA IA (65 respostas com fonte) | `prototipo/config/orbita-ia-base.json` | ✅ 11h20, revisada |
| Indicadores novos do prompt: `apetite` (1 a 3) e `eog_piscadas`, só linha de base | `indicadores.json`, `perfis-simulacao.rascunho.json` (37 cada) e `docs/03` | ✅ 12h |

Tudo no GitHub no commit `1bf26d2` (15/11, cerca de 12h).

## Visão geral em tela grande (aprovada às 11h50)

Painel da missão para o monitor compartilhado e o telão da apresentação, 1920 x 1080, sem rolagem. Desenho simplificado abaixo; a versão completa está em `docs/wireframes/orbita-responsivo.html`, quadro M03b.

```wireframe
<!doctype html>
<html><head><meta charset="utf-8"><style>
body{margin:0;background:#07111F;color:#E6EDF5;font:13px "Segoe UI",sans-serif}
.p{padding:10px 16px;display:flex;flex-direction:column;gap:10px}
.top{display:flex;align-items:center;gap:10px;border-bottom:1px solid #22324A;padding-bottom:8px}
.top b{letter-spacing:.15em}.sp{flex:1}.pill{border:1px solid #22324A;border-radius:6px;padding:2px 8px;color:#9FB0C3;font-size:11px}
.row{display:grid;gap:10px}.c{background:#0F1C2E;border:1px solid #22324A;border-radius:10px;padding:8px 10px}
.w{border:2px solid #F5B800}.g{border:2px solid rgba(34,197,94,.45)}
.lbl{font-size:11px;letter-spacing:.08em;color:#9FB0C3;text-transform:uppercase;font-weight:700}
.n{font-size:22px;font-weight:700}.u{color:#9FB0C3;font-size:12px}
.ok{color:#22C55E;font-weight:700}.at{color:#F5B800;font-weight:700}.mut{color:#9FB0C3}
.t{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:6px}.t div{background:#16263B;border-radius:6px;padding:3px 6px;font-size:11px}
.t .w{border:1px solid #F5B800}
</style></head><body><div class="p">
<div class="top"><b>ORBITA</b><span>Painel da missão · ISS EXP-01 · dia 045</span><span class="sp"></span><span class="pill">DADOS SIMULADOS</span><span class="pill">Offline · solo: sem contato</span><span class="pill">Modo exibição</span><b>GMT 319 / 06:40</b></div>
<div class="row" style="grid-template-columns:5fr 7fr">
<div class="c"><div class="lbl">Precisa de apoio</div><div style="margin-top:6px">Ninguém precisa de apoio agora.</div></div>
<div class="c w"><div class="lbl">Alertas abertos (1)</div><div style="margin-top:4px"><span class="at">! Saúde: atenção</span> <b>Possível efeito de CO2 elevado no Node 3</b></div><div class="mut" style="font-size:11px">Astronauta 001 · há 40 min · conferir a ventilação; trocar de módulo só se autorizado · CMO informado</div></div>
</div>
<div class="lbl">Ambiente da estação <span class="pill">Real gravado 15/11: O2, pressão, prótons e Kp</span> <span class="pill">Simulado: CO2 (cenário C1) e dose</span></div>
<div class="row" style="grid-template-columns:repeat(6,1fr)">
<div class="c w">CO2 · Node 3<div class="n">2,95 <span class="u">mmHg</span></div><span class="at">! atenção</span></div>
<div class="c w">O2 (PIO2) · Node 3<div class="n">18,84 <span class="u">kPa</span></div><span class="at">! atenção</span></div>
<div class="c g">Pressão · US Lab<div class="n">101,0 <span class="u">kPa</span></div><span class="ok">✓ normal</span></div>
<div class="c g">Dose da missão<div class="n">18,9 <span class="u">mSv</span></div><span class="ok">✓ normal</span> <span class="mut">3,2% de 600</span></div>
<div class="c g">Prótons GOES<div class="n">0,21 <span class="u">pfu</span></div><span class="ok">✓ normal</span> <span class="mut">S1 em 10</span></div>
<div class="c g">Índice Kp<div class="n">1</div><span class="ok">✓ normal</span></div>
</div>
<div class="row" style="grid-template-columns:repeat(4,1fr);align-items:start">
<div class="c w"><b>Astronauta 001</b> <span class="at">! Saúde: atenção</span><div class="t"><div class="w">Coração 86 bpm !</div><div>Oxigenação 97 % ✓</div><div>Temperatura 36,8 °C ✓</div><div class="w">Sono 5,4 h !</div><div>Hidratação 1,8 L ✓</div><div>Radiação 18,9 mSv ✓</div><div class="w">Mente: atenção !</div><div class="mut">há 5 min</div></div><div style="font-size:11px;margin-top:4px"><b>Como ajudar:</b> ofereça acompanhar a pessoa ou avisar o controle ambiental.</div></div>
<div class="c g"><b>Tripulante A</b> <span class="ok">✓ Saúde: normal</span><div class="t"><div>Coração 64 bpm ✓</div><div>Oxigenação 98 % ✓</div><div>Temperatura 36,7 °C ✓</div><div>Sono 6,2 h ✓</div><div>Hidratação 2,5 L ✓</div><div>Radiação 18,9 mSv ✓</div><div>Mente: normal ✓</div><div class="mut">há 5 min</div></div></div>
<div class="c g"><b>Tripulante B</b> <span class="ok">✓ Saúde: normal</span><div class="t"><div>Coração ✓ só o estado</div><div>Oxigenação ✓ só o estado</div><div>Temperatura ✓ só o estado</div><div>Sono ✓ só o estado</div><div>Hidratação ✓ só o estado</div><div>Radiação ✓ só o estado</div><div class="mut">Mente: não compartilhado</div><div class="mut">há 12 min</div></div></div>
<div class="c g"><b>Tripulante C</b> <span class="ok">✓ Saúde: normal</span><div class="t"><div>Coração 68 bpm ✓</div><div>Oxigenação 99 % ✓</div><div>Temperatura 36,6 °C ✓</div><div>Sono 6,5 h ✓</div><div>Hidratação 2,4 L ✓</div><div>Radiação 18,9 mSv ✓</div><div class="mut">Mente: não compartilhado</div><div class="mut">há 8 min</div></div></div>
</div>
<div class="mut" style="font-size:11px;display:flex;gap:16px"><span>Verificações entre colegas hoje: 2</span><span>Meta da tripulação: hidratação 3 de 4</span><span>✓ normal · ! atenção · ✕ alerta · ? sem dado</span><span class="sp"></span><span>Só o que cada tripulante compartilhou com a tripulação</span></div>
</div></body></html>
```

## Correções da revisão do design (11h50)

| Problema na entrega | Correção |
| --- | --- |
| Astronauta 001 com "Mente: normal", mas a mini figura dele mostra a cabeça em amarelo (fadiga de 6 de 7) | O bloco Mente mostra o pior estado entre fadiga, humor e estresse, igual à região Cabeça e cérebro; nas telas grande e de celular e no `docs/18` e `docs/19` |
| Tripulante B com ✓ verde ao lado de "não compartilhado" | Texto "só o estado" no lugar do valor |
| Alerta dizia "ir para um módulo com leitura menor", como ordem | "Trocar de módulo só se autorizado" |

Pendências levantadas pelo agente de design e resolvidas antes do envio: cinza e vermelho com contraste insuficiente no `docs/19` (agora `#A3ADBA` e `#FF6B6B`), nível 3 ainda chamado de vermelho no `docs/03` e no `docs/07`, validade de 24 h que deixaria o PVT de 6 dias e o hemograma em cinza (agora 7 e 15 dias), dose do dia derivada de `dose_acumulada`, campos `sexo` e `alturaCm` no `docs/06`. Continuam abertas: plaquetas sem `indicadorId` e o ícone oficial `prototipo/marca/orbita-icone.svg`.

## Correção encontrada na revisão: O2 do módulo (11h20)

O indicador `pio2_cabine` é a pressão **inspirada** de O2 (PIO2), não a ppO2 da cabine. A NASA dá a conta: PIO2 = (pressão total menos 47 mmHg) × ppO2 ÷ pressão total ([OCHMO-TB-003](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf)). E 145 a 155 mmHg é o **alvo** de normoxia ([OCHMO-TB-002](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-002-eclss.pdf)), não o limite. Os limites de exposição são 127 mmHg em média de 1 hora, 122 mmHg absoluto e 356 mmHg.

|  | Antes | Depois |
| --- | --- | --- |
| Configuração | Fora de 145 a 155 mmHg virava laranja (nível 3) | Fora do alvo é amarelo; laranja só além dos limites de exposição |
| Leitura real do Node 3 (ppO2 150,67 mmHg, pressão 757,64 mmHg) | Tratada como PIO2: 20,09 kPa, verde | PIO2 calculada: 141,3 mmHg = 18,84 kPa, amarelo |
| Onde |  | `indicadores.json`, `docs/03`, `docs/04` (A1, com exemplo resolvido), `docs/02`, `docs/17`, `docs/19`, base da IA |

Também corrigido no `docs/17`: o vermelho vem só de sintoma de alarme (requisito excedido é laranja), e o alerta de CO2 da demonstração dispara com a dificuldade de concentração relatada. A região `vestibular` entrou no `docs/07`.

## Formato do app (decisão do dono, 15/11, 11h)

O ORBITA é um **web app responsivo**: pensado primeiro para o celular e funcionando em tablet e laptop. A **Visão geral** tem dois layouts:

| Largura | Visão geral mostra | Navegação |
| --- | --- | --- |
| Celular (360 a 430 px) | Painel pessoal do astronauta | Barra inferior com 4 atalhos e menu pelo logo |
| Tablet e laptop (768 a 1366 px) | Painel pessoal com mais colunas | Menu lateral fixo e recolhível |
| Tela grande (1920 x 1080) | Painel da missão para o monitor compartilhado e o telão da apresentação: ambiente da estação, tripulação inteira (só o que cada um consentiu compartilhar), faixa "precisa de apoio" e alertas abertos, sem rolagem | Modo de exibição, sem menu |

## O que o prompt da equipe já acerta

Linha de base individual, dados simulados marcados, código de cores com texto e ícone, critérios configuráveis que não fingem ser limites da NASA, IA offline sem diagnóstico e sem remédio, gamificação que premia ação e não resultado, mapa corporal educativo e fontes oficiais do Human Research Program. Nome ORBITA, paleta e estrutura ficam como estão.

## As oito correções

| # | Correção | Base |
| --- | --- | --- |
| 1 | Incluir pressão arterial, glicose, temperatura, sono e humor | Exemplos do próprio desafio oficial (frente 7) |
| 2 | Cartão Ambiente do módulo (CO2, O2, pressão, clima espacial) | Cruzamento corpo e ambiente é o diferencial; há dado real gravado (frentes 1, 11) |
| 3 | Tela Tripulação (monitor geral com consentimento) | Pedido do dono em 15/11 |
| 4 | Dosimetria: 0,42 mSv é dose de um dia; 45 dias somam cerca de 19 mSv | 50 a 100 mSv em 6 meses na ISS (frente 1) |
| 5 | Laranja como nível 3 (inclui requisito oficial excedido); vermelho só por sintoma de alarme relatado; nada pisca nem toca som | Convenção de alarme da ISS (frente 7) e `docs/06` |
| 6 | Fadiga de 1 a 7 (Samn-Perelli) e humor de 1 a 5 | Escalas validadas do `indicadores.json` (frente 8) |
| 7 | Hemograma com estados: coleta agendada, amostra coletada, resultado | Sangue é analisado na Terra (frente 2) |
| 8 | Testes de visão (Amsler e acuidade) e PVT de 3 minutos | Acompanhamento de SANS e fadiga (frentes 3 e 8) |

**Decisão para a equipe:** chamar a missão de demonstração de **ISS EXP-01** em vez de MARS-01, porque todos os dados reais gravados são da ISS; Marte aparece no slide "Pensado para Marte".

## Telas

| Código | Tela | Prioridade |
| --- | --- | --- |
| M01 | Cadastro | P0 |
| M02 | Inicialização orbital | P0 |
| M03 | Visão geral: painel pessoal no celular, painel da missão em tela grande | P0 |
| M04 | Avaliação de saúde | P0 |
| M05 | Mapa corporal | P0 |
| M06 | Painel da região | P0 |
| M07 | Detalhe do indicador e do alerta | P0 |
| M08 | Exames laboratoriais | P1 |
| M09 | ORBITA IA | P1 |
| M10 | Relatórios | P1 |
| M11 | Rotina da missão | P1 |
| M12 | Missão: Saúde em Dia | P2 |
| M13 | Riscos espaciais | P1 |
| M14 | Notificações | P1 |
| M15 | Perfil e privacidade | P1 |
| M16 | Tripulação: lista no celular, quadro dentro da Visão geral em tela grande | P1 (quadro em tela grande é P0) |
| M17 | Sono e óculos Orbit | P2 |
| M18 | Menu lateral | P0 |
