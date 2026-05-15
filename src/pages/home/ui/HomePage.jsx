import { VideoGrid } from '@/widgets/video-grid'
import { videos } from '@/entities/video/model/videos'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <section className={styles.root} aria-label="Видео">
      <VideoGrid videos={videos} />
    </section>
  )
}
