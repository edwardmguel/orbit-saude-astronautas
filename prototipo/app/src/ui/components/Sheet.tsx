import { X } from 'lucide-react'
import { useId } from 'react'
import type { ReactNode } from 'react'
import { useT } from '@/i18n'
import { useDialogo } from './useDialogo'

export interface SheetProps {
  aberto: boolean
  onFechar: () => void
  titulo: string
  children: ReactNode
}

/**
 * Folha inferior no celular (raio de 24 px no topo) e painel lateral em tablet e laptop.
 * Abre em 250 ms; com `prefers-reduced-motion` abre por corte simples.
 */
export function Sheet({ aberto, onFechar, titulo, children }: SheetProps) {
  const { t } = useT()
  const idTitulo = useId()
  const painel = useDialogo<HTMLDivElement>(aberto, onFechar)

  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" onClick={onFechar} />
      <div
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        tabIndex={-1}
        className="absolute inset-x-0 bottom-0 max-h-[85dvh] animate-folha-sobe overflow-y-auto rounded-t-folha border-t border-border-strong bg-surface p-4 shadow-folha md:inset-x-auto md:bottom-0 md:right-0 md:top-0 md:max-h-none md:w-[420px] md:animate-folha-lateral md:rounded-none md:border-l md:border-t-0"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 id={idTitulo} className="font-display text-titulo font-bold">
            {titulo}
          </h2>
          <button
            type="button"
            onClick={onFechar}
            aria-label={t('comum.fechar')}
            className="flex h-11 w-11 items-center justify-center rounded-elemento text-muted hover:bg-surface-2"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
