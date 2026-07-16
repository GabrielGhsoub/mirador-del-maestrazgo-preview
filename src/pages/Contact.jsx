import { useState } from 'react'
import { SITE, HOUSE_LINKS } from '../data/site.js'
import content from '../data/content.json'
import './misc.css'

const HERO = 'https://miradordelmaestrazgo.es/wp-content/uploads/2025/05/pajar-altaR_12-scaled.jpg'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const { phone, email, whatsapp, note } = content.contact
  const waHref = whatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}` : null
  const today = new Date().toISOString().split('T')[0]

  function onSubmit(e) {
    e.preventDefault()
    const f = e.target
    const arrive = f.arrival.value, depart = f.departure.value
    if (arrive && depart && depart <= arrive) {
      setError('The departure date must be after the arrival date.')
      return
    }
    setError('')
    setSent(true) // demo preview: no data is sent anywhere
  }

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: `linear-gradient(rgba(20,18,10,.3), rgba(20,18,10,.65)), url(${HERO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="wrap">
          <div className="kick">Contact</div>
          <h1>Check availability</h1>
        </div>
      </div>

      <section>
        <div className="wrap">
          <p className="lede">{note}</p>

          <div className="contact-grid">
            <div className="form-card">
              {sent ? (
                <div className="success">
                  <h3>Thank you! Your request is on its way.</h3>
                  <p>We will reply within one working day with availability and the best direct price.</p>
                  <p style={{ marginTop: 10, fontSize: 12 }}>(This is a design preview: no data was sent.)</p>
                </div>
              ) : (
                <>
                  <h3>Send a booking request</h3>
                  <form onSubmit={onSubmit}>
                    <div className="f-row">
                      <div className="f-field">
                        <label htmlFor="name">Your name</label>
                        <input id="name" name="name" type="text" required placeholder="Name and surname" />
                      </div>
                      <div className="f-field">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" required placeholder="you@example.com" />
                      </div>
                    </div>
                    <div className="f-field">
                      <label htmlFor="house">Which house?</label>
                      <select id="house" name="house" defaultValue="">
                        <option value="">Not sure yet, advise me</option>
                        {HOUSE_LINKS.map(h => <option key={h.slug} value={h.slug}>{h.name}</option>)}
                      </select>
                    </div>
                    <div className="f-row">
                      <div className="f-field">
                        <label htmlFor="arrival">Arrival</label>
                        <input id="arrival" name="arrival" type="date" min={today} required />
                      </div>
                      <div className="f-field">
                        <label htmlFor="departure">Departure</label>
                        <input id="departure" name="departure" type="date" min={today} required />
                      </div>
                    </div>
                    <div className="f-field">
                      <label htmlFor="guests">Guests</label>
                      <input id="guests" name="guests" type="number" min="1" max="28" defaultValue="2" required />
                    </div>
                    <div className="f-field">
                      <label htmlFor="message">Anything we should know?</label>
                      <textarea id="message" name="message" rows="3" placeholder="Pets, arrival time, special requests..." />
                    </div>
                    {error && <div className="f-error">{error}</div>}
                    <button className="btn" type="submit">Send request</button>
                  </form>
                </>
              )}
            </div>

            <div className="contact-aside">
              <div className="c-card">
                <h4>Phone</h4>
                <a href={SITE.phoneHref}>{phone}</a>
                <p>Fernando answers personally.</p>
              </div>
              {waHref && (
                <div className="c-card wa">
                  <h4>WhatsApp</h4>
                  <a href={waHref} target="_blank" rel="noreferrer">{whatsapp}</a>
                  <p>The fastest way to reach us.</p>
                </div>
              )}
              <div className="c-card">
                <h4>Email</h4>
                <a href={`mailto:${email}`}>{email}</a>
                <p>We reply within one working day.</p>
              </div>
              <div className="c-card">
                <h4>Book direct, pay less</h4>
                <p>Booking with us directly always gets you the best available price, with no platform commissions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
