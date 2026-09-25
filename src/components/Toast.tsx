import { useEffect, useState } from 'react'
import { onToast } from '../utils/toast'

export function Toast() {
  const [msg, setMsg] = useState<string | null>(null)
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const off = onToast((m) => {
      setMsg(m)
      clearTimeout(t)
      t = setTimeout(() => setMsg(null), 4200)
    })
    return () => {
      off()
      clearTimeout(t)
    }
  }, [])
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {msg && <p className="toast t-type">{msg}</p>}
    </div>
  )
}
