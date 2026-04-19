'use client'

import { useState } from 'react'
import { Clock, CheckCircle2, ChefHat } from 'lucide-react'

interface QueueOrder {
  id: string
  orderNumber: number
  items: string[]
  status: 'pending' | 'preparing' | 'ready'
  table?: number
  createdAt: Date
  startedAt?: Date
}

export function OrderQueue() {
  const [orders, setOrders] = useState<QueueOrder[]>([
    {
      id: '1',
      orderNumber: 101,
      items: ['Cappuccino x2', 'Croissant', 'Panini Prosciutto'],
      status: 'preparing',
      table: 3,
      createdAt: new Date(Date.now() - 600000),
      startedAt: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      orderNumber: 102,
      items: ['Espresso x3', 'Pain au Chocolat x3'],
      status: 'pending',
      createdAt: new Date(Date.now() - 180000),
    },
    {
      id: '3',
      orderNumber: 103,
      items: ['Latte', 'Quiche Lorraine'],
      status: 'ready',
      table: 7,
      createdAt: new Date(Date.now() - 900000),
      startedAt: new Date(Date.now() - 600000),
    },
    {
      id: '4',
      orderNumber: 104,
      items: ['Flat White', 'Almond Croissant'],
      status: 'pending',
      table: 2,
      createdAt: new Date(Date.now() - 120000),
    },
  ])

  const updateOrderStatus = (orderId: string, newStatus: 'pending' | 'preparing' | 'ready') => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              startedAt: newStatus === 'preparing' && !order.startedAt ? new Date() : order.startedAt,
            }
          : order
      )
    )
  }

  const completeOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId))
  }

  const getTimeElapsed = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 60) return `${minutes}m`
    return `${Math.floor(minutes / 60)}h`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-yellow-200'
      case 'preparing':
        return 'bg-blue-50 border-blue-200'
      case 'ready':
        return 'bg-green-50 border-green-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'preparing':
        return 'bg-blue-100 text-blue-800'
      case 'ready':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const pendingOrders = orders.filter(o => o.status === 'pending')
  const preparingOrders = orders.filter(o => o.status === 'preparing')
  const readyOrders = orders.filter(o => o.status === 'ready')

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h2 className="text-2xl font-serif font-bold mb-2">Kitchen Display System (KDS)</h2>
        <div className="flex gap-6 text-sm">
          <div>
            <span className="font-semibold text-yellow-700">{pendingOrders.length}</span>
            <span className="text-muted-foreground"> Pending</span>
          </div>
          <div>
            <span className="font-semibold text-blue-700">{preparingOrders.length}</span>
            <span className="text-muted-foreground"> Preparing</span>
          </div>
          <div>
            <span className="font-semibold text-green-700">{readyOrders.length}</span>
            <span className="text-muted-foreground"> Ready</span>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map(order => (
            <div
              key={order.id}
              className={`p-4 rounded-xl border-2 ${getStatusColor(order.status)}`}
            >
              {/* Order Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold">#{order.orderNumber}</h3>
                  {order.table && (
                    <p className="text-sm text-muted-foreground">Table {order.table}</p>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadgeColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="bg-white/50 p-3 rounded-lg mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="text-sm py-1 font-medium text-foreground">
                    • {item}
                  </div>
                ))}
              </div>

              {/* Timer */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="w-4 h-4" />
                <span>{getTimeElapsed(order.createdAt)} ago</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    <ChefHat className="w-4 h-4" />
                    Start
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Ready
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    onClick={() => completeOrder(order.id)}
                    className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <ChefHat className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-lg font-semibold text-foreground">All caught up!</p>
              <p className="text-muted-foreground">No pending orders</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
