import { useEffect, useState } from 'react'

/** Returns the id of the section currently occupying the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}
