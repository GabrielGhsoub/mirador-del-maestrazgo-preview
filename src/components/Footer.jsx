import { Link } from 'react-router-dom'
import { SITE, HOUSE_LINKS } from '../data/site.js'
import './footer.css'

const WHATSAPP_URL = 'https://wa.me/34626298002'

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <path
        d="M6.6 2.9 3 4.7c-.4.2-.6.6-.6 1 0 8.3 6.6 14.9 14.9 14.9.4 0 .8-.2 1-.6l1.8-3.6c.2-.5 0-1.1-.4-1.4l-3.6-2.4c-.4-.3-1-.2-1.4.2l-1.2 1.4a11.4 11.4 0 0 1-5.4-5.4l1.4-1.2c.4-.4.5-1 .2-1.4L7.9 3.3c-.3-.4-.9-.6-1.3-.4Z"
        stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 6.5 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <path
        d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.2A8.4 8.4 0 1 0 12 3.5Z"
        stroke="currentColor" strokeWidth="1.7"
      />
      <path
        d="M9 9.6c.1-.5.6-1 1-1 .4 0 .6 0 .8.4l.6 1.3c.1.3 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .6.4.8 1.5 1.9 2.3 2.3.2.1.4.1.6 0l.6-.5c.2-.1.4-.2.7-.1l1.3.6c.4.2.4.4.4.8 0 .4-.5.9-1 1-1 .2-1.8.1-3.5-.8-1.4-.8-2.4-1.8-3.2-3.2-.9-1.7-1-2.5-.8-3.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="fgrid">
          <div className="fbrand">
            <div className="flogo-card">
              <img src={SITE.logo} alt="Mirador del Maestrazgo" />
            </div>
            <p className="ftag">Three rural holiday houses in Ejulve, at the gateway to the Maestrazgo.</p>
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
            <h4>Contact</h4>
            <a href={SITE.phoneHref} className="fcontact-line">
              <PhoneIcon /><span>{SITE.phone}</span>
            </a>
            <a href={`mailto:${SITE.email}`} className="fcontact-line">
              <MailIcon /><span>{SITE.email}</span>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fcontact-line">
              <WhatsAppIcon /><span>WhatsApp</span>
            </a>
          </div>
        </div>
        <div className="legal">
          <div>© 2026 {SITE.name} · {SITE.registration}</div>
          <div className="fscores">8.4 Booking · 9.6 hosts · 4/5 TripAdvisor</div>
        </div>
      </div>
      <div className="mock-note">Free preview by Likwiid · not the live site</div>
    </footer>
  )
}
