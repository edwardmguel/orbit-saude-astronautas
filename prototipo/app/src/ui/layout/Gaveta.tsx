import { useT } from '@/i18n'
import { useDialogo } from '@/ui/components/useDialogo'
import { SideMenu } from './SideMenu'

export interface GavetaProps {
  aberta: boolean
  onFechar: () => void
}

/** Gaveta do menu M18 no celular: desliza da esquerda sobre a tela escurecida (docs/18, M18). */
export function Gaveta({ aberta, onFechar }: GavetaProps) {
  const { t } = useT()
  const painel = useDialogo<HTMLDivElement>(aberta, onFechar)

  if (!aberta) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" onClick={onFechar} />
      <div
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-label={t('navegacao.menu')}
        tabIndex={-1}
        className="absolute inset-y-0 left-0"
      >
        <SideMenu variante="gaveta" onFechar={onFechar} />
      </div>
    </div>
  )
}
