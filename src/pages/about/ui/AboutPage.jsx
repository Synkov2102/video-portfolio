import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import aboutPhotoUrl from '@/assets/i.webp'
import { cardReveal, heroItem, heroStagger } from '@/shared/lib/motionPresets'
import styles from './AboutPage.module.css'

export function AboutPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div className={styles.page}>
      <motion.header
        className={styles.hero}
        variants={heroStagger(prefersReducedMotion)}
        initial="hidden"
        animate="show"
      >
        <motion.span className={styles.kicker} variants={heroItem(prefersReducedMotion)}>
          Знакомство
        </motion.span>
        <motion.h1 className={styles.title} variants={heroItem(prefersReducedMotion)}>
          Обо мне
        </motion.h1>
      </motion.header>

      <motion.section
        className={styles.opening}
        aria-label="Вступление"
        {...cardReveal(prefersReducedMotion, 0)}
      >
        <p className={styles.openingText}>
          Даже если вы никогда не были в кадре, вам не нужно переживать о том, как встать, куда смотреть или что делать
          руками. Большинство моих пар говорят перед съёмкой: «Мы не умеем позировать». И именно поэтому видео
          получается таким настоящим.
        </p>
      </motion.section>

      <motion.figure
        className={styles.photo}
        aria-label="Фото"
        {...cardReveal(prefersReducedMotion, 1)}
      >
        <img
          src={aboutPhotoUrl}
          alt=""
          className={styles.photoImg}
          loading="lazy"
          decoding="async"
        />
      </motion.figure>

      <motion.section className={styles.closing} {...cardReveal(prefersReducedMotion, 2)}>
        <p className={styles.closingText}>
          Моя задача — сохранить те мгновения, которые спустя годы снова заставят вас почувствовать всё то же
          волнение, тепло и любовь.
        </p>
      </motion.section>

      <motion.nav className={styles.links} aria-label="Дальше" {...cardReveal(prefersReducedMotion, 3)}>
        <Link className={styles.link} to="/">
          Смотреть видео
        </Link>
        <Link className={styles.linkSecondary} to="/prices">
          Цены
        </Link>
      </motion.nav>
    </motion.div>
  )
}
