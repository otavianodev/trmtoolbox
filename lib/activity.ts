import { GeneratedCopy } from '@/app/(dashboard)/dashboard/copy/page'
import { Transaction } from '@/app/(dashboard)/dashboard/financeiro/page'
import { Checklist } from '@/app/(dashboard)/dashboard/checklist/page'
import { STORAGE_KEYS, dispatchStorageEvent, EVENTS } from './storage'

export type Activity = {
  id: string
  type: 'copy' | 'transaction' | 'checklist'
  action: string
  description: string
  timestamp: string
  details?: any
}

export function addActivity(activity: Omit<Activity, 'id' | 'timestamp'>) {
  const activities = getActivities()
  const newActivity = {
    ...activity,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
  }
  
  activities.unshift(newActivity)
  if (activities.length > 50) activities.pop() // Keep only last 50 activities
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities))
  }
  
  dispatchStorageEvent(EVENTS.ACTIVITY_ADDED, { detail: newActivity })
  
  return newActivity
}

export function getActivities(): Activity[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITIES)
  return stored ? JSON.parse(stored) : []
}

// Helper functions for different activity types
export function trackCopyGeneration(copy: GeneratedCopy) {
  return addActivity({
    type: 'copy',
    action: 'created',
    description: `Copy gerada: ${copy.type}`,
    details: copy
  })
}

export function trackTransaction(transaction: Transaction, action: 'added' | 'deleted') {
  return addActivity({
    type: 'transaction',
    action,
    description: `${action === 'added' ? 'Nova' : 'Removida'} ${
      transaction.type === 'income' ? 'receita' : 'despesa'
    }: ${transaction.description}`,
    details: transaction
  })
}

export function trackChecklist(checklist: Checklist, action: 'created' | 'updated' | 'deleted') {
  return addActivity({
    type: 'checklist',
    action,
    description: `Checklist ${
      action === 'created' ? 'criada' : action === 'updated' ? 'atualizada' : 'removida'
    }: ${checklist.title}`,
    details: checklist
  })
}