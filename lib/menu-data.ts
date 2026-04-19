export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  subcategory?: string
  description?: string
  image?: string
  badge?: string
  available: boolean
  modifiers?: Modifier[]
}

export interface Modifier {
  id: string
  name: string
  price: number
}

export interface MenuCategory {
  id: string
  name: string
  icon: string
  color: string
  subcategories?: string[]
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'hot-drinks', name: 'Hot Drinks', icon: 'Coffee', color: '#8B4513', subcategories: ['Espresso', 'Specialty', 'Tea'] },
  { id: 'cold-drinks', name: 'Cold Drinks', icon: 'IceCream', color: '#4169E1', subcategories: ['Iced Coffee', 'Fresh Juices', 'Smoothies'] },
  { id: 'pastries', name: 'Pastries', icon: 'Croissant', color: '#DAA520', subcategories: ['Croissants', 'Cakes', 'Italian'] },
  { id: 'breakfast', name: 'Breakfast', icon: 'Egg', color: '#FFD700', subcategories: ['Classics', 'Healthy', 'Italian'] },
  { id: 'lunch', name: 'Lunch', icon: 'Sandwich', color: '#228B22', subcategories: ['Paninis', 'Salads', 'Soups'] },
  { id: 'desserts', name: 'Desserts', icon: 'Cake', color: '#FF69B4', subcategories: ['Gelato', 'Cakes', 'Traditional'] },
  { id: 'extras', name: 'Extras', icon: 'Plus', color: '#808080', subcategories: ['Milk Options', 'Syrups', 'Toppings'] },
]

export const MENU_ITEMS: MenuItem[] = [
  // HOT DRINKS - Espresso
  { id: 'esp-single', name: 'Espresso', price: 2.50, category: 'hot-drinks', subcategory: 'Espresso', description: 'Bold, rich Italian shot', image: '/menu/espresso.jpg', available: true },
  { id: 'esp-double', name: 'Double Espresso', price: 3.00, category: 'hot-drinks', subcategory: 'Espresso', description: 'Intense double shot', image: '/menu/double-espresso.jpg', available: true },
  { id: 'esp-ristretto', name: 'Ristretto', price: 2.80, category: 'hot-drinks', subcategory: 'Espresso', description: 'Short, concentrated shot', image: '/menu/ristretto.jpg', available: true },
  { id: 'esp-lungo', name: 'Lungo', price: 3.00, category: 'hot-drinks', subcategory: 'Espresso', description: 'Long espresso pull', image: '/menu/lungo.jpg', available: true },
  
  // HOT DRINKS - Specialty
  { id: 'cap', name: 'Cappuccino', price: 3.80, category: 'hot-drinks', subcategory: 'Specialty', description: 'Espresso with steamed milk foam', image: '/menu/cappuccino.jpg', badge: 'Popular', available: true },
  { id: 'lat', name: 'Latte', price: 4.00, category: 'hot-drinks', subcategory: 'Specialty', description: 'Smooth espresso with milk', image: '/menu/latte.jpg', available: true },
  { id: 'flat', name: 'Flat White', price: 4.00, category: 'hot-drinks', subcategory: 'Specialty', description: 'Velvety microfoam espresso', image: '/menu/flat-white.jpg', available: true },
  { id: 'mac', name: 'Macchiato', price: 3.20, category: 'hot-drinks', subcategory: 'Specialty', description: 'Espresso marked with milk', image: '/menu/macchiato.jpg', available: true },
  { id: 'cort', name: 'Cortado', price: 3.40, category: 'hot-drinks', subcategory: 'Specialty', description: 'Equal espresso and milk', image: '/menu/cortado.jpg', available: true },
  { id: 'mocha', name: 'Mocha', price: 4.50, category: 'hot-drinks', subcategory: 'Specialty', description: 'Espresso, chocolate, milk', image: '/menu/mocha.jpg', available: true },
  { id: 'amer', name: 'Americano', price: 3.50, category: 'hot-drinks', subcategory: 'Specialty', description: 'Espresso with hot water', image: '/menu/americano.jpg', available: true },
  { id: 'affogato', name: 'Affogato', price: 5.00, category: 'hot-drinks', subcategory: 'Specialty', description: 'Espresso over gelato', image: '/menu/affogato.jpg', badge: 'Chef Pick', available: true },
  { id: 'hot-choc', name: 'Hot Chocolate', price: 4.00, category: 'hot-drinks', subcategory: 'Specialty', description: 'Rich Italian chocolate', image: '/menu/hot-chocolate.jpg', available: true },
  { id: 'chai', name: 'Chai Latte', price: 4.20, category: 'hot-drinks', subcategory: 'Specialty', description: 'Spiced tea with milk', image: '/menu/chai-latte.jpg', available: true },
  { id: 'matcha', name: 'Matcha Latte', price: 4.50, category: 'hot-drinks', subcategory: 'Specialty', description: 'Japanese green tea', image: '/menu/matcha-latte.jpg', available: true },
  
  // HOT DRINKS - Tea
  { id: 'tea-eng', name: 'English Breakfast', price: 3.00, category: 'hot-drinks', subcategory: 'Tea', description: 'Classic black tea', image: '/menu/english-tea.jpg', available: true },
  { id: 'tea-earl', name: 'Earl Grey', price: 3.00, category: 'hot-drinks', subcategory: 'Tea', description: 'Bergamot infused black tea', image: '/menu/earl-grey.jpg', available: true },
  { id: 'tea-green', name: 'Green Tea', price: 3.00, category: 'hot-drinks', subcategory: 'Tea', description: 'Light and refreshing', image: '/menu/green-tea.jpg', available: true },
  { id: 'tea-mint', name: 'Fresh Mint Tea', price: 3.50, category: 'hot-drinks', subcategory: 'Tea', description: 'Fresh mint leaves', image: '/menu/mint-tea.jpg', available: true },
  { id: 'tea-cham', name: 'Chamomile', price: 3.00, category: 'hot-drinks', subcategory: 'Tea', description: 'Calming herbal tea', image: '/menu/chamomile.jpg', available: true },
  
  // COLD DRINKS - Iced Coffee
  { id: 'ice-lat', name: 'Iced Latte', price: 4.50, category: 'cold-drinks', subcategory: 'Iced Coffee', description: 'Chilled espresso and milk', image: '/menu/iced-latte.jpg', available: true },
  { id: 'ice-amer', name: 'Iced Americano', price: 4.00, category: 'cold-drinks', subcategory: 'Iced Coffee', description: 'Espresso over ice', image: '/menu/iced-americano.jpg', available: true },
  { id: 'ice-mocha', name: 'Iced Mocha', price: 5.00, category: 'cold-drinks', subcategory: 'Iced Coffee', description: 'Chilled chocolate espresso', image: '/menu/iced-mocha.jpg', available: true },
  { id: 'cold-brew', name: 'Cold Brew', price: 4.50, category: 'cold-drinks', subcategory: 'Iced Coffee', description: '12hr steeped coffee', image: '/menu/cold-brew.jpg', badge: 'New', available: true },
  { id: 'frapp', name: 'Frappuccino', price: 5.50, category: 'cold-drinks', subcategory: 'Iced Coffee', description: 'Blended iced coffee', image: '/menu/frappuccino.jpg', available: true },
  
  // COLD DRINKS - Fresh Juices
  { id: 'oj', name: 'Fresh Orange', price: 4.50, category: 'cold-drinks', subcategory: 'Fresh Juices', description: 'Freshly squeezed', image: '/menu/orange-juice.jpg', available: true },
  { id: 'apple', name: 'Apple Juice', price: 4.00, category: 'cold-drinks', subcategory: 'Fresh Juices', description: 'Crisp apple juice', image: '/menu/apple-juice.jpg', available: true },
  { id: 'carrot', name: 'Carrot Ginger', price: 5.00, category: 'cold-drinks', subcategory: 'Fresh Juices', description: 'Carrot with ginger kick', image: '/menu/carrot-ginger.jpg', available: true },
  { id: 'lemon', name: 'Fresh Lemonade', price: 4.00, category: 'cold-drinks', subcategory: 'Fresh Juices', description: 'Homemade lemonade', image: '/menu/lemonade.jpg', available: true },
  
  // COLD DRINKS - Smoothies
  { id: 'sm-berry', name: 'Berry Blast', price: 5.80, category: 'cold-drinks', subcategory: 'Smoothies', description: 'Mixed berries and yogurt', image: '/menu/berry-smoothie.jpg', available: true },
  { id: 'sm-mango', name: 'Tropical Mango', price: 5.80, category: 'cold-drinks', subcategory: 'Smoothies', description: 'Mango, pineapple, coconut', image: '/menu/mango-smoothie.jpg', available: true },
  { id: 'sm-green', name: 'Green Machine', price: 6.00, category: 'cold-drinks', subcategory: 'Smoothies', description: 'Spinach, banana, apple', image: '/menu/green-smoothie.jpg', available: true },
  { id: 'sm-banana', name: 'Banana Protein', price: 6.00, category: 'cold-drinks', subcategory: 'Smoothies', description: 'Banana, oat, protein', image: '/menu/banana-smoothie.jpg', available: true },
  
  // PASTRIES - Croissants
  { id: 'croi-but', name: 'Butter Croissant', price: 3.20, category: 'pastries', subcategory: 'Croissants', description: 'Classic French butter', image: '/menu/butter-croissant.jpg', available: true },
  { id: 'croi-choc', name: 'Pain au Chocolat', price: 3.50, category: 'pastries', subcategory: 'Croissants', description: 'Chocolate filled pastry', image: '/menu/pain-chocolat.jpg', badge: 'Popular', available: true },
  { id: 'croi-alm', name: 'Almond Croissant', price: 4.00, category: 'pastries', subcategory: 'Croissants', description: 'Almond cream filled', image: '/menu/almond-croissant.jpg', available: true },
  { id: 'croi-ham', name: 'Ham & Cheese', price: 4.50, category: 'pastries', subcategory: 'Croissants', description: 'Savory ham and gruyere', image: '/menu/ham-cheese-croissant.jpg', available: true },
  
  // PASTRIES - Cakes
  { id: 'cake-carrot', name: 'Carrot Cake', price: 4.80, category: 'pastries', subcategory: 'Cakes', description: 'Cream cheese frosting', image: '/menu/carrot-cake.jpg', available: true },
  { id: 'cake-choc', name: 'Chocolate Fudge', price: 5.00, category: 'pastries', subcategory: 'Cakes', description: 'Rich chocolate layers', image: '/menu/chocolate-cake.jpg', available: true },
  { id: 'cake-lemon', name: 'Lemon Drizzle', price: 4.50, category: 'pastries', subcategory: 'Cakes', description: 'Light citrus sponge', image: '/menu/lemon-cake.jpg', available: true },
  { id: 'cake-cheese', name: 'Cheesecake', price: 5.50, category: 'pastries', subcategory: 'Cakes', description: 'New York style', image: '/menu/cheesecake.jpg', available: true },
  
  // PASTRIES - Italian
  { id: 'tira', name: 'Tiramisu', price: 5.80, category: 'pastries', subcategory: 'Italian', description: 'Classic espresso dessert', image: '/menu/tiramisu.jpg', badge: 'Chef Pick', available: true },
  { id: 'cann', name: 'Cannoli', price: 4.50, category: 'pastries', subcategory: 'Italian', description: 'Ricotta cream filled', image: '/menu/cannoli.jpg', available: true },
  { id: 'pan', name: 'Panna Cotta', price: 5.00, category: 'pastries', subcategory: 'Italian', description: 'Vanilla cream with berries', image: '/menu/panna-cotta.jpg', available: true },
  { id: 'biscotti', name: 'Biscotti', price: 2.50, category: 'pastries', subcategory: 'Italian', description: 'Almond Italian cookies', image: '/menu/biscotti.jpg', available: true },
  
  // BREAKFAST - Classics
  { id: 'br-full', name: 'Full Scottish', price: 12.50, category: 'breakfast', subcategory: 'Classics', description: 'Eggs, bacon, sausage, beans, tattie scone', image: '/menu/full-scottish.jpg', available: true },
  { id: 'br-eggs', name: 'Eggs Benedict', price: 10.50, category: 'breakfast', subcategory: 'Classics', description: 'Poached eggs, ham, hollandaise', image: '/menu/eggs-benedict.jpg', badge: 'Popular', available: true },
  { id: 'br-royal', name: 'Eggs Royale', price: 11.50, category: 'breakfast', subcategory: 'Classics', description: 'Smoked salmon, poached eggs', image: '/menu/eggs-royale.jpg', available: true },
  { id: 'br-toast', name: 'Avocado Toast', price: 9.00, category: 'breakfast', subcategory: 'Classics', description: 'Sourdough, avo, poached egg', image: '/menu/avocado-toast.jpg', available: true },
  { id: 'br-pancake', name: 'Fluffy Pancakes', price: 9.50, category: 'breakfast', subcategory: 'Classics', description: 'Stack with maple and berries', image: '/menu/pancakes.jpg', available: true },
  
  // BREAKFAST - Healthy
  { id: 'br-acai', name: 'Acai Bowl', price: 8.50, category: 'breakfast', subcategory: 'Healthy', description: 'Acai, granola, fresh fruit', image: '/menu/acai-bowl.jpg', available: true },
  { id: 'br-granola', name: 'Greek Yogurt Bowl', price: 7.00, category: 'breakfast', subcategory: 'Healthy', description: 'Yogurt, honey, granola', image: '/menu/yogurt-bowl.jpg', available: true },
  { id: 'br-porridge', name: 'Scottish Porridge', price: 6.00, category: 'breakfast', subcategory: 'Healthy', description: 'Oats with honey and berries', image: '/menu/porridge.jpg', available: true },
  
  // BREAKFAST - Italian
  { id: 'br-corn', name: 'Cornetto & Cappuccino', price: 6.50, category: 'breakfast', subcategory: 'Italian', description: 'Italian breakfast combo', image: '/menu/cornetto.jpg', available: true },
  { id: 'br-fritt', name: 'Frittata', price: 9.00, category: 'breakfast', subcategory: 'Italian', description: 'Italian omelette with vegetables', image: '/menu/frittata.jpg', available: true },
  
  // LUNCH - Paninis
  { id: 'pan-pro', name: 'Prosciutto Panini', price: 8.50, category: 'lunch', subcategory: 'Paninis', description: 'Italian ham, mozzarella, tomato', image: '/menu/prosciutto-panini.jpg', badge: 'Popular', available: true },
  { id: 'pan-cap', name: 'Caprese Panini', price: 8.00, category: 'lunch', subcategory: 'Paninis', description: 'Mozzarella, tomato, basil', image: '/menu/caprese-panini.jpg', available: true },
  { id: 'pan-chic', name: 'Chicken Pesto', price: 9.00, category: 'lunch', subcategory: 'Paninis', description: 'Grilled chicken, pesto, mozzarella', image: '/menu/chicken-panini.jpg', available: true },
  { id: 'pan-tuna', name: 'Tuna Melt', price: 8.50, category: 'lunch', subcategory: 'Paninis', description: 'Tuna, cheese, melted', image: '/menu/tuna-panini.jpg', available: true },
  { id: 'pan-veg', name: 'Grilled Vegetables', price: 8.00, category: 'lunch', subcategory: 'Paninis', description: 'Mediterranean grilled veg', image: '/menu/veggie-panini.jpg', available: true },
  
  // LUNCH - Salads
  { id: 'sal-caes', name: 'Caesar Salad', price: 9.50, category: 'lunch', subcategory: 'Salads', description: 'Romaine, parmesan, croutons', image: '/menu/caesar-salad.jpg', available: true },
  { id: 'sal-greek', name: 'Greek Salad', price: 9.00, category: 'lunch', subcategory: 'Salads', description: 'Feta, olives, cucumber', image: '/menu/greek-salad.jpg', available: true },
  { id: 'sal-goat', name: 'Goat Cheese Salad', price: 10.00, category: 'lunch', subcategory: 'Salads', description: 'Beetroot, walnuts, goat cheese', image: '/menu/goat-cheese-salad.jpg', available: true },
  
  // LUNCH - Soups
  { id: 'soup-tom', name: 'Tomato Basil', price: 6.50, category: 'lunch', subcategory: 'Soups', description: 'Classic with crusty bread', image: '/menu/tomato-soup.jpg', available: true },
  { id: 'soup-min', name: 'Minestrone', price: 7.00, category: 'lunch', subcategory: 'Soups', description: 'Hearty Italian vegetable', image: '/menu/minestrone.jpg', available: true },
  { id: 'soup-day', name: 'Soup of the Day', price: 6.50, category: 'lunch', subcategory: 'Soups', description: 'Ask your server', image: '/menu/soup-day.jpg', available: true },
  
  // DESSERTS - Gelato
  { id: 'gel-van', name: 'Vanilla Gelato', price: 4.00, category: 'desserts', subcategory: 'Gelato', description: 'Classic Italian vanilla', image: '/menu/vanilla-gelato.jpg', available: true },
  { id: 'gel-choc', name: 'Chocolate Gelato', price: 4.00, category: 'desserts', subcategory: 'Gelato', description: 'Rich Belgian chocolate', image: '/menu/chocolate-gelato.jpg', available: true },
  { id: 'gel-pist', name: 'Pistachio Gelato', price: 4.50, category: 'desserts', subcategory: 'Gelato', description: 'Sicilian pistachio', image: '/menu/pistachio-gelato.jpg', badge: 'Popular', available: true },
  { id: 'gel-straw', name: 'Strawberry Gelato', price: 4.00, category: 'desserts', subcategory: 'Gelato', description: 'Fresh strawberry', image: '/menu/strawberry-gelato.jpg', available: true },
  
  // EXTRAS - Milk Options
  { id: 'ex-oat', name: 'Oat Milk', price: 0.60, category: 'extras', subcategory: 'Milk Options', description: 'Plant-based alternative', available: true },
  { id: 'ex-soy', name: 'Soy Milk', price: 0.50, category: 'extras', subcategory: 'Milk Options', description: 'Classic plant milk', available: true },
  { id: 'ex-alm', name: 'Almond Milk', price: 0.60, category: 'extras', subcategory: 'Milk Options', description: 'Nutty alternative', available: true },
  { id: 'ex-coco', name: 'Coconut Milk', price: 0.60, category: 'extras', subcategory: 'Milk Options', description: 'Tropical plant milk', available: true },
  
  // EXTRAS - Syrups
  { id: 'ex-van', name: 'Vanilla Syrup', price: 0.50, category: 'extras', subcategory: 'Syrups', available: true },
  { id: 'ex-car', name: 'Caramel Syrup', price: 0.50, category: 'extras', subcategory: 'Syrups', available: true },
  { id: 'ex-haz', name: 'Hazelnut Syrup', price: 0.50, category: 'extras', subcategory: 'Syrups', available: true },
  { id: 'ex-gin', name: 'Gingerbread Syrup', price: 0.50, category: 'extras', subcategory: 'Syrups', badge: 'Seasonal', available: true },
  
  // EXTRAS - Toppings
  { id: 'ex-shot', name: 'Extra Shot', price: 0.80, category: 'extras', subcategory: 'Toppings', available: true },
  { id: 'ex-cream', name: 'Whipped Cream', price: 0.50, category: 'extras', subcategory: 'Toppings', available: true },
  { id: 'ex-marsh', name: 'Marshmallows', price: 0.50, category: 'extras', subcategory: 'Toppings', available: true },
  { id: 'ex-choc-top', name: 'Chocolate Shavings', price: 0.50, category: 'extras', subcategory: 'Toppings', available: true },
]

export function getMenuItemsByCategory(categoryId: string): MenuItem[] {
  return MENU_ITEMS.filter(item => item.category === categoryId && item.available)
}

export function getMenuItemsBySubcategory(categoryId: string, subcategory: string): MenuItem[] {
  return MENU_ITEMS.filter(item => item.category === categoryId && item.subcategory === subcategory && item.available)
}

export function getCategoryById(categoryId: string): MenuCategory | undefined {
  return MENU_CATEGORIES.find(cat => cat.id === categoryId)
}
