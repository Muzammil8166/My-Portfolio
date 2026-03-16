import { motion } from 'framer-motion'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'
import { SKILL_GROUPS } from '../data/siteData'

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="A senior MERN toolkit"
          subtitle="Balanced across frontend craftsmanship, backend reliability, and the tooling needed to ship confidently."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {SKILL_GROUPS.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: idx * 0.03 }}
              className="glass rounded-3xl p-6"
            >
              <div className="text-sm font-semibold">{group.title}</div>
              <div className="mt-5 space-y-4">
                {group.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">{s.name}</div>
                      <div className="font-mono text-xs text-[rgb(var(--muted))]">
                        {s.level}%
                      </div>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[rgb(var(--fg))]/5 ring-1 ring-[rgb(var(--fg))]/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

