import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import bcryptjs from 'bcryptjs'
import { prisma } from './prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google OAuth Provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Credentials Provider (email/password)
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: { organization: true },
        })

        if (!user || !user.passwordHash) {
          throw new Error('Invalid email or password')
        }

        // Verify password
        const isPasswordValid = await bcryptjs.compare(
          credentials.password as string,
          user.passwordHash
        )

        if (!isPasswordValid) {
          throw new Error('Invalid email or password')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    // Session callback: called when getSession/useSession is invoked
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub

        // Fetch user with org from database
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          include: { organization: true },
        })

        if (user) {
          session.user.organizationId = user.organizationId
          session.user.role = user.role
          session.user.organization = user.organization
        }
      }
      return session
    },

    // JWT callback: called when JWT is created/updated
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role || 'MEMBER'
        token.organizationId = (user as any).organizationId
      }

      // Handle session updates
      if (trigger === 'update' && session) {
        token.role = session.role
        token.organizationId = session.organizationId
      }

      return token
    },

    // SignIn callback: called before user is signed in
    async signIn({ user, account, profile }) {
      // For OAuth providers (Google)
      if (account?.provider === 'google' && user.email) {
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        })

        // Create user with default organization if doesn't exist
        if (!dbUser) {
          const orgSlug = user.email.split('@')[0].toLowerCase().replace(/[^a-z0-9-]/g, '-')
          
          const organization = await prisma.organization.create({
            data: {
              name: user.name || user.email,
              slug: `${orgSlug}-${Date.now()}`,
            },
          })

          dbUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              organizationId: organization.id,
              role: 'ADMIN',
            },
          })
        }
      }

      return true
    },

    // Redirect callback: called after successful signin
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl + '/dashboard'
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
})
