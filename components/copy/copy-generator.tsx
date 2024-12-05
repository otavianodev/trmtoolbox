'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Wand2 } from 'lucide-react'
import { GeneratedCopy, CopyType } from '@/app/(dashboard)/dashboard/copy/page'
import { generateCopyFromTemplate } from '@/lib/utils/copy-templates'

interface CopyGeneratorProps {
  onGenerate: (copy: GeneratedCopy) => void
  selectedType: CopyType
}

export function CopyGenerator({ onGenerate, selectedType }: CopyGeneratorProps) {
  const [formData, setFormData] = useState({
    marca: '',
    oferta: '',
    publico: '',
    diferencial: '',
    link: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const generatedContent = generateCopyFromTemplate({
        type: selectedType,
        template: 'default',
        variables: formData
      })

      if (selectedType === 'instagram-bio') {
        const { versions } = generatedContent
        onGenerate({
          type: selectedType,
          content: {
            mainCopy: versions.formal.bio,
            extras: {
              versions,
              proofSuggestions: generatedContent.proofSuggestions
            }
          }
        })
      }
    } catch (error) {
      console.error('Error generating copy:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Nome da Marca/Empresa</Label>
          <Input
            value={formData.marca}
            onChange={(e) => setFormData(prev => ({ ...prev, marca: e.target.value }))}
            placeholder="Ex: Fit Life"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Principal Oferta</Label>
          <Input
            value={formData.oferta}
            onChange={(e) => setFormData(prev => ({ ...prev, oferta: e.target.value }))}
            placeholder="Ex: Transforme seu corpo em 30 dias"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Público-Alvo</Label>
          <Input
            value={formData.publico}
            onChange={(e) => setFormData(prev => ({ ...prev, publico: e.target.value }))}
            placeholder="Ex: Mulheres acima de 30 anos"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Diferencial Único</Label>
          <Input
            value={formData.diferencial}
            onChange={(e) => setFormData(prev => ({ ...prev, diferencial: e.target.value }))}
            placeholder="Ex: Programa personalizado com acompanhamento diário"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Link Principal</Label>
          <Input
            value={formData.link}
            onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
            placeholder="Ex: www.fitlife.com"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        <Wand2 className="mr-2 h-4 w-4" />
        Gerar Bio
      </Button>
    </form>
  )
}