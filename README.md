# Recover — Win Back Every Abandoned Patient

> HIPAA-compliant patient re-engagement platform for telehealth, hospital, and dental organizations.

Recover fires automated, HIPAA-compliant email sequences the moment a patient abandons a booking, enrollment, or refill — turning care gaps into recovered revenue.

---

## ✨ Features

- 🏥 **HIPAA-compliant messaging** — end-to-end compliant patient re-engagement flows
- 📧 **Automated email sequences** — triggered the moment a patient drops off
- 📊 **Recovery analytics** — real-time dashboard tracking recovery rates
- 🌐 **i18n (EN / AR)** — full English & Arabic localization via `next-intl`
- 🔐 **Authentication** — NextAuth v5 with email/password + Google OAuth
- 🗄️ **Database** — Prisma ORM with PostgreSQL
- 🎨 **Dark UI** — custom Tailwind design system (Cockpit / Signal / Titanium palette)
- ⚡ **Next.js 15 App Router** — React 19, server components, streaming

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + custom design tokens |
| Auth | NextAuth v5 (`next-auth@beta`) + Prisma adapter |
| Database | PostgreSQL via Prisma ORM 5 |
| i18n | next-intl v4 |
| Charts | Recharts |
| Icons | Heroicons v2 |
| Linting | ESLint + Prettier |
| Deploy | Netlify (`@netlify/plugin-nextjs`) |

---

## 📋 Prerequisites

- **Node.js** ≥ 18.17
- **npm** ≥ 9
- **PostgreSQL** database (local or hosted, e.g. Neon / Supabase / Railway)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/recover_website.git
cd recover_website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Required variables (see `.env.example` for full list):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/recover"

# NextAuth
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:4028"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### 4. Set up the database

```bash
# Push schema to database
npx prisma db push

# (Optional) Seed with demo data
npx prisma db seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:4028/en](http://localhost:4028/en) in your browser.

---

## 📁 Project Structure

```
recover_website/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.js             # Demo data seeder
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── [locale]/       # Localized routes (en / ar)
│   │   │   ├── components/ # Header, Footer, page sections
│   │   │   ├── auth/       # Sign in / Sign up pages
│   │   │   ├── dashboard/  # Authenticated dashboard
│   │   │   ├── layout.tsx  # Locale layout (providers)
│   │   │   └── page.tsx    # Marketing home page
│   │   ├── api/
│   │   │   └── auth/       # NextAuth API route
│   │   ├── layout.tsx      # Root HTML layout
│   │   ├── error.tsx       # Global error boundary
│   │   └── not-found.tsx   # 404 page
│   ├── components/
│   │   └── ui/             # Shared UI primitives (AppLogo, etc.)
│   ├── lib/                # Auth config, Prisma client, utilities
│   ├── messages/
│   │   ├── en.json         # English translations
│   │   └── ar.json         # Arabic translations
│   ├── styles/             # Global CSS & Tailwind entry
│   ├── types/              # Shared TypeScript types
│   └── middleware.ts       # next-intl locale routing middleware
├── image-hosts.config.mjs  # Allowed image domains for next/image
├── next-intl.config.ts     # i18n configuration
├── next.config.mjs         # Next.js configuration
├── tailwind.config.js      # Tailwind + custom design tokens
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

---

## 📦 Available Scripts

```bash
npm run dev          # Start dev server on http://localhost:4028
npm run build        # Build for production
npm run start        # Run production build locally (port 4028)
npm run serve        # Alias: next start (production server)
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type check (no emit)
```

---

## 🌐 Internationalization

The app supports **English** (`/en`) and **Arabic** (`/ar`) locales via `next-intl`.

Translation files live in `src/messages/`:
- `en.json` — English strings
- `ar.json` — Arabic strings

Namespaces: `common`, `navigation`, `auth`, `dashboard`, `home`, `footer`, `errors`

---

## 🗄️ Database

This project uses **Prisma** with PostgreSQL.

```bash
# View / edit schema
prisma/schema.prisma

# Generate Prisma client after schema changes
npx prisma generate

# Apply schema changes to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio
```

---

## 🚢 Deployment

### Netlify (recommended)

The project includes `@netlify/plugin-nextjs`. Deploy with one click:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

Set the following environment variables in your Netlify dashboard:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production URL)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (if using Google auth)

### Vercel

```bash
npm run build   # Verify build passes first
vercel --prod
```

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m 'feat: add your feature'`
4. Push to branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 🔒 Security

Found a security vulnerability? Please **do not** open a public issue.  
Email us at **security@recoverhealth.io** instead.

---

Built with ❤️ by the Recover team