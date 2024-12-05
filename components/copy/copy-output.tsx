'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy, Trash2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { GeneratedCopy } from '@/app/(dashboard)/dashboard/copy/page'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

interface CopyOutputProps {
  copy: GeneratedCopy | null
  onSave: (copy: GeneratedCopy) => void
  onUpdate: (copy: GeneratedCopy) => void
  onDelete: () => void
}

export function CopyOutput({ copy, onSave, onUpdate, onDelete }: CopyOutputProps) {
  const { toast } = useToast()
  const [isSaved, setIsSaved] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<string>('formal')

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast({
      title: 'Copiado!',
      description: 'Texto copiado para a área de transferência.',
    })
  }

  const handleSave = () => {
    if (copy) {
      onSave(copy)
      setIsSaved(true)
      toast({
        title: 'Bio salva!',
        description: 'A bio foi salva com sucesso.',
      })
    }
  }

  if (!copy) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        Preencha o formulário para gerar sua bio
      </div>
    )
  }

  const versions = copy.content.extras?.versions || {}
  const currentVersion = versions[selectedVersion as keyof typeof versions]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Bio Gerada</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Limpar
          </Button>
          {!isSaved && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
            >
              <Copy className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="formal" onValueChange={setSelectedVersion}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="formal">Formal</TabsTrigger>
          <TabsTrigger value="informal">Informal</TabsTrigger>
          <TabsTrigger value="emocional">Emocional</TabsTrigger>
          <TabsTrigger value="autoridade">Autoridade</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedVersion} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Card className="p-3 relative group">
              <p className="whitespace-pre-line">{currentVersion?.bio}</p>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleCopy(currentVersion?.bio)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </Card>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Texto para Link</label>
            <Card className="p-3 relative group">
              <p>{currentVersion?.linkText}</p>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleCopy(currentVersion?.linkText)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </Card>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Hashtags Sugeridas</label>
            <Card className="p-3 relative group">
              <p>{currentVersion?.hashtags.join(' ')}</p>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleCopy(currentVersion?.hashtags.join(' '))}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </Card>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">CTA para Stories</label>
            <Card className="p-3 relative group">
              <p>{currentVersion?.storiesCta}</p>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleCopy(currentVersion?.storiesCta)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </Card>
          </div>

          {copy.content.extras?.proofSuggestions && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Sugestões de Prova Social</label>
              <Card className="p-3">
                <ul className="space-y-1 list-disc list-inside">
                  {copy.content.extras.proofSuggestions.map((proof, index) => (
                    <li key={index} className="text-sm">{proof}</li>
                  ))}
                </ul>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}