import { HashRouter } from 'react-router-dom'
import { I18nProvider } from '@/i18n'
import { AppShell } from '@/ui/layout/AppShell'
import { RotasApp } from '@/ui/rotas'

/** HashRouter: abre sem servidor e no nginx sem regra extra (plano técnico, D2). */
export function App() {
  return (
    <I18nProvider>
      <HashRouter>
        <AppShell>
          <RotasApp />
        </AppShell>
      </HashRouter>
    </I18nProvider>
  )
}
