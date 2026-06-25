import { prisma } from '@/lib/prisma'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, password, organizationName } = await req.json()

    // Validation
    if (!email || !password || !organizationName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    // Hash password
    const passwordHash = await bcryptjs.hash(password, 10)

    // Create organization
    const orgSlug = organizationName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 63)
      .replace(/^-+|-+$/g, '')

    const organization = await prisma.organization.create({
      data: {
        name: organizationName,
        slug: `${orgSlug}-${Date.now()}`,
      },
    })

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        organizationId: organization.id,
        role: 'ADMIN', // First user is admin
        name: email.split('@')[0],
      },
    })

    // Create credentials account record for NextAuth
    await prisma.account.create({
      data: {
        userId: user.id,
        type: 'credentials',
        provider: 'credentials',
        providerAccountId: email,
      },
    })

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          organizationId: organization.id,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[SIGNUP_ERROR]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
