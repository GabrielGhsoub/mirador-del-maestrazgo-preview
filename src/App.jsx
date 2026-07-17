import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
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
      <PageTransition>
        <Suspense fallback={<div style={{ minHeight: '70vh' }} />}>
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
        </Suspense>
      </PageTransition>
      <Footer />
      <MobileCta />
      <BackToTop />
    </>
  )
}
