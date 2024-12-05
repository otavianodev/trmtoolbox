import { GeneratedCopy } from '@/app/(dashboard)/dashboard/copy/page'

interface ABTestingOptions {
  originalCopy: GeneratedCopy
  variations: {
    headline?: boolean
    mainCopy?: boolean
    cta?: boolean
  }
}

export function generateABVariant(options: ABTestingOptions): GeneratedCopy {
  const { originalCopy, variations } = options
  const variant = { ...originalCopy }

  if (variations.headline && variant.content.headline) {
    variant.content.headline = generateVariation(variant.content.headline, 'headline')
  }

  if (variations.mainCopy) {
    variant.content.mainCopy = generateVariation(variant.content.mainCopy, 'mainCopy')
  }

  if (variations.cta && variant.content.cta) {
    variant.content.cta = generateVariation(variant.content.cta, 'cta')
  }

  return {
    ...variant,
    content: {
      ...variant.content,
      extras: {
        ...variant.content.extras,
        abVariant: 'B'
      }
    }
  }
}

function generateVariation(text: string, type: 'headline' | 'mainCopy' | 'cta'): string {
  const variations = {
    headline: [
      (text: string) => text.replace(/Descubra|Conheça/, 'Revolucione'),
      (text: string) => `🔥 ${text}`,
      (text: string) => text.replace(/como|qual/, 'o segredo para'),
    ],
    mainCopy: [
      (text: string) => text.replace(/ajudamos|oferecemos/, 'transformamos'),
      (text: string) => text.split('. ').map(s => `✨ ${s}`).join('. '),
      (text: string) => text.replace(/método|sistema/, 'framework exclusivo'),
    ],
    cta: [
      (text: string) => text.replace(/Começar|Iniciar/, 'Garantir Acesso'),
      (text: string) => `${text} 🚀`,
      (text: string) => text.replace(/agora|hoje/, 'enquanto há vagas'),
    ]
  }

  const variationFunctions = variations[type]
  const randomVariation = variationFunctions[Math.floor(Math.random() * variationFunctions.length)]
  
  return randomVariation(text)
}

export function trackABTestPerformance(copyId: string, variant: 'A' | 'B', action: 'view' | 'click' | 'conversion') {
  // In a real implementation, this would track performance metrics
  return {
    views: Math.floor(Math.random() * 1000),
    clicks: Math.floor(Math.random() * 100),
    conversions: Math.floor(Math.random() * 10)
  }
}