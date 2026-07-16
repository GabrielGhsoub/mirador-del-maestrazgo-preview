import { Link } from 'react-router-dom'
import { SITE } from '../data/site.js'
import './mobilecta.css'

const WHATSAPP_URL = 'https://wa.me/34626298002'

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M6.6 2.9 3 4.7c-.4.2-.6.6-.6 1 0 8.3 6.6 14.9 14.9 14.9.4 0 .8-.2 1-.6l1.8-3.6c.2-.5 0-1.1-.4-1.4l-3.6-2.4c-.4-.3-1-.2-1.4.2l-1.2 1.4a11.4 11.4 0 0 1-5.4-5.4l1.4-1.2c.4-.4.5-1 .2-1.4L7.9 3.3c-.3-.4-.9-.6-1.3-.4Z"
        stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
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

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 9.5h16" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 3.2v3.4M16 3.2v3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export default function MobileCta() {
  return (
    <nav className="mobile-cta" aria-label="Quick contact">
      <a href={SITE.phoneHref} className="mobile-cta-btn call" aria-label={`Call ${SITE.name}`}>
        <PhoneIcon />
        <span>Call</span>
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-cta-btn whatsapp"
        aria-label="Message on WhatsApp"
      >
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>
      <Link to="/contact" className="mobile-cta-btn book" aria-label="Book availability">
        <BookIcon />
        <span>Book</span>
      </Link>
    </nav>
  )
}
