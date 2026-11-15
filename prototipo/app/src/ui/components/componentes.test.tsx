import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { AgeOfData } from './AgeOfData'
import { OriginSeal } from './OriginSeal'
import type { Origem } from './OriginSeal'
import { Section } from './Section'
import { Sheet } from './Sheet'

describe('OriginSeal', () => {
  const ORIGENS: ReadonlyArray<[Origem, string, string]> = [
    ['simulada', 'FlaskConical', 'Simulado'],
    ['manual', 'PencilLine', 'Registrado por você'],
    ['automatica', 'Cpu', 'Equipamento (integração futura)'],
    ['exame', 'TestTube', 'Exame de laboratório'],
    ['historica', 'Database', 'Real gravado'],
    ['ao_vivo', 'Radio', 'Ao vivo'],
  ]

  it.each(ORIGENS)('%s mostra ícone e texto neutros', (origem, icone, texto) => {
    const { container } = render(<OriginSeal origem={origem} />)
    expect(screen.getByText(texto)).toBeInTheDocument()
    expect(container.querySelector(`svg[data-icone="${icone}"]`)).toBeInTheDocument()
    // selo de origem é neutro: nenhuma cor de estado
    expect(container.innerHTML).not.toMatch(/estado-/)
  })

  it('dado gravado mostra a data e o óculos mostra o selo proposto', () => {
    const { rerender } = render(<OriginSeal origem="historica" data="15/11" />)
    expect(screen.getByText('Real gravado 15/11')).toBeInTheDocument()
    rerender(<OriginSeal origem="simulada" proposto />)
    expect(screen.getByText('óculos Orbit (proposto) · simulado · experimental')).toBeInTheDocument()
  })
})

describe('AgeOfData', () => {
  it.each([
    [0, 'agora'],
    [5, 'há 5 min'],
    [180, 'há 3 h'],
    [60 * 24 * 3, 'há 3 d'],
    [null, 'Sem leitura'],
  ] as const)('idade %s min aparece como "%s"', (idadeMin, texto) => {
    render(<AgeOfData idadeMin={idadeMin} />)
    expect(screen.getByText(texto)).toBeInTheDocument()
  })
})

describe('Section', () => {
  it('liga o título à região', () => {
    render(
      <Section titulo="Monitoramento automático">
        <p>conteúdo</p>
      </Section>,
    )
    expect(screen.getByRole('region', { name: 'Monitoramento automático' })).toBeInTheDocument()
  })
})

describe('Sheet', () => {
  function Exemplo() {
    const [aberto, setAberto] = useState(true)
    return (
      <>
        <button type="button" onClick={() => setAberto(true)}>
          abrir
        </button>
        <Sheet aberto={aberto} onFechar={() => setAberto(false)} titulo="Painel de teste">
          <p>dentro da folha</p>
        </Sheet>
      </>
    )
  }

  it('abre como diálogo e fecha pelo botão e pela tecla Esc', () => {
    render(<Exemplo />)
    expect(screen.getByRole('dialog', { name: 'Painel de teste' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Fechar' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'abrir' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
