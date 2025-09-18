This repo demonstrates Next.js 14 + NextAuth.js (Auth0) with JWT sessions, middleware protection, and RBAC.

## Getting Started

1) Copy envs

```bash
cp .env.local.example .env.local
# Fill AUTH0_*, NEXTAUTH_SECRET
```

2) Dev

```bash
npm run dev
```

## Auth0 setup

- Application Type: Regular Web App
- Allowed Callback URLs: `http://localhost:3000/api/auth/callback/auth0`
- Allowed Logout URLs: `http://localhost:3000/`
- Allowed Web Origins: `http://localhost:3000`
- Domain -> `AUTH0_ISSUER` as `https://YOUR_TENANT_REGION.auth0.com/`

## RBAC

- Add `roles` to the ID token via Actions/Rules or a namespaced claim `AUTH0_ROLES_NAMESPACE`.
- `/admin` requires `admin` role; others can access `/dashboard`.

## Stage 2: E‑Commerce (TR/EN, ISR, SEO)

Routes

- Home (featured): `/{locale}` -> `/tr`, `/en`
- Products: `/{locale}/products`
- Product detail: `/{locale}/products/{id}`
- Cart: `/{locale}/cart`

Tech

- next-intl for i18n, Redux Toolkit for cart, ISR for data fetching, next/image for perf, Tailwind for UI.

Deploy (Vercel)

- Set envs on Vercel: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `AUTH0_ISSUER`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`
- Import GitHub repo and Deploy

SEO/PWA

- `public/manifest.webmanifest`
- `app/robots.txt/route.ts`
- `app/sitemap.xml/route.ts`
