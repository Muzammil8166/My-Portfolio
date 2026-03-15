import { useEffect, useMemo, useState } from 'react'

export function useTypewriter(
  phrases: string[],
  opts?: { typingMs?: number; pauseMs?: number; deletingMs?: number },
) {
  const typingMs = opts?.typingMs ?? 38
  const deletingMs = opts?.deletingMs ?? 22
  const pauseMs = opts?.pauseMs ?? 900

  const safePhrases = useMemo(
    () => (phrases.length ? phrases : ['React', 'Node.js', 'MongoDB']),
    [phrases],
  )

  const [i, setI] = useState(0)
  const [text, setText] = useState(safePhrases[0] ?? '')
  const [dir, setDir] = useState<'type' | 'pause' | 'delete'>('type')

  useEffect(() => {
    const phrase = safePhrases[i] ?? ''
    const isDone = text === phrase
    const isEmpty = text.length === 0

    let delay = typingMs
    if (dir === 'pause') delay = pauseMs
    if (dir === 'delete') delay = deletingMs

    const t = window.setTimeout(() => {
      if (dir === 'type') {
        if (isDone) {
          setDir('pause')
          return
        }
        setText(phrase.slice(0, text.length + 1))
        return
      }

      if (dir === 'pause') {
        setDir('delete')
        return
      }

      if (dir === 'delete') {
        if (isEmpty) {
          setI((x) => (x + 1) % safePhrases.length)
          setDir('type')
          return
        }
        setText((s) => s.slice(0, Math.max(0, s.length - 1)))
      }
    }, delay)

    return () => window.clearTimeout(t)
  }, [deletingMs, dir, i, pauseMs, safePhrases, text, typingMs])

  return { text }
}

