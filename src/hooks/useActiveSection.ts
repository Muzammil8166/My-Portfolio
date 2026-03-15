import { useEffect, useMemo, useState } from 'react'
import type { NavSectionId } from '../data/siteData'

// Scroll-based "scrollspy" that picks the section whose top is closest
// to a viewport anchor (roughly 25% from the top). This is more reliable
// than IntersectionObserver for mixed-height sections.
export function useActiveSection(sectionIds: NavSectionId[]) {
  const ids = useMemo(() => Array.from(new Set(sectionIds)), [sectionIds])
  const [active, setActive] = useState<NavSectionId>(ids[0] ?? 'home')

  useEffect(() => {
    if (!ids.length) return

    const handleScroll = () => {
      const viewportAnchor = window.innerHeight * 0.25

      let closestId: NavSectionId | null = null
      let closestDistance = Number.POSITIVE_INFINITY

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue

        const rect = el.getBoundingClientRect()
        const distance = Math.abs(rect.top - viewportAnchor)

        if (distance < closestDistance) {
          closestDistance = distance
          closestId = id
        }
      }

      if (closestId && closestId !== active) {
        setActive(closestId)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [active, ids])

  return active
}

