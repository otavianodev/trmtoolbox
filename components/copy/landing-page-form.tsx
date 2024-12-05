'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GeneratedCopy } from '@/app/(dashboard)/dashboard/copy/page'
import { Wand2 } from 'lucide-react'

interface LandingPageFormProps {
  onGenerate: (copy: GeneratedCopy) => void
}

export function LandingPageForm({ onGenerate }: LandingPageFormProps) {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [problem, setProblem] = useState('')
  const [benefits, setBenefits] = useState('')
  const [targetAudience, setTargetAudience] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const benefitsList = benefits.split('\n').filter(Boolean)

    // Simulated copy generation - Replace with actual AI/template logic
    const generatedCopy: GeneratedCopy = {
      type: 'landing-page',
      content: {
        headline: `Descubra Como ${productName} Pode Transformar Sua Vida`,
        subheadline: `A solução definitiva para ${problem}`,
        mainCopy: `Apresentamos ${productName}, desenvolvido especialmente para ${targetAudience} que buscam ${description}`,
        bullets: benefitsList,
        cta: 'Garanta Seu Acesso Agora',
        extras: {
          testimonials: [
            'Incrível! Transformou completamente minha forma de trabalhar.',
            'Os resultados começaram a aparecer já na primeira semana!',
            'Melhor investimento que fiz este ano.',
          ],
        },
      },
    }

    onGenerate(generatedCopy)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Nome do Produto</label>
        <Input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Ex: Curso Completo de Marketing Digital"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Descrição Rápida</label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: aumentar vendas online"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Problema que Resolve</label>
        <Textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Qual problema seu produto resolve?"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Benefícios (um por linha)</label>
        <Textarea
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          placeholder="Liste os principais benefícios"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Público-Alvo</label>
        <Input
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="Ex: empreendedores iniciantes"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        <Wand2 className="mr-2 h-4 w-4" />
        Gerar Copy
      </Button>
    </form>
  )
}