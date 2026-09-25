import { useRef } from 'react'
import { gsap } from '../animations/gsap'
import { useGsap } from '../animations/useGsap'
import { Photo } from '../components/Photo'
import { useFx } from '../utils/fx'

const LINES: { t: string; cls?: string }[] = [
  { t: 'Before smartphones,' },
  { t: 'before social media,' },
  { t: 'before AI assistants…' },
  { t: 'people still had ideas.', cls: 'story__big' },
]
const VERBS = ['They wrote them down.', 'They discussed them.', 'They built things.']

/** The visual story: words print in as you scroll, prints drift past. */
export function Story() {
  const root = useRef<HTMLElement>(null)
  const { full } = useFx()

  useGsap(
    () => {
      if (!full) return
      gsap.fromTo(
        '.story__w',
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.story__text', start: 'top 75%', end: 'bottom 55%', scrub: true },
        },
      )
      gsap.utils.toArray<HTMLElement>('.story__print').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 120 + i * 40, rotate: i % 2 ? 9 : -9 },
          { y: -80 - i * 30, rotate: i % 2 ? 3 : -4, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
      gsap.from('.story__verb', {
        opacity: 0,
        x: -30,
        stagger: 0.15,
        scrollTrigger: { trigger: '.story__verbs', start: 'top 80%' },
      })
    },
    root,
    [full],
  )

  return (
    <section ref={root} className="story dark-stock" aria-label="The story">
      <div className="story__prints" aria-hidden="true">
        <Photo image="notebook" className="story__print story__print--1 print" decorative />
        <Photo image="students-discuss" className="story__print story__print--2 print" decorative leak="bl" />
        <Photo image="camera-desk" className="story__print story__print--3 print" decorative />
      </div>
      <div className="story__inner">
        <p className="story__text t-serif">
          {LINES.map((l, i) => (
            <span key={i} className={`story__line ${l.cls ?? ''}`}>
              {l.t.split(' ').map((w, j) => (
                <span key={j} className="story__w">
                  {w}{' '}
                </span>
              ))}
            </span>
          ))}
        </p>
        <ul className="story__verbs">
          {VERBS.map((v) => (
            <li key={v} className="story__verb t-hand">
              {v}
            </li>
          ))}
        </ul>
        <p className="story__coda t-type">
          Campus Catalyst brings that spirit into today’s campus.
          <br />
          <strong>9 hours. One campus. Infinite ideas.</strong>
        </p>
      </div>
    </section>
  )
}
