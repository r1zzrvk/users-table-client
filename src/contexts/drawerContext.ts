import { DrawerContextValue } from '@types'
import { createContext, useContext } from 'react'

export const DrawerContext = createContext<DrawerContextValue | null>(null)

export const useDrawerContext = (): DrawerContextValue => {
  const context = useContext(DrawerContext)

  if (!context) throw new Error('useDrawerContext must be inside DrawerProvider')

  return context
}
