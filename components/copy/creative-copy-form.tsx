'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GeneratedCopy } from '@/app/(dashboard)/dashboard/copy/page'
import { Wand2 } from 'lucide-react'
import { Label } from '@/components/ui/label'

interface CreativeCopyFormProps {
  onGenerate: (copy: GeneratedCopy) => void
}

export function CreativeCopyForm({ onGenerate }: CreativeCopyFormProps) {
  const [niche, setNiche] = useState('')
  const [objective, setObjective] = useState('')
  const [targetAudience, setTargetAudience] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const headlines = [
      `🎯 Atenção ${targetAudience}! Chegou a solução definitiva para ${niche}`,
      `🚀 Descubra como transformar seus resultados em ${niche}`,
      `💡 A estratégia que está revolucionando o mercado de ${niche}`,
    ]

    const copies = [
      `Cansado de resultados mediocres em ${niche}? Nossa solução exclusiva vai te ajudar a ${objective} de forma simples e eficiente!`,
      `Descubra como dezenas de ${targetAudience} estão conseguindo ${objective} com nossa metodologia comprovada.`,
      `Chegou a hora de se destacar em ${niche}! Nossa solução foi desenvolvida especialmente para ${targetAudience} que querem ${objective}.`,
    ]

    const ctas = [
      '👉 Clique agora e descubra mais!',
      '🔥 Quero conhecer a solução!',
      '✨ Comece sua transformação agora!',
    ]

    const randomIndex = Math.floor(Math.random() * 3)

    const generatedCopy: GeneratedCopy = {
      type: 'creative',
      content: {
        headline: headlines[randomIndex],
        mainCopy: copies[randomIndex],
        cta: ctas[randomIndex],
        extras: {
          emojis: ['🎯', '🚀', '💡', '✨', '💪', '🔥'],
        },
      },
    }

    onGenerate(generatedCopy)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Nicho do Negócio</Label>
        <Input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Ex: marketing digital, fitness, coaching"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Objetivo do Anúncio</Label>
        <Select value={objective} onValueChange={setObjective} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o objetivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gerar mais leads">Gerar Leads</SelectItem>
            <SelectItem value="aumentar suas vendas">Vender Produto</SelectItem>
            <SelectItem value="aumentar seu engajamento">Aumentar Engajamento</SelectItem>
            <SelectItem value="construir autoridade">Criar Autoridade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Público-Alvo</Label>
        <Textarea
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="Descreva seu público-alvo (ex: empreendedores iniciantes)"
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