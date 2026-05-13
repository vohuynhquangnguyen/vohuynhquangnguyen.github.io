# Lucius Vo — Personal Site

A Jekyll site combining the [AcademicPages](https://github.com/academicpages/academicpages.github.io) template with a custom Neoclassical theme inspired by Jacques-Louis David and Jean-Baptiste-Siméon Chardin. Lives at <https://vohuynhquangnguyen.github.io>.

This README is a **practical editing guide** for the homepage, the CV page, and the Neoclassical theme. The legacy AcademicPages pages (`/publications/`, `/talks/`, `/teaching/`, `/portfolio/`, blog posts) keep the original Minimal Mistakes look — see the [upstream docs](https://academicpages.github.io/) for those.

---

## Table of contents

1. [Repository map](#repository-map)
2. [Quick reference: where things live](#quick-reference-where-things-live)
3. [Editing the homepage](#editing-the-homepage)
   - [Hero (greeting, title, subtitle, painting credit)](#hero-greeting-title-subtitle-painting-credit)
   - [Prologue (LECTORI SALUTEM)](#prologue-lectori-salutem)
   - [Journey timeline](#journey-timeline)
   - [Research vision](#research-vision)
   - [Selected works](#selected-works)
   - [Connect / footer](#connect--footer)
4. [Editing the CV page](#editing-the-cv-page)
5. [Publications](#publications)
6. [Visual tweaks](#visual-tweaks)
   - [Swap the hero painting](#swap-the-hero-painting)
   - [Change colors](#change-colors)
   - [Change font sizes](#change-font-sizes)
   - [Change the hero blur / darkness](#change-the-hero-blur--darkness)
   - [The two specificity gotchas](#the-two-specificity-gotchas)
7. [Local preview & deployment](#local-preview--deployment)
8. [Past edits — quick recipe log](#past-edits--quick-recipe-log)
9. [Credits](#credits)

---

## Repository map

The Neoclassical theme is **scoped under the `.neoclassical` body class** so it only affects the homepage, CV, and publications. Every other page renders with the original Minimal Mistakes theme.

```
_pages/
  about.md                     ← homepage content (front matter is structured)
  cv.md                        ← CV page (markdown body + theme front matter)
  publications.md              ← publications list page (thin front-matter only)
  talks.html, teaching.html, portfolio.html, ...

_publications/                 ← collection of individual paper markdown files
  YYYY-MM-DD-slug.md           ← one file per publication (title, venue, date, etc.)

_layouts/
  neoclassical-home.html         ← homepage (hero, prologue, journey, vision, works, connect)
  neoclassical-page.html         ← CV / styled content-page layout
  neoclassical-publications.html ← publications LIST page (year-grouped)
  neoclassical-publication.html  ← individual publication DETAIL page
  default.html, single.html, splash.html, ...   ← upstream layouts (unchanged)

_sass/
  _neoclassical.scss           ← all theme styles, scoped under .neoclassical
  _base.scss, _page.scss, _archive.scss, ...    ← upstream SCSS (unchanged)

assets/
  css/main.scss                ← Jekyll SCSS entry (imports _neoclassical.scss at the bottom)
  js/neoclassical.js           ← hero stagger, scroll reveals, parallax, sticky nav, progress bar
  js/main.min.js, ...          ← upstream JS

_includes/
  head/custom.html             ← Google Fonts (Cormorant + EB Garamond + Inter) added here
  head.html                    ← contains the cache-buster ?v={{ site.time }} on main.css
  ...

images/neoclassical/
  attributes-of-the-arts.jpg   ← current hero painting (Chardin, 1766)
  death-of-socrates.jpg        ← unused; previous hero
  oath-of-the-horatii.jpg      ← used as faint background in CV hero + research vision
  napoleon-crossing-the-alps.jpg  ← unused but available
```

---

## Quick reference: where things live

| You want to change... | File | Notes |
| --- | --- | --- |
| Hero greeting / title / subtitle | `_pages/about.md` | `hero:` block in front matter |
| Hero painting credit (caption bottom-right) | `_layouts/neoclassical-home.html` | inside `<span class="nc-hero__caption">` |
| Prologue body prose | `_pages/about.md` | `prologue:` field |
| "LECTORI SALUTEM" label | `_layouts/neoclassical-home.html` | inside `<span class="nc-prologue__salute">` |
| Sign-off "— L. V., Stillwater, MMXXVI" | `_layouts/neoclassical-home.html` | inside `<span class="nc-prologue__sign">` |
| Journey timeline (Vietnam → Argonne) | `_pages/about.md` | `journey:` list of stops |
| Research vision prose / triad nodes | `_layouts/neoclassical-home.html` | sections labeled "VISION" / "Act II" |
| Number of "Selected works" cards | `_layouts/neoclassical-home.html` | `limit: 4` in the `for pub in sorted_pubs` loop |
| Connect section copy / contact links | `_layouts/neoclassical-home.html` | section with `id="connect"` |
| CV body | `_pages/cv.md` | plain markdown |
| CV hero eyebrow + lede | `_pages/cv.md` | front matter |
| Publications list page hero (title, eyebrow, lede) | `_pages/publications.md` | front matter only |
| Add / edit a publication entry | `_publications/YYYY-MM-DD-slug.md` | one file per paper; see [Publications](#publications) |
| Publication detail page layout / sections | `_layouts/neoclassical-publication.html` | hero, citation, body, "Read the paper" CTA |
| Publications list layout / year grouping | `_layouts/neoclassical-publications.html` | groups by `pub.date | date: '%Y'` |
| Hero painting *image file* | `images/neoclassical/` + `_sass/_neoclassical.scss` line ~235 |
| Theme colors | `_sass/_neoclassical.scss` | top of file (`--nc-ivory`, `--nc-crimson`, ...) |
| Font sizes | `_sass/_neoclassical.scss` | per-component blocks |
| Top-nav links | `_layouts/neoclassical-home.html` and `_layouts/neoclassical-page.html` | `<ul id="nc-primary-nav">` |
| Site title, author bio, social links | `_config.yml` | `title:`, `author:` block |
| Legacy nav (Publications, Talks, etc.) | `_data/navigation.yml` | shown on non-Neoclassical pages |

---

## Editing the homepage

The homepage source is `_pages/about.md`. Most content lives in **YAML front matter** — the structured key-value block between `---` lines at the top — not in the markdown body. The layout `_layouts/neoclassical-home.html` reads those keys and renders them.

### Hero (greeting, title, subtitle, painting credit)

**Greeting / Title / Subtitle** → edit `_pages/about.md`:

```yaml
hero:
  greeting: "Salvete — Welcome"
  title: "Between marble and silicon."
  subtitle: "I'm Lucius Vo — a Ph.D. candidate at Oklahoma State University working at the seam where neuromorphic hardware, in-memory computing, and machine learning meet."
```

Notes:
- Wrap each value in double quotes if it contains a colon, em-dash, or apostrophe.
- The title supports `<em>...</em>` if you want a word in italic ochre — e.g. `title: "Between <em>marble</em> and silicon."` (already inside an italic display face, so this is for accent color rather than slant).
- Multi-line subtitle: switch to YAML block syntax:
  ```yaml
  subtitle: >-
    I'm Lucius Vo — a Ph.D. candidate at Oklahoma State University
    working at the seam where neuromorphic hardware, in-memory
    computing, and machine learning meet.
  ```

**Painting credit** (bottom-right caption) → edit `_layouts/neoclassical-home.html`, the line containing `nc-hero__caption`:

```html
<span class="nc-hero__caption">Jean-Baptiste-Siméon Chardin — <em>The Attributes of the Arts</em>, 1766</span>
```

### Prologue (LECTORI SALUTEM)

Three pieces, two files:

```
┌────────────────────────────────────────────────────┐
│  ── LECTORI SALUTEM — TO THE READER ──             │  ← _layouts/neoclassical-home.html  line 56
│                                                    │
│  I  grew up in Vietnam, …                          │  ← _pages/about.md  prologue: field  (drop-cap "I" is automatic; body is justified)
│                                                    │
│           — L. V., STILLWATER, MMXXVI              │  ← _layouts/neoclassical-home.html  line 58
└────────────────────────────────────────────────────┘
```

The drop-cap "I" is generated by CSS (`::first-letter`) — you don't write it. Whatever the prologue starts with becomes the drop-cap.

The salute follows the same pattern as the hero greeting: `LATIN — ENGLISH TRANSLATION` framed by horizontal lines. The flanking lines are CSS `::before`/`::after` pseudo-elements on `.nc-prologue__salute`, so you only edit the text content. If you change the language, keep the em-dash (`—`, not `-`) between the two halves so the typography stays consistent.

To edit the **body**, open `_pages/about.md` and change the `prologue:` value. Keep it on one line, or use YAML block syntax (`prologue: |`) for multi-paragraph prose. The body is rendered with `text-align: justify` + `hyphens: auto` and a centered last line — write a paragraph long enough that several lines wrap, otherwise justification looks lopsided. The current prose is ~75 words; that fills 4–5 lines on desktop.

To edit the **salute** ("LECTORI SALUTEM — TO THE READER") or **sign-off**, edit those two `<span>` tags in `_layouts/neoclassical-home.html`.

### Journey timeline

The six stops (Vietnam → Helsinki → Espoo → Saigon → Stillwater → Lemont) live in the `journey:` list in `_pages/about.md`. Each stop is a YAML object with four fields:

```yaml
journey:
  - year: "2014 — 2018 · Helsinki, Finland"
    place: "Metropolia University of Applied Sciences"
    role: "B.Tech., Electrical & Electronics Engineering"
    body: "My first real engineering apprenticeship. ..."
```

**Add a stop**: copy a `- year:` block, paste it at the right point in the chronology, edit the four fields. The layout alternates left/right automatically, so the visual pattern adapts to any number of items.

**Remove a stop**: delete its full `- year: ...` block (the dash and all four fields).

**Re-order**: the timeline renders in the order they appear in the YAML file. Move the blocks up/down to re-sequence.

### Research vision

The "Teaching matter to think" section copy is hardcoded in `_layouts/neoclassical-home.html` under the comment `============== VISION ==============`. The animated SVG triad (RRAM / Analog / Optimization) is also there — node labels are inside `<text>` elements. Edit directly.

### Selected works

This section auto-pulls the most recent four entries from `_publications/` (sorted by `date` descending). To add or update a publication, create or edit a markdown file in `_publications/` — see the existing files for the format.

To change the **count**, edit `_layouts/neoclassical-home.html`:

```liquid
{% for pub in sorted_pubs limit: 4 %}
```

Change `limit: 4` to e.g. `limit: 6`.

### Connect / footer

The "Stay in correspondence" section is at the bottom of `_layouts/neoclassical-home.html` under `============== CONNECT ==============`. Contact links are pulled from `_config.yml`'s `author:` block:

```yaml
author:
  email:        "lucius.vo@okstate.edu"
  github:       "vohuynhquangnguyen"
  linkedin:     "linkedin.com/in/quangnguyen-vohuynh"
  googlescholar: "https://scholar.google.com/citations?user=..."
```

To add another link (e.g. ORCID, Mastodon), edit both `_config.yml` (add the value) and the `<ul class="nc-links">` in the layout (add the `<li>`).

The footer at the very bottom is also in the same layout — small custom text under `<footer class="nc-footer">`.

---

## Editing the CV page

The CV is plain markdown in `_pages/cv.md`, plus three theme-specific front-matter fields:

```yaml
---
layout: neoclassical-page
title: "Curriculum Vitae"
eyebrow: "Lucius Vo · Vita"          ← small caps eyebrow above the title
lede: "A record of training, ..."     ← italic lede paragraph below the title
permalink: /cv/
---

## Personal Statement
...
```

Edit the markdown body normally. The theme styles `h2`, `h3`, `ul`, `blockquote`, etc. The PDF copy of the CV lives at `files/miscs/LuciusVo_CV.pdf` — replace that file to update the downloadable PDF.

---

## Publications

Two views, both Neoclassical-themed:

- **List page** at `/publications/` — year-grouped index, accessed from the "Read recent work →" link on the homepage's Act II and from the top nav.
- **Detail page** at `/publication/<slug>/` — one per paper, with the full abstract and any extra content.

### Adding a new publication

Create a new markdown file in `_publications/`. Naming convention: `YYYY-MM-DD-slug.md`. Front-matter shape:

```yaml
---
title: "Full title of the paper, plain quoted"
collection: publications
permalink: /publication/YYYY-MM-DD-slug
date: '2026-02-24'              ← used for chronological sort and year grouping
venue: 'SIAM PP26'              ← short venue name; shown as the small-caps tag on the list page
excerpt: 'One-sentence abstract that appears under the title on the list page.'
citation: 'Authors. (Year). Title. Venue.'      ← full citation, shown as the pull-quote on the detail page
paperurl: 'https://...'                          ← optional link to PDF / arXiv / proceedings
---

# Abstract
Your abstract here. Use `# Heading` (h1) for section titles — the detail
layout styles `nc-doc--publication h1` with a crimson rule and ivory
top-border to match the CV's section dividers.

# Contents
- [SIAM Proceedings](https://...)
- [arXiv](https://...)
```

The detail page automatically renders:
1. A small "← All publications" back-link
2. The venue tag (eyebrow style)
3. The title (large italic display)
4. The publication date
5. The citation as an ochre-bordered pull-quote
6. Your markdown body
7. A "Read the paper →" outlined button if `paperurl` is set

### Why `# Heading` instead of `## Heading`

CV uses `## Heading` (h2) because its layout (`neoclassical-page`) styles `.nc-doc h2`. Publications use `# Heading` (h1) because the existing `_publications/*.md` files were authored that way; the publication detail layout styles `.nc-doc--publication h1` with the same look. If you start a new tradition with `##`, the styling won't apply unless you also add a `.nc-doc--publication h2` rule (or just stick with `#`).

### Editing the list page hero

The list page itself has almost no body — only front-matter:

```yaml
---
layout: neoclassical-publications
title: "Publications"
eyebrow: "Lucius Vo · Library"
lede: "An archive of papers, preprints, and book chapters — ..."
permalink: /publications/
---
```

The year-grouped index is generated by the layout from `site.publications`.

### Changing the layout default for new publications

`_config.yml` defaults set `layout: neoclassical-publication` for all files under `_publications/`. If you ever want a single publication to fall back to the old `single` layout, override `layout:` in its front matter.

---

## Visual tweaks

### Swap the hero painting

Three files to touch:

1. **Add the image** to `images/neoclassical/yourpainting.jpg`. Keep file size under ~1 MB ideally. Use Wikimedia Commons or another public-domain source.
   ```powershell
   # Example — download a Wikimedia Commons painting:
   $url = 'https://commons.wikimedia.org/wiki/Special:FilePath/<FILENAME>?width=1920'
   Invoke-WebRequest -Uri $url -OutFile images/neoclassical/yourpainting.jpg `
     -Headers @{ 'User-Agent' = 'YourName/1.0 (your-email)' }
   ```

2. **Update the SCSS path** in `_sass/_neoclassical.scss` (around line 235):
   ```scss
   .nc-hero__bg {
     background-image: url("../../images/neoclassical/yourpainting.jpg");
     background-position: center 35%;   /* tweak vertical focus */
   }
   ```

3. **Update the credit caption** in `_layouts/neoclassical-home.html`:
   ```html
   <span class="nc-hero__caption">Artist Name — <em>Painting Title</em>, Year</span>
   ```

The CSS hard-refresh problem is solved by the cache-buster in `_includes/head.html`:
```html
<link rel="stylesheet" href="{{ base_path }}/assets/css/main.css?v={{ site.time | date: '%s' }}">
```
Each Jekyll rebuild gets a unique URL, so browsers fetch fresh CSS automatically.

### Change colors

All theme colors are CSS custom properties at the top of `_sass/_neoclassical.scss`:

```scss
.neoclassical {
  --nc-ivory:        #f4ebd9;   /* parchment background */
  --nc-ivory-soft:   #ebe1cb;   /* secondary backgrounds */
  --nc-marble:       #d8cdb8;   /* dividers, muted */
  --nc-crimson:      #8b1e3f;   /* primary accent (links, eyebrows) */
  --nc-crimson-deep: #5a0f2a;   /* hover state */
  --nc-ochre:        #c19a4f;   /* secondary accent (gold) */
  --nc-ochre-deep:   #8b6f3a;
  --nc-ink:          #1a1612;   /* body text — warm dark brown, not black */
  --nc-ink-soft:     #4a3f30;   /* secondary text */
  ...
}
```

Change a value here and it propagates everywhere the variable is used.

### Change font sizes

Per-component blocks in `_sass/_neoclassical.scss`. The hero block in particular uses `clamp(min, fluid, max)` so type scales with viewport width:

```scss
.nc-hero__title {
  font-size: clamp(3.2rem, 8.5vw, 6.8rem);  /* phone → desktop */
}
.nc-hero__greeting { font-size: 1rem; }
.nc-hero__subtitle { font-size: clamp(1.25rem, 2vw, 1.6rem); }
```

Body type uses fixed sizes — search for `.nc-stop__body`, `.nc-card__excerpt`, `.nc-doc`, etc.

### Change the hero blur / darkness

Two layers control the hero feel:

1. **`.nc-hero__bg`** — the painting itself. Adjust the `filter` and `transform` properties:
   ```scss
   .nc-hero__bg {
     filter: saturate(0.8) contrast(1.05) brightness(0.55) blur(3px);
     transform: scale(1.10);   /* should exceed 1 + (blur*2 / image-width) to hide soft edges */
   }
   ```
   - Lower `brightness()` → darker painting
   - Higher `blur()` → softer painting (always raise `scale` proportionally)
   - Remove `blur()` entirely for a sharp painting

2. **`.nc-hero__veil`** — the dark gradient over the painting. Three stacked gradients:
   - Left-to-right (heavier on the left where the text sits)
   - Top-to-bottom (transitions to ivory at the very bottom)
   - A radial soft-vignette
   Edit the rgba alpha values to make the veil heavier or lighter.

### The two specificity gotchas

When changing colors on hero or vision elements, you may find your color doesn't apply. This is because of two upstream-style rules in `_sass/_neoclassical.scss`:

- `.neoclassical h1, h2, h3, h4, h5 { ... }` — specificity (0,1,1) — beats any single-class rule on a heading.
- `.neoclassical a { color: var(--nc-crimson); ... }` — specificity (0,1,1) — beats any single-class rule on a link.

If you set e.g. `.nc-hero__title { color: white }` and it doesn't take, **scope it under `.neoclassical`** so specificity becomes (0,2,0):

```scss
.neoclassical .nc-hero__title { color: white; }   /* now wins */
```

This is why the title and "BEGIN READING" rules in the SCSS are written `.neoclassical .nc-something`.

---

## Local preview & deployment

### Run locally (optional)

You'll need Ruby 2.7+ and Bundler.

```bash
bundle install
bundle exec jekyll serve
# → http://localhost:4000
```

The dev server auto-reloads on file changes. If a SCSS partial under `_sass/` doesn't appear to update, restart Jekyll — it occasionally misses new imports.

### Deploy

Push to `main`. GitHub Pages rebuilds automatically (~1–2 minutes) and serves from <https://vohuynhquangnguyen.github.io>. The build status is visible at:

```
https://github.com/vohuynhquangnguyen/vohuynhquangnguyen.github.io/actions
```

For small content edits (typo fixes, prologue tweaks, journey updates) it is fine to commit directly to `main`. For visual changes, use a feature branch + PR so you can preview before merging.

---

## Past edits — quick recipe log

A condensed log of the design decisions made during the initial build. Each row is a real ask answered with a real change — useful as a model for future tweaks.

| Inquiry | What changed | File(s) |
| --- | --- | --- |
| "I want the words to be highly contrast compared to the background." | Removed redundant `color: var(--nc-ink)` from `.neoclassical h*` (it was beating per-component overrides at specificity 0,1,1). Bumped title and subtitle to brighter cream with multi-layer text-shadows. Darkened the hero veil so text sits on darker imagery. | `_sass/_neoclassical.scss` |
| "Can you use the white color [for the title]?" | Title color → `#ffffff`. The `<em>` accent stays ochre. | `_sass/_neoclassical.scss` (`.nc-hero__title`) |
| "I cannot hard-refresh." | Added cache-buster to the CSS link: `main.css?v={{ site.time \| date: '%s' }}`. Each Jekyll rebuild now serves fresh CSS automatically — no hard-refresh required. | `_includes/head.html` |
| "Can you replace [Death of Socrates] with this art piece?" (Chardin's *Attributes of the Arts*) | Downloaded the new painting from Wikimedia Commons, updated `background-image` URL, lifted brightness from 0.62 → 0.7, shifted focal point to `center 35%`, updated caption attribution. | `images/neoclassical/`, `_sass/_neoclassical.scss`, `_layouts/neoclassical-home.html` |
| "Can you increase the font size for [hero title, salute, subtitle]?" | Title `clamp(2.6rem, 7vw, 5.5rem)` → `clamp(3.2rem, 8.5vw, 6.8rem)`. Greeting `0.85rem` → `1rem` with wider rules. Subtitle `clamp(1.05rem, 1.6vw, 1.35rem)` → `clamp(1.25rem, 2vw, 1.6rem)`. | `_sass/_neoclassical.scss` |
| "Begin Reading still need more contrast. Can we blur the background more?" | Added `filter: blur(3px)` and lowered brightness on `.nc-hero__bg`, counter-scaled to 1.10 to hide blur edges. Strengthened the veil's left-side and bottom darkening. Fixed `.nc-hero__scroll` color regression by scoping under `.neoclassical` (same specificity gotcha as the title). | `_sass/_neoclassical.scss` |
| "Where can I change the contents of [the prologue]?" | Body in `_pages/about.md` (`prologue:` field). Salute label and sign-off in `_layouts/neoclassical-home.html` (`nc-prologue__salute`, `nc-prologue__sign`). | (see [Prologue](#prologue-lectori-salutem)) |
| "Increase salute font size and include English translation; justify the body prose; expand it for visual balance." | Salute → `1rem` (was `0.82rem`), letter-spacing tightened slightly, added flanking crimson lines via `::before`/`::after` to match the hero greeting pattern. Salute text expanded to `Lectori Salutem — To the Reader`. Body now `text-align: justify` with `hyphens: auto` and centered last line. Prose rewritten: "researcher in three places I never expected" → "researcher in the US", and expanded by ~20 words across three rhythmic clauses (metrology / manufacturing / open questions) for better visual fill. | `_sass/_neoclassical.scss`, `_layouts/neoclassical-home.html`, `_pages/about.md` |
| "The 'Read recent work' link goes to the old publications site. Adopt the Neoclassical style." | Built `neoclassical-publications.html` (year-grouped list view) and `neoclassical-publication.html` (per-paper detail view with back-link, venue eyebrow, italic title, citation pull-quote, "Read the paper →" button). Added a `.nc-pub-*` SCSS block with title hover underline, year rule headers, ochre tag chips. Switched `_pages/publications.md` to the new list layout (front-matter only) and set the `publications` collection default in `_config.yml` to `layout: neoclassical-publication`. Documented the `# Heading` vs `## Heading` quirk because publication body markdown uses `# Abstract` / `# Contents`. | `_layouts/neoclassical-publications.html`, `_layouts/neoclassical-publication.html`, `_sass/_neoclassical.scss`, `_pages/publications.md`, `_config.yml` |

---

## Credits

- **AcademicPages** — Stuart Geiger's [academicpages.github.io](https://github.com/academicpages/academicpages.github.io), forked and detached from Michael Rose's [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) (MIT).
- **Hero painting** — Jean-Baptiste-Siméon Chardin, *The Attributes of the Arts and the Rewards Which Are Accorded Them* (1766), Minneapolis Institute of Art. Public domain via [Wikimedia Commons](https://commons.wikimedia.org/).
- **Section paintings** — Jacques-Louis David, *The Death of Socrates* (1787), *Oath of the Horatii* (1784), *Napoleon Crossing the Alps* (1801). All public domain via Wikimedia Commons.
- **Typography** — Cormorant Garamond, Cormorant SC, EB Garamond, and Inter, served by Google Fonts.
