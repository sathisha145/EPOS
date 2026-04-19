'use client'

import { useState, useEffect } from 'react'
import { EPOSLogin } from '@/components/epos/epos-login'
import { EPOSTill } from '@/components/epos/epos-till'
import { EPOSTables } from '@/components/epos/epos-tables'
import { EPOSKitchen } from '@/components/epos/epos-kitchen'
import { EPOSReports } from '@/components/epos/epos-reports'
import { EPOSHeader } from '@/components/epos/epos-header'

export type Staff = {
  id: string
  name: string
  pin: string
  role: 'manager' | 'staff'
}

export type Screen = 'till' | 'tables' | 'kitchen' | 'reports'

export default function EPOSPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null)
  const [currentScreen, setCurrentScreen] = useState<Screen>('till')
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleLogin = (staff: Staff) => {
    setCurrentStaff(staff)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setCurrentStaff(null)
    setIsLoggedIn(false)
    setCurrentScreen('till')
  }

  if (!isLoggedIn) {
    return <EPOSLogin onLogin={handleLogin} />
  }

  return (
    <div className="h-screen flex flex-col bg-[#1a1a1a] overflow-hidden">
      <EPOSHeader 
        staff={currentStaff!}
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
        onLogout={handleLogout}
        isOnline={isOnline}
      />
      
      <main className="flex-1 overflow-hidden">
        {currentScreen === 'till' && <EPOSTill staff={currentStaff!} />}
        {currentScreen === 'tables' && <EPOSTables />}
        {currentScreen === 'kitchen' && <EPOSKitchen />}
        {currentScreen === 'reports' && <EPOSReports />}
      </main>
    </div>
  )
}
