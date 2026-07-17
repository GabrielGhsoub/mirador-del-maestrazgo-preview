// Fixes the cached-image trap: a cached <img> is complete before React
// attaches onLoad, so the fade-in class never fires and the photo stays
// invisible. Use as ref on any .img-fade image.
export function imgFadeRef(el) {
  if (el && el.complete && el.naturalWidth > 0) el.classList.add('loaded')
}
export function imgFadeLoad(e) {
  e.currentTarget.classList.add('loaded')
}
