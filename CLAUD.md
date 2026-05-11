# Lotus Meditation — Project Guide

Static site for a non-profit meditation club. Astro 5, deployed to GitHub Pages on a custom domain.

## Stack
- **Astro** ^5.18 (static output) with `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`
- **TypeScript** 5.9
- **Node** >= 22

## Commands
- `npm run dev` — local dev server
- `npm run build` — static build to `dist/`
- `npm run preview` — preview built site
- `npm run check` — `astro check` (type-check `.astro` files)

## Deployment
- **Target:** GitHub Pages
- **Workflow:** `.github/workflows/deploy.yml` — builds with `withastro/action@v3` on push to `main` and on manual dispatch, then deploys via `actions/deploy-pages@v4`.
- **Custom domain:** `public/CNAME` → `lotusmeditation.org` (matches `site` in `astro.config.mjs`). Any change to the domain must be updated in both places.
- `public/` assets (CNAME, favicons, fonts, placeholder images) are copied as-is to the site root.

## Site config (`astro.config.mjs`)
- `site: "https://lotusmeditation.org"` — used for sitemap/RSS absolute URLs.
- **i18n:** locales `en` (default), `fr`, `vi`. `prefixDefaultLocale: true` (so `/en/...` is canonical), `fallbackType: "rewrite"` to `en`.
- **Redirect:** `/` → `/en/`.

## Structure
- `src/pages/{en,fr,vi}/` — locale-prefixed routes (`index.astro`, `about.astro`; `en/blog/` for posts).
- `src/pages/404.astro`, `src/pages/rss.xml.js`.
- `src/content/blog/` — content collection (md/mdx) with schema in `src/content.config.ts` (`title`, `description`, `pubDate`, optional `updatedDate`, `heroImage`).
- `src/layouts/BlogPost.astro`, `src/components/` (BaseHead, Header, Footer, HeaderLink, FormattedDate).
- `src/consts.ts` — `SITE_TITLE`, `SITE_DESCRIPTION`.
- `src/assets/`, `src/styles/`.

## Notes
- `wrangler.json`, `worker-configuration.d.ts`, and `Cloudflare.md` are present from an earlier Cloudflare Pages/Workers setup but are **not** used by the current GitHub Pages workflow.
- Theme is based on Bear Blog (see README).
- When adding a new locale: register it in `astro.config.mjs` `locales`/`fallback` and create the matching `src/pages/<lang>/` directory.
- When adding a blog post: drop a `.md`/`.mdx` file under `src/content/blog/` with the required frontmatter; the blog index lives at `src/pages/en/blog/`.
