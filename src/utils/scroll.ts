import type Lenis from 'lenis'

let lenis: Lenis | null = null
export const setLenis = (l: Lenis | null) => {
  lenis = l
}
export const getLenis = () => lenis

/** Smooth-scroll to a section id, honouring Lenis when it is running. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: id === 'home' ? 0 : -8, duration: 1.4 })
  else el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  history.replaceState(null, '', `#${id}`)
  // move focus for keyboard + screen reader users
  const heading = el.querySelector<HTMLElement>('h1, h2')
  if (heading) {
    heading.setAttribute('tabindex', '-1')
    heading.focus({ preventScroll: true })
  }
}
