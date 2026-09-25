import { useRef } from 'react'
import { gsap } from '../animations/gsap'
import { useGsap } from '../animations/useGsap'
import { JUDGING } from '../data/event'
import { useFx } from '../utils/fx'

function Symbol({ k }: { k: (typeof JUDGING)[number]['key'] }) {
  switch (k) {
    case 'originality':
      return (
        <svg viewBox="0 0 80 80" className="sym sym--bulb" aria-hidden="true">
          <g className="sym__rays" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M40 4v8M12 16l6 6M68 16l-6 6M4 40h8M76 40h-8" />
          </g>
          <path d="M40 18c-11 0-19 8-19 18 0 7 4 12 8 15v8h22v-8c4-3 8-8 8-15 0-10-8-18-19-18Z" fill="none" stroke="currentColor" strokeWidth="3" />
          <path className="sym__filament" d="M34 50 l3-10 3 6 3-6 3 10" fill="none" stroke="#b3261e" strokeWidth="2.5" />
          <path d="M31 64h18M33 70h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    case 'feasibility':
      return (
        <svg viewBox="0 0 80 80" className="sym sym--gear" aria-hidden="true">
          <g className="sym__spin">
            <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="40" cy="40" r="5" fill="#b3261e" />
            {Array.from({ length: 8 }, (_, i) => (
              <rect key={i} x="36" y="12" width="8" height="10" rx="1" fill="currentColor" transform={`rotate(${i * 45} 40 40)`} />
            ))}
          </g>
        </svg>
      )
    case 'impact':
      return (
        <svg viewBox="0 0 80 80" className="sym sym--ripple" aria-hidden="true">
          <circle cx="40" cy="40" r="6" fill="#b3261e" />
          <circle className="sym__ring" cx="40" cy="40" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle className="sym__ring sym__ring--2" cx="40" cy="40" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle className="sym__ring sym__ring--3" cx="40" cy="40" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      )
    case 'presentation':
      return (
        <svg viewBox="0 0 80 80" className="sym sym--mega" aria-hidden="true">
          <path d="M14 34h10l26-14v40L24 46H14Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M22 46l4 16h8l-4-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <g className="sym__waves" stroke="#b3261e" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M58 32q6 8 0 16" />
            <path d="M64 26q11 14 0 28" />
          </g>
        </svg>
      )
  }
}

export function Judging() {
  const root = useRef<HTMLElement>(null)
  const { full } = useFx()

  useGsap(
    () => {
      if (!full) return
      gsap.from('.jcol', { y: 50, opacity: 0, stagger: 0.12, duration: 0.9, scrollTrigger: { trigger: '.judging__cols', start: 'top 80%' } })
      gsap.from('.judging__rule', { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power2.inOut', scrollTrigger: { trigger: root.current, start: 'top 70%' } })
    },
    root,
    [full],
  )

  return (
    <section ref={root} className="judging paper-light section-pad" aria-labelledby="judging-title">
      <header className="judging__masthead">
        <p className="t-kicker">The Catalyst Gazette</p>
        <p className="t-kicker">Judges’ edition</p>
        <p className="t-kicker">Price: one good idea</p>
      </header>
      <hr className="judging__rule" />
      <h2 id="judging-title" className="judging__title t-display">
        What makes
        <br />
        an idea matter?
      </h2>
      <hr className="judging__rule judging__rule--double" />
      <ol className="judging__cols">
        {JUDGING.map((j, i) => (
          <li key={j.key} className="jcol">
            <Symbol k={j.key} />
            <p className="t-kicker jcol__no">Criterion no. {i + 1}</p>
            <h3 className="jcol__title t-display">{j.title}</h3>
            <p className="jcol__line t-serif">{j.line}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
