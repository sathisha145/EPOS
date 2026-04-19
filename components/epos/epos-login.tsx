'use client'

import { useState } from 'react'
import { Lock, User, AlertCircle } from 'lucide-react'
import type { Staff } from '@/app/epos/page'

const STAFF_LIST: Staff[] = [
  { id: '1', name: 'Marco', pin: '1234', role: 'manager' },
  { id: '2', name: 'Sofia', pin: '5678', role: 'staff' },
  { id: '3', name: 'Luigi', pin: '9012', role: 'staff' },
]

interface EPOSLoginProps {
  onLogin: (staff: Staff) => void
}

export function EPOSLogin({ onLogin }: EPOSLoginProps) {
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [showPinPad, setShowPinPad] = useState(false)

  const handleStaffSelect = (staff: Staff) => {
    setSelectedStaff(staff)
    setShowPinPad(true)
    setPin('')
    setError('')
  }

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit
      setPin(newPin)
      
      if (newPin.length === 4) {
        if (selectedStaff && newPin === selectedStaff.pin) {
          onLogin(selectedStaff)
        } else {
          setError('Incorrect PIN')
          setTimeout(() => {
            setPin('')
            setError('')
          }, 1000)
        }
      }
    }
  }

  const handleClear = () => {
    setPin('')
    setError('')
  }

  const handleBack = () => {
    setShowPinPad(false)
    setSelectedStaff(null)
    setPin('')
    setError('')
  }

  const currentTime = new Date().toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1410] via-[#2d2416] to-[#1a1410] flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif font-bold text-[#d4a574] mb-2">
          Café Zecchino
        </h1>
        <p className="text-[#a89f92] text-lg">Electronic Point of Sale</p>
        <div className="mt-4 text-[#7a6f63]">
          <p className="text-3xl font-light">{currentTime}</p>
          <p className="text-sm mt-1">{currentDate}</p>
        </div>
      </div>

      {!showPinPad ? (
        /* Staff Selection */
        <div className="w-full max-w-md">
          <p className="text-center text-[#a89f92] mb-6 text-lg">Select your profile to sign in</p>
          <div className="grid grid-cols-1 gap-4">
            {STAFF_LIST.map((staff) => (
              <button
                key={staff.id}
                onClick={() => handleStaffSelect(staff)}
                className="flex items-center gap-4 p-5 bg-[#2d2416]/80 border-2 border-[#3d342b] rounded-2xl hover:border-[#d4a574] hover:bg-[#3d342b]/80 transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-[#8b5a3c] flex items-center justify-center">
                  <User className="w-7 h-7 text-[#faf9f7]" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-xl font-semibold text-[#f5f0eb]">{staff.name}</p>
                  <p className="text-sm text-[#a89f92] capitalize">{staff.role}</p>
                </div>
                <Lock className="w-5 h-5 text-[#7a6f63] group-hover:text-[#d4a574] transition-colors" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* PIN Pad */
        <div className="w-full max-w-sm">
          <button
            onClick={handleBack}
            className="text-[#a89f92] hover:text-[#d4a574] mb-6 flex items-center gap-2 transition-colors"
          >
            <span className="text-xl">←</span> Back
          </button>

          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[#8b5a3c] flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-[#faf9f7]" />
            </div>
            <p className="text-2xl font-semibold text-[#f5f0eb]">{selectedStaff?.name}</p>
            <p className="text-[#a89f92]">Enter your 4-digit PIN</p>
          </div>

          {/* PIN Display */}
          <div className="flex justify-center gap-4 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${
                  error 
                    ? 'border-red-500 bg-red-500/20' 
                    : pin.length > i 
                      ? 'border-[#d4a574] bg-[#d4a574]/20' 
                      : 'border-[#3d342b] bg-[#2d2416]'
                }`}
              >
                {pin.length > i && (
                  <div className={`w-4 h-4 rounded-full ${error ? 'bg-red-500' : 'bg-[#d4a574]'}`} />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-400 mb-4">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '←'].map((key) => (
              <button
                key={key}
                onClick={() => {
                  if (key === 'C') handleClear()
                  else if (key === '←') setPin(prev => prev.slice(0, -1))
                  else handlePinInput(key)
                }}
                className={`h-16 rounded-xl text-2xl font-semibold transition-all ${
                  key === 'C' 
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' 
                    : key === '←'
                      ? 'bg-[#3d342b] text-[#a89f92] hover:bg-[#4d443b]'
                      : 'bg-[#2d2416] text-[#f5f0eb] hover:bg-[#3d342b] border border-[#3d342b]'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <p className="text-center text-[#7a6f63] text-sm mt-8">
            Demo PINs: Marco (1234), Sofia (5678), Luigi (9012)
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-6 text-center text-[#5a5249] text-sm">
        <p>Café Zecchino EPOS v1.0</p>
        <p className="flex items-center justify-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          System Online
        </p>
      </div>
    </div>
  )
}
