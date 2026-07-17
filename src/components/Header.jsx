import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SITE, NAV } from '../data/site.js'
import { prefetchRoute } from '../routes.js'
import './header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langNote, setLangNote] = useState(false)

  useEffect(() => {
    if (!langNote) return
    const t = setTimeout(() => setLangNote(false), 3800)
    return () => clearTimeout(t)
  }, [langNote])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <span className="sep">·</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className="langs">
            <span className="on">EN</span>
            <button type="button" className="lang-btn" onClick={() => setLangNote(true)}>ES</button>
            <button type="button" className="lang-btn" onClick={() => setLangNote(true)}>FR</button>
          </div>
        </div>
      </div>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav">
          <Link to="/" className="brand" onClick={close}>
            <img src={SITE.logo} alt="Mirador del Maestrazgo" />
          </Link>
          <nav className="menu">
            {NAV.map(item => (
              <NavLink key={item.to} to={item.to} onMouseEnter={() => prefetchRoute(item.to)} onTouchStart={() => prefetchRoute(item.to)}
                className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-cta">
            <Link className="btn small" to="/contact" onMouseEnter={() => prefetchRoute('/contact')}>Check availability</Link>
            <button
              type="button"
              className={`burger ${open ? 'open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen(v => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`drawer-backdrop ${open ? 'open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        id="mobile-drawer"
        className={`drawer ${open ? 'open' : ''}`}
        aria-hidden={!open}
      >
        <div className="drawer-top">
          <span className="drawer-brand">{SITE.name}</span>
          <button
            type="button"
            className="drawer-close"
            aria-label="Close menu"
            onClick={close}
          >
            &times;
          </button>
        </div>
        <nav className="drawer-nav">
          {NAV.map(item => (
            <NavLink key={item.to} to={item.to} onMouseEnter={() => prefetchRoute(item.to)} onTouchStart={() => prefetchRoute(item.to)} onClick={close}
              className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="drawer-bottom">
          <div className="langs drawer-langs">
            <span className="on">EN</span>
            <button type="button" className="lang-btn" onClick={() => setLangNote(true)}>ES</button>
            <button type="button" className="lang-btn" onClick={() => setLangNote(true)}>FR</button>
          </div>
          <Link className="btn drawer-cta" to="/contact" onClick={close}>
            Check availability
          </Link>
        </div>
      </aside>
      <div className={`lang-note ${langNote ? 'show' : ''}`} role="status" aria-live="polite">
        This preview is in English. Español and Français are included in the full version.
      </div>
    </>
  )
}
