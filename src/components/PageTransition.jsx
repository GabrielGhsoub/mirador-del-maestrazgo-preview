// Route-change glide: keys the wrapper by pathname so every navigation
// remounts the view with a soft fade + 7px rise (see pagetransition.css).
// No dependencies; respects prefers-reduced-motion via CSS.
import { useLocation } from 'react-router-dom'
import './pagetransition.css'

export default function PageTransition({ children }) {
  const { pathname } = useLocation()
  return (
    <div className="page-glide" key={pathname}>
      {children}
    </div>
  )
}
