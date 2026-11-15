import { Clock } from 'lucide-react'
import { useT } from '@/i18n'

export interface AgeOfDataProps {
  /** Idade do dado em minutos; `null` ou ausente quando nunca houve leitura. */
  idadeMin?: number | null
}

/** Idade do dado em texto curto ("agora", "há 5 min", "há 3 h", "há 2 d"). */
export function AgeOfData({ idadeMin }: AgeOfDataProps) {
  const { t } = useT()
  let texto: string
  if (idadeMin === undefined || idadeMin === null) {
    texto = t('comum.idade.semLeitura')
  } else if (idadeMin < 1) {
    texto = t('comum.idade.agora')
  } else if (idadeMin < 60) {
    texto = t('comum.idade.min', { n: Math.round(idadeMin) })
  } else if (idadeMin < 60 * 48) {
    texto = t('comum.idade.horas', { n: Math.round(idadeMin / 60) })
  } else {
    texto = t('comum.idade.dias', { n: Math.round(idadeMin / (60 * 24)) })
  }

  return (
    <span
      title={t('comum.idade.rotulo', { valor: texto })}
      className="inline-flex items-center gap-1 text-selo font-medium text-muted"
    >
      <Clock aria-hidden="true" size={12} />
      <span>{texto}</span>
    </span>
  )
}
