import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface FeatureData {
  id: string
  title: string
  description: string
}

interface IntegrationData {
  name: string
  icon: string
}

interface StatsData {
  value: string
  suffix: string
  label: string
  sublabel: string
}

async function seedFeatures() {
  const features: FeatureData[] = [
    {
      id: 'hipaa',
      title: 'HIPAA-Compliant Sending',
      description: 'BAA-covered infrastructure. PHI stays encrypted in transit and at rest. SOC 2 Type II certified. Audit logs on every send.',
    },
    {
      id: 'slots',
      title: 'Dynamic Slot Insertion',
      description: "Real-time availability pulled from your EHR. Each email contains the next 3 open slots — personalized to patient's stated preferences.",
    },
    {
      id: 'analytics',
      title: 'Real-Time Analytics',
      description: 'Per-sequence, per-segment dashboards. Recovery rate, revenue recovered, time-to-conversion — all ticking live as sequences execute.',
    },
    {
      id: 'ab',
      title: 'A/B Subject-Line Testing',
      description: 'Auto-split traffic across variants. Winner promotion after statistical significance. Learns provider voice over time.',
    },
    {
      id: 'payer',
      title: 'Payer-Specific Logic',
      description: 'Branch sequences by insurance carrier, plan tier, and eligibility status. BCBS gets a different message than Medicaid — automatically.',
    },
    {
      id: 'ehr',
      title: 'EHR Integration',
      description: 'Native connectors to Epic, Cerner, Athenahealth, and Modmed. Bi-directional sync — recovered bookings write back to your EHR automatically.',
    },
  ]

  // Store features in a way that can be accessed by components
  console.log('✓ Features seeded:', features.length)
  return features
}

async function seedIntegrations() {
  const integrations: IntegrationData[] = [
    { name: 'Epic', icon: '🏥' },
    { name: 'Cerner', icon: '🏢' },
    { name: 'Athena', icon: '📱' },
    { name: 'Modmed', icon: '💼' },
    { name: 'HIPAA', icon: '🔐' },
    { name: 'AES-256 Encryption', icon: '🔐' },
    { name: 'SOC 2 Certified', icon: '✅' },
    { name: 'HITRUST', icon: '📋' },
  ]

  console.log('✓ Integrations seeded:', integrations.length)
  return integrations
}

async function seedStats() {
  const stats: StatsData[] = [
    { value: '31', suffix: '%', label: 'Avg recovery rate', sublabel: 'across all verticals' },
    { value: '4.2', suffix: 'hrs', label: 'Median time to recovery', sublabel: 'from first trigger' },
    { value: '7,200+', suffix: '', label: 'Providers using Recover', sublabel: 'across US healthcare' },
    { value: '$28.4M', suffix: '', label: 'Revenue recovered', sublabel: 'in 2024 alone' },
  ]

  console.log('✓ Stats seeded:', stats.length)
  return stats
}

async function main() {
  console.log('🌱 Starting seed...')

  try {
    const features = await seedFeatures()
    const integrations = await seedIntegrations()
    const stats = await seedStats()

    console.log('\n✅ Seed completed successfully!')
    console.log(`   - ${features.length} features`)
    console.log(`   - ${integrations.length} integrations`)
    console.log(`   - ${stats.length} stats`)
    console.log('\nNote: These are demo data. In production, store in database tables.')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
