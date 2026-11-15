---
title: "Design da interface (proposta para o kickoff)"
kind: spec
comments: none
---

# Design da interface

<user_quoted_section>Atualização de 15/11, 12h: o app passou a se chamar ORBITA e o visual final está no artefato Revisão do prompt ORBITA e design responsivo e em docs/18-design-orbita-responsivo.md. Em cor, componente e layout vale o docs/18; as regras de sinalização, privacidade e convenções da NASA desta página continuam valendo. O nível 3 agora é laranja.</user_quoted_section>

Proposta inicial para acelerar o kickoff; o layout final é desenhado com a equipe usando as perguntas K1 a K8 abaixo. Especificação completa em `docs/07-design-interface.md` e as 6 telas navegáveis em `docs/wireframes/telas-prototipo.html` no repositório.

## Telas

| Tela | Para quê |
| --- | --- |
| T1 Monitor geral da tripulação | Indicadores de cada astronauta lado a lado, quem está normal e quem está em perigo; tela cheia para monitor compartilhado; cuidado mútuo |
| T1b Monitor em matriz | Indicadores nas linhas e tripulantes nas colunas, para até 7 pessoas |
| T2 Meu corpo | Figura humana clicável: função de cada parte, por que muda no espaço, indicadores, o que fazer |
| T3 Check-in diário | 2 minutos: sono, energia, humor, sintomas, hidratação, testes rápidos (PVT, Amsler, foto) |
| T4 Detalhe do alerta | Por que estou vendo isto, o que fazer, fonte da regra, quem já sabe |
| T5 Ambiente e radiação | Mapa dos módulos por CO2, taxa de dose com passagens pela SAA, dose acumulada, clima espacial |
| T6 Sono e óculos Orbit | Hipnograma do EEG, sinais do EOG, paisagem sonora do dia; mostrada em modo noturno âmbar |

## T1. Monitor geral da tripulação

Pedido do dono, 15/11: *"uma tela no software que funciona de monitor geral [...] os astronautas que podem monitorar uns aos outros nessa tela geral."* É a tela inicial e também roda em tela cheia num monitor compartilhado. Um cartão por tripulante com os mesmos oito indicadores na mesma ordem, borda na cor do estado, idade de cada dado, frase de "como ajudar" e faixa "precisa de apoio" com "Oferecer apoio" e "Chamar CMO". Há também o modo matriz (T1b: indicadores nas linhas, tripulantes nas colunas) para tripulação de até 7. Cada tripulante consente com o que compartilha, por dado e por audiência (só eu, CMO, médico de voo, colega escolhido, tripulação); "não compartilhado" aparece como texto neutro, nunca como cor; detalhes clínicos nunca aparecem. Os tripulantes fictícios da demonstração compartilham tudo com a tripulação.

**Alinhado às convenções da NASA (frente 7):** os estados levam o prefixo "Saúde:", nada pisca nem toca som e o vermelho é só contorno estático, porque piscar, som e luz vermelha pertencem ao sistema de Caution and Warning da ISS. O nível 4 mostra "Contatar CMO agora" e "Abrir procedimento oficial".

```wireframe
<!doctype html><html><head><meta charset="utf-8"><style>
:root{--bg:#0A0F1E;--s:#111A2F;--s2:#18233D;--b:#26324F;--t:#E8ECF5;--m:#94A0B8;--a:#4EA8FF;--ok:#22C55E;--w:#F5B800;--r:#EF4444;--n:#6B7280}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--t);font:12px/1.35 system-ui,sans-serif;padding:12px}
.top{display:flex;gap:10px;align-items:center;margin-bottom:10px}.logo{font-weight:800;color:var(--a);letter-spacing:.08em}
.pill{font-size:11px;padding:3px 9px;border-radius:99px;background:var(--s2);border:1px solid var(--b);color:var(--m)}.sp{flex:1}
.ban{display:flex;gap:12px;align-items:center;padding:10px;border:2px solid var(--r);border-radius:9px;background:var(--s);margin-bottom:8px}
.btn{padding:6px 10px;border-radius:7px;border:1px solid var(--b);background:var(--s2)}.p{background:var(--a);color:#04101f;font-weight:700}
.env{display:flex;gap:14px;padding:7px 10px;border:1px solid var(--b);border-radius:9px;background:var(--s);color:var(--m);margin-bottom:8px}.env b{color:var(--t)}
.g{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.c{background:var(--s);border:2px solid var(--b);border-radius:9px;padding:8px}
.c.ok{border-color:#1f6b45}.c.w{border-color:var(--w)}.c.r{border-color:var(--r)}.c.n{border-color:var(--n);border-style:dashed}
.h{display:flex;gap:6px;align-items:center;margin-bottom:6px}.st{font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;border:1px solid currentColor;margin-left:auto;white-space:nowrap}
.tl{display:grid;grid-template-columns:1fr 1fr;gap:4px}.t{padding:3px 5px;border-radius:5px;background:var(--s2);border:1px solid var(--b);font-size:10px;color:var(--m)}
.t b{display:block;color:var(--t);font-size:12px}.t.w{border-color:var(--w)}.t.r{border-color:var(--r)}.t.n{border-style:dashed}
.f{margin-top:6px;padding-top:5px;border-top:1px solid var(--b);font-size:10px;color:var(--m)}
.okc{color:var(--ok)}.wc{color:var(--w)}.rc{color:var(--r)}.nc{color:var(--n)}
</style></head><body>
<div class="top"><span class="logo">ORBIT</span><span class="pill">FD 142 · GMT 318 / 14:32</span><span class="sp"></span><span class="pill"><b>Cartões</b> · Matriz</span><span class="pill">⛶ Tela cheia</span></div>
<div class="ban"><b class="rc">✕ Saúde: acionar CMO</b><div><b>Tripulante C: oxigenação 89% há 4 min</b><div style="color:var(--m)">Confirme com o oxímetro do kit e chame o CMO se continuar baixo.</div></div><span class="sp"></span><span class="btn p">Oferecer apoio</span><span class="btn">Chamar CMO</span></div>
<div class="env">CO2 Node 3 <b class="wc">2,9 mmHg !</b> O2 <b>21,3 kPa ✓</b> Pressão <b>101,2 kPa ✓</b> Dose <b>18 µGy/h</b> Prótons GOES <b>0,4 pfu ✓</b></div>
<div class="g">
<div class="c ok"><div class="h"><b>A</b> Comandante · Lab<span class="st okc">✓ Saúde: normal</span></div><div class="tl"><div class="t">Coração<b>58 bpm ✓</b></div><div class="t">Oxigenação<b>98% ✓</b></div><div class="t">Temperatura<b>36,6 °C ✓</b></div><div class="t">Sono<b>7 h 40 ✓</b></div><div class="t">Prontidão<b>86 ✓</b></div><div class="t">Hidratação<b>80% ✓</b></div></div><div class="f">Atualizado há 2 min</div></div>
<div class="c w"><div class="h"><b>B</b> Eng. de voo · Node 3<span class="st wc">! Saúde: atenção</span></div><div class="tl"><div class="t">Coração<b>71 bpm ✓</b></div><div class="t">Oxigenação<b>97% ✓</b></div><div class="t">Temperatura<b>36,8 °C ✓</b></div><div class="t">Sono<b>6 h 50 ✓</b></div><div class="t w">Prontidão<b class="wc">64 !</b></div><div class="t w">Cabeça<b class="wc">dor 3/10 !</b></div></div><div class="f"><span class="wc">! Possível efeito de CO2.</span> Ajude: convide para trabalhar no Lab.</div></div>
<div class="c r"><div class="h"><b>C</b> Eng. de voo · Columbus<span class="st rc">✕ Saúde: CMO</span></div><div class="tl"><div class="t w">Coração<b class="wc">96 bpm !</b></div><div class="t r">Oxigenação<b class="rc">89% ✕</b></div><div class="t">Temperatura<b>37,1 °C ✓</b></div><div class="t">Sono<b>7 h 05 ✓</b></div><div class="t w">Prontidão<b class="wc">71 !</b></div><div class="t w">Olhos<b class="wc">Amsler !</b></div></div><div class="f"><span class="rc">✕ Oxigenação baixa há 4 min.</span> Ofereça apoio e chame o CMO.</div></div>
<div class="c n"><div class="h"><b>D</b> Eng. de voo · ?<span class="st nc">? sem dado</span></div><div class="tl"><div class="t n">Coração<b class="nc">há 26 h</b></div><div class="t n">Oxigenação<b class="nc">há 26 h</b></div><div class="t">Temperatura<b>36,5 °C ✓</b></div><div class="t n">Sono<b class="nc">sem dado</b></div><div class="t n">Prontidão<b class="nc">parcial</b></div><div class="t">Mente<b>privado</b></div></div><div class="f">Vestível desconectado há 26 h. Lembre a colega.</div></div>
</div></body></html>
```

## T2. Meu corpo

```wireframe
<!doctype html><html><head><meta charset="utf-8"><style>
:root{--bg:#0A0F1E;--s:#111A2F;--s2:#18233D;--b:#26324F;--t:#E8ECF5;--m:#94A0B8;--a:#4EA8FF;--ok:#22C55E;--w:#F5B800;--r:#EF4444;--n:#6B7280}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--t);font:13px/1.4 system-ui,sans-serif;padding:12px}
.g{display:grid;grid-template-columns:260px 1fr;gap:12px}.c{background:var(--s);border:1px solid var(--b);border-radius:9px;padding:12px}
.st{display:inline-block;font-size:11px;font-weight:600;padding:1px 7px;border-radius:99px;border:1px solid currentColor}.w{color:var(--w)}.ok{color:var(--ok)}
.u{color:var(--m)}h3{margin:0 0 6px;font-size:11px;color:var(--m);text-transform:uppercase}.kv{display:grid;grid-template-columns:1fr auto auto;gap:5px 10px}
.btn{display:inline-block;padding:7px 12px;border-radius:7px;border:1px solid var(--b);background:var(--s2);margin-right:6px}.p{background:var(--a);color:#04101f;font-weight:700;border-color:var(--a)}
</style></head><body><div class="g">
<div class="c"><svg viewBox="0 0 300 560" width="240" height="440">
<g fill="#18233D" stroke="#26324F"><circle cx="150" cy="60" r="42"/><rect x="95" y="118" width="110" height="170" rx="30"/><rect x="55" y="125" width="34" height="160" rx="16"/><rect x="211" y="125" width="34" height="160" rx="16"/><rect x="102" y="290" width="44" height="230" rx="18"/><rect x="154" y="290" width="44" height="230" rx="18"/></g>
<circle cx="150" cy="48" r="26" fill="#22C55E" fill-opacity=".25" stroke="#22C55E" stroke-width="2"/>
<ellipse cx="134" cy="66" rx="9" ry="6" fill="#F5B800" fill-opacity=".6" stroke="#F5B800" stroke-width="2"/><ellipse cx="166" cy="66" rx="9" ry="6" fill="#F5B800" fill-opacity=".6" stroke="#F5B800" stroke-width="2"/>
<circle cx="160" cy="170" r="14" fill="#22C55E" fill-opacity=".35" stroke="#22C55E" stroke-width="2"/>
<rect x="110" y="330" width="28" height="160" rx="12" fill="#F5B800" fill-opacity=".18" stroke="#F5B800" stroke-dasharray="5 3" stroke-width="2"/><rect x="162" y="330" width="28" height="160" rx="12" fill="#F5B800" fill-opacity=".18" stroke="#F5B800" stroke-dasharray="5 3" stroke-width="2"/>
<ellipse cx="128" cy="255" rx="10" ry="14" fill="#22C55E" fill-opacity=".3" stroke="#22C55E" stroke-width="2"/><ellipse cx="172" cy="255" rx="10" ry="14" fill="#22C55E" fill-opacity=".3" stroke="#22C55E" stroke-width="2"/>
</svg><div class="u">✓ normal · ! atenção · ✕ médico · ? sem dado</div></div>
<div style="display:grid;gap:12px;align-content:start">
<div class="c"><span class="st w">! atenção</span><div style="font-size:22px;font-weight:700;margin:4px 0">Olhos</div><div class="u">Em microgravidade, líquidos do corpo sobem para a cabeça e podem mudar o olho e o nervo óptico (SANS). Mudanças pequenas na visão de perto ou linhas tortas na grade de Amsler podem ser os primeiros sinais.</div></div>
<div class="c"><h3>Indicadores</h3><div class="kv">
<div class="u">Grade de Amsler</div><div>distorção em 2 testes</div><span class="st w">!</span>
<div class="u">Acuidade de perto</div><div>1 linha pior que a base</div><span class="st w">!</span>
<div class="u">Visão embaçada relatada</div><div>3 dias</div><span class="st w">!</span>
<div class="u">OCT (último exame)</div><div>FD 90</div><span class="st ok">✓</span></div></div>
<div class="c"><h3>O que fazer</h3><ol class="u" style="margin:0;padding-left:16px"><li>Refaça os testes amanhã no mesmo horário e com a mesma luz.</li><li>Confirme que está com os óculos de grau do voo.</li><li>Resumo pronto para o médico de voo sugerindo antecipar OCT e fundo de olho.</li></ol>
<div style="margin-top:10px"><span class="btn p">Fazer teste de Amsler</span><span class="btn">Enviar ao médico de voo</span><span class="btn">Por que estou vendo isto?</span></div></div>
</div></div></body></html>
```

## Sistema visual

| Token | Tema padrão | Modo noturno | Uso |
| --- | --- | --- | --- |
| `--bg` | `#0A0F1E` | `#0D0703` | Fundo |
| `--accent` | `#4EA8FF` | `#E08A3C` | Ação, séries |
| `--ok` | `#22C55E` | `#A3B84F` | ✓ normal |
| `--warn` | `#F5B800` | `#F0A030` | ! atenção |
| `--alert` | `#EF4444` | `#E0503A` | ✕ acionar médico |
| `--nodata` | `#6B7280` | `#6E5A48` | ? sem dado |

Cor nunca sozinha: sempre cor, ícone e palavra. Modo noturno âmbar no pré-sono (menos luz azul). Gamificação cooperativa: sequência de check-ins, missão do dia, meta da tripulação e sons desbloqueáveis no óculos Orbit; sem ranking entre colegas.

## Perguntas do kickoff (desenhar com a equipe)

| # | Pergunta | Padrão se não houver consenso |
| --- | --- | --- |
| K1 | Laptop, tablet ou telão? Resolução? | Laptop, 1366 × 768 no mínimo |
| K2 | Tema escuro ou claro? | Escuro com modo noturno âmbar |
| K3 | Paleta, logo, nome visual já pensados? | Tokens acima e o nome "Orbit" |
| K4 | Idioma da interface | PT-BR com dicionário EN |
| K5 | Estilo da figura humana | Silhueta minimalista em SVG |
| K6 | Quanta gamificação | Discreta |
| K7 | Cenário principal da demo | C1 (CO2) e C3 (SANS) |
| K8 | Referências visuais da equipe | Ajustam tokens, não a estrutura |
