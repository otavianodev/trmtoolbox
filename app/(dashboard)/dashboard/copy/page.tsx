'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CopyGenerator } from '@/components/copy/copy-generator'
import { CopyOutput } from '@/components/copy/copy-output'
import { useCopies } from '@/lib/hooks/useCopies'

export type CopyType = 'creative' | 'landing-page' | 'instagram-bio' | 'promotion'

export interface GeneratedCopy {
  type: CopyType
  content: {
    headline?: string
    subheadline?: string
    mainCopy: string
    bullets?: string[]
    cta?: string
    extras?: {
      versions?: {
        formal: {
          bio: string
          linkText: string
          hashtags: string[]
          storiesCta: string
        }
        informal: {
          bio: string
          linkText: string
          hashtags: string[]
          storiesCta: string
        }
        emocional: {
          bio: string
          linkText: string
          hashtags: string[]
          storiesCta: string
        }
        autoridade: {
          bio: string
          linkText: string
          hashtags: string[]
          storiesCta: string
        }
      }
      proofSuggestions?: string[]
    }
  }
}

export default function CopyPage() {
  const [generatedCopy, setGeneratedCopy] = useState<GeneratedCopy | null>(null)
  const { addCopy, deleteCopy, updateCopy } = useCopies()
  const [selectedType, setSelectedType] = useState<CopyType>('instagram-bio')

  const handleGenerate = (copy: GeneratedCopy) => {
    setGeneratedCopy(copy)
  }

  const handleSave = (copy: GeneratedCopy) => {
    addCopy(copy)
  }

  const handleDelete = () => {
    setGeneratedCopy(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Gerador de Copy</h2>
        <p className="text-muted-foreground">
          Crie textos persuasivos para diferentes plataformas
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <CopyGenerator
            onGenerate={handleGenerate}
            selectedType={selectedType}
          />
        </Card>

        <Card className="p-6">
          <CopyOutput 
            copy={generatedCopy}
            onSave={handleSave}
            onUpdate={updateCopy}
            onDelete={handleDelete}
          />
        </Card>
      </div>
    </div>
  )
}