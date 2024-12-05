'use client'

import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

interface QuickAction {
  title: string
  icon: LucideIcon
  onClick: () => void
}

interface QuickActionMenuProps {
  actions: QuickAction[]
}

export function QuickActionMenu({ actions }: QuickActionMenuProps) {
  return (
    <div className="grid gap-4">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <Button
            key={action.title}
            variant="outline"
            className="w-full justify-start"
            onClick={action.onClick}
          >
            <Icon className="mr-2 h-4 w-4" />
            {action.title}
          </Button>
        )
      })}
    </div>
  )
}