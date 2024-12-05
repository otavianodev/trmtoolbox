'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { CopyContent } from '@/app/(dashboard)/dashboard/copywriter/page'

interface CopyPreviewProps {
  copy: CopyContent | null
}

export function CopyPreview({ copy }: CopyPreviewProps) {
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
        Preencha o formulário para visualizar sua copy
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Preview do Criativo</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCopy(`${copy.headline}\n\n${copy.mainCopy}\n\n${copy.cta}`)}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copiar Tudo
        </Button>
      </div>

      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Headline</h4>
          <p className="text-xl font-semibold">{copy.headline}</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Corpo do Texto</h4>
          <p className="whitespace-pre-line">{copy.mainCopy}</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Call to Action</h4>
          <p className="font-medium text-primary">{copy.cta}</p>
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Tipo: {copy.type === 'paid-ad' ? 'Anúncio Pago' : 
              copy.type === 'engagement-post' ? 'Post de Engajamento' : 
              'Página de Vendas'}</span>
            <span>Framework: {copy.framework.toUpperCase()}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Público-alvo: {copy.targetAudience}
          </div>
        </div>
      </Card>
    </div>
  )
}