'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Banknote, 
  Receipt,
  Percent,
  Tag,
  Users,
  SplitSquareVertical,
  Printer,
  X,
  Check,
  Coffee,
  IceCream,
  Croissant,
  Sandwich,
  Cake,
  Egg,
  Search,
  Grid3X3,
  List
} from 'lucide-react'
import type { Staff } from '@/app/epos/page'
import { MENU_CATEGORIES, MENU_ITEMS, getMenuItemsByCategory, type MenuItem } from '@/lib/menu-data'

interface OrderItem extends MenuItem {
  quantity: number
  notes?: string
}

const CATEGORY_ICONS: Record<string, typeof Coffee> = {
  'hot-drinks': Coffee,
  'cold-drinks': IceCream,
  'pastries': Croissant,
  'breakfast': Egg,
  'lunch': Sandwich,
  'desserts': Cake,
  'extras': Plus,
}

interface EPOSTillProps {
  staff: Staff
}

export function EPOSTill({ staff }: EPOSTillProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [activeCategory, setActiveCategory] = useState('hot-drinks')
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in')
  const [tableNumber, setTableNumber] = useState<number | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'cash' | null>(null)
  const [cashReceived, setCashReceived] = useState('')
  const [orderComplete, setOrderComplete] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const currentCategory = MENU_CATEGORIES.find(c => c.id === activeCategory)
  
  const filteredItems = useMemo(() => {
    let items = getMenuItemsByCategory(activeCategory)
    
    if (activeSubcategory) {
      items = items.filter(item => item.subcategory === activeSubcategory)
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      items = MENU_ITEMS.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      )
    }
    
    return items
  }, [activeCategory, activeSubcategory, searchQuery])

  const addItem = (item: MenuItem) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, delta: number) => {
    setOrderItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const removeItem = (id: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== id))
  }

  const clearOrder = () => {
    setOrderItems([])
    setTableNumber(null)
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const vatRate = 0.20
  const vat = subtotal * vatRate
  const total = subtotal + vat

  const handlePayment = () => {
    setOrderComplete(true)
    setTimeout(() => {
      setOrderComplete(false)
      setShowPayment(false)
      setSelectedPayment(null)
      setCashReceived('')
      clearOrder()
    }, 3000)
  }

  const cashChange = cashReceived ? parseFloat(cashReceived) - total : 0

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setActiveSubcategory(null)
    setSearchQuery('')
  }

  return (
    <div className="flex h-full">
      {/* Left Side - Menu Grid */}
      <div className="flex-1 flex flex-col bg-[#1a1a1a]">
        {/* Search Bar */}
        <div className="p-3 bg-[#242424] border-b border-[#3d342b]">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a6f63]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search menu items..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#1a1a1a] border border-[#3d342b] rounded-lg text-[#f5f0eb] placeholder-[#5a5249] focus:outline-none focus:border-[#d4a574]"
              />
            </div>
            <div className="flex gap-1 bg-[#1a1a1a] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#d4a574] text-[#1a1410]' : 'text-[#7a6f63]'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#d4a574] text-[#1a1410]' : 'text-[#7a6f63]'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs - Horizontal Scroll */}
        <div className="flex gap-2 p-3 bg-[#242424] border-b border-[#3d342b] overflow-x-auto scrollbar-hide">
          {MENU_CATEGORIES.map(category => {
            const Icon = CATEGORY_ICONS[category.id] || Coffee
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === category.id
                    ? 'bg-[#d4a574] text-[#1a1410]'
                    : 'bg-[#2d2416] text-[#a89f92] hover:bg-[#3d342b]'
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Subcategory Pills */}
        {currentCategory?.subcategories && !searchQuery && (
          <div className="flex gap-2 p-3 bg-[#1f1f1f] overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveSubcategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                !activeSubcategory
                  ? 'bg-[#8b5a3c] text-[#faf9f7]'
                  : 'bg-[#2d2416] text-[#a89f92] hover:bg-[#3d342b]'
              }`}
            >
              All
            </button>
            {currentCategory.subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeSubcategory === sub
                    ? 'bg-[#8b5a3c] text-[#faf9f7]'
                    : 'bg-[#2d2416] text-[#a89f92] hover:bg-[#3d342b]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items Grid/List */}
        <div className="flex-1 overflow-y-auto p-3">
          {searchQuery && (
            <p className="text-[#7a6f63] text-sm mb-3">
              {filteredItems.length} results for &quot;{searchQuery}&quot;
            </p>
          )}
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className="flex flex-col bg-[#2d2416] border-2 border-[#3d342b] rounded-xl hover:border-[#d4a574] hover:bg-[#3d342b] transition-all overflow-hidden active:scale-95 group"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-square bg-[#1a1a1a]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Coffee className="w-12 h-12 text-[#3d342b]" />
                      </div>
                    )}
                    {item.badge && (
                      <span className="absolute top-2 left-2 bg-[#c9532f] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {/* Details */}
                  <div className="p-3 flex flex-col flex-1">
                    <span className="text-[#f5f0eb] font-medium text-sm line-clamp-2 mb-1">
                      {item.name}
                    </span>
                    <span className="text-[#d4a574] font-bold text-lg mt-auto">
                      £{item.price.toFixed(2)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className="w-full flex items-center gap-4 p-3 bg-[#2d2416] border-2 border-[#3d342b] rounded-xl hover:border-[#d4a574] hover:bg-[#3d342b] transition-all active:scale-[0.99]"
                >
                  {/* Image */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#1a1a1a] shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Coffee className="w-8 h-8 text-[#3d342b]" />
                      </div>
                    )}
                  </div>
                  {/* Details */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[#f5f0eb] font-medium">{item.name}</span>
                      {item.badge && (
                        <span className="bg-[#c9532f] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <span className="text-[#7a6f63] text-sm line-clamp-1">{item.description}</span>
                    )}
                  </div>
                  <span className="text-[#d4a574] font-bold text-lg">
                    £{item.price.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions Bar */}
        <div className="flex gap-2 p-3 bg-[#242424] border-t border-[#3d342b]">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2d2416] text-[#a89f92] rounded-lg hover:bg-[#3d342b] transition-all">
            <Percent className="w-4 h-4" />
            Discount
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2d2416] text-[#a89f92] rounded-lg hover:bg-[#3d342b] transition-all">
            <Tag className="w-4 h-4" />
            Promo Code
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2d2416] text-[#a89f92] rounded-lg hover:bg-[#3d342b] transition-all">
            <Users className="w-4 h-4" />
            Covers
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2d2416] text-[#a89f92] rounded-lg hover:bg-[#3d342b] transition-all">
            <SplitSquareVertical className="w-4 h-4" />
            Split Bill
          </button>
        </div>
      </div>

      {/* Right Side - Order Summary */}
      <div className="w-[400px] flex flex-col bg-[#242424] border-l border-[#3d342b]">
        {/* Order Type & Table */}
        <div className="p-4 border-b border-[#3d342b]">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setOrderType('dine-in')}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                orderType === 'dine-in'
                  ? 'bg-[#d4a574] text-[#1a1410]'
                  : 'bg-[#2d2416] text-[#a89f92] hover:bg-[#3d342b]'
              }`}
            >
              Dine In
            </button>
            <button
              onClick={() => setOrderType('takeaway')}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                orderType === 'takeaway'
                  ? 'bg-[#d4a574] text-[#1a1410]'
                  : 'bg-[#2d2416] text-[#a89f92] hover:bg-[#3d342b]'
              }`}
            >
              Takeaway
            </button>
          </div>
          
          {orderType === 'dine-in' && (
            <div className="flex items-center gap-2">
              <span className="text-[#7a6f63] text-sm">Table:</span>
              <div className="flex gap-1 flex-wrap">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                  <button
                    key={num}
                    onClick={() => setTableNumber(num)}
                    className={`w-9 h-9 rounded-lg font-medium transition-all ${
                      tableNumber === num
                        ? 'bg-[#8b5a3c] text-[#faf9f7]'
                        : 'bg-[#2d2416] text-[#a89f92] hover:bg-[#3d342b]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {orderItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#5a5249]">
              <Receipt className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg">No items yet</p>
              <p className="text-sm">Tap items to add them</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orderItems.map(item => (
                <div key={item.id} className="bg-[#2d2416] rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-3">
                      {item.image && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-[#f5f0eb] font-medium">{item.name}</p>
                        <p className="text-[#7a6f63] text-sm">
                          £{item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-[#7a6f63] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-lg bg-[#1a1a1a] text-[#a89f92] hover:bg-[#3d342b] flex items-center justify-center transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-[#f5f0eb] font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-lg bg-[#1a1a1a] text-[#a89f92] hover:bg-[#3d342b] flex items-center justify-center transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-[#d4a574] font-bold">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="p-4 border-t border-[#3d342b] bg-[#1a1a1a]">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-[#a89f92]">
              <span>Subtotal ({orderItems.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#a89f92]">
              <span>VAT (20%)</span>
              <span>£{vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-[#f5f0eb] pt-2 border-t border-[#3d342b]">
              <span>Total</span>
              <span className="text-[#d4a574]">£{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={clearOrder}
              className="py-3 rounded-lg font-medium bg-[#2d2416] text-[#a89f92] hover:bg-[#3d342b] transition-all"
            >
              Clear
            </button>
            <button
              onClick={() => {}}
              className="py-3 rounded-lg font-medium bg-[#2d2416] text-[#a89f92] hover:bg-[#3d342b] transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
          
          <button
            onClick={() => setShowPayment(true)}
            disabled={orderItems.length === 0}
            className="w-full py-4 rounded-xl font-bold text-lg bg-[#d4a574] text-[#1a1410] hover:bg-[#c9946a] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Pay £{total.toFixed(2)}
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#242424] rounded-2xl w-full max-w-lg overflow-hidden">
            {orderComplete ? (
              <div className="p-12 text-center">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-12 h-12 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-[#f5f0eb] mb-2">Payment Complete!</h2>
                <p className="text-[#a89f92]">Order sent to kitchen</p>
                {selectedPayment === 'cash' && cashChange > 0 && (
                  <p className="text-[#d4a574] text-xl mt-4">
                    Change: £{cashChange.toFixed(2)}
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-4 border-b border-[#3d342b]">
                  <h2 className="text-xl font-bold text-[#f5f0eb]">Payment</h2>
                  <button
                    onClick={() => {
                      setShowPayment(false)
                      setSelectedPayment(null)
                      setCashReceived('')
                    }}
                    className="p-2 text-[#7a6f63] hover:text-[#f5f0eb] transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6 text-center border-b border-[#3d342b]">
                  <p className="text-[#7a6f63] mb-1">Amount Due</p>
                  <p className="text-5xl font-bold text-[#d4a574]">£{total.toFixed(2)}</p>
                </div>

                <div className="p-4">
                  <p className="text-[#7a6f63] text-sm mb-3">Select payment method</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => setSelectedPayment('card')}
                      className={`flex flex-col items-center gap-2 p-6 rounded-xl border-2 transition-all ${
                        selectedPayment === 'card'
                          ? 'border-[#d4a574] bg-[#d4a574]/10'
                          : 'border-[#3d342b] hover:border-[#5a5249]'
                      }`}
                    >
                      <CreditCard className={`w-10 h-10 ${selectedPayment === 'card' ? 'text-[#d4a574]' : 'text-[#7a6f63]'}`} />
                      <span className={`font-medium ${selectedPayment === 'card' ? 'text-[#d4a574]' : 'text-[#a89f92]'}`}>Card</span>
                    </button>
                    <button
                      onClick={() => setSelectedPayment('cash')}
                      className={`flex flex-col items-center gap-2 p-6 rounded-xl border-2 transition-all ${
                        selectedPayment === 'cash'
                          ? 'border-[#d4a574] bg-[#d4a574]/10'
                          : 'border-[#3d342b] hover:border-[#5a5249]'
                      }`}
                    >
                      <Banknote className={`w-10 h-10 ${selectedPayment === 'cash' ? 'text-[#d4a574]' : 'text-[#7a6f63]'}`} />
                      <span className={`font-medium ${selectedPayment === 'cash' ? 'text-[#d4a574]' : 'text-[#a89f92]'}`}>Cash</span>
                    </button>
                  </div>

                  {selectedPayment === 'cash' && (
                    <div className="mb-4">
                      <p className="text-[#7a6f63] text-sm mb-2">Cash Received</p>
                      <input
                        type="number"
                        value={cashReceived}
                        onChange={e => setCashReceived(e.target.value)}
                        placeholder="0.00"
                        className="w-full p-4 text-2xl text-center bg-[#1a1a1a] border border-[#3d342b] rounded-xl text-[#f5f0eb] focus:outline-none focus:border-[#d4a574]"
                      />
                      {parseFloat(cashReceived) >= total && (
                        <p className="text-center mt-3 text-green-400 text-lg">
                          Change: £{(parseFloat(cashReceived) - total).toFixed(2)}
                        </p>
                      )}
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        {['5', '10', '20', '50'].map(amount => (
                          <button
                            key={amount}
                            onClick={() => setCashReceived(amount)}
                            className="py-2 bg-[#2d2416] text-[#a89f92] rounded-lg hover:bg-[#3d342b] transition-all"
                          >
                            £{amount}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handlePayment}
                    disabled={!selectedPayment || (selectedPayment === 'cash' && parseFloat(cashReceived) < total)}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-[#d4a574] text-[#1a1410] hover:bg-[#c9946a] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Complete Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
