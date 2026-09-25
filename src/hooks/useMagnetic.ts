import { useEffect, type RefObject } from 'react'
import { gsap } from '../animations/gsap'
import { useFx } from '../utils/fx'

/** Pulls an element slightly towards the cursor while hovered (desktop only). */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.3) {
  const { full, desktop } = useFx()
  useEffect(() => {
    const el = ref.current
    if (!el || !full || !desktop) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [ref, full, desktop, strength])
}
