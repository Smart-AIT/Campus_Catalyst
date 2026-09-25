import { useRef } from 'react'
import { gsap } from '../animations/gsap'
import { useGsap } from '../animations/useGsap'
import { Photo } from '../components/Photo'
import { SplitWords } from '../components/Split'
import { EVENT, PROBLEMS } from '../data/event'
import { useFx } from '../utils/fx'

const FACTS = [
  { k: 'Hours', v: '9' },
  { k: 'Per team', v: '2–4' },
  { k: 'Problems', v: `${PROBLEMS.length}+1` },
  { k: 'Prize pool', v: '₹30K+' },
]

export function Challenge() {
  const root = useRef<HTMLElement>(null)
  const { full } = useFx()

  useGsap(
    () => {
      if (!full) return
      gsap.from('.split-word', {
        yPercent: 110,
        rotate: 4,
        stagger: 0.05,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.challenge__head', start: 'top 80%' },
      })
      gsap.utils.toArray<HTMLElement>('.album__slot').forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          rotate: (i % 2 ? 1 : -1) * 10,
          opacity: 0,
          duration: 1.1,
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
      gsap.from('.note', {
        scale: 0.6,
        opacity: 0,
        stagger: 0.12,
        ease: 'back.out(2)',
        duration: 0.6,
        scrollTrigger: { trigger: '.album', start: 'top 60%' },
      })
    },
    root,
    [full],
  )

  return (
    <section id="challenge" ref={root} className="challenge paper section-pad" aria-labelledby="challenge-title">
      <div className="challenge__grid">
        <div className="challenge__copy">
          <p className="eyebrow text-red">The challenge · Page 03</p>
          <h2 id="challenge-title" className="challenge__head t-display">
            <SplitWords text="What if your campus" />
            <br />
            <span className="text-red">
              <SplitWords text="could be better?" />
            </span>
          </h2>

          <div className="challenge__cols t-serif">
            <p className="dropcap">
              Campus Catalyst is a <strong>9-hour live innovation showdown</strong> organized by the {EVENT.organizer} at {EVENT.institute}, {EVENT.city}.
            </p>
            <p>
              Participants identify meaningful campus problems and build <em>working prototypes</em> during the event — from the first sketch at nine in the morning to a live demo at six in the evening.
            </p>
            <p>
              Two ways in: <strong>tackle one of five provided problems</strong>, or go <strong>open innovation</strong> and bring a campus problem of your own.
            </p>
          </div>

          <blockquote className="pullquote">
            <p className="t-display">“Nobody fixes the campus for us. So we will.”</p>
          </blockquote>

          <dl className="facts">
            {FACTS.map((f) => (
              <div key={f.k} className="facts__item">
                <dt className="t-kicker">{f.k}</dt>
                <dd className="t-display">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="album" aria-label="Photo album page">
          <p className="album__title t-type">Album No. 2 · Campus, 1986</p>
          <figure className="album__slot album__slot--1">
            <Photo image="students-discuss" className="print" leak="tl" />
            <figcaption className="caption">Steps outside the workshop</figcaption>
            <span className="corner corner--tl" />
            <span className="corner corner--br" />
          </figure>
          <figure className="album__slot album__slot--2">
            <Photo image="classroom" className="print" />
            <figcaption className="caption">Lecture hall B</figcaption>
            <span className="tape tape--top" />
          </figure>
          <figure className="album__slot album__slot--3">
            <Photo image="library-reader" className="print" leak="br" />
            <figcaption className="caption">Exam week</figcaption>
            <span className="corner corner--tr" />
            <span className="corner corner--bl" />
          </figure>

          <span className="note note--1 t-hand" aria-hidden="true">Build.</span>
          <span className="note note--2 t-hand" aria-hidden="true">Break.</span>
          <span className="note note--3 t-hand" aria-hidden="true">Rethink.</span>
          <span className="note note--4 t-hand" aria-hidden="true">Ship.</span>
          <svg className="album__arrow" viewBox="0 0 120 60" aria-hidden="true">
            <path d="M4 40 C 30 6, 70 4, 108 26" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M96 16 L110 27 L94 34" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}
