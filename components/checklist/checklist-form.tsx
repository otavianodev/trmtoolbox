'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'
import { Checklist, ChecklistItem } from '@/app/(dashboard)/dashboard/checklist/page'
import { DialogClose } from '@/components/ui/dialog'

interface ChecklistFormProps {
  onSubmit: (checklist: Omit<Checklist, 'id' | 'progress'>) => void
  initialData?: Omit<Checklist, 'id' | 'progress'>
}

export function ChecklistForm({ onSubmit, initialData }: ChecklistFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [items, setItems] = useState<Omit<ChecklistItem, 'id'>[]>(
    initialData?.items.map(({ text, completed }) => ({ text, completed })) || [
      { text: '', completed: false },
    ]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      description,
      items: items.map((item) => ({
        ...item,
        id: Math.random().toString(36).substr(2, 9),
      })),
    })
  }

  const addItem = () => {
    setItems([...items, { text: '', completed: false }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, text: string) => {
    setItems(
      items.map((item, i) => (i === index ? { ...item, text } : item))
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Título</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nome da checklist"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Descrição</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva o objetivo desta checklist"
          rows={3}
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Itens</label>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item.text}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={`Item ${index + 1}`}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              disabled={items.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <DialogClose asChild>
        <Button type="submit" className="w-full">
          Salvar Checklist
        </Button>
      </DialogClose>
    </form>
  )
}