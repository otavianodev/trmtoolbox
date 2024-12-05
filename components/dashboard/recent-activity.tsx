'use client'

import { useEffect, useState } from 'react'
import { Activity } from '@/lib/activity'
import { FileText, Wallet, CheckSquare, ArrowUpCircle, ArrowDownCircle, Eraser } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { useActivities } from '@/lib/hooks/useActivities'

export function RecentActivity() {
  const { activities: allActivities, getRecentActivities } = useActivities()
  const [activities, setActivities] = useState<Activity[]>([])
  const [isHidden, setIsHidden] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (!isHidden) {
      setActivities(getRecentActivities())
    }
  }, [isHidden, allActivities, getRecentActivities])

  const handleClearActivities = () => {
    setIsHidden(true)
    toast({
      title: 'Atividades ocultadas',
      description: 'As atividades foram temporariamente ocultadas.',
    })
  }

  const handleShowActivities = () => {
    setIsHidden(false)
    toast({
      title: 'Atividades restauradas',
      description: 'As atividades estão visíveis novamente.',
    })
  }

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

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhuma atividade recente
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={isHidden ? handleShowActivities : handleClearActivities}
        >
          <Eraser className="mr-2 h-4 w-4" />
          {isHidden ? 'Mostrar Atividades' : 'Ocultar Atividades'}
        </Button>
      </div>

      <AnimatePresence>
        {!isHidden && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isHidden && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-muted-foreground"
        >
          Atividades temporariamente ocultadas
        </motion.div>
      )}
    </div>
  )
}