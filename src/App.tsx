import { useState } from 'react'
import { InventoryItem, Page } from './types'
import { initialItems } from './data/mockItems'
import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'
import Home from './components/Home'
import Inventory from './components/Inventory'
import ItemDetail from './components/ItemDetail'
import ItemFormModal from './components/ItemFormModal'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import Settings from './components/Settings'

export default function App() {
  const [items, setItems] = useState<InventoryItem[]>(initialItems)
  const [userName, setUserName] = useState('Alex')
  const [page, setPage] = useState<Page>('home')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const selectedItem = items.find((i) => i.id === selectedId) ?? null

  function goTo(target: Page) {
    setPage(target)
    if (target !== 'item') setSelectedId(null)
  }

  function selectItem(id: string) {
    setSelectedId(id)
    setPage('item')
  }

  function updateQuantity(id: string, quantity: number) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  function addItem(data: Omit<InventoryItem, 'id'>) {
    const id = Date.now().toString()
    setItems((prev) => [...prev, { ...data, id }])
    setShowAdd(false)
  }

  function editItem(data: Omit<InventoryItem, 'id'>) {
    if (!selectedItem) return
    setItems((prev) => prev.map((i) => (i.id === selectedItem.id ? { ...data, id: i.id } : i)))
    setShowEdit(false)
  }

  function deleteItem() {
    if (!selectedItem) return
    setItems((prev) => prev.filter((i) => i.id !== selectedItem.id))
    setShowDelete(false)
    goTo('inventory')
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar page={page} onNavigate={goTo} />

      <div className="flex-1">
        <MobileNav page={page} onNavigate={goTo} />

        {page === 'home' && <Home items={items} userName={userName} onSelectItem={selectItem} />}

        {page === 'inventory' && (
          <Inventory items={items} onSelectItem={selectItem} onAddItem={() => setShowAdd(true)} />
        )}

        {page === 'item' && selectedItem && (
          <ItemDetail
            item={selectedItem}
            onUpdateQuantity={updateQuantity}
            onEdit={() => setShowEdit(true)}
            onDelete={() => setShowDelete(true)}
            onBack={() => goTo('inventory')}
          />
        )}

        {page === 'settings' && <Settings userName={userName} onChangeName={setUserName} />}
      </div>

      {showAdd && (
        <ItemFormModal title="Add Item" submitLabel="Add Item" onCancel={() => setShowAdd(false)} onSubmit={addItem} />
      )}

      {showEdit && selectedItem && (
        <ItemFormModal
          title="Edit Item"
          submitLabel="Save Changes"
          initial={selectedItem}
          onCancel={() => setShowEdit(false)}
          onSubmit={editItem}
        />
      )}

      {showDelete && selectedItem && (
        <ConfirmDeleteModal itemName={selectedItem.name} onCancel={() => setShowDelete(false)} onConfirm={deleteItem} />
      )}
    </div>
  )
}
