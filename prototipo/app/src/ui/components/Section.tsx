import { useId } from 'react'
import type { ReactNode } from 'react'

export interface SectionProps {
  /** Título de seção: rótulo em caixa alta (docs/18, 2.3). */
  titulo: string
  /** Controle opcional alinhado à direita do título (por exemplo "Ver tudo"). */
  acao?: ReactNode
  children: ReactNode
}

export function Section({ titulo, acao, children }: SectionProps) {
  const idTitulo = useId()
  return (
    <section aria-labelledby={idTitulo} className="mt-6 first:mt-0">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 id={idTitulo} className="text-rotulo font-bold uppercase tracking-[0.08em] text-muted">
          {titulo}
        </h2>
        {acao}
      </div>
      {children}
    </section>
  )
}
