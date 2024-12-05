'use client'

import { useCallback, useMemo } from 'react'
import { useUserStorage } from './useUserStorage'
import { STORAGE_KEYS } from '../storage'
import { Note } from '@/app/(dashboard)/dashboard/notes/page'

export function useNotes() {
  const [notes, setNotes] = useUserStorage<Note[]>({
    key: STORAGE_KEYS.NOTES,
    defaultValue: [],
  })

  const addNote = useCallback((note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote = {
      ...note,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setNotes(prev => [newNote, ...prev])
    return newNote
  }, [setNotes])

  const updateNote = useCallback((updatedNote: Note) => {
    setNotes(prev => prev.map(note =>
      note.id === updatedNote.id
        ? { ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    ))
  }, [setNotes])

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }, [setNotes])

  const togglePin = useCallback((id: string) => {
    setNotes(prev => prev.map(note =>
      note.id === id
        ? { ...note, pinned: !note.pinned }
        : note
    ))
  }, [setNotes])

  const getPinnedNotes = useCallback(() => {
    return notes.filter(note => note.pinned)
  }, [notes])

  const getNotesByCategory = useCallback((category: string) => {
    return notes.filter(note => note.category === category)
  }, [notes])

  return useMemo(() => ({
    notes,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    getPinnedNotes,
    getNotesByCategory,
  }), [
    notes,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    getPinnedNotes,
    getNotesByCategory,
  ])
}