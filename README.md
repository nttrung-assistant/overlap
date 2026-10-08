# Overlap — a timezone meeting planner

Find the hour that works for everyone. Enter the cities your participants are
in, set each person's awake hours, and read the heatmap: green cells are inside
everyone's window, the outlined rows are hours that work for all.

**Live demo → https://overlap.nttrung-assistant.workers.dev**

## Why it's different

- **Shareable links** — the whole plan (cities, awake hours, reference zone)
  lives in the URL. Copy the link, send it, done. No accounts, no database.
- **Reference zone picker** — view the grid in *your* day; every cell shows
  each participant's local clock at that hour.
- **Half-hour zones handled** — India, Iran, parts of Australia: cells show the
  hour, hover for exact minutes.
- **No tracking, no external requests** — one page, all inline, works offline
  once loaded. Nothing leaves your browser.

## Features

- 55+ cities curated across every timezone; dark & light themes (follows
  system, `T` toggles).
- Awake-hours window (default 09:00–18:00 local) with an "early/late but
  awake" band of ±2h.
- "Now" row is marked; grid refreshes every minute.
- Verdict line summarizes the winning hours in the reference zone.
- Settings persist in `localStorage`; links always win over saved state.

## Stack

- Cloudflare Worker (`src/index.js`) — serves the app at `/`, health at
  `/healthz`, JSON 404s elsewhere.
- `src/page.js` — the entire UI as one inline HTML string: no build step, no
  bundler, no external requests.
- Tests: Node's built-in runner (`node --test`) exercising the Worker's fetch
  handler.

## Run it

```sh
npm install
npm test          # run the tests
npm run dev       # local dev server at http://localhost:8787
npm run deploy    # deploy with wrangler
```

## Project layout

```
src/index.js         Worker entry: routing, security headers
src/page.js          The whole app as one HTML string
test/worker.test.js  Fetch-handler tests (node --test)
wrangler.toml        Worker config (name, entry point)
```

## License

MIT — share the hour that works.
