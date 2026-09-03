# Deploying Tony Tour & Travels to Netlify

The app is a TanStack Start (SSR) site, so it needs Netlify Functions — a
static-only deploy will not work.

## 1. Push the repository to GitHub and import it in Netlify

Netlify reads `netlify.toml` automatically:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 22

`vite.config.ts` detects Netlify's `NETLIFY=true` env var and builds the Nitro
`netlify` preset, which emits the SSR handler as a Netlify function and the
static client assets into `dist`.

## 2. Environment variables (Site settings → Environment variables)

Required at build and runtime:

```
VITE_SUPABASE_URL=https://pkflmymdfziwkgtwktqn.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xwzg7Fc9fBj70e1RGFNwPw_RmvFzQCn
VITE_SUPABASE_PROJECT_ID=pkflmymdfziwkgtwktqn
SUPABASE_URL=https://pkflmymdfziwkgtwktqn.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_xwzg7Fc9fBj70e1RGFNwPw_RmvFzQCn
SUPABASE_PROJECT_ID=pkflmymdfziwkgtwktqn
```

Add `SUPABASE_SERVICE_ROLE_KEY` only if you later add privileged server code.

## 3. Local production build check

```
NETLIFY=true npm run build
npx netlify deploy --prod
```

## 4. Backend

The database, auth, storage (media/video uploads) and the `/api/public/media/*`
proxy keep running against the same backend project — nothing to migrate.
Add the Netlify site URL to the auth redirect URLs so admin password resets
land on `https://<your-site>/admin`.
