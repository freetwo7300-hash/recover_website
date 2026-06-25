const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function seedOrganization() {
  const organization = await prisma.organization.upsert({
    where: { slug: 'recover-demo' },
    update: {},
    create: {
      name: 'Recover Demo',
      slug: 'recover-demo',
    },
  })
  console.log('✓ Organization seeded:', organization.name)
  return organization
}

async function seedUsers(organizationId) {
  const users = [
    {
      email: 'admin@recover.demo',
      name: 'Admin User',
      passwordHash: await bcrypt.hash('DemoPassword123!', 10),
      role: 'ADMIN',
      organizationId,
    },
    {
      email: 'manager@recover.demo',
      name: 'Manager User',
      passwordHash: await bcrypt.hash('DemoPassword123!', 10),
      role: 'MANAGER',
      organizationId,
    },
    {
      email: 'member@recover.demo',
      name: 'Member User',
      passwordHash: await bcrypt.hash('DemoPassword123!', 10),
      role: 'MEMBER',
      organizationId,
    },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    })
  }
  console.log('✓ Users seeded:', users.length)
}

async function seedFeatures() {
  const features = [
    {
      featureId: 'hipaa',
      title: 'HIPAA-Compliant Sending',
      description: 'BAA-covered infrastructure. PHI stays encrypted in transit and at rest. SOC 2 Type II certified. Audit logs on every send.',
      animClass: 'lock-animate',
      order: 0,
    },
    {
      featureId: 'slots',
      title: 'Dynamic Slot Insertion',
      description: "Real-time availability pulled from your EHR. Each email contains the next 3 open slots — personalized to patient's stated preferences.",
      animClass: 'calendar-animate',
      order: 1,
    },
    {
      featureId: 'analytics',
      title: 'Real-Time Analytics',
      description: 'Per-sequence, per-segment dashboards. Recovery rate, revenue recovered, time-to-conversion — all ticking live as sequences execute.',
      animClass: 'bar-animate',
      order: 2,
    },
    {
      featureId: 'ab',
      title: 'A/B Subject-Line Testing',
      description: 'Auto-split traffic across variants. Winner promotion after statistical significance. Learns provider voice over time.',
      animClass: 'ab-animate',
      order: 3,
    },
    {
      featureId: 'payer',
      title: 'Payer-Specific Logic',
      description: 'Branch sequences by insurance carrier, plan tier, and eligibility status. BCBS gets a different message than Medicaid — automatically.',
      animClass: 'branch-animate',
      order: 4,
    },
    {
      featureId: 'ehr',
      title: 'EHR Integration',
      description: 'Native connectors to Epic, Cerner, Athenahealth, and Modmed. Bi-directional sync — recovered bookings write back to your EHR automatically.',
      animClass: '',
      order: 5,
    },
  ]

  for (const feature of features) {
    await prisma.feature.upsert({
      where: { featureId: feature.featureId },
      update: feature,
      create: feature,
    })
  }
  console.log('✓ Features seeded:', features.length)
}

async function seedIntegrations() {
  const integrations = [
    { name: 'Epic', order: 0 },
    { name: 'Cerner', order: 1 },
    { name: 'Athenahealth', order: 2 },
    { name: 'Modmed', order: 3 },
    { name: 'NextGen', order: 4 },
    { name: 'Greenway', order: 5 },
    { name: 'Medidata', order: 6 },
    { name: 'Elation', order: 7 },
  ]

  for (const integration of integrations) {
    await prisma.integration.upsert({
      where: { name: integration.name },
      update: integration,
      create: integration,
    })
  }
  console.log('✓ Integrations seeded:', integrations.length)
}

async function seedStats() {
  const stats = [
    { value: '31', suffix: '%', label: 'Avg recovery rate', sublabel: 'across all verticals', color: 'text-signal', order: 0 },
    { value: '4.2', suffix: 'hrs', label: 'Median time to recovery', sublabel: 'from first trigger', color: 'text-titanium', order: 1 },
    { value: '7,200+', suffix: '', label: 'Providers using Recover', sublabel: 'across US healthcare', color: 'text-signal', order: 2 },
    { value: '$28.4M', suffix: '', label: 'Revenue recovered', sublabel: 'in 2024 alone', color: 'text-titanium', order: 3 },
  ]

  await prisma.stat.deleteMany({})

  for (const stat of stats) {
    await prisma.stat.create({ data: stat })
  }
  console.log('✓ Stats seeded:', stats.length)
}

async function seedMetrics() {
  const metrics = [
    { label: 'Appointment abandons', recovered: 28, order: 0 },
    { label: 'Insurance enrollments', recovered: 41, order: 1 },
    { label: 'Prescription refills', recovered: 35, order: 2 },
    { label: 'Vision exams', recovered: 22, order: 3 },
  ]

  await prisma.metric.deleteMany({})

  for (const metric of metrics) {
    await prisma.metric.create({ data: metric })
  }
  console.log('✓ Metrics seeded:', metrics.length)
}

async function seedCertifications() {
  const certifications = [
    { icon: 'LockClosedIcon', label: 'HIPAA', sublabel: 'BAA-covered', order: 0 },
    { icon: 'CheckCircleIcon', label: 'SOC 2 Type II', sublabel: 'Annually audited', order: 1 },
    { icon: 'DocumentIcon', label: 'HITRUST', sublabel: 'In progress', order: 2 },
    { icon: 'LockClosedIcon', label: 'AES-256 Encryption', sublabel: 'At rest & transit', order: 3 },
  ]

  await prisma.certification.deleteMany({})

  for (const cert of certifications) {
    await prisma.certification.create({ data: cert })
  }
  console.log('✓ Certifications seeded:', certifications.length)
}

async function seedVerticals() {
  const verticals = [
    { name: 'Telehealth', order: 0 },
    { name: 'Hospital', order: 1 },
    { name: 'Dental', order: 2 },
    { name: 'Specialty Care', order: 3 },
    { name: 'Mental Health', order: 4 },
    { name: 'Urgent Care', order: 5 },
  ]

  for (const vertical of verticals) {
    await prisma.vertical.upsert({
      where: { name: vertical.name },
      update: vertical,
      create: vertical,
    })
  }
  console.log('✓ Verticals seeded:', verticals.length)
}

async function main() {
  console.log('🌱 Starting seed...')

  try {
    // Seed multi-tenant infrastructure
    const organization = await seedOrganization()
    await seedUsers(organization.id)

    // Seed content models
    await seedFeatures()
    await seedIntegrations()
    await seedStats()
    await seedMetrics()
    await seedCertifications()
    await seedVerticals()

    console.log('\n✅ Seed completed successfully!')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
