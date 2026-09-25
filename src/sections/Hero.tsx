import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'
import { useGsap } from '../animations/useGsap'
import { Button, RegisterButton } from '../components/Button'
import { Photo } from '../components/Photo'
import { EVENT, PROBLEMS } from '../data/event'
import { useFx } from '../utils/fx'

function useCountdown(iso: string) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])
  const diff = new Date(iso).getTime() - now
  if (diff <= 0) return null
  const d = Math.floor(diff / 86_400_000)
  const h = Math.floor((diff / 3_600_000) % 24)
  const m = Math.floor((diff / 60_000) % 60)
  return `T–${d}D ${String(h).padStart(2, '0')}H ${String(m).padStart(2, '0')}M`
}

const Chars = ({ text }: { text: string }) => (
  <>
    {text.split('').map((c, i) => (
      <span key={i} className="type-char">
        {c}
      </span>
    ))}
  </>
)

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const { full, desktop } = useFx()
  const countdown = useCountdown(EVENT.startISO)

  // Load sequence: photo develops → title types → 2K26 stamps → UI settles
  useGsap(
    () => {
      if (!full) {
        gsap.set(root.current, { '--develop': 0 })
        return
      }
      if (!ready) {
        gsap.set(root.current, { '--develop': 1 })
        gsap.set('.type-char', { opacity: 0 })
        gsap.set('.hero__stamp', { opacity: 0, scale: 1.8, rotate: -18 })
        gsap.set('[data-hero-fade]', { opacity: 0, y: 18 })
        return
      }
      const tl = gsap.timeline()
      tl.fromTo(root.current, { '--develop': 1 }, { '--develop': 0, duration: 1.6, ease: 'power2.out' })
        .fromTo('.type-char', { opacity: 0 }, { opacity: 1, duration: 0.01, stagger: 0.045, ease: 'none' }, 0.25)
        .fromTo('.hero__stamp', { opacity: 0, scale: 1.8, rotate: -18 }, { opacity: 1, scale: 1, rotate: -7, duration: 0.35, ease: 'back.out(2.2)' }, '>-0.05')
        .to('.hero__cover', { keyframes: { x: [-5, 4, -2, 0] }, duration: 0.25, ease: 'none' }, '<0.12')
        .fromTo('[data-hero-fade]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06 }, '<')
    },
    root,
    [ready, full],
  )

  // Scroll-away: the print lifts off as you leave the cover
  useGsap(
    () => {
      if (!full) return
      gsap.to('.hero__photo-wrap', {
        yPercent: 12,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__title', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    root,
    [full],
  )

  // Mouse parallax (desktop only)
  useEffect(() => {
    const el = root.current
    if (!el || !full || !desktop) return
    const photo = el.querySelector('.hero__photo-inner')
    const title = el.querySelector('.hero__title-inner')
    const px = gsap.quickTo(photo, 'x', { duration: 1.2, ease: 'power3.out' })
    const py = gsap.quickTo(photo, 'y', { duration: 1.2, ease: 'power3.out' })
    const tx = gsap.quickTo(title, 'x', { duration: 1.2, ease: 'power3.out' })
    const ty = gsap.quickTo(title, 'y', { duration: 1.2, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      px(nx * -18)
      py(ny * -12)
      tx(nx * 10)
      ty(ny * 6)
    }
    el.addEventListener('pointermove', move)
    return () => el.removeEventListener('pointermove', move)
  }, [full, desktop])

  return (
    <section id="home" ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__cover">
        <div className="hero__photo-wrap">
          <div className="hero__photo-inner">
            <Photo image="hero-campus" priority leak="tr" sizes="100vw" className="hero__photo" meta="COVER · AIT, PUNE · ISO 400 · 1/125 · ƒ2.8" />
          </div>
          <div className="hero__shade" aria-hidden="true" />

          {/* camera HUD */}
          <div className="hud" aria-hidden="true">
            <span className="hud__c hud__c--tl" />
            <span className="hud__c hud__c--tr" />
            <span className="hud__c hud__c--bl" />
            <span className="hud__c hud__c--br" />
            <span className="hud__focus" />
            <p className="hud__rec">
              <span className="hud__dot" /> REC
            </p>
            <p className="hud__exp">
              <span>ISO 400</span>
              <span>1/125</span>
              <span>ƒ2.8</span>
            </p>
            {countdown && <p className="hud__count">{countdown}</p>}
            <p className="hud__date">{EVENT.stamp}</p>
          </div>
        </div>

        <div className="hero__mast" data-hero-fade>
          <span>College Innovation &amp; Development Club presents</span>
          <span className="hero__mast-r">Vol. 01 · Issue 2K26 · AIT, Pune</span>
        </div>

        <ul className="hero__lines" aria-label="Inside this issue">
          <li data-hero-fade>
            <span className="hero__lines-k">Exclusive</span>
            {PROBLEMS.length} problems your campus needs solved
          </li>
          <li data-hero-fade>
            <span className="hero__lines-k">Prize pool</span>
            {EVENT.prizePoolLabel} up for grabs
          </li>
          <li data-hero-fade>
            <span className="hero__lines-k">Also inside</span>
            AI allowed. Vibecoding welcome.
          </li>
        </ul>

        <h1 id="hero-title" className="hero__title">
          <span className="hero__title-inner">
            <span className="sr-only">Campus Catalyst 2K26</span>
            <span className="hero__word t-display misreg" aria-hidden="true">
              <Chars text="Campus" />
            </span>
            <span className="hero__word t-display misreg" aria-hidden="true">
              <Chars text="Catalyst" />
              <span className="hero__caret" />
            </span>
            <span className="hero__stamp t-display" aria-hidden="true">
              2K26
            </span>
          </span>
        </h1>

        <div className="hero__foot">
          <div className="hero__tag" data-hero-fade>
            <p className="hero__tagline t-serif">Build what matters.</p>
            <p className="hero__slogan t-hand">{EVENT.slogan.join(' ')}</p>
          </div>
          <dl className="hero__when" data-hero-fade>
            <div>
              <dt className="sr-only">Time</dt>
              <dd>{EVENT.timeLabel}</dd>
            </div>
            <div>
              <dt className="sr-only">Date</dt>
              <dd>{EVENT.dateLabel}</dd>
            </div>
            <div>
              <dt className="sr-only">Venue</dt>
              <dd>AIT, Pune</dd>
            </div>
          </dl>
          <div className="hero__ctas" data-hero-fade>
            <RegisterButton size="lg">Register now</RegisterButton>
            <Button variant="ticket" size="lg" to="challenge">
              Explore the challenge
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
