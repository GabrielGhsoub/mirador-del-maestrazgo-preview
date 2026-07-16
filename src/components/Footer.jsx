import { Link } from 'react-router-dom'
import { SITE, HOUSE_LINKS } from '../data/site.js'
import './footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <h4>{SITE.name}</h4>
            <p>{SITE.address}<br />
              <a href={SITE.phoneHref}>{SITE.phone}</a> · <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
          <div>
            <h4>Our houses</h4>
            {HOUSE_LINKS.map(h => (
              <Link key={h.slug} to={`/houses/${h.slug}`}>{h.name}</Link>
            ))}
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/activities">Activities</Link>
            <Link to="/location">Location</Link>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h4>Languages</h4>
            <p>English · Español · Français</p>
          </div>
        </div>
        <div className="legal">
          <div>© 2026 {SITE.name} · {SITE.registration}</div>
          <div>Legal notice · Cookies policy · Accessibility</div>
        </div>
      </div>
      <div className="mock-note">Free preview by Likwiid · not the live site</div>
    </footer>
  )
}
