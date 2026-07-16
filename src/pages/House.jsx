import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { SITE } from '../data/site.js'
import content from '../data/content.json'
import DirectStrip from '../components/DirectStrip.jsx'
import './houses.css'

export default function House() {
  const { slug } = useParams()
  const houses = content.houses || []
  const house = houses.find(h => h.slug === slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!house) return <Navigate to="/houses" replace />

  const images = house.images || []

  const openLightbox = i => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const showPrev = e => {
    e.stopPropagation()
    setLightboxIndex(i => (i - 1 + images.length) % images.length)
  }
  const showNext = e => {
    e.stopPropagation()
    setLightboxIndex(i => (i + 1) % images.length)
  }

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: `url(${house.heroImage})` }}>
        <div className="wrap">
          <div className="kick">Sleeps {house.capacity} · {SITE.name}</div>
          <h1>{house.name}</h1>
        </div>
      </div>

      <section className="house-detail-body">
        <div className="wrap">
          <div className="house-copy">
            {(house.description || []).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {house.features && house.features.length > 0 && (
            <ul className="feature-list">
              {house.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          )}
        </div>
      </section>

      {images.length > 0 && (
        <section className="bg-stone">
          <div className="wrap">
            <div className="sec-kick">Gallery</div>
            <h2>Inside {house.name}</h2>
            <div className="gallery">
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className="g-item"
                  onClick={() => openLightbox(i)}
                  aria-label={`View photo ${i + 1} of ${house.name}`}
                >
                  <img src={src} alt={`${house.name} photo ${i + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {lightboxIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button type="button" className="lb-close" onClick={closeLightbox} aria-label="Close">&times;</button>
          {images.length > 1 && (
            <button type="button" className="lb-nav lb-prev" onClick={showPrev} aria-label="Previous photo">&#8249;</button>
          )}
          <img
            src={images[lightboxIndex]}
            alt={`${house.name} photo ${lightboxIndex + 1}`}
            onClick={e => e.stopPropagation()}
          />
          {images.length > 1 && (
            <button type="button" className="lb-nav lb-next" onClick={showNext} aria-label="Next photo">&#8250;</button>
          )}
          <div className="lb-count">{lightboxIndex + 1} / {images.length}</div>
        </div>
      )}

      <section className="house-cta">
        <div className="wrap">
          <div className="sec-kick" style={{ color: 'var(--gold)' }}>Ready when you are</div>
          <h2>Ready for the Maestrazgo?</h2>
          <p className="lede">
            Ask about dates for {house.name} or call {SITE.name} directly on {SITE.phone}.
          </p>
          <div className="hc-actions">
            <Link className="btn" to="/contact">Check availability</Link>
            <a className="btn ghost" href={SITE.phoneHref}>{SITE.phone}</a>
          </div>
        </div>
      </section>

      <DirectStrip />
    </>
  )
}
