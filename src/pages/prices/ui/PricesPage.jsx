import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { contacts } from "@/shared/config/contacts";
import { cardReveal, heroItem, heroStagger } from "@/shared/lib/motionPresets";
import styles from "./PricesPage.module.css";

const packages = [
  {
    id: "intimate",
    name: "Камерный",
    tagline:
      "Подходит для росписи, прогулки или уютной съёмки только для вас двоих.",
    features: [
      "до 4 часов съёмки",
      "съёмка на iPhone или профессиональную камеру",
      "обсуждение локаций",
      "помощь во время съёмки",
      "цветокоррекция и монтаж 2 роликов",
    ],
    price: "24 000 ₽",
    extra: "Отдельно 1 час съёмки без пакета — 7 000 ₽",
    featured: false,
  },
  {
    id: "wedding-day",
    name: "Свадебный день",
    tagline:
      "Полноценная съёмка свадебного дня с передачей атмосферы, эмоций и самых важных моментов.",
    features: [
      "консультация по общим вопросам",
      "до 8 часов съёмки",
      "4 видео в монтаже",
      "цветокоррекция и индивидуальная атмосфера каждого ролика",
      "исходный материал для stories",
      "передача исходников через Яндекс Диск",
    ],
    price: "34 000 ₽",
    featured: true,
  },
];

const addons = [
  { name: "Второй день / отдельная церемония", price: "обсуждается" },
  { name: "Срочный монтаж", price: "обсуждается" },
];

export function PricesPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={styles.page}>
      <motion.header
        className={styles.hero}
        variants={heroStagger(prefersReducedMotion)}
        initial="hidden"
        animate="show"
      >
        <motion.span
          className={styles.kicker}
          variants={heroItem(prefersReducedMotion)}
        >
          Пакеты · СПб
        </motion.span>
        <motion.h1
          className={styles.title}
          variants={heroItem(prefersReducedMotion)}
        >
          Стоимость съёмки
        </motion.h1>
        <motion.p
          className={styles.lead}
          variants={heroItem(prefersReducedMotion)}
        >
          Каждая свадьба — особенная, поэтому формат съёмки подбирается
          индивидуально: от камерной прогулки до полноценного свадебного дня.
        </motion.p>
      </motion.header>

      <section className={styles.packages} aria-label="Пакеты съёмки">
        <motion.div
          className={styles.packageGrid}
          {...cardReveal(prefersReducedMotion, 0)}
        >
          {packages.map((plan) => (
            <article
              key={plan.id}
              className={`${styles.card} ${plan.featured ? styles.cardFeatured : ""}`}
            >
              {plan.featured ? (
                <span className={styles.badge}>Полный день</span>
              ) : null}
              <p className={styles.packageLabel}>Пакет</p>
              <h2 className={styles.cardName}>«{plan.name}»</h2>
              <p className={styles.cardDesc}>{plan.tagline}</p>

              <div className={styles.includes}>
                <h3 className={styles.includesTitle}>Что входит</h3>
                <ul className={styles.list}>
                  {plan.features.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.priceBlock}>
                <p className={styles.priceLabel}>Стоимость</p>
                <p className={styles.priceValue}>{plan.price}</p>
                {plan.extra ? (
                  <p className={styles.priceExtra}>{plan.extra}</p>
                ) : null}
              </div>
            </article>
          ))}
        </motion.div>
      </section>

      <motion.section
        className={styles.custom}
        aria-labelledby="custom-heading"
        {...cardReveal(prefersReducedMotion, 1)}
      >
        <div className={styles.customInner}>
          <h2 id="custom-heading" className={styles.customTitle}>
            Индивидуальный формат
          </h2>
          <p className={styles.customText}>
            Если вы планируете венчание, крещение, love story, контент-съёмку,
            съёмку за пределами города или хотите создать полностью
            индивидуальный формат — условия обсуждаются отдельно.
          </p>
          <p className={styles.customText}>
            Для меня важно не просто предложить пакет, а подобрать съёмку именно
            под вашу историю, атмосферу дня и ваши пожелания, чтобы видео
            получилось по-настоящему живым, красивым и вашим.
          </p>
        </div>
      </motion.section>

      <motion.section
        className={styles.section}
        aria-labelledby="addons-heading"
        {...cardReveal(prefersReducedMotion, 2)}
      >
        <h2 id="addons-heading" className={styles.sectionTitle}>
          Дополнительно
        </h2>
        <ul className={styles.addonList}>
          {addons.map((row) => (
            <li key={row.name}>
              <span>{row.name}</span>
              <span className={styles.addonPrice}>{row.price}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section
        className={styles.cta}
        aria-label="Связаться"
        {...cardReveal(prefersReducedMotion, 3)}
      >
        <h2>Обсудим ваш день</h2>
        <p>Напишите дату, город и формат — подберём съёмку под вашу историю.</p>
        <div className={styles.ctaActions}>
          <a
            className={`${styles.btn} ${styles.btnPrimary}`}
            href={contacts.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Написать в Telegram
          </a>
          <Link className={`${styles.btn} ${styles.btnGhost}`} to="/">
            Смотреть работы
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
