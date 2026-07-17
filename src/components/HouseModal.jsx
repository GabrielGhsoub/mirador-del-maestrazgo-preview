// Quick view modal for the houses index page. Opens from a house card,
// shows a photo strip plus the essentials, and links through to the full
// detail page. Closes on X, backdrop click and Escape; locks body scroll.
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { imgFadeRef, imgFadeLoad } from '../hooks/imgFade.js'
import './housemodal.css'

// Every img/<file> has pre-generated variants: img/t/<file> (thumb) and
// img/m/<file> (medium). Swap the prefix only.
const mediumSrc = src => src.replace(/^img\//, 'img/m/')
const thumbSrc = src => src.replace(/^img\//, 'img/t/')

export default function HouseModal({ house, onClose }) {
  const photos = house.images && house.images.length > 0 ? house.images : [house.heroImage]
  const thumbs = photos.slice(0, 4)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [underSrc, setUnderSrc] = useState(null)
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  // Move focus into the dialog on open, return it to the opener on close.
  useEffect(() => {
    const opener = document.activeElement
    if (closeRef.current) closeRef.current.focus()
    return () => {
      if (opener && typeof opener.focus === 'function') opener.focus()
    }
  }, [])

  // Lock body scroll while the modal is open.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Escape closes; Tab is kept inside the dialog.
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusables = panel.querySelectorAll('a[href], button:not([disabled])')
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  // Drop the crossfade underlay once the incoming photo has faded in.
  useEffect(() => {
    if (!underSrc) return undefined
    const t = setTimeout(() => setUnderSrc(null), 300)
    return () => clearTimeout(t)
  }, [underSrc])

  const selectPhoto = i => {
    if (i === photoIndex) return
    setUnderSrc(photos[photoIndex])
    setPhotoIndex(i)
  }

  const titleId = `hm-title-${house.slug}`

  return (
    <div
      className="hm-overlay"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="hm-panel" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={panelRef}>
        <button type="button" className="hm-close" onClick={onClose} aria-label="Close quick view" ref={closeRef}>
          &times;
        </button>

        <div className="hm-media">
          <div className="hm-photo">
            {underSrc && (
              <img className="hm-under" src={mediumSrc(underSrc)} alt="" aria-hidden="true" />
            )}
            {/* Keyed frame animates in over the previous photo: a 250ms crossfade */}
            <div className="hm-frame" key={photos[photoIndex]}>
              <img
                src={mediumSrc(photos[photoIndex])}
                alt={`${house.name} photo ${photoIndex + 1}`}
                className="img-fade"
                ref={imgFadeRef}
                onLoad={imgFadeLoad}
              />
            </div>
          </div>
          {thumbs.length > 1 && (
            <div className="hm-thumbs">
              {thumbs.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`hm-thumb${i === photoIndex ? ' active' : ''}`}
                  onClick={() => selectPhoto(i)}
                  aria-label={`Show photo ${i + 1} of ${house.name}`}
                  aria-pressed={i === photoIndex}
                >
                  <img src={thumbSrc(src)} alt="" className="img-fade" ref={imgFadeRef} onLoad={imgFadeLoad} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hm-body">
          <div className="hm-cap">{house.capacity}</div>
          <h3 id={titleId}>{house.name}</h3>
          <p className="hm-tagline">{house.tagline}</p>
          {(house.description || []).slice(0, 2).map((para, i) => (
            <p className="hm-desc" key={i}>{para}</p>
          ))}
          {house.features && house.features.length > 0 && (
            <ul className="hm-features">
              {house.features.slice(0, 5).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}
          <div className="hm-actions">
            <Link className="btn small" to={`/houses/${house.slug}`}>See the full house</Link>
            <Link className="btn small hm-ghost" to="/contact">Check availability</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
