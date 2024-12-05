'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GeneratedCopy } from '@/app/(dashboard)/dashboard/copy/page'
import { Wand2 } from 'lucide-react'

interface InstagramBioFormProps {
  onGenerate: (copy: GeneratedCopy) => void
}

export function InstagramBioForm({ onGenerate }: InstagramBioFormProps) {
  const [name, setName] = useState('')
  const [occupation, setOccupation] = useState('')
  const [mainOffer, setMainOffer] = useState('')
  const [link, setLink] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulated copy generation - Replace with actual AI/template logic
    const generatedCopy: GeneratedCopy = {
      type: 'instagram-bio',
      content: {
        mainCopy: `${name} | ${occupation} 🚀\n\n✨ ${mainOffer}\n\n🔗 ${link}`,
        extras: {
          emojis: ['🚀', '✨', '💡', '🎯', '📱', '💪'],
        },
      },
    }

    onGenerate(generatedCopy)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Nome</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Ocupação</label>
        <Input
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          placeholder="Ex: Coach de Negócios, Expert em Marketing"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Oferta Principal</label>
        <Textarea
          value={mainOffer}
          onChange={(e) => setMainOffer(e.target.value)}
          placeholder="Ex: Ajudo empreendedores a dobrar suas vendas em 60 dias"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Link Principal</label>
        <Input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Ex: link.tree/seuperfil"
        />
      </div>

      <Button type="submit" className="w-full">
        <Wand2 className="mr-2 h-4 w-4" />
        Gerar Bio
      </Button>
    </form>
  )
}