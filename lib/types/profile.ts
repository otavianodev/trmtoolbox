export interface UserProfile {
  id: string
  niche: string
  targetAudience: string
  toneOfVoice: 'professional' | 'casual' | 'friendly' | 'formal'
  businessType: string
  objectives: string[]
  brandVoice: {
    personality: string[]
    values: string[]
    keywords: string[]
  }
  competitors: string[]
  uniqueSellingPoints: string[]
}