import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { simularTela } from '@/test/matchMedia'
import { RotasApp } from '@/ui/rotas'
import { AppShell } from './AppShell'

function abrir(caminho = '/') {
  return render(
    <MemoryRouter initialEntries={[caminho]}>
      <AppShell>
        <RotasApp />
      </AppShell>
    </MemoryRouter>,
  )
}

const ROTULOS_MENU = [
  'Visão geral',
  'Mapa corporal',
  'Avaliação de saúde',
  'Exames laboratoriais',
  'ORBITA IA',
  'Relatórios',
  'Rotina da missão',
  'Tripulação',
  'Sono e óculos Orbit',
  'Riscos espaciais',
  'Missão: Saúde em Dia',
  'Perfil e privacidade',
]

describe('AppShell no celular (390 px)', () => {
  beforeEach(() => simularTela(390))

  it('mostra a barra inferior com 4 atalhos e nenhum menu fixo', () => {
    abrir()
    const barra = screen.getByRole('navigation', { name: 'Atalhos' })
    const atalhos = within(barra).getAllByRole('link')
    expect(atalhos.map((a) => a.textContent)).toEqual(['Início', 'Mapa', 'Avaliar', 'IA'])
    expect(screen.queryByRole('navigation', { name: 'Navegação principal' })).not.toBeInTheDocument()
  })

  it('o logo e o ícone de menu abrem a gaveta com os 12 itens, e o item fecha a gaveta', () => {
    abrir()
    const abridores = screen.getAllByRole('button', { name: 'Abrir menu' })
    expect(abridores).toHaveLength(2)
    fireEvent.click(abridores[1]!)

    const gaveta = screen.getByRole('dialog', { name: 'Menu' })
    const itens = within(within(gaveta).getByRole('navigation', { name: 'Navegação principal' })).getAllByRole('link')
    expect(itens.map((i) => i.textContent)).toEqual(ROTULOS_MENU)
    expect(within(gaveta).getByText('Offline: funcionando localmente')).toBeInTheDocument()
    expect(within(gaveta).getByText('Comunicação com o solo: sem contato')).toBeInTheDocument()

    fireEvent.click(within(gaveta).getByRole('link', { name: 'Mapa corporal' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Mapa corporal')
  })

  it('destaca o item atual do menu e do rodapé de atalhos', () => {
    abrir('/mapa')
    expect(within(screen.getByRole('navigation', { name: 'Atalhos' })).getByRole('link', { name: 'Mapa' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('o sino leva às notificações', () => {
    abrir()
    expect(screen.getByRole('link', { name: 'Notificações' })).toHaveAttribute('href', '/notificacoes')
  })

  it('troca o idioma pelo botão do cabeçalho', () => {
    abrir()
    fireEvent.click(screen.getByRole('button', { name: 'Trocar o idioma para inglês' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Overview')
    expect(within(screen.getByRole('navigation', { name: 'Shortcuts' })).getByRole('link', { name: 'Home' })).toBeInTheDocument()
  })
})

describe('AppShell no tablet e no laptop', () => {
  it('tablet em retrato: menu fixo recolhido, só ícones com rótulo acessível, sem barra inferior', () => {
    simularTela(768, 'portrait')
    abrir()
    expect(screen.queryByRole('navigation', { name: 'Atalhos' })).not.toBeInTheDocument()
    const menu = screen.getByRole('navigation', { name: 'Navegação principal' })
    const itens = within(menu).getAllByRole('link')
    expect(itens).toHaveLength(12)
    expect(itens.map((i) => i.getAttribute('aria-label'))).toEqual(ROTULOS_MENU)
    expect(itens[0]).toHaveTextContent('')
  })

  it('tablet em paisagem: menu fixo aberto, e o botão recolhe e expande', () => {
    simularTela(1024, 'landscape')
    abrir()
    const menu = screen.getByRole('navigation', { name: 'Navegação principal' })
    expect(within(menu).getByText('Visão geral')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Recolher menu' }))
    expect(within(menu).queryByText('Visão geral')).not.toBeInTheDocument()
    expect(within(menu).getAllByRole('link')[0]).toHaveAttribute('aria-label', 'Visão geral')
    fireEvent.click(screen.getByRole('button', { name: 'Expandir menu' }))
    expect(within(menu).getByText('Visão geral')).toBeInTheDocument()
  })

  it('laptop (1366 px): menu fixo aberto com os 12 itens, o atual destacado, sem barra inferior', () => {
    simularTela(1366, 'landscape')
    abrir('/relatorios')
    expect(screen.queryByRole('navigation', { name: 'Atalhos' })).not.toBeInTheDocument()
    const menu = screen.getByRole('navigation', { name: 'Navegação principal' })
    const itens = within(menu).getAllByRole('link')
    expect(itens.map((i) => i.textContent)).toEqual(ROTULOS_MENU)
    expect(within(menu).getByRole('link', { name: 'Relatórios' })).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByRole('button', { name: 'Abrir menu' })).not.toBeInTheDocument()
  })
})

describe('AppShell em modo de exibição e na entrada', () => {
  beforeEach(() => simularTela(1920, 'landscape'))

  it('/painel não tem menu nem barra inferior, e oferece a saída do modo de exibição', () => {
    const { container } = abrir('/painel')
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    expect(container.querySelector('[data-exibicao="true"]')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Painel da missão')

    fireEvent.click(screen.getByRole('link', { name: 'Sair do modo de exibição' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Visão geral')
  })

  it('a tecla Esc sai do modo de exibição', () => {
    abrir('/painel')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Visão geral')
  })

  it('cadastro e abertura aparecem sem moldura', () => {
    abrir('/cadastro')
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    expect(screen.queryByRole('banner')).not.toBeInTheDocument()
  })
})
