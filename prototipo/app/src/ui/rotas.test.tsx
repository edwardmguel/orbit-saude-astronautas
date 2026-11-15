import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { t } from '@/i18n'
import { ROTAS, RotasApp } from '@/ui/rotas'

function abrir(caminho: string) {
  return render(
    <MemoryRouter initialEntries={[caminho]}>
      <RotasApp />
    </MemoryRouter>,
  )
}

// Troca os parâmetros (`:id`, `:regiao`) por um valor de exemplo.
const comExemplo = (caminho: string) => caminho.replace(/:\w+/g, 'exemplo')

describe('rotas', () => {
  it('cobre todas as rotas do plano técnico, seção 3.3', () => {
    expect(ROTAS.map((r) => r.caminho).sort()).toEqual(
      [
        '/',
        '/painel',
        '/cadastro',
        '/inicio',
        '/avaliacao',
        '/mapa',
        '/mapa/:regiao',
        '/indicador/:id',
        '/alerta/:id',
        '/exames',
        '/ia',
        '/relatorios',
        '/rotina',
        '/missao',
        '/riscos',
        '/notificacoes',
        '/perfil',
        '/tripulacao',
        '/sono',
      ].sort(),
    )
  })

  it.each(ROTAS.map((r) => [r.caminho, r.chaveTitulo, r.codigo]))(
    '%s renderiza a tela provisória (%s, %s)',
    (caminho, chaveTitulo) => {
      abrir(comExemplo(String(caminho)))
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(t(String(chaveTitulo)))
      expect(screen.getByText(t('comum.emConstrucao'))).toBeInTheDocument()
    },
  )

  it('rota desconhecida volta para a Visão geral', () => {
    abrir('/nao-existe')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(t('m03.titulo'))
  })
})
