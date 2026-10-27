# Dependency update 2026-10-27

- Repository: https://github.com/bischrob/cleanup_game
- Baseline Vite 6 build failed resolving vite-ssg; main.jsx also referenced a missing App.jsx.
- Upgrade Vite, React, React DOM, React Router and Framer Motion to current stable releases.
- Use React createRoot and explicit React Router routes for / and /cleanup.
- Replace undeclared react-helmet with React 19 native document metadata.
- Serve manifest and icons through Vite public assets.
- Keep dependencies and generated builds out of Git; use package-lock.json for reproducible installation.
- Resolved versions: Vite 8.3.5, @vitejs/plugin-react 6.1.2, React/React DOM 19.3.1, React Router DOM 7.18.5, Framer Motion 14.7.1.
- Validation: npm ci, npm run build, npm ls --depth=0, npm audit (zero vulnerabilities), npm outdated (empty), and git diff --check passed.
- Chromium production-preview checks passed: home/navigation, API score loading, both score increments, reset, direct /cleanup reload, public assets, document title and zero page errors. API requests were mocked; no real scores were changed.
- Live deployment is separate from this dependency update. Existing push.sh removes the target web root contents; it was not executed.
