import { useCallback, useState, type ReactNode } from 'react'

import { Alert, Snackbar } from '@mui/material'
import { SnackbarType } from '@types'
import { SnackbarContext } from '@contexts'

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<SnackbarType>('success')

  const showSnackbar = useCallback((msg: string, type: SnackbarType = 'success') => {
    setMessage(msg)
    setSeverity(type)
    setOpen(true)
  }, [])

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
          color={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
