import React, { useState } from 'react'
import { InventoryItem } from '../types'

interface Props {
  title: string
  initial?: Partial<InventoryItem>
  onCancel: () => void
  onSubmit: (data: Omit<InventoryItem, 'id'>) => void
  submitLabel: string
}

const UNITS = ['pieces', 'mL', 'kg', 'g', 'L', 'boxes']

export default function ItemFormModal({ title, initial, onCancel, onSubmit, submitLabel }: Props) {
  const [name, setName] = useState(initial?.name ?? '')
  const [category, setCategory] = useState(initial?.category ?? '')
  const [quantity, setQuantity] = useState(initial?.quantity?.toString() ?? '')
  const [unit, setUnit] = useState(initial?.unit ?? UNITS[0])
  const [threshold, setThreshold] = useState(initial?.lowStockThreshold?.toString() ?? '')

  const isEditing = Boolean(initial)
  const canSubmit = name.trim() !== '' && quantity !== '' && threshold !== ''

  function handleSubmit() {
    if (!canSubmit) return
    onSubmit({
      name: name.trim(),
      category: category.trim() || 'Uncategorized',
      quantity: Number(quantity),
      unit,
      lowStockThreshold: Number(threshold),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-end md:items-center justify-center z-20">
      <div className="bg-white w-full md:max-w-sm rounded-t-2xl md:rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-5">{title}</h2>

        <div className="flex flex-col gap-4">
          <Field label="Name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isEditing}
              className={`${inputClass} ${isEditing ? 'bg-black/5 text-ink/60 cursor-not-allowed' : ''}`}
              placeholder="e.g. White Gel Polish"
            />
            {isEditing && <p className="text-xs text-ink/40 mt-1">Name can't be changed after an item is created.</p>}
          </Field>
          <Field label="Category">
            <input value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} placeholder="e.g. Beauty" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Quantity">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={inputClass}
                placeholder="0"
              />
            </Field>
            <Field label="Unit">
              <select value={unit} onChange={(e) => setUnit(e.target.value)} className={inputClass}>
                {UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Low stock threshold">
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className={inputClass}
              placeholder="0"
            />
          </Field>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} className="flex-1 rounded-lg border border-line py-2.5 text-sm font-medium hover:bg-black/5">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex-1 rounded-lg bg-accent text-white py-2.5 text-sm font-medium hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

const inputClass = 'w-full rounded-lg border border-line px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm text-ink/60 mb-1.5">{label}</div>
      {children}
    </label>
  )
}
