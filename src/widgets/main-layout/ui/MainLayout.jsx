import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, Outlet, useLocation } from 'react-router-dom'
import logoUrl from '@/assets/logo.svg'
import { pageTransition } from '@/shared/lib/motionPresets'
import { MobileContactBar } from '@/widgets/mobile-contact-bar'
import { ScrollProgress } from '@/widgets/scroll-progress'
import styles from './MainLayout.module.css'

const nav = [
  { label: 'Видео', to: '/' },
  { label: 'Обо мне', to: '/about' },
  { label: 'Цены', to: '/prices' },
]

export function MainLayout() {
  const { pathname } = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const pageVariants = pageTransition(prefersReducedMotion)

  return (
    <div className={styles.root}>
      <ScrollProgress />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerRow}>
            <Link className={styles.logo} to="/" aria-label="Видеограф СПБ — на главную">
              <img src={logoUrl} alt="" className={styles.logoImg} width={40} height={40} />
              <span className={styles.logoText}>Видеограф СПБ</span>
            </Link>
            <nav className={styles.nav} aria-label="Основное меню">
              {nav.map((item) => {
                const active = pathname === item.to
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ width: '100%' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerRow}>
            <span className={styles.footerCaption}>Видео</span>
            <span className={`${styles.footerCaption} ${styles.footerYear}`}>
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>

      <MobileContactBar />
    </div>
  )
}
