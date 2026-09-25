import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { gsap } from '../animations/gsap'
import { ARCHIVE, EVENT, IMAGES } from '../data/event'
import { getLenis } from '../utils/scroll'
import { useFx } from '../utils/fx'
import { sfx } from '../utils/sound'
import { Photo } from './Photo'

export default function Lightbox({ index, onIndex, onClose }: { index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const { full } = useFx()
  const a = ARCHIVE[index]
  const spec = IMAGES[a.image]

  useEffect(() => {
    const d = ref.current!
    const opener = document.activeElement as HTMLElement | null
    d.showModal()
    getLenis()?.stop()
    document.body.classList.add('is-locked')
    return () => {
      getLenis()?.start()
      document.body.classList.remove('is-locked')
      opener?.focus()
    }
  }, [])

  useEffect(() => {
    if (!full) return
    gsap.fromTo('.lb__print', { scale: 0.85, rotate: -4, opacity: 0, filter: 'brightness(2.4)' }, { scale: 1, rotate: -1, opacity: 1, filter: 'brightness(1)', duration: 0.6, ease: 'power3.out' })
  }, [index, full])

  const step = (dir: number) => {
    sfx.advance()
    onIndex((index + dir + ARCHIVE.length) % ARCHIVE.length)
  }

  return (
    <dialog
      ref={ref}
      className="lb"
      aria-labelledby="lb-cap"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1)
        if (e.key === 'ArrowLeft') step(-1)
      }}
    >
      <div className="lb__inner">
        <div className="lb__frame">
          <div className="lb__edge t-type" aria-hidden="true">
            <span>CATALYST 400</span>
            <span>▸ {a.frame}</span>
            <span>{a.label}</span>
          </div>
          <figure className="lb__print">
            <Photo image={a.image} leak="tr" sizes="90vw" />
            <figcaption id="lb-cap" className="lb__cap">
              <span className="t-hand">{spec.caption}</span>
              <span className="lb__alt">{spec.alt}</span>
            </figcaption>
          </figure>
          <dl className="lb__meta t-type">
            <div><dt>Frame</dt><dd>{a.frame}</dd></div>
            <div><dt>ISO</dt><dd>400</dd></div>
            <div><dt>Shutter</dt><dd>1/125</dd></div>
            <div><dt>Aperture</dt><dd>ƒ2.8</dd></div>
            <div><dt>Place</dt><dd>{EVENT.instituteShort}, {EVENT.city}</dd></div>
          </dl>
        </div>
        <div className="lb__controls">
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo"><ChevronLeft /></button>
          <span className="t-type" aria-live="polite">{String(index + 1).padStart(2, '0')} / {String(ARCHIVE.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => step(1)} aria-label="Next photo"><ChevronRight /></button>
        </div>
        <button type="button" className="lb__close" onClick={() => ref.current?.close()} aria-label="Close photo">
          <X />
        </button>
      </div>
    </dialog>
  )
}
