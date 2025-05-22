import { useColorScheme } from '@mui/material'
import type { CSSObject } from '@mui/system'
import { useColors } from './useColors'

export const useScrollStyle = (): Pick<CSSObject, 'scrollbarWidth' | 'scrollbarColor'> => {
  const { mode } = useColorScheme()
  const { grey } = useColors()
  const isDarkMode = mode === 'dark'
  const scrollColor = isDarkMode ? `${grey[300]}  ${grey[900]}` : `${grey[500]} ${grey[100]}`

  return {
    scrollbarWidth: 'thin',
    scrollbarColor: scrollColor,
  }
}
