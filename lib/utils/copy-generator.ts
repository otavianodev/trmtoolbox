'use client'

type CopyType = 'landing-page' | 'ad' | 'instagram-bio' | 'creative'
type ToneOfVoice = 'aggressive' | 'educational' | 'emotional'
type AdObjective = 'sales' | 'leads'
type CreativeType = 'carousel' | 'video' | 'image'

interface CopyInput {
  type: CopyType
  productName: string
  mainBenefit: string
  targetAudience: string
  price?: string
  deadline?: string
  features?: string[]
  objective?: AdObjective
  specialOffer?: string
  brandName?: string
  uniqueValue?: string
  mainLink?: string
  creativeType?: CreativeType
  toneOfVoice?: ToneOfVoice
  desiredCta?: string
}

interface GeneratedCopy {
  headlines: string[]
  subheadlines?: string[]
  mainCopy?: string[]
  bullets?: string[]
  socialProof?: string[]
  scarcity?: string
  cta: string[]
  guarantee?: string
  hashtags?: string[]
  abTestSuggestions: string[]
  toneVariations: string[]
  channelAdjustments: string[]
  triggerSuggestions: string[]
}

export function generateCopy(input: CopyInput): GeneratedCopy {
  switch (input.type) {
    case 'landing-page':
      return generateLandingPageCopy(input)
    case 'ad':
      return generateAdCopy(input)
    case 'instagram-bio':
      return generateInstagramBioCopy(input)
    case 'creative':
      return generateCreativeCopy(input)
    default:
      throw new Error('Invalid copy type')
  }
}

function generateLandingPageCopy(input: CopyInput): GeneratedCopy {
  const { productName, mainBenefit, price, deadline, features = [] } = input

  return {
    headlines: [
      `[GARANTIDO] O único ${productName} que entrega ${mainBenefit} em ${deadline}`,
      `REVELADO: O método comprovado para ${mainBenefit} mesmo que você nunca tenha tentado antes`,
      `Como ${mainBenefit} usando o sistema ${productName} - Garantia de Resultado!`
    ],
    subheadlines: [
      `Descubra o passo a passo completo para ${mainBenefit} sem precisar de experiência prévia`,
      `O método científico que já ajudou mais de 1.000 alunos a ${mainBenefit}`,
      `A solução definitiva para quem quer ${mainBenefit} de forma rápida e segura`
    ],
    bullets: [
      ...features.map(f => `✓ ${f}`),
      `✓ Suporte personalizado 24/7`,
      `✓ Acesso vitalício à plataforma`
    ],
    socialProof: [
      `"Consegui ${mainBenefit} em apenas 30 dias" - João Silva`,
      `"Melhor investimento que fiz para minha carreira" - Maria Santos`,
      `"Resultado garantido! Recomendo muito" - Pedro Oliveira`
    ],
    scarcity: `⚠️ ATENÇÃO: Oferta válida apenas por ${deadline}. Preço atual: ${price} (valor normal R$ ${parseInt(price!) * 3})`,
    cta: [
      `QUERO GARANTIR MINHA VAGA AGORA →`,
      `SIM! QUERO COMEÇAR MINHA TRANSFORMAÇÃO`,
      `GARANTIR ACESSO COM DESCONTO`
    ],
    guarantee: `Garantia incondicional de 7 dias. Se você não ficar 100% satisfeito, devolvemos seu dinheiro.`,
    abTestSuggestions: [
      `Teste diferentes valores de urgência (24h vs 48h)`,
      `Compare CTAs com e sem emojis`,
      `Teste headlines focadas em benefício vs problema`
    ],
    toneVariations: [
      `Versão mais agressiva: Adicione mais elementos de escassez`,
      `Versão educacional: Foque em dados e pesquisas`,
      `Versão emocional: Adicione mais histórias de transformação`
    ],
    channelAdjustments: [
      `Facebook: Adapte para formato carrossel`,
      `Instagram: Crie versão mais visual`,
      `Email: Divida em sequência de 3 emails`
    ],
    triggerSuggestions: [
      `Adicione prova social com números específicos`,
      `Inclua depoimentos em vídeo`,
      `Destaque a garantia de resultado`
    ]
  }
}

function generateAdCopy(input: CopyInput): GeneratedCopy {
  const { productName, mainBenefit, objective, specialOffer, targetAudience } = input

  const isLeadGen = objective === 'leads'

  return {
    headlines: [
      `🔥 ${isLeadGen ? 'DOWNLOAD GRÁTIS' : 'ÚLTIMA CHANCE'}: ${productName}`,
      `Atenção ${targetAudience}: Chegou a hora de ${mainBenefit}`,
      `[NOVO] Descubra como ${mainBenefit} em tempo recorde`
    ],
    mainCopy: [
      `Chegou a oportunidade que você esperava para ${mainBenefit}. ${productName} é a solução definitiva para ${targetAudience} que querem resultados reais.`,
      `Cansado de tentar ${mainBenefit} sem sucesso? ${productName} é a resposta que você procurava.`,
      `${targetAudience}: Prepare-se para transformar sua realidade com ${productName}.`
    ],
    cta: [
      isLeadGen ? 'BAIXAR AGORA →' : 'APROVEITAR OFERTA',
      isLeadGen ? 'QUERO MEU ACESSO' : 'GARANTIR DESCONTO',
      isLeadGen ? 'RECEBER CONTEÚDO' : 'COMPRAR AGORA'
    ],
    hashtags: [
      `#${productName.replace(/\s+/g, '')}`,
      `#${mainBenefit.replace(/\s+/g, '')}`,
      `#${targetAudience.replace(/\s+/g, '')}`,
      '#sucesso',
      '#resultados'
    ],
    abTestSuggestions: [
      `Teste diferentes imagens principais`,
      `Compare textos longos vs curtos`,
      `Experimente diferentes ofertas`
    ],
    toneVariations: [
      `Versão direta: Foque no preço/desconto`,
      `Versão social: Destaque resultados de outros clientes`,
      `Versão urgente: Enfatize a limitação de tempo`
    ],
    channelAdjustments: [
      `Facebook: Otimize para feed`,
      `Instagram: Adapte para Stories`,
      `Google: Crie versão mais objetiva`
    ],
    triggerSuggestions: [
      `Adicione contagem regressiva`,
      `Mostre número limitado de vagas`,
      `Destaque bônus exclusivos`
    ]
  }
}

function generateInstagramBioCopy(input: CopyInput): GeneratedCopy {
  const { brandName, mainBenefit, targetAudience, uniqueValue, mainLink } = input

  return {
    headlines: [
      `${brandName} | ${mainBenefit} para ${targetAudience} 🚀`,
      `✨ ${brandName} - Especialista em ${mainBenefit}`,
      `${brandName} • Transformando ${targetAudience} 💫`
    ],
    mainCopy: [
      `Ajudo ${targetAudience} a ${mainBenefit}\n👉 ${uniqueValue}\n💡 ${mainBenefit}\n🔗 ${mainLink}`,
      `${mainBenefit} para ${targetAudience}\n✨ ${uniqueValue}\n📍 ${mainLink}`,
      `Transformando ${targetAudience}\n🎯 ${mainBenefit}\n💫 ${uniqueValue}\n👇 ${mainLink}`
    ],
    cta: [
      'Agende sua consulta gratuita',
      'Conheça nossa solução',
      'Saiba mais'
    ],
    hashtags: [
      `#${brandName.replace(/\s+/g, '')}`,
      `#${mainBenefit.replace(/\s+/g, '')}`,
      `#${targetAudience.replace(/\s+/g, '')}`,
      '#expert',
      '#especialista'
    ],
    abTestSuggestions: [
      `Teste diferentes emojis`,
      `Compare ordem das informações`,
      `Experimente diferentes CTAs`
    ],
    toneVariations: [
      `Versão profissional: Remova emojis`,
      `Versão casual: Adicione mais personalidade`,
      `Versão minimalista: Simplifique ao máximo`
    ],
    channelAdjustments: [
      `Stories: Crie versão para destaques`,
      `Posts: Adapte para legendas`,
      `Reels: Crie versão para bio temporária`
    ],
    triggerSuggestions: [
      `Adicione número de clientes atendidos`,
      `Destaque certificações`,
      `Inclua social proof`
    ]
  }
}

function generateCreativeCopy(input: CopyInput): GeneratedCopy {
  const { creativeType, mainBenefit, toneOfVoice, desiredCta } = input

  const isInformal = toneOfVoice === 'emotional'

  return {
    headlines: [
      `${isInformal ? '🔥 ' : ''}Descubra o segredo para ${mainBenefit}`,
      `${isInformal ? '✨ ' : ''}A revolução em ${mainBenefit} chegou`,
      `${isInformal ? '💡 ' : ''}Transforme sua realidade com ${mainBenefit}`
    ],
    mainCopy: [
      `Chegou a hora de transformar sua realidade. Com nossa solução exclusiva, você vai ${mainBenefit} de forma rápida e eficiente.`,
      `Prepare-se para uma nova era em ${mainBenefit}. Nossa metodologia exclusiva vai te surpreender.`,
      `Resultados reais e comprovados em ${mainBenefit}. Junte-se a milhares de clientes satisfeitos.`
    ],
    cta: [
      desiredCta || 'COMEÇAR AGORA',
      'QUERO SABER MAIS',
      'GARANTIR MINHA VAGA'
    ],
    hashtags: [
      '#transformação',
      '#resultados',
      '#sucesso',
      '#inovação',
      '#mudança'
    ],
    abTestSuggestions: [
      `Teste diferentes formatos de mídia`,
      `Compare estilos de copywriting`,
      `Experimente diferentes hooks`
    ],
    toneVariations: [
      `Versão storytelling: Conte uma história`,
      `Versão direta: Foque nos resultados`,
      `Versão aspiracional: Mostre o depois`
    ],
    channelAdjustments: [
      `Carrossel: Divida em 5-7 slides`,
      `Vídeo: Adapte para script`,
      `Imagem: Crie versão mais impactante`
    ],
    triggerSuggestions: [
      `Use before/after`,
      `Mostre processo de transformação`,
      `Inclua depoimentos em vídeo`
    ]
  }
}