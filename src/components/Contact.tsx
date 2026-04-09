import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Mail, MapPin, Send } from 'lucide-react'
import { SITE, SOCIALS } from '../data/siteData'
import { Button } from './Button'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'
import emailjs from "@emailjs/browser"

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message should be at least 10 characters'),
})

type FormValues = z.infer<typeof schema>

export function Contact() {
  const [popupMessage, setPopupMessage] = useState<string | null>(null)
  const [popupType, setPopupType] = useState<'success' | 'error'>('success')
  const popupTimerRef = useRef<number | null>(null)

  const showPopup = (message: string, type: 'success' | 'error') => {
    if (popupTimerRef.current) {
      window.clearTimeout(popupTimerRef.current)
    }

    setPopupType(type)
    setPopupMessage(message)
    popupTimerRef.current = window.setTimeout(() => {
      setPopupMessage(null)
      popupTimerRef.current = null
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (popupTimerRef.current) {
        window.clearTimeout(popupTimerRef.current)
      }
    }
  }, [])

  async function onSubmit(values: FormValues) {

    try {

      await emailjs.send(
        "service_3v9awnc", // service id
        "template_xjeb5ap",  // template id
        {
          name: values.name,
          email: values.email,
          message: values.message,
        },
        "gntrbXVFtXw1f1A3B"
      )

      showPopup("Message sent successfully! I'll get back to you soon.", 'success')
      reset()

    } catch (error) {
      console.log(error)
      showPopup('Failed to send message', 'error')
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', message: '' },
  })



  return (
    <section id="contact" className="py-6 sm:py-10">
      {popupMessage ? (
        <div className="fixed left-1/2 top-20 z-50 w-[min(90vw,520px)] -translate-x-1/2 rounded-2xl border border-[rgb(var(--fg))]/20 bg-[rgb(var(--bg))]/95 px-5 py-4 text-sm text-[rgb(var(--fg))] shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <p>{popupMessage}</p>
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                popupType === 'success' ? 'bg-emerald-400' : 'bg-red-400'
              }`}
            />
          </div>
        </div>
      ) : null}
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something great"
          subtitle="Have a role, contract, or idea? Send a message and I’ll reply quickly."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass rounded-3xl p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                error={errors.name?.message}
                input={
                  <input
                    className="h-11 w-full rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 px-4 text-sm text-[rgb(var(--fg))] outline-none transition focus:border-[rgb(var(--fg))]/20 focus:ring-2 focus:ring-[rgb(var(--ring))]/40"
                    placeholder="Your name"
                    {...register('name')}
                  />
                }
              />
              <Field
                label="Email"
                error={errors.email?.message}
                input={
                  <input
                    className="h-11 w-full rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 px-4 text-sm text-[rgb(var(--fg))] outline-none transition focus:border-[rgb(var(--fg))]/20 focus:ring-2 focus:ring-[rgb(var(--ring))]/40"
                    placeholder="you@email.com"
                    {...register('email')}
                  />
                }
              />
            </div>

            <div className="mt-4">
              <Field
                label="Message"
                error={errors.message?.message}
                input={
                  <textarea
                    className="min-h-[140px] w-full resize-none rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 px-4 py-3 text-sm text-[rgb(var(--fg))] outline-none transition focus:border-[rgb(var(--fg))]/20 focus:ring-2 focus:ring-[rgb(var(--ring))]/40"
                    placeholder="Tell me about your project..."
                    {...register('message')}
                  />
                }
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[rgb(var(--muted))]">
                Your message will be sent directly to my inbox.
              </div>
              <Button type="submit" disabled={isSubmitting} className='hover:cursor-pointer'>
                {isSubmitting ? 'Sending…' : 'Send message'}
                <Send className="h-4 w-4" />
              </Button>
            </div>

          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="grid gap-4"
          >
            <div className="glass rounded-3xl p-6">
              <div className="text-sm font-semibold">Direct</div>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 px-4 py-3 text-[rgb(var(--fg))] transition hover:bg-[rgb(var(--fg))]/10"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[rgb(var(--fg))]/5 ring-1 ring-[rgb(var(--fg))]/10">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>
                    <div className="text-xs text-[rgb(var(--muted))]">Email</div>
                    <div className="font-medium">{SITE.email}</div>
                  </span>
                </a>

                <div className="flex items-center gap-3 rounded-2xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 px-4 py-3 text-[rgb(var(--fg))]">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[rgb(var(--fg))]/5 ring-1 ring-[rgb(var(--fg))]/10">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>
                    <div className="text-xs text-[rgb(var(--muted))]">
                      Location
                    </div>
                    <div className="font-medium">{SITE.location}</div>
                  </span>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="text-sm font-semibold">Social</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--fg))]/10 bg-[rgb(var(--fg))]/5 px-3 py-2 text-sm text-[rgb(var(--fg))]/80 transition hover:-translate-y-[1px] hover:bg-[rgb(var(--fg))]/10 hover:text-[rgb(var(--fg))]"
                  >
                    <s.icon className="h-4 w-4" />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

function Field(props: {
  label: string
  error?: string
  input: React.ReactNode
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-2 text-xs font-medium text-[rgb(var(--muted))]">
        <span>{props.label}</span>
        {props.error ? <span className="text-red-300">{props.error}</span> : null}
      </div>
      {props.input}
    </label>
  )
}

