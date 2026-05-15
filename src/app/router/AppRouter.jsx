import { Route, Routes } from 'react-router-dom'
import { AboutPage } from '@/pages/about'
import { HomePage } from '@/pages/home'
import { PricesPage } from '@/pages/prices'
import { MainLayout } from '@/widgets/main-layout'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/prices" element={<PricesPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}
