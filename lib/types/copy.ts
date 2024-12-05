export interface GeneratedCopy {
  id?: string
  type: 'creative' | 'landing-page' | 'instagram-bio' | 'promotion'
  content: {
    headline?: string
    subheadline?: string
    mainCopy: string
    bullets?: string[]
    cta?: string
    extras?: {
      abVariant?: string
      performance?: {
        views: number
        clicks: number
        conversions: number
      }
    }
  }
  score?: {
    clarity: number
    engagement: number
    seo: number
  }
  folder?: string
  createdAt?: string
}