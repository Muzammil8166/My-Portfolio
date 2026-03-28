import { useEffect, useMemo, useRef, useState } from 'react'
import type { NavSectionId } from '../data/siteData'

// Scroll-based "scrollspy" that picks the section whose top is closest
// to a viewport anchor (roughly 25% from the top). This is more reliable
// than IntersectionObserver for mixed-height sections.
export function useActiveSection(sectionIds: NavSectionId[]) {
  const ids = useMemo(() => Array.from(new Set(sectionIds)), [sectionIds])
  const [active, setActive] = useState<NavSectionId>(ids[0] ?? 'home')
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!ids.length) return
    const sections = ids
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter(
        (x): x is { id: NavSectionId; el: HTMLElement } => x.el instanceof HTMLElement,
      )

    if (!sections.length) return

    const measure = () => {
      const viewportAnchor = window.innerHeight * 0.25

      let closestId: NavSectionId | null = null
      let closestDistance = Number.POSITIVE_INFINITY

      for (const { id, el } of sections) {
        const rect = el.getBoundingClientRect()
        const distance = Math.abs(rect.top - viewportAnchor)

        if (distance < closestDistance) {
          closestDistance = distance
          closestId = id
        }
      }

      if (closestId) {
        setActive((prev) => (prev === closestId ? prev : closestId))
      }

      frameRef.current = null
    }

    const scheduleMeasure = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(measure)
    }

    const onResize = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
      measure()
    }

    measure()
    window.addEventListener('scroll', scheduleMeasure, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener('scroll', scheduleMeasure)
      window.removeEventListener('resize', onResize)
    }
  }, [ids])

  return active
}

