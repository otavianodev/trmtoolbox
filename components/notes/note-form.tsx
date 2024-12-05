'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Note } from '@/app/(dashboard)/dashboard/notes/page'

interface NoteFormProps {
  onSubmit: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void
  initialData?: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
}

const categories = [
  'Ideias',
  'Tarefas',
  'Reuniões',
  'Projetos',
  'Pessoal',
  'Outros'
]

export function NoteForm({ onSubmit, initialData }: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [category, setCategory] = useState(initialData?.category || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      content,
      category,
      pinned: false
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Título</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da nota"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Categoria</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Conteúdo</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite sua nota..."
          rows={8}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        {initialData ? 'Atualizar Nota' : 'Criar Nota'}
      </Button>
    </form>
  )
}