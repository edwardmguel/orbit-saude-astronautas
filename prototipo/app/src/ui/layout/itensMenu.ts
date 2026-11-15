import {
  Bot,
  ChartLine,
  ClipboardCheck,
  House,
  ListChecks,
  Moon,
  PersonStanding,
  ShieldAlert,
  TestTube,
  Trophy,
  UserCog,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ROTAS, caminhoDoCodigo } from '@/ui/rotas'

export interface ItemMenu {
  codigo: string
  caminho: string
  chaveTitulo: string
  Icone: LucideIcon
}

/** Os 12 itens do menu M18, na ordem do docs/19, seção 7. Notificações (M14) ficam no sino. */
const ORDEM: ReadonlyArray<{ codigo: string; Icone: LucideIcon }> = [
  { codigo: 'M03', Icone: House },
  { codigo: 'M05', Icone: PersonStanding },
  { codigo: 'M04', Icone: ClipboardCheck },
  { codigo: 'M08', Icone: TestTube },
  { codigo: 'M09', Icone: Bot },
  { codigo: 'M10', Icone: ChartLine },
  { codigo: 'M11', Icone: ListChecks },
  { codigo: 'M16', Icone: Users },
  { codigo: 'M17', Icone: Moon },
  { codigo: 'M13', Icone: ShieldAlert },
  { codigo: 'M12', Icone: Trophy },
  { codigo: 'M15', Icone: UserCog },
]

export const ITENS_MENU: readonly ItemMenu[] = ORDEM.map(({ codigo, Icone }) => ({
  codigo,
  Icone,
  caminho: caminhoDoCodigo(codigo),
  chaveTitulo: ROTAS.find((rota) => rota.codigo === codigo)?.chaveTitulo ?? '',
}))
