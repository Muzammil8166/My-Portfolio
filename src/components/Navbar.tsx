import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { NAV } from '../data/siteData'
import type { NavSectionId } from '../data/siteData'
import { Container } from './Container'
import { Button } from './Button'

function scrollToId(id: NavSectionId) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Navbar(props: {
  active: NavSectionId
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const items = useMemo(() => NAV, [])

  return (
    <motion.header
      className="sticky top-0 z-50"
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <div
        className={[
          'border-b border-[rgb(var(--fg))]/10',
          scrolled
            ? 'bg-[rgb(var(--bg))]/70 backdrop-blur-xl'
            : 'bg-transparent',
        ].join(' ')}
      >
        <Container className="flex h-16 items-center justify-between">
          <button
            onClick={() => scrollToId('home')}
            className="group inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold tracking-tight hover:bg-[rgb(var(--fg))]/5"
          >
            <span className="relative grid h-6 w-6 place-items-center rounded-lg bg-[rgb(var(--fg))]/5 ring-1 ring-[rgb(var(--fg))]/10">
              <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent))]" />
            </span>
            <span className="text-[rgb(var(--fg))]">
              {import.meta.env.VITE_BRAND ?? 'Portfolio'}
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {items.map((item) => {
              const isActive = item.id === props.active
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToId(item.id)}
                  className={[
                    'relative rounded-xl px-3 py-2 text-sm transition',
                    isActive
                      ? 'text-[rgb(var(--fg))]'
                      : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]',
                  ].join(' ')}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className={[
                        'absolute inset-0 -z-10 rounded-xl',
                        props.theme === 'light'
                          ? 'bg-black/5 ring-1 ring-black/10'
                          : 'bg-[rgb(var(--fg))]/5 ring-1 ring-[rgb(var(--fg))]/10',
                      ].join(' ')}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="h-10 w-10 px-0"
              aria-label="Toggle theme"
              onClick={props.onToggleTheme}
            >
              {props.theme === 'dark' ? (
                <Sun className="h-4.5 w-4.5" />
              ) : (
                <Moon className="h-4.5 w-4.5" />
              )}
            </Button>

            <Button
              variant="secondary"
              className="hidden md:inline-flex"
              onClick={() => scrollToId('contact')}
            >
              Let’s talk
            </Button>

            <button
              className="grid h-10 w-10 place-items-center rounded-xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 text-[rgb(var(--fg))] transition hover:bg-[rgb(var(--fg))]/10 md:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[55] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60"
              onMouseDown={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-3 top-3 w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--card))]/95 shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div className="text-sm font-semibold">Menu</div>
                <button
                  className="rounded-lg p-2 text-[rgb(var(--muted))] transition hover:bg-[rgb(var(--fg))]/5 hover:text-[rgb(var(--fg))]"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="border-t border-[rgb(var(--fg))]/10 p-2">
                {items.map((item) => (
                  <button
                    key={item.id}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-[rgb(var(--fg))] hover:bg-[rgb(var(--fg))]/5"
                    onClick={() => {
                      setOpen(false)
                      scrollToId(item.id)
                    }}
                  >
                    <span>{item.label}</span>
                    {item.id === props.active ? (
                      <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
                    ) : null}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}

