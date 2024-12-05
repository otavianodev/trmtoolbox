interface AnalyzeOptions {
  text: string
  type: string
  targetAudience: string
  objective: string
}

export function analyzeCopy(options: AnalyzeOptions) {
  const { text, type, targetAudience, objective } = options

  // Simulate AI-based analysis
  const clarity = analyzeClarity(text)
  const engagement = analyzeEngagement(text, targetAudience)
  const seo = analyzeSEO(text, type)

  return {
    clarity,
    engagement,
    seo,
    suggestions: generateSuggestions(text, {
      clarity,
      engagement,
      seo,
      targetAudience,
      objective
    })
  }
}

function analyzeClarity(text: string) {
  // Simulated clarity analysis
  const factors = {
    sentenceLength: 0.3,
    readabilityScore: 0.4,
    complexWords: 0.3
  }

  const avgWordsPerSentence = text.split(/[.!?]+/).reduce((acc, sentence) => 
    acc + sentence.trim().split(/\s+/).length, 0) / text.split(/[.!?]+/).length

  const readabilityScore = avgWordsPerSentence < 20 ? 100 : 
    avgWordsPerSentence < 25 ? 80 : 
    avgWordsPerSentence < 30 ? 60 : 40

  return Math.round(readabilityScore)
}

function analyzeEngagement(text: string, targetAudience: string) {
  // Simulated engagement analysis
  const factors = {
    emotionalWords: 0.3,
    personalPronouns: 0.3,
    callToAction: 0.4
  }

  const hasEmotionalWords = text.match(/amazing|incredible|transform|discover/gi)
  const hasPersonalPronouns = text.match(/you|your|we|our/gi)
  const hasCallToAction = text.match(/click|now|today|start|begin|get/gi)

  const score = 
    (hasEmotionalWords ? factors.emotionalWords : 0) +
    (hasPersonalPronouns ? factors.personalPronouns : 0) +
    (hasCallToAction ? factors.callToAction : 0)

  return Math.round(score * 100)
}

function analyzeSEO(text: string, type: string) {
  // Simulated SEO analysis
  const factors = {
    keywordDensity: 0.4,
    headingStructure: 0.3,
    metaElements: 0.3
  }

  const hasKeywords = text.length > 100
  const hasHeadings = text.includes('#') || text.includes('*')
  const hasMeta = type === 'landing-page'

  const score = 
    (hasKeywords ? factors.keywordDensity : 0) +
    (hasHeadings ? factors.headingStructure : 0) +
    (hasMeta ? factors.metaElements : 0)

  return Math.round(score * 100)
}

function generateSuggestions(text: string, scores: any) {
  const suggestions = []

  if (scores.clarity < 70) {
    suggestions.push('Considere simplificar as frases para melhorar a clareza.')
  }

  if (scores.engagement < 70) {
    suggestions.push('Adicione mais elementos persuasivos e chamadas para ação.')
  }

  if (scores.seo < 70) {
    suggestions.push('Otimize o texto com palavras-chave relevantes para SEO.')
  }

  return suggestions
}