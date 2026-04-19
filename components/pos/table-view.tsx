'use client'

import { useState } from 'react'
import { Users, Clock, ChefHat } from 'lucide-react'

interface TableStatus {
  id: number
  status: 'available' | 'occupied' | 'reserved'
  guests?: number
  orderedAt?: Date
}

export function TableView() {
  const [tables, setTables] = useState<TableStatus[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      status: i < 3 ? 'occupied' : i < 5 ? 'reserved' : 'available',
      guests: i < 3 ? Math.floor(Math.random() * 4) + 2 : undefined,
      orderedAt: i < 3 ? new Date(Date.now() - Math.random() * 3600000) : undefined,
    }))
  )

  const toggleTableStatus = (id: number) => {
    setTables(prev =>
      prev.map(table =>
        table.id === id
          ? {
              ...table,
              status: table.status === 'available' ? 'occupied' : 'available',
              guests: table.status === 'available' ? 2 : undefined,
              orderedAt: table.status === 'available' ? new Date() : undefined,
            }
          : table
      )
    )
  }

  const getTableColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-100 border-red-300 hover:bg-red-200'
      case 'reserved':
        return 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200'
      case 'available':
        return 'bg-green-100 border-green-300 hover:bg-green-200'
      default:
        return 'bg-gray-100 border-gray-300'
    }
  }

  const getTimeElapsed = (date: Date | undefined) => {
    if (!date) return ''
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 60) return `${minutes}m`
    return `${Math.floor(minutes / 60)}h`
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h2 className="text-2xl font-serif font-bold mb-2">Table Management</h2>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-300 rounded"></div>
            <span>Available ({tables.filter(t => t.status === 'available').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-300 rounded"></div>
            <span>Occupied ({tables.filter(t => t.status === 'occupied').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-300 rounded"></div>
            <span>Reserved ({tables.filter(t => t.status === 'reserved').length})</span>
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tables.map(table => (
            <button
              key={table.id}
              onClick={() => toggleTableStatus(table.id)}
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${getTableColor(
                table.status
              )}`}
            >
              <div className="text-3xl font-bold mb-3 text-foreground">{table.id}</div>
              <div className="space-y-2">
                <div className="capitalize text-sm font-semibold text-foreground">
                  {table.status}
                </div>
                {table.status === 'occupied' && (
                  <>
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="w-4 h-4" />
                      <span>{table.guests} guests</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="w-4 h-4" />
                      <span>{getTimeElapsed(table.orderedAt)} in</span>
                    </div>
                  </>
                )}
                {table.status === 'available' && (
                  <div className="text-xs text-green-700">Ready for guests</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
