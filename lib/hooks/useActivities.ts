'use client'

import { useCallback, useMemo } from 'react'
import { useUserStorage } from './useUserStorage'
import { STORAGE_KEYS } from '../storage'
import { Activity } from '../activity'

export function useActivities() {
  const [activities, setActivities] = useUserStorage<Activity[]>({
    key: STORAGE_KEYS.ACTIVITIES,
    defaultValue: [],
  })

  const clearActivities = useCallback(() => {
    setActivities([])
  }, [setActivities])

  const addActivity = useCallback((activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity = {
      ...activity,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    }

    setActivities(prev => {
      const updated = [newActivity, ...prev]
      if (updated.length > 50) updated.pop() // Keep only last 50 activities
      return updated
    })

    return newActivity
  }, [setActivities])

  const getRecentActivities = useCallback((limit = 5) => {
    return activities.slice(0, limit)
  }, [activities])

  return useMemo(() => ({
    activities,
    clearActivities,
    addActivity,
    getRecentActivities,
  }), [
    activities,
    clearActivities,
    addActivity,
    getRecentActivities,
  ])
}