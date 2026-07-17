import { imgFadeRef, imgFadeLoad } from '../hooks/imgFade.js'
import { Link } from 'react-router-dom'
import DirectStrip from '../components/DirectStrip.jsx'
import content from '../data/content.json'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../hooks/useReveal.jsx'
import './misc.css'

const HERO = 'img/m/8808dd-mirador-skyline-1-q6hot2ghyie907faufv5zszqqs5gd3jslrbzssno2o.jpg'

// content.json stores full-size paths; cards only need the 560w thumbnail
const thumb = src => src.replace(/^img\//, 'img/t/')

/* ---- Designed header bands for cards without a photo ----
   Instead of a wrong stock photo, each imageless card gets an intentional
   band: an ink-to-gold gradient, a hand-drawn line glyph and the card
   number in big thin type. Styles are inline (misc.css is shared). */

const GOLD = '#bcb40e'
const CREAM = '#efece0'

const glyphProps = {
  width: 168,
  height: 108,
  viewBox: '0 0 140 96',
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// Cave mouth: two nested arches with hanging rock, for the underground trip
const caveGlyph = (
  <svg {...glyphProps}>
    <path d="M10 84 H130" stroke={CREAM} strokeWidth="1.5" opacity=".35" />
    <path d="M18 84 V52 Q18 16 70 16 Q122 16 122 52 V84" stroke={GOLD} strokeWidth="2" />
    <path d="M40 84 V58 Q40 38 70 38 Q100 38 100 58 V84" stroke={CREAM} strokeWidth="1.6" opacity=".55" />
    <path d="M58 39 v9 M70 38 v13 M82 39 v7" stroke={CREAM} strokeWidth="1.6" opacity=".55" />
  </svg>
)

// Cheese wedge with holes plus a tied artisan sausage, for the producers
const flavoursGlyph = (
  <svg {...glyphProps}>
    <path d="M18 78 L94 78 L94 42 Z" stroke={GOLD} strokeWidth="2" />
    <path d="M26 74.5 L88 47" stroke={GOLD} strokeWidth="1.2" opacity=".4" />
    <circle cx="70" cy="66" r="5" stroke={CREAM} strokeWidth="1.6" opacity=".6" />
    <circle cx="84" cy="59" r="3.4" stroke={CREAM} strokeWidth="1.6" opacity=".6" />
    <circle cx="52" cy="71" r="3" stroke={CREAM} strokeWidth="1.6" opacity=".6" />
    <g transform="rotate(-16 100 26)">
      <rect x="76" y="18" width="48" height="15" rx="7.5" stroke={CREAM} strokeWidth="1.8" opacity=".8" />
      <path d="M76 25.5 h-7 M124 25.5 h7" stroke={CREAM} strokeWidth="1.5" opacity=".6" />
      <path d="M88 18.5 v14 M100 18.5 v14 M112 18.5 v14" stroke={CREAM} strokeWidth="1" opacity=".3" />
    </g>
  </svg>
)

// Speedometer sweeping toward the redline, for MotorLand
const motorGlyph = (
  <svg {...glyphProps}>
    <path d="M26 72 A44 44 0 0 1 114 72" stroke={GOLD} strokeWidth="2" />
    <path d="M39 41 L43 45 M70 28 v6 M101 41 L97 45 M26 72 h6 M114 72 h-6" stroke={CREAM} strokeWidth="1.6" opacity=".6" />
    <path d="M70 72 L96 46" stroke={CREAM} strokeWidth="2.2" />
    <circle cx="70" cy="72" r="4.5" fill={GOLD} />
    <path d="M42 84 h56" stroke={CREAM} strokeWidth="1.5" opacity=".35" />
  </svg>
)

// Fallback for any future imageless card: Maestrazgo ridgeline
const defaultGlyph = (
  <svg {...glyphProps}>
    <path d="M14 80 L50 32 L68 56 L90 26 L126 80" stroke={GOLD} strokeWidth="2" />
    <circle cx="112" cy="26" r="8" stroke={CREAM} strokeWidth="1.6" opacity=".6" />
  </svg>
)

const BAND_ART = {
  'Adventure underground': {
    gradient: 'linear-gradient(150deg, #2c2917 0%, #1c1a14 55%, #3d380f 100%)',
    glyph: caveGlyph,
  },
  'Local flavours with identity': {
    gradient: 'linear-gradient(140deg, #1c1a14 0%, #35301a 52%, #57520d 100%)',
    glyph: flavoursGlyph,
  },
  'MotorLand and big thrills': {
    gradient: 'linear-gradient(120deg, #16140d 0%, #1c1a14 45%, #4a440f 100%)',
    glyph: motorGlyph,
  },
}

const DEFAULT_ART = {
  gradient: 'linear-gradient(145deg, #1c1a14 0%, #322e19 55%, #4a440f 100%)',
  glyph: defaultGlyph,
}

function ArtBand({ title, index }) {
  const art = BAND_ART[title] || DEFAULT_ART
  return (
    <div
      className="ph"
      aria-hidden="true"
      style={{
        background: art.gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {art.glyph}
      <span
        style={{
          position: 'absolute',
          right: 22,
          bottom: 8,
          fontSize: 64,
          fontWeight: 200,
          lineHeight: 1,
          letterSpacing: '.04em',
          color: 'rgba(246,245,240,.16)',
          userSelect: 'none',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  )
}

export default function Activities() {
  const { intro, items } = content.activities

  usePageTitle('Activities | Mirador del Maestrazgo')

  return (
    <>
      <div className="page-hero" style={{ backgroundImage: `linear-gradient(rgba(20,18,10,.3), rgba(20,18,10,.65)), url(${HERO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="wrap">
          <div className="kick">Things to do</div>
          <h1>Activities in the Maestrazgo</h1>
        </div>
      </div>

      <section>
        <div className="wrap">
          <Reveal as="p" className="lede">{intro}</Reveal>
          <div className="act-grid">
            {items.map((item, i) => (
              <Reveal as="div" className="act-card hover-lift" key={item.title} delay={(i % 2) * 60}>
                {item.image ? (
                  <div className="ph hover-zoom" style={{ background: 'var(--stone)' }}>
                    <img src={thumb(item.image)} alt={item.title} loading="lazy" className="img-fade" onLoad={imgFadeLoad} ref={imgFadeRef} />
                  </div>
                ) : (
                  <ArtBand title={item.title} index={i} />
                )}
                <div className="body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="lede" style={{ marginTop: 28 }}>
            Staying with us and want a plan for your days? <Link to="/contact" className="link-gold">Ask us</Link>, we know every corner.
          </p>
        </div>
      </section>

      <DirectStrip />
    </>
  )
}
