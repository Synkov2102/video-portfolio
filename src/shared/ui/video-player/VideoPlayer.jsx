import { useEffect, useRef, useState } from 'react'
import styles from './VideoPlayer.module.css'

function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

/**
 * @param {{ loadSrc: () => Promise<string>, poster?: string, fillHeight?: boolean }} props
 */
export function VideoPlayer({ loadSrc, poster, fillHeight = false }) {
  const ref = useRef(/** @type {HTMLVideoElement | null} */ (null))
  const [src, setSrc] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setSrc(null)
    setError(false)

    loadSrc()
      .then((url) => {
        if (!cancelled) setSrc(url)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })

    return () => {
      cancelled = true
    }
  }, [loadSrc])

  useEffect(() => {
    const el = ref.current
    if (!el || !src) return

    void el.play().catch(() => {})

    return () => {
      el.pause()
    }
  }, [src])

  return (
    <div className={cn(styles.shell, fillHeight && styles.shellFill)}>
      {poster && !src ? (
        <img src={poster} alt="" className={styles.poster} aria-hidden />
      ) : null}
      {error ? <p className={styles.fallback}>Не удалось загрузить видео</p> : null}
      {src ? (
        <video
          ref={ref}
          className={styles.video}
          src={src}
          poster={poster}
          muted
          controls
          playsInline
          preload="auto"
        />
      ) : null}
    </div>
  )
}
