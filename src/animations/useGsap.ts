import { useLayoutEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from './gsap'

/** Runs GSAP code scoped to a ref and reverts everything on cleanup. */
export function useGsap(
  fn: (ctx: gsap.Context) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    if (!scope.current) return
    const ctx = gsap.context((self) => fn(self), scope.current)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
