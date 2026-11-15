import { Minimize2 } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useT } from '@/i18n'
import { caminhoDoCodigo } from '@/ui/rotas'

/**
 * Saída discreta do modo de exibição (docs/18, 2.11): botão no canto e tecla Esc voltam
 * para o layout normal da Visão geral.
 */
export function SairDoModoExibicao() {
  const { t } = useT()
  const navegar = useNavigate()

  useEffect(() => {
    const teclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') navegar(caminhoDoCodigo('M03'))
    }
    document.addEventListener('keydown', teclar)
    return () => document.removeEventListener('keydown', teclar)
  }, [navegar])

  return (
    <Link
      to={caminhoDoCodigo('M03')}
      className="fixed right-3 top-3 z-30 flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-3 text-selo font-medium text-muted no-underline hover:bg-surface-2"
    >
      <Minimize2 aria-hidden="true" size={14} />
      {t('navegacao.sairExibicao')}
    </Link>
  )
}
