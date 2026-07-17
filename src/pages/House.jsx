import { imgFadeRef, imgFadeLoad } from '../hooks/imgFade.js'
import { useEffect, useRef, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { SITE } from '../data/site.js'
import content from '../data/content.json'
import DirectStrip from '../components/DirectStrip.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal, { useReveal } from '../hooks/useReveal.jsx'
import './houses.css'

const SWIPE_THRESHOLD = 40

// Grid tiles use the pre-generated thumbnail variant; the lightbox keeps
// the full-size original.
const thumbSrc = src => src.replace(/^img\//, 'img/t/')

export default function House() {
  const { slug } = useParams()
  const houses = content.houses || []
  const house = houses.find(h => h.slug === slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [lbUnder, setLbUnder] = useState(null)
  const touchStartX = useRef(null)
  const [galleryRef, galleryIn] = useReveal()

  usePageTitle(house ? `${house.name} | Mirador del Maestrazgo` : 'Mirador del Maestrazgo')

  const images = house ? house.images || [] : []

  const openLightbox = i => {
    setLbUnder(null)
    setLightboxIndex(i)
  }
  const closeLightbox = () => {
    setLbUnder(null)
    setLightboxIndex(null)
  }
  const showPrev = e => {
    if (e) e.stopPropagation()
    setLbUnder(images[lightboxIndex])
    setLightboxIndex(i => (i - 1 + images.length) % images.length)
  }
  const showNext = e => {
    if (e) e.stopPropagation()
    setLbUnder(images[lightboxIndex])
    setLightboxIndex(i => (i + 1) % images.length)
  }

  // Keyboard navigation: left/right arrows move through the gallery, Escape closes.
  useEffect(() => {
    if (lightboxIndex === null) return undefined
    const onKeyDown = e => {
      if (e.key === 'ArrowLeft') showPrev()
      else if (e.key === 'ArrowRight') showNext()
      else if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, images.length])

  // Preload the next image so arrow/swipe navigation feels instant.
  useEffect(() => {
    if (lightboxIndex === null || images.length < 2) return
    const nextSrc = images[(lightboxIndex + 1) % images.length]
    const preload = new Image()
    preload.src = nextSrc
  }, [lightboxIndex, images])

  // Drop the crossfade underlay once the incoming photo has faded in.
  useEffect(() => {
    if (!lbUnder) return undefined
    const t = setTimeout(() => setLbUnder(null), 240)
    return () => clearTimeout(t)
  }, [lbUnder])

  const onTouchStart = e => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = e => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (deltaX > SWIPE_THRESHOLD) showPrev()
    else if (deltaX < -SWIPE_THRESHOLD) showNext()
  }

  if (!house) return <Navigate to="/houses" replace />

  return (
    <>
      <div className="page-hero house-hero">
        <div
          className="house-hero-bg"
          style={{ backgroundImage: `linear-gradient(rgba(20,18,10,.3), rgba(20,18,10,.65)), url(${house.heroImage})` }}
          aria-hidden="true"
        />
        <div className="wrap">
          <div className="kick">{house.capacity} · {SITE.name}</div>
          <h1>{house.name}</h1>
        </div>
      </div>

      <section className="house-detail-body">
        <Reveal as="div" className="wrap">
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
        </Reveal>
      </section>

      {images.length > 0 && (
        <section className="bg-stone">
          <div className="wrap">
            <Reveal>
              <div className="sec-kick">Gallery</div>
              <h2>Inside {house.name}</h2>
            </Reveal>
            <div className={`gallery${galleryIn ? ' g-in' : ''}`} ref={galleryRef}>
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className="g-item"
                  style={{ transitionDelay: `${Math.min(i * 55, 440)}ms` }}
                  onClick={() => openLightbox(i)}
                  aria-label={`View photo ${i + 1} of ${house.name}`}
                >
                  <img src={thumbSrc(src)} alt={`${house.name} photo ${i + 1}`} loading="lazy" className="img-fade" onLoad={imgFadeLoad} ref={imgFadeRef} />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {lightboxIndex !== null && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button type="button" className="lb-close" onClick={closeLightbox} aria-label="Close">&times;</button>
          {images.length > 1 && (
            <button type="button" className="lb-nav lb-prev" onClick={showPrev} aria-label="Previous photo">&#8249;</button>
          )}
          <div className="lb-stage" onClick={e => e.stopPropagation()}>
            {lbUnder && (
              <img className="lb-under" src={lbUnder} alt="" aria-hidden="true" />
            )}
            {/* Keyed frame fades in over the previous photo: a 200ms crossfade */}
            <div className="lb-frame" key={images[lightboxIndex]}>
              <img
                src={images[lightboxIndex]}
                alt={`${house.name} photo ${lightboxIndex + 1}`}
                className="img-fade"
                ref={imgFadeRef}
                onLoad={imgFadeLoad}
              />
            </div>
          </div>
          {images.length > 1 && (
            <button type="button" className="lb-nav lb-next" onClick={showNext} aria-label="Next photo">&#8250;</button>
          )}
          <div className="lb-count">{lightboxIndex + 1} / {images.length}</div>
        </div>
      )}

      <section className="house-cta">
        <Reveal as="div" className="wrap">
          <div className="sec-kick" style={{ color: 'var(--gold)' }}>Ready when you are</div>
          <h2>Ready for the Maestrazgo?</h2>
          <p className="lede">
            Ask about dates for {house.name} or call {SITE.name} directly on {SITE.phone}.
          </p>
          <div className="hc-actions">
            <Link className="btn" to="/contact">Check availability</Link>
            <a className="btn ghost" href={SITE.phoneHref}>{SITE.phone}</a>
          </div>
        </Reveal>
      </section>

      <DirectStrip />
    </>
  )
}
