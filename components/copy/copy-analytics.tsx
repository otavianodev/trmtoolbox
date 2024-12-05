'use client'

import { Card } from '@/components/ui/card'
import { GeneratedCopy } from '@/app/(dashboard)/dashboard/copy/page'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

interface CopyAnalyticsProps {
  copies: GeneratedCopy[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function CopyAnalytics({ copies }: CopyAnalyticsProps) {
  const typeDistribution = copies.reduce((acc, copy) => {
    acc[copy.type] = (acc[copy.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const pieData = Object.entries(typeDistribution).map(([name, value]) => ({
    name: name === 'creative' ? 'Criativos'
      : name === 'landing-page' ? 'Landing Pages'
      : name === 'instagram-bio' ? 'Bio Instagram'
      : 'Promoções',
    value
  }))

  const averageScores = copies
    .filter(copy => copy.score)
    .reduce((acc, copy) => {
      if (!copy.score) return acc
      acc.clarity += copy.score.clarity
      acc.engagement += copy.score.engagement
      acc.seo += copy.score.seo
      acc.count++
      return acc
    }, { clarity: 0, engagement: 0, seo: 0, count: 0 })

  const scoreData = [
    {
      name: 'Clareza',
      score: Math.round(averageScores.clarity / averageScores.count) || 0,
    },
    {
      name: 'Engajamento',
      score: Math.round(averageScores.engagement / averageScores.count) || 0,
    },
    {
      name: 'SEO',
      score: Math.round(averageScores.seo / averageScores.count) || 0,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Distribuição por Tipo</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Média de Scores</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Estatísticas Gerais</h3>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total de Copies</p>
            <p className="text-2xl font-bold">{copies.length}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Copies este mês</p>
            <p className="text-2xl font-bold">
              {copies.filter(copy => {
                const date = new Date(copy.createdAt!)
                const now = new Date()
                return date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear()
              }).length}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Melhor Performance</p>
            <p className="text-2xl font-bold">
              {Math.max(...copies
                .filter(copy => copy.score)
                .map(copy => copy.score!.engagement)
              )}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Testes A/B Ativos</p>
            <p className="text-2xl font-bold">
              {copies.filter(copy => 
                copy.content.extras?.abVariant && 
                copy.content.extras?.performance
              ).length / 2}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}