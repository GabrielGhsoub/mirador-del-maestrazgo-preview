import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SITE, NAV } from '../data/site.js'
import './header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
            <span className="on">EN</span><span>ES</span><span>FR</span>
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
              <NavLink key={item.to} to={item.to}
                className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-cta">
            <Link className="btn small" to="/contact">Check availability</Link>
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
            <NavLink key={item.to} to={item.to} onClick={close}
              className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="drawer-bottom">
          <div className="langs drawer-langs">
            <span className="on">EN</span><span>ES</span><span>FR</span>
          </div>
          <Link className="btn drawer-cta" to="/contact" onClick={close}>
            Check availability
          </Link>
        </div>
      </aside>
    </>
  )
}
