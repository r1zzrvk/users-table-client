import { colors } from '@mui/material'

export type Colors = typeof colors

export const useColors = (): Colors => {
  return colors
}
