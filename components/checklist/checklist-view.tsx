'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { Download, Edit, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ChecklistForm } from './checklist-form'
import { Checklist } from '@/app/(dashboard)/dashboard/checklist/page'

interface ChecklistViewProps {
  checklist: Checklist
  onUpdate: (checklist: Checklist) => void
  onDelete: (id: string) => void
  onDownload: (checklist: Checklist) => void
}

export function ChecklistView({
  checklist,
  onUpdate,
  onDelete,
  onDownload,
}: ChecklistViewProps) {
  const [isEditing, setIsEditing] = useState(false)

  const toggleItem = (itemId: string) => {
    const updatedItems = checklist.items.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    )
    const completedCount = updatedItems.filter((item) => item.completed).length
    const progress = (completedCount / updatedItems.length) * 100

    onUpdate({
      ...checklist,
      items: updatedItems,
      progress,
    })
  }

  const handleEdit = (data: Omit<Checklist, 'id' | 'progress'>) => {
    onUpdate({
      ...checklist,
      ...data,
      progress:
        (data.items.filter((item) => item.completed).length /
          data.items.length) *
        100,
    })
    setIsEditing(false)
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{checklist.title}</h3>
            <p className="text-sm text-muted-foreground">
              {checklist.description}
            </p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Checklist</DialogTitle>
                </DialogHeader>
                <ChecklistForm
                  onSubmit={handleEdit}
                  initialData={checklist}
                />
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDownload(checklist)}
            >
              <Download className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir Checklist</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir esta checklist? Esta ação não
                    pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(checklist.id)}>
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Progress value={checklist.progress} className="h-2" />

        <div className="space-y-2">
          {checklist.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                checked={item.completed}
                onCheckedChange={() => toggleItem(item.id)}
              />
              <span
                className={`text-sm ${
                  item.completed ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}