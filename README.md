# Cleanup Game

Use Node.js 24 (`nvm use`) or a version matching `package.json` engines.

```sh
npm ci
npm run dev
```

Build and check the production app with `npm run build` and `npm run preview`.
The production app is served under `/cleanup/`. Vite uses this base for assets.
The game uses the existing same-origin `/api/week` and `/api/scores` ledger endpoints;
loading the page never writes scores. The production web server must serve the
build index for `/cleanup/`.

Vite copies `public/` into the build, including the manifest and icons. Dependencies
and `dist/` are generated locally and are not committed. Run `npm audit` and
`npm outdated` to check dependency status.
