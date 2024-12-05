'use client'

import { useAuth } from '@/components/auth-provider'
import { useStorage } from './useStorage'
import { StorageConfig } from '../storage'

export function useUserStorage<T>(config: StorageConfig<T>) {
  const { user } = useAuth()
  const userKey = user ? `${config.key}_${user.id}` : config.key

  return useStorage<T>({
    ...config,
    key: userKey,
  })
}