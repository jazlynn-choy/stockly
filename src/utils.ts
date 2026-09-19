import { InventoryItem, StockStatus } from './types'

export function getStockStatus(item: InventoryItem): StockStatus {
  if (item.quantity <= 0) return 'Out of Stock'
  if (item.quantity <= item.lowStockThreshold) return 'Low Stock'
  return 'In Stock'
}

export function formatQuantity(item: InventoryItem): string {
  return item.unit === 'pieces' ? `${item.quantity}` : `${item.quantity} ${item.unit}`
}
