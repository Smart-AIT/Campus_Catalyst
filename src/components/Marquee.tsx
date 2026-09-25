import type { ReactNode } from 'react'

/** Endless ticker. Content is duplicated for the loop; the copy is hidden
 *  from assistive tech. Pauses on hover and under reduced motion. */
export function Marquee({ items, className = '', reverse = false }: { items: ReactNode[]; className?: string; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={i}>
          {it}
          <span className="marquee__sep" aria-hidden="true">
            ✶
          </span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className={`marquee ${reverse ? 'marquee--rev' : ''} ${className}`}>
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
