import { Link } from 'react-router-dom'
import DirectStrip from '../components/DirectStrip.jsx'
import content from '../data/content.json'
import usePageTitle from '../hooks/usePageTitle.js'
import Reveal from '../hooks/useReveal.jsx'
import './misc.css'

const HERO = 'img/8808dd-mirador-skyline-1-q6hot2ghyie907faufv5zszqqs5gd3jslrbzssno2o.jpg'

function handleImgLoad(e) {
  e.currentTarget.classList.add('loaded')
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
            {items.map(item => (
              <Reveal as="div" className="act-card hover-lift" key={item.title}>
                {item.image && (
                  <div className="ph hover-zoom">
                    <img src={item.image} alt={item.title} loading="lazy" className="img-fade" onLoad={handleImgLoad} />
                  </div>
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
