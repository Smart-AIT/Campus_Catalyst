import { useEffect, useRef, useState } from 'react'
import { Menu, Sparkles, Volume2, VolumeX, X } from 'lucide-react'
import { EVENT, LINKS, NAV } from '../data/event'
import { useActiveSection } from '../hooks/useActiveSection'
import { useFx } from '../utils/fx'
import { scrollToId, getLenis } from '../utils/scroll'
import { sfx } from '../utils/sound'
import { RegisterButton } from './Button'
import { InstagramIcon, LinkedinIcon } from './Icons'

const IDS: readonly string[] = NAV.map((n) => n.id)

export function Nav() {
  const active = useActiveSection(IDS)
  const { full, sound, toggleFx, toggleSound } = useFx()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuBtn = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const idx = Math.max(0, IDS.indexOf(active))

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // lock scroll + manage focus for the fullscreen mobile menu
  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      document.body.classList.add('is-locked')
      lenis?.stop()
      panel.current?.querySelector<HTMLElement>('a, button')?.focus()
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
        if (e.key === 'Tab' && panel.current) {
          const f = panel.current.querySelectorAll<HTMLElement>('a, button')
          const first = f[0]
          const last = f[f.length - 1]
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
      window.addEventListener('keydown', onKey)
      return () => {
        window.removeEventListener('keydown', onKey)
        document.body.classList.remove('is-locked')
        lenis?.start()
      }
    }
  }, [open])

  const go = (id: string, fromMenu = false) => {
    sfx.advance()
    if (fromMenu) {
      setOpen(false)
      menuBtn.current?.focus()
      requestAnimationFrame(() => scrollToId(id))
    } else scrollToId(id)
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav__bar">
          <a
            href="#home"
            className="nav__logo"
            onClick={(e) => {
              e.preventDefault()
              go('home')
            }}
          >
            <span className="nav__logo-cidc">CIDC</span>
            <span className="nav__logo-x" aria-hidden="true">×</span>
            <span className="nav__logo-cc">Campus Catalyst</span>
            <span className="sr-only">— back to top</span>
          </a>

          <nav aria-label="Primary" className="nav__links">
            <ul>
              {NAV.filter((n) => n.id !== 'register').map((n, i) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    aria-current={active === n.id ? 'true' : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      go(n.id)
                    }}
                  >
                    <span className="nav__num">{String(i + 1).padStart(2, '0')}</span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__tools">
            <span className="nav__counter" aria-hidden="true">
              <span className="nav__rec" />
              FR {String(idx + 1).padStart(2, '0')}/{String(IDS.length).padStart(2, '0')}
            </span>
            <button type="button" className="nav__icon" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? 'Turn sound effects off' : 'Turn sound effects on'} title="Sound effects">
              {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button type="button" className="nav__icon" onClick={toggleFx} aria-pressed={full} aria-label={full ? 'Reduce visual effects' : 'Enable full visual effects'} title={full ? 'Effects: full' : 'Effects: lite'}>
              <Sparkles size={16} />
              <span className="nav__fx">{full ? 'FX' : 'LITE'}</span>
            </button>
            <RegisterButton size="md" className="nav__cta" arrow={false} magnetic={false}>
              Register
            </RegisterButton>
            <button ref={menuBtn} type="button" className="nav__menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
              {open ? <X size={22} /> : <Menu size={22} />}
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
        <div className="nav__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(idx + 1) / IDS.length})` }} />
        </div>
      </header>

      <div id="mobile-menu" ref={panel} className={`menu ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Site menu" hidden={!open}>
        <div className="menu__head t-kicker">
          <span>Contact sheet · Roll 02</span>
          <button type="button" className="menu__close" onClick={() => setOpen(false)}>
            <X size={20} /> Close
          </button>
        </div>
        <ul className="menu__list">
          {NAV.map((n, i) => (
            <li key={n.id} style={{ ['--i' as string]: i }}>
              <a
                href={`#${n.id}`}
                className={active === n.id ? 'is-active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  go(n.id, true)
                }}
              >
                <span className="menu__frame">{String(i + 1).padStart(2, '0')}A</span>
                <span className="menu__label">{n.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <p className="t-type">
            {EVENT.dateLabel} · {EVENT.timeLabel} · AIT, Pune
          </p>
          <div className="menu__toggles">
            <button type="button" onClick={toggleSound} aria-pressed={sound}>
              {sound ? <Volume2 size={16} /> : <VolumeX size={16} />} Sound {sound ? 'on' : 'off'}
            </button>
            <button type="button" onClick={toggleFx} aria-pressed={full}>
              <Sparkles size={16} /> Effects {full ? 'full' : 'lite'}
            </button>
          </div>
          <div className="menu__social">
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="CIDC on Instagram (opens in a new tab)">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="CIDC on LinkedIn (opens in a new tab)">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
