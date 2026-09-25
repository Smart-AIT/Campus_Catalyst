import { lazy, Suspense, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap } from '../animations/gsap'
import { useGsap } from '../animations/useGsap'
import { AlbumInterlude } from '../components/AlbumInterlude'
import { Photo } from '../components/Photo'
import { IMAGES, OPEN_INNOVATION, PROBLEMS, type Problem } from '../data/event'
import { useFx } from '../utils/fx'
import { sfx } from '../utils/sound'

const ProblemDialog = lazy(() => import('../components/ProblemDialog'))

function ProblemCard({ p, onOpen }: { p: Problem; onOpen: (p: Problem) => void }) {
  return (
    <article className={`pcard pcard--${p.no}`} aria-labelledby={`p-${p.id}`}>
      <div className="pcard__print">
        <Photo image={p.image} className="pcard__photo" leak={Number(p.no) % 2 ? 'tr' : 'bl'} meta={`PROBLEM ${p.no} · ${IMAGES[p.image].caption.toUpperCase()}`} />
        <span className="pcard__no t-display" aria-hidden="true">
          {p.no}
        </span>
        <span className="pcard__cap t-type" aria-hidden="true">
          {IMAGES[p.image].caption}
        </span>
      </div>
      <div className="pcard__body">
        <p className="t-kicker pcard__kicker">Problem #{p.no}</p>
        <h3 id={`p-${p.id}`} className="pcard__title t-display">
          {p.title}
        </h3>
        <p className="pcard__short t-serif">{p.short}</p>
        <div className="pcard__more">
          <div>
            <p className="pcard__desc">{p.description}</p>
          </div>
        </div>
        <button
          type="button"
          className="pcard__cta"
          onClick={() => {
            sfx.shutter()
            onOpen(p)
          }}
        >
          Explore problem <ArrowRight size={16} aria-hidden="true" />
          <span className="sr-only">: {p.title}</span>
        </button>
      </div>
    </article>
  )
}

export function Problems() {
  const root = useRef<HTMLElement>(null)
  const { full } = useFx()
  const [open, setOpen] = useState<Problem | null>(null)

  useGsap(
    () => {
      if (!full) return
      gsap.utils.toArray<HTMLElement>('.pcard').forEach((el, i) => {
        gsap.from(el, {
          y: 90,
          rotate: i % 2 ? 3 : -3,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
        gsap.fromTo(
          el.querySelector('.pcard__photo'),
          { yPercent: -6 },
          { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    },
    root,
    [full],
  )

  return (
    <section id="problems" ref={root} className="problems" aria-labelledby="problems-title">
      <AlbumInterlude image="canteen" mode="pull" label="Page 07 — Mess, 1:05 pm">
        <p className="t-kicker text-red">Option 01 · Tackle a provided problem</p>
        <h2 id="problems-title" className="problems__title t-display misreg">
          The campus
          <br />
          needs fixing.
        </h2>
        <p className="problems__sub t-serif">Here are five problems waiting for builders.</p>
      </AlbumInterlude>

      <div className="problems__list paper section-pad">
        {PROBLEMS.map((p) => (
          <ProblemCard key={p.id} p={p} onOpen={setOpen} />
        ))}
      </div>

      <div className="open dark-stock section-pad" role="region" aria-labelledby="open-title">
        <p className="open__or t-hand" aria-hidden="true">
          Or…
        </p>
        <div className="open__grid">
          <div className="open__clip paper-light">
            <p className="t-kicker">{OPEN_INNOVATION.label}</p>
            <h3 id="open-title" className="open__title t-display">
              {OPEN_INNOVATION.title}
            </h3>
            <p className="open__hook t-serif">“{OPEN_INNOVATION.hook}”</p>
            <p className="open__body">{OPEN_INNOVATION.body}</p>
            <p className="open__rule t-type">
              <span className="open__rule-k">Note —</span> {OPEN_INNOVATION.constraint}
            </p>
          </div>
          <div className="open__polaroid" aria-hidden="true">
            <Photo image="notebook" className="print" decorative />
            <span className="t-hand open__polaroid-cap">your idea here →</span>
            <span className="tape tape--top" />
          </div>
        </div>
      </div>

      <Suspense fallback={null}>{open && <ProblemDialog problem={open} onClose={() => setOpen(null)} />}</Suspense>
    </section>
  )
}
