'use client'

import { useState } from 'react'
import { Users, Clock, Receipt, Plus, X, Check } from 'lucide-react'

type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning'

interface Table {
  id: number
  name: string
  seats: number
  status: TableStatus
  guests?: number
  startTime?: Date
  orderTotal?: number
}

const INITIAL_TABLES: Table[] = [
  { id: 1, name: 'Table 1', seats: 2, status: 'occupied', guests: 2, startTime: new Date(Date.now() - 45 * 60000), orderTotal: 24.50 },
  { id: 2, name: 'Table 2', seats: 2, status: 'available', seats: 2 },
  { id: 3, name: 'Table 3', seats: 4, status: 'occupied', guests: 3, startTime: new Date(Date.now() - 20 * 60000), orderTotal: 18.80 },
  { id: 4, name: 'Table 4', seats: 4, status: 'reserved', seats: 4 },
  { id: 5, name: 'Table 5', seats: 6, status: 'available', seats: 6 },
  { id: 6, name: 'Table 6', seats: 6, status: 'occupied', guests: 5, startTime: new Date(Date.now() - 60 * 60000), orderTotal: 67.20 },
  { id: 7, name: 'Table 7', seats: 4, status: 'cleaning', seats: 4 },
  { id: 8, name: 'Table 8', seats: 2, status: 'available', seats: 2 },
  { id: 9, name: 'Window 1', seats: 2, status: 'occupied', guests: 2, startTime: new Date(Date.now() - 30 * 60000), orderTotal: 15.60 },
  { id: 10, name: 'Window 2', seats: 2, status: 'reserved', seats: 2 },
  { id: 11, name: 'Bar 1', seats: 1, status: 'occupied', guests: 1, startTime: new Date(Date.now() - 10 * 60000), orderTotal: 4.50 },
  { id: 12, name: 'Bar 2', seats: 1, status: 'available', seats: 1 },
]

const STATUS_STYLES: Record<TableStatus, { bg: string; border: string; text: string; label: string }> = {
  available: { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400', label: 'Available' },
  occupied: { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400', label: 'Occupied' },
  reserved: { bg: 'bg-amber-500/20', border: 'border-amber-500/50', text: 'text-amber-400', label: 'Reserved' },
  cleaning: { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400', label: 'Cleaning' },
}

export function EPOSTables() {
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)

  const formatDuration = (startTime: Date) => {
    const mins = Math.floor((Date.now() - startTime.getTime()) / 60000)
    if (mins < 60) return `${mins}m`
    return `${Math.floor(mins / 60)}h ${mins % 60}m`
  }

  const updateTableStatus = (tableId: number, status: TableStatus) => {
    setTables(prev => prev.map(t => 
      t.id === tableId 
        ? { 
            ...t, 
            status, 
            guests: status === 'available' ? undefined : t.guests,
            startTime: status === 'occupied' ? new Date() : status === 'available' ? undefined : t.startTime,
            orderTotal: status === 'available' ? undefined : t.orderTotal
          } 
        : t
    ))
    setSelectedTable(null)
  }

  const stats = {
    available: tables.filter(t => t.status === 'available').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
    totalGuests: tables.reduce((sum, t) => sum + (t.guests || 0), 0),
    totalRevenue: tables.reduce((sum, t) => sum + (t.orderTotal || 0), 0),
  }

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a]">
      {/* Stats Bar */}
      <div className="flex items-center gap-6 p-4 bg-[#242424] border-b border-[#3d342b]">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-[#a89f92]">{stats.available} Available</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-[#a89f92]">{stats.occupied} Occupied</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-[#a89f92]">{stats.reserved} Reserved</span>
        </div>
        <div className="ml-auto flex items-center gap-6">
          <div className="text-right">
            <p className="text-[#7a6f63] text-xs">Total Guests</p>
            <p className="text-[#f5f0eb] text-xl font-bold">{stats.totalGuests}</p>
          </div>
          <div className="text-right">
            <p className="text-[#7a6f63] text-xs">Active Orders</p>
            <p className="text-[#d4a574] text-xl font-bold">£{stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Table Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {tables.map(table => {
            const style = STATUS_STYLES[table.status]
            return (
              <button
                key={table.id}
                onClick={() => setSelectedTable(table)}
                className={`${style.bg} ${style.border} border-2 rounded-2xl p-4 text-left hover:scale-105 transition-transform`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-[#f5f0eb] font-bold text-lg">{table.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
                    {style.label}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-[#7a6f63] text-sm mb-2">
                  <Users className="w-4 h-4" />
                  <span>{table.guests || 0}/{table.seats} seats</span>
                </div>

                {table.status === 'occupied' && table.startTime && (
                  <>
                    <div className="flex items-center gap-2 text-[#7a6f63] text-sm mb-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(table.startTime)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#d4a574] font-semibold">
                      <Receipt className="w-4 h-4" />
                      <span>£{table.orderTotal?.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Table Detail Modal */}
      {selectedTable && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#242424] rounded-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#3d342b]">
              <h2 className="text-xl font-bold text-[#f5f0eb]">{selectedTable.name}</h2>
              <button
                onClick={() => setSelectedTable(null)}
                className="p-2 text-[#7a6f63] hover:text-[#f5f0eb] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#1a1a1a] rounded-xl p-4 text-center">
                  <Users className="w-8 h-8 text-[#d4a574] mx-auto mb-2" />
                  <p className="text-[#7a6f63] text-sm">Capacity</p>
                  <p className="text-[#f5f0eb] text-xl font-bold">{selectedTable.seats} seats</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-xl p-4 text-center">
                  <Receipt className="w-8 h-8 text-[#d4a574] mx-auto mb-2" />
                  <p className="text-[#7a6f63] text-sm">Current Bill</p>
                  <p className="text-[#f5f0eb] text-xl font-bold">£{selectedTable.orderTotal?.toFixed(2) || '0.00'}</p>
                </div>
              </div>

              <p className="text-[#7a6f63] text-sm mb-3">Change Status</p>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(STATUS_STYLES) as TableStatus[]).map(status => {
                  const style = STATUS_STYLES[status]
                  const isActive = selectedTable.status === status
                  return (
                    <button
                      key={status}
                      onClick={() => updateTableStatus(selectedTable.id, status)}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                        isActive 
                          ? `${style.bg} ${style.border} ${style.text}` 
                          : 'border-[#3d342b] text-[#7a6f63] hover:border-[#5a5249]'
                      }`}
                    >
                      {isActive && <Check className="w-4 h-4" />}
                      {style.label}
                    </button>
                  )
                })}
              </div>

              {selectedTable.status === 'occupied' && (
                <button className="w-full mt-4 py-3 rounded-xl font-medium bg-[#d4a574] text-[#1a1410] hover:bg-[#c9946a] transition-all flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add to Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
