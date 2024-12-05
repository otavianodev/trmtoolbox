'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Copy } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const triggers = {
  'Urgência': {
    description: 'Crie senso de urgência para motivar ação imediata',
    examples: [
      'Últimas 24 horas para aproveitar',
      'Promoção termina hoje',
      'Apenas 5 vagas disponíveis',
      'Bônus exclusivo por tempo limitado'
    ]
  },
  'Escassez': {
    description: 'Use a limitação de recursos para aumentar o valor percebido',
    examples: [
      'Vagas limitadas',
      'Edição especial',
      'Turma exclusiva com apenas 20 alunos',
      'Produto em pré-venda'
    ]
  },
  'Prova Social': {
    description: 'Demonstre credibilidade através de resultados e depoimentos',
    examples: [
      'Mais de 10.000 alunos satisfeitos',
      'Aprovado por especialistas',
      'Usado pelas maiores empresas',
      'Histórias de sucesso reais'
    ]
  },
  'Autoridade': {
    description: 'Estabeleça credibilidade e expertise',
    examples: [
      'Metodologia certificada',
      'Reconhecido internacionalmente',
      'Baseado em pesquisas científicas',
      'Desenvolvido por especialistas'
    ]
  },
  'Reciprocidade': {
    description: 'Ofereça valor para criar senso de retribuição',
    examples: [
      'E-book gratuito',
      'Consultoria inicial sem custo',
      'Bônus exclusivos',
      'Conteúdo premium liberado'
    ]
  },
  'Exclusividade': {
    description: 'Crie desejo através do acesso restrito',
    examples: [
      'Apenas para membros VIP',
      'Acesso antecipado',
      'Conteúdo exclusivo',
      'Grupo seleto'
    ]
  }
}

export function CopyTriggers() {
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast({
      title: 'Copiado!',
      description: 'Gatilho copiado para a área de transferência.',
    })
  }

  const filteredTriggers = Object.entries(triggers).reduce((acc, [category, content]) => {
    const matchesSearch = 
      category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.examples.some(ex => ex.toLowerCase().includes(searchTerm.toLowerCase()))

    if (matchesSearch) {
      acc[category] = content
    }
    return acc
  }, {} as typeof triggers)

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

      <div className="grid gap-6">
        {Object.entries(filteredTriggers).map(([category, content]) => (
          <Card key={category} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <p className="text-sm text-muted-foreground">{content.description}</p>
                </div>
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