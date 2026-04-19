'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Coffee } from 'lucide-react'
import { MENU_CATEGORIES, getMenuItemsByCategory, type MenuItem } from '@/lib/menu-data'

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('hot-drinks')
  
  const categoryItems = getMenuItemsByCategory(activeCategory)
  const featuredItems = categoryItems.filter(item => item.badge).slice(0, 4)
  const regularItems = categoryItems.filter(item => !item.badge)

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-medium tracking-wide mb-4">OUR OFFERINGS</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            Crafted with Passion
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Every item on our menu is carefully selected from Italy&apos;s finest suppliers, prepared with traditional methods
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {MENU_CATEGORIES.filter(c => c.id !== 'extras').map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured Items */}
        {featuredItems.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-serif font-semibold text-foreground mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              Featured
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.map(item => (
                <MenuCard key={item.id} item={item} featured />
              ))}
            </div>
          </div>
        )}

        {/* Regular Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {regularItems.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Hungry for More?
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            View our complete menu with daily specials and seasonal dishes
          </p>
          <button className="bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors font-semibold">
            Download Full Menu
          </button>
        </div>
      </div>
    </section>
  )
}

function MenuCard({ item, featured = false }: { item: MenuItem; featured?: boolean }) {
  return (
    <div className={`group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all ${
      featured ? 'md:flex md:flex-col' : ''
    }`}>
      {/* Image */}
      <div className={`relative bg-muted ${featured ? 'aspect-[4/3]' : 'aspect-square'}`}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Coffee className="w-12 h-12 text-muted-foreground/30" />
          </div>
        )}
        {item.badge && (
          <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
            {item.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className={`p-4 ${featured ? 'flex-1 flex flex-col' : ''}`}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {item.name}
          </h4>
        </div>
        {item.description && featured && (
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2 flex-1">
            {item.description}
          </p>
        )}
        <p className="font-serif font-bold text-primary">
          £{item.price.toFixed(2)}
        </p>
      </div>
    </div>
  )
}
