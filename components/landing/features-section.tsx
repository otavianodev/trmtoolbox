'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle2, Shield, Sparkles, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const features = [
  {
    icon: Shield,
    title: "Planejador Financeiro",
    description: "Gerencie suas finanças com facilidade usando nosso dashboard intuitivo e relatórios detalhados.",
    benefits: [
      "Controle de receitas e despesas",
      "Gráficos e análises"
    ]
  },
  {
    icon: Sparkles,
    title: "Gerador de Copy",
    description: "Crie textos persuasivos para suas landing pages usando nosso gerador baseado em técnicas avançadas de copywriting.",
    benefits: [
      "Templates otimizados",
      "Fórmulas comprovadas"
    ]
  },
  {
    icon: Users,
    title: "Checklist de Tarefas",
    description: "Mantenha-se organizado com checklists personalizáveis e modelos prontos para seus projetos.",
    benefits: [
      "Templates prontos",
      "Acompanhamento de progresso"
    ]
  }
]

export function FeaturesSection() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid md:grid-cols-3 gap-8 py-12 px-4 md:px-6 lg:px-8"
      id="features"
    >
      {features.map((feature, index) => {
        const Icon = feature.icon
        return (
          <motion.div key={index} variants={item}>
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-primary/10 rounded-xl w-fit">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}