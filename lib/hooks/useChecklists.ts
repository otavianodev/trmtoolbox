'use client'

import { useCallback, useMemo } from 'react'
import { useUserStorage } from './useUserStorage'
import { STORAGE_KEYS, dispatchStorageEvent, EVENTS } from '../storage'
import { Checklist } from '@/app/(dashboard)/dashboard/checklist/page'
import { trackChecklist } from '@/lib/activity'

export function useChecklists() {
  const [checklists, setChecklists] = useUserStorage<Checklist[]>({
    key: STORAGE_KEYS.CHECKLISTS,
    defaultValue: [],
  })

  const addChecklist = useCallback((checklist: Omit<Checklist, 'id' | 'progress'>) => {
    const newChecklist = {
      ...checklist,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
    }
    setChecklists(prev => [...prev, newChecklist])
    trackChecklist(newChecklist, 'created')
    dispatchStorageEvent(EVENTS.CHECKLIST_UPDATED)
    return newChecklist
  }, [setChecklists])

  const updateChecklist = useCallback((updatedChecklist: Checklist) => {
    setChecklists(prev => prev.map(checklist =>
      checklist.id === updatedChecklist.id ? updatedChecklist : checklist
    ))
    trackChecklist(updatedChecklist, 'updated')
    dispatchStorageEvent(EVENTS.CHECKLIST_UPDATED)
  }, [setChecklists])

  const deleteChecklist = useCallback((id: string) => {
    const checklist = checklists.find(c => c.id === id)
    if (checklist) {
      setChecklists(prev => prev.filter(c => c.id !== id))
      trackChecklist(checklist, 'deleted')
      dispatchStorageEvent(EVENTS.CHECKLIST_UPDATED)
      return checklist
    }
  }, [checklists, setChecklists])

  const getPendingTasksCount = useCallback(() => {
    return checklists.reduce((acc, curr) => {
      return acc + curr.items.filter(item => !item.completed).length
    }, 0)
  }, [checklists])

  const getCompletedTasksCount = useCallback(() => {
    return checklists.reduce((acc, curr) => {
      return acc + curr.items.filter(item => item.completed).length
    }, 0)
  }, [checklists])

  return useMemo(() => ({
    checklists,
    addChecklist,
    updateChecklist,
    deleteChecklist,
    getPendingTasksCount,
    getCompletedTasksCount,
  }), [
    checklists,
    addChecklist,
    updateChecklist,
    deleteChecklist,
    getPendingTasksCount,
    getCompletedTasksCount,
  ])
}