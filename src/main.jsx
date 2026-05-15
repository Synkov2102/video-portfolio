import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import logoUrl from '@/assets/logo.svg'
import '@/app/styles/globals.css'
import { WithProviders } from '@/app/providers/WithProviders'
import { AppRouter } from '@/app/router/AppRouter'

const faviconLink = document.querySelector('link[rel="icon"]')
if (faviconLink) {
  faviconLink.href = logoUrl
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WithProviders>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </WithProviders>
  </StrictMode>,
)
