interface Props {
  itemName: string
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmDeleteModal({ itemName, onCancel, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-end md:items-center justify-center z-20">
      <div className="bg-white w-full md:max-w-sm rounded-t-2xl md:rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-2">Delete {itemName}?</h2>
        <p className="text-sm text-ink/60 mb-6">This can't be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-lg border border-line py-2.5 text-sm font-medium hover:bg-black/5">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 rounded-lg bg-danger text-white py-2.5 text-sm font-medium hover:bg-danger/90">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
