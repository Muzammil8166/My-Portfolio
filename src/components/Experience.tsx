import { motion } from 'framer-motion'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'
import { EXPERIENCE } from '../data/siteData'

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where I’ve delivered impact"
          subtitle="A timeline of roles, achievements, and the technologies I’ve used to ship production software."
        />

        <div className="relative mt-10">
          {/* Vertical line: Mobile = left, Desktop = center */}
          <div className="absolute left-4 top-0 h-full w-px bg-[rgb(var(--fg))]/10 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {EXPERIENCE.map((item, idx) => {
              const isRightSide = idx % 2 === 0 // Items 0, 2, 4 go on the right side on desktop

              return (
                <motion.div
                  key={item.company + item.duration}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: idx * 0.04 }}
                  className="relative grid gap-4 pl-12 sm:grid-cols-2 sm:pl-0"
                >
                  {/* The Timeline Marker */}
                  <div
                    className={[
                      'absolute top-6 flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full border border-[rgb(var(--fg))]/20 bg-[rgb(var(--card))]',
                      // Mobile: Circle shape placed on left line
                      'left-4 h-6 w-6 justify-center',
                      // Desktop: Pill shape placed on center line
                      'sm:left-1/2 sm:w-11 sm:px-1',
                      // Desktop Inner dot alignment
                      isRightSide ? 'sm:justify-end' : 'sm:justify-start',
                    ].join(' ')}
                  >
                    <div className="h-3 w-3 sm:h-2.5 sm:w-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
                  </div>

                  <div
                    className={[
                      'relative glass rounded-3xl p-6',
                      isRightSide ? 'sm:col-start-2 sm:ml-6' : 'sm:col-start-1 sm:mr-6',
                    ].join(' ')}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{item.role}</div>
                        <div className="mt-1 text-sm text-[rgb(var(--muted))]">{item.company}</div>
                      </div>
                      <div className="rounded-full bg-[rgb(var(--fg))]/5 px-3 py-1 text-xs text-[rgb(var(--muted))] ring-1 ring-[rgb(var(--fg))]/10">
                        {item.duration}
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[rgb(var(--muted))]">
                      {item.achievements.map((a) => (
                        <li key={a} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-purple-400" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-[rgb(var(--fg))]/5 px-2.5 py-1 text-[11px] text-[rgb(var(--muted))] ring-1 ring-[rgb(var(--fg))]/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

