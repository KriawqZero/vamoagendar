# VamoAgendar

Agendamento simples para profissionais. Um link, seus clientes agendam.

## Stack

- **Next.js 16** (App Router, Server Components, Server Actions)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Prisma 7** + **PostgreSQL**
- **Auth.js** (next-auth v5)
- **Mercado Pago SDK** (billing)
- **pnpm**

## Setup

### 1. Prerequisites

- Node.js >= 20
- pnpm >= 9
- Docker (for PostgreSQL)

### 2. Clone and install

```bash
git clone <repo-url>
cd vamoagendar
pnpm install
```

### 3. Start the database

```bash
docker compose up -d
```

This starts PostgreSQL on port 5432 with:
- Database: `vamoagendar`
- User: `vamoagendar`
- Password: `secret`

### 4. Configure environment

Copy `.env` and adjust if needed. Default values work with the Docker setup above.

Required env vars:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth secret |
| `AUTH_URL` | App URL for auth |
| `MERCADO_PAGO_ACCESS_TOKEN` | MP access token (billing) |
| `MERCADO_PAGO_PUBLIC_KEY` | MP public key (billing) |
| `MERCADO_PAGO_WEBHOOK_SECRET` | MP webhook signature secret |
| `APP_URL` | Public app URL for webhooks |

SMTP vars are optional for email notifications.

### 5. Run migrations

```bash
pnpm prisma migrate dev --name init
```

### 6. Generate Prisma Client

```bash
pnpm prisma generate
```

### 7. Start development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  (auth)/          → login, register pages
  (dashboard)/     → professional dashboard
  book/[slug]/     → public booking page
  planos/          → public pricing page
  api/billing/     → webhook + checkout routes
  api/             → notification routes, auth handler
lib/
  actions/         → server actions (mutations)
  billing/         → billing provider abstraction + Mercado Pago
  repositories/    → Prisma queries
  services/        → business logic (slots, booking, billing, notifications)
  utils/           → date, slug, plan helpers
  auth.ts          → Auth.js config
  prisma.ts        → Prisma client singleton
components/
  ui/              → reusable components (Button, Input, Card, Modal, Badge)
  dashboard/       → dashboard components (incl. subscription-card)
  booking/         → public booking wizard
  auth/            → login/register forms
prisma/
  schema.prisma    → database models (User, Service, Subscription, ...)
```

## Features

- **Authentication** — email/password registration and login
- **Dashboard** — today's appointments, next client countdown, upcoming schedule
- **Services** — create/edit/toggle services with plan limits (FREE: max 2)
- **Availability** — weekly working hours with multiple blocks per day
- **Exceptions** — mark specific days/times as unavailable or override schedule
- **Holidays** — block entire days from booking
- **Public Booking** — mobile-first step-by-step wizard (service → date → time → contact → confirm)
- **Slot Engine** — auto-generates valid time slots respecting all rules
- **Settings** — profile, accent color, custom slug (PRO), plan info
- **Billing** — subscription management, plan comparison, upgrade/cancel flow
- **Pricing Page** — public `/planos` with FREE vs PRO comparison
- **Mercado Pago** — billing provider scaffold (checkout, webhook, subscription sync)
- **Notifications** — email confirmation scaffolding, WhatsApp placeholder

## Plans

| Feature | Free | Pro (R$ 9,90/mês) |
|---------|------|-----|
| Services | 2 max | Unlimited |
| Custom slug | No | Yes |
| Logo customization | No | Yes |
| Accent color | No | Yes |
| WhatsApp reminders | No | Yes |

## Billing Status

The billing foundation is implemented with:
- **Subscription model** — persists plan, status, Mercado Pago references
- **Abstract BillingProvider** — interface + MercadoPago SDK implementation
- **Checkout flow** — creates MP preference, redirects to payment
- **Webhook route** — receives MP events, syncs subscription status
- **Dashboard billing page** — upgrade CTA, plan limits, cancel flow

**Not yet production-ready:** webhook signature validation, recurring pre-approval (subscription) vs one-time preference, retry/idempotency, billing history. These are the next steps to finish before going live.
