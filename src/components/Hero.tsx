import { motion } from 'framer-motion'
import { ArrowDownRight, Download } from 'lucide-react'
import { SITE, SOCIALS } from '../data/siteData'
import { useTypewriter } from '../hooks/useTypewriter'
import { Container } from './Container'
import { Button } from './Button'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  const { text } = useTypewriter(SITE.typingPhrases)

  return (
    <section id="home" className="relative overflow-hidden scroll-mt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-48 h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -right-40 -top-32 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-3xl" />
      </div>

      <Container className="relative pb-14 pt-8 sm:pb-20 sm:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[rgb(var(--muted))]"
            >
              <span className="h-2 w-2 animate-ping rounded-full bg-[rgb(var(--accent))]" />
              Available For Impactful Projects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                {SITE.name}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-4 text-base text-[rgb(var(--muted))] sm:text-lg"
            >
              <span className="font-medium text-[rgb(var(--fg))]">
                {SITE.role}
              </span>{' '}
              building modern web apps end-to-end.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-4 max-w-2xl text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-base"
            >
              {SITE.tagline}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <div className='flex flex-col gap-3'>
                <div className="rounded-2xl border border-black/10 bg-white/5 px-4 py-2 font-mono text-sm text-[rgb(var(--fg))]">
                  <span className="text-[rgb(var(--muted))]">$</span>{' '}
                  <span className="text-purple-500">{text}</span>
                  <span className="ml-1 inline-block h-4 w-[3px] animate-pulse rounded-full bg-[rgb(var(--accent))] align-[-2px]" />
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => scrollTo('projects')}>
                    View Projects <ArrowDownRight className="h-4 w-4" />
                  </Button>

                  <a href={SITE.resumeUrl} download className="inline-flex">
                    <Button variant="secondary">
                      Download Resume <Download className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-7 flex items-center gap-2"
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white/10 text-[rgb(var(--fg))]/80 transition hover:-translate-y-[1px] hover:bg-white/10 hover:text-[rgb(var(--fg))]"
                  aria-label={s.label}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="glass relative overflow-hidden rounded-3xl p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-400/10" />
              <div className="relative">
                <div className="text-sm font-semibold">Currently focused on</div>
                <ul className="mt-4 space-y-3 text-sm text-[rgb(var(--muted))]">
                  <li className="flex items-center justify-between">
                    <span>Design systems</span>
                    <span className="font-mono text-xs text-[rgb(var(--fg))]/80">
                      UI/UX
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Performance & DX</span>
                    <span className="font-mono text-xs text-[rgb(var(--fg))]/80">
                      LCP/INP
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Scalable backend</span>
                    <span className="font-mono text-xs text-[rgb(var(--fg))]/80">
                      APIs
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>CI/CD automation</span>
                    <span className="font-mono text-xs text-[rgb(var(--fg))]/80">
                      Shipping
                    </span>
                  </li>
                </ul>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="text-xs text-[rgb(var(--muted))]">
                    Based in
                  </div>
                  <div className="mt-1 text-sm font-semibold">{SITE.location}</div>
                  <div className="mt-3 text-xs text-[rgb(var(--muted))]">
                    Email
                  </div>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-1 block text-sm font-semibold text-purple-500 dark:text-purple-300 hover:text-purple-400"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

