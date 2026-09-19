import { InventoryItem } from '../types'

export const initialItems: InventoryItem[] = [
  { id: '1', name: 'White Gel Polish', category: 'Beauty', quantity: 18, unit: 'mL', lowStockThreshold: 20 },
  { id: '2', name: 'Coffin Nail Tips', category: 'Beauty', quantity: 12, unit: 'pieces', lowStockThreshold: 15 },
  { id: '3', name: 'Lint-Free Wipes', category: 'Beauty', quantity: 60, unit: 'pieces', lowStockThreshold: 20 },
  { id: '4', name: 'Organic Coffee Beans', category: 'Food', quantity: 4, unit: 'kg', lowStockThreshold: 5 },
  { id: '5', name: 'Flour', category: 'Food', quantity: 25, unit: 'kg', lowStockThreshold: 10 },
  { id: '6', name: 'Black T-Shirt', category: 'Clothing', quantity: 32, unit: 'pieces', lowStockThreshold: 10 },
  { id: '7', name: 'Canvas Tote Bag', category: 'Retail', quantity: 0, unit: 'pieces', lowStockThreshold: 10 },
  { id: '8', name: 'Phone Cases', category: 'Online Seller', quantity: 8, unit: 'pieces', lowStockThreshold: 15 },
  { id: '9', name: 'USB-C Cables', category: 'Online Seller', quantity: 45, unit: 'pieces', lowStockThreshold: 20 },
  { id: '10', name: 'Packaging Boxes', category: 'Retail', quantity: 0, unit: 'pieces', lowStockThreshold: 50 },
]
