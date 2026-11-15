import { Bot, ClipboardCheck, House, PersonStanding } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useT } from '@/i18n'
import { caminhoDoCodigo } from '@/ui/rotas'

const ATALHOS: ReadonlyArray<{ codigo: string; chave: string; Icone: LucideIcon }> = [
  { codigo: 'M03', chave: 'navegacao.inicio', Icone: House },
  { codigo: 'M05', chave: 'navegacao.mapa', Icone: PersonStanding },
  { codigo: 'M04', chave: 'navegacao.avaliar', Icone: ClipboardCheck },
  { codigo: 'M09', chave: 'navegacao.ia', Icone: Bot },
]

/** Barra inferior do celular com 4 atalhos: Início, Mapa, Avaliar e IA (docs/18, 2.11). */
export function BottomNav() {
  const { t } = useT()
  return (
    <nav
      aria-label={t('navegacao.atalhos')}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="m-0 flex list-none p-0">
        {ATALHOS.map(({ codigo, chave, Icone }) => {
          const caminho = caminhoDoCodigo(codigo)
          return (
            <li key={codigo} className="flex-1">
              <NavLink
                to={caminho}
                end={caminho === '/'}
                className={({ isActive }) =>
                  `flex min-h-14 flex-col items-center justify-center gap-0.5 text-selo no-underline ${
                    isActive ? 'font-bold text-primary' : 'font-medium text-muted'
                  }`
                }
              >
                <Icone aria-hidden="true" size={22} />
                <span>{t(chave)}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
