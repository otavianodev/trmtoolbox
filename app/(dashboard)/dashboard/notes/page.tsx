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
import { NoteForm } from '@/components/notes/note-form'
import { NoteList } from '@/components/notes/note-list'
import { useNotes } from '@/lib/hooks/useNotes'

export interface Note {
  id: string
  title: string
  content: string
  category?: string
  createdAt: string
  updatedAt: string
  pinned?: boolean
}

export default function NotesPage() {
  const { notes, addNote, updateNote, deleteNote, togglePin } = useNotes()
  const [showNewNoteDialog, setShowNewNoteDialog] = useState(false)

  const handleAddNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    addNote(note)
    setShowNewNoteDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Bloco de Notas</h2>
          <p className="text-muted-foreground">
            Organize suas ideias e anotações importantes
          </p>
        </div>
        <Dialog open={showNewNoteDialog} onOpenChange={setShowNewNoteDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Nota
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nota</DialogTitle>
            </DialogHeader>
            <NoteForm onSubmit={handleAddNote} />
          </DialogContent>
        </Dialog>
      </div>

      {notes.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Você ainda não tem nenhuma nota
            </p>
            <Button variant="outline" onClick={() => setShowNewNoteDialog(true)}>
              Criar Primeira Nota
            </Button>
          </div>
        </Card>
      ) : (
        <NoteList
          notes={notes}
          onUpdate={updateNote}
          onDelete={deleteNote}
          onTogglePin={togglePin}
        />
      )}
    </div>
  )
}