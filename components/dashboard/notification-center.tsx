'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Activity } from '@/lib/activity'
import { useEffect, useState } from 'react'
import { STORAGE_KEYS, getStorageItem } from '@/lib/storage'
import { FileText, Wallet, CheckSquare, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface NotificationCenterProps {
  show: boolean
  onClose: () => void
}

export function NotificationCenter({ show, onClose }: NotificationCenterProps) {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const loadActivities = () => {
      const stored = getStorageItem<Activity[]>({
        key: STORAGE_KEYS.ACTIVITIES,
        defaultValue: [],
      })
      setActivities(stored)
    }

    if (show) {
      loadActivities()
    }

    const handleNewActivity = () => {
      if (show) {
        loadActivities()
      }
    }

    window.addEventListener('activityAdded', handleNewActivity)
    return () => window.removeEventListener('activityAdded', handleNewActivity)
  }, [show])

  const getIcon = (activity: Activity) => {
    switch (activity.type) {
      case 'copy':
        return <FileText className="h-4 w-4" />
      case 'transaction':
        return activity.details?.type === 'income' 
          ? <ArrowUpCircle className="h-4 w-4 text-green-500" />
          : <ArrowDownCircle className="h-4 w-4 text-red-500" />
      case 'checklist':
        return <CheckSquare className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Sheet open={show} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notificações</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma notificação
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 text-sm"
                >
                  <div className="p-2 bg-muted rounded-full">
                    {getIcon(activity)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.timestamp), {
                        addSuffix: true,
                        locale: ptBR
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}