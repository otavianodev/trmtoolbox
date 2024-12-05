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
import { generateCopy } from '@/lib/utils/copy-generator'
import { Wand2 } from 'lucide-react'

export function CopyForm() {
  const [copyType, setCopyType] = useState('landing-page')
  const [formData, setFormData] = useState({
    productName: '',
    mainBenefit: '',
    targetAudience: '',
    price: '',
    deadline: '',
    features: ['', '', ''],
    objective: 'sales',
    specialOffer: '',
    brandName: '',
    uniqueValue: '',
    mainLink: '',
    creativeType: 'carousel',
    toneOfVoice: 'aggressive',
    desiredCta: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const copy = generateCopy({
      type: copyType as any,
      ...formData
    })

    // Handle the generated copy (e.g., display it, save it, etc.)
    console.log(copy)
  }

  const renderFields = () => {
    switch (copyType) {
      case 'landing-page':
        return (
          <>
            <div className="space-y-2">
              <Label>Nome do Curso/Produto</Label>
              <Input
                value={formData.productName}
                onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                placeholder="Ex: MBA Digital"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Benefício Principal</Label>
              <Input
                value={formData.mainBenefit}
                onChange={(e) => setFormData(prev => ({ ...prev, mainBenefit: e.target.value }))}
                placeholder="Ex: Dobrar salário em 12 meses"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Preço</Label>
              <Input
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Ex: R$ 997"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Prazo</Label>
              <Input
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                placeholder="Ex: 5 dias"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Diferenciais (até 3)</Label>
              {formData.features.map((feature, index) => (
                <Input
                  key={index}
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...formData.features]
                    newFeatures[index] = e.target.value
                    setFormData(prev => ({ ...prev, features: newFeatures }))
                  }}
                  placeholder={`Diferencial ${index + 1}`}
                />
              ))}
            </div>
          </>
        )
      
      case 'ad':
        return (
          <>
            <div className="space-y-2">
              <Label>Objetivo do Anúncio</Label>
              <Select
                value={formData.objective}
                onValueChange={(value) => setFormData(prev => ({ ...prev, objective: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Venda</SelectItem>
                  <SelectItem value="leads">Geração de Leads</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nome do Produto</Label>
              <Input
                value={formData.productName}
                onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                placeholder="Ex: Curso de Marketing Digital"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Principal Benefício</Label>
              <Input
                value={formData.mainBenefit}
                onChange={(e) => setFormData(prev => ({ ...prev, mainBenefit: e.target.value }))}
                placeholder="Ex: Aumentar vendas online"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Oferta Especial</Label>
              <Input
                value={formData.specialOffer}
                onChange={(e) => setFormData(prev => ({ ...prev, specialOffer: e.target.value }))}
                placeholder="Ex: 50% de desconto por 24h"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Público-Alvo</Label>
              <Input
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                placeholder="Ex: Empreendedores digitais"
                required
              />
            </div>
          </>
        )
      
      case 'instagram-bio':
        return (
          <>
            <div className="space-y-2">
              <Label>Nome da Marca/Empresa</Label>
              <Input
                value={formData.brandName}
                onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
                placeholder="Ex: Marketing Digital Pro"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Principal Oferta</Label>
              <Input
                value={formData.mainBenefit}
                onChange={(e) => setFormData(prev => ({ ...prev, mainBenefit: e.target.value }))}
                placeholder="Ex: Consultoria de Marketing"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Público-Alvo</Label>
              <Input
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                placeholder="Ex: Pequenos empresários"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Diferencial Único</Label>
              <Input
                value={formData.uniqueValue}
                onChange={(e) => setFormData(prev => ({ ...prev, uniqueValue: e.target.value }))}
                placeholder="Ex: Método exclusivo"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Link Principal</Label>
              <Input
                value={formData.mainLink}
                onChange={(e) => setFormData(prev => ({ ...prev, mainLink: e.target.value }))}
                placeholder="Ex: link.bio/marketing"
                required
              />
            </div>
          </>
        )
      
      case 'creative':
        return (
          <>
            <div className="space-y-2">
              <Label>Tipo de Criativo</Label>
              <Select
                value={formData.creativeType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, creativeType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carousel">Carrossel</SelectItem>
                  <SelectItem value="video">Vídeo</SelectItem>
                  <SelectItem value="image">Imagem</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Objetivo Principal</Label>
              <Input
                value={formData.mainBenefit}
                onChange={(e) => setFormData(prev => ({ ...prev, mainBenefit: e.target.value }))}
                placeholder="Ex: Gerar leads qualificados"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Tom de Voz</Label>
              <Select
                value={formData.toneOfVoice}
                onValueChange={(value) => setFormData(prev => ({ ...prev, toneOfVoice: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aggressive">Agressivo/Vendedor</SelectItem>
                  <SelectItem value="educational">Educacional</SelectItem>
                  <SelectItem value="emotional">Emocional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Call-to-action Desejado</Label>
              <Input
                value={formData.desiredCta}
                onChange={(e) => setFormData(prev => ({ ...prev, desiredCta: e.target.value }))}
                placeholder="Ex: Agendar Consulta"
                required
              />
            </div>
          </>
        )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Tipo de Copy</Label>
        <Select value={copyType} onValueChange={setCopyType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="landing-page">Landing Page</SelectItem>
            <SelectItem value="ad">Anúncio</SelectItem>
            <SelectItem value="instagram-bio">Bio do Instagram</SelectItem>
            <SelectItem value="creative">Copy para Criativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {renderFields()}

      <Button type="submit" className="w-full">
        <Wand2 className="mr-2 h-4 w-4" />
        Gerar Copy
      </Button>
    </form>
  )
}