import { useEffect, useState } from 'react'
import './backtotop.css'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    // rAF animation: immune to the overflow-x clip quirk that kills css smooth scroll
    const start = window.scrollY
    const t0 = performance.now()
    const dur = Math.min(700, 200 + start / 8)
    const ease = x => 1 - Math.pow(1 - x, 3)
    const step = now => {
      const p = Math.min(1, (now - t0) / dur)
      window.scrollTo(0, Math.round(start * (1 - ease(p))))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
        <path d="M12 19V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 11.5 12 5.5l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
