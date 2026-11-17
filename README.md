# Root to tip · Van wortel tot top

Bilingual (NL/EN) guide to which parts of fruit, vegetables and herbs you can eat, and how.
A static, installable web app (PWA) that works offline.

- `index.html` – the whole app (data + UI)
- `sw.js` – service worker; **bump `VERSION` whenever you change any file** so installed copies update
- `manifest.webmanifest`, `icons/` – install metadata
- `fonts/` – self-hosted Bricolage Grotesque and Atkinson Hyperlegible (SIL Open Font License), so no requests go to Google

Deploys to Netlify as-is (no build step); see `netlify.toml`.
