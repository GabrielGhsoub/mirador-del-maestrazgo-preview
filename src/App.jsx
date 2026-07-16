import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MobileCta from './components/MobileCta.jsx'
import BackToTop from './components/BackToTop.jsx'
import Home from './pages/Home.jsx'
import Houses from './pages/Houses.jsx'
import House from './pages/House.jsx'
import Activities from './pages/Activities.jsx'
import Location from './pages/Location.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/houses" element={<Houses />} />
        <Route path="/houses/:slug" element={<House />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/location" element={<Location />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <MobileCta />
      <BackToTop />
    </>
  )
}
