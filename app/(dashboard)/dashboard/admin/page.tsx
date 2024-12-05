'use client'

import { useState } from 'react'
import { UserList } from '@/components/admin/user-list'
import { CreateUserDialog } from '@/components/admin/create-user-dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function AdminPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Painel Administrativo</h2>
          <p className="text-muted-foreground">
            Gerencie os usuários e acessos ao sistema
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <UserList />
      
      <CreateUserDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      />
    </div>
  )
}