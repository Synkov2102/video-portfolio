/** @type {[number, number, number, number]} */
export const EASE_LUX = [0.22, 1, 0.36, 1]

export function pageTransition(prefersReducedMotion) {
  const t = prefersReducedMotion ? 0.01 : 0.5
  return {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: t, ease: EASE_LUX },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -10,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.28, ease: EASE_LUX },
    },
  }
}

export function heroStagger(prefersReducedMotion) {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 1 },
      show: { opacity: 1, transition: { staggerChildren: 0 } },
    }
  }
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.11, delayChildren: 0.06 },
    },
  }
}

export function heroItem(prefersReducedMotion) {
  if (prefersReducedMotion) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
  }
  return {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: EASE_LUX },
    },
  }
}

export function cardReveal(prefersReducedMotion, index) {
  return {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px 80px 0px', amount: 0.08 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.55,
      delay: prefersReducedMotion ? 0 : Math.min(index, 3) * 0.07,
      ease: EASE_LUX,
    },
  }
}

/** Сетка карточек: stagger только внутри строки, ранний триггер при скролле. */
export function gridCardReveal(prefersReducedMotion, index, columns = 3) {
  const column = index % columns
  return {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px 20% 0px', amount: 0.05 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.4,
      delay: prefersReducedMotion ? 0 : column * 0.04,
      ease: EASE_LUX,
    },
  }
}
