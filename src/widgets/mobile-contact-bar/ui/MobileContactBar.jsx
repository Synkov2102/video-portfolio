import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import TelegramIcon from '@mui/icons-material/Telegram'
import { contacts } from '@/shared/config/contacts'
import styles from './MobileContactBar.module.css'

export function MobileContactBar() {
  return (
    <nav className={styles.bar} aria-label="Связаться">
      <a
        className={`${styles.btn} ${styles.btnPrimary}`}
        href={contacts.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TelegramIcon className={styles.btnIcon} aria-hidden />
        <span>Написать</span>
      </a>
      <a className={`${styles.btn} ${styles.btnSecondary}`} href={`tel:${contacts.phone}`}>
        <PhoneOutlinedIcon className={styles.btnIcon} aria-hidden />
        <span>Позвонить</span>
      </a>
    </nav>
  )
}
