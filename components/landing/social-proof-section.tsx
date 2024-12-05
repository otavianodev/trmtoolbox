'use client'

import { Card } from '@/components/ui/card'
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

const testimonials = [
  {
    quote: "Revolucionou a forma como gerencio minhas finanças. Indispensável!",
    author: "Ana Silva",
    role: "CEO, Digital Marketing"
  },
  {
    quote: "As copies geradas são incríveis. Economizo horas de trabalho!",
    author: "Pedro Santos",
    role: "Consultor de Marketing"
  },
  {
    quote: "Os checklists me ajudam a manter tudo organizado e em dia.",
    author: "Maria Oliveira",
    role: "Empreendedora Digital"
  }
]

export function SocialProofSection() {
  return (
    <section className="bg-muted/50 py-24">
      <div className="px-4 md:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold">Usado por mais de 10.000 empreendedores</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Junte-se a milhares de empreendedores que já estão transformando seus negócios
            com nossas ferramentas.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={item}>
              <Card className="p-6 h-full">
                <div className="space-y-4">
                  <p className="text-lg italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}