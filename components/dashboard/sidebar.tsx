'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Wallet,
  FileText,
  CheckSquare,
  Settings,
  StickyNote,
  Shield,
} from 'lucide-react'
import { useAuth } from '@/components/auth-provider'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Planejador Financeiro', href: '/dashboard/financeiro', icon: Wallet },
  { name: 'Copywriter TRM', href: '/dashboard/copywriter', icon: FileText },
  { name: 'Checklist', href: '/dashboard/checklist', icon: CheckSquare },
  { name: 'Bloco de Notas', href: '/dashboard/notes', icon: StickyNote },
  { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const allNavigation = user?.isAdmin 
    ? [...navigation, { name: 'Admin', href: '/dashboard/admin', icon: Shield }]
    : navigation

  return (
    <div className="w-64 border-r bg-background">
      <div className="h-14 flex items-center px-4 border-b">
        <div className="flex items-center space-x-2">
          <span className="font-bold">TRM Toolbox</span>
        </div>
      </div>
      <nav className="space-y-1 p-4">
        {allNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive(item.href)
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}