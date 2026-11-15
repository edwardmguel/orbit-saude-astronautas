import { Bell, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useT } from '@/i18n'
import { MarcadorOrbita } from '@/ui/components/MarcadorOrbita'
import { caminhoDoCodigo } from '@/ui/rotas'

export interface AppHeaderProps {
  /** Só no celular: o logo e o ícone de menu abrem a gaveta. Em tablet e laptop o logo fica no menu fixo. */
  onAbrirMenu?: () => void
  menuAberto?: boolean
}

const BOTAO = 'flex h-11 min-w-11 items-center justify-center rounded-elemento px-2 text-muted hover:bg-surface-2'

/** Cabeçalho das telas internas: logo e menu (celular), idioma e sino de notificações (M14). */
export function AppHeader({ onAbrirMenu, menuAberto = false }: AppHeaderProps) {
  const { t, idioma, setIdioma } = useT()
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-1 border-b border-border bg-surface px-3">
      {onAbrirMenu ? (
        <>
          <button
            type="button"
            onClick={onAbrirMenu}
            aria-label={t('navegacao.abrirMenu')}
            aria-haspopup="dialog"
            aria-expanded={menuAberto}
            className={BOTAO}
          >
            <Menu aria-hidden="true" size={22} />
          </button>
          <button
            type="button"
            onClick={onAbrirMenu}
            aria-label={t('navegacao.abrirMenu')}
            aria-haspopup="dialog"
            aria-expanded={menuAberto}
            className="flex h-11 items-center gap-2 rounded-elemento px-1 hover:bg-surface-2"
          >
            <MarcadorOrbita />
            <span className="font-display text-[15px] font-bold tracking-[0.14em]">{t('comum.marca')}</span>
          </button>
        </>
      ) : null}
      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          onClick={() => setIdioma(idioma === 'pt-BR' ? 'en' : 'pt-BR')}
          aria-label={t('navegacao.trocarIdioma')}
          className={`${BOTAO} text-selo font-bold`}
        >
          {t('navegacao.idiomaOutro')}
        </button>
        <Link to={caminhoDoCodigo('M14')} aria-label={t('navegacao.notificacoes')} className={BOTAO}>
          <Bell aria-hidden="true" size={22} />
        </Link>
      </div>
    </header>
  )
}
