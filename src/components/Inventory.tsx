import { useState } from 'react'
import { InventoryItem, StockStatus } from '../types'
import { getStockStatus, formatQuantity } from '../utils'
import StatusBadge from './StatusBadge'

interface Props {
  items: InventoryItem[]
  onSelectItem: (id: string) => void
  onAddItem: () => void
}

type Filter = 'All' | StockStatus

function groupByCategory(items: InventoryItem[]): [string, InventoryItem[]][] {
  const groups: Record<string, InventoryItem[]> = {}
  for (const item of items) {
    if (!groups[item.category]) groups[item.category] = []
    groups[item.category].push(item)
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
}

export default function Inventory({ items, onSelectItem, onAddItem }: Props) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = items.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'All' || getStockStatus(item) === filter
    return matchesQuery && matchesFilter
  })

  const groups = groupByCategory(filtered)
  const filters: Filter[] = ['All', 'In Stock', 'Low Stock', 'Out of Stock']

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
        <button
          onClick={onAddItem}
          className="rounded-lg bg-accent text-white text-sm font-medium px-4 py-2.5 hover:bg-accent/90 transition-colors"
        >
          + Add Item
        </button>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or category..."
        className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-accent/30"
      />

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium ${
              filter === f ? 'bg-ink text-white' : 'bg-black/5 text-ink/70'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {groups.length === 0 && (
        <p className="text-center text-sm text-ink/50 py-8">No items match your search.</p>
      )}

      {/* Desktop: one grouped table per category */}
      <div className="hidden md:flex md:flex-col gap-5">
        {groups.map(([category, groupItems]) => (
          <div key={category} className="rounded-xl border border-line bg-white overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-line">
              <span className="text-sm font-medium text-ink/70">{category}</span>
              <span className="text-xs text-ink/40">
                {groupItems.length} {groupItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {groupItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => onSelectItem(item.id)}
                    className="border-b border-line last:border-0 cursor-pointer hover:bg-black/[0.02]"
                  >
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-ink/60">{formatQuantity(item)}</td>
                    <td className="px-4 py-3 text-right">
                      <StatusBadge status={getStockStatus(item)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Mobile: grouped cards per category */}
      <div className="md:hidden flex flex-col gap-6">
        {groups.map(([category, groupItems]) => (
          <div key={category}>
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-sm font-medium text-ink/70">{category}</span>
              <span className="text-xs text-ink/40">
                {groupItems.length} {groupItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {groupItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3 text-left"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-ink/60">{formatQuantity(item)}</div>
                  </div>
                  <StatusBadge status={getStockStatus(item)} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
