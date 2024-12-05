import { CopyType } from '@/app/(dashboard)/dashboard/copywriter/page'

interface GenerateCopyOptions {
  type: CopyType
  template: string
  variables: Record<string, string>
}

interface InstagramBioVersion {
  bio: string
  linkText: string
  hashtags: string[]
  storiesCta: string
}

interface GeneratedBioContent {
  versions: {
    formal: InstagramBioVersion
    informal: InstagramBioVersion
    emocional: InstagramBioVersion
    autoridade: InstagramBioVersion
  }
  proofSuggestions: string[]
}

export function generateCopyFromTemplate(options: GenerateCopyOptions) {
  const { type, variables } = options

  if (type === 'instagram-bio') {
    const { marca, oferta, publico, diferencial, link } = variables

    const formal = {
      bio: `${marca} | Especialista em ${oferta}\n👥 Ajudando ${publico}\n✨ ${diferencial}\n🔗 Link abaixo`,
      linkText: 'Clique para saber mais',
      hashtags: [
        `#${marca.replace(/\s+/g, '')}`,
        `#${oferta.replace(/\s+/g, '').slice(0, 20)}`,
        '#expert',
        '#especialista',
        `#${publico.replace(/\s+/g, '').slice(0, 20)}`
      ],
      storiesCta: 'Saiba mais sobre nossa metodologia'
    }

    const informal = {
      bio: `✨ ${marca}\n🎯 ${oferta}\n💫 Para ${publico}\n🌟 ${diferencial}\n👇 Clica no link!`,
      linkText: 'Envie uma DM para mais detalhes',
      hashtags: [
        `#${marca.replace(/\s+/g, '')}`,
        '#transformacao',
        '#resultados',
        '#mudanca',
        '#sucesso'
      ],
      storiesCta: 'Me chama no DM pra gente conversar!'
    }

    const emocional = {
      bio: `💫 Transformando vidas através de ${oferta}\n❤️ Feito para ${publico}\n✨ ${diferencial}\n🎯 ${marca}\n⬇️ Comece agora`,
      linkText: 'Acesse o link para começar agora',
      hashtags: [
        `#${marca.replace(/\s+/g, '')}`,
        '#sonhos',
        '#transformacao',
        '#mudancadevida',
        '#realizacao'
      ],
      storiesCta: 'Realize seu sonho agora mesmo!'
    }

    const autoridade = {
      bio: `${marca} | Referência em ${oferta}\n🏆 Líder no mercado\n📊 ${diferencial}\n👥 +1000 ${publico} transformados\n📍 ${link}`,
      linkText: 'Descubra nossa metodologia exclusiva',
      hashtags: [
        `#${marca.replace(/\s+/g, '')}`,
        '#especialista',
        '#autoridade',
        '#referencia',
        '#lider'
      ],
      storiesCta: 'Conheça nossa metodologia comprovada'
    }

    return {
      versions: {
        formal,
        informal,
        emocional,
        autoridade
      },
      proofSuggestions: [
        `+${Math.floor(Math.random() * 900) + 100} clientes satisfeitos`,
        'Metodologia comprovada',
        'Resultados garantidos',
        'Especialista certificado',
        'Líder no segmento'
      ]
    }
  }

  // Default fallback for other types
  return {
    headline: 'Headline padrão',
    mainCopy: 'Copy principal',
    cta: 'Clique aqui'
  }
}