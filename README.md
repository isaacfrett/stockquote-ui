# stockquote-ui — Stock Quote Front-end (React)

This repository contains the front-end UI for the StockQuote application. It's a small React single-page app that provides user authentication and simple stock-quote viewing features (dashboard, live quote lookup, signup/login flows).

Key behaviors (contract):
- Inputs: user credentials (signup/login), ticker symbols for quote lookup
- Outputs: authenticated user session, dashboard with saved quotes, live quote details
- Error modes: validation errors on auth forms, network/API errors when fetching quotes

What you'll find here
- Auth pages: `Login`, `Signup`, session is managed via `AuthContext`.
- Dashboard: a landing page after login showing saved or recent symbols.
- Stock Quote: lookup page showing current quote data for a ticker symbol.

Tech stack
- React (Create React App starter)
- Context API for auth state
- CSS modules / simple stylesheet per component (see `src/pages` and `src/components`)

Quick start (local)
1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm start
```

Open http://localhost:3000. The app will reload on changes.

Helpful scripts
- `npm start` — start dev server
- `npm test` — run tests (watch mode)
- `npm run build` — create production build in `build/`

Project layout (important files)
- `src/index.js` — app entry
- `src/App.js` — top-level routing and layout
- `src/context/AuthContext.js` — auth state provider
- `src/pages/` — `Dashboard.js`, `Login.js`, `Signup.js`, `StockQuote.js`
- `src/components/Navigation.js` — top navigation

Environment / configuration
- No special environment variables are required to run the UI in dev mode. If the UI needs to point to a backend API, configure the API base URL in the environment (e.g. `.env` using `REACT_APP_API_URL`).
