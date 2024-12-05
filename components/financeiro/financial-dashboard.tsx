'use client'

import { Transaction } from '@/app/(dashboard)/dashboard/financeiro/page'
import { Card } from '@/components/ui/card'
import { ArrowDownIcon, ArrowUpIcon, TrendingUp } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { memo } from 'react'

const Chart = memo(function Chart({ data, formatCurrency }: { 
  data: any[], 
  formatCurrency: (value: number) => string 
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date"
          axisLine={false}
          tickLine={false}
          padding={{ left: 20, right: 20 }}
          tick={{ fontSize: 12 }}
          allowDecimals={false}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={formatCurrency}
          tick={{ fontSize: 12 }}
          width={80}
          allowDecimals={false}
        />
        <Tooltip 
          formatter={(value: number) => formatCurrency(value)}
          contentStyle={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
          }}
          labelStyle={{ color: 'var(--foreground)' }}
        />
        <Line
          type="monotone"
          dataKey="balance"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
})

interface FinancialDashboardProps {
  transactions: Transaction[]
}

export function FinancialDashboard({ transactions }: FinancialDashboardProps) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0)

  const balance = totalIncome - totalExpenses

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const chartData = transactions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((acc: any[], transaction) => {
      const date = new Date(transaction.date).toLocaleDateString('pt-BR')
      const lastEntry = acc[acc.length - 1]

      if (lastEntry && lastEntry.date === date) {
        if (transaction.type === 'income') {
          lastEntry.income += transaction.amount
        } else {
          lastEntry.expense += transaction.amount
        }
        lastEntry.balance = lastEntry.income - lastEntry.expense
      } else {
        acc.push({
          date,
          income: transaction.type === 'income' ? transaction.amount : 0,
          expense: transaction.type === 'expense' ? transaction.amount : 0,
          balance:
            (lastEntry?.balance || 0) +
            (transaction.type === 'income'
              ? transaction.amount
              : -transaction.amount),
        })
      }

      return acc
    }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-green-500/10 rounded-full">
            <ArrowUpIcon className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Receitas
            </p>
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(totalIncome)}
            </h3>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-500/10 rounded-full">
            <ArrowDownIcon className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Despesas
            </p>
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(totalExpenses)}
            </h3>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Saldo
            </p>
            <h3
              className={`text-2xl font-bold ${
                balance >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {formatCurrency(balance)}
            </h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 col-span-full">
        <h3 className="text-lg font-semibold mb-4">Evolução Financeira</h3>
        <div className="h-[300px]">
          <Chart data={chartData} formatCurrency={formatCurrency} />
        </div>
      </Card>
    </div>
  )
}