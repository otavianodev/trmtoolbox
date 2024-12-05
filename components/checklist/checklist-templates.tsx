'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checklist } from '@/app/(dashboard)/dashboard/checklist/page'
import { FileCheck, Rocket, Layout } from 'lucide-react'

interface ChecklistTemplatesProps {
  onUseTemplate: (checklist: Omit<Checklist, 'id' | 'progress'>) => void
}

const templates = [
  {
    title: 'Lançamento de Produto',
    description: 'Checklist completa para lançamento de produto digital',
    icon: Rocket,
    items: [
      { text: 'Definir público-alvo', completed: false },
      { text: 'Criar página de vendas', completed: false },
      { text: 'Preparar material promocional', completed: false },
      { text: 'Configurar checkout', completed: false },
      { text: 'Testar funil de vendas', completed: false },
      { text: 'Preparar e-mails de lançamento', completed: false },
      { text: 'Configurar pixel de rastreamento', completed: false },
      { text: 'Definir estratégia de tráfego', completed: false },
    ],
  },
  {
    title: 'Landing Page',
    description: 'Template para criação de landing page de alta conversão',
    icon: Layout,
    items: [
      { text: 'Definir headline principal', completed: false },
      { text: 'Criar seção de benefícios', completed: false },
      { text: 'Adicionar depoimentos', completed: false },
      { text: 'Incluir garantia', completed: false },
      { text: 'Criar seção de FAQ', completed: false },
      { text: 'Otimizar CTA principal', completed: false },
      { text: 'Adicionar elementos de prova social', completed: false },
      { text: 'Testar responsividade', completed: false },
    ],
  },
  {
    title: 'Criação de Conteúdo',
    description: 'Checklist para produção de conteúdo de qualidade',
    icon: FileCheck,
    items: [
      { text: 'Pesquisar palavras-chave', completed: false },
      { text: 'Criar estrutura do conteúdo', completed: false },
      { text: 'Escrever primeiro rascunho', completed: false },
      { text: 'Adicionar imagens e mídia', completed: false },
      { text: 'Revisar SEO on-page', completed: false },
      { text: 'Fazer correção ortográfica', completed: false },
      { text: 'Otimizar meta descrição', completed: false },
      { text: 'Programar publicação', completed: false },
    ],
  },
]

export function ChecklistTemplates({ onUseTemplate }: ChecklistTemplatesProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => {
        const Icon = template.icon
        return (
          <Card key={template.title} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{template.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {template.items.slice(0, 3).map((item, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    • {item.text}
                  </p>
                ))}
                {template.items.length > 3 && (
                  <p className="text-sm text-muted-foreground">
                    E mais {template.items.length - 3} itens...
                  </p>
                )}
              </div>
              <Button
                className="w-full"
                onClick={() =>
                  onUseTemplate({
                    title: template.title,
                    description: template.description,
                    items: template.items.map((item) => ({
                      ...item,
                      id: Math.random().toString(36).substr(2, 9),
                    })),
                  })
                }
              >
                Usar Template
              </Button>
            </div>
          </Card>
        )
      })}
    </div>
  )
}