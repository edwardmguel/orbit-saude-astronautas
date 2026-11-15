import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import indicadores from '@config/indicadores.json'

// O vitest roda dentro de prototipo/app (npm test); `?raw` de CSS volta vazio no vitest.
const css = readFileSync(resolve(process.cwd(), 'src/ui/tokens.css'), 'utf8')

/** Valor de um token dentro do bloco que começa em `seletor` (primeiro bloco que o define). */
function token(seletor: string, nome: string): string | undefined {
  const inicio = css.indexOf(seletor)
  const fim = css.indexOf('}', inicio)
  const bloco = css.slice(inicio, fim)
  return new RegExp(`${nome}:\\s*([^;]+);`).exec(bloco)?.[1]?.trim().toLowerCase()
}

describe('tokens.css (docs/18, 2.1 e 2.2)', () => {
  it.each([
    ['--estado-sem-dado', '#a3adba', '#202f3f'],
    ['--estado-normal', '#22c55e', '#0e3332'],
    ['--estado-atencao', '#f5b800', '#2c3125'],
    ['--estado-alerta', '#f97316', '#2c2728'],
    ['--estado-critico', '#ff6b6b', '#2d2634'],
  ])('%s tem a cor e a variante -bg do documento', (nome, cor, fundo) => {
    expect(token(':root {', nome)).toBe(cor)
    expect(token(':root {', `${nome}-bg`)).toBe(fundo)
  })

  it('marca e superfícies do tema padrão e do modo noturno', () => {
    expect(token(':root {', '--bg')).toBe('#07111f')
    expect(token(':root {', '--primary')).toBe('#21c5ef')
    expect(token(":root[data-tema='noturno']", '--bg')).toBe('#120a04')
    expect(token(":root[data-tema='noturno']", '--primary')).toBe('#e8963f')
    expect(token(":root[data-tema='noturno']", '--brilho-foco')).toBe('none')
  })
})

describe('alias @config', () => {
  it('lê o indicadores.json de prototipo/config, a fonte única', () => {
    expect(indicadores).toBeTruthy()
    expect(Object.keys(indicadores).length).toBeGreaterThan(0)
  })
})
