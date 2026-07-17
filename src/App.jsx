import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MobileCta from './components/MobileCta.jsx'
import BackToTop from './components/BackToTop.jsx'
import PageTransition from './components/PageTransition.jsx'
import Home from './pages/Home.jsx'
import { importers } from './routes.js'

const Houses = lazy(importers['/houses'])
const House = lazy(importers['/houses/:slug'])
const Activities = lazy(importers['/activities'])
const Location = lazy(importers['/location'])
const About = lazy(importers['/about'])
const Contact = lazy(importers['/contact'])

// Scroll-to-top happens inside PageTransition at the exit/enter swap moment,
// so the outgoing page is not yanked to the top mid-fade.
// Routes renders the displayLocation (not the live one) so the outgoing page
// stays mounted while it fades out; the Suspense fallback keeps a min-height
// INSIDE the transition wrapper so a lazy chunk never causes a blank flash.
export default function App() {
  return (
    <>
      <Header />
      <PageTransition>
        {(displayLocation) => (
          <Suspense fallback={<div style={{ minHeight: '70vh' }} />}>
            <Routes location={displayLocation}>
              <Route path="/" element={<Home />} />
              <Route path="/houses" element={<Houses />} />
              <Route path="/houses/:slug" element={<House />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/location" element={<Location />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        )}
      </PageTransition>
      <Footer />
      <MobileCta />
      <BackToTop />
    </>
  )
}
