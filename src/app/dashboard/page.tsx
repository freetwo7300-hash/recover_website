import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { organization: true },
  })

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-cockpit">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-titanium">Dashboard</h1>
            <p className="text-titanium/60 text-sm">Welcome back, {user.name || user.email}</p>
          </div>

          <form
            action={async () => {
              'use server'
              await signOut({ redirectTo: '/' })
            }}
          >
            <button
              type="submit"
              className="bg-signal/20 hover:bg-signal/30 text-signal px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* User Card */}
        <div className="carbon-card rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-titanium mb-4">Your Profile</h2>
          <div className="space-y-3">
            <div>
              <p className="text-titanium/60 text-sm">Email</p>
              <p className="text-titanium font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-titanium/60 text-sm">Name</p>
              <p className="text-titanium font-medium">{user.name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-titanium/60 text-sm">Role</p>
              <p className="text-titanium font-medium">
                <span className="inline-block px-2 py-1 bg-signal/20 text-signal rounded text-xs font-semibold">
                  {user.role}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Organization Card */}
        {user.organization && (
          <div className="carbon-card rounded-xl p-6">
            <h2 className="text-lg font-semibold text-titanium mb-4">Organization</h2>
            <div className="space-y-3">
              <div>
                <p className="text-titanium/60 text-sm">Organization Name</p>
                <p className="text-titanium font-medium">{user.organization.name}</p>
              </div>
              <div>
                <p className="text-titanium/60 text-sm">Organization Slug</p>
                <p className="text-titanium font-medium text-xs font-mono bg-white/5 px-3 py-2 rounded">
                  {user.organization.slug}
                </p>
              </div>
              <div>
                <p className="text-titanium/60 text-sm">Created</p>
                <p className="text-titanium font-medium">
                  {new Date(user.organization.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
