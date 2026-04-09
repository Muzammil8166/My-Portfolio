import { motion } from 'framer-motion'
import { BarChart3, BookMarked, CircleDot, GitCommitHorizontal, GitFork, GitPullRequest, Star, Users } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { SITE } from '../data/siteData'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

// ─── Types ────────────────────────────────────────────────────────────────────

type GithubUser = {
  public_repos: number
  followers: number
  name: string
}

type GithubRepo = {
  name: string
  stargazers_count: number
  forks_count: number
  language: string | null
}

// ─── Language colours (GitHub's official palette) ────────────────────────────

const LANG_COLORS: Record<string, string> = {
  TypeScript:  '#3178c6',
  JavaScript:  '#f1e05a',
  Python:      '#3572A5',
  HTML:        '#e34c26',
  CSS:         '#563d7c',
  SCSS:        '#c6538c',
  'C++':       '#f34b7d',
  C:           '#555555',
  Java:        '#b07219',
  Go:          '#00ADD8',
  Rust:        '#dea584',
  Vue:         '#41b883',
  Svelte:      '#ff3e00',
  PHP:         '#4F5D95',
  Ruby:        '#701516',
  Swift:       '#FA7343',
  Kotlin:      '#A97BFF',
  Dart:        '#00B4AB',
  Shell:       '#89e051',
}

function getLangColor(lang: string) {
  return LANG_COLORS[lang] ?? '#8b949e'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-white/10 ${className}`} />
}

function computeGrade(stars: number, commits: number, prs: number, followers: number, repos: number) {
  const score =
    commits * 6.5 +
    prs     * 6   +
    stars   * 0.045 +
    followers * 0.45 +
    repos   * 0.5

  if (score >= 400) return { letter: 'A+', pct: 95 }
  if (score >= 250) return { letter: 'A',  pct: 85 }
  if (score >= 150) return { letter: 'A-', pct: 75 }
  if (score >= 100) return { letter: 'B+', pct: 65 }
  if (score >= 60)  return { letter: 'B',  pct: 55 }
  if (score >= 30)  return { letter: 'B-', pct: 45 }
  return              { letter: 'C',  pct: 35 }
}

// ─── Circular grade ring ──────────────────────────────────────────────────────

function GradeRing({ letter, pct }: { letter: string; pct: number }) {
  const r    = 38
  const circ = 2 * Math.PI * r
  const dash = circ * (pct / 100)

  return (
    <div className="relative flex items-center justify-center w-[90px] h-[90px] shrink-0">
      <svg width="90" height="90" viewBox="0 0 90 90" className="-rotate-90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(var(--fg) / 0.15)" strokeWidth="6" />
        <motion.circle
          cx="45" cy="45" r={r}
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ - dash }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <span className="absolute text-xl font-bold" style={{ color: 'rgb(var(--accent))' }}>
        {letter}
      </span>
    </div>
  )
}

// ─── GitHub Stats Card ────────────────────────────────────────────────────────

type StatsCardProps = {
  username:      string
  user:          GithubUser | null
  stars:         number
  commits:       number | null
  prs:           number | null
  issues:        number | null
  contributedTo: number | null
  loading:       boolean
  error:         boolean
}

function GitHubStatsCard({
  username, user, stars, commits, prs, issues, contributedTo, loading, error,
}: StatsCardProps) {
  const grade = useMemo(() => {
    if (!user || commits === null) return null
    return computeGrade(stars, commits, prs ?? 0, user.followers, user.public_repos)
  }, [user, stars, commits, prs])

  const rows = [
    { icon: <Star                className="h-4 w-4" />, label: 'Total Stars:',                            value: stars },
    { icon: <GitCommitHorizontal className="h-4 w-4" />, label: `Total Commits (${new Date().getFullYear()}):`, value: commits },
    { icon: <GitPullRequest      className="h-4 w-4" />, label: 'Total PRs:',                              value: prs },
    { icon: <CircleDot           className="h-4 w-4" />, label: 'Total Issues:',                           value: issues },
    { icon: <BookMarked          className="h-4 w-4" />, label: 'Contributed to:',                         value: contributedTo },
  ]

  return (
    <div className="glass rounded-2xl p-5 flex items-center gap-4 h-full">
      {/* Left: stat rows */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold mb-3" style={{ color: 'rgb(var(--accent))' }}>
          {user?.name ?? username}'s GitHub Stats
        </h3>

        <div className="space-y-2">
          {rows.map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              <span style={{ color: 'rgb(var(--accent))' }}>{icon}</span>
              <span style={{ color: 'rgb(var(--muted))' }} className="flex-1">{label}</span>
              {loading ? (
                <Skeleton className="h-4 w-8" />
              ) : error || value === null ? (
                <span className="font-bold" style={{ color: 'rgb(var(--fg))' }}>—</span>
              ) : (
                <span className="font-bold" style={{ color: 'rgb(var(--accent))' }}>{value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: grade ring */}
      <div>
        {loading || !grade ? (
          <Skeleton className="w-[90px] h-[90px] rounded-full" />
        ) : (
          <GradeRing letter={grade.letter} pct={grade.pct} />
        )}
      </div>
    </div>
  )
}

// ─── Most Used Languages Card ─────────────────────────────────────────────────

type LangEntry = { lang: string; pct: number }

function LanguagesCard({ langs, loading, error }: { langs: LangEntry[]; loading: boolean; error: boolean }) {
  return (
    <div className="glass rounded-2xl p-5 h-full">
      <h3 className="text-base font-bold mb-3" style={{ color: 'rgb(var(--accent))' }}>
        Most Used Languages
      </h3>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-3 w-full rounded-full" />
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
          </div>
        </div>
      ) : error || langs.length === 0 ? (
        <p className="text-sm py-4 text-center" style={{ color: 'rgb(var(--muted))' }}>
          No language data available
        </p>
      ) : (
        <>
          {/* Stacked bar */}
          <div className="flex h-2.5 w-full overflow-hidden rounded-full mb-4">
            {langs.map(({ lang, pct }, i) => (
              <motion.div
                key={lang}
                title={`${lang}: ${pct.toFixed(2)}%`}
                style={{ background: getLangColor(lang), width: `${pct}%` }}
                className="h-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              />
            ))}
          </div>

          {/* 2-column legend */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {langs.map(({ lang, pct }) => (
              <div key={lang} className="flex items-center gap-1.5 text-sm" style={{ color: 'rgb(var(--fg))' }}>
                <span
                  className="inline-block h-3 w-3 rounded-full shrink-0"
                  style={{ background: getLangColor(lang) }}
                />
                <span className="truncate">{lang}</span>
                <span className="ml-auto shrink-0 text-xs" style={{ color: 'rgb(var(--muted))' }}>
                  {pct.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function GitHubStats() {
  const username = SITE.githubUsername

  const [user,          setUser]          = useState<GithubUser | null>(null)
  const [repos,         setRepos]         = useState<GithubRepo[] | null>(null)
  const [commits,       setCommits]       = useState<number | null>(null)
  const [prs,           setPrs]           = useState<number | null>(null)
  const [issues,        setIssues]        = useState<number | null>(null)
  const [contributedTo, setContributedTo] = useState<number | null>(null)
  const [langBytes,     setLangBytes]     = useState<Map<string, number> | null>(null)
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)

    const year    = new Date().getFullYear()
    const headers = { Accept: 'application/vnd.github+json' }

    async function run() {
      try {
        // 1. User + repos
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { headers }).then(x => x.json()),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }).then(x => x.json()),
        ])
        if (cancelled) return
        setUser(u)
        const repoList: GithubRepo[] = Array.isArray(r) ? r : []
        setRepos(repoList)

        // 2. Search API stats (graceful fallback on rate-limit)
        const [commitsRes, prsRes, issuesRes, contribRes] = await Promise.allSettled([
          fetch(
            `https://api.github.com/search/commits?q=author:${username}+committer-date:${year}-01-01..${year}-12-31&per_page=1`,
            { headers: { ...headers, Accept: 'application/vnd.github.cloak-preview' } },
          ).then(x => x.json()),
          fetch(
            `https://api.github.com/search/issues?q=type:pr+author:${username}&per_page=1`,
            { headers },
          ).then(x => x.json()),
          fetch(
            `https://api.github.com/search/issues?q=type:issue+author:${username}&per_page=1`,
            { headers },
          ).then(x => x.json()),
          fetch(
            `https://api.github.com/search/repositories?q=user:${username}&per_page=1`,
            { headers },
          ).then(x => x.json()),
        ])
        if (cancelled) return
        if (commitsRes.status === 'fulfilled') setCommits(commitsRes.value?.total_count ?? null)
        if (prsRes.status     === 'fulfilled') setPrs(prsRes.value?.total_count ?? null)
        if (issuesRes.status  === 'fulfilled') setIssues(issuesRes.value?.total_count ?? null)
        if (contribRes.status === 'fulfilled') setContributedTo(contribRes.value?.total_count ?? null)

        // 3. Language bytes for top 30 repos
        const langMap     = new Map<string, number>()
        const langResults = await Promise.allSettled(
          repoList.slice(0, 30).map(repo =>
            fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`, { headers })
              .then(x => x.ok ? x.json() : {})
          )
        )
        if (cancelled) return
        langResults.forEach(res => {
          if (res.status !== 'fulfilled') return
          Object.entries(res.value as Record<string, number>).forEach(([lang, bytes]) => {
            langMap.set(lang, (langMap.get(lang) ?? 0) + bytes)
          })
        })
        setLangBytes(langMap)
        setError(false)
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()
    return () => { cancelled = true }
  }, [username])

  // ── Aggregated values ──
  const { stars, forks, topLangs } = useMemo(() => {
    const stars = (repos ?? []).reduce((s, r) => s + (r.stargazers_count || 0), 0)
    const forks = (repos ?? []).reduce((s, r) => s + (r.forks_count     || 0), 0)

    let topLangs: LangEntry[] = []
    if (langBytes && langBytes.size > 0) {
      const total = Array.from(langBytes.values()).reduce((s, b) => s + b, 0)
      topLangs = Array.from(langBytes.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([lang, bytes]) => ({ lang, pct: (bytes / total) * 100 }))
    } else if (repos) {
      // fallback: repo count per language
      const counts = new Map<string, number>()
      repos.forEach(r => {
        if (!r.language) return
        counts.set(r.language, (counts.get(r.language) ?? 0) + 1)
      })
      const total = Array.from(counts.values()).reduce((s, c) => s + c, 0)
      topLangs = Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([lang, count]) => ({ lang, pct: (count / total) * 100 }))
    }

    return { stars, forks, topLangs }
  }, [repos, langBytes])

  // ── Top-row summary cards ──
  const statCards = [
    { icon: <BarChart3 className="h-4 w-4" />, label: 'Repositories', value: user?.public_repos },
    { icon: <Users     className="h-4 w-4" />, label: 'Followers',    value: user?.followers },
    { icon: <Star      className="h-4 w-4" />, label: 'Total Stars',  value: repos ? stars : undefined },
    { icon: <GitFork   className="h-4 w-4" />, label: 'Total Forks',  value: repos ? forks : undefined },
  ]

  return (
    <section id="github" className="py-6 sm:py-10">
      <Container>
        <SectionHeading
          eyebrow="GitHub"
          title="Open-source & activity"
          subtitle="Live stats powered by the GitHub API."
        />

        {/* Summary stat cards */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((c, idx) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="glass rounded-3xl p-5"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-[rgb(var(--muted))]">
                <span className="grid h-7 w-7 place-items-center rounded-xl bg-[rgb(var(--fg))]/5 ring-1 ring-[rgb(var(--fg))]/10">
                  {c.icon}
                </span>
                {c.label}
              </div>
              <div className="mt-3 text-2xl font-semibold">
                {loading ? <Skeleton className="h-7 w-12" /> : (c.value ?? '—')}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Stats card + Languages card */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <GitHubStatsCard
              username={username}
              user={user}
              stars={stars}
              commits={commits}
              prs={prs}
              issues={issues}
              contributedTo={contributedTo}
              loading={loading}
              error={error}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.06 }}
          >
            <LanguagesCard langs={topLangs} loading={loading} error={error} />
          </motion.div>
        </div>

        {/* Contribution calendar */}
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
                dark:  ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
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
