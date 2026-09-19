import { Page } from '../types'

interface Props {
  page: Page
  onNavigate: (page: Page) => void
}

export default function Sidebar({ page, onNavigate }: Props) {
  return (
    <aside className="hidden md:flex md:flex-col w-56 shrink-0 border-r border-line px-4 py-6 gap-1">
      <div className="px-3 pb-6 text-lg font-semibold tracking-tight">Stockly</div>

      <button
        onClick={() => onNavigate('home')}
        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          page === 'home' ? 'bg-accent-light text-accent' : 'text-ink/70 hover:bg-black/5'
        }`}
      >
        Home
      </button>

      <button
        onClick={() => onNavigate('inventory')}
        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          page === 'inventory' || page === 'item' ? 'bg-accent-light text-accent' : 'text-ink/70 hover:bg-black/5'
        }`}
      >
        Inventory
      </button>

      <button
        onClick={() => onNavigate('settings')}
        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          page === 'settings' ? 'bg-accent-light text-accent' : 'text-ink/70 hover:bg-black/5'
        }`}
      >
        Settings
      </button>
    </aside>
  )
}
