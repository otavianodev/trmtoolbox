'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ChecklistForm } from '@/components/checklist/checklist-form'
import { ChecklistView } from '@/components/checklist/checklist-view'
import { ChecklistTemplates } from '@/components/checklist/checklist-templates'
import { useChecklists } from '@/lib/hooks/useChecklists'

export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
}

export interface Checklist {
  id: string
  title: string
  description: string
  items: ChecklistItem[]
  progress: number
}

export default function ChecklistPage() {
  const { checklists, addChecklist, updateChecklist, deleteChecklist } = useChecklists()
  const [showTemplates, setShowTemplates] = useState(false)
  const [showNewChecklistDialog, setShowNewChecklistDialog] = useState(false)

  const handleAddChecklist = (checklist: Omit<Checklist, 'id' | 'progress'>) => {
    const newChecklist = addChecklist(checklist)
    setShowNewChecklistDialog(false)
    return newChecklist
  }

  const handleUpdateChecklist = (updatedChecklist: Checklist) => {
    updateChecklist(updatedChecklist)
  }

  const handleDeleteChecklist = (id: string) => {
    return deleteChecklist(id)
  }

  const downloadChecklist = (checklist: Checklist) => {
    const content = `${checklist.title}\n\n${checklist.description}\n\nTarefas:\n${checklist.items
      .map((item) => `${item.completed ? '✓' : '☐'} ${item.text}`)
      .join('\n')}`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${checklist.title.toLowerCase().replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Checklists</h2>
          <p className="text-muted-foreground">
            Gerencie suas tarefas e projetos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowTemplates(true)}>
            Templates
          </Button>
          <Dialog open={showNewChecklistDialog} onOpenChange={setShowNewChecklistDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Checklist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Checklist</DialogTitle>
              </DialogHeader>
              <ChecklistForm onSubmit={handleAddChecklist} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Templates de Checklist</DialogTitle>
          </DialogHeader>
          <ChecklistTemplates onUseTemplate={handleAddChecklist} />
        </DialogContent>
      </Dialog>

      {checklists.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Você ainda não tem nenhuma checklist
            </p>
            <Button variant="outline" onClick={() => setShowTemplates(true)}>
              Usar um Template
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {checklists.map((checklist) => (
            <ChecklistView
              key={checklist.id}
              checklist={checklist}
              onUpdate={handleUpdateChecklist}
              onDelete={handleDeleteChecklist}
              onDownload={downloadChecklist}
            />
          ))}
        </div>
      )}
    </div>
  )
}