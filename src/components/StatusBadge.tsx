import { StockStatus } from '../types'

const styles: Record<StockStatus, string> = {
  'In Stock': 'bg-accent-light text-accent',
  'Low Stock': 'bg-warn-light text-warn',
  'Out of Stock': 'bg-danger-light text-danger',
}

export default function StatusBadge({ status }: { status: StockStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${styles[status]}`}>
      {status}
    </span>
  )
}
