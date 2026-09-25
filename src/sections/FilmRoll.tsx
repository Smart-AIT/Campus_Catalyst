import { useRef } from 'react'
import { gsap } from '../animations/gsap'
import { useGsap } from '../animations/useGsap'
import { Photo } from '../components/Photo'
import { ARCHIVE, IMAGES, PROBLEMS, type ImageKey } from '../data/event'
import { useFx } from '../utils/fx'

type Frame = { image: ImageKey; frame: string; label: string }

const ROLL_A: Frame[] = ARCHIVE.map((a) => ({ image: a.image, frame: a.frame, label: IMAGES[a.image].caption }))
const ROLL_B: Frame[] = [
  ...PROBLEMS.map((p) => ({ image: p.image, frame: `P${p.no}`, label: `Problem ${p.no}` })),
  ...ARCHIVE.slice(0, 6).map((a) => ({ image: a.image, frame: a.frame, label: IMAGES[a.image].caption })),
]

function Strip({ frames, className = '', stock }: { frames: Frame[]; className?: string; stock: string }) {
  return (
    <div className={`strip ${className}`}>
      <div className="strip__track">
        {frames.map((f, i) => (
          <figure key={i} className="strip__frame">
            <span className="strip__edge t-type" aria-hidden="true">
              {stock} <span className="strip__tri">▸</span> {f.frame}
            </span>
            <Photo image={f.image} className="strip__photo" meta={`FRAME ${f.frame} · ${f.label.toUpperCase()}`} sizes="320px" />
            <figcaption className="strip__num t-type">{f.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

/** Signature element: two 35mm strips that advance sideways as you scroll. */
export function FilmRoll() {
  const root = useRef<HTMLElement>(null)
  const { full } = useFx()

  useGsap(
    () => {
      if (!full) return
      const [a, b] = gsap.utils.toArray<HTMLElement>('.strip__track')
      const dist = (el: HTMLElement) => Math.max(0, el.scrollWidth - window.innerWidth)
      const st = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.5, invalidateOnRefresh: true }
      gsap.fromTo(a, { x: 0 }, { x: () => -dist(a), ease: 'none', scrollTrigger: st })
      gsap.fromTo(b, { x: () => -dist(b) }, { x: 0, ease: 'none', scrollTrigger: st })
    },
    root,
    [full],
  )

  return (
    <section ref={root} className={`filmroll ${full ? '' : 'is-swipe'}`} aria-labelledby="film-title">
      <div className="filmroll__head">
        <p className="eyebrow">Contact print · Roll 02 · 36 exp</p>
        <h2 id="film-title" className="filmroll__title t-display">
          Every frame, <span className="text-stamp">one idea.</span>
        </h2>
      </div>
      <Strip frames={ROLL_A} stock="CATALYST 400" className="strip--a" />
      <Strip frames={ROLL_B} stock="SAFETY FILM · AIT" className="strip--b" />
      {!full && <p className="filmroll__swipe t-type">← swipe the film →</p>}
    </section>
  )
}
