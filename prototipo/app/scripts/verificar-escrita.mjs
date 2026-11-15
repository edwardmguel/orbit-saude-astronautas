// Regra do dono: nenhum travessão (U+2014) nem meia-risca (U+2013) em texto do projeto.
// Falha com exit 1, listando arquivo, linha e coluna. Os caracteres são montados por código
// aqui para que este arquivo passe na própria verificação.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const proibidos = new Map([
  [String.fromCharCode(0x2014), 'travessão (U+2014)'],
  [String.fromCharCode(0x2013), 'meia-risca (U+2013)'],
])
const pastas = ['src', 'scripts']
const arquivosSoltos = [
  'README.md',
  'Dockerfile',
  'nginx.conf',
  'index.html',
  'package.json',
  'vite.config.ts',
  'tailwind.config.ts',
  '../docker-compose.yml',
]
const extensoesBinarias = new Set(['.woff', '.woff2', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.pdf'])

function listar(dir) {
  const achados = []
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome)
    if (statSync(caminho).isDirectory()) {
      achados.push(...listar(caminho))
    } else if (!extensoesBinarias.has(nome.slice(nome.lastIndexOf('.')).toLowerCase())) {
      achados.push(caminho)
    }
  }
  return achados
}

const arquivos = [
  ...pastas.map((p) => join(raiz, p)).filter(existsSync).flatMap(listar),
  ...arquivosSoltos.map((a) => join(raiz, a)).filter(existsSync),
]

const problemas = []
for (const arquivo of arquivos) {
  const linhas = readFileSync(arquivo, 'utf8').split(/\r?\n/)
  linhas.forEach((linha, i) => {
    for (const [caractere, nome] of proibidos) {
      let coluna = linha.indexOf(caractere)
      while (coluna !== -1) {
        problemas.push(`${relative(raiz, arquivo)}:${i + 1}:${coluna + 1} ${nome}`)
        coluna = linha.indexOf(caractere, coluna + 1)
      }
    }
  })
}

if (problemas.length > 0) {
  console.error('verificar-escrita: caracteres proibidos encontrados:')
  for (const p of problemas) console.error(`  ${p}`)
  process.exit(1)
}
console.log(`verificar-escrita: ${arquivos.length} arquivos sem travessão nem meia-risca.`)
