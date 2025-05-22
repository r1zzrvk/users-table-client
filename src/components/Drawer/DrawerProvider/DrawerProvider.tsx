import { DrawerContext } from '@contexts'
import { DrawerContextValue } from '@types'
import { useMemo, type ReactNode } from 'react'

type ProviderProps = {
  children: ReactNode
  value: DrawerContextValue
}

export const DrawerProvider = ({ children, value }: ProviderProps) => {
  const { action, onClose, open, user, loading, error, onSubmit, actionLoading } = value

  const contextValue = useMemo(
    () => ({
      action,
      error,
      user,
      open,
      loading,
      actionLoading,
      onClose,
      onSubmit,
    }),
    [action, onClose, open, user, loading, error, actionLoading, onSubmit],
  )

  return <DrawerContext.Provider value={contextValue}>{children}</DrawerContext.Provider>
}
