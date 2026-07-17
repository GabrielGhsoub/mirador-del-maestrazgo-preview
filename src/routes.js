// Central lazy-route registry with hover prefetch.
// Each importer is called by React.lazy AND by prefetchRoute() on nav hover,
// so by the time the user clicks, the chunk is already in cache: seamless.
export const importers = {
  '/houses': () => import('./pages/Houses.jsx'),
  '/houses/:slug': () => import('./pages/House.jsx'),
  '/activities': () => import('./pages/Activities.jsx'),
  '/location': () => import('./pages/Location.jsx'),
  '/about': () => import('./pages/About.jsx'),
  '/contact': () => import('./pages/Contact.jsx'),
}

const warmed = new Set()
export function prefetchRoute(path) {
  const key = path.startsWith('/houses/') && path !== '/houses' ? '/houses/:slug' : path
  const imp = importers[key]
  if (imp && !warmed.has(key)) {
    warmed.add(key)
    imp().catch(() => warmed.delete(key))
  }
}
