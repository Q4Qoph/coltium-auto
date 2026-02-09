# Coltium-Auto frontend – folder structure

```
src/
├── app/
│   ├── (auth)/                    # Auth route group (no navbar)
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (website)/                 # Public marketing site
│   │   ├── (components)/          # Navbar, Footer, Hero, etc.
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── faqs/page.tsx
│   │   ├── layout.tsx
│   │   ├── media/page.tsx
│   │   ├── page.tsx               # Home
│   │   ├── pricing/page.tsx
│   │   └── services/page.tsx
│   ├── admin/                     # Admin panel (role: admin)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── users/page.tsx
│   │   ├── technicians/page.tsx
│   │   ├── inspections/page.tsx
│   │   └── reports/page.tsx
│   ├── dashboard/                 # User dashboard (role: user)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── vehicles/page.tsx
│   │   ├── inspections/page.tsx
│   │   └── reports/page.tsx
│   ├── technician/               # Technician dashboard (role: technician)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx                 # Root layout (AuthProvider)
│   └── not-found.tsx
├── components/
│   └── ui/                        # Reusable UI (Button, Card, Table, Modal, etc.)
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Label.tsx
│       ├── Modal.tsx
│       ├── Select.tsx
│       ├── Table.tsx
│       └── index.ts
├── lib/
│   ├── api.ts                     # REST API client
│   ├── auth-context.tsx           # Auth state & login/signup/logout
│   ├── mock-auth.ts               # Mock login/signup when no API
│   ├── mock-data.ts               # Optional mock data
│   └── utils.ts                   # cn(), formatDate(), etc.
├── types/
│   └── index.ts                   # User, Vehicle, Inspection, Report, etc.
└── middleware.ts                  # Protected routes (cookie check)
```

## Route protection

- **Middleware** (`src/middleware.ts`): Redirects unauthenticated users from `/dashboard`, `/admin`, `/technician` to `/login`. Redirects authenticated users from `/login` to `?from=...` or `/dashboard`.
- **Layouts**: Each of `dashboard`, `admin`, and `technician` has a client layout that checks `user.role` and redirects to the correct area.

## Environment

- `NEXT_PUBLIC_API_URL`: Backend base URL (e.g. `https://api.coltium-auto.com`). If unset, auth uses mock login/signup.

## Test logins (mock)

When `NEXT_PUBLIC_API_URL` is not set:

- **User:** `user@coltium-auto.com` / `password`
- **Technician:** `tech@coltium-auto.com` / `password`
- **Admin:** `admin@coltium-auto.com` / `password`
