# QA Report — Mirador del Maestrazgo preview site
**URL:** https://gabrielghsoub.github.io/mirador-del-maestrazgo-preview/ (React SPA, hash routing)
**Date:** 2026-07-17 · **Tested:** all 9 routes + bogus route, desktop (1920x783 CSS px) and mobile layout (500px CSS width, burger + bottom CTA bar active). Browser: Claude-in-Chrome (one tab, closed after) + isolated devtools browser for the mobile viewport.

**Counts: 1 blocker · 5 major · 6 minor · 4 polish.**

---

## BLOCKER

### B1. Every image on the site is hotlink-blocked — the whole site shows red "Stop!" prohibition signs
- **Pages:** ALL (home hero + logo + 3 house cards + host photo, houses page (3 card photos), all 3 house detail heroes + 14-image galleries each, activities images, location hero, about hero, contact hero).
- **What:** All imagery is hotlinked from `miradordelmaestrazgo.es/wp-content/uploads/...`. That WordPress server has hotlink protection: any request with a foreign `Referer` gets a 200x200 placeholder that literally says **"Stop! This image was hotlinked"** with a red no-entry symbol. So the showpiece renders wall-to-wall prohibition signs — including as the header logo on every page. This will look identical on Fernando's machine; it is not a local artifact.
- **Evidence:** every `img.naturalWidth === 200` (placeholder) while layout boxes are e.g. 581x367; zoomed screenshot of logo reads "Stop! This image was hotlinked". Hero CSS backgrounds (`.hero`, `.page-hero`) same origin, same placeholder.
- **Fix (verified working):** the server ALLOWS empty referer. Tested in-page:
  - default referrer → 200x200 placeholder
  - `img.referrerPolicy='no-referrer'` → real image loads (2048x1367).
  - One-line global fix: add `<meta name="referrer" content="no-referrer">` to `index.html` `<head>` (covers `<img>` AND CSS `background-image`). Longer term: self-host optimized copies.

---

## MAJOR

### M1. Sticky header never sticks — nav disappears the moment you scroll (all pages, desktop & mobile)
- `header.site-header` has `position: sticky; top: 0`, but at scrollY 2000 its rect.top is -1962: it scrolls away with the page. Root cause: `body` computes `overflow: hidden auto` (the `overflow-x: hidden` creates a scroll container on body while the real scroller is `html`), which defeats `position: sticky`.
- Consequence: no persistent nav / "Check availability" CTA; the `.scrolled` shadow state (which does toggle correctly on scroll) is never visible. Fix: move `overflow-x: hidden` to `html` only, or use `overflow-x: clip`.

### M2. Back-to-top button does not scroll
- Home page (same component everywhere). The button appears/fades correctly after scrolling, but clicking it does nothing: real click on the visible button at scrollY 2827 → still 2827; programmatic `.click()` at 2000 → still 2000; no console error. `window.scrollTo(0,0)` works fine, so the handler is scrolling the wrong element (likely tied to the same body/html scroll-container confusion as M1).

### M3. Mobile: the "Free preview by Likwiid" pill overlaps the bottom CTA bar and the menu drawer's CTA
- `.mock-note` (position fixed, rect x214–471, y763–798) sits on top of `.mobile-cta` (fixed bar, y751–812), fully covering the **WhatsApp** label and most of **Book**. With the burger drawer open it also covers the drawer's "Check availability" button text. First impression on a phone is a layout collision. (Footer legal line itself clears the bar fine.) Fix: give the pill `bottom` offset above the CTA bar on mobile, or dock it top-left.

### M4. La Casa de Colores hero/card photo is a kitchen interior, not the house
- `#/houses/la-casa-de-colores` hero and its card on `#/houses` use `2025/06/Mirador-2024-8.jpg`. Downloaded the file directly and inspected it: it is a cramped kitchenette (microwave, sink, dining table) shot on a phone. As a full-width hero behind the page title it will look wrong even once B1 is fixed. Use the yellow-facade / village exterior shot instead.

### M5. Language switcher is dead (EN/ES/FR)
- The header pills, the drawer pills and footer "English · Español · Français" are plain `<span>`s (`div.langs`) — not clickable, cursor:auto, no ES/FR content exists. This is being shown to a **Spanish** owner whose first click will be "ES", and nothing will happen while the control looks active (EN pill highlighted). Either wire a real ES version (ideal for the demo), or remove the pills / add a "coming in the full version" tooltip.

---

## MINOR

### m1. Hero button "Explore the houses" uses `#houses` (missing slash)
- Home hero secondary CTA `href="#houses"` → URL becomes `.../#houses` instead of `#/houses`. The router happens to render the houses page, but the URL is a non-canonical duplicate state (nav highlight works; sharing/refresh keeps odd URL). All other links use `#/...`.

### m2. Ungrammatical auto-assembled labels on house detail eyebrows
- `#/houses/los-pajarcicos`: "SLEEPS TWO APARTMENTS, UP TO 8 GUESTS"; colores: "SLEEPS FOUR ROOMS, UP TO 10 GUESTS"; gato: "SLEEPS WHOLE HOUSE, 6 TO 10 GUESTS". "Sleeps two apartments" reads as a template concatenation bug. Should be e.g. "TWO APARTMENTS · SLEEPS UP TO 8".

### m3. Truncated sentence: "…building details of the 19th."
- Houses list card AND La Casa del Gato detail intro: "keeping the structure and building details of the 19th." — missing "century".

### m4. Host naming inconsistency
- Headlines say "Fernando **and Mar**, your hosts" (home + about), but about-page body says "Fernando, your host, puts all **his** effort…" and contact says "Fernando answers personally." Pick one story.

### m5. "SPAIN" in the hero eyebrow is almost invisible
- "EJULVE · TERUEL · SPAIN": the first two words are bright yellow, "SPAIN" renders in a much darker olive that disappears against the dark hero. Looks like a styling accident (verified by zoom).

### m6. After form submit, the success card heading is clipped at the viewport top
- Desktop contact page: on success the page scrolls so "Thank you! Your request is on its way." is cut in half at the top edge. Add scroll-margin/offset.

---

## POLISH

### p1. Activities cards are asymmetric with dead space
- Pairs mix image-cards and text-only cards: "MotorLand and big thrills" (no image) is stretched to its image-card partner's height (414px) leaving a large empty bottom; "Hiking routes" pairs the other way. Give every card an image or equalize content.

### p2. Gallery grids end ragged
- 14 images in a 3-col grid = last row of 2 with an empty slot (desktop). Consider a featured-first/masonry layout; also image tiles fade in from plain white, which reads as broken while loading — use a tinted placeholder/blur-up.

### p3. Bottom-right corner is cluttered on desktop
- Back-to-top circle stacked directly above the Likwiid pill near the footer; spacing is tight (and on the location page mobile the back-to-top floats over the yellow "Book direct" band text). Align/space these fixed elements as a group.

### p4. Footer "Legal notice · Cookies policy · Accessibility" are plain text
- Not links anywhere. Fine for a preview, but if kept as text they set an expectation; either link stubs or drop them.

---

## Verified working (no action)
- Routing: all 9 routes render; bogus `#/nope` redirects to home (hash resets to `#/`).
- No JS console errors on any route; no `undefined`/`null`/lorem/placeholder text; **zero em/en dashes** in visible copy; no Spanish leaking into EN copy (house names are proper nouns).
- FAQ accordion: single-open behavior, real answers, first item open by default, opens/closes on click.
- Lightbox: opens from gallery tile, counter ("10 / 14"), arrow buttons + keyboard Right advance, Escape closes. Works on mobile too (counter "1 / 14").
- Burger drawer (mobile): slides from right with backdrop, X closes, **Escape closes**, links navigate AND auto-close the drawer.
- Mobile bottom CTA bar: present (Call `tel:`, WhatsApp `wa.me/34626298002`, Book → contact) and does NOT cover the footer legal line (34px clearance at full scroll) — the only conflict is the Likwiid pill (M3).
- Contact form: empty submit blocked by native validation (name, email, arrival, departure required, focus moves to first invalid); arrival-after-departure shows "The departure date must be after the arrival date."; valid submit shows success card with "(This is a design preview: no data was sent.)" and scrolls to it (see m6).
- Location: Google Maps embed renders real map tiles with both property markers, desktop and mobile; "Open in Google Maps" button present.
- Header scroll behavior: `.scrolled` class and back-to-top `.visible` class toggle correctly on real scrolling (but see M1/M2).

## Test-environment caveats
- Desktop pass ran at 1920x783 CSS px (browser zoom in the outreach Chrome prevented a literal 1280x800 CSS viewport); mobile pass ran at 500px CSS width (test browser minimum window width) — the mobile layout (burger, CTA bar, single column) was fully active. A literal 375px iPhone pass should be repeated after fixes, ideally in device-mode DevTools.

## Overall verdict
The bones are genuinely good: clean typography, coherent olive/cream palette, sensible IA, working micro-interactions (drawer, lightbox, accordion, validated form with an honest "no data sent" note), and no console errors. But it is **not showable today**: fix B1 (one meta tag), M1/M2 (one CSS overflow fix likely resolves both), M3 (pill offset), swap the M4 photo and decide M5 — then it will actually feel state-of-the-art.

**Top 3 highest-impact visual upgrades** (post-fix): 1) real photography with art-directed heroes (correct focal points, exterior shot for Colores, blur-up loading); 2) working sticky header with the shadow it already ships; 3) balanced activities/gallery grids so no card or row ends in dead space.
