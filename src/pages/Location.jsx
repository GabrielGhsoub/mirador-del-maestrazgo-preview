import DirectStrip from '../components/DirectStrip.jsx'
import { SITE } from '../data/site.js'
import content from '../data/content.json'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../hooks/useReveal.jsx'
import './misc.css'

const HERO = 'img/8e7e8e-154-2048x1536.jpg'

export default function Location() {
  const { intro, howToGet, address, gmapsQuery } = content.location
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(gmapsQuery)}&output=embed`
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gmapsQuery)}`

  usePageTitle('Location | Mirador del Maestrazgo')

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: `linear-gradient(rgba(20,18,10,.3), rgba(20,18,10,.65)), url(${HERO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="wrap">
          <div className="kick">Ejulve · Teruel</div>
          <h1>Where you will find us</h1>
        </div>
      </div>

      <section>
        <div className="wrap">
          <Reveal as="p" className="lede" style={{ maxWidth: 820 }}>{intro}</Reveal>

          <div className="loc-grid">
            <Reveal as="div">
              <h2 style={{ fontSize: 22 }}>How to get here</h2>
              <div className="loc-steps">
                {howToGet.map((step, i) => (
                  <div className="loc-step" key={i}>
                    <div className="n">{i + 1}</div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal as="div" className="map-card">
              <iframe title="Map of Mirador del Maestrazgo, Ejulve" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <div className="map-foot">
                <span>{address}</span>
                <a className="btn small" href={mapLink} target="_blank" rel="noreferrer">Open in Google Maps</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <DirectStrip />
    </>
  )
}
