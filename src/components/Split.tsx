import { Fragment } from 'react'

/** Splits a string into masked word spans for staggered headline reveals.
 *  Screen readers get one plain-text copy; the animated words are hidden. */
export function SplitWords({ text, className = '' }: { text: string; className?: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      {text.split(' ').map((w, i, a) => (
        <Fragment key={i}>
          <span className={`split-mask ${className}`} aria-hidden="true">
            <span className="split-word">{w}</span>
          </span>
          {i < a.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  )
}
