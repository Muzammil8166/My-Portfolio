import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Github, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { PROJECTS, SITE, type Project } from '../data/siteData'
import { Button } from './Button'
import { Container } from './Container'
import { Modal } from './Modal'
import { SectionHeading } from './SectionHeading'

type GithubRepoLite = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  language: string | null
}

export function Projects() {
  const allTags = useMemo(() => {
    const s = new Set<string>()
    PROJECTS.forEach((p) => p.tags.forEach((t) => s.add(t)))
    return ['All', ...Array.from(s)]
  }, [])

  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const [latestRepos, setLatestRepos] = useState<GithubRepoLite[] | null>(null)

  const filtered = useMemo(() => {
    if (filter === 'All') return PROJECTS
    return PROJECTS.filter((p) => p.tags.includes(filter))
  }, [filter])

  useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        const r = await fetch(
          `https://api.github.com/users/${SITE.githubUsername}/repos?per_page=6&sort=updated`,
        ).then((x) => x.json())
        if (!cancelled) setLatestRepos(Array.isArray(r) ? r : null)
      } catch {
        if (!cancelled) setLatestRepos(null)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="projects" className="py-6 sm:py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work"
            subtitle="A few projects that highlight full-stack execution, UX polish, and scalable architecture."
          />

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 px-3 py-2 text-xs text-[rgb(var(--muted))]">
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 8).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={[
                    'rounded-xl px-3 py-2 text-xs font-medium transition',
                    t === filter
                      ? 'bg-[rgb(var(--fg))]/10 text-[rgb(var(--fg))] ring-1 ring-[rgb(var(--fg))]/15'
                      : 'bg-[rgb(var(--fg))]/5 text-[rgb(var(--muted))] ring-1 ring-[rgb(var(--fg))]/10 hover:bg-[rgb(var(--fg))]/10 hover:text-[rgb(var(--fg))]',
                  ].join(' ')}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          layout
          className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.button
                key={p.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelected(p)}
                className="group glass text-left rounded-3xl p-4 transition hover:-translate-y-[2px] hover:border-[rgb(var(--fg))]/20"
              >
                <div className="relative overflow-hidden rounded-2xl border border-[rgb(var(--fg))]/10 bg-black/20">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-44 w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70" />
                </div>

                <div className="mt-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold">{p.title}</h3>
                    <span className="rounded-full bg-[rgb(var(--fg))]/5 px-2 py-1 text-[10px] text-[rgb(var(--muted))] ring-1 ring-[rgb(var(--fg))]/10">
                      View
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">
                    {p.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[rgb(var(--fg))]/5 px-2.5 py-1 text-[11px] text-[rgb(var(--muted))] ring-1 ring-[rgb(var(--fg))]/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <Modal
          open={!!selected}
          title={selected?.title}
          onClose={() => setSelected(null)}
        >
          {selected ? (
            <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
              <div className="overflow-hidden rounded-2xl border border-[rgb(var(--fg))]/10 bg-black/20">
                <img
                  src={selected.image}
                  alt={selected.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm leading-relaxed text-[rgb(var(--muted))]">
                  {selected.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selected.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[rgb(var(--fg))]/5 px-2.5 py-1 text-[11px] text-[rgb(var(--muted))] ring-1 ring-[rgb(var(--fg))]/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href={selected.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex"
                  >
                    <Button variant="secondary">
                      <Github className="h-4 w-4" />
                      GitHub
                    </Button>
                  </a>
                  {selected.liveUrl ? (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex"
                    >
                      <Button>
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Button>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div />
          )}
        </Modal>

        <div className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">Latest GitHub repos</div>
              <div className="mt-1 text-sm text-[rgb(var(--muted))]">
                Pulled live from{' '}
                <span className="font-mono">{SITE.githubUsername}</span>
              </div>
            </div>
            <a
              href={`https://github.com/${SITE.githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-purple-300 hover:text-purple-200"
            >
              View profile →
            </a>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {(latestRepos ?? []).slice(0, 6).map((r) => (
              <a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-3xl p-5 transition hover:-translate-y-[2px] hover:border-[rgb(var(--fg))]/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-[rgb(var(--fg))]/5 px-2 py-1 text-[10px] text-[rgb(var(--muted))] ring-1 ring-[rgb(var(--fg))]/10">
                    <Github className="h-3.5 w-3.5" />
                    {r.stargazers_count}
                  </div>
                </div>
                <div className="mt-2 text-sm text-[rgb(var(--muted))]">
                  {r.description ?? 'No description provided.'}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-[rgb(var(--muted))]">
                  <span>{r.language ?? '—'}</span>
                  <span className="inline-flex items-center gap-1">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open
                  </span>
                </div>
              </a>
            ))}
            {latestRepos && latestRepos.length === 0 ? (
              <div className="glass rounded-3xl p-5 text-sm text-[rgb(var(--muted))]">
                No repositories found.
              </div>
            ) : null}
            {latestRepos === null ? (
              <div className="glass rounded-3xl p-5 text-sm text-[rgb(var(--muted))]">
                Couldn’t load repos right now (rate limit or network). The rest
                of the portfolio still works.
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}

