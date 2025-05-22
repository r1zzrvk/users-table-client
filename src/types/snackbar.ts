export type SnackbarType = 'success' | 'error'

export type SnackbarContextValue = {
  showSnackbar: (message: string, type?: SnackbarType) => void
}
