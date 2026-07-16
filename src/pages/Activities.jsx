import { Link } from 'react-router-dom'
import DirectStrip from '../components/DirectStrip.jsx'
import content from '../data/content.json'
import './misc.css'

const HERO = 'https://miradordelmaestrazgo.es/wp-content/uploads/2025/06/mirador-skyline-1-q6hot2ghyie907faufv5zszqqs5gd3jslrbzssno2o.jpg'

export default function Activities() {
  const { intro, items } = content.activities
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
          <p className="lede">{intro}</p>
          <div className="act-grid">
            {items.map(item => (
              <div className="act-card" key={item.title}>
                {item.image && <div className="ph" style={{ backgroundImage: `url(${item.image})` }} />}
                <div className="body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
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
