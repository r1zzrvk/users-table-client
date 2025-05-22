import { TableContextValue } from '@types'
import { createContext, useContext } from 'react'

export const TableContext = createContext<TableContextValue | null>(null)

export const useTableContext = (): TableContextValue => {
  const context = useContext(TableContext)

  if (!context) throw new Error('useTableContext must be inside TableProvider')

  return context
}
