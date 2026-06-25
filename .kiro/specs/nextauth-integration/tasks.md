# NextAuth Integration - Implementation Tasks

## Task 1: Install Dependencies & Update package.json

**Description**: Add NextAuth, Prisma adapter, and bcryptjs for password hashing

**Acceptance Criteria**:
- [ ] next-auth@beta installed
- [ ] @auth/prisma-adapter installed
- [ ] bcryptjs installed
- [ ] package.json updated with new dependencies
- [ ] npm install completes without errors

**Details**:
```bash
npm install next-auth@beta @auth/prisma-adapter bcryptjs
npm install -D @types/bcryptjs
```

**Files Modified**: package.json, package-lock.json

---

## Task 2: Update Prisma Schema - Add Auth Models

**Description**: Add Account, Session, VerificationToken models and update User model for auth

**Acceptance Criteria**:
- [ ] Account model created with NextAuth fields
- [ ] Session model created with sessionToken
- [ ] VerificationToken model created
- [ ] User model updated with emailVerified, passwordHash, accounts[], sessions[]
- [ ] Role enum added (ADMIN, MANAGER, MEMBER, GUEST)
- [ ] Organization model exists with users[] relation
- [ ] No schema validation errors

**Details**:
- Add Account with OAuth provider fields
- Add Session with unique sessionToken
- Add VerificationToken for email verification
- Update User with NextAuth relations
- Add Role enum for RBAC

**Files Modified**: prisma/schema.prisma

---

## Task 3: Run Prisma Migration & Generate Client

**Description**: Apply schema changes to database and regenerate Prisma client

**Acceptance Criteria**:
- [ ] `npx prisma generate` succeeds
- [ ] `npx prisma db push` succeeds
- [ ] Prisma client includes new models
- [ ] No migration warnings or errors
- [ ] Database schema updated

**Command**:
```bash
npx prisma generate
npx prisma db push
```

**Files Modified**: Database schema, prisma/generated

---

## Task 4: Create Prisma Client Singleton (lib/prisma.ts)

**Description**: Create singleton instance to prevent multiple PrismaClient instances in development

**Acceptance Criteria**:
- [ ] File created at src/lib/prisma.ts
- [ ] Exports `prisma` singleton
- [ ] Handles dev hot-reload correctly
- [ ] No TypeScript errors

**Details**:
- Use global namespace to attach PrismaClient
- Prevents "Cannot create another instance" errors during dev

**Files Created**: src/lib/prisma.ts

---

## Task 5: Create NextAuth Config (lib/auth.ts)

**Description**: Main auth configuration with providers, callbacks, and JWT strategy

**Acceptance Criteria**:
- [ ] File created at src/lib/auth.ts
- [ ] Exports: handlers, auth, signIn, signOut
- [ ] PrismaAdapter configured correctly
- [ ] Providers: Credentials + Google
- [ ] Callbacks: session, jwt, signIn
- [ ] JWT strategy configured
- [ ] No TypeScript errors

**Details**:
- Credentials provider validates email/password against passwordHash
- Google provider creates Account record
- session() callback fetches org + role
- jwt() stores role + organizationId in token

**Files Created**: src/lib/auth.ts

---

## Task 6: Create NextAuth API Route ([...nextauth]/route.ts)

**Description**: Route handler for NextAuth

**Acceptance Criteria**:
- [ ] File created at src/app/api/auth/[...nextauth]/route.ts
- [ ] Exports GET, POST from handlers
- [ ] No errors on /api/auth/* requests

**Details**:
- Simple re-export of auth handlers
- Handles signIn, callback, session, etc.

**Files Created**: src/app/api/auth/[...nextauth]/route.ts

---

## Task 7: Create Auth Types (types/next-auth.d.ts)

**Description**: Extend NextAuth session/token types to include custom fields

**Acceptance Criteria**:
- [ ] File created at src/types/next-auth.d.ts
- [ ] Extends Session interface with organizationId, role
- [ ] Extends JWT interface with organizationId, role
- [ ] TypeScript recognizes custom session fields

**Details**:
- Override NextAuth default types
- Add organizationId and role to both Session and JWT

**Files Created**: src/types/next-auth.d.ts

---

## Task 8: Create Middleware (middleware.ts)

**Description**: Protect routes using Auth.js middleware

**Acceptance Criteria**:
- [ ] File created at src/middleware.ts
- [ ] Protects /dashboard/* routes
- [ ] Redirects unauthenticated to /auth/signin
- [ ] Allows authenticated users through
- [ ] No TypeScript errors

**Details**:
- Uses auth.ts middleware from NextAuth
- Config: matcher for /dashboard/*, /settings/*, /api/protected/*

**Files Created**: src/middleware.ts

---

## Task 9: Add Environment Variables

**Description**: Update .env.local with NextAuth config and OAuth credentials

**Acceptance Criteria**:
- [ ] NEXTAUTH_SECRET set (openssl rand -hex 32)
- [ ] NEXTAUTH_URL set (http://localhost:3000)
- [ ] GOOGLE_CLIENT_ID populated
- [ ] GOOGLE_CLIENT_SECRET populated
- [ ] DATABASE_URL set (from Neon)
- [ ] File is .env.local (not committed)

**Details**:
- NEXTAUTH_SECRET: random 32-byte hex string
- NEXTAUTH_URL: Local (dev) or production URL
- Google OAuth: Create in Google Cloud Console

**Files Modified**: .env.local (new file, .gitignore)

---

## Task 10: Create Sign-In Page (auth/signin/page.tsx)

**Description**: Login form with email/password and Google OAuth button

**Acceptance Criteria**:
- [ ] Form submits email + password
- [ ] Calls signIn("credentials", { email, password })
- [ ] "Sign in with Google" button calls signIn("google")
- [ ] Displays errors (invalid credentials)
- [ ] Redirects to /dashboard on success
- [ ] Responsive, matches Recover design
- [ ] No TypeScript errors

**Details**:
- Client component ('use client')
- Form validation
- Error display
- Redirect using useRouter

**Files Created**: src/app/auth/signin/page.tsx

---

## Task 11: Create Sign-Up Page (auth/signup/page.tsx)

**Description**: Registration form with email, password, org name

**Acceptance Criteria**:
- [ ] Form collects: email, password, confirm password, organization name
- [ ] Validates password match
- [ ] Creates User + Organization + Account
- [ ] Calls signIn() after successful signup
- [ ] Displays validation errors
- [ ] Redirects to /dashboard on success
- [ ] Responsive, matches Recover design
- [ ] No TypeScript errors

**Details**:
- Client component
- POST to /api/auth/signup
- Hash password with bcryptjs
- Create org with slug from name
- Auto-login after signup

**Files Created**: src/app/auth/signup/page.tsx, src/app/api/auth/signup/route.ts

---

## Task 12: Create Dashboard Page (dashboard/page.tsx)

**Description**: Protected page showing user info and org context

**Acceptance Criteria**:
- [ ] Page is protected (middleware redirects if not auth)
- [ ] Displays: user name, email, org name, role
- [ ] Shows sign-out button
- [ ] Uses getSession() or useSession()
- [ ] Responsive layout
- [ ] No TypeScript errors

**Details**:
- Can be server or client component
- Fetch session from auth()
- Display org + role from session

**Files Created**: src/app/dashboard/page.tsx

---

## Task 13: Update Header with Auth Links

**Description**: Update Header to show sign-out button when authenticated

**Acceptance Criteria**:
- [ ] Header checks session
- [ ] Shows "Sign Out" button if authenticated
- [ ] Shows "Sign In" link if not authenticated
- [ ] Sign Out button calls signOut()
- [ ] Links redirect correctly
- [ ] No TypeScript errors

**Details**:
- May need to convert to client component or use dynamic import
- Check session with useSession()

**Files Modified**: src/components/Header.tsx

---

## Task 14: Build & Test

**Description**: Compile TypeScript, run linter, test auth flow

**Acceptance Criteria**:
- [ ] `npm run build` succeeds
- [ ] `npm run type-check` passes
- [ ] No console errors in dev
- [ ] Sign-up flow works (create user + org)
- [ ] Sign-in flow works
- [ ] Google OAuth flow works
- [ ] Protected routes redirect correctly
- [ ] Session persists on reload
- [ ] Sign-out works

**Details**:
- Verify all 8 acceptance criteria before closing
- Manual testing in browser
- Check Network tab for API calls

**Files Modified**: None (validation only)

---

## Task 15: Commit Changes

**Description**: Stage and commit all changes to Git

**Acceptance Criteria**:
- [ ] All files staged
- [ ] Commit message: "feat(auth): implement NextAuth v5 with multi-tenant support"
- [ ] Commit pushed to feature branch
- [ ] No uncommitted changes

**Details**:
- Use git add, git commit
- Push to feature/nextauth-integration branch

**Files Modified**: Git history

---

## Summary

| Task | Component | Status |
|------|-----------|--------|
| 1 | Dependencies | Pending |
| 2 | Prisma Schema | Pending |
| 3 | Prisma Migration | Pending |
| 4 | Prisma Client | Pending |
| 5 | NextAuth Config | Pending |
| 6 | Auth API Route | Pending |
| 7 | Auth Types | Pending |
| 8 | Middleware | Pending |
| 9 | Environment Variables | Pending |
| 10 | Sign-In Page | Pending |
| 11 | Sign-Up Page | Pending |
| 12 | Dashboard Page | Pending |
| 13 | Header Update | Pending |
| 14 | Build & Test | Pending |
| 15 | Commit | Pending |

