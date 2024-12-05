'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Copy } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const frameworks = [
  {
    name: 'AIDA',
    description: 'Atenção, Interesse, Desejo, Ação',
    steps: [
      'Atenção: Capture a atenção do leitor com um headline impactante',
      'Interesse: Desperte o interesse mostrando benefícios relevantes',
      'Desejo: Crie desejo apresentando casos de sucesso e provas sociais',
      'Ação: Guie para uma ação clara e específica'
    ],
    example: `🎯 Atenção empreendedores! (A)
Descubra como triplicar suas vendas em 90 dias usando nossa metodologia comprovada. (I)
Já ajudamos mais de 1000 empresários a alcançarem resultados extraordinários. (D)
Clique agora e agende sua consultoria gratuita! (A)`
  },
  {
    name: 'PAS',
    description: 'Problema, Agitação, Solução',
    steps: [
      'Problema: Identifique a dor do seu público',
      'Agitação: Amplifique o problema e suas consequências',
      'Solução: Apresente sua solução como a resposta ideal'
    ],
    example: `Cansado de perder vendas por falta de estratégia? (P)
A cada dia que passa, seus concorrentes estão conquistando mais clientes enquanto você continua estagnado. (A)
Nosso programa de mentoria vai te ensinar o passo a passo para criar um funil de vendas lucrativo! (S)`
  },
  {
    name: 'FAB',
    description: 'Características, Benefícios, Provas',
    steps: [
      'Features: Liste as principais características',
      'Advantages: Mostre as vantagens de cada característica',
      'Benefits: Explique os benefícios reais para o cliente'
    ],
    example: `✨ Plataforma all-in-one (F)
Gerencie todos seus projetos em um só lugar, economizando tempo e recursos (A)
Aumente sua produtividade em até 3x e foque no que realmente importa (B)`
  },
  {
    name: '4 Ps',
    description: 'Problema, Promessa, Prova, Proposta',
    steps: [
      'Picture: Descreva o cenário atual',
      'Promise: Faça uma promessa poderosa',
      'Prove: Comprove sua promessa',
      'Push: Incentive a ação'
    ],
    example: `Sua empresa está perdendo dinheiro com marketing ineficiente? (P)
Garanto que você vai dobrar seu ROI em 60 dias ou menos (P)
Veja como mais de 500 empresas já alcançaram esse resultado (P)
Comece agora com 50% de desconto na primeira mensalidade (P)`
  },
  {
    name: 'BAB',
    description: 'Before-After-Bridge',
    steps: [
      'Before: Mostre a situação atual',
      'After: Pinte o cenário ideal',
      'Bridge: Explique como chegar lá'
    ],
    example: `Você está lutando para conseguir clientes nas redes sociais? (B)
Imagine ter uma agenda cheia de clientes ideais todos os meses (A)
Nosso método vai te ensinar o passo a passo para fazer essa transformação (B)`
  }
]

export function CopyFrameworks() {
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast({
      title: 'Copiado!',
      description: 'Exemplo copiado para a área de transferência.',
    })
  }

  const filteredFrameworks = frameworks.filter(framework =>
    framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    framework.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Buscar frameworks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6">
        {filteredFrameworks.map((framework) => (
          <Card key={framework.name} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{framework.name}</h3>
                  <p className="text-sm text-muted-foreground">{framework.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(framework.example)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Como aplicar:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {framework.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Exemplo:</h4>
                <Card className="p-4 bg-muted">
                  <p className="text-sm whitespace-pre-line">{framework.example}</p>
                </Card>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}