# AGENTS.md: contexto para a IA de desenvolvimento

Este arquivo é lido por agentes de IA (Claude Code, Codex, Cursor e similares) que ajudam a equipe a construir o protótipo. Leia inteiro antes de escrever código. O `CLAUDE.md` aponta para cá.

## 1. O que é o projeto

**Orbit Saúde**: software offline que ajuda astronautas em missões longas a avaliar a própria saúde e agir. Junta dados do corpo (vestíveis, equipamentos médicos, autoavaliações por texto, cliques e câmera) com dados do ambiente da estação (CO2, O2, pressão, ruído, radiação, clima espacial), compara cada tripulante com a própria linha de base e mostra o estado com código de cores numa figura humana clicável, dizendo o que fazer e quando chamar o médico de voo.

Entregável secundário (não é código deste repositório por enquanto): o **óculos Orbit**, com áudio por condução óssea, EEG e EOG. O software exibe os dados do óculos (sono, fadiga, paisagem sonora).

Equipe: Fundação Futuro. Prazo do protótipo: 20 horas. Plano em [`docs/08-prototype-plan-20h.md`](docs/08-prototype-plan-20h.md).

## 2. Onde está a verdade

| Assunto | Documento |
| --- | --- |
| Ordem de leitura por perfil | [`docs/00-reading-guide.md`](docs/00-reading-guide.md) |
| Contexto da missão, riscos e rotina da tripulação | [`docs/01-mission-context.md`](docs/01-mission-context.md) |
| Equipamentos reais da ISS: o que medem, como entregam, unidade | [`docs/02-equipment-and-data.md`](docs/02-equipment-and-data.md) |
| **Indicadores, faixas verde, amarelo e vermelho, com fonte** | [`docs/03-indicators-and-thresholds.md`](docs/03-indicators-and-thresholds.md) |
| Fórmulas e regras de cruzamento, com exemplos resolvidos | [`docs/04-data-cross-referencing.md`](docs/04-data-cross-referencing.md) |
| Arquitetura e stack | [`docs/05-software-architecture.md`](docs/05-software-architecture.md) |
| Modelo de dados e unidades canônicas | [`docs/06-data-model.md`](docs/06-data-model.md) |
| Telas, tokens de cor, componentes do app **ORBITA** (responsivo, com Visão geral em tela grande) | [`docs/18-orbita-responsive-design.md`](docs/18-orbita-responsive-design.md) e [`docs/wireframes/orbita-responsive.html`](docs/wireframes/orbita-responsive.html); prompt para o Lovable em [`docs/19-revised-lovable-prompt.md`](docs/19-revised-lovable-prompt.md) |
| Regras de sinalização, privacidade e convenções da NASA na tela | [`docs/07-interface-design.md`](docs/07-interface-design.md) (proposta inicial; em cor e layout vale o `docs/18`) |
| Base de conhecimento da ORBITA IA | [`prototipo/config/orbita-ia-base.json`](prototipo/config/orbita-ia-base.json) |
| Fontes de dados públicas (APIs e arquivos) | [`docs/12-open-data-sources.md`](docs/12-open-data-sources.md) |
| Siglas | [`docs/13-glossary.md`](docs/13-glossary.md) |
| Pesquisa bruta com todas as citações | [`pesquisa/bruto/`](pesquisa/bruto/) |

Se o dono pedir para importar ou atualizar a EPIC do Traycer, siga [`Traycer/README.md`](Traycer/README.md): a pasta `Traycer/` guarda a cópia dos artefatos da EPIC deste projeto.

Se o código e um documento discordarem, o documento vence até alguém atualizá-lo. Se dois documentos discordarem, `docs/03` vence para limiares e `docs/06` vence para nomes de campos e unidades.

## 3. Regras de domínio (não negociáveis)

1. **Nenhum limiar inventado.** Todo valor de faixa (verde, amarelo, vermelho) vem de `docs/03` e vai para `prototipo/config/indicadores.json` com o campo `fonte` preenchido. Se um indicador não tem limiar com fonte, ele aparece só com tendência e linha de base pessoal, nunca com cor de limiar fixo.
2. **Todo número com unidade.** Na tela, no JSON, no teste. Unidades canônicas em `docs/06`. Converta na entrada e guarde o valor e a unidade originais.
3. **Horário em UTC.** A ISS usa GMT/UTC como horário oficial. Guarde tudo em UTC (ISO 8601) e mostre como "GMT dia-do-ano / hh:mm" na barra superior.
4. **Offline.** O app funciona com a rede desligada. Integrações ao vivo (NOAA, telemetria pública da ISS) são opcionais, ficam atrás de um seletor e sempre têm arquivo gravado de reserva.
5. **Linguagem de apoio, não de diagnóstico.** Use "possível", "sugere", "compatível com". Nunca afirme diagnóstico. Todo amarelo e vermelho tem um "o que fazer" e o gatilho para subir de nível.
6. **Não substituir o alarme da estação.** Fogo, despressurização e atmosfera tóxica têm alarme próprio da ISS. O software mostra e aponta o procedimento; não comanda nada.
7. **Explicável.** Todo alerta guarda as evidências (leituras com valor, unidade e estado), o id da regra e a fonte.
8. **Cor nunca sozinha.** Estado sempre com cor, ícone e palavra: ✓ normal, ! atenção, ✕ acionar médico, ? sem dado.
9. **Privacidade por consentimento e cuidado mútuo.** O Monitor geral (T1) mostra de cada colega só o que ele consentiu compartilhar com aquela audiência (`Tripulante.compartilhamento` em `docs/06`); detalhes clínicos nunca. Toda filtragem acontece no motor, antes de chegar à tela. "Não compartilhado" é texto neutro, nunca cor de alerta. Não existe acesso emergencial irrestrito codificado.
10. **Não imitar o alarme da estação.** Nada pisca, nada emite som, nenhum rótulo usa Caution, Warning ou Emergency; os estados levam o prefixo "Saúde:". Vermelho, piscar e som são do sistema de Caution and Warning da ISS (`docs/07`, 5.1.1).
11. **Dados simulados são marcados.** Toda leitura tem `origem` (`simulada`, `ao_vivo`, `historica`, `manual`, `automatica`, `exame`). A tela mostra o selo da origem. Os cenários C1 a C5 e os perfis dos tripulantes fictícios estão em `prototipo/config/perfis-simulacao.rascunho.json`; as amostras reais gravadas, em `prototipo/dados/amostras-reais/`.

## 4. Regras de escrita (do dono do projeto)

- **Nunca use travessão (U+2014) nem meia-risca (U+2013)**, nem hífen solto entre espaços no papel deles. Vale para texto de tela, comentário de código, mensagem de commit, PR e documentação. Use vírgula, dois-pontos, parênteses ou ponto. Quando o código precisar do caractere, use o escape `\u2014`.
- Textos de interface em português do Brasil, com dicionário para inglês (`src/i18n/`). Nada de texto fixo espalhado nos componentes.
- Faixas numéricas por extenso: "60 a 100 bpm".

## 5. Convenções de código

- TypeScript estrito. Tipos do domínio em `src/domain/` espelhando `docs/06`.
- Nomes de domínio em português, iguais aos de `docs/06` (`Leitura`, `Alerta`, `Tripulante`, `indicadorId`). Termos técnicos consagrados podem ficar em inglês (`zScore`, `ewma`).
- Funções de cálculo puras em `src/engine/` e `src/ml/`, com teste unitário usando os exemplos resolvidos de `docs/04` (os números do documento são o gabarito do teste).
- Um adaptador por fonte em `src/adapters/`. Adaptador nunca decide cor; só entrega `Leitura`.
- Componentes de tela não calculam estado; recebem o estado pronto do motor.

## 6. Como adicionar um indicador

1. Confirme que ele existe em `docs/03` com unidade, faixas e fonte. Se não existir, pare e peça para atualizar o documento.
2. Adicione a entrada em `prototipo/config/indicadores.json` no formato de `docs/06`.
3. Ligue o indicador a uma região do corpo (`regiaoCorpo`) usando os ids de `docs/07`, seção 4, T2.
4. Gere dados para ele no simulador com faixas realistas.
5. Escreva um teste com um valor verde, um amarelo e um vermelho.

## 7. Como adicionar uma regra de cruzamento

1. A regra precisa estar descrita em `docs/04` com id (exemplo `R-CO2-01`), condições, janela de tempo, nível resultante, hipótese e orientações.
2. Implemente em `src/engine/cruzamentos/` como função pura que recebe leituras e devolve `Alerta | null`.
3. Teste com o cenário roteirizado correspondente (C1 a C5 em `docs/05`, seção 3.3).

## 8. Cenários de demonstração

Os cenários C1 a C5 (`docs/05`, seção 3.3) são o contrato da demo: cada um deve disparar exatamente o alerta descrito. Rode os cinco antes de cada integração.
