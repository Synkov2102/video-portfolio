import CloseIcon from '@mui/icons-material/Close'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import { Dialog, DialogContent, Slide, useMediaQuery, useTheme } from '@mui/material'
import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { gridCardReveal } from '@/shared/lib/motionPresets'
import { VideoPlayer } from '@/shared/ui/video-player'
import styles from './VideoGrid.module.css'

function SlideUp(props) {
  return <Slide {...props} direction="up" mountOnEnter unmountOnExit />
}

function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

function canOpenPlayer(item) {
  return typeof item?.loadSrc === 'function'
}

/**
 * @param {{ videos: object[] }} props
 */
export function VideoGrid({ videos: items }) {
  const theme = useTheme()
  const fullBleedModal = useMediaQuery(theme.breakpoints.down('sm'))
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpen = useCallback((item) => {
    setActive(item)
    setDialogOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  const handleExited = useCallback(() => {
    setActive(null)
  }, [])

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.grid}>
          {items.map((item, index) => {
            const openable = canOpenPlayer(item)
            return (
              <motion.div
                key={item.id}
                {...gridCardReveal(prefersReducedMotion, index)}
                style={{ minWidth: 0 }}
              >
                <button
                  type="button"
                  disabled={!openable}
                  onClick={() => openable && handleOpen(item)}
                  aria-label={item.title ? `Открыть видео: ${item.title}` : 'Открыть видео'}
                  className={cn(styles.card, openable ? styles.cardEnabled : styles.cardDisabled)}
                >
                  {item.cover ? (
                    <img
                      src={item.cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={styles.thumb}
                    />
                  ) : (
                    <div className={styles.thumbPlaceholder} aria-hidden />
                  )}
                  <div className={styles.shade} aria-hidden />
                  {openable ? (
                    <div className={styles.playWrap}>
                      <PlayCircleOutlinedIcon className={styles.playIcon} />
                    </div>
                  ) : null}
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        fullScreen={fullBleedModal}
        maxWidth={false}
        scroll="paper"
        aria-label="Видео"
        className={cn(styles.dialog, fullBleedModal && styles.dialogFullBleed)}
        slots={prefersReducedMotion ? undefined : { transition: SlideUp }}
        slotProps={{
          backdrop: { className: styles.backdrop },
          paper: { className: cn(styles.paper, fullBleedModal && styles.paperFullBleed) },
          transition: {
            onExited: handleExited,
            ...(prefersReducedMotion
              ? {}
              : {
                  direction: 'up',
                  mountOnEnter: true,
                  unmountOnExit: true,
                }),
          },
        }}
        transitionDuration={prefersReducedMotion ? 0 : { enter: 280, exit: 200 }}
      >
        {active ? (
          <DialogContent
            className={cn(styles.dialogContent, fullBleedModal && styles.dialogContentFull)}
          >
              <div className={cn(styles.playerWrap, fullBleedModal && styles.playerWrapFull)}>
                <div className={cn(styles.modalBar, fullBleedModal && styles.modalBarFull)}>
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Закрыть"
                    className={styles.close}
                  >
                    <CloseIcon className={styles.closeIcon} />
                  </button>
                </div>
                <VideoPlayer
                  key={active.id}
                  loadSrc={active.loadSrc}
                  poster={active.cover}
                  fillHeight={fullBleedModal}
                />
              </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  )
}
