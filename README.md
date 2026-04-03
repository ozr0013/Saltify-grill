# 🔥 Saltify Grill — Full-Stack Platform

> Cross-platform ordering, menu management, and analytics for Saltify Grill

![React Native](https://img.shields.io/badge/Mobile-React_Native_Expo-blue?style=flat-square)
![Node.js](https://img.shields.io/badge/Backend-Node.js_Express-brightgreen?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/DB-PostgreSQL-336791?style=flat-square)
![Redis](https://img.shields.io/badge/Cache-Redis-red?style=flat-square)
![Docker](https://img.shields.io/badge/Infra-Docker-2496ED?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)

---

## Overview

Saltify Grill is a full-stack digital platform that brings the restaurant experience online — across every device. Customers can browse the menu and place orders from the iOS app, Android app, or directly in the browser via the React PWA. Orders hit the kitchen in real time via WebSocket. Staff manage everything from a single admin dashboard.

Menu data is synced from Google Sheets via PapaParse CSV parsing, preserving the existing non-technical workflow for menu updates.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT LAYER                      │
│   React Native (iOS & Android)  ·  React PWA (Web)  │
└────────────────────────┬────────────────────────────┘
                         │ REST + WebSocket
┌────────────────────────▼────────────────────────────┐
│                     API LAYER                        │
│        Node.js · Express · Socket.io · JWT           │
└────────────────────────┬────────────────────────────┘
                         │ Prisma ORM
┌────────────────────────▼────────────────────────────┐
│                    DATA LAYER                        │
│     PostgreSQL  ·  Redis  ·  AWS S3  ·  GSheets      │
└────────────────────────┬────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────┐
│                 INFRASTRUCTURE                       │
│       Docker  ·  GitHub Actions  ·  Railway/AWS      │
└─────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend / Mobile

| Technology | Purpose |
|------------|---------|
| React Native + Expo | Cross-platform iOS & Android app |
| React (PWA) | Web ordering experience |
| Tailwind CSS | Styling |
| React Query | Server state, caching, background sync |
| Expo Router | File-based navigation |
| Expo Notifications | Push notifications (order status) |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| Socket.io | Real-time order updates to kitchen & customer |
| Prisma ORM | Type-safe database access |
| JWT + Refresh Tokens | Authentication |
| Zod | Request validation |
| Stripe SDK | Payment processing |

### Database & Storage

| Technology | Purpose |
|------------|---------|
| PostgreSQL | Primary relational database |
| Redis | Session store, caching, pub/sub |
| AWS S3 | Menu image and asset storage |
| Google Sheets + PapaParse | Non-technical menu CSV sync |

### DevOps & Tooling

| Technology | Purpose |
|------------|---------|
| Docker + Docker Compose | Local dev and production containers |
| GitHub Actions | CI/CD pipeline |
| Railway / AWS | Cloud hosting |
| Expo EAS | App Store & Play Store builds |

---

## Features

### Customer App (iOS / Android / Web)
- Browse full menu with categories, images, and descriptions
- Add to cart, customize items, apply promo codes
- Secure checkout via Stripe — supports Apple Pay and Google Pay
- Real-time order tracking from placed → preparing → ready
- Push notifications for order status updates
- Order history and receipt access

### Kitchen Display System
- Real-time order queue via WebSocket — no polling, no refresh
- Staff can mark orders as preparing, ready, or complete
- Audio alert on new order receipt

### Admin Dashboard
- Full menu CRUD — or sync from Google Sheets in one click
- Live and historical order view with revenue analytics
- Staff account management with role-based permissions
- Image uploads for menu items (S3-backed)

### Platform
- Role-based auth — customer, staff, and admin tiers
- JWT access tokens + Redis-backed refresh token rotation
- Rate limiting and input validation on all endpoints
- CORS configured for mobile and web origins

---

## Repo Structure

```
saltify-grill/
  ├── mobile/               # React Native app (Expo)
  │   ├── app/              # Expo Router screens
  │   ├── components/
  │   └── hooks/
  ├── web/                  # React PWA
  │   ├── src/
  │   └── public/
  ├── api/                  # Node.js + Express backend
  │   ├── routes/
  │   ├── controllers/
  │   ├── middleware/
  │   └── services/
  ├── db/                   # Prisma schema + migrations
  │   ├── schema.prisma
  │   └── migrations/
  ├── admin/                # Staff + admin dashboard
  ├── docker-compose.yml
  ├── .env.example
  └── index.html            # Legacy menu page (preserved)
```

---

## Database Schema (overview)

```
users         → id, name, email, password_hash, role, created_at
menu_items    → id, name, description, price, category, image_url, available
orders        → id, user_id, status, total, created_at
order_items   → id, order_id, menu_item_id, quantity, unit_price
sessions      → id, user_id, refresh_token, expires_at
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- Docker + Docker Compose
- Expo CLI (`npm install -g expo-cli`)

### 1. Clone and install

```bash
git clone https://github.com/ozr0013/saltify-grill
cd saltify-grill
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Key variables to set in `.env`:

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/saltify
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_...
AWS_BUCKET_NAME=saltify-assets
GOOGLE_SHEETS_CSV_URL=https://docs.google.com/spreadsheets/d/.../export?format=csv
```

### 3. Run with Docker

```bash
docker compose up
```

This starts PostgreSQL, Redis, the API server, and the web client together.

### 4. Run database migrations

```bash
cd db && npx prisma migrate dev
```

### 5. Start the mobile app

```bash
cd mobile && npx expo start
```

Scan the QR code with Expo Go on your phone, or press `i` for iOS simulator / `a` for Android emulator.

---

## Deployment

### API + Web (Railway or AWS)

```bash
docker build -t saltify-api ./api
docker push your-registry/saltify-api
# deploy via Railway dashboard or ECS task definition
```

### Mobile (App Store + Play Store)

```bash
cd mobile
eas build --platform all
eas submit --platform all
```

CI/CD via GitHub Actions runs lint, tests, and builds on every push to `main`.

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit with a clear message
4. Open a pull request against `main`

---

## License

MIT © Omar Rizwan
