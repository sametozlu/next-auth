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
