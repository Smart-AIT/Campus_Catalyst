import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../animations/gsap'
import { useGsap } from '../animations/useGsap'
import { AlbumInterlude } from '../components/AlbumInterlude'
import { TIMELINE, TIMELINE_IS_OFFICIAL } from '../data/event'
import { useFx } from '../utils/fx'

const START = 9
const END = 18
const toH = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h + m / 60
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

/** 9:00 → 18:00 drawn as an arc on a 12-hour dial (270° of travel) */
const [ax, ay] = polar(100, 100, 78, 270)
const [bx, by] = polar(100, 100, 78, 180)
const ARC = `M ${ax} ${ay} A 78 78 0 1 1 ${bx} ${by}`

function Clock() {
  return (
    <div className="clock" aria-hidden="true">
      <svg viewBox="0 0 200 220" className="clock__svg">
        <rect x="88" y="0" width="24" height="14" rx="3" fill="#2b231d" />
        <rect x="94" y="12" width="12" height="10" fill="#2b231d" />
        <circle cx="100" cy="120" r="96" fill="#2b231d" />
        <g transform="translate(0 20)">
          <circle cx="100" cy="100" r="88" fill="#f3e9d2" />
          <path d={ARC} className="clock__track" fill="none" stroke="#e1d0ad" strokeWidth="10" />
          <path d={ARC} className="clock__arc" fill="none" stroke="#b3261e" strokeWidth="10" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
          {Array.from({ length: 60 }, (_, i) => {
            const [x1, y1] = polar(100, 100, i % 5 ? 82 : 76, i * 6)
            const [x2, y2] = polar(100, 100, 86, i * 6)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1b1714" strokeWidth={i % 5 ? 0.8 : 2.2} />
          })}
          {[12, 3, 6, 9].map((n) => {
            const [x, y] = polar(100, 100, 62, (n % 12) * 30)
            return (
              <text key={n} x={x} y={y + 7} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="20" fill="#1b1714">
                {n}
              </text>
            )
          })}
          <text x="100" y="138" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="8" letterSpacing="2" fill="#6f6152">
            CATALYST · 9H
          </text>
          <g className="clock__hour">
            <rect x="97" y="52" width="6" height="52" rx="3" fill="#1b1714" />
          </g>
          <g className="clock__min">
            <rect x="98.5" y="28" width="3" height="76" rx="1.5" fill="#1b1714" />
          </g>
          <circle cx="100" cy="100" r="6" fill="#b3261e" />
        </g>
      </svg>
      <p className="clock__read t-display">
        <span className="clock__digits">09:00</span>
      </p>
    </div>
  )
}

export function Timeline() {
  const root = useRef<HTMLElement>(null)
  const { full } = useFx()

  useGsap(
    () => {
      const list = root.current!.querySelector('.tl__list') as HTMLElement
      const items = gsap.utils.toArray<HTMLElement>('.tl__item')
      const digits = root.current!.querySelector('.clock__digits') as HTMLElement
      const hour = root.current!.querySelector('.clock__hour')
      const min = root.current!.querySelector('.clock__min')
      const arc = root.current!.querySelector('.clock__arc')
      gsap.set([hour, min], { svgOrigin: '100 100' })

      const render = (p: number) => {
        const h = START + p * (END - START)
        gsap.set(hour, { rotation: (h % 12) * 30 })
        gsap.set(min, { rotation: (h - START) * 360 })
        gsap.set(arc, { attr: { 'stroke-dashoffset': 1 - p } })
        const hh = Math.floor(h)
        const mm = Math.floor((h - hh) * 60)
        digits.textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
        items.forEach((el) => el.classList.toggle('is-past', toH(el.dataset.time!) <= h + 0.01))
      }

      if (!full) {
        render(1)
        return
      }
      render(0)
      ScrollTrigger.create({
        trigger: list,
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: true,
        onUpdate: (st) => render(st.progress),
      })
      gsap.fromTo('.tl__fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 60%', end: 'bottom 60%', scrub: true } })
    },
    root,
    [full],
  )

  return (
    <section id="schedule" ref={root} className="timeline" aria-labelledby="timeline-title">
      <AlbumInterlude image="sunset-roof" mode="flip" label="Page 12 — written on the back">
        <div className="tl__back">
          <p className="t-kicker">17.10.2026 · 09:00 — 18:00</p>
          <h2 id="timeline-title" className="tl__title t-display">
            9 hours.
            <br />
            <span className="text-red">One shot.</span>
          </h2>
          <p className="t-hand tl__scrawl">no retakes.</p>
        </div>
      </AlbumInterlude>

      <div className="tl paper section-pad">
        <div className="tl__aside">
          <Clock />
          <p className={`tl__disclaimer t-type ${TIMELINE_IS_OFFICIAL ? 'is-official' : ''}`}>
            {TIMELINE_IS_OFFICIAL ? 'Official schedule' : 'Suggested flow · not the official schedule'}
          </p>
          {!TIMELINE_IS_OFFICIAL && <p className="tl__disclaimer-sub">The minute-by-minute schedule will be shared by CIDC. This is how nine hours tend to feel.</p>}
        </div>
        <div className="tl__list">
          <span className="tl__rail" aria-hidden="true">
            <span className="tl__fill" />
          </span>
          <ol className="tl__ol">
          {TIMELINE.map((s, i) => (
            <li key={s.time} className="tl__item" data-time={s.time}>
              <time className="tl__time t-display" dateTime={`2026-10-17T${s.time}`}>
                {s.time}
              </time>
              <div className="tl__card">
                <p className="tl__frame t-type" aria-hidden="true">
                  FR {String(i + 1).padStart(2, '0')}A
                </p>
                <h3 className="tl__name t-display">{s.title}</h3>
                <p className="tl__note t-serif">{s.note}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
