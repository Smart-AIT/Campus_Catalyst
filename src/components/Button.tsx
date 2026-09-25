import { useRef, type MouseEvent, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'
import { sfx } from '../utils/sound'
import { scrollToId } from '../utils/scroll'
import { isRegistrationOpen, LINKS } from '../data/event'
import { toast } from '../utils/toast'

type Variant = 'red' | 'ticket' | 'dark' | 'ghost'

type Props = {
  children: ReactNode
  variant?: Variant
  size?: 'md' | 'lg' | 'xl'
  href?: string
  /** internal section id to smooth-scroll to */
  to?: string
  onClick?: () => void
  arrow?: boolean
  className?: string
  magnetic?: boolean
}

export function Button({ children, variant = 'red', size = 'md', href, to, onClick, arrow = true, className = '', magnetic = true }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  useMagnetic(ref, magnetic ? 0.25 : 0)
  const cls = `btn btn--${variant} btn--${size} ${className}`
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && <ArrowRight className="btn__arrow" aria-hidden="true" strokeWidth={2.5} />}
    </>
  )

  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a ref={ref} className={cls} href={href} onClick={() => sfx.click()} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    )
  }

  const handle = (e: MouseEvent) => {
    sfx.click()
    if (to) {
      e.preventDefault()
      scrollToId(to)
    }
    onClick?.()
  }
  if (to) {
    return (
      <a ref={ref} className={cls} href={`#${to}`} onClick={handle}>
        {inner}
      </a>
    )
  }
  return (
    <button ref={ref} type="button" className={cls} onClick={handle}>
      {inner}
    </button>
  )
}

/** Register CTA. Uses REGISTRATION_URL from data/event.ts; until that is set
 *  it explains that registration opens soon rather than linking nowhere. */
export function RegisterButton({ children = 'Register on Unstop', ...rest }: Omit<Props, 'href' | 'to' | 'onClick'> & { children?: ReactNode }) {
  if (isRegistrationOpen()) {
    return (
      <Button href={LINKS.registration} {...rest}>
        {children}
      </Button>
    )
  }
  return (
    <Button {...rest} onClick={() => toast('Registration on Unstop opens soon — follow @cidc.ait on Instagram for the link.')}>
      {children}
    </Button>
  )
}
