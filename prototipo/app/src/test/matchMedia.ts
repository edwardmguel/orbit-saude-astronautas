/**
 * jsdom não implementa `matchMedia`. Este auxiliar simula uma tela de `largura` px
 * (e orientação) para testar o que muda por ponto de quebra.
 */
export function simularTela(largura: number, orientacao: 'portrait' | 'landscape' = 'portrait'): void {
  window.matchMedia = ((consulta: string) => {
    const minimo = /\(min-width:\s*(\d+)px\)/.exec(consulta)
    const retrato = consulta.includes('orientation: portrait')
    const paisagem = consulta.includes('orientation: landscape')
    const matches = minimo
      ? largura >= Number(minimo[1])
      : retrato
        ? orientacao === 'portrait'
        : paisagem
          ? orientacao === 'landscape'
          : false
    return {
      matches,
      media: consulta,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList
  }) as typeof window.matchMedia
}
