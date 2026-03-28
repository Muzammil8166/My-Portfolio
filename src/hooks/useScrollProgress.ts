import { useEffect, useRef, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      const p = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      const next = Math.min(1, Math.max(0, p))
      setProgress((prev) => (Math.abs(prev - next) < 0.001 ? prev : next))
      frameRef.current = null
    }

    const onScroll = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return progress
}

