# CareerFit AI

*Discover the career that fits you.*

React + TypeScript + Tailwind CSS (Vite) career-guidance app: 18-question quiz, calculated career matches, 24 careers, explorer, comparison charts, AI advisor and dashboard.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

- `src/data.ts`: quiz questions, 24 careers, matching algorithm (`score`, `rank`, `prof`)
- `src/App.tsx`: pages and components (Home, Quiz, Results, Details, Explorer, Compare, Advisor, Dashboard)
- `src/index.css`: Tailwind + animations

## How matching works

Each answer (0-3) maps to one of six skills. A career's skill needs are compared with your profile; shortfalls are penalised more than surpluses.

## Advisor note

The hosted version uses Claude for the advisor. This project has no API wired in, so the advisor runs in keyword mode. To make it AI-powered, call an LLM API from a backend and replace the `ai.json(...)` call in `Advisor` (`src/App.tsx`).

## Limits

Career skill profiles are hand-estimated, not validated data. Progress is stored in `localStorage` only.
