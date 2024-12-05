'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CopyContent } from '@/app/(dashboard)/dashboard/copywriter/page'
import { generateABVariant } from '@/lib/utils/ab-testing'
import { ArrowRight, BarChart2 } from 'lucide-react'

interface ABTestingProps {
  originalCopy: CopyContent | null
}

export function ABTesting({ originalCopy }: ABTestingProps) {
  const [variant, setVariant] = useState<CopyContent | null>(null)
  const [metrics, setMetrics] = useState({
    original: { views: 0, clicks: 0, conversions: 0 },
    variant: { views: 0, clicks: 0, conversions: 0 }
  })

  const generateVariant = () => {
    if (!originalCopy) return

    const newVariant = {
      ...originalCopy,
      headline: `Variação B: ${originalCopy.headline}`,
      mainCopy: `Versão alternativa: ${originalCopy.mainCopy}`,
      cta: `Novo CTA: ${originalCopy.cta}`
    }

    setVariant(newVariant)
    // Simulate metrics
    setMetrics({
      original: {
        views: Math.floor(Math.random() * 1000),
        clicks: Math.floor(Math.random() * 100),
        conversions: Math.floor(Math.random() * 10)
      },
      variant: {
        views: Math.floor(Math.random() * 1000),
        clicks: Math.floor(Math.random() * 100),
        conversions: Math.floor(Math.random() * 10)
      }
    })
  }

  if (!originalCopy) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        Gere uma copy para começar o teste A/B
      </div>
    )
  }

  const calculateRate = (value: number, total: number) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) : '0'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Teste A/B</h3>
        <Button onClick={generateVariant}>
          Gerar Variante B
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Versão A (Original)</h4>
              <Badge variant="secondary">Controle</Badge>
            </div>
            <div className="space-y-2">
              <p className="font-medium">{originalCopy.headline}</p>
              <p className="text-sm text-muted-foreground">{originalCopy.mainCopy}</p>
              <p className="text-sm font-medium text-primary">{originalCopy.cta}</p>
            </div>
          </div>
        </Card>

        {variant && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Versão B (Variante)</h4>
                <Badge variant="secondary">Teste</Badge>
              </div>
              <div className="space-y-2">
                <p className="font-medium">{variant.headline}</p>
                <p className="text-sm text-muted-foreground">{variant.mainCopy}</p>
                <p className="text-sm font-medium text-primary">{variant.cta}</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {variant && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <BarChart2 className="h-5 w-5" />
              <h4 className="font-medium">Métricas de Performance</h4>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-4">
                <h5 className="text-sm font-medium">Taxa de Clique (CTR)</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Versão A</span>
                    <span>{calculateRate(metrics.original.clicks, metrics.original.views)}%</span>
                  </div>
                  <Progress value={Number(calculateRate(metrics.original.clicks, metrics.original.views))} />
                  <div className="flex justify-between text-sm">
                    <span>Versão B</span>
                    <span>{calculateRate(metrics.variant.clicks, metrics.variant.views)}%</span>
                  </div>
                  <Progress value={Number(calculateRate(metrics.variant.clicks, metrics.variant.views))} />
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-sm font-medium">Taxa de Conversão</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Versão A</span>
                    <span>{calculateRate(metrics.original.conversions, metrics.original.clicks)}%</span>
                  </div>
                  <Progress value={Number(calculateRate(metrics.original.conversions, metrics.original.clicks))} />
                  <div className="flex justify-between text-sm">
                    <span>Versão B</span>
                    <span>{calculateRate(metrics.variant.conversions, metrics.variant.clicks)}%</span>
                  </div>
                  <Progress value={Number(calculateRate(metrics.variant.conversions, metrics.variant.clicks))} />
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-sm font-medium">Conversões Totais</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Versão A</span>
                    <span>{metrics.original.conversions}</span>
                  </div>
                  <Progress value={(metrics.original.conversions / (metrics.original.conversions + metrics.variant.conversions)) * 100} />
                  <div className="flex justify-between text-sm">
                    <span>Versão B</span>
                    <span>{metrics.variant.conversions}</span>
                  </div>
                  <Progress value={(metrics.variant.conversions / (metrics.original.conversions + metrics.variant.conversions)) * 100} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}