'use client'

import { useState } from 'react'
import { Plus, Trash2, CreditCard, Clock } from 'lucide-react'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  type: 'dine-in' | 'takeaway' | 'delivery'
  table?: number
  items: OrderItem[]
  createdAt: Date
}

const MENU_CATEGORIES = {
  'Espresso': [
    { id: '1', name: 'Espresso', price: 2.80 },
    { id: '2', name: 'Double Espresso', price: 3.20 },
    { id: '3', name: 'Macchiato', price: 3.50 },
  ],
  'Cappuccino & Latte': [
    { id: '4', name: 'Cappuccino', price: 4.20 },
    { id: '5', name: 'Latte', price: 4.50 },
    { id: '6', name: 'Flat White', price: 4.50 },
  ],
  'Pastries': [
    { id: '7', name: 'Croissant', price: 3.50 },
    { id: '8', name: 'Pain au Chocolat', price: 3.80 },
    { id: '9', name: 'Almond Croissant', price: 4.20 },
  ],
  'Food': [
    { id: '10', name: 'Panini Prosciutto', price: 8.50 },
    { id: '11', name: 'Focaccia Rosemary', price: 6.50 },
    { id: '12', name: 'Quiche Lorraine', price: 7.50 },
  ],
}

export function POSDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Espresso')
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in')
  const [selectedTable, setSelectedTable] = useState<number>(1)

  const addToOrder = (item: { id: string; name: string; price: number }) => {
    setCurrentOrder(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromOrder = (itemId: string) => {
    setCurrentOrder(prev => prev.filter(i => i.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(itemId)
    } else {
      setCurrentOrder(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i))
    }
  }

  const subtotal = currentOrder.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.2
  const total = subtotal + tax

  const completeOrder = () => {
    if (currentOrder.length === 0) return

    const newOrder: Order = {
      id: Date.now().toString(),
      type: orderType,
      table: orderType === 'dine-in' ? selectedTable : undefined,
      items: currentOrder,
      createdAt: new Date(),
    }

    setOrders(prev => [...prev, newOrder])
    setCurrentOrder([])
  }

  return (
    <div className="flex h-full bg-background">
      {/* Menu Selection - Left Side */}
      <div className="flex-1 flex flex-col border-r border-border overflow-hidden">
        {/* Category Tabs */}
        <div className="flex gap-2 p-4 bg-card border-b border-border overflow-x-auto">
          {Object.keys(MENU_CATEGORIES).map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {MENU_CATEGORIES[selectedCategory as keyof typeof MENU_CATEGORIES].map(item => (
              <button
                key={item.id}
                onClick={() => addToOrder(item)}
                className="p-4 bg-card border-2 border-border rounded-xl hover:border-primary hover:shadow-lg transition-all text-left"
              >
                <div className="font-semibold text-foreground">{item.name}</div>
                <div className="text-primary text-lg font-bold">£{item.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary - Right Side */}
      <div className="w-96 bg-card border-l border-border flex flex-col">
        {/* Order Type Selection */}
        <div className="p-4 border-b border-border">
          <p className="text-sm font-semibold text-muted-foreground mb-3">Order Type</p>
          <div className="grid grid-cols-3 gap-2">
            {(['dine-in', 'takeaway', 'delivery'] as const).map(type => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`py-2 rounded-lg font-medium transition-all capitalize ${
                  orderType === type
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {type.replace('-', ' ')}
              </button>
            ))}
          </div>

          {orderType === 'dine-in' && (
            <div className="mt-3">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Table</p>
              <input
                type="number"
                value={selectedTable}
                onChange={e => setSelectedTable(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                min="1"
                max="20"
              />
            </div>
          )}
        </div>

        {/* Current Order Items */}
        <div className="flex-1 overflow-y-auto p-4 border-b border-border">
          {currentOrder.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Clock className="w-12 h-12 text-muted-foreground/40 mb-2" />
              <p className="text-muted-foreground">No items added yet</p>
              <p className="text-sm text-muted-foreground">Select items from the menu</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentOrder.map(item => (
                <div key={item.id} className="bg-background p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-primary">£{item.price.toFixed(2)} each</p>
                    </div>
                    <button
                      onClick={() => removeFromOrder(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-muted rounded hover:bg-muted/80"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      className="w-12 text-center border border-border rounded px-2 py-1"
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-muted rounded hover:bg-muted/80"
                    >
                      +
                    </button>
                    <span className="ml-auto font-semibold">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Totals and Payment */}
        <div className="p-4 border-b border-border">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (20%)</span>
              <span className="font-semibold">£{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg border-t border-border pt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold text-primary">£{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={completeOrder}
              disabled={currentOrder.length === 0}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Payment
            </button>
            <button className="w-full bg-muted text-foreground py-2 rounded-lg font-semibold hover:bg-muted/80 transition-all">
              Clear Order
            </button>
          </div>
        </div>

        {/* Recent Orders Count */}
        <div className="p-4 bg-background text-center text-sm text-muted-foreground">
          {orders.length} order{orders.length !== 1 ? 's' : ''} processed today
        </div>
      </div>
    </div>
  )
}
