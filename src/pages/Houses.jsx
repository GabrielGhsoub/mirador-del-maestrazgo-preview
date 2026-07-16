import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../data/site.js'
import content from '../data/content.json'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../hooks/useReveal.jsx'
import './houses.css'

function FadeImage({ src, alt, className = '', ...rest }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      className={`img-fade${loaded ? ' loaded' : ''}${className ? ' ' + className : ''}`}
      onLoad={() => setLoaded(true)}
      {...rest}
    />
  )
}

export default function Houses() {
  const houses = content.houses || []

  usePageTitle('Our houses | Mirador del Maestrazgo')

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: `url(${SITE.heroImage})` }}>
        <div className="wrap">
          <div className="kick">Our houses</div>
          <h1>Three houses, one quiet village</h1>
        </div>
      </div>

      <section>
        <div className="wrap">
          <Reveal>
            <div className="sec-kick">Ejulve, Teruel</div>
            <h2>Choose your house</h2>
            <p className="lede">
              Three independent houses in the same corner of the Maestrazgo, each with its own
              character, sleeping between them up to {SITE.scores.capacity} guests.
            </p>
          </Reveal>

          <div className="house-list">
            {houses.map(house => (
              <Reveal as="article" className="card house-card hover-lift" key={house.slug}>
                <div className="hc-media hover-zoom" role="img" aria-label={house.name}>
                  <FadeImage src={house.heroImage} alt={house.name} />
                </div>
                <div className="hc-body">
                  <div className="hc-cap">Sleeps {house.capacity}</div>
                  <h3>{house.name}</h3>
                  <p className="hc-tagline">{house.tagline}</p>
                  {house.description && house.description[0] && (
                    <p className="hc-desc">{house.description[0]}</p>
                  )}
                  <div className="hc-actions">
                    <Link className="btn small" to={`/houses/${house.slug}`}>See the house</Link>
                    <Link className="btn small dark" to="/contact">Check availability</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
