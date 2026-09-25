import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../animations/gsap'
import { setLenis } from '../utils/scroll'

/** Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [enabled])
}
