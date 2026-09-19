export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  lowStockThreshold: number
}

export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock'

export type Page = 'home' | 'inventory' | 'item' | 'settings'
