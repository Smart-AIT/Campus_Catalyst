import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { IMAGES, type Problem } from '../data/event'
import { getLenis } from '../utils/scroll'
import { RegisterButton } from './Button'
import { Photo } from './Photo'

/** Magazine-page detail view for one problem. Native <dialog> gives us focus
 *  trapping, Esc-to-close and inert background for free. */
export default function ProblemDialog({ problem, onClose }: { problem: Problem; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

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

  return (
    <dialog
      ref={ref}
      className="pdialog paper"
      aria-labelledby="pdialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="pdialog__inner">
        <button type="button" className="pdialog__close" onClick={() => ref.current?.close()} aria-label="Close problem details">
          <X size={22} />
        </button>
        <div className="pdialog__photo">
          <Photo image={problem.image} className="print" leak="tr" />
          <p className="caption">{IMAGES[problem.image].caption}</p>
        </div>
        <div className="pdialog__copy">
          <p className="t-kicker text-red">Problem #{problem.no} · Option 01</p>
          <h2 id="pdialog-title" className="pdialog__title t-display">
            {problem.title}
          </h2>
          <p className="pdialog__short t-serif">{problem.short}</p>
          <p className="pdialog__desc">{problem.description}</p>
          <ul className="pdialog__tags" aria-label="Themes">
            {problem.tags.map((t) => (
              <li key={t} className="t-type">
                {t}
              </li>
            ))}
          </ul>
          <p className="pdialog__note t-type">Build it live — 09:00 to 18:00, 17 October 2026. Any tech stack. AI tools allowed.</p>
          <RegisterButton size="md">Register on Unstop</RegisterButton>
        </div>
      </div>
    </dialog>
  )
}
