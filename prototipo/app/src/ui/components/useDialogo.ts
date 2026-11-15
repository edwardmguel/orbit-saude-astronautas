import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

/**
 * Comportamento comum de folha e gaveta: Esc fecha, o foco vai para o painel ao abrir
 * e volta para quem o abriu ao fechar.
 */
export function useDialogo<T extends HTMLElement>(aberto: boolean, onFechar: () => void): RefObject<T> {
  const painel = useRef<T>(null)
  const aoFechar = useRef(onFechar)
  aoFechar.current = onFechar

  useEffect(() => {
    if (!aberto) return
    const anterior = document.activeElement instanceof HTMLElement ? document.activeElement : null
    painel.current?.focus()
    const teclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') aoFechar.current()
    }
    document.addEventListener('keydown', teclar)
    return () => {
      document.removeEventListener('keydown', teclar)
      anterior?.focus()
    }
  }, [aberto])

  return painel
}
