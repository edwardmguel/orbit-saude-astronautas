import { useSyncExternalStore } from 'react'

/**
 * Faixas de tela do docs/18, 2.11. A tela grande (1920 px ou mais) usa o layout de laptop,
 * exceto na Visão geral em modo de exibição.
 */
export type Faixa = 'celular' | 'tablet' | 'laptop'

const CONSULTA_TABLET = '(min-width: 768px)'
const CONSULTA_LAPTOP = '(min-width: 1280px)'
const CONSULTA_RETRATO = '(orientation: portrait)'

function casa(consulta: string): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(consulta).matches
    : false
}

function lerFaixa(): Faixa {
  if (casa(CONSULTA_LAPTOP)) return 'laptop'
  if (casa(CONSULTA_TABLET)) return 'tablet'
  return 'celular'
}

function assinar(avisar: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {}
  const listas = [CONSULTA_TABLET, CONSULTA_LAPTOP].map((consulta) => window.matchMedia(consulta))
  listas.forEach((lista) => lista.addEventListener('change', avisar))
  return () => listas.forEach((lista) => lista.removeEventListener('change', avisar))
}

export function useFaixa(): Faixa {
  return useSyncExternalStore(assinar, lerFaixa, () => 'celular')
}

/** Tablet em retrato abre com o menu recolhido; em paisagem e no laptop, aberto (docs/18, 2.11). */
export function menuRecolhidoPorPadrao(): boolean {
  return lerFaixa() === 'tablet' && casa(CONSULTA_RETRATO)
}
