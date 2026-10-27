# Cleanup Game

Use Node.js 24 (`nvm use`) or a version matching `package.json` engines.

```sh
npm ci
npm run dev
```

Build and check the production app with `npm run build` and `npm run preview`.
The home page is `/`, and the game is `/cleanup`. The production web server must
serve `index.html` for client routes such as `/cleanup`.

Vite copies `public/` into the build, including the manifest and icons. Dependencies
and `dist/` are generated locally and are not committed. Run `npm audit` and
`npm outdated` to check dependency status.
