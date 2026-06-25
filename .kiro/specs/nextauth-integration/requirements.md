# NextAuth.js v5 (Auth.js) Integration - Recover SaaS

**Status**: Active  
**Priority**: High  
**Target Completion**: End of Sprint

## Overview

Implement secure authentication with multi-tenant (Organization) support using NextAuth v5 (Auth.js) for the Recover healthcare platform. This enables users to sign in, manage accounts, and access organization-scoped resources with proper role-based access control (RBAC).

---

## Goals

1. **User Authentication** - Secure sign-in/sign-up with email and OAuth (Google)
2. **Multi-Tenant Support** - Users belong to Organizations; can switch between orgs
3. **Session Management** - JWT-based sessions with organization context
4. **Authorization** - Role-based access (ADMIN, MANAGER, MEMBER, GUEST)
5. **Protected Routes** - Auth middleware for API and UI routes
6. **Security First** - CSRF protection, secure cookies, environment validation

---

## Requirements

### Functional Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| FR1 | User registration with email | Pending |
| FR2 | User login with credentials | Pending |
| FR3 | OAuth login with Google | Pending |
| FR4 | Session persistence (JWT) | Pending |
| FR5 | Organization creation on first signup | Pending |
| FR6 | Organization switching | Pending |
| FR7 | Role assignment (ADMIN by default) | Pending |
| FR8 | Sign out functionality | Pending |
| FR9 | Protected API routes with auth check | Pending |
| FR10 | Protected UI pages with middleware | Pending |

### Technical Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| TR1 | Install next-auth@beta, @auth/prisma-adapter | Pending |
| TR2 | Create Prisma Account, Session, VerificationToken models | Pending |
| TR3 | Update User model with auth fields (emailVerified, accounts, sessions) | Pending |
| TR4 | Create auth config: `src/lib/auth.ts` | Pending |
| TR5 | Create NextAuth API route: `src/app/api/auth/[...nextauth]/route.ts` | Pending |
| TR6 | Create middleware: `src/middleware.ts` | Pending |
| TR7 | Define session types in `src/types/next-auth.d.ts` | Pending |
| TR8 | Environment variables setup (.env.local) | Pending |
| TR9 | Prisma migration and db push | Pending |
| TR10 | Auth pages: signin, signup (basic forms) | Pending |

---

## Design Decisions

- **Session Strategy**: JWT (stateless, scales better for SaaS)
- **Database Adapter**: @auth/prisma-adapter (built-in support)
- **Providers**: Google OAuth + Credentials (email/password)
- **Organization Assignment**: Automatic on first signup
- **Role Model**: ADMIN, MANAGER, MEMBER, GUEST
- **Session Callback**: Inject org and role into JWT token
- **Middleware**: Check auth before accessing `/dashboard/*` routes

---

## Non-Requirements (Out of Scope)

- Two-factor authentication (future phase)
- Social media integrations beyond Google (LinkedIn, GitHub, etc. - future)
- Email verification flow (defer to Phase 2)
- Password reset via email (defer to Phase 2)
- User profile customization (defer to Phase 2)

---

## Success Criteria

- ✅ User can sign up with email/password
- ✅ User can sign in with email/password or Google
- ✅ Session persists across page reloads
- ✅ Organization auto-created on signup
- ✅ Protected routes redirect unauthenticated users to `/auth/signin`
- ✅ API routes return 401 for unauthenticated requests
- ✅ Session includes user role and organization ID
- ✅ No console errors or TypeScript warnings
- ✅ Environment variables properly configured
- ✅ Database migrations run successfully
