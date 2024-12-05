'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useProfile } from '@/lib/hooks/useProfile'
import { useToast } from '@/components/ui/use-toast'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

export function UserProfile() {
  const { profile, updateProfile } = useProfile()
  const { toast } = useToast()
  const [newKeyword, setNewKeyword] = useState('')
  const [newValue, setNewValue] = useState('')
  const [newCompetitor, setNewCompetitor] = useState('')
  const [newUSP, setNewUSP] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Perfil atualizado',
      description: 'Suas preferências foram salvas com sucesso.',
    })
  }

  const addItem = (
    field: 'keywords' | 'values' | 'competitors' | 'uniqueSellingPoints',
    value: string,
    setter: (value: string) => void
  ) => {
    if (!value.trim()) return

    if (field === 'keywords' || field === 'values') {
      updateProfile({
        brandVoice: {
          ...profile.brandVoice,
          [field]: [...profile.brandVoice[field], value.trim()]
        }
      })
    } else {
      updateProfile({
        [field]: [...(profile[field] || []), value.trim()]
      })
    }
    setter('')
  }

  const removeItem = (
    field: 'keywords' | 'values' | 'competitors' | 'uniqueSellingPoints',
    index: number
  ) => {
    if (field === 'keywords' || field === 'values') {
      updateProfile({
        brandVoice: {
          ...profile.brandVoice,
          [field]: profile.brandVoice[field].filter((_, i) => i !== index)
        }
      })
    } else {
      updateProfile({
        [field]: profile[field].filter((_, i) => i !== index)
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nicho de Mercado</Label>
            <Input
              value={profile.niche}
              onChange={(e) => updateProfile({ niche: e.target.value })}
              placeholder="Ex: Marketing Digital"
            />
          </div>

          <div className="space-y-2">
            <Label>Público-Alvo</Label>
            <Textarea
              value={profile.targetAudience}
              onChange={(e) => updateProfile({ targetAudience: e.target.value })}
              placeholder="Descreva seu público-alvo ideal"
            />
          </div>

          <div className="space-y-2">
            <Label>Tom de Voz</Label>
            <Select
              value={profile.toneOfVoice}
              onValueChange={(value: any) => updateProfile({ toneOfVoice: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Profissional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Amigável</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Palavras-chave da Marca</Label>
              <div className="flex gap-2">
                <Input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Adicionar palavra-chave"
                />
                <Button
                  type="button"
                  onClick={() => addItem('keywords', newKeyword, setNewKeyword)}
                >
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.brandVoice.keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {keyword}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeItem('keywords', index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Valores da Marca</Label>
              <div className="flex gap-2">
                <Input
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Adicionar valor"
                />
                <Button
                  type="button"
                  onClick={() => addItem('values', newValue, setNewValue)}
                >
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.brandVoice.values.map((value, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {value}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeItem('values', index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Principais Concorrentes</Label>
              <div className="flex gap-2">
                <Input
                  value={newCompetitor}
                  onChange={(e) => setNewCompetitor(e.target.value)}
                  placeholder="Adicionar concorrente"
                />
                <Button
                  type="button"
                  onClick={() => addItem('competitors', newCompetitor, setNewCompetitor)}
                >
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.competitors.map((competitor, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {competitor}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeItem('competitors', index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Diferenciais Únicos (USPs)</Label>
              <div className="flex gap-2">
                <Input
                  value={newUSP}
                  onChange={(e) => setNewUSP(e.target.value)}
                  placeholder="Adicionar diferencial"
                />
                <Button
                  type="button"
                  onClick={() => addItem('uniqueSellingPoints', newUSP, setNewUSP)}
                >
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.uniqueSellingPoints.map((usp, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {usp}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeItem('uniqueSellingPoints', index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Salvar Perfil
      </Button>
    </form>
  )
}