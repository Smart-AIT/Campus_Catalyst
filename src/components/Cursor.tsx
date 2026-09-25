import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'
import { useFx } from '../utils/fx'

/** Camera-focus cursor. Desktop + full effects only; the native cursor stays
 *  visible underneath so nothing about pointing is ever hidden. */
export function Cursor() {
  const { full, desktop } = useFx()
  const ring = useRef<HTMLDivElement>(null)
  const meta = useRef<HTMLSpanElement>(null)
  const enabled = full && desktop

  useEffect(() => {
    const el = ring.current
    if (!enabled || !el) return
    document.documentElement.classList.add('has-cursor')
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })
    let current: Element | null = null

    const move = (e: PointerEvent) => {
      el.classList.remove('is-hidden')
      xTo(e.clientX)
      yTo(e.clientY)
      const target = (e.target as Element | null)?.closest?.('[data-photo], a, button') ?? null
      if (target === current) return
      current = target
      const isPhoto = !!target?.hasAttribute('data-photo')
      el.classList.toggle('is-photo', isPhoto)
      el.classList.toggle('is-link', !!target && !isPhoto)
      if (meta.current) meta.current.textContent = isPhoto ? target!.getAttribute('data-meta') ?? '' : ''
    }
    const down = () => el.classList.add('is-down')
    const up = () => el.classList.remove('is-down')
    const leave = () => el.classList.add('is-hidden')
    const enter = () => el.classList.remove('is-hidden')

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('pointerleave', leave)
    document.addEventListener('pointerenter', enter)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('pointerleave', leave)
      document.removeEventListener('pointerenter', enter)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={ring} className="cursor is-hidden" aria-hidden="true">
      <span className="cursor__cross" />
      <span className="cursor__ring">
        <i /> <i /> <i /> <i />
      </span>
      <span ref={meta} className="cursor__meta" />
    </div>
  )
}
