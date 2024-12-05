'use client'

import { useCallback, useMemo } from 'react'
import { useUserStorage } from './useUserStorage'
import { STORAGE_KEYS, dispatchStorageEvent, EVENTS } from '../storage'
import { Transaction } from '@/app/(dashboard)/dashboard/financeiro/page'
import { trackTransaction } from '@/lib/activity'

export function useTransactions() {
  const [transactions, setTransactions] = useUserStorage<Transaction[]>({
    key: STORAGE_KEYS.TRANSACTIONS,
    defaultValue: [],
  })

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    }
    setTransactions(prev => [...prev, newTransaction])
    trackTransaction(newTransaction, 'added')
    dispatchStorageEvent(EVENTS.TRANSACTION_UPDATED)
    return newTransaction
  }, [setTransactions])

  const deleteTransaction = useCallback((id: string) => {
    const transaction = transactions.find(t => t.id === id)
    if (transaction) {
      setTransactions(prev => prev.filter(t => t.id !== id))
      trackTransaction(transaction, 'deleted')
      dispatchStorageEvent(EVENTS.TRANSACTION_UPDATED)
      return transaction
    }
  }, [transactions, setTransactions])

  const calculateBalance = useCallback(() => {
    return transactions.reduce((acc, curr) => {
      return acc + (curr.type === 'income' ? curr.amount : -curr.amount)
    }, 0)
  }, [transactions])

  const getMonthlyTransactions = useCallback((month: number, year: number) => {
    return transactions.filter(t => {
      const date = new Date(t.date)
      return date.getMonth() === month && date.getFullYear() === year
    })
  }, [transactions])

  return useMemo(() => ({
    transactions,
    addTransaction,
    deleteTransaction,
    calculateBalance,
    getMonthlyTransactions,
  }), [
    transactions,
    addTransaction,
    deleteTransaction,
    calculateBalance,
    getMonthlyTransactions,
  ])
}