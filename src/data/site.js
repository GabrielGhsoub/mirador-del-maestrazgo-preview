// Global site constants. Verified on the live site + OTA listings 2026-07-16.
// Do NOT invent numbers; these are the sourced ones.
export const SITE = {
  name: 'Mirador del Maestrazgo',
  phone: '+34 978 75 28 08',
  phoneHref: 'tel:+34978752808',
  email: 'info@miradordelmaestrazgo.es',
  address: '44559 Ejulve, Teruel, Aragón, Spain',  // per-house streets live in content.json howToGet
  registration: 'VT-TE 552 · CR-TE 734 · VT-TE 563',
  logo: 'https://miradordelmaestrazgo.es/wp-content/uploads/2025/05/LOGO-miradordelmaestrazgoweb-1-300x171.jpg?lk=2',
  heroImage: 'https://miradordelmaestrazgo.es/wp-content/uploads/2025/05/154-2048x1536.jpg?lk=2',
  scores: {
    booking: '8.4', bookingReviews: 33,
    staff: '9.6', comfort: '8.3', cleanliness: '8.0',
    tripadvisor: '4 / 5', tripadvisorReviews: 69,
    capacity: 28,
  },
  // The mockup demonstrates the concept; real engine wiring is part of the paid build.
  bookingCta: '#/contact',
}

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/houses', label: 'Our houses' },
  { to: '/activities', label: 'Activities' },
  { to: '/location', label: 'Location' },
  { to: '/about', label: 'About us' },
  { to: '/contact', label: 'Contact' },
]

export const HOUSE_LINKS = [
  { slug: 'los-pajarcicos', name: 'Los Pajarcicos' },
  { slug: 'la-casa-de-colores', name: 'La Casa de Colores' },
  { slug: 'la-casa-del-gato', name: 'La Casa del Gato' },
]
