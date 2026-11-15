# ORBITA: app

Web app offline de saúde de astronautas (Orbit Saúde). Vite, React 18, TypeScript estrito, Tailwind 3, Zustand, Recharts e Lucide. Regras de domínio em [`AGENTS.md`](../../AGENTS.md); design em [`docs/18`](../../docs/18-orbita-responsive-design.md).

## Desenvolvimento

Pré-requisito: Node 24 ou mais novo.

```text
cd prototipo/app
npm ci
npm run dev          # http://localhost:5173
```

Scripts:

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento do Vite |
| `npm run build` | Gera `dist/` (não roda o typecheck) |
| `npm run preview` | Serve o `dist/` já gerado |
| `npm test` | `vitest run` (jsdom) |
| `npm run typecheck` | `tsc -b` |
| `npm run verificar` | O portão de qualidade (abaixo) |

## Portão de qualidade

Todo PR só é aberto com o portão saindo com **exit 0**:

```text
npm run verificar
# = tsc -b && vitest run && vite build && node scripts/verificar-escrita.mjs
```

`scripts/verificar-escrita.mjs` falha, listando arquivo e linha, se houver travessão (U+2014) ou meia-risca (U+2013) em `src/`, `scripts/` e nos arquivos de configuração do app. Para conferir o código de saída sem mascará-lo por um `| tail`, rode o comando sozinho e leia `$?` (ou `$LASTEXITCODE` no PowerShell).

## Estrutura

```text
src/
  i18n/          t(), useT(), I18nProvider, setIdioma; pt-BR/ e en/ com um arquivo por área
  ui/
    tokens.css   tokens do docs/18 (cores, estados, raios, tipografia, modo noturno)
    rotas.tsx    ROTAS (caminho, chave de título, código Mxx) e RotasApp
    components/  StatusBadge, OriginSeal, AgeOfData, Section, Sheet, MarcadorOrbita
    layout/      AppShell, AppHeader, SideMenu, Gaveta, BottomNav, DisplayMode
    screens/     uma pasta por tela (m01-cadastro ... m17-sono), hoje com telas provisórias
  test/          configuração do vitest e simulação de matchMedia
```

Pontos de quebra (`tailwind.config.ts`, docs/18, 2.11): celular é o padrão (360 a 430 px); `sm` 360 px, `md` 768 px (tablet), `lg` 1280 px (laptop), `xl` 1920 px (tela grande).

Aliases (`vite.config.ts`, `vitest` e `tsconfig`): `@/*` aponta para `src/*` e `@config/*` para `../config/*`, a pasta `prototipo/config`, fonte única dos JSON (nunca copie esses arquivos).

Textos: tudo que aparece na tela vem de `src/i18n/` no formato `m03.titulo` (área, ponto, chave). Faltou a chave em `en`: cai no pt-BR.

## Docker

A apresentação local roda em Docker, sem rede, em http://localhost:8088:

```text
cd prototipo
docker compose up --build -d
docker compose down          # para encerrar
```

O build tem duas etapas: `node:24-alpine` roda `npm ci` e `npm run build` (com `prototipo/config` copiado ao lado de `app/`, para o alias `@config` funcionar) e `nginx:1.27-alpine` serve o `dist/` com gzip e cache longo para `assets/`. O contexto do build é a pasta `prototipo`.
