import { render, screen } from '@testing-library/react'
import { StatusBadge } from './StatusBadge'
import type { NivelEstado } from './StatusBadge'

// Docs/18, 2.2: nível, token de cor, ícone Lucide e rótulo completo.
const NIVEIS: ReadonlyArray<[NivelEstado, string, string, string]> = [
  [0, 'estado-sem-dado', 'CircleHelp', 'Sem dado'],
  [1, 'estado-normal', 'CircleCheck', 'Saúde: normal'],
  [2, 'estado-atencao', 'CircleAlert', 'Saúde: atenção'],
  [3, 'estado-alerta', 'CircleX', 'Saúde: alerta, acionar CMO'],
  [4, 'estado-critico', 'OctagonX', 'Saúde: crítico, contatar CMO agora'],
]

describe('StatusBadge', () => {
  it.each(NIVEIS)('nível %i mostra cor, ícone e palavra', (nivel, token, icone, palavra) => {
    const { container } = render(<StatusBadge nivel={nivel} />)
    const selo = container.querySelector('[data-nivel]')
    expect(selo).toHaveAttribute('data-nivel', String(nivel))
    // cor: contorno, texto e fundo de selo do token do nível
    expect(selo).toHaveClass(`border-${token}`, `text-${token}`, `bg-${token}-bg`)
    // ícone
    expect(container.querySelector(`svg[data-icone="${icone}"]`)).toBeInTheDocument()
    // palavra
    expect(screen.getByText(palavra)).toBeInTheDocument()
  })

  it('só o nível 0 usa borda tracejada', () => {
    const { container } = render(
      <>
        <StatusBadge nivel={0} />
        <StatusBadge nivel={2} />
      </>,
    )
    const selos = container.querySelectorAll('[data-nivel]')
    expect(selos[0]).toHaveClass('border-dashed')
    expect(selos[1]).not.toHaveClass('border-dashed')
  })

  it('forma compacta usa a palavra curta, sem o prefixo "Saúde:"', () => {
    render(<StatusBadge nivel={2} compacto />)
    expect(screen.getByText('atenção')).toBeInTheDocument()
    expect(screen.queryByText(/Saúde:/)).not.toBeInTheDocument()
  })

  it('só o ícone guarda o rótulo completo no nome acessível', () => {
    render(<StatusBadge nivel={3} soIcone />)
    expect(screen.getByRole('img', { name: 'Saúde: alerta, acionar CMO' })).toBeInTheDocument()
  })

  it('aceita um texto próprio no lugar do rótulo', () => {
    render(<StatusBadge nivel={2} texto="Saúde: atenção · 3 indicadores" />)
    expect(screen.getByText('Saúde: atenção · 3 indicadores')).toBeInTheDocument()
  })

  it('nunca pisca nem anima (docs/18, P8)', () => {
    const { container } = render(<StatusBadge nivel={4} />)
    expect(container.innerHTML).not.toMatch(/animate|pulse|blink/)
  })
})
