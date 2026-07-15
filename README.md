# Redial & Guardrails

<img width="700" height="500" alt="image" src="https://github.com/user-attachments/assets/c8dfc83d-d0e2-40c8-b775-c7037f4a348d" />

A small Next.js app for configuring a calling campaign's **redial** and **guardrail**
settings and seeing a live **campaign score** as you adjust them.

## How it works

You set four inputs:

- **Calling days** — which days of the week calls go out (at least one).
- **Calling window** — the daily start/end hours (minimum 3-hour window).
- **Redial count** — how many times to retry a contact (0–10).
- **Redial interval** — the gap between redials (3/6/9/12/24 hours).

Each input carries a penalty relative to its optimal value. The score starts at
100 and penalties are subtracted (floored at 0). The resulting score maps to one
of four "weather" levels shown as an illustration.

The scoring model lives in [`src/lib/scoring/`](src/lib/scoring/) as a pure,
framework-agnostic module:

- `types.ts` — the input/output contract.
- `data.ts` — the penalty tables and optimal defaults.
- `index.ts` — `scoreGuardrails(state)`, the pure scoring function.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
