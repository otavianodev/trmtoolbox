'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CopyFrameworks } from '@/components/copywriter/copy-frameworks'
import { CopyTriggers } from '@/components/copywriter/copy-triggers'
import { CopyHooks } from '@/components/copywriter/copy-hooks'
import { CopyStorytelling } from '@/components/copywriter/copy-storytelling'

export default function CopywriterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Biblioteca de Copywriting</h2>
        <p className="text-muted-foreground">
          Frameworks, gatilhos mentais e estratégias para copy de alta conversão
        </p>
      </div>

      <Tabs defaultValue="frameworks" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="triggers">Gatilhos Mentais</TabsTrigger>
          <TabsTrigger value="hooks">Hooks</TabsTrigger>
          <TabsTrigger value="storytelling">Storytelling</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks">
          <Card className="p-6">
            <CopyFrameworks />
          </Card>
        </TabsContent>

        <TabsContent value="triggers">
          <Card className="p-6">
            <CopyTriggers />
          </Card>
        </TabsContent>

        <TabsContent value="hooks">
          <Card className="p-6">
            <CopyHooks />
          </Card>
        </TabsContent>

        <TabsContent value="storytelling">
          <Card className="p-6">
            <CopyStorytelling />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}