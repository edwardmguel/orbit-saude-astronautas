import { DICIONARIOS, getIdioma, setIdioma, t, traduzir } from '@/i18n'
import type { Dicionario } from '@/i18n'

describe('t()', () => {
  it('traduz no idioma pedido', () => {
    expect(traduzir('m03.titulo', 'pt-BR')).toBe('Visão geral')
    expect(traduzir('m03.titulo', 'en')).toBe('Overview')
  })

  it('cai no pt-BR quando falta a chave em en', () => {
    const semChaveEmIngles: Record<'pt-BR' | 'en', Dicionario> = {
      'pt-BR': { m99: { titulo: 'Só em português' } },
      en: { m99: {} },
    }
    expect(traduzir('m99.titulo', 'en', undefined, semChaveEmIngles)).toBe('Só em português')
  })

  it('devolve a própria chave quando falta nos dois idiomas', () => {
    expect(traduzir('m99.inexistente', 'en')).toBe('m99.inexistente')
    expect(traduzir('semarea', 'pt-BR')).toBe('semarea')
  })

  it('troca variáveis e preserva marcadores sem valor', () => {
    expect(traduzir('comum.idade.min', 'pt-BR', { n: 5 })).toBe('há 5 min')
    expect(traduzir('comum.idade.min', 'en', { n: 5 })).toBe('5 min ago')
    expect(traduzir('comum.idade.min', 'pt-BR')).toBe('há {n} min')
  })

  it('usa o idioma corrente e volta ao pt-BR por padrão', () => {
    expect(getIdioma()).toBe('pt-BR')
    setIdioma('en')
    expect(t('m17.titulo')).toBe('Sleep and Orbit glasses')
  })
})

describe('dicionários', () => {
  it('toda chave de en existe em pt-BR (pt-BR é a referência)', () => {
    const faltando: string[] = []
    for (const [area, textos] of Object.entries(DICIONARIOS.en)) {
      for (const chave of Object.keys(textos)) {
        if (DICIONARIOS['pt-BR'][area]?.[chave] === undefined) faltando.push(`${area}.${chave}`)
      }
    }
    expect(faltando).toEqual([])
  })

  it('tem uma área por tela de m01 a m17, mais comum, navegacao e motor', () => {
    const esperadas = [
      'comum',
      'navegacao',
      'motor',
      ...Array.from({ length: 17 }, (_, i) => `m${String(i + 1).padStart(2, '0')}`),
    ]
    expect(Object.keys(DICIONARIOS['pt-BR']).sort()).toEqual([...esperadas].sort())
    expect(Object.keys(DICIONARIOS.en).sort()).toEqual([...esperadas].sort())
  })
})
