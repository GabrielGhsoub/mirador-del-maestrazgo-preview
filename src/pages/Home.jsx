import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../data/site.js'
import DirectStrip from '../components/DirectStrip.jsx'
import './home.css'

const HOUSES = [
  {
    slug: 'los-pajarcicos',
    name: 'Los Pajarcicos',
    cap: 'Two apartments · up to 8 guests',
    desc: 'Two independent apartments in converted barns, each with a double loft bedroom, equipped kitchen and wood stove. Perfect for couples and small families.',
    img: 'https://miradordelmaestrazgo.es/wp-content/uploads/2025/05/pajar-altaR_01-2048x1367.jpg',
  },
  {
    slug: 'la-casa-de-colores',
    name: 'La Casa de Colores',
    cap: 'Four en-suite rooms · up to 10 guests',
    desc: 'A cheerful rural house with four colourful en-suite bedrooms and a shared dining room. Book a room or take the whole house with friends.',
    img: 'https://miradordelmaestrazgo.es/wp-content/uploads/2025/05/HAmarilla_03-768x544.jpg',
  },
  {
    slug: 'la-casa-del-gato',
    name: 'La Casa del Gato',
    cap: 'Whole house · 6 to 10 guests',
    desc: 'A traditional village house over one hundred years old, carefully restored with every modern comfort. Ideal for families and groups.',
    img: 'https://miradordelmaestrazgo.es/wp-content/uploads/2025/05/C.-gato-AltaR_25-1-2048x1536.jpg',
  },
]

const ACTIVITIES = [
  { n: '01', h: 'The Silent Route', p: 'The famous Ruta del Silencio starts here: 63 km of villages, canyons and viewpoints.' },
  { n: '02', h: 'UNESCO Geopark', p: 'Dinosaur sites, rock art and dramatic geology across the Maestrazgo Cultural Park.' },
  { n: '03', h: 'Hiking and cycling', p: 'Waymarked trails and quiet mountain roads, including the Camino del Cid.' },
  { n: '04', h: 'Dark skies', p: "Some of Europe's clearest night skies, next to a certified Starlight destination." },
]

const FAQS = [
  {
    q: 'How do I get there?',
    a: 'Ejulve is in the Maestrazgo Cultural Park, Teruel, at the start of the Silent Route. Search "Mirador del Maestrazgo" on Google Maps; access is easy and there is parking close to the houses.',
  },
  { q: 'Can I pay by card?', a: 'Ask us and we will be happy to help.' },
  { q: 'What services are there in Ejulve?', a: 'Ask us and we will be happy to help.' },
  { q: 'Are pets welcome?', a: 'Ask us and we will be happy to help.' },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <div className="hero" style={{ backgroundImage: `linear-gradient(rgba(20,18,10,.28), rgba(20,18,10,.62)), url('${SITE.heroImage}')` }}>
        <div className="wrap hero-inner">
          <div className="kick">Ejulve · Teruel · Spain</div>
          <h1>Rural calm at the gateway to the Maestrazgo</h1>
          <p>Three welcoming holiday houses for up to 28 guests, in a quiet mountain village at the start of the Silent Route, inside the Maestrazgo UNESCO Global Geopark.</p>
          <div className="cta-row">
            <Link className="btn" to="/contact">Check availability</Link>
            <a className="btn ghost" href="#houses">Explore the houses</a>
          </div>
          <div className="proof">
            <div><b>{SITE.scores.booking} / 10</b><span>Booking.com · {SITE.scores.bookingReviews} reviews</span></div>
            <div><b>{SITE.scores.staff} / 10</b><span>Guests rate our hosts</span></div>
            <div><b>{SITE.scores.tripadvisor}</b><span>TripAdvisor · {SITE.scores.tripadvisorReviews} reviews</span></div>
          </div>
        </div>
      </div>

      <DirectStrip />

      <section className="houses bg-stone" id="houses">
        <div className="wrap">
          <div className="sec-kick">Our houses</div>
          <h2>Three houses, one quiet village</h2>
          <p className="lede">Stay in lovingly restored village houses with fully equipped kitchens, cosy rooms and terraces looking out over the Maestrazgo.</p>
          <div className="grid3">
            {HOUSES.map(house => (
              <div className="house card" key={house.slug}>
                <div className="ph" style={{ backgroundImage: `url('${house.img}')` }} />
                <div className="body">
                  <div className="cap">{house.cap}</div>
                  <h3>{house.name}</h3>
                  <p>{house.desc}</p>
                  <div className="links">
                    <Link to="/contact">Check dates</Link>
                    <Link to={`/houses/${house.slug}`}>See the house →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="quote">
        <div className="wrap">
          <blockquote>"What stays with you is <b>the warmth and kindness of the hosts</b>. Silence, comfortable beds, and the Maestrazgo on your doorstep."</blockquote>
          <div className="who">Guest review · Booking.com</div>
          <div className="scores">
            <div><strong>{SITE.scores.staff}</strong><span>Hosts</span></div>
            <div><strong>{SITE.scores.comfort}</strong><span>Comfort</span></div>
            <div><strong>{SITE.scores.cleanliness}</strong><span>Cleanliness</span></div>
            <div><strong>{SITE.scores.capacity}</strong><span>Guests capacity</span></div>
          </div>
        </div>
      </section>

      <section className="acts" id="activities">
        <div className="wrap">
          <div className="sec-kick">The Maestrazgo</div>
          <h2>Days that fill themselves</h2>
          <p className="lede">Ejulve sits at the entrance to one of Spain's wildest and least crowded regions. From the front door:</p>
          <div className="grid4">
            {ACTIVITIES.map(act => (
              <div className="act" key={act.n}>
                <span className="n">{act.n}</span>
                <h3>{act.h}</h3>
                <p>{act.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap duo">
          <div className="perk bg-stone">
            <div className="sec-kick">Only when you book direct</div>
            <h3>Check out later, enjoy one more afternoon</h3>
            <p>On request, keep your house until 6:00 pm on departure day for 50% of one night. Come back from your morning walk, shower, have lunch on the terrace and leave without hurry.</p>
            <div className="big">Best price guaranteed when you book on this website.</div>
          </div>
          <div className="about" style={{ backgroundImage: "linear-gradient(rgba(20,18,10,.2), rgba(20,18,10,.75)), url('https://miradordelmaestrazgo.es/wp-content/uploads/2025/05/Comunes_01.jpg')" }}>
            <h3>Fernando and Mar, your hosts</h3>
            <p>We look after every detail so you can enjoy the Maestrazgo in its purest state.</p>
            <div className="motto">"Come, and let us take care of you!"</div>
          </div>
        </div>
      </section>

      <section className="faq bg-stone">
        <div className="wrap">
          <div className="sec-kick">Good to know</div>
          <h2>Frequent questions</h2>
          {FAQS.map((item, i) => {
            const isOpen = openFaq === i
            return (
              <div className="qa" key={item.q}>
                <h3 onClick={() => setOpenFaq(isOpen ? -1 : i)}>
                  {item.q} <span>{isOpen ? '−' : '+'}</span>
                </h3>
                {isOpen && <p>{item.a}</p>}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
