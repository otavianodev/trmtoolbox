'use client'

import { useEffect, useMemo, useCallback } from 'react'
import { useTransactions } from './useTransactions'
import { useChecklists } from './useChecklists'
import { useCopies } from './useCopies'

export function useAnalytics() {
  const { calculateBalance, getMonthlyTransactions } = useTransactions()
  const { getPendingTasksCount, getCompletedTasksCount } = useChecklists()
  const { copiesCount, getMostUsedTypes } = useCopies()

  const getAnalytics = useCallback(() => ({
    currentBalance: calculateBalance(),
    pendingTasks: getPendingTasksCount(),
    completedTasks: getCompletedTasksCount(),
    totalCopies: copiesCount,
    mostUsedCopyTypes: getMostUsedTypes(),
  }), [
    calculateBalance,
    getPendingTasksCount,
    getCompletedTasksCount,
    copiesCount,
    getMostUsedTypes,
  ])

  return useMemo(() => getAnalytics(), [getAnalytics])
}