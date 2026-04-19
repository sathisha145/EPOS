'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft,
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  Upload,
  X,
  Check,
  Coffee,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react'
import { MENU_CATEGORIES, MENU_ITEMS, type MenuItem, type MenuCategory } from '@/lib/menu-data'

export default function MenuManagementPage() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    category: 'hot-drinks',
    description: '',
    available: true
  })

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleGenerateImage = async (itemName: string) => {
    setIsGeneratingImage(true)
    // Simulate AI image generation - in production this would call fal.ai or similar
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGeneratingImage(false)
    // Would set the generated image URL here
    alert(`AI image generation would be triggered for: "${itemName}"\n\nIn production, this would use fal.ai or similar to generate a professional food photo.`)
  }

  const handleToggleAvailability = (itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, available: !item.available } : item
    ))
  }

  const handleDeleteItem = (itemId: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(prev => prev.filter(item => item.id !== itemId))
    }
  }

  const handleSaveItem = () => {
    if (!newItem.name || !newItem.price) return
    
    const item: MenuItem = {
      id: newItem.id || `item-${Date.now()}`,
      name: newItem.name,
      price: newItem.price,
      category: newItem.category || 'hot-drinks',
      subcategory: newItem.subcategory,
      description: newItem.description,
      image: newItem.image,
      badge: newItem.badge,
      available: newItem.available ?? true
    }
    
    if (editingItem) {
      setItems(prev => prev.map(i => i.id === editingItem.id ? item : i))
    } else {
      setItems(prev => [...prev, item])
    }
    
    setShowAddModal(false)
    setEditingItem(null)
    setNewItem({
      name: '',
      price: 0,
      category: 'hot-drinks',
      description: '',
      available: true
    })
  }

  const currentCategoryData = selectedCategory ? MENU_CATEGORIES.find(c => c.id === selectedCategory) : null

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="bg-[#242424] border-b border-[#3d342b] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/epos" className="p-2 hover:bg-[#3d342b] rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-[#a89f92]" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[#f5f0eb]">Menu Management</h1>
              <p className="text-sm text-[#7a6f63]">{items.length} total items</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingItem(null)
              setNewItem({
                name: '',
                price: 0,
                category: 'hot-drinks',
                description: '',
                available: true
              })
              setShowAddModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#d4a574] text-[#1a1410] rounded-lg font-medium hover:bg-[#c9946a] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Item
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Categories */}
        <aside className="w-64 bg-[#242424] border-r border-[#3d342b] p-4 min-h-[calc(100vh-73px)]">
          <h2 className="text-sm font-medium text-[#7a6f63] mb-3">Categories</h2>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                !selectedCategory ? 'bg-[#d4a574] text-[#1a1410]' : 'text-[#a89f92] hover:bg-[#3d342b]'
              }`}
            >
              All Items ({items.length})
            </button>
            {MENU_CATEGORIES.map(category => {
              const count = items.filter(i => i.category === category.id).length
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id ? 'bg-[#d4a574] text-[#1a1410]' : 'text-[#a89f92] hover:bg-[#3d342b]'
                  }`}
                >
                  {category.name} ({count})
                </button>
              )
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a6f63]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search menu items..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#242424] border border-[#3d342b] rounded-lg text-[#f5f0eb] placeholder-[#5a5249] focus:outline-none focus:border-[#d4a574]"
              />
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className={`bg-[#242424] rounded-xl overflow-hidden border-2 transition-all ${
                  item.available ? 'border-[#3d342b]' : 'border-red-900/50 opacity-60'
                }`}
              >
                {/* Image */}
                <div className="relative aspect-square bg-[#1a1a1a]">
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <Coffee className="w-12 h-12 text-[#3d342b]" />
                      <button
                        onClick={() => handleGenerateImage(item.name)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#2d2416] text-[#d4a574] rounded-lg text-sm hover:bg-[#3d342b] transition-colors"
                      >
                        <Sparkles className="w-4 h-4" />
                        Generate AI Image
                      </button>
                    </div>
                  )}
                  {item.badge && (
                    <span className="absolute top-2 left-2 bg-[#c9532f] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                  {!item.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Unavailable
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-[#f5f0eb]">{item.name}</h3>
                      <p className="text-sm text-[#7a6f63]">{item.subcategory}</p>
                    </div>
                    <span className="text-[#d4a574] font-bold">£{item.price.toFixed(2)}</span>
                  </div>
                  {item.description && (
                    <p className="text-sm text-[#5a5249] mb-3 line-clamp-2">{item.description}</p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#3d342b]">
                    <button
                      onClick={() => {
                        setEditingItem(item)
                        setNewItem(item)
                        setShowAddModal(true)
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#2d2416] text-[#a89f92] rounded-lg hover:bg-[#3d342b] transition-colors text-sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleAvailability(item.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        item.available 
                          ? 'bg-[#2d2416] text-green-400 hover:bg-[#3d342b]' 
                          : 'bg-red-900/20 text-red-400 hover:bg-red-900/30'
                      }`}
                      title={item.available ? 'Mark unavailable' : 'Mark available'}
                    >
                      {item.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 bg-[#2d2416] text-red-400 rounded-lg hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#242424] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#3d342b]">
              <h2 className="text-xl font-bold text-[#f5f0eb]">
                {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingItem(null)
                }}
                className="p-2 text-[#7a6f63] hover:text-[#f5f0eb] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Image Section */}
              <div>
                <label className="block text-sm font-medium text-[#a89f92] mb-2">Product Image</label>
                <div className="flex gap-4">
                  <div className="relative w-32 h-32 bg-[#1a1a1a] rounded-xl overflow-hidden border-2 border-dashed border-[#3d342b]">
                    {newItem.image ? (
                      <>
                        <Image
                          src={newItem.image}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => setNewItem(prev => ({ ...prev, image: undefined }))}
                          className="absolute top-1 right-1 p-1 bg-red-600 rounded-full"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#5a5249]">
                        <ImageIcon className="w-8 h-8 mb-1" />
                        <span className="text-xs">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleGenerateImage(newItem.name || 'menu item')}
                      disabled={isGeneratingImage || !newItem.name}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-all"
                    >
                      {isGeneratingImage ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      Generate with AI
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#2d2416] text-[#a89f92] rounded-lg hover:bg-[#3d342b] transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </button>
                    <input
                      type="text"
                      value={newItem.image || ''}
                      onChange={e => setNewItem(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="Or paste image URL..."
                      className="px-3 py-2 bg-[#1a1a1a] border border-[#3d342b] rounded-lg text-[#f5f0eb] text-sm placeholder-[#5a5249] focus:outline-none focus:border-[#d4a574]"
                    />
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#a89f92] mb-2">Item Name *</label>
                  <input
                    type="text"
                    value={newItem.name || ''}
                    onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Cappuccino"
                    className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#3d342b] rounded-lg text-[#f5f0eb] placeholder-[#5a5249] focus:outline-none focus:border-[#d4a574]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#a89f92] mb-2">Price (£) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.price || ''}
                    onChange={e => setNewItem(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#3d342b] rounded-lg text-[#f5f0eb] placeholder-[#5a5249] focus:outline-none focus:border-[#d4a574]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#a89f92] mb-2">Category *</label>
                  <select
                    value={newItem.category || 'hot-drinks'}
                    onChange={e => setNewItem(prev => ({ ...prev, category: e.target.value, subcategory: undefined }))}
                    className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#3d342b] rounded-lg text-[#f5f0eb] focus:outline-none focus:border-[#d4a574]"
                  >
                    {MENU_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#a89f92] mb-2">Subcategory</label>
                  <select
                    value={newItem.subcategory || ''}
                    onChange={e => setNewItem(prev => ({ ...prev, subcategory: e.target.value || undefined }))}
                    className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#3d342b] rounded-lg text-[#f5f0eb] focus:outline-none focus:border-[#d4a574]"
                  >
                    <option value="">None</option>
                    {MENU_CATEGORIES.find(c => c.id === newItem.category)?.subcategories?.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#a89f92] mb-2">Description</label>
                <textarea
                  value={newItem.description || ''}
                  onChange={e => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the item..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#3d342b] rounded-lg text-[#f5f0eb] placeholder-[#5a5249] focus:outline-none focus:border-[#d4a574] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#a89f92] mb-2">Badge (optional)</label>
                  <select
                    value={newItem.badge || ''}
                    onChange={e => setNewItem(prev => ({ ...prev, badge: e.target.value || undefined }))}
                    className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#3d342b] rounded-lg text-[#f5f0eb] focus:outline-none focus:border-[#d4a574]"
                  >
                    <option value="">No badge</option>
                    <option value="New">New</option>
                    <option value="Popular">Popular</option>
                    <option value="Chef Pick">Chef Pick</option>
                    <option value="Seasonal">Seasonal</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten Free">Gluten Free</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newItem.available ?? true}
                      onChange={e => setNewItem(prev => ({ ...prev, available: e.target.checked }))}
                      className="w-5 h-5 rounded border-[#3d342b] bg-[#1a1a1a] text-[#d4a574] focus:ring-[#d4a574]"
                    />
                    <span className="text-[#a89f92]">Available for ordering</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-[#3d342b]">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingItem(null)
                }}
                className="px-6 py-2.5 bg-[#2d2416] text-[#a89f92] rounded-lg hover:bg-[#3d342b] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveItem}
                disabled={!newItem.name || !newItem.price}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#d4a574] text-[#1a1410] rounded-lg font-medium hover:bg-[#c9946a] disabled:opacity-50 transition-colors"
              >
                <Check className="w-5 h-5" />
                {editingItem ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
