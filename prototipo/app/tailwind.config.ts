import type { Config } from 'tailwindcss'

// Pontos de quebra de docs/18, seção 2.11: celular é o padrão (360 a 430 px),
// sm 360 px, md 768 px (tablet), lg 1280 px (laptop), xl 1920 px (tela grande).
// Cores por variável CSS (src/ui/tokens.css), para o modo noturno trocar tudo.
const estado = (nome: string) => ({
  DEFAULT: `var(--estado-${nome})`,
  bg: `var(--estado-${nome}-bg)`,
})

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '360px',
      md: '768px',
      lg: '1280px',
      xl: '1920px',
    },
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        primary: 'var(--primary)',
        'primary-2': 'var(--primary-2)',
        'estado-sem-dado': estado('sem-dado'),
        'estado-normal': estado('normal'),
        'estado-atencao': estado('atencao'),
        'estado-alerta': estado('alerta'),
        'estado-critico': estado('critico'),
      },
      borderColor: { DEFAULT: 'var(--border)' },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        numero: ['var(--fs-numero)', { lineHeight: '1.1' }],
        titulo: ['var(--fs-titulo)', { lineHeight: '1.25' }],
        rotulo: ['var(--fs-rotulo)', { lineHeight: '1.3' }],
        texto: ['var(--fs-texto)', { lineHeight: '1.5' }],
        selo: ['12px', { lineHeight: '1.3' }],
      },
      borderRadius: {
        cartao: 'var(--raio-cartao)',
        elemento: 'var(--raio-elemento)',
        folha: 'var(--raio-folha)',
      },
      boxShadow: {
        folha: 'var(--sombra-folha)',
        foco: 'var(--brilho-foco)',
      },
      keyframes: {
        'folha-sobe': { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
        'folha-lateral': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        gaveta: { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
      },
      animation: {
        'folha-sobe': 'folha-sobe var(--duracao-painel) ease-out',
        'folha-lateral': 'folha-lateral var(--duracao-painel) ease-out',
        gaveta: 'gaveta var(--duracao-painel) ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config
