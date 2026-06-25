// Data fetching layer - fetches from database
import { prisma } from './prisma'

export interface Feature {
  id: string
  title: string
  description: string
  animClass?: string
  icon?: React.ReactNode
}

export interface Integration {
  name: string
  icon?: string | null
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

// Features data - fetched from database
export const getFeatures = async (): Promise<Feature[]> => {
  const features = await prisma.feature.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return features.map((f) => ({
    id: f.featureId,
    title: f.title,
    description: f.description,
    animClass: f.animClass || '',
  }))
}

// Integrations data - fetched from database
export const getIntegrations = async (): Promise<Integration[]> => {
  const integrations = await prisma.integration.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return integrations.map((i) => ({
    name: i.name,
    icon: i.icon || undefined,
  }))
}

// Stats data - fetched from database
export const getStats = async (): Promise<Stat[]> => {
  const stats = await prisma.stat.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return stats.map((s) => ({
    value: s.value,
    suffix: s.suffix || '',
    label: s.label,
    sublabel: s.sublabel || '',
    color: s.color,
  }))
}

// Mini metrics for stats section - fetched from database
export const getMiniMetrics = async (): Promise<MiniMetric[]> => {
  const metrics = await prisma.metric.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return metrics.map((m) => ({
    label: m.label,
    recovered: m.recovered,
  }))
}

// EHR Systems - fetched from database integrations
export const getEHRSystems = async (): Promise<{ name: string }[]> => {
  const systems = await prisma.integration.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return systems.map((s) => ({
    name: s.name,
  }))
}

// Certifications/Badges - fetched from database
export const getCertifications = async () => {
  const certs = await prisma.certification.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return certs.map((c) => ({
    icon: c.icon,
    label: c.label,
    sub: c.sublabel,
  }))
}

// Form verticals - fetched from database
export const getVerticals = async (): Promise<string[]> => {
  const verticals = await prisma.vertical.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return verticals.map((v) => v.name)
}

// Slider labels
export const getSliderLabels = async (): Promise<string[]> => {
  return ['Low Impact', 'Medium', 'High Impact', 'Very High', 'Critical']
}
