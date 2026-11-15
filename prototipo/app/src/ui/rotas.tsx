import type { ComponentType } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { M01Cadastro } from '@/ui/screens/m01-cadastro'
import { M02Inicializacao } from '@/ui/screens/m02-inicializacao'
import { M03VisaoGeral } from '@/ui/screens/m03-visao-geral'
import { PainelMissao } from '@/ui/screens/m03-visao-geral/PainelMissao'
import { M04Avaliacao } from '@/ui/screens/m04-avaliacao'
import { M05Mapa } from '@/ui/screens/m05-mapa'
import { M06Regiao } from '@/ui/screens/m06-regiao'
import { M07Detalhe } from '@/ui/screens/m07-detalhe'
import { M08Exames } from '@/ui/screens/m08-exames'
import { M09Ia } from '@/ui/screens/m09-ia'
import { M10Relatorios } from '@/ui/screens/m10-relatorios'
import { M11Rotina } from '@/ui/screens/m11-rotina'
import { M12Missao } from '@/ui/screens/m12-missao'
import { M13Riscos } from '@/ui/screens/m13-riscos'
import { M14Notificacoes } from '@/ui/screens/m14-notificacoes'
import { M15Perfil } from '@/ui/screens/m15-perfil'
import { M16Tripulacao } from '@/ui/screens/m16-tripulacao'
import { M17Sono } from '@/ui/screens/m17-sono'

/**
 * Moldura de cada rota: `completa` tem cabeçalho e menu, `exibicao` é o painel da
 * missão sem menu (docs/18, 2.11), `nenhuma` é a entrada do app (cadastro e abertura).
 */
export type Moldura = 'completa' | 'exibicao' | 'nenhuma'

export interface Rota {
  /** Padrão do React Router, por exemplo `/mapa/:regiao`. */
  caminho: string
  /** Chave de i18n do título da tela (também o rótulo do item de menu). */
  chaveTitulo: string
  /** Código da tela no inventário do docs/18: M01 a M17. */
  codigo: string
  moldura: Moldura
  Tela: ComponentType
}

// Rotas do plano técnico, seção 3.3. Uma entrada por caminho; o menu usa a primeira de cada código.
export const ROTAS: readonly Rota[] = [
  { caminho: '/', chaveTitulo: 'm03.titulo', codigo: 'M03', moldura: 'completa', Tela: M03VisaoGeral },
  { caminho: '/painel', chaveTitulo: 'm03.tituloPainel', codigo: 'M03', moldura: 'exibicao', Tela: PainelMissao },
  { caminho: '/cadastro', chaveTitulo: 'm01.titulo', codigo: 'M01', moldura: 'nenhuma', Tela: M01Cadastro },
  { caminho: '/inicio', chaveTitulo: 'm02.titulo', codigo: 'M02', moldura: 'nenhuma', Tela: M02Inicializacao },
  { caminho: '/avaliacao', chaveTitulo: 'm04.titulo', codigo: 'M04', moldura: 'completa', Tela: M04Avaliacao },
  { caminho: '/mapa', chaveTitulo: 'm05.titulo', codigo: 'M05', moldura: 'completa', Tela: M05Mapa },
  { caminho: '/mapa/:regiao', chaveTitulo: 'm06.titulo', codigo: 'M06', moldura: 'completa', Tela: M06Regiao },
  { caminho: '/indicador/:id', chaveTitulo: 'm07.titulo', codigo: 'M07', moldura: 'completa', Tela: M07Detalhe },
  { caminho: '/alerta/:id', chaveTitulo: 'm07.titulo', codigo: 'M07', moldura: 'completa', Tela: M07Detalhe },
  { caminho: '/exames', chaveTitulo: 'm08.titulo', codigo: 'M08', moldura: 'completa', Tela: M08Exames },
  { caminho: '/ia', chaveTitulo: 'm09.titulo', codigo: 'M09', moldura: 'completa', Tela: M09Ia },
  { caminho: '/relatorios', chaveTitulo: 'm10.titulo', codigo: 'M10', moldura: 'completa', Tela: M10Relatorios },
  { caminho: '/rotina', chaveTitulo: 'm11.titulo', codigo: 'M11', moldura: 'completa', Tela: M11Rotina },
  { caminho: '/missao', chaveTitulo: 'm12.titulo', codigo: 'M12', moldura: 'completa', Tela: M12Missao },
  { caminho: '/riscos', chaveTitulo: 'm13.titulo', codigo: 'M13', moldura: 'completa', Tela: M13Riscos },
  { caminho: '/notificacoes', chaveTitulo: 'm14.titulo', codigo: 'M14', moldura: 'completa', Tela: M14Notificacoes },
  { caminho: '/perfil', chaveTitulo: 'm15.titulo', codigo: 'M15', moldura: 'completa', Tela: M15Perfil },
  { caminho: '/tripulacao', chaveTitulo: 'm16.titulo', codigo: 'M16', moldura: 'completa', Tela: M16Tripulacao },
  { caminho: '/sono', chaveTitulo: 'm17.titulo', codigo: 'M17', moldura: 'completa', Tela: M17Sono },
]

/** Caminho que o menu e os atalhos usam para abrir uma tela pelo código (M03, M05, ...). */
export function caminhoDoCodigo(codigo: string): string {
  const rota = ROTAS.find((r) => r.codigo === codigo)
  return rota ? rota.caminho : '/'
}

/** Declara todas as rotas. Vai dentro de um roteador e do AppShell (ver `App.tsx`). */
export function RotasApp() {
  return (
    <Routes>
      {ROTAS.map(({ caminho, Tela }) => (
        <Route key={caminho} path={caminho} element={<Tela />} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
