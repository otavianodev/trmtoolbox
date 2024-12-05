'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CopyContent } from '@/app/(dashboard)/dashboard/copywriter/page'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'

interface CopyAnalyzerProps {
  copy: CopyContent | null
}

export function CopyAnalyzer({ copy }: CopyAnalyzerProps) {
  if (!copy) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        Gere uma copy para ver a análise
      </div>
    )
  }

  const scores = {
    clarity: 85,
    engagement: 75,
    persuasion: 90,
    overall: 83
  }

  const suggestions = [
    {
      type: 'success',
      message: 'Boa utilização de gatilhos mentais',
      icon: CheckCircle
    },
    {
      type: 'warning',
      message: 'Considere adicionar mais prova social',
      icon: AlertCircle
    },
    {
      type: 'info',
      message: 'Experimente diferentes variações de CTA',
      icon: Info
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Análise da Copy</h3>
        <div className="grid gap-4">
          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Clareza</span>
                <span>{scores.clarity}%</span>
              </div>
              <Progress value={scores.clarity} />
            </div>
          </Card>
          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Engajamento</span>
                <span>{scores.engagement}%</span>
              </div>
              <Progress value={scores.engagement} />
            </div>
          </Card>
          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Persuasão</span>
                <span>{scores.persuasion}%</span>
              </div>
              <Progress value={scores.persuasion} />
            </div>
          </Card>
          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Score Geral</span>
                <span>{scores.overall}%</span>
              </div>
              <Progress value={scores.overall} className="bg-primary/20" />
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sugestões de Melhoria</h3>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon
            return (
              <Card key={index} className="p-4">
                <div className="flex items-start space-x-3">
                  <Icon className={`h-5 w-5 ${
                    suggestion.type === 'success' ? 'text-green-500' :
                    suggestion.type === 'warning' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <p className="text-sm">{suggestion.message}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}