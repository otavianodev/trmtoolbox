'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { Rocket, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await signIn(email, password)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <Rocket className="h-6 w-6" />
            <span className="text-2xl font-bold">TRM Toolbox</span>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Bem-vindo de volta
            </h1>
            <p className="text-muted-foreground">
              Entre com sua conta para acessar suas ferramentas
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
          <div className="flex flex-col items-center gap-4 text-sm">
            <Link
              href="/forgot-password"
              className="text-muted-foreground hover:text-primary"
            >
              Esqueceu sua senha?
            </Link>
            <div className="text-muted-foreground">
              Não tem uma conta?{' '}
              <Link href="/register" className="text-primary hover:underline">
                Criar conta
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}