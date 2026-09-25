import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'
import { useGsap } from '../animations/useGsap'
import { Photo } from '../components/Photo'
import { ARCHIVE, IMAGES } from '../data/event'
import { useFx } from '../utils/fx'
import { sfx } from '../utils/sound'

const Lightbox = lazy(() => import('../components/Lightbox'))

/* hand-placed layout for the wall on desktop: left%, top%, width(vw), rotation, depth */
const LAYOUT: [number, number, number, number, number][] = [
  [3, 4, 19, -5, 0.6],
  [24, 0, 15, 4, 1],
  [41, 6, 17, -2, 0.4],
  [61, 1, 14, 6, 0.9],
  [78, 5, 17, -4, 0.5],
  [1, 42, 15, 3, 0.9],
  [19, 38, 18, -6, 0.3],
  [40, 45, 16, 2, 0.8],
  [58, 38, 18, -3, 0.45],
  [79, 44, 16, 5, 1],
  [12, 74, 17, 4, 0.7],
  [55, 74, 18, -5, 0.6],
]

export function Archive() {
  const root = useRef<HTMLElement>(null)
  const { full, desktop } = useFx()
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  useGsap(
    () => {
      if (!full) return
      gsap.from('.wall__item', {
        opacity: 0,
        scale: 1.15,
        y: 40,
        rotate: 0,
        stagger: { each: 0.06, from: 'random' },
        duration: 0.9,
        scrollTrigger: { trigger: '.wall', start: 'top 75%' },
      })
    },
    root,
    [full],
  )

  // cursor parallax: each print drifts by its own depth
  useEffect(() => {
    const el = root.current
    if (!el || !full || !desktop) return
    const items = Array.from(el.querySelectorAll<HTMLElement>('.wall__item'))
    const setters = items.map((it) => ({
      d: Number(it.dataset.depth),
      x: gsap.quickTo(it, 'x', { duration: 1, ease: 'power3.out' }),
      y: gsap.quickTo(it, 'y', { duration: 1, ease: 'power3.out' }),
    }))
    const wall = el.querySelector('.wall') as HTMLElement
    const move = (e: PointerEvent) => {
      const r = wall.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      setters.forEach((s) => {
        s.x(nx * 36 * s.d)
        s.y(ny * 26 * s.d)
      })
    }
    wall.addEventListener('pointermove', move)
    return () => wall.removeEventListener('pointermove', move)
  }, [full, desktop])

  return (
    <section id="archive" ref={root} className="archive dark-stock section-pad" aria-labelledby="archive-title">
      <header className="archive__head">
        <p className="eyebrow text-yellow">Box 04 · Found in the CIDC room</p>
        <h2 id="archive-title" className="archive__title t-display misreg">
          From the
          <br />
          archives
        </h2>
        <p className="archive__sub t-serif">
          Before group chats, there were photo walls. Tap a print to take a closer look. <span className="archive__disclaimer">(All images are illustrative — no real persons depicted.)</span>
        </p>
      </header>

      <ul className="wall" aria-label="Photo wall">
        {ARCHIVE.map((a, i) => {
          const [l, t, w, r, d] = LAYOUT[i % LAYOUT.length]
          return (
            <li
              key={i}
              className="wall__item"
              data-depth={d}
              style={{ ['--l' as string]: `${l}%`, ['--t' as string]: `${t}%`, ['--w' as string]: `${w}vw`, ['--r' as string]: `${r}deg` }}
            >
              <button
                type="button"
                className="wall__btn"
                onClick={() => {
                  sfx.shutter()
                  setOpenIdx(i)
                }}
                aria-label={`Open photo: ${IMAGES[a.image].caption}`}
              >
                <Photo image={a.image} className="print" decorative meta={`${a.label} · FRAME ${a.frame}`} sizes="(max-width: 768px) 50vw, 20vw" />
                <span className="wall__label t-hand">{a.label}</span>
              </button>
              {i % 3 === 0 ? <span className="tape tape--top" aria-hidden="true" /> : <span className="pin" aria-hidden="true" />}
            </li>
          )
        })}
        <li className="wall__note t-hand" aria-hidden="true">
          Ideas · People · Campus · Progress
        </li>
      </ul>

      <Suspense fallback={null}>
        {openIdx !== null && <Lightbox index={openIdx} onIndex={setOpenIdx} onClose={() => setOpenIdx(null)} />}
      </Suspense>
    </section>
  )
}
