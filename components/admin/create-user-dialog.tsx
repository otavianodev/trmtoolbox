'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Get existing users
    const storedUsers = localStorage.getItem('trm_toolbox_users')
    const users = storedUsers ? JSON.parse(storedUsers) : []

    // Check if email already exists
    if (users.some((user: any) => user.email === formData.email)) {
      toast({
        variant: 'destructive',
        title: 'Erro ao criar usuário',
        description: 'Este e-mail já está em uso.',
      })
      return
    }

    // Create new user with passwordHash instead of password
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      passwordHash: formData.password, // Store as passwordHash to match auth system
      isAdmin: formData.isAdmin,
      createdAt: new Date().toISOString()
    }

    // Save to localStorage
    localStorage.setItem('trm_toolbox_users', JSON.stringify([...users, newUser]))

    // Reset form and close dialog
    setFormData({
      name: '',
      email: '',
      password: '',
      isAdmin: false
    })
    onOpenChange(false)

    toast({
      title: 'Usuário criado',
      description: 'O novo usuário foi criado com sucesso.',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Usuário</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nome completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="email@exemplo.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Senha</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Privilégios de Admin</Label>
            <Switch
              checked={formData.isAdmin}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAdmin: checked }))}
            />
          </div>

          <Button type="submit" className="w-full">
            Criar Usuário
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}