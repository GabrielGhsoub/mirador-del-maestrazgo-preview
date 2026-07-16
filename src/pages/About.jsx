import DirectStrip from '../components/DirectStrip.jsx'
import { SITE } from '../data/site.js'
import content from '../data/content.json'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../hooks/useReveal.jsx'
import './misc.css'

const HERO = 'https://miradordelmaestrazgo.es/wp-content/uploads/2025/05/Comunes_01.jpg'

export default function About() {
  const { paras, motto } = content.about
  const s = SITE.scores

  usePageTitle('About us | Mirador del Maestrazgo')

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: `linear-gradient(rgba(20,18,10,.3), rgba(20,18,10,.65)), url(${HERO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="wrap">
          <div className="kick">About us</div>
          <h1>Fernando and Mar, your hosts</h1>
        </div>
      </div>

      <section>
        <Reveal as="div" className="wrap about-wrap">
          {paras.map((p, i) => <p key={i}>{p}</p>)}
          <div className="pull">"{motto}"</div>
          <div className="stat-row">
            <div><strong>{s.booking}</strong><span>Booking.com · {s.bookingReviews} reviews</span></div>
            <div><strong>{s.staff}</strong><span>Guests rate our hosts</span></div>
            <div><strong>{s.tripadvisor}</strong><span>TripAdvisor · {s.tripadvisorReviews} reviews</span></div>
            <div><strong>{s.capacity}</strong><span>Guests across three houses</span></div>
          </div>
        </Reveal>
      </section>

      <DirectStrip />
    </>
  )
}
