import { useRef } from 'react'
import { gsap } from '../animations/gsap'
import { useGsap } from '../animations/useGsap'
import { RULES } from '../data/event'
import { useFx } from '../utils/fx'

const TILT = [-2.2, 1.4, -0.8, 2, 1.2, -1.8, 0.6, -1.2]

export function Rules() {
  const root = useRef<HTMLElement>(null)
  const { full } = useFx()

  useGsap(
    () => {
      if (!full) return
      gsap.from('.icard', {
        y: 120,
        x: (i: number) => (i % 2 ? 40 : -40),
        rotate: (i: number) => (i % 2 ? 14 : -14),
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.rules__deck', start: 'top 80%' },
      })
      gsap.from('.icard__stamp', {
        scale: 2.4,
        opacity: 0,
        duration: 0.35,
        ease: 'power4.in',
        stagger: 0.2,
        scrollTrigger: { trigger: '.rules__deck', start: 'top 45%' },
      })
    },
    root,
    [full],
  )

  return (
    <section id="rules" ref={root} className="rules dark-stock section-pad" aria-labelledby="rules-title">
      <header className="rules__head">
        <p className="eyebrow text-yellow">File no. CC/26 · Typed in triplicate</p>
        <h2 id="rules-title" className="rules__title t-display misreg">
          The rulebook
        </h2>
        <p className="rules__sub t-serif">Eight rules. Read them once, then go build.</p>
      </header>
      <ol className="rules__deck">
        {RULES.map((r, i) => (
          <li key={r.no} className="icard" style={{ ['--tilt' as string]: `${TILT[i % TILT.length]}deg` }}>
            <span className="icard__no t-hand" aria-hidden="true">
              {r.no}
            </span>
            <h3 className="icard__title t-type">{r.title}</h3>
            <p className="icard__body t-type">{r.body}</p>
            {r.stamp && (
              <span className={`icard__stamp t-display ${r.stamp === 'Prohibited' ? 'is-red' : 'is-olive'}`} aria-hidden="true">
                {r.stamp}
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
