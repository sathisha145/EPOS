'use client'

import { useState, useEffect } from 'react'
import { Clock, ChefHat, Check, AlertTriangle, Bell, User } from 'lucide-react'

type OrderStatus = 'pending' | 'preparing' | 'ready'

interface KitchenOrder {
  id: string
  orderNumber: number
  type: 'dine-in' | 'takeaway'
  table?: number
  items: { name: string; quantity: number; notes?: string }[]
  createdAt: Date
  status: OrderStatus
}

const INITIAL_ORDERS: KitchenOrder[] = [
  {
    id: '1',
    orderNumber: 42,
    type: 'dine-in',
    table: 3,
    items: [
      { name: 'Cappuccino', quantity: 2 },
      { name: 'Flat White', quantity: 1 },
      { name: 'Croissant', quantity: 2 },
    ],
    createdAt: new Date(Date.now() - 8 * 60000),
    status: 'pending',
  },
  {
    id: '2',
    orderNumber: 43,
    type: 'takeaway',
    items: [
      { name: 'Iced Latte', quantity: 1, notes: 'Extra ice' },
      { name: 'Blueberry Muffin', quantity: 1 },
    ],
    createdAt: new Date(Date.now() - 5 * 60000),
    status: 'pending',
  },
  {
    id: '3',
    orderNumber: 44,
    type: 'dine-in',
    table: 6,
    items: [
      { name: 'Eggs Benedict', quantity: 2 },
      { name: 'Avocado Toast', quantity: 1 },
      { name: 'Fresh Orange Juice', quantity: 3 },
      { name: 'Americano', quantity: 1 },
    ],
    createdAt: new Date(Date.now() - 12 * 60000),
    status: 'preparing',
  },
  {
    id: '4',
    orderNumber: 45,
    type: 'dine-in',
    table: 1,
    items: [
      { name: 'Espresso', quantity: 2 },
      { name: 'Tiramisu', quantity: 2 },
    ],
    createdAt: new Date(Date.now() - 3 * 60000),
    status: 'preparing',
  },
  {
    id: '5',
    orderNumber: 40,
    type: 'takeaway',
    items: [
      { name: 'Latte', quantity: 2 },
      { name: 'Chocolate Brownie', quantity: 1 },
    ],
    createdAt: new Date(Date.now() - 15 * 60000),
    status: 'ready',
  },
  {
    id: '6',
    orderNumber: 41,
    type: 'dine-in',
    table: 9,
    items: [
      { name: 'Panini Prosciutto', quantity: 1 },
      { name: 'Caesar Salad', quantity: 1 },
    ],
    createdAt: new Date(Date.now() - 18 * 60000),
    status: 'ready',
  },
]

const STATUS_CONFIG = {
  pending: { title: 'New Orders', bg: 'bg-amber-500/10', accent: 'text-amber-400', border: 'border-amber-500/30' },
  preparing: { title: 'Preparing', bg: 'bg-blue-500/10', accent: 'text-blue-400', border: 'border-blue-500/30' },
  ready: { title: 'Ready', bg: 'bg-green-500/10', accent: 'text-green-400', border: 'border-green-500/30' },
}

export function EPOSKitchen() {
  const [orders, setOrders] = useState<KitchenOrder[]>(INITIAL_ORDERS)
  const [, setTick] = useState(0)

  // Update timer every minute
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 60000)
    return () => clearInterval(timer)
  }, [])

  const moveOrder = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const completeOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId))
  }

  const getMinutesAgo = (date: Date) => {
    return Math.floor((Date.now() - date.getTime()) / 60000)
  }

  const renderOrderCard = (order: KitchenOrder) => {
    const mins = getMinutesAgo(order.createdAt)
    const isUrgent = mins > 10 && order.status !== 'ready'
    const config = STATUS_CONFIG[order.status]

    return (
      <div
        key={order.id}
        className={`${config.bg} border-2 ${config.border} rounded-xl p-4 ${isUrgent ? 'animate-pulse' : ''}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#f5f0eb]">#{order.orderNumber}</span>
              {isUrgent && (
                <span className="flex items-center gap-1 text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
                  <AlertTriangle className="w-3 h-3" />
                  URGENT
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1 text-[#7a6f63] text-sm">
              {order.type === 'dine-in' ? (
                <>
                  <User className="w-4 h-4" />
                  <span>Table {order.table}</span>
                </>
              ) : (
                <span className="px-2 py-0.5 bg-[#3d342b] rounded text-[#a89f92]">Takeaway</span>
              )}
            </div>
          </div>
          <div className={`flex items-center gap-1 ${isUrgent ? 'text-red-400' : 'text-[#7a6f63]'}`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono">{mins}m</span>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-2 mb-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="w-6 h-6 rounded-full bg-[#3d342b] text-[#d4a574] text-sm flex items-center justify-center font-bold">
                {item.quantity}
              </span>
              <div className="flex-1">
                <p className="text-[#f5f0eb] font-medium">{item.name}</p>
                {item.notes && (
                  <p className="text-[#d4a574] text-sm italic">{item.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {order.status === 'pending' && (
            <button
              onClick={() => moveOrder(order.id, 'preparing')}
              className="flex-1 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
            >
              <ChefHat className="w-4 h-4" />
              Start Prep
            </button>
          )}
          {order.status === 'preparing' && (
            <button
              onClick={() => moveOrder(order.id, 'ready')}
              className="flex-1 py-2 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600 transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Ready
            </button>
          )}
          {order.status === 'ready' && (
            <button
              onClick={() => completeOrder(order.id)}
              className="flex-1 py-2 rounded-lg font-medium bg-[#d4a574] text-[#1a1410] hover:bg-[#c9946a] transition-all flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Collected
            </button>
          )}
        </div>
      </div>
    )
  }

  const columns: OrderStatus[] = ['pending', 'preparing', 'ready']

  return (
    <div className="h-full flex bg-[#1a1a1a]">
      {columns.map(status => {
        const config = STATUS_CONFIG[status]
        const columnOrders = orders.filter(o => o.status === status)
        
        return (
          <div key={status} className="flex-1 flex flex-col border-r border-[#3d342b] last:border-r-0">
            {/* Column Header */}
            <div className={`p-4 ${config.bg} border-b ${config.border}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-bold ${config.accent}`}>{config.title}</h2>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${config.bg} ${config.accent} border ${config.border}`}>
                  {columnOrders.length}
                </span>
              </div>
            </div>

            {/* Orders */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {columnOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-[#5a5249]">
                  <ChefHat className="w-16 h-16 mb-4 opacity-30" />
                  <p>No orders</p>
                </div>
              ) : (
                columnOrders.map(renderOrderCard)
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
