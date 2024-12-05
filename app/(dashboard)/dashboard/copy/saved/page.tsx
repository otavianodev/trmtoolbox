'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SavedCopies } from '@/components/copy/saved-copies'
import { CopyAnalytics } from '@/components/copy/copy-analytics'
import { useCopies } from '@/lib/hooks/useCopies'
import { useToast } from '@/components/ui/use-toast'

export default function SavedCopiesPage() {
  const { copies, updateCopy, deleteCopy } = useCopies()
  const [selectedTab, setSelectedTab] = useState('copies')
  const { toast } = useToast()

  const handleCopySelect = (copy: GeneratedCopy) => {
    navigator.clipboard.writeText(
      Object.values(copy.content)
        .filter(Boolean)
        .join('\n\n')
    )
    toast({
      title: 'Copy copiada!',
      description: 'O texto foi copiado para a área de transferência.',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Minhas Copys</h2>
        <p className="text-muted-foreground">
          Gerencie e analise suas copies salvas
        </p>
      </div>

      <Tabs defaultValue="copies" className="space-y-6">
        <TabsList>
          <TabsTrigger value="copies">Copies Salvas</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="copies">
          <Card className="p-6">
            <SavedCopies 
              copies={copies} 
              onCopySelect={handleCopySelect}
              onDelete={deleteCopy}
            />
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="p-6">
            <CopyAnalytics copies={copies} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}