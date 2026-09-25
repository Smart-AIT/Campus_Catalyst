import { useRef } from 'react'
import { gsap } from '../animations/gsap'
import { useGsap } from '../animations/useGsap'
import { Button } from '../components/Button'
import { Photo } from '../components/Photo'
import { Social } from '../components/Social'
import { CIDC, LINKS } from '../data/event'
import { useFx } from '../utils/fx'

const TERMINAL = [
  '$ cidc init campus-catalyst --year 2026',
  '> loading roll 02 ........ ok',
  '> developing ideas ........ ok',
  '$ cidc build --live --hours 9',
  '> learn → build → deploy → contribute',
  '> shipped to campus ✔',
]

export function Cidc() {
  const root = useRef<HTMLElement>(null)
  const { full } = useFx()

  useGsap(
    () => {
      if (!full) return
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.cidc__visual', start: 'top 70%' } })
      tl.from('.cidc__photo-half', { clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power3.inOut' })
        .from('.term__line', { opacity: 0, x: -10, stagger: 0.18, duration: 0.3 }, '-=0.3')
      gsap.from('.pillar', { y: 30, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: '.pillars', start: 'top 85%' } })
    },
    root,
    [full],
  )

  return (
    <section id="cidc" ref={root} className="cidc paper section-pad" aria-labelledby="cidc-title">
      <div className="cidc__grid">
        <div className="cidc__copy">
          <p className="eyebrow text-red">About the organisers</p>
          <h2 id="cidc-title" className="cidc__title t-display">
            Built by <span className="text-red">CIDC.</span>
          </h2>
          <p className="cidc__motto t-type">“{CIDC.motto}”</p>
          <p className="cidc__lead t-serif">
            The <strong>College Innovation &amp; Development Club</strong> is {CIDC.about.replace(/^A /, 'a ')}
          </p>
          <p className="cidc__body">{CIDC.approach}</p>
          <ol className="pillars">
            {CIDC.pillars.map((p, i) => (
              <li key={p} className="pillar">
                <span className="pillar__no t-type">{String(i + 1).padStart(2, '0')}</span>
                <span className="pillar__name t-display">{p}</span>
              </li>
            ))}
          </ol>
          <p className="cidc__domains t-type">Domains: {CIDC.domains.join(' · ')}</p>
          <div className="cidc__actions">
            <Button href={LINKS.cidc} variant="dark" size="lg">
              Visit CIDC
            </Button>
            <Social />
          </div>
        </div>

        <div className="cidc__visual" aria-hidden="true">
          <p className="cidc__visual-label t-type">
            <span>1986</span>
            <span className="cidc__visual-arrow">⟶</span>
            <span>2026</span>
          </p>
          <div className="cidc__split">
            <div className="cidc__photo-half">
              <Photo image="classroom" decorative leak="tl" />
            </div>
            <div className="term">
              <div className="term__bar">
                <i /> <i /> <i />
                <span className="t-type">cidc@ait-pune</span>
              </div>
              <pre className="term__body">
                {TERMINAL.map((l, i) => (
                  <span key={i} className={`term__line ${l.startsWith('$') ? 'is-cmd' : ''}`}>
                    {l}
                    {'\n'}
                  </span>
                ))}
                <span className="term__cursor">▌</span>
              </pre>
            </div>
          </div>
          <p className="cidc__visual-cap t-hand">same spirit, new tools.</p>
        </div>
      </div>
    </section>
  )
}
