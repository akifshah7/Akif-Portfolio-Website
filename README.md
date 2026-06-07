# Handoff: Akif Shah — Personal Portfolio

## Overview
A single-page personal portfolio for a frontend developer. Dark, "glassy futuristic"
aesthetic with an animated gradient-mesh background, glassmorphism cards, a neon-green
accent, a custom cursor, scroll-reveal animations, and a typed/rotating hero headline.

Sections, in order: **Hero → About → Skills → Projects (Work) → Experience → Contact → Footer**,
plus a floating pill **Nav** and a top **scroll-progress** bar.

## About the Design Files
The files in this bundle are a **working design reference built in HTML/CSS/React** —
a high-fidelity prototype showing the intended look and behavior. They render and run as-is
(open `Portfolio.html`), but they were authored as a *design*, not as a production build:
React + Babel are loaded from a CDN and JSX is transpiled in the browser, which is fine for a
prototype but not how you'd ship.

Your task is to **recreate this design in a real project environment** using its established
patterns. If you have no project yet, scaffold one — for this design the natural choice is
**Vite + React + TypeScript** (or Next.js if you want SSR/routing later). Port the CSS in
`portfolio/styles.css` directly (it's framework-agnostic and already token-driven), and turn the
`.jsx` files into proper components/modules with a real build step. You can also ship it as
plain HTML/CSS + a little vanilla JS if you'd rather avoid React — nothing here strictly needs it.

## Fidelity
**High-fidelity.** Colors, typography, spacing, motion timings, and interactions are all final
and intentional. Recreate it pixel-for-pixel; the exact values are documented below and live in
`portfolio/styles.css`.

## Tech notes for the rebuild
- **Fonts:** Google Fonts — `Space Grotesk` (display/UI, weights 400–700) and `JetBrains Mono`
  (mono accents/labels, weights 400/500/700). Currently loaded via `<link>` in `Portfolio.html`.
- **No UI/component library** is used — everything is hand-rolled CSS. Keep it that way or map to
  your design system if you have one.
- **Icons** are inline SVGs (arrow, up-right arrow, mail) defined in `parts.jsx` — trivial to copy.
- **`<image-slot>`** is a custom element used as a drag-and-drop image placeholder in the prototype
  (About photo + 3 project thumbnails). In production, replace each with a normal `<img>` (or
  `next/image`) pointing at real assets. The slots are purely a prototyping convenience.
- **Accessibility / motion:** every animation already respects `prefers-reduced-motion`. Preserve
  that. The custom cursor and parallax are disabled at `max-width: 820px`.

---

## Design Tokens
All defined as CSS custom properties at `:root` in `portfolio/styles.css`.

### Color
| Token | Value | Use |
|---|---|---|
| `--bg` | `#050706` | Page background (near-black green) |
| `--bg-2` | `#080c0a` | Slightly lifted surfaces |
| `--glass` | `rgba(255,255,255,0.04)` | Glass card fill |
| `--glass-2` | `rgba(255,255,255,0.06)` | Glass hover fill |
| `--glass-border` | `rgba(255,255,255,0.10)` | Glass border |
| `--glass-border-strong` | `rgba(255,255,255,0.18)` | Glass border on hover |
| `--text` | `#E9EFEA` | Primary text |
| `--muted` | `#8B968E` | Secondary text |
| `--faint` | `#5A635C` | Tertiary / numbering |
| `--accent` | `#39FF14` | Neon green — primary accent |
| `--accent-2` | `#00E6C3` | Teal — gradient partner |
| `--accent-soft` | `rgba(57,255,20,0.14)` | Accent glows/fills |

Gradient text uses `linear-gradient(105deg, var(--accent), var(--accent-2), #bfffd0)` with
`background-clip: text; -webkit-text-fill-color: transparent`.

### Typography
- Display/UI font: `--display: "Space Grotesk", system-ui, sans-serif`
- Mono font: `--mono: "JetBrains Mono", ui-monospace, Menlo, monospace`
- Hero `h1`: `clamp(44px, 9vw, 116px)`, weight 600, `letter-spacing: -0.035em`, `line-height: 0.94`
- Section `h2`: `clamp(32px, 5vw, 56px)`, weight 600, `-0.02em`, `line-height: 1.05`
- Contact `h2.big`: `clamp(40px, 8vw, 96px)`, weight 600, `-0.035em`
- Body/lede: `clamp(15px, 1.7vw, 18px)`, `line-height: 1.6–1.65`
- Eyebrows/labels: mono, `~12.5px`, `letter-spacing: 0.22em`, uppercase, accent-colored

### Spacing & layout
- Content max width: `--maxw: 1180px`
- Page gutter: `--gutter: clamp(20px, 5vw, 64px)`
- Card radius: `--radius: 18px`
- Section vertical padding: `clamp(80px, 12vh, 160px)`
- Signature easing: `--ease: cubic-bezier(0.22, 1, 0.36, 1)` (used on nearly every transition)

### Glass card recipe (`.glass`)
`background: var(--glass)` + `1px solid var(--glass-border)` + `border-radius: var(--radius)` +
`backdrop-filter: blur(14px)`, plus a `::before` gradient hairline
(`linear-gradient(160deg, rgba(255,255,255,0.22), transparent 40%)` masked to a 1px border) for
the top-left highlight edge.

---

## Background & global chrome

### Animated mesh background (`.bg-root`, fixed, z-index 0)
Three blurred radial "mesh" blobs that drift on infinite alternating keyframes
(`drift1/2/3`, 22s/26s/30s), `filter: blur(90px)`, `mix-blend-mode: screen`, low opacity
(0.20–0.28). Blob 1 = accent green (top-left), blob 2 = teal (right), blob 3 = darker green
(bottom). Over them: a faint 64px CSS grid (`.grid-overlay`, radially masked) and an SVG
fractal-noise texture (`.noise`, opacity 0.04). All drift animations stop when
`[data-motion="off"]` is on the root.

### Custom cursor (`Cursor` in parts.jsx)
Two fixed elements: a 6px solid dot that tracks the pointer 1:1, and a 34px ring that lags via
lerp (`+= (target - current) * 0.18`) in a rAF loop. Ring grows to 56px and turns accent-green
(`.hot`) when hovering `a, button, .magnetic, image-slot, [data-hot]`. `mix-blend-mode: difference`
on the dot. Disabled below 820px (native cursor restored). The page sets `cursor: none` globally
above that breakpoint.

### Scroll progress (`.progress`, fixed top, z 101)
2px bar, `linear-gradient(90deg, accent, accent-2)`, width = scroll fraction, updated on a passive
scroll listener.

---

## Screens / Views (single page, scroll)

### Nav (`.nav`) — floating pill, fixed top-center
- **Layout:** `min(1180px, 100% - 32px)` wide, centered, flex space-between, `border-radius: 100px`,
  translucent dark fill `rgba(8,12,10,0.55)` + `backdrop-filter: blur(18px) saturate(1.2)`.
- **Left:** logo = pulsing accent dot + `AS` (mono 700) + `/dev` in faint.
- **Center:** links About / Skills / Work / Experience. Active link gets a glowing underline; the
  active section is tracked with an IntersectionObserver (`rootMargin: -45% 0 -50% 0`).
- **Right:** "Get in touch" CTA — solid accent pill, dark text.
- **Behavior:** hides (slides up, `translateY(-150%)`) when scrolling **down** past 400px, reappears
  on scroll **up**. Links hidden below 720px (mobile menu not yet built — see Open Items).

### Hero (`.hero`, `#top`) — `min-height: 100svh`, flex-centered, padding-top 120px
- **Status pill:** mono, glass, with a pulsing accent "live" dot — "Available for new projects — 2026".
- **H1:** first name on line 1; last name + "." on line 2 in gradient text. Huge, tight.
- **Typed role line:** mono, "→ I build `<rotating word>`" + blinking caret. Words cycle through
  `roles[]` in data.js with a typewriter effect (type 70ms / erase 38ms / hold 1500ms). Respects
  reduced-motion (shows first word, no animation).
- **Lede:** muted paragraph, max-width ~540px.
- **CTAs:** "View my work" (primary accent) + "Let's talk" (ghost glass). Both wrapped in `Magnetic`.
- **Stats row:** 4 count-up stats (years, projects, repos, lighthouse). Numbers animate 0→target
  with a cubic ease-out when scrolled into view (`CountUp`, 1600ms). Unit/suffix in accent.
- **Parallax:** the whole hero-inner translates down `scrollY * 0.12` and fades out by ~700px scroll.
- **Scroll hint:** bottom-center "SCROLL" + an animated draining vertical line.

### About (`#about`)
- **Section head** (`SecHead`): floated mono number `( 01 )`, accent eyebrow "About", h2
  "Engineer's discipline, designer's eye."
- **Grid:** `1.4fr / 1fr`, collapses to one column below 860px.
- **Left:** two paragraphs (lead + muted) from `about[]`. `<em>` is rendered as accent-colored text.
- **Right (`.about-side`):** a 4:5 glass photo slot (replace with real `<img>`) + a glass "facts"
  card — key/value rows (BASED IN / FOCUS / STACK / STATUS), keys in mono-muted, some values accent.

### Skills (`#skills`)
- **Section head:** `( 02 )` / "Toolkit" / "The stack I reach for."
- **Marquee:** infinite horizontal scroll of tech names (`marquee[]` duplicated for seamless loop),
  28s linear, edge-masked, pauses on hover, stops under `[data-motion="off"]`. Each item has a small
  accent ✦ separator.
- **Grid:** 4 glass category cards (Languages / Frameworks / Motion & 3D / Craft & Tooling) →
  2 cols < 900px, 1 col < 520px. Each: mono index, title, bulleted list with rotated-square accent
  bullets. Cards lift `translateY(-5px)` + brighten border on hover. Staggered reveal (0.07s each).

### Projects / Work (`#work`)
- **Section head:** `( 03 )` / "Selected Work" / "Things I've built recently."
- **3 project rows** (`projects[]`). Each is a glass card, 2-column (media / body) that **alternates
  sides** on even rows; single column below 820px.
  - **Media:** 16:11 image slot (replace with real screenshot) + an absolute mono **badge** top-left.
  - **Body:** mono "PROJECT 0N", title (`clamp(24px,3.2vw,34px)`), description (max ~46ch), mono tag
    chips, and a "View case study ↗" link (arrow translates on hover).
  - **Interaction:** subtle 3D tilt toward the cursor on hover
    (`perspective(1000px) rotateX/rotateY ±3deg` + `translateY(-4px)`), disabled < 820px.

### Experience (`#experience`)
- **Section head:** `( 04 )` / "Journey" / "Where I've worked."
- **Vertical timeline:** a gradient rail (accent → glass) with circular accent nodes. Three entries
  (`experience[]`): mono accent date, role (h3), org (bold name + location), description (max ~64ch).
  Staggered reveal.

### Contact (`#contact`, centered)
- Accent eyebrow "Contact"; big gradient headline "Let's build / something great."; muted subhead.
- **Mail CTA:** primary accent button with mail icon → `mailto:` (Magnetic, strength 0.25).
- **Socials:** glass pills (GitHub / LinkedIn / Twitter-X / Read.cv), lift + accent border on hover.

### Footer
- Top border hairline. Left: mono "© 2026 Akif Shah". Right: "Back to top ↑" (turns accent on hover).

---

## Interactions & Behavior (summary)
- **Scroll reveals:** elements with `.reveal` start at `opacity:0; translateY(28px)` and transition to
  visible (`.in`) when an IntersectionObserver (threshold 0.12) sees them. Above-the-fold elements are
  revealed synchronously on mount; a 2.5s failsafe force-reveals everything so content can never get
  stuck hidden. All disabled under `[data-motion="off"]` and `prefers-reduced-motion`.
- **Magnetic buttons:** translate toward the cursor (`strength * distance`) and spring back on leave.
- **Count-up stats:** animate once when scrolled into view.
- **Typed hero role:** typewriter cycle through an array of phrases.
- **Nav:** scroll-spy active state + hide-on-scroll-down.
- **Reduced motion:** kills mesh drift, marquee, typing, count-up, parallax, and reveals — content
  shows in its final state.

## State Management
Minimal, all local component state — no global store, router, or data fetching:
- `Nav`: `active` (current section id), `hidden` (scroll direction).
- `useTyped`: typed string + internal refs (word index, char index, deleting flag).
- `CountUp`: current value + "done" ref.
- All driven by scroll/IntersectionObserver effects; nothing is fetched.

## Content / Data
All copy and lists live in **`portfolio/data.js`** as a single `window.PORTFOLIO` object
(name, roles, lede, email, stats, about, facts, marquee, skills, projects, experience, socials).
In the rebuild, move this into a typed config/JSON module and feed it as props. The current values
are realistic placeholders — swap in real bio, projects, links, and email.

## Assets
- **Fonts:** Space Grotesk + JetBrains Mono (Google Fonts).
- **Icons:** inline SVG in `parts.jsx` (no icon library).
- **Images:** none shipped — the prototype uses `<image-slot>` drop targets for the About photo and
  three project thumbnails. Supply real images and replace the slots with `<img>`.
- **Noise texture:** inline SVG data-URI (no external file).

## Open Items / TODO for production
- **Mobile nav:** links are hidden < 720px; build a hamburger/drawer menu.
- **Replace `<image-slot>`** with real `<img>` (the custom element is prototype-only — its script is
  `portfolio/image-slot.js`).
- **Real project links** (`projects[].link` are `#`) and social URLs.
- **Build step:** remove in-browser Babel; compile JSX (Vite/Next) and self-host or `next/font` the fonts.
- Consider `content-visibility`/lazy-loading project images.

## Files in this bundle
- `Portfolio.html` — entry point (font links + script order).
- `portfolio/styles.css` — the complete design system & all section styles (port this first).
- `portfolio/data.js` — all content (`window.PORTFOLIO`).
- `portfolio/parts.jsx` — icons, reveal hook, CountUp, Magnetic, Background, Cursor, Progress, Nav.
- `portfolio/sections.jsx` — Hero, About, Skills, Projects, Experience, Contact + typed-text hook.
- `portfolio/app.jsx` — App root, global reveal observer + failsafe, render.
- `portfolio/image-slot.js` — the prototype drag-drop image placeholder element (replace in prod).
