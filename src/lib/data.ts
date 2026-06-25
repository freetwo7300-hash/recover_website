// Data fetching layer - consolidates all application data
// In future, replace with DB queries

export interface Feature {
  id: string
  title: string
  description: string
  animClass?: string
  icon?: React.ReactNode
}

export interface Integration {
  name: string
  icon: string
}

export interface Stat {
  value: string
  suffix: string
  label: string
  sublabel: string
  color?: string
}

export interface MiniMetric {
  label: string
  recovered: number
}

// Features data
export const getFeatures = async (): Promise<Feature[]> => {
  // TODO: Replace with DB query
  // const features = await prisma.feature.findMany()
  return [
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
}

// Integrations data
export const getIntegrations = async (): Promise<Integration[]> => {
  // TODO: Replace with DB query
  // const integrations = await prisma.integration.findMany()
  return [
    { name: 'Epic', icon: '🏥' },
    { name: 'Cerner', icon: '🏢' },
    { name: 'Athena', icon: '📱' },
    { name: 'Modmed', icon: '💼' },
  ]
}

// Stats data
export const getStats = async (): Promise<Stat[]> => {
  // TODO: Replace with DB query
  // const stats = await prisma.stat.findMany()
  return [
    { value: '31', suffix: '%', label: 'Avg recovery rate', sublabel: 'across all verticals', color: 'text-signal' },
    { value: '4.2', suffix: 'hrs', label: 'Median time to recovery', sublabel: 'from first trigger', color: 'text-titanium' },
    { value: '7,200+', suffix: '', label: 'Providers using Recover', sublabel: 'across US healthcare', color: 'text-signal' },
    { value: '$28.4M', suffix: '', label: 'Revenue recovered', sublabel: 'in 2024 alone', color: 'text-titanium' },
  ]
}

// Mini metrics for stats section
export const getMiniMetrics = async (): Promise<MiniMetric[]> => {
  // TODO: Replace with DB query
  // const metrics = await prisma.miniMetric.findMany()
  return [
    { label: 'Telehealth', recovered: 38 },
    { label: 'Hospital', recovered: 27 },
    { label: 'Dental', recovered: 31 },
  ]
}

// EHR Systems
export const getEHRSystems = async (): Promise<{ name: string }[]> => {
  // TODO: Replace with DB query
  // const systems = await prisma.ehrSystem.findMany()
  return [
    { name: 'Epic' },
    { name: 'Cerner' },
    { name: 'Athenahealth' },
    { name: 'Modmed' },
    { name: 'NextGen' },
    { name: 'Greenway' },
    { name: 'Medidata' },
    { name: 'Elation' },
  ]
}

// Certifications/Badges
export const getCertifications = async () => {
  // TODO: Replace with DB query
  return [
    { icon: '🔐', label: 'HIPAA', sub: 'BAA-covered' },
    { icon: '✅', label: 'SOC 2 Type II', sub: 'Annually audited' },
    { icon: '📋', label: 'HITRUST', sub: 'In progress' },
    { icon: '🔐', label: 'AES-256 Encryption', sub: 'At rest & transit' },
  ]
}

// Form verticals
export const getVerticals = async (): Promise<string[]> => {
  // TODO: Replace with DB query
  return ['Telehealth', 'Hospital', 'Dental', 'Specialty Care', 'Mental Health', 'Urgent Care']
}

// Slider labels
export const getSliderLabels = async (): Promise<string[]> => {
  return ['Low Impact', 'Medium', 'High Impact', 'Very High', 'Critical']
}
