'use client'

import { useCallback, useMemo } from 'react'
import { useUserStorage } from './useUserStorage'
import { STORAGE_KEYS, dispatchStorageEvent, EVENTS } from '../storage'
import { GeneratedCopy } from '@/app/(dashboard)/dashboard/copy/page'

interface StoredCopy extends GeneratedCopy {
  id: string
  createdAt: string
}

export function useCopies() {
  const [copies, setCopies] = useUserStorage<StoredCopy[]>({
    key: STORAGE_KEYS.COPIES,
    defaultValue: [],
  })

  const addCopy = useCallback((copy: GeneratedCopy) => {
    const newCopy = {
      ...copy,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }
    setCopies(prev => [newCopy, ...prev])
    dispatchStorageEvent(EVENTS.COPY_GENERATED)
    return newCopy
  }, [setCopies])

  const updateCopy = useCallback((updatedCopy: GeneratedCopy) => {
    if (!updatedCopy.id) return
    setCopies(prev => prev.map(copy =>
      copy.id === updatedCopy.id ? { ...updatedCopy, createdAt: copy.createdAt } : copy
    ))
  }, [setCopies])

  const deleteCopy = useCallback((id: string) => {
    const copy = copies.find(c => c.id === id)
    if (copy) {
      setCopies(prev => prev.filter(c => c.id !== id))
      return copy
    }
  }, [copies, setCopies])

  const getFolders = useCallback(() => {
    const folders = new Set(copies.map(copy => copy.folder).filter(Boolean))
    return Array.from(folders)
  }, [copies])

  const getCopiesByFolder = useCallback((folder: string) => {
    return copies.filter(copy => copy.folder === folder)
  }, [copies])

  const getRecentCopies = useCallback((limit = 5) => {
    return copies
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  }, [copies])

  const getMostUsedTypes = useCallback(() => {
    const typeCounts = copies.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(typeCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([type, count]) => ({ type, count }))
  }, [copies])

  return useMemo(() => ({
    copies,
    addCopy,
    updateCopy,
    deleteCopy,
    getFolders,
    getCopiesByFolder,
    getRecentCopies,
    getMostUsedTypes,
    copiesCount: copies.length,
  }), [
    copies,
    addCopy,
    updateCopy,
    deleteCopy,
    getFolders,
    getCopiesByFolder,
    getRecentCopies,
    getMostUsedTypes,
  ])
}