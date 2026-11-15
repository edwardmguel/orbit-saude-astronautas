import { PanelLeftClose, PanelLeftOpen, Satellite, WifiOff, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useT } from '@/i18n'
import { MarcadorOrbita } from '@/ui/components/MarcadorOrbita'
import { ITENS_MENU } from './itensMenu'

export interface SideMenuProps {
  /** `gaveta` no celular (300 px, sobre a tela); `fixo` em tablet e laptop (240 px ou 72 px). */
  variante: 'gaveta' | 'fixo'
  /** Só no menu fixo: mostra apenas os ícones (72 px), com rótulo acessível. */
  recolhido?: boolean
  onAlternar?: () => void
  /** Fecha a gaveta: no botão X e depois de escolher um item. */
  onFechar?: () => void
}

/** Menu lateral M18: 12 itens, item atual destacado e rodapé de conectividade (docs/18, M18). */
export function SideMenu({ variante, recolhido = false, onAlternar, onFechar }: SideMenuProps) {
  const { t } = useT()
  const fixo = variante === 'fixo'
  const compacto = fixo && recolhido

  const classesBase = 'flex flex-col bg-surface'
  const classesVariante = fixo
    ? `fixed left-0 top-0 z-40 h-dvh border-r border-border transition-[width] duration-[220ms] ${
        recolhido ? 'w-[72px]' : 'w-60'
      }`
    : 'h-full w-[300px] max-w-[85vw] animate-gaveta shadow-folha'

  return (
    <aside className={`${classesBase} ${classesVariante}`}>
      <div className={`flex gap-2 px-3 py-3 ${compacto ? 'flex-col items-center' : 'items-center justify-between'}`}>
        <div className="flex items-center gap-2">
          <MarcadorOrbita />
          {compacto ? null : (
            <span className="font-display text-[15px] font-bold tracking-[0.14em]">{t('comum.marca')}</span>
          )}
        </div>
        {fixo ? (
          <button
            type="button"
            onClick={onAlternar}
            aria-label={recolhido ? t('navegacao.expandirMenu') : t('navegacao.recolherMenu')}
            aria-expanded={!recolhido}
            className="flex h-11 w-11 items-center justify-center rounded-elemento text-muted hover:bg-surface-2"
          >
            {recolhido ? (
              <PanelLeftOpen aria-hidden="true" size={20} />
            ) : (
              <PanelLeftClose aria-hidden="true" size={20} />
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={onFechar}
            aria-label={t('navegacao.fecharMenu')}
            className="flex h-11 w-11 items-center justify-center rounded-elemento text-muted hover:bg-surface-2"
          >
            <X aria-hidden="true" size={20} />
          </button>
        )}
      </div>

      <nav aria-label={t('navegacao.principal')} className="flex-1 overflow-y-auto px-2 py-1">
        <ul className="m-0 flex list-none flex-col gap-1 p-0">
          {ITENS_MENU.map(({ codigo, caminho, chaveTitulo, Icone }) => {
            const rotulo = t(chaveTitulo)
            return (
              <li key={codigo}>
                <NavLink
                  to={caminho}
                  end={caminho === '/'}
                  onClick={onFechar}
                  title={compacto ? rotulo : undefined}
                  aria-label={compacto ? rotulo : undefined}
                  className={({ isActive }) =>
                    `flex min-h-11 items-center gap-3 rounded-elemento border-l-[3px] text-texto font-medium no-underline ${
                      compacto ? 'justify-center px-0' : 'px-3'
                    } ${
                      isActive
                        ? 'border-primary bg-surface-2 text-text'
                        : 'border-transparent text-muted hover:bg-surface-2'
                    }`
                  }
                >
                  <Icone aria-hidden="true" size={20} className="shrink-0" />
                  {compacto ? null : <span>{rotulo}</span>}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-1 border-t border-border px-3 py-3 text-selo text-muted">
        {compacto ? null : <p className="m-0 font-medium text-text">{t('navegacao.rodape.identificacao')}</p>}
        <p
          className={`m-0 flex items-center gap-2 ${compacto ? 'justify-center' : ''}`}
          title={t('navegacao.rodape.offline')}
        >
          <WifiOff aria-hidden="true" size={14} className="shrink-0" />
          <span className={compacto ? 'sr-only' : ''}>{t('navegacao.rodape.offline')}</span>
        </p>
        <p
          className={`m-0 flex items-center gap-2 ${compacto ? 'justify-center' : ''}`}
          title={t('navegacao.rodape.solo')}
        >
          <Satellite aria-hidden="true" size={14} className="shrink-0" />
          <span className={compacto ? 'sr-only' : ''}>{t('navegacao.rodape.solo')}</span>
        </p>
      </div>
    </aside>
  )
}
