# NextAuth Integration - Design Document

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│               UI / Client Components                     │
│  - SignIn Page (/auth/signin)                           │
│  - SignUp Page (/auth/signup)                           │
│  - Dashboard (protected with middleware)                │
└────────────────┬────────────────────────────────────────┘
                 │
        ┌────────▼────────────┐
        │  Middleware         │
        │  (auth check)       │
        │  Protects:          │
        │  - /dashboard/*     │
        │  - /settings/*      │
        └────────┬────────────┘
                 │
        ┌────────▼────────────┐
        │  NextAuth Session   │
        │  - JWT Token        │
        │  - User ID          │
        │  - Organization ID  │
        │  - Role             │
        └────────┬────────────┘
                 │
        ┌────────▼────────────┐
        │  Auth Config        │
        │  (src/lib/auth.ts)  │
        │  Callbacks:         │
        │  - session()        │
        │  - jwt()            │
        │  - signIn()         │
        └────────┬────────────┘
                 │
        ┌────────▼──────────────────────┐
        │  NextAuth Providers           │
        │  1. Credentials (email/pwd)   │
        │  2. Google OAuth              │
        └────────┬──────────────────────┘
                 │
        ┌────────▼─────────────────────────┐
        │  Prisma + Postgres (Neon)        │
        │  Models:                         │
        │  - User                          │
        │  - Account                       │
        │  - Session                       │
        │  - VerificationToken            │
        │  - Organization                  │
        └──────────────────────────────────┘
```

---

## Data Models

### User (Updated)

```prisma
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String?
  image           String?
  emailVerified   DateTime?    // For email verification
  passwordHash    String?      // For credentials provider
  role            Role      @default(MEMBER)
  organizationId  String
  organization    Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  
  // NextAuth Relations
  accounts        Account[]
  sessions        Session[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@map("users")
}

enum Role {
  ADMIN    // Full access to org
  MANAGER  // Can manage team members
  MEMBER   // Can access org resources
  GUEST    // Read-only access
}
```

### Account (New)

```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String  // "oauth" or "credentials"
  provider          String  // "google", "credentials"
  providerAccountId String
  
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
  @@map("accounts")
}
```

### Session (New)

```prisma
model Session {
  id           String    @id @default(cuid())
  sessionToken String    @unique
  userId       String
  expires      DateTime
  
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("sessions")
}
```

### VerificationToken (New)

```prisma
model VerificationToken {
  identifier String
  token      String    @unique
  expires    DateTime
  
  @@unique([identifier, token])
  @@map("verification_tokens")
}
```

### Organization (Updated)

Assumes this model exists; if not, ensure these fields:

```prisma
model Organization {
  id        String    @id @default(cuid())
  name      String
  slug      String    @unique
  
  users     User[]
  
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  
  @@map("organizations")
}
```

---

## Auth Flow Sequences

### Sign-Up with Email

```
1. User → Sign-Up Page (/auth/signup)
2. Form Submit (email, password, org name)
3. → API Route: POST /api/auth/signup
   - Hash password
   - Create User + Organization
   - Create Account record (type="credentials")
4. → NextAuth signIn() with credentials
5. → Callback: session() injects org + role
6. → Redirect to /dashboard
```

### Sign-In with Email

```
1. User → Sign-In Page (/auth/signin)
2. Form Submit (email, password)
3. → NextAuth.signIn("credentials", ...)
4. → Credentials Provider validates password
5. → Callback: session() injects org + role
6. → Redirect to /dashboard
```

### OAuth Sign-In (Google)

```
1. User → "Sign in with Google" button
2. → NextAuth.signIn("google")
3. → Redirect to Google consent screen
4. → Google callback → NextAuth callback
5. → User exists? Use it : Create new (+ default org)
6. → Callback: session() injects org + role
7. → Redirect to /dashboard
```

### Protected Route Access

```
1. User → /dashboard (protected)
2. → Middleware checks session
3. Session exists + valid?
   - YES: Allow access
   - NO: Redirect to /auth/signin
4. Render /dashboard with session data
```

---

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # NextAuth handler
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx              # Sign-in form
│   │   ├── signup/
│   │   │   └── page.tsx              # Sign-up form
│   │   └── error/
│   │       └── page.tsx              # Auth error page
│   └── dashboard/
│       └── page.tsx                   # Protected page (middleware guards)
├── lib/
│   ├── auth.ts                        # NextAuth config + export handlers
│   └── prisma.ts                      # Prisma client singleton
├── types/
│   └── next-auth.d.ts                 # Extend NextAuth session types
└── middleware.ts                      # Auth middleware
```

---

## Key Configuration Details

### Session Strategy: JWT

- **Advantages**: Stateless, scalable, can carry org context
- **Token Format**: `{ sub, email, name, role, organizationId, iat, exp }`
- **Expiry**: 30 days (configurable)

### Callbacks

1. **session()** — Executed when session is requested (getSession, useSession)
   - Fetches user + org data from DB
   - Injects into token
   - Sent to client

2. **jwt()** — Executed when JWT is created/updated
   - Called during sign-in, on middleware check
   - Stores role + organizationId in token

3. **signIn()** — Called before user is signed in
   - Validate credentials
   - Check if user + org exist
   - Return true/false

---

## Middleware Strategy

**File**: `src/middleware.ts`

Protects routes using Auth.js v5 `middleware()`:

```typescript
// Applies to:
// - /dashboard/*
// - /settings/*
// - /api/protected/*

// If unauthenticated: Redirect to /auth/signin
// If authenticated: Allow & inject req.auth
```

---

## Environment Variables

```env
# .env.local (NEVER commit)
NEXTAUTH_SECRET=your-secure-random-string-here   # openssl rand -hex 32
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Database
DATABASE_URL=postgresql://user:pass@host/db
```

---

## Testing Strategy

- [ ] Sign-up creates User + Organization + Account
- [ ] Sign-in validates credentials
- [ ] Google OAuth redirects correctly
- [ ] Session persists after reload
- [ ] Protected routes redirect to signin when no session
- [ ] JWT token contains org + role
- [ ] signOut() clears session
- [ ] Org context available in pages/API routes

