import { Link } from 'react-router-dom'
import './directstrip.css'

/** The gold "book direct and save" band, reusable across pages. */
export default function DirectStrip() {
  return (
    <div className="direct">
      <div className="wrap">
        <p>Book direct and save.
          <span>No platform commissions, best price guaranteed, and exclusive offers only available here.</span>
        </p>
        <Link to="/contact" className="btn dark">Book with us</Link>
      </div>
    </div>
  )
}
