import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { useT } from '@/i18n'
import { ROTAS } from '@/ui/rotas'
import type { Moldura } from '@/ui/rotas'
import { AppHeader } from './AppHeader'
import { BottomNav } from './BottomNav'
import { SairDoModoExibicao } from './DisplayMode'
import { Gaveta } from './Gaveta'
import { SideMenu } from './SideMenu'
import { menuRecolhidoPorPadrao, useFaixa } from './useFaixa'

function molduraDaRota(caminho: string): Moldura {
  const rota = ROTAS.find((r) => matchPath({ path: r.caminho, end: true }, caminho))
  return rota?.moldura ?? 'completa'
}

/**
 * Moldura do app (M18): celular com barra inferior e gaveta; tablet e laptop com menu lateral
 * fixo e recolhível; `/painel` em modo de exibição, sem menu; cadastro e abertura sem moldura.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useT()
  const { pathname } = useLocation()
  const faixa = useFaixa()
  const moldura = molduraDaRota(pathname)
  const [gavetaAberta, setGavetaAberta] = useState(false)
  const [recolhido, setRecolhido] = useState(menuRecolhidoPorPadrao)
  const principal = useRef<HTMLElement>(null)

  useEffect(() => {
    setGavetaAberta(false)
  }, [pathname, faixa])

  const celular = faixa === 'celular'

  if (moldura === 'nenhuma') {
    return (
      <div className="min-h-dvh bg-bg text-text">
        <main className="mx-auto w-full max-w-[1200px] px-4 py-4 md:px-6">{children}</main>
      </div>
    )
  }

  if (moldura === 'exibicao') {
    return (
      <div data-exibicao="true" className="min-h-dvh bg-bg text-text">
        <SairDoModoExibicao />
        <main className="w-full px-4 py-4 md:px-6">{children}</main>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-bg text-text">
      <button
        type="button"
        onClick={() => principal.current?.focus()}
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-elemento focus:bg-surface focus:px-3 focus:py-2"
      >
        {t('navegacao.pularConteudo')}
      </button>

      {celular ? null : (
        <SideMenu variante="fixo" recolhido={recolhido} onAlternar={() => setRecolhido((valor) => !valor)} />
      )}

      <div
        className={`transition-[padding-left] duration-[220ms] ${
          celular ? '' : recolhido ? 'pl-[72px]' : 'pl-60'
        }`}
      >
        <AppHeader onAbrirMenu={celular ? () => setGavetaAberta(true) : undefined} menuAberto={gavetaAberta} />
        <main
          ref={principal}
          tabIndex={-1}
          className={`mx-auto w-full px-4 py-4 md:px-6 lg:max-w-[1200px] ${
            celular ? 'pb-[calc(56px+env(safe-area-inset-bottom)+16px)]' : ''
          }`}
        >
          {children}
        </main>
      </div>

      {celular ? <BottomNav /> : null}
      {celular ? <Gaveta aberta={gavetaAberta} onFechar={() => setGavetaAberta(false)} /> : null}
    </div>
  )
}
