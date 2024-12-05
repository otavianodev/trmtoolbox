'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Folder,
  Search,
  Clock,
  Copy as CopyIcon,
  Trash2,
  FolderOpen
} from 'lucide-react'
import { GeneratedCopy } from '@/app/(dashboard)/dashboard/copy/page'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useToast } from '@/components/ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface SavedCopiesProps {
  copies: GeneratedCopy[]
  onCopySelect: (copy: GeneratedCopy) => void
  onDelete: (id: string) => void
}

export function SavedCopies({ copies, onCopySelect, onDelete }: SavedCopiesProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const { toast } = useToast()

  const folders = Array.from(new Set(copies.map(copy => copy.folder || 'Sem pasta')))

  const filteredCopies = copies.filter(copy => {
    const matchesSearch = 
      copy.content.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      copy.content.mainCopy.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFolder = !selectedFolder || selectedFolder === 'all' || 
      (copy.folder || 'Sem pasta') === selectedFolder

    return matchesSearch && matchesFolder
  })

  const handleDelete = (id: string) => {
    onDelete(id)
    toast({
      title: 'Copy excluída',
      description: 'A copy foi excluída com sucesso.',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Buscar copies salvas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setSelectedFolder(null)}
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          Todas as Pastas
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {folders.map((folder) => (
          <Card
            key={folder}
            className={`p-4 cursor-pointer transition-colors ${
              selectedFolder === folder ? 'bg-primary/10' : ''
            }`}
            onClick={() => setSelectedFolder(folder)}
          >
            <div className="flex items-center space-x-2">
              <Folder className="h-4 w-4" />
              <span className="font-medium">{folder}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {copies.filter(c => (c.folder || 'Sem pasta') === folder).length} copies
            </p>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {filteredCopies.map((copy) => (
          <Card key={copy.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    {copy.type === 'creative' && 'Criativo para Anúncio'}
                    {copy.type === 'landing-page' && 'Landing Page'}
                    {copy.type === 'instagram-bio' && 'Bio do Instagram'}
                    {copy.type === 'promotion' && 'Oferta/Promoção'}
                  </span>
                  {copy.folder && (
                    <span className="text-xs text-muted-foreground">
                      em {copy.folder}
                    </span>
                  )}
                </div>
                <h3 className="font-medium">{copy.content.headline || copy.content.mainCopy}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>
                    {formatDistanceToNow(new Date(copy.createdAt!), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onCopySelect(copy)}
                >
                  <CopyIcon className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir Copy</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir esta copy? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(copy.id!)}>
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}