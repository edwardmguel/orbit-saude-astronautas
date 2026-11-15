import { CircleAlert, CircleCheck, CircleHelp, CircleX, OctagonX } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useT } from '@/i18n'

/** Níveis de estado de interface (docs/18, 2.2): 0 cinza, 1 verde, 2 amarelo, 3 laranja, 4 vermelho. */
export type NivelEstado = 0 | 1 | 2 | 3 | 4

interface Aparencia {
  Icone: LucideIcon
  nomeIcone: string
  /** Classes completas (o Tailwind só gera o que aparece escrito por inteiro). */
  classes: string
}

const APARENCIA: Record<NivelEstado, Aparencia> = {
  0: {
    Icone: CircleHelp,
    nomeIcone: 'CircleHelp',
    classes: 'border-dashed border-estado-sem-dado bg-estado-sem-dado-bg text-estado-sem-dado',
  },
  1: {
    Icone: CircleCheck,
    nomeIcone: 'CircleCheck',
    classes: 'border-solid border-estado-normal bg-estado-normal-bg text-estado-normal',
  },
  2: {
    Icone: CircleAlert,
    nomeIcone: 'CircleAlert',
    classes: 'border-solid border-estado-atencao bg-estado-atencao-bg text-estado-atencao',
  },
  3: {
    Icone: CircleX,
    nomeIcone: 'CircleX',
    classes: 'border-solid border-estado-alerta bg-estado-alerta-bg text-estado-alerta',
  },
  4: {
    Icone: OctagonX,
    nomeIcone: 'OctagonX',
    classes: 'border-solid border-estado-critico bg-estado-critico-bg text-estado-critico',
  },
}

const FUNDO_DO_ICONE: Record<NivelEstado, string> = {
  0: 'var(--estado-sem-dado-bg)',
  1: 'var(--estado-normal-bg)',
  2: 'var(--estado-atencao-bg)',
  3: 'var(--estado-alerta-bg)',
  4: 'var(--estado-critico-bg)',
}

export interface StatusBadgeProps {
  nivel: NivelEstado
  /** Substitui o rótulo do nível (por exemplo "Saúde: atenção · 3 indicadores"). */
  texto?: string
  /**
   * Forma compacta (docs/18, 2.2): ícone mais palavra curta, sem o prefixo "Saúde:".
   * `soIcone` mostra só o ícone; o rótulo completo vai para o nome acessível.
   */
  compacto?: boolean
  soIcone?: boolean
}

/**
 * Selo de estado: cor, ícone e palavra juntos (a cor nunca vale sozinha). Não pisca nem anima,
 * para não imitar o alarme da estação (docs/18, P8). O nível 0 usa borda tracejada.
 */
export function StatusBadge({ nivel, texto, compacto = false, soIcone = false }: StatusBadgeProps) {
  const { t } = useT()
  const { Icone, nomeIcone, classes } = APARENCIA[nivel]
  const rotuloCompleto = texto ?? t(`comum.estado.${nivel}.rotulo`)
  const palavra = texto ?? (compacto ? t(`comum.estado.${nivel}.curto`) : rotuloCompleto)

  return (
    <span
      data-nivel={nivel}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-selo font-semibold ${classes}`}
      {...(soIcone ? { role: 'img', 'aria-label': rotuloCompleto, title: rotuloCompleto } : {})}
    >
      <Icone
        data-icone={nomeIcone}
        aria-hidden="true"
        size={16}
        fill="currentColor"
        stroke={FUNDO_DO_ICONE[nivel]}
      />
      {soIcone ? null : <span>{palavra}</span>}
    </span>
  )
}
