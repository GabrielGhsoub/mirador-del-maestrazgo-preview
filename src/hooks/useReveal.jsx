// Small scroll-reveal utility: adds class "in" to elements with class "reveal"
// once they cross the viewport threshold. Respects prefers-reduced-motion.
// Shared CSS for .reveal / .reveal.in lives once in src/pages/home.css.
import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Hook form: attach the returned ref to any element, read `inView` to
// build your own className, e.g. `reveal${inView ? ' in' : ''}`.
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

// Component form: wrap any block to reveal it as it scrolls into view.
// <Reveal as="section" className="acts"> ... </Reveal>
// Stagger: pass delay={i * 50} (ms) on grid children so cards cascade
// instead of popping together. It sets the --d custom property consumed
// by .reveal's transition-delay; a parent can also set --d directly.
export default function Reveal({ as: Tag = 'div', className = '', threshold = 0.12, delay = 0, style, children, ...rest }) {
  const [ref, inView] = useReveal(threshold)
  const cls = ['reveal', inView ? 'in' : '', className].filter(Boolean).join(' ')
  const mergedStyle = delay ? { '--d': `${delay}ms`, ...style } : style
  return (
    <Tag ref={ref} className={cls} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  )
}
