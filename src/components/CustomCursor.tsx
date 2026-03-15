import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [enabled] = useState(() => !window.matchMedia('(pointer: coarse)').matches)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 35 })
  const sy = useSpring(y, { stiffness: 500, damping: 35 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - 10)
      y.set(e.clientY - 10)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] h-5 w-5 rounded-full border border-[rgb(var(--accent))]/70 bg-[rgb(var(--accent))]/16  backdrop-blur-md"
      style={{ translateX: sx, translateY: sy }}
    />
  )
}

