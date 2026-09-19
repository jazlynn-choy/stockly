import { InventoryItem } from '../types'
import { getStockStatus, formatQuantity } from '../utils'
import StatusBadge from './StatusBadge'

interface Props {
  item: InventoryItem
  onUpdateQuantity: (id: string, quantity: number) => void
  onEdit: () => void
  onDelete: () => void
  onBack: () => void
}

export default function ItemDetail({ item, onUpdateQuantity, onEdit, onDelete, onBack }: Props) {
  const status = getStockStatus(item)

  return (
    <div className="p-6 md:p-10 max-w-lg mx-auto">
      <button onClick={onBack} className="text-sm text-ink/50 hover:text-ink mb-6">
        ← Back to Inventory
      </button>

      <h1 className="text-2xl font-semibold tracking-tight mb-1">{item.name}</h1>
      <p className="text-ink/60 mb-3">{formatQuantity(item)}</p>
      <StatusBadge status={status} />

      <div className="h-px bg-line my-6" />

      <div className="mb-6">
        <div className="text-sm text-ink/50 mb-2">Quantity</div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
            className="w-11 h-11 rounded-lg border border-line text-lg font-medium hover:bg-black/5"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <div className="text-xl font-semibold w-16 text-center">{item.quantity}</div>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-11 h-11 rounded-lg border border-line text-lg font-medium hover:bg-black/5"
            aria-label="Increase quantity"
          >
            +
          </button>
          <span className="text-ink/50 text-sm">{item.unit}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <div className="text-sm text-ink/50 mb-1">Low stock threshold</div>
          <div className="font-medium">
            {item.lowStockThreshold} {item.unit}
          </div>
        </div>
        <div>
          <div className="text-sm text-ink/50 mb-1">Category</div>
          <div className="font-medium">{item.category}</div>
        </div>
      </div>

      <div className="h-px bg-line mb-6" />

      <div className="flex gap-3">
        <button onClick={onEdit} className="flex-1 rounded-lg border border-line py-2.5 text-sm font-medium hover:bg-black/5">
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 rounded-lg border border-danger/30 text-danger py-2.5 text-sm font-medium hover:bg-danger-light"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
