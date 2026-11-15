# Traycer: cópia da EPIC do projeto

Esta pasta guarda uma cópia dos artefatos da EPIC do Traycer deste projeto (a story **"NASA: Orbit, monitoramento de saúde de astronautas"** e os artefatos filhos). Serve para o dono continuar o trabalho em outro computador e para qualquer agente de IA reconstruir a EPIC a partir do repositório.

> **Para um agente de IA:** se o dono pedir para "importar a EPIC", "trazer a EPIC para este computador", "restaurar o Traycer" ou algo parecido, é **esta pasta** que ele quer dizer. Siga a seção 3. Se ele pedir para "salvar a EPIC no GitHub" ou "atualizar a pasta Traycer", siga a seção 4.

## 1. O que tem aqui

```text
Traycer/
  README.md                                   este arquivo
  artifacts/
    nasa-orbit-saude-astronautas/             story raiz (kind: story)
      index.md                                resultado do Passo 0, decisões pendentes do dono, lista de artefatos
      brief/index.md                          problema, escopo, entregáveis, decisões tomadas e em aberto
      frentes-de-pesquisa/index.md            roteiro das 19 frentes de pesquisa, andamento, achados, revisões, lacunas, consolidação, cota
      fontes-de-dados/index.md                as 33 fontes de dados do software e os 3 arquivos do projeto, item por item
      arquitetura/index.md                    princípios, fluxo de dados, níveis de alerta, protótipo
      design-da-interface/index.md            telas, Monitor geral, wireframes renderizáveis no Traycer, perguntas de kickoff
      plano-prototipo-20h/index.md            escopo, versão comprimida do plano, pontos de controle
```

Cada artefato é uma pasta com um `index.md`. O cabeçalho (frontmatter) traz `kind` (`story` ou `spec`), `title` e, na story, `status` (0 a fazer, 1 em andamento, 2 concluído). A linha `comments:` é mantida pelo próprio Traycer. Os links entre artefatos são relativos (`../brief`, `frentes-de-pesquisa`), então continuam funcionando depois da importação. Os blocos ```` ```wireframe ```` do artefato de design são renderizados pelo Traycer como telas.

**Origem:** épico `c908a444-f792-49f6-bafc-d47fbc878afb` no computador DESKTOP-6E7UBDI, exportado em 15/11/2026. Esse épico também guarda outro projeto do dono (Sementes Nativas); **só a story da NASA foi exportada**, de propósito.

**Fonte da verdade:** o texto completo de tudo está em `docs/` e `pesquisa/` deste repositório. A EPIC resume e aponta para esses arquivos. Se houver conflito, vale o repositório.

## 2. Onde o Traycer guarda os artefatos

O Traycer guarda os artefatos de cada épico em disco, nesta pasta:

| Sistema | Caminho |
| --- | --- |
| Windows | `%USERPROFILE%\.traycer\epics\<id-do-épico>\artifacts\` |
| macOS e Linux | `~/.traycer/epics/<id-do-épico>/artifacts/` |

O `<id-do-épico>` aparece no Traycer (ou, para um agente rodando dentro do Traycer, no caminho informado no prompt de sistema, na seção "Traycer Artifact Model").

## 3. Importar em outro computador

1. Clone este repositório no novo computador.
2. No Traycer, abra o épico onde o projeto vai continuar. **Recomendado:** um épico novo, só para este projeto, ligado à pasta do repositório.
3. Descubra o id desse épico (seção 2).
4. Copie a pasta da story para dentro de `artifacts/` do épico:

   PowerShell (Windows):
   ```powershell
   $epic = "<id-do-épico>"
   $dest = "$env:USERPROFILE\.traycer\epics\$epic\artifacts"
   Copy-Item -Recurse -Force ".\Traycer\artifacts\nasa-orbit-saude-astronautas" $dest
   ```

   Bash (macOS, Linux ou Git Bash):
   ```bash
   EPIC="<id-do-épico>"
   cp -R ./Traycer/artifacts/nasa-orbit-saude-astronautas "$HOME/.traycer/epics/$EPIC/artifacts/"
   ```
5. Abra o épico no Traycer e confira que a story "NASA: Orbit, monitoramento de saúde de astronautas" aparece com os 6 filhos.
6. Se já existir uma story com o mesmo nome no épico de destino, **não sobrescreva sem conferir**: compare os dois `index.md` e pergunte ao dono qual versão vale.

Comentários que o dono tiver feito na EPIC original ficam em pastas `.comments/` dentro de cada artefato. Esta exportação foi feita quando não havia nenhum comentário. Comentários são estado do Traycer e não precisam ser importados.

## 4. Atualizar esta cópia a partir da EPIC (exportar de novo)

Sempre que a EPIC mudar e o dono quiser a versão nova no GitHub:

PowerShell (Windows, no computador onde a EPIC está):
```powershell
$epic = "<id-do-épico>"   # neste computador de origem: c908a444-f792-49f6-bafc-d47fbc878afb
$src  = "$env:USERPROFILE\.traycer\epics\$epic\artifacts\nasa-orbit-saude-astronautas"
Remove-Item -Recurse -Force ".\Traycer\artifacts\nasa-orbit-saude-astronautas"
Copy-Item -Recurse -Force $src ".\Traycer\artifacts\"
Get-ChildItem ".\Traycer" -Recurse -Force -Filter desktop.ini | Remove-Item -Force
git add Traycer
git commit -m "Atualiza a cópia da EPIC na pasta Traycer"
git push
```

Antes de enviar, confira que nenhum arquivo tem travessão ou meia-risca (regra de escrita do dono) e que nenhum artefato de outro projeto entrou na pasta.

## 5. Regras que valem para quem continuar a EPIC

- Artefatos em português do Brasil, **sem travessão (U+2014), meia-risca (U+2013) ou hífen solto entre espaços**.
- Toda afirmação de fato tem fonte no repositório; limiar sem fonte não entra na configuração de alertas.
- Uma informação, um lugar: o texto completo fica em `docs/` e `pesquisa/`; a EPIC resume e aponta.
- Atualizar a EPIC ao fim de cada tarefa; conferir o horário no relógio antes de anotar.
- Pesquisas longas com agentes GPT-6 Luna: no máximo 3 ao mesmo tempo, cada entrega revisada antes de ser aprovada, roteiro no artefato "Frentes de pesquisa". Método em [`../pesquisa/METODO.md`](../pesquisa/METODO.md).
