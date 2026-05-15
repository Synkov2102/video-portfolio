import { createTheme } from '@mui/material/styles'

const serif = '"Cormorant Garamond", "Times New Roman", serif'
const sans = '"Manrope", system-ui, -apple-system, sans-serif'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E1C18',
      light: '#3D3933',
      dark: '#0F0E0C',
      contrastText: '#FAF7F1',
    },
    secondary: {
      main: '#A3845B',
      light: '#BFA078',
      dark: '#7E6342',
      contrastText: '#FAF7F1',
    },
    background: {
      default: '#F2EFE8',
      paper: '#FBF8F2',
    },
    text: {
      primary: '#1E1C18',
      secondary: '#6B655C',
    },
    divider: 'rgba(30, 28, 24, 0.08)',
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    fontFamily: sans,
    fontWeightLight: 300,
    h1: {
      fontFamily: serif,
      fontWeight: 500,
      fontSize: 'clamp(2.75rem, 6vw, 4.25rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: serif,
      fontWeight: 500,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: serif,
      fontWeight: 500,
      fontSize: 'clamp(1.65rem, 3vw, 2.25rem)',
      lineHeight: 1.15,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: serif,
      fontWeight: 500,
      fontSize: '1.75rem',
      lineHeight: 1.2,
    },
    h5: {
      fontFamily: serif,
      fontWeight: 500,
      fontSize: '1.35rem',
      lineHeight: 1.25,
    },
    h6: {
      fontFamily: serif,
      fontWeight: 500,
      fontSize: '1.2rem',
      lineHeight: 1.3,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.65,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.75,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.9375rem',
      lineHeight: 1.7,
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      fontWeight: 500,
    },
    button: {
      fontFamily: sans,
      fontWeight: 600,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      fontSize: '0.6875rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F2EFE8',
        },
        '::selection': {
          backgroundColor: 'rgba(163, 132, 91, 0.28)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 'max(24px, env(safe-area-inset-left))',
          paddingRight: 'max(24px, env(safe-area-inset-right))',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '12px 28px',
        },
        text: {
          minWidth: 0,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
  },
})
