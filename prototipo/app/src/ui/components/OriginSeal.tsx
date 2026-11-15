import { Cpu, Database, FlaskConical, Glasses, PencilLine, Radio, TestTube } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useT } from '@/i18n'

/** Campo `origem` da `Leitura` (docs/06, 2.5; selos em docs/18, 2.7 e docs/19, seção 16). */
export type Origem = 'simulada' | 'manual' | 'automatica' | 'exame' | 'historica' | 'ao_vivo'

const ICONES: Record<Origem, { Icone: LucideIcon; nome: string }> = {
  simulada: { Icone: FlaskConical, nome: 'FlaskConical' },
  manual: { Icone: PencilLine, nome: 'PencilLine' },
  automatica: { Icone: Cpu, nome: 'Cpu' },
  exame: { Icone: TestTube, nome: 'TestTube' },
  historica: { Icone: Database, nome: 'Database' },
  ao_vivo: { Icone: Radio, nome: 'Radio' },
}

export interface OriginSealProps {
  origem: Origem
  /** Data do dado gravado, só para `historica`: aparece como "Real gravado 15/11". */
  data?: string
  /** Dado do óculos Orbit (proposto): selo extra "simulado · experimental". */
  proposto?: boolean
}

/** Selo neutro de origem do dado: nunca usa cor de estado (docs/18, 2.7). */
export function OriginSeal({ origem, data, proposto = false }: OriginSealProps) {
  const { t } = useT()
  const { Icone, nome } = proposto ? { Icone: Glasses, nome: 'Glasses' } : ICONES[origem]
  const base = proposto ? t('comum.origem.oculos') : t(`comum.origem.${origem}`)
  const texto = !proposto && origem === 'historica' && data ? `${base} ${data}` : base

  return (
    <span
      data-origem={proposto ? 'oculos' : origem}
      className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2 py-0.5 text-selo font-medium text-muted"
    >
      <Icone data-icone={nome} aria-hidden="true" size={12} />
      <span>{texto}</span>
    </span>
  )
}
