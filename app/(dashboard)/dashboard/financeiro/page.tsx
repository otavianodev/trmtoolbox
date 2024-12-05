'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TransactionForm } from '@/components/financeiro/transaction-form'
import { TransactionList } from '@/components/financeiro/transaction-list'
import { FinancialDashboard } from '@/components/financeiro/financial-dashboard'
import { useTransactions } from '@/lib/hooks/useTransactions'

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  description: string
  amount: number
  category: string
  date: string
}

export default function FinanceiroPage() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions()
  const [showForm, setShowForm] = useState(false)

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = addTransaction(transaction)
    setShowForm(false)
    return newTransaction
  }

  const handleDeleteTransaction = (id: string) => {
    return deleteTransaction(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Planejador Financeiro
          </h2>
          <p className="text-muted-foreground">
            Gerencie suas receitas e despesas
          </p>
        </div>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Transação</DialogTitle>
            </DialogHeader>
            <TransactionForm onSubmit={handleAddTransaction} />
          </DialogContent>
        </Dialog>
      </div>

      <FinancialDashboard transactions={transactions} />

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Transações</h3>
        </div>
        <TransactionList
          transactions={transactions}
          onDelete={handleDeleteTransaction}
        />
      </Card>
    </div>
  )
}