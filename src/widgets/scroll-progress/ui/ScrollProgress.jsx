import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import styles from './ScrollProgress.module.css'

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 420 : 72,
    damping: prefersReducedMotion ? 90 : 18,
    mass: 0.18,
  })

  return (
    <motion.div
      aria-hidden
      className={styles.root}
      style={{ scaleX }}
    />
  )
}
