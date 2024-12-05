'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Zap, TrendingUp, Clock, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTransactions } from '@/lib/hooks/useTransactions'
import { useChecklists } from '@/lib/hooks/useChecklists'
import { formatCurrency } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function DashboardPage() {
  const { calculateBalance, transactions } = useTransactions()
  const { checklists } = useChecklists()

  const balance = calculateBalance()
  const pendingTasks = checklists.flatMap(checklist => 
    checklist.items
      .filter(item => !item.completed)
      .map(item => ({
        checklistTitle: checklist.title,
        text: item.text
      }))
  )

  // Get last 3 transactions
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Saldo Total
              </p>
              <h3 className={`text-2xl font-bold ${
                balance >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {formatCurrency(balance)}
              </h3>
            </div>
          </div>

          {recentTransactions.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Últimas Transações</h4>
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'income' 
                        ? 'bg-green-500/10' 
                        : 'bg-red-500/10'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(transaction.date), {
                          addSuffix: true,
                          locale: ptBR
                        })}
                      </p>
                    </div>
                  </div>
                  <span className={`font-medium ${
                    transaction.type === 'income'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Tarefas Pendentes
              </p>
              <h3 className="text-2xl font-bold">
                {pendingTasks.length}
              </h3>
            </div>
          </div>
          {pendingTasks.length > 0 && (
            <div className="mt-4 space-y-2">
              {pendingTasks.map((task, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{task.checklistTitle}:</span>
                  <span className="text-muted-foreground ml-2">{task.text}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card className="p-6 bg-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Acesse a TRM School</h3>
            <p>Aprenda mais sobre marketing digital e construção de negócios sólidos.</p>
          </div>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.open('https://therealmarketing.school', '_blank')}
          >
            <Zap className="mr-2 h-4 w-4" />
            Acessar Agora
          </Button>
        </div>
      </Card>
    </div>
  )
}