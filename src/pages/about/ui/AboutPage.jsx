import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cardReveal, heroItem, heroStagger } from '@/shared/lib/motionPresets'
import styles from './AboutPage.module.css'

const blocks = [
  {
    id: 'atmosphere',
    body: (
      <>
        Во время съёмки я создаю спокойную и лёгкую атмосферу, где вы можете просто быть рядом друг с другом,
        проживать свой день и наслаждаться моментом.
      </>
    ),
  },
  {
    id: 'gear',
    body: (
      <>
        Снимаю как на iPhone, так и на профессиональную камеру — всё зависит от ваших пожеланий, формата съёмки и
        бюджета.
      </>
    ),
    variant: 'gear',
  },
  {
    id: 'style',
    body: (
      <>
        Каждая история уникальна, и для меня важно подобрать именно тот стиль, который передаст настроение вашего дня.
      </>
    ),
  },
]

export function AboutPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={styles.page}>
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

      <div className={styles.flow}>
        {blocks.map((block, index) => {
          if (block.variant === 'gear') {
            return (
              <motion.section
                key={block.id}
                className={styles.gear}
                aria-label="Техника"
                {...cardReveal(prefersReducedMotion, index + 1)}
              >
                <div className={styles.gearLabels} aria-hidden="true">
                  <span className={styles.gearPill}>iPhone</span>
                  <span className={styles.gearPlus}>+</span>
                  <span className={styles.gearPill}>Камера</span>
                </div>
                <p className={styles.gearText}>{block.body}</p>
              </motion.section>
            )
          }
          return (
            <motion.section key={block.id} className={styles.block} {...cardReveal(prefersReducedMotion, index + 1)}>
              <p className={styles.prose}>{block.body}</p>
            </motion.section>
          )
        })}

        <motion.section className={styles.closing} {...cardReveal(prefersReducedMotion, blocks.length + 1)}>
          <p className={styles.closingText}>
            Моя задача — сохранить те мгновения, которые спустя годы снова заставят вас почувствовать всё то же
            волнение, тепло и любовь.
          </p>
        </motion.section>
      </div>

      <motion.nav className={styles.links} aria-label="Дальше" {...cardReveal(prefersReducedMotion, 5)}>
        <Link className={styles.link} to="/">
          Смотреть видео
        </Link>
        <Link className={styles.linkSecondary} to="/prices">
          Цены
        </Link>
      </motion.nav>
    </div>
  )
}
