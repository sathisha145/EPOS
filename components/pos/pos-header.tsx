'use client'

import { Wifi, WifiOff, Settings, LogOut, Coffee } from 'lucide-react'

interface POSHeaderProps {
  currentView: 'dashboard' | 'tables' | 'queue'
  setCurrentView: (view: 'dashboard' | 'tables' | 'queue') => void
  isOnline: boolean
}

export function POSHeader({ currentView, setCurrentView, isOnline }: POSHeaderProps) {
  return (
    <div className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Coffee className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-serif font-bold">Café Zecchino POS</h1>
            <p className="text-sm opacity-90">Point of Sale System</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentView === 'dashboard'
                  ? 'bg-primary-foreground text-primary font-semibold'
                  : 'hover:bg-primary-foreground/20'
              }`}
            >
              New Order
            </button>
            <button
              onClick={() => setCurrentView('tables')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentView === 'tables'
                  ? 'bg-primary-foreground text-primary font-semibold'
                  : 'hover:bg-primary-foreground/20'
              }`}
            >
              Tables
            </button>
            <button
              onClick={() => setCurrentView('queue')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentView === 'queue'
                  ? 'bg-primary-foreground text-primary font-semibold'
                  : 'hover:bg-primary-foreground/20'
              }`}
            >
              Order Queue
            </button>
          </div>

          <div className="flex items-center gap-3">
            {isOnline ? (
              <div className="flex items-center gap-2 text-sm">
                <Wifi className="w-5 h-5 text-green-400" />
                <span>Online</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm bg-red-500/20 px-3 py-1 rounded-full">
                <WifiOff className="w-5 h-5" />
                <span>Offline Mode</span>
              </div>
            )}
            <button className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-all">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-all">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
