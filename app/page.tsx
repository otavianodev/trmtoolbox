'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { CTASection } from '@/components/landing/cta-section'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 mx-auto">
          <div className="flex items-center space-x-2">
            <span className="font-bold">TRM Toolbox</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button>Entrar</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>

      <footer className="border-t mt-16">
        <div className="container py-8 px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold">TRM Toolbox</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2024 TRM Toolbox. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}