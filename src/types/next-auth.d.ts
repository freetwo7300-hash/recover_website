import type { DefaultSession, DefaultJWT } from 'next-auth'
import { Organization, Role } from '@prisma/client'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: Role
      organizationId: string
      organization?: Organization
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: Role
    organizationId: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    role: Role
    organizationId: string
  }
}
