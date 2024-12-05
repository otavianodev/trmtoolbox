'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy, Wand2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

interface CopyOutputProps {
  copy: any // Replace with proper type
  onRegenerate: () => void
}

export function CopyOutput({ copy, onRegenerate }: CopyOutputProps) {
  const [activeTab, setActiveTab] = useState('copy')
  const { toast } = useToast()

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast({
      title: 'Copiado!',
      description: 'Texto copiado para a área de transferência.',
    })
  }

  if (!copy) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        Preencha o formulário para gerar sua copy
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Copy Gerada</h3>
        <Button variant="outline" onClick={onRegenerate}>
          <Wand2 className="mr-2 h-4 w-4" />
          Gerar Nova Versão
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="copy">Copy</TabsTrigger>
          <TabsTrigger value="suggestions">Sugestões</TabsTrigger>
          <TabsTrigger value="variations">Variações</TabsTrigger>
        </TabsList>

        <TabsContent value="copy" className="space-y-4">
          {copy.headlines && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Headlines</label>
              {copy.headlines.map((headline: string, index: number) => (
                <Card key={index} className="p-3 relative group">
                  <p>{headline}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(headline)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          )}

          {copy.mainCopy && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Copy Principal</label>
              {copy.mainCopy.map((text: string, index: number) => (
                <Card key={index} className="p-3 relative group">
                  <p>{text}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(text)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          )}

          {copy.cta && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Call to Action</label>
              {copy.cta.map((cta: string, index: number) => (
                <Card key={index} className="p-3 relative group">
                  <p>{cta}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(cta)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <Card className="p-4">
            <h4 className="font-medium mb-2">Sugestões de A/B Testing</h4>
            <ul className="space-y-2">
              {copy.abTestSuggestions.map((suggestion: string, index: number) => (
                <li key={index} className="text-sm">{suggestion}</li>
              ))}
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-medium mb-2">Ajustes por Canal</h4>
            <ul className="space-y-2">
              {copy.channelAdjustments.map((adjustment: string, index: number) => (
                <li key={index} className="text-sm">{adjustment}</li>
              ))}
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-medium mb-2">Gatilhos Mentais Sugeridos</h4>
            <ul className="space-y-2">
              {copy.triggerSuggestions.map((trigger: string, index: number) => (
                <li key={index} className="text-sm">{trigger}</li>
              ))}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="variations" className="space-y-4">
          <Card className="p-4">
            <h4 className="font-medium mb-2">Variações de Tom</h4>
            <ul className="space-y-2">
              {copy.toneVariations.map((variation: string, index: number) => (
                <li key={index} className="text-sm">{variation}</li>
              ))}
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}