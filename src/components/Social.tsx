import { LINKS } from '../data/event'
import { InstagramIcon, LinkedinIcon } from './Icons'

/** Social links styled as luggage-tag / ticket stubs. */
export function Social({ className = '' }: { className?: string }) {
  return (
    <ul className={`social ${className}`}>
      <li>
        <a className="social__tag" href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="social__icon" />
          <span>@cidc.ait</span>
          <span className="sr-only"> on Instagram (opens in a new tab)</span>
        </a>
      </li>
      <li>
        <a className="social__tag" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedinIcon className="social__icon" />
          <span>LinkedIn</span>
          <span className="sr-only"> — CIDC (opens in a new tab)</span>
        </a>
      </li>
    </ul>
  )
}
