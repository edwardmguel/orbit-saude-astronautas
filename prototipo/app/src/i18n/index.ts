import { Fragment, createElement, useEffect, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import enComum from './en/comum'
import enM01 from './en/m01'
import enM02 from './en/m02'
import enM03 from './en/m03'
import enM04 from './en/m04'
import enM05 from './en/m05'
import enM06 from './en/m06'
import enM07 from './en/m07'
import enM08 from './en/m08'
import enM09 from './en/m09'
import enM10 from './en/m10'
import enM11 from './en/m11'
import enM12 from './en/m12'
import enM13 from './en/m13'
import enM14 from './en/m14'
import enM15 from './en/m15'
import enM16 from './en/m16'
import enM17 from './en/m17'
import enMotor from './en/motor'
import enNavegacao from './en/navegacao'
import ptComum from './pt-BR/comum'
import ptM01 from './pt-BR/m01'
import ptM02 from './pt-BR/m02'
import ptM03 from './pt-BR/m03'
import ptM04 from './pt-BR/m04'
import ptM05 from './pt-BR/m05'
import ptM06 from './pt-BR/m06'
import ptM07 from './pt-BR/m07'
import ptM08 from './pt-BR/m08'
import ptM09 from './pt-BR/m09'
import ptM10 from './pt-BR/m10'
import ptM11 from './pt-BR/m11'
import ptM12 from './pt-BR/m12'
import ptM13 from './pt-BR/m13'
import ptM14 from './pt-BR/m14'
import ptM15 from './pt-BR/m15'
import ptM16 from './pt-BR/m16'
import ptM17 from './pt-BR/m17'
import ptMotor from './pt-BR/motor'
import ptNavegacao from './pt-BR/navegacao'

export type Idioma = 'pt-BR' | 'en'
export const IDIOMAS: readonly Idioma[] = ['pt-BR', 'en']

/** Uma área de texto: chaves planas, com pontos permitidos (`estado.1.rotulo`). */
export type AreaTextos = Record<string, string>
/** Dicionário de um idioma: área (`comum`, `navegacao`, `motor`, `m01` a `m17`) para seus textos. */
export type Dicionario = Record<string, AreaTextos>
export type Variaveis = Record<string, string | number>

export const DICIONARIOS: Record<Idioma, Dicionario> = {
  'pt-BR': {
    comum: ptComum,
    navegacao: ptNavegacao,
    motor: ptMotor,
    m01: ptM01,
    m02: ptM02,
    m03: ptM03,
    m04: ptM04,
    m05: ptM05,
    m06: ptM06,
    m07: ptM07,
    m08: ptM08,
    m09: ptM09,
    m10: ptM10,
    m11: ptM11,
    m12: ptM12,
    m13: ptM13,
    m14: ptM14,
    m15: ptM15,
    m16: ptM16,
    m17: ptM17,
  },
  en: {
    comum: enComum,
    navegacao: enNavegacao,
    motor: enMotor,
    m01: enM01,
    m02: enM02,
    m03: enM03,
    m04: enM04,
    m05: enM05,
    m06: enM06,
    m07: enM07,
    m08: enM08,
    m09: enM09,
    m10: enM10,
    m11: enM11,
    m12: enM12,
    m13: enM13,
    m14: enM14,
    m15: enM15,
    m16: enM16,
    m17: enM17,
  },
}

const IDIOMA_PADRAO: Idioma = 'pt-BR'

function buscar(dicionario: Dicionario, chave: string): string | undefined {
  const ponto = chave.indexOf('.')
  if (ponto < 0) return undefined
  return dicionario[chave.slice(0, ponto)]?.[chave.slice(ponto + 1)]
}

function interpolar(texto: string, vars?: Variaveis): string {
  if (!vars) return texto
  return texto.replace(/\{(\w+)\}/g, (marcador, nome: string) => {
    const valor = vars[nome]
    return valor === undefined ? marcador : String(valor)
  })
}

/**
 * Tradução pura. Chave no formato `m03.titulo` (área, ponto, chave da área).
 * Faltou no idioma pedido: cai no pt-BR. Faltou nos dois: devolve a própria chave.
 */
export function traduzir(
  chave: string,
  idioma: Idioma,
  vars?: Variaveis,
  dicionarios: Record<Idioma, Dicionario> = DICIONARIOS,
): string {
  const texto = buscar(dicionarios[idioma], chave) ?? buscar(dicionarios[IDIOMA_PADRAO], chave)
  return interpolar(texto ?? chave, vars)
}

// Idioma corrente: estado do módulo, para `t()` servir também fora de componentes.
let idiomaAtual: Idioma = IDIOMA_PADRAO
const ouvintes = new Set<() => void>()

export function getIdioma(): Idioma {
  return idiomaAtual
}

export function setIdioma(idioma: Idioma): void {
  if (idioma === idiomaAtual) return
  idiomaAtual = idioma
  ouvintes.forEach((avisar) => avisar())
}

function assinar(avisar: () => void): () => void {
  ouvintes.add(avisar)
  return () => ouvintes.delete(avisar)
}

/** Fora de componentes. Dentro deles, use `useT()`. */
export function t(chave: string, vars?: Variaveis): string {
  return traduzir(chave, idiomaAtual, vars)
}

export interface TextosContexto {
  idioma: Idioma
  setIdioma: (idioma: Idioma) => void
  t: (chave: string, vars?: Variaveis) => string
}

/** Texto e idioma para componentes: renderiza de novo quando o idioma muda. */
export function useT(): TextosContexto {
  const idioma = useSyncExternalStore(assinar, getIdioma, getIdioma)
  return {
    idioma,
    setIdioma,
    t: (chave, vars) => traduzir(chave, idioma, vars),
  }
}

/** Define o idioma inicial (pt-BR por padrão) e mantém o atributo `lang` do documento em dia. */
export function I18nProvider({ idioma, children }: { idioma?: Idioma; children: ReactNode }) {
  const atual = useSyncExternalStore(assinar, getIdioma, getIdioma)
  useEffect(() => {
    if (idioma !== undefined) setIdioma(idioma)
  }, [idioma])
  useEffect(() => {
    document.documentElement.lang = atual
  }, [atual])
  return createElement(Fragment, null, children)
}
