'use client'

import { useCallback, useMemo } from 'react'
import { useUserStorage } from './useUserStorage'
import { STORAGE_KEYS } from '../storage'
import { UserProfile } from '../types/profile'

const defaultProfile: UserProfile = {
  id: '',
  niche: '',
  targetAudience: '',
  toneOfVoice: 'professional',
  businessType: '',
  objectives: [],
  brandVoice: {
    personality: [],
    values: [],
    keywords: []
  },
  competitors: [],
  uniqueSellingPoints: []
}

export function useProfile() {
  const [profile, setProfile] = useUserStorage<UserProfile>({
    key: STORAGE_KEYS.USER_PROFILE,
    defaultValue: defaultProfile,
  })

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...updates,
    }))
  }, [setProfile])

  return useMemo(() => ({
    profile,
    updateProfile,
  }), [profile, updateProfile])
}