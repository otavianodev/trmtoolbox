'use client'

export interface StorageConfig<T> {
  key: string
  defaultValue: T
}

export const STORAGE_KEYS = {
  TRANSACTIONS: 'transactions',
  COPIES: 'generatedCopies',
  CHECKLISTS: 'checklists',
  ACTIVITIES: 'trm_toolbox_activities',
  USER_PREFERENCES: 'user_preferences',
  NOTES: 'notes',
} as const

export function getStorageItem<T>(config: StorageConfig<T>): T {
  if (typeof window === 'undefined') return config.defaultValue
  try {
    const stored = localStorage.getItem(config.key)
    return stored ? JSON.parse(stored) : config.defaultValue
  } catch (error) {
    console.error(`Error reading from storage for key ${config.key}:`, error)
    return config.defaultValue
  }
}

export function setStorageItem<T>(config: StorageConfig<T>, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(config.key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing to storage for key ${config.key}:`, error)
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing item for key ${key}:`, error)
  }
}

export function clearStorage(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error clearing storage:', error)
  }
}

export const EVENTS = {
  TRANSACTION_UPDATED: 'transactionUpdated',
  COPY_GENERATED: 'copyGenerated',
  CHECKLIST_UPDATED: 'checklistUpdated',
  ACTIVITY_ADDED: 'activityAdded',
} as const

export function dispatchStorageEvent(eventName: string, detail?: any) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent(eventName, detail ? { detail } : undefined)
  )
}