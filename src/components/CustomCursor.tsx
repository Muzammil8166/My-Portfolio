import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const [enabled] = useState(() => !window.matchMedia('(pointer: coarse)').matches)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 35 })
  const sy = useSpring(y, { stiffness: 500, damping: 35 })
  const frameRef = useRef<number | null>(null)
  const lastPosRef = useRef({ x: -100, y: -100 })
  const nextPosRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (!enabled) return

    const flush = () => {
      frameRef.current = null
      const { x: nx, y: ny } = nextPosRef.current
      const { x: lx, y: ly } = lastPosRef.current

      if (nx === lx && ny === ly) return

      x.set(nx)
      y.set(ny)
      lastPosRef.current = { x: nx, y: ny }
    }

    const onMove = (e: PointerEvent) => {
      nextPosRef.current = { x: e.clientX - 10, y: e.clientY - 10 }
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(flush)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener('pointermove', onMove)
    }
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

