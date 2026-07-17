import DirectStrip from '../components/DirectStrip.jsx'
import { imgFadeRef, imgFadeLoad } from '../hooks/imgFade.js'
import { SITE } from '../data/site.js'
import content from '../data/content.json'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../hooks/useReveal.jsx'
import './misc.css'

const HERO = 'img/m/d0d4d9-Comunes_01.jpg'
const BOOKING_URL = 'https://www.booking.com/hotel/es/mirador-del-maestrazgo-los-pajarcicos.html'

// Ambient shots from their own Sobre Nosotros gallery
const GALLERY = [
  'img/18359a-Comunes_07.jpg',
  'img/849fa6-Comunes_04.jpg',
  'img/cdf3e3-C.-gato-AltaR_24-scaled.jpg',
  'img/6be77a-C.-gato-AltaR_09-scaled.jpg',
  'img/fa8fcb-C.-gato-AltaR_19-scaled.jpg',
  'img/872aa5-Comunes_01-2.jpg',
]
const thumb = src => src.replace(/^img\//, 'img/t/')

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
        </Reveal>
      </section>

      <section className="bg-stone">
        <div className="wrap">
          <Reveal as="div">
            <div className="sec-kick">Life at the Mirador</div>
            <h2>Moments from the houses</h2>
          </Reveal>
          <div className="about-gallery">
            {GALLERY.map((src, i) => (
              <Reveal as="div" className="ag-tile" key={src} delay={i * 50}>
                <img src={thumb(src)} alt={`Mirador del Maestrazgo, moment ${i + 1}`}
                  loading="lazy" className="img-fade" onLoad={imgFadeLoad} ref={imgFadeRef} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal as="div" className="about-reviews">
            <div className="sec-kick">Guest reviews</div>
            <h2>What our guests say</h2>
            <blockquote className="review-quote">
              "What stays with you is the warmth and kindness of the hosts. Silence, comfortable beds, and the Maestrazgo on your doorstep."
              <cite>Guest review · Booking.com</cite>
            </blockquote>
            <div className="stat-row">
              <div><strong>{s.booking}</strong><span>Booking.com · {s.bookingReviews} reviews</span></div>
              <div><strong>{s.staff}</strong><span>Guests rate our hosts</span></div>
              <div><strong>{s.tripadvisor}</strong><span>TripAdvisor · {s.tripadvisorReviews} reviews</span></div>
              <div><strong>{s.capacity}</strong><span>Guests across three houses</span></div>
            </div>
            <a className="link-gold" href={BOOKING_URL} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 22 }}>
              Read more reviews on Booking.com →
            </a>
          </Reveal>
        </div>
      </section>

      <DirectStrip />
    </>
  )
}
