# Discovery — Talent Market Intelligence (frontend)

Hiring systems misprice talent. Traditional ATS / keyword pipelines reward
visibility, so high-signal candidates get buried. **Discovery** ranks a pool of
candidates for a fixed *Senior AI Engineer* role and surfaces the ones the ATS
systematically undervalues — with a **Talent Mispricing Index (TMI)**,
**Conviction**, **Evidence Density**, **Fit**, **Hidden Gems** and a
**Market Efficiency** read.

This repo is the **frontend only**. It never reimplements ranking — it uploads a
candidates file to the backend engine and renders the dashboard JSON it returns.

## Architecture

```
Upload ZIP/JSONL  ─▶  POST /rank  ─▶  ranking engine  ─▶  dashboard JSON  ─▶  6 screens
"See demo"        ─▶  GET  /demo  ─▶  precomputed 100K dashboard JSON  ─────────┘
```

The only coupling between frontend and backend is the JSON contract documented in
the backend repo (`redrob-ranker/FRONTEND_CONTRACT.md`). Either side can change
independently as long as the shape holds.

## Screens (each reads only the contract fields)

1. **Insights / hero dashboard** — `market_efficiency_pct`, `mispriced_pct`, `hidden_gems`, `avg_tmi`, `highest_tmi`
2. **ATS failure (hero)** — `hero.ats_rank → hero.our_rank`, `hero.tmi`, `trust_drivers`, `concerns`
3. **Conviction cards** — `cards[]`: fit / conviction / tmi / evidence_density / quadrant + drivers/concerns
4. **The bet map** — scatter `cards[]` on `fit` (x) × `conviction` (y), bubble = `tmi`, colour = `quadrant`
5. **ATS vs us** — `ats_top10` vs `our_top10`, `stuffers_in_ats_top` vs `stuffers_in_our_top`
6. **Download** — builds the 4-column submission CSV from `cards` (`candidate_id, rank, score=fit/100, reasoning`)

## Run locally

**Prerequisites:** Node.js, and the backend API running (see the `discoverygap`
repo, `redrob-ranker/`).

```bash
npm install
cp .env.example .env.local        # then set VITE_API_BASE_URL
npm run dev                        # http://localhost:3000
```

### Configuration

| Env var | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8000` | Base URL of the FastAPI ranking engine |

- **See demo** → `GET {VITE_API_BASE_URL}/demo` (instant, precomputed 100K dashboard)
- **Upload** → `POST {VITE_API_BASE_URL}/rank?top_k=100` with multipart field `file` (`.zip` / `.jsonl` / `.jsonl.gz`)

If the API is unreachable the UI falls back to bundled mock data so the
interface still renders (useful for design previews without a backend).

### Run the backend (from the `discoverygap` repo, `redrob-ranker/`)

```bash
pip install -r requirements.txt -r scripts/api_requirements.txt
uvicorn scripts.api:app --host 0.0.0.0 --port 8000
```

CORS is open (`*`), so any frontend origin can call it.

## Build

```bash
npm run build      # outputs dist/
npm run preview    # serve the production build
npm run lint       # tsc --noEmit
```

## Stack

React 19 + TypeScript, Vite 6, Tailwind CSS v4, Framer Motion, Recharts,
lucide-react.
