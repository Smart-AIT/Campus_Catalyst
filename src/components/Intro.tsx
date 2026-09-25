import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'
import { useFx } from '../utils/fx'
import { sfx } from '../utils/sound'

const KEY = 'cc-intro-seen'

/** Cinematic load: viewfinder → shutter → flash. ~1.6s, skippable, shown once
 *  per session, and skipped entirely in lite / reduced-motion mode. */
export function Intro({ onDone }: { onDone: () => void }) {
  const { full } = useFx()
  const root = useRef<HTMLDivElement>(null)
  const [show] = useState(() => {
    try {
      return full && !sessionStorage.getItem(KEY)
    } catch {
      return full
    }
  })
  const [gone, setGone] = useState(!show)
  const done = useRef(false)

  const finish = () => {
    if (done.current) return
    done.current = true
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    onDone()
  }

  useEffect(() => {
    if (!show) {
      finish()
      return
    }
    const el = root.current!
    const counter = el.querySelector('.intro__count')!
    const frame = { n: 0 }
    const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
    gsap.set('.intro__blade--t', { yPercent: -100 })
    gsap.set('.intro__blade--b', { yPercent: 100 })
    tl.from('.intro__bracket', { scale: 1.25, opacity: 0, duration: 0.45, stagger: 0.04 })
      .from('.intro__line', { opacity: 0, y: 8, duration: 0.3, stagger: 0.08 }, 0.1)
      .to(frame, { n: 3, duration: 0.5, ease: 'none', onUpdate: () => (counter.textContent = String(Math.round(frame.n)).padStart(2, '0')) }, 0.15)
      .add(() => sfx.shutter(), 0.72)
      .to('.intro__blade--t', { yPercent: 0, duration: 0.14, ease: 'power4.in' }, 0.72)
      .to('.intro__blade--b', { yPercent: 0, duration: 0.14, ease: 'power4.in' }, 0.72)
      .set('.intro__stage', { opacity: 0 }, 0.86)
      .set(el, { backgroundColor: 'transparent' }, 0.86)
      .set('.intro__flash', { opacity: 1 }, 0.9)
      .to('.intro__blade--t', { yPercent: -100, duration: 0.18, ease: 'power3.out' }, 0.9)
      .to('.intro__blade--b', { yPercent: 100, duration: 0.18, ease: 'power3.out' }, 0.9)
      .add(finish, 0.95)
      .to('.intro__flash', { opacity: 0, duration: 0.7, ease: 'power2.out' }, 1.0)
      .add(() => setGone(true))
    }, el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const skip = () => {
    finish()
    setGone(true)
  }

  if (gone) return null
  return (
    <div ref={root} className="intro" aria-hidden="false" role="presentation">
      <div className="intro__stage">
        <span className="intro__bracket intro__bracket--tl" />
        <span className="intro__bracket intro__bracket--tr" />
        <span className="intro__bracket intro__bracket--bl" />
        <span className="intro__bracket intro__bracket--br" />
        <span className="intro__cross" />
        <div className="intro__hud">
          <p className="intro__line">
            <span className="intro__rec" /> LOADING ROLL 02 · 36 EXP
          </p>
          <p className="intro__line">
            FRAME <span className="intro__count">00</span> · ISO 400 · 1/125 · ƒ2.8
          </p>
        </div>
      </div>
      <span className="intro__blade intro__blade--t" />
      <span className="intro__blade intro__blade--b" />
      <span className="intro__flash" />
      <button type="button" className="intro__skip" onClick={skip}>
        Skip intro →
      </button>
    </div>
  )
}
