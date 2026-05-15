import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/shared/config/theme'

export function WithProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
