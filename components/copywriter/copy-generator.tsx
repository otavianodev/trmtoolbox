'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Wand2 } from 'lucide-react'
import { CopyContent, CreativeType, CopyObjective, CopyFramework } from '@/app/(dashboard)/dashboard/copywriter/page'

interface CopyGeneratorProps {
  onGenerate: (copy: CopyContent) => void
}

export function CopyGenerator({ onGenerate }: CopyGeneratorProps) {
  const [formData, setFormData] = useState<Partial<CopyContent>>({
    type: 'paid-ad',
    objective: 'sales',
    framework: 'aida',
    headline: '',
    mainCopy: '',
    cta: '',
    targetAudience: '',
    triggers: []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(formData as CopyContent)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Tipo de Criativo</Label>
          <Select
            value={formData.type}
            onValueChange={(value: CreativeType) => 
              setFormData(prev => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paid-ad">Anúncio Pago</SelectItem>
              <SelectItem value="engagement-post">Post de Engajamento</SelectItem>
              <SelectItem value="sales-page">Página de Vendas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Objetivo</Label>
          <Select
            value={formData.objective}
            onValueChange={(value: CopyObjective) => 
              setFormData(prev => ({ ...prev, objective: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Vendas</SelectItem>
              <SelectItem value="leads">Geração de Leads</SelectItem>
              <SelectItem value="engagement">Engajamento</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Framework de Copy</Label>
        <Select
          value={formData.framework}
          onValueChange={(value: CopyFramework) => 
            setFormData(prev => ({ ...prev, framework: value }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aida">AIDA (Atenção, Interesse, Desejo, Ação)</SelectItem>
            <SelectItem value="pas">PAS (Problema, Agitação, Solução)</SelectItem>
            <SelectItem value="fab">FAB (Features, Advantages, Benefits)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Público-Alvo</Label>
        <Input
          value={formData.targetAudience}
          onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
          placeholder="Ex: Empreendedores digitais entre 25-45 anos"
        />
      </div>

      <div className="space-y-2">
        <Label>Headline</Label>
        <Input
          value={formData.headline}
          onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
          placeholder="Ex: Descubra o segredo para dobrar suas vendas em 30 dias"
        />
      </div>

      <div className="space-y-2">
        <Label>Corpo do Texto</Label>
        <Textarea
          value={formData.mainCopy}
          onChange={(e) => setFormData(prev => ({ ...prev, mainCopy: e.target.value }))}
          placeholder="Digite o corpo principal da sua copy..."
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label>Call to Action (CTA)</Label>
        <Input
          value={formData.cta}
          onChange={(e) => setFormData(prev => ({ ...prev, cta: e.target.value }))}
          placeholder="Ex: Clique aqui para começar agora"
        />
      </div>

      <Button type="submit" className="w-full">
        <Wand2 className="mr-2 h-4 w-4" />
        Gerar Copy
      </Button>
    </form>
  )
}