import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { setIdioma } from '@/i18n'

afterEach(() => {
  setIdioma('pt-BR')
})
