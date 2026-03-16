import { ArrowUp } from 'lucide-react'
import { SITE, SOCIALS } from '../data/siteData'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--fg))]/10 py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold">{SITE.name}</div>
          <div className="mt-1 text-xs text-[rgb(var(--muted))]">
            © {new Date().getFullYear()} · All rights reserved.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 text-[rgb(var(--fg))]/80 transition hover:-translate-y-[1px] hover:bg-[rgb(var(--fg))]/10 hover:text-[rgb(var(--fg))]"
              aria-label={s.label}
            >
              <s.icon className="h-5 w-5" />
            </a>
          ))}
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            className="ml-2 inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 px-3 py-2 text-sm text-[rgb(var(--fg))]/80 transition hover:-translate-y-[1px] hover:bg-[rgb(var(--fg))]/10 hover:text-[rgb(var(--fg))]"
          >
            <ArrowUp className="h-4 w-4" />
            Top
          </button>
        </div>
      </Container>
    </footer>
  )
}

