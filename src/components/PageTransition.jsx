// True crossfade page transitions (double-buffer pattern, no dependencies).
// Keeps rendering the OUTGOING page (displayLocation) while it fades out and
// drifts up 6px (~180ms), then swaps to the new location, scrolls to top at
// the swap moment, and fades the incoming page in (rise 8px, ~300ms).
// Children is a render-prop receiving the location to feed <Routes location={...}>.
// Respects prefers-reduced-motion: instant swap, no animation.
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './pagetransition.css'

const EXIT_MS = 180

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function PageTransition({ children }) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [stage, setStage] = useState('enter')
  const timerRef = useRef(null)

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return

    if (prefersReducedMotion()) {
      setDisplayLocation(location)
      window.scrollTo(0, 0)
      setStage('enter')
      return
    }

    setStage('exit')
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setDisplayLocation(location)
      window.scrollTo(0, 0) // scroll at the swap moment, between exit and enter
      setStage('enter')
    }, EXIT_MS)
    return () => clearTimeout(timerRef.current)
  }, [location, displayLocation.pathname])

  return (
    <div className={`page-stage page-stage-${stage}`}>
      {typeof children === 'function' ? children(displayLocation) : children}
    </div>
  )
}
