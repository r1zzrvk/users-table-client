import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import { SnackbarProvider, Header, Main } from '@components'
import { theme } from '@constants'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <Header />
        <Main />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
