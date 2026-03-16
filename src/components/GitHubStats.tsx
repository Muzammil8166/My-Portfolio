import { motion } from 'framer-motion'
import { BarChart3, GitFork, Star, Users } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { SITE } from '../data/siteData'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

type GithubUser = {
  public_repos: number
  followers: number
}

type GithubRepo = {
  stargazers_count: number
  forks_count: number
  language: string | null
}

export function GitHubStats() {
  const username = SITE.githubUsername
  const [user, setUser] = useState<GithubUser | null>(null)
  const [repos, setRepos] = useState<GithubRepo[] | null>(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`).then((x) => x.json()),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          ).then((x) => x.json()),
        ])

        if (cancelled) return
        setUser(u)
        setRepos(Array.isArray(r) ? r : null)
      } catch {
        if (!cancelled) {
          setUser(null)
          setRepos(null)
        }
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [username])

  const aggregates = useMemo(() => {
    const stars = (repos ?? []).reduce((acc, r) => acc + (r.stargazers_count || 0), 0)
    const forks = (repos ?? []).reduce((acc, r) => acc + (r.forks_count || 0), 0)
    const langs = new Map<string, number>()
      ; (repos ?? []).forEach((r) => {
        if (!r.language) return
        langs.set(r.language, (langs.get(r.language) ?? 0) + 1)
      })
    const topLangs = Array.from(langs.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
    return { stars, forks, topLangs }
  }, [repos])

  const statsCards = [
    {
      icon: <BarChart3 className="h-4 w-4" />,
      label: 'Repositories',
      value: user?.public_repos ?? '—',
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: 'Followers',
      value: user?.followers ?? '—',
    },
    {
      icon: <Star className="h-4 w-4" />,
      label: 'Total Stars',
      value: repos ? aggregates.stars : '—',
    },
    {
      icon: <GitFork className="h-4 w-4" />,
      label: 'Total Forks',
      value: repos ? aggregates.forks : '—',
    },
  ] as const

  const readmeStats = `https://github-readme-stats.vercel.app/api?username=${encodeURIComponent(
    username,
  )}&show_icons=true&hide_title=true&rank_icon=github&theme=transparent`
  const langStats = `https://github-readme-stats.vercel.app/api/top-langs/?username=${encodeURIComponent(
    username,
  )}&layout=compact&theme=transparent`

  return (
    <section id="github" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="GitHub"
          title="Open-source & activity"
          subtitle="Live stats powered by the GitHub API."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statsCards.map((c, idx) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.03 }}
              className="glass rounded-3xl p-5"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-[rgb(var(--muted))]">
                <span className="grid h-7 w-7 place-items-center rounded-xl bg-[rgb(var(--fg))]/5 ring-1 ring-[rgb(var(--fg))]/10">
                  {c.icon}
                </span>
                {c.label}
              </div>
              <div className="mt-3 text-2xl font-semibold">{c.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="glass overflow-hidden rounded-3xl p-4"
          >
            <div className="text-sm font-semibold">Repository stats</div>
            <img
              src={readmeStats}
              alt="GitHub stats"
              loading="lazy"
              className="mt-3 w-full opacity-90"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.04 }}
            className="glass overflow-hidden rounded-3xl p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">Most used languages</div>
              {repos ? (
                <div className="text-xs text-[rgb(var(--muted))]">
                  {aggregates.topLangs.map(([k]) => k).join(' · ')}
                </div>
              ) : null}
            </div>
            <img
              src={langStats}
              alt="Top languages"
              loading="lazy"
              className="mt-3 w-full opacity-90"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="glass mt-4 overflow-hidden rounded-3xl p-4"
        >
          <div className="text-sm font-semibold mb-2">Contribution graph</div>
          <div className="mt-4 overflow-x-auto flex w-full justify-center">
            <GitHubCalendar
              username={username}
              colorScheme="dark"
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

