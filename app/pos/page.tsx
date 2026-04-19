'use client'

import { useState } from 'react'
import { POSDashboard } from '@/components/pos/pos-dashboard'
import { TableView } from '@/components/pos/table-view'
import { OrderQueue } from '@/components/pos/order-queue'
import { POSHeader } from '@/components/pos/pos-header'

type POSView = 'dashboard' | 'tables' | 'queue'

export default function POSPage() {
  const [currentView, setCurrentView] = useState<POSView>('dashboard')
  const [isOnline, setIsOnline] = useState(true)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <POSHeader currentView={currentView} setCurrentView={setCurrentView} isOnline={isOnline} />
      
      <div className="flex-1 overflow-hidden">
        {currentView === 'dashboard' && <POSDashboard />}
        {currentView === 'tables' && <TableView />}
        {currentView === 'queue' && <OrderQueue />}
      </div>
    </div>
  )
}
