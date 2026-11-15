import { useT } from '@/i18n'

/** Conteúdo provisório de uma tela: só o título e um aviso neutro de tela em construção. */
export function TelaProvisoria({ chaveTitulo }: { chaveTitulo: string }) {
  const { t } = useT()
  return (
    <section>
      <h1 className="font-display text-titulo font-bold">{t(chaveTitulo)}</h1>
      <p className="mt-2 text-texto text-muted">{t('comum.emConstrucao')}</p>
    </section>
  )
}
