import { useRef, type ReactNode } from 'react'
import { gsap } from '../animations/gsap'
import { useGsap } from '../animations/useGsap'
import type { ImageKey } from '../data/event'
import { useFx } from '../utils/fx'
import { Photo } from './Photo'

type Mode = 'pull' | 'flip' | 'slide'

/** "Forgotten photo album" transition. A print sits in an album page; as you
 *  scroll it is pulled out / flipped over / slid away to reveal what was
 *  written behind it. Pinned only on desktop with full effects — otherwise it
 *  renders as a static composition with the same content. */
export function AlbumInterlude({ image, mode, label, children }: { image: ImageKey; mode: Mode; label: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const { full, desktop } = useFx()
  const pinned = full && desktop

  useGsap(
    () => {
      if (!pinned) return
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=110%', scrub: 0.6, pin: true, anticipatePin: 1 },
      })
      if (mode === 'pull') {
        tl.to('.interlude__card', { yPercent: -18, rotate: -3, scale: 1.04, duration: 0.25 })
          .to('.interlude__card', { yPercent: -160, xPercent: 20, rotate: -14, duration: 0.75 })
          .fromTo('.interlude__behind', { opacity: 0.1, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6 }, 0.3)
      } else if (mode === 'flip') {
        tl.to('.interlude__card', { rotateY: 180, scale: 1.08, duration: 0.7, ease: 'power1.inOut' }).to('.interlude__card', { scale: 1, duration: 0.3 })
      } else {
        tl.to('.interlude__card', { xPercent: 150, rotate: 16, duration: 0.8, ease: 'power1.in' }).fromTo(
          '.interlude__behind',
          { opacity: 0.1, x: -40 },
          { opacity: 1, x: 0, duration: 0.6 },
          0.2,
        )
      }
    },
    root,
    [pinned, mode],
  )

  if (!pinned) {
    return (
      <div className={`interlude interlude--static interlude--${mode}`}>
        <div className="interlude__static-photo" aria-hidden="true">
          <Photo image={image} className="print" decorative />
          <span className="corner corner--tl" />
          <span className="corner corner--br" />
        </div>
        <div className="interlude__static-copy">{children}</div>
      </div>
    )
  }

  return (
    <div ref={root} className={`interlude interlude--${mode}`}>
      <div className="interlude__page paper">
        <p className="interlude__label t-type" aria-hidden="true">
          {label}
        </p>
        {mode !== 'flip' && <div className="interlude__behind">{children}</div>}
        <div className="interlude__slot" aria-hidden={mode !== 'flip' || undefined}>
          <div className="interlude__card">
            <div className="interlude__face interlude__front">
              <Photo image={image} className="print" decorative leak="tr" />
              <span className="corner corner--tl" />
              <span className="corner corner--tr" />
              <span className="corner corner--bl" />
              <span className="corner corner--br" />
            </div>
            {mode === 'flip' && <div className="interlude__face interlude__back paper-light">{children}</div>}
          </div>
        </div>
        <p className="interlude__hint t-kicker" aria-hidden="true">
          Keep scrolling ↓
        </p>
      </div>
    </div>
  )
}
