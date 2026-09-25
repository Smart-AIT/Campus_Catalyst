import { useRef } from 'react'
import { gsap } from '../animations/gsap'
import { useGsap } from '../animations/useGsap'
import { AlbumInterlude } from '../components/AlbumInterlude'
import { EVENT, PRIZES } from '../data/event'
import { useFx } from '../utils/fx'

const inr = (n: number) => n.toLocaleString('en-IN')

export function Prizes() {
  const root = useRef<HTMLElement>(null)
  const { full } = useFx()

  useGsap(
    () => {
      if (!full) return
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const o = { v: 0 }
        gsap.to(o, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => (el.textContent = inr(Math.round(o.v / 10) * 10)),
        })
      })
      gsap.from('.prize', {
        y: 80,
        opacity: 0,
        rotate: (i: number) => [-4, 3, -2, 2][i] ?? 0,
        stagger: 0.12,
        duration: 1,
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.prizes__board', start: 'top 80%' },
      })
      gsap.to('.prizes__rays', { rotate: 30, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    },
    root,
    [full],
  )

  return (
    <section id="prizes" ref={root} className="prizes" aria-labelledby="prizes-title">
      <AlbumInterlude image="camera-desk" mode="slide" label="Page 21 — the good stuff">
        <p className="t-kicker">Total prize pool</p>
        <p className="prizes__pool t-display misreg">{EVENT.prizePoolLabel}</p>
      </AlbumInterlude>

      <div className="prizes__poster paper section-pad">
        <div className="prizes__rays" aria-hidden="true" />
        <header className="prizes__head">
          <p className="eyebrow text-red">Grand award presentation · 17 Oct 2026</p>
          <h2 id="prizes-title" className="prizes__title t-display misreg">
            The loot.
          </h2>
          <p className="prizes__sub t-serif">
            A prize pool of <strong>{EVENT.prizePoolLabel}</strong>. Ten teams go home with cash.
          </p>
        </header>

        <ol className="prizes__board">
          {PRIZES.map((p) => (
            <li key={p.place} className={`prize prize--${p.tone}`}>
              <span className="prize__rosette" aria-hidden="true" />
              <p className="prize__place t-type">{p.place}</p>
              <p className="prize__amount t-display">
                <span className="prize__rs">₹</span>
                <span data-count={p.amount}>{inr(p.amount)}</span>
              </p>
              {p.extra && <p className="prize__extra t-type">{p.extra}</p>}
              {p.note && <p className="prize__extra t-type">{p.note}</p>}
              {p.tone === 'plain' && (
                <div className="prize__stubs" aria-hidden="true">
                  {Array.from({ length: 7 }, (_, i) => (
                    <span key={i}>{i + 4}</span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
