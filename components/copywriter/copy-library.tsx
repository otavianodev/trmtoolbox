'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Copy } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface CopyLibraryProps {
  onSelectTrigger: (trigger: string) => void
}

export function CopyLibrary({ onSelectTrigger }: CopyLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const triggers = {
    'Urgência': [
      'Últimas vagas',
      'Oferta por tempo limitado',
      'Termina hoje'
    ],
    'Escassez': [
      'Apenas 5 unidades',
      'Vagas limitadas',
      'Turma exclusiva'
    ],
    'Prova Social': [
      'Mais de 1000 alunos',
      'Aprovado por especialistas',
      'Histórias de sucesso'
    ],
    'Autoridade': [
      'Método certificado',
      'Reconhecido pelo mercado',
      'Líder no segmento'
    ]
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast({
      title: 'Copiado!',
      description: 'Gatilho copiado para a área de transferência.',
    })
  }

  const filteredTriggers = Object.entries(triggers).reduce((acc, [category, items]) => {
    const filtered = items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
    if (filtered.length > 0) {
      acc[category] = filtered
    }
    return acc
  }, {} as Record<string, string[]>)

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Buscar gatilhos mentais..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {Object.entries(filteredTriggers).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-3">{category}</h3>
            <div className="grid gap-3">
              {items.map((trigger, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">{category}</Badge>
                      <span>{trigger}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(trigger)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}