/**
 * Marcador PROVISÓRIO do ícone ORBITA (órbita em volta de um ponto). Não é o logo oficial:
 * quando a equipe entregar o ícone oficial, ele substitui este componente.
 */
export function MarcadorOrbita({ tamanho = 28 }: { tamanho?: number }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="shrink-0 text-primary"
    >
      <ellipse
        cx="16"
        cy="16"
        rx="12"
        ry="5"
        transform="rotate(-25 16 16)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="16" cy="16" r="4.5" fill="currentColor" />
    </svg>
  )
}
