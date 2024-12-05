'use client'

import { useState, useEffect, useCallback } from 'react'
import { getStorageItem, setStorageItem, StorageConfig } from '../storage'

export function useStorage<T>(config: StorageConfig<T>) {
  const [value, setValue] = useState<T>(() => getStorageItem(config))

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === config.key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : config.defaultValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [config.key, config.defaultValue])

  const updateValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const nextValue = typeof newValue === 'function' 
        ? (newValue as ((prev: T) => T))(prev)
        : newValue
      setStorageItem(config, nextValue)
      return nextValue
    })
  }, [config])

  return [value, updateValue] as const
}