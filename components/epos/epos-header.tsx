'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Calculator, 
  Grid3X3, 
  ChefHat, 
  BarChart3, 
  LogOut, 
  Wifi, 
  WifiOff,
  Clock,
  User,
  UtensilsCrossed,
  Settings
} from 'lucide-react'
import type { Staff, Screen } from '@/app/epos/page'

interface EPOSHeaderProps {
  staff: Staff
  currentScreen: Screen
  onScreenChange: (screen: Screen) => void
  onLogout: () => void
  isOnline: boolean
}

const NAV_ITEMS: { id: Screen; label: string; icon: typeof Calculator }[] = [
  { id: 'till', label: 'Till', icon: Calculator },
  { id: 'tables', label: 'Tables', icon: Grid3X3 },
  { id: 'kitchen', label: 'Kitchen', icon: ChefHat },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
]

export function EPOSHeader({ 
  staff, 
  currentScreen, 
  onScreenChange, 
  onLogout,
  isOnline 
}: EPOSHeaderProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="bg-[#2d2416] border-b border-[#3d342b] px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Logo & Time */}
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-serif font-bold text-[#d4a574]">
            Café Zecchino
          </h1>
          <div className="flex items-center gap-2 text-[#a89f92]">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-lg">
              {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onScreenChange(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                currentScreen === id
                  ? 'bg-[#d4a574] text-[#1a1410]'
                  : 'text-[#a89f92] hover:bg-[#3d342b] hover:text-[#f5f0eb]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline">{label}</span>
            </button>
          ))}
          <div className="w-px h-6 bg-[#3d342b] mx-2" />
          <Link
            href="/epos/menu"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-[#a89f92] hover:bg-[#3d342b] hover:text-[#f5f0eb] transition-all"
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span className="hidden md:inline">Menu</span>
          </Link>
          <Link
            href="/epos/settings"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-[#a89f92] hover:bg-[#3d342b] hover:text-[#f5f0eb] transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden md:inline">Settings</span>
          </Link>
        </nav>

        {/* Status & User */}
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            isOnline 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>

          {/* Staff Info */}
          <div className="flex items-center gap-3 pl-4 border-l border-[#3d342b]">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#f5f0eb]">{staff.name}</p>
              <p className="text-xs text-[#7a6f63] capitalize">{staff.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#8b5a3c] flex items-center justify-center">
              <User className="w-5 h-5 text-[#faf9f7]" />
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-[#7a6f63] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
