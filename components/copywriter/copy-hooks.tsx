'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Copy } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const hooks = {
  'Perguntas Intrigantes': {
    description: 'Desperte curiosidade com perguntas provocativas',
    examples: [
      'Você sabia que 90% dos empreendedores cometem esse erro?',
      'E se você pudesse dobrar sua renda em 60 dias?',
      'Qual é o segredo dos empresários de sucesso?',
      'Por que algumas pessoas sempre conseguem o que querem?'
    ]
  },
  'Fatos Surpreendentes': {
    description: 'Use dados e estatísticas impactantes',
    examples: [
      'Descoberta revolucionária aumenta vendas em 312%',
      'Estudo revela: 83% das empresas estão perdendo dinheiro assim',
      'A verdade que ninguém te conta sobre marketing digital',
      'O método secreto usado por 7 entre 10 empresas de sucesso'
    ]
  },
  'Histórias Curtas': {
    description: 'Crie conexão emocional através de narrativas',
    examples: [
      'Há 2 anos eu estava falido. Hoje faturo 6 dígitos. Quer saber como?',
      'Ela começou do zero e hoje tem um império. A história de Maria vai te inspirar',
      'De demitido a empresário de sucesso em 12 meses',
      'Como transformei uma ideia simples em um negócio milionário'
    ]
  },
  'Desafios': {
    description: 'Provoque o leitor a tomar uma atitude',
    examples: [
      'Aceita o desafio de 30 dias para transformar seu negócio?',
      'Pronto para dar o próximo passo na sua carreira?',
      'Você tem coragem de mudar sua vida hoje?',
      'Quer provar que está pronto para o sucesso?'
    ]
  },
  'Promessas': {
    description: 'Faça promessas específicas e mensuráveis',
    examples: [
      'Aprenda a vender todos os dias nas redes sociais',
      'Dobre suas vendas em 90 dias ou seu dinheiro de volta',
      'Desbloqueie o segredo do sucesso nos negócios',
      'Transforme sua empresa em uma máquina de vendas'
    ]
  }
}

export function CopyHooks() {
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast({
      title: 'Copiado!',
      description: 'Hook copiado para a área de transferência.',
    })
  }

  const filteredHooks = Object.entries(hooks).reduce((acc, [category, content]) => {
    const matchesSearch = 
      category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.examples.some(ex => ex.toLowerCase().includes(searchTerm.toLowerCase()))

    if (matchesSearch) {
      acc[category] = content
    }
    return acc
  }, {} as typeof hooks)

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Buscar hooks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6">
        {Object.entries(filteredHooks).map(([category, content]) => (
          <Card key={category} className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{category}</h3>
                <p className="text-sm text-muted-foreground">{content.description}</p>
              </div>

              <div className="grid gap-3">
                {content.examples.map((example, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary">{category}</Badge>
                        <span className="text-sm">{example}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(example)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}