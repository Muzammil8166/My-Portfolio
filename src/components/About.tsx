import { motion } from 'framer-motion'
import { MapPin, Briefcase, Languages, Sparkles } from 'lucide-react'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'
import profile from '../assets/SAVE_20251031_225315.jpg.jpeg';

export function About() {
  return (
    <section id="about" className="py-6 sm:py-10">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="Building products with craft and clarity"
          subtitle="I pair strong frontend execution with pragmatic backend architecture—so teams ship faster, systems scale cleanly, and users feel the polish."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="glass overflow-hidden rounded-3xl"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={profile}
                alt="Profile"
                loading="lazy"
                className="h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <div className="text-sm font-semibold">Quick story</div>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
                Over the last <span className="text-[rgb(var(--fg))]">5+</span>{' '}
                years, I&apos;ve helped teams deliver full-stack products—shipping
                accessible UI, reliable APIs, and performance-first experiences.
                I love turning complex requirements into simple, maintainable
                systems.
              </p>
              <div className="mt-5 rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 p-4 text-sm">
                <div className="text-[rgb(var(--muted))]">Tech philosophy</div>
                <div className="mt-2 font-medium">
                  Build what scales today, design for tomorrow.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="grid gap-4"
          >
            <div className="glass rounded-3xl p-6">
              <div className="text-sm font-semibold">What I bring</div>
              <ul className="mt-4 grid gap-3 text-sm text-[rgb(var(--muted))] sm:grid-cols-2">
                <li className="rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 p-4">
                  <div className="text-[rgb(var(--fg))]">Frontend depth</div>
                  <div className="mt-1">
                    Design systems, animations, and performance.
                  </div>
                </li>
                <li className="rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 p-4">
                  <div className="text-[rgb(var(--fg))]">Backend pragmatism</div>
                  <div className="mt-1">
                    APIs, auth, caching, and scalable patterns.
                  </div>
                </li>
                <li className="rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 p-4">
                  <div className="text-[rgb(var(--fg))]">Product mindset</div>
                  <div className="mt-1">
                    Ship impact, measure outcomes, iterate quickly.
                  </div>
                </li>
                <li className="rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 p-4">
                  <div className="text-[rgb(var(--fg))]">Team enablement</div>
                  <div className="mt-1">
                    Clear patterns, docs, and DX improvements.
                  </div>
                </li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Fact
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value="Surat / Hybrid"
              />
              <Fact
                icon={<Briefcase className="h-4 w-4" />}
                label="Freelance"
                value="Available"
              />
              <Fact
                icon={<Languages className="h-4 w-4" />}
                label="Languages"
                value="English, Hindi"
              />
              <Fact
                icon={<Sparkles className="h-4 w-4" />}
                label="Experience"
                value="5+ years"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

function Fact(props: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center gap-2 text-xs font-medium text-[rgb(var(--muted))]">
        <span className="grid h-7 w-7 place-items-center rounded-xl bg-[rgb(var(--fg))]/5 ring-1 ring-[rgb(var(--fg))]/10">
          {props.icon}
        </span>
        {props.label}
      </div>
      <div className="mt-3 text-sm font-semibold">{props.value}</div>
    </div>
  )
}

