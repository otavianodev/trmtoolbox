'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export function CTASection() {
  return (
    <section className="py-24 px-4 md:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-primary text-primary-foreground rounded-3xl p-12 relative overflow-hidden mx-auto max-w-[1280px]"
      >
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">Comece sua transformação hoje</h2>
          <p className="text-primary-foreground/80">
            Aproveite todas as ferramentas necessárias para impulsionar seu negócio.
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="group">
              Fazer Login
              <Zap className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#000_50%,transparent_100%)] opacity-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
      </motion.div>
    </section>
  )
}