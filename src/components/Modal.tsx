import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export function Modal(props: {
  open: boolean
  title?: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <AnimatePresence>
      {props.open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) props.onClose()
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={props.title ?? 'Modal'}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--card))]/90 shadow-2xl backdrop-blur-xl"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className="flex items-center justify-between border-b border-[rgb(var(--fg))]/10 px-5 py-4">
              <div className="text-sm font-semibold">{props.title}</div>
              <button
                className="rounded-lg p-2 text-[rgb(var(--muted))] transition hover:bg-[rgb(var(--fg))]/5 hover:text-[rgb(var(--fg))]"
                onClick={props.onClose}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5">{props.children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

