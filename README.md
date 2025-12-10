# Heat Shock Pineapple — Portfolio

This repo powers **https://portfolio.heatshockpineapple.com** — a focused portfolio for:

- **Science** – assay development, biochemistry, screening  
- **Code** – analysis, visualization, workflows  


The main site lives at **https://heatshockpineapple.com**.  
This repo is specifically for the **`portfolio.` subdomain**.

---

## Tech Stack

- **Framework:** Astro (v4)
- **Styling:**
  - Shared tokens + base theme via `@heatshockpineapple/design-tokens`
  - Site-specific layout/components in `src/styles/global.css`
- **Deployment:** GitHub Pages via GitHub Actions
- **Extras:**
  - `plotly.js-dist-min` for interactive plots
  - `ngl` for structure / protein viewer
  - `exif-parser` for photo metadata

---

## Local Development

### Prereqs

- Node.js 20.x
- npm

### Install

    npm install

### Run dev server

    npm run dev

Astro will print a local URL (usually `http://localhost:4321`).

### Build for production

    npm run build

This runs `astro check` and `astro build`. Output goes into `dist/`.

---

## Project Structure (high-level)

    src/
      components/
        Header.astro
        Footer.astro
        MicroscopeBackground.astro
      layouts/
        BaseLayout.astro      # SEO, social tags, global <head>, theme bootstrapping
      pages/
        index.astro           # Landing page
        ...                   # Other portfolio pages

      styles/
        global.css            # Site-specific layout & component styles

    public/
      CNAME                   # portfolio.heatshockpineapple.com
      sitemap.xml
      robots.txt
      social-preview.png      # Social card image
      favicon / icons / manifest

The **global theme** (colors, typography, tokens) lives in a separate design-tokens package, not in this repo.

---

## Design System: Pineapple Tokens

This repo consumes a shared design system:

    // package.json (dependencies section)
    "@heatshockpineapple/design-tokens": "github:jarohe318/pineapple-design-tokens"

At the top of `src/styles/global.css`:

    @import "@heatshockpineapple/design-tokens/src/theme-base.css";

That import provides:

- CSS variables (paper, ink, accents, borders, radii, etc.)
- Base typography + ambient background
- Light/dark theme via `data-theme` on `<html>`

This repo then adds its own layout and components on top (header, hero, cards, photo grid, footer, GFP glow styles, etc.).

Any future site (main domain, experiments, microsites) can reuse the same theme by:

1. Adding the dependency.
2. Importing `theme-base.css`.
3. Defining local styles.

---

## Theming & Dark Mode

Dark mode is controlled by `data-theme` on `<html>`:

- Initial theme is chosen using:
  - `localStorage.getItem('theme')`, or  
  - `prefers-color-scheme: dark` as a fallback
- Toggled via the `.theme-toggle` button in the header.

The shared tokens define both light and dark values.  
This repo adds extra dark-mode styling, for example:

- “GFP mode” glow on:
  - `.protein-container`
  - `.chart-container`
  - `.heatmap-header`
- Neon-style `.tag` in dark mode
- Animated glow on `#loading-text` for the 3D viewer

These class-level styles live in `src/styles/global.css`; the underlying colors come from the tokens package.

---

## SEO, Sitemap, and Social Cards

Canonical domain for this repo is set in `astro.config.mjs`:

    import { defineConfig } from 'astro/config';

    export default defineConfig({
      site: 'https://portfolio.heatshockpineapple.com',
      // other config...
    });

`Astro.site` is then used in `BaseLayout.astro` to construct:

- `<link rel="canonical" href="...">`
- `<meta property="og:url" ...>`
- `<meta property="og:image" ...>`
- `<meta name="twitter:image" ...>`

Defaults in `BaseLayout.astro`:

- `image` defaults to `/social-preview.png`
- `canonicalURL` is derived from `Astro.url` + `Astro.site`

Static files:

- `public/sitemap.xml` – lists URLs under `https://portfolio.heatshockpineapple.com`
- `public/robots.txt` – points at this sitemap:

      Sitemap: https://portfolio.heatshockpineapple.com/sitemap.xml

- `public/social-preview.png` – image used for Open Graph / Twitter cards

The **root domain** (`https://heatshockpineapple.com`) is handled by a different repo with its own SEO config and sitemap.

---

## Deployment

Deployment is handled via GitHub Actions → GitHub Pages.

- Branch: `main`
- Pages source: GitHub Actions
- Custom domain: `portfolio.heatshockpineapple.com`
- DNS: `CNAME portfolio.heatshockpineapple.com → jarohe318.github.io`

Typical workflow:

1. Edit code.
2. Run `npm run dev` to test locally.
3. Commit + push to `main`.
4. GitHub Actions builds and deploys.
5. Changes show up at `https://portfolio.heatshockpineapple.com`.

---

## License / Usage

This is a personal portfolio project.  
License/usage terms are not formally specified yet.