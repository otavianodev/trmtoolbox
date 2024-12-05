'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative py-24 px-4 sm:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto"
      >
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Todas as ferramentas que você precisa
          </h1>
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#FF0080] via-[#7928CA] to-[#FF0080] bg-clip-text text-transparent">
            em um só lugar
          </p>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Simplifique sua jornada empreendedora com nossa suite completa de ferramentas.
            Do planejamento financeiro à criação de conteúdo.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto group">
              Começar Agora
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Conhecer Recursos
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}