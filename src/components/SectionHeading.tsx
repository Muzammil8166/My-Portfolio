import { motion } from 'framer-motion'

export function SectionHeading(props: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-10">
      {props.eyebrow ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 px-3 py-1 text-xs font-medium tracking-wide text-[rgb(var(--muted))]">
          <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
          {props.eyebrow}
        </div>
      ) : null}

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {props.title}
      </motion.h2>

      {props.subtitle ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[rgb(var(--muted))] sm:text-base">
          {props.subtitle}
        </p>
      ) : null}
    </div>
  )
}

