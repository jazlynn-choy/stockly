import { InventoryItem } from '../types'
import { getStockStatus, formatQuantity } from '../utils'
import StatusBadge from './StatusBadge'

interface Props {
  items: InventoryItem[]
  userName: string
  onSelectItem: (id: string) => void
}

export default function Home({ items, userName, onSelectItem }: Props) {
  const lowStock = items.filter((i) => getStockStatus(i) === 'Low Stock')
  const outOfStock = items.filter((i) => getStockStatus(i) === 'Out of Stock')
  const needsRestocking = [...outOfStock, ...lowStock]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">{greeting}, {userName || 'there'} 👋</h1>
      <p className="text-ink/60 mb-8">Here's what's happening with your inventory.</p>

      <div className="grid grid-cols-3 gap-3 mb-10">
        <div className="rounded-xl border border-line bg-white p-4">
          <div className="text-2xl font-semibold">{items.length}</div>
          <div className="text-sm text-ink/60">Items</div>
        </div>
        <div className="rounded-xl border border-line bg-white p-4">
          <div className="text-2xl font-semibold text-warn">{lowStock.length}</div>
          <div className="text-sm text-ink/60">Low Stock</div>
        </div>
        <div className="rounded-xl border border-line bg-white p-4">
          <div className="text-2xl font-semibold text-danger">{outOfStock.length}</div>
          <div className="text-sm text-ink/60">Out of Stock</div>
        </div>
      </div>

      <h2 className="text-sm font-medium text-ink/60 mb-3">Needs Restocking</h2>
      {needsRestocking.length === 0 ? (
        <p className="text-sm text-ink/50">Nothing needs restocking right now.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {needsRestocking.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectItem(item.id)}
              className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3 text-left hover:border-ink/20 transition-colors"
            >
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-ink/60">{formatQuantity(item)} remaining</div>
              </div>
              <StatusBadge status={getStockStatus(item)} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
