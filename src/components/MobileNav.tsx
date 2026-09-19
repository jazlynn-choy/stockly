import { Page } from '../types'

interface Props {
  page: Page
  onNavigate: (page: Page) => void
}

export default function MobileNav({ page, onNavigate }: Props) {
  return (
    <div className="md:hidden sticky top-0 z-10 bg-paper border-b border-line">
      <div className="px-4 pt-4 pb-2 text-lg font-semibold tracking-tight">Stockly</div>
      <div className="flex px-4 gap-2 pb-3">
        <button
          onClick={() => onNavigate('home')}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
            page === 'home' ? 'bg-accent-light text-accent' : 'bg-black/5 text-ink/70'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate('inventory')}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
            page === 'inventory' || page === 'item' ? 'bg-accent-light text-accent' : 'bg-black/5 text-ink/70'
          }`}
        >
          Inventory
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
            page === 'settings' ? 'bg-accent-light text-accent' : 'bg-black/5 text-ink/70'
          }`}
        >
          Settings
        </button>
      </div>
    </div>
  )
}
