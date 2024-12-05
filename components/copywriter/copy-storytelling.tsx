'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Copy } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const storytelling = {
  'Jornada do Herói': {
    description: 'Use a estrutura clássica para criar histórias envolventes',
    steps: [
      'Situação Inicial: Apresente o personagem e seu contexto',
      'Chamado à Aventura: Mostre o momento de mudança',
      'Desafios: Relate as dificuldades enfrentadas',
      'Mentoria: Introduza a solução/mentor',
      'Transformação: Mostre os resultados alcançados'
    ],
    example: `Maria era uma empreendedora lutando para manter sua loja de roupas (Inicial).
Um dia, ela descobriu que precisava se reinventar ou fecharia as portas (Chamado).
Enfrentou medos, dúvidas e críticas ao migrar para o digital (Desafios).
Conheceu nossa mentoria e aprendeu estratégias comprovadas (Mentoria).
Hoje seu faturamento cresceu 300% e ela inspira outras empreendedoras (Transformação).`
  },
  'Antes e Depois': {
    description: 'Contraste a situação inicial com os resultados',
    steps: [
      'Dor Inicial: Descreva o problema/situação',
      'Ponto de Virada: Momento de descoberta',
      'Solução: Apresente sua oferta',
      'Resultados: Mostre a transformação',
      'Prova: Adicione elementos de credibilidade'
    ],
    example: `Trabalhava 12h por dia e mal via minha família (Antes).
Descobri um método para automatizar meu negócio (Virada).
Implementei o sistema passo a passo (Solução).
Hoje trabalho 6h diárias e faturo o dobro (Depois).
E já ajudei +100 empresários a conquistar o mesmo (Prova).`
  },
  'Case de Sucesso': {
    description: 'Conte histórias reais de transformação',
    steps: [
      'Contexto: Apresente o cliente e sua situação',
      'Problema: Detalhe os desafios enfrentados',
      'Solução: Mostre como seu produto/serviço ajudou',
      'Resultados: Compartilhe números e conquistas',
      'Depoimento: Adicione uma citação do cliente'
    ],
    example: `João tinha uma pequena consultoria que não escalava (Contexto).
Gastava fortunas com marketing sem resultados (Problema).
Implementou nossa metodologia de vendas orgânicas (Solução).
Em 6 meses, triplicou sua base de clientes (Resultados).
"Foi a melhor decisão que tomei para meu negócio" - João Silva (Depoimento).`
  },
  'Storytelling Emocional': {
    description: 'Crie conexão através de histórias emocionantes',
    steps: [
      'Vulnerabilidade: Mostre o lado humano',
      'Conflito: Apresente as dificuldades',
      'Superação: Relate como venceu',
      'Aprendizado: Compartilhe as lições',
      'Inspiração: Motive outros a agirem'
    ],
    example: `Perdi tudo o que tinha construído em 10 anos (Vulnerabilidade).
Precisava recomeçar do zero, com 2 filhos para criar (Conflito).
Descobri um novo caminho através do marketing digital (Superação).
Aprendi que é possível reinventar-se em qualquer idade (Aprendizado).
Hoje ajudo outros a não desistirem dos seus sonhos (Inspiração).`
  }
}

export function CopyStorytelling() {
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast({
      title: 'Copiado!',
      description: 'Exemplo copiado para a área de transferência.',
    })
  }

  const filteredStorytelling = Object.entries(storytelling).filter(([category, content]) =>
    category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.steps.some(step => step.toLowerCase().includes(searchTerm.toLowerCase())) ||
    content.example.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Buscar técnicas de storytelling..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6">
        {filteredStorytelling.map(([category, content]) => (
          <Card key={category} className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{category}</h3>
                <p className="text-sm text-muted-foreground">{content.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Estrutura:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {content.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Exemplo:</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(content.example)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Card className="p-4 bg-muted">
                  <p className="text-sm whitespace-pre-line">{content.example}</p>
                </Card>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}