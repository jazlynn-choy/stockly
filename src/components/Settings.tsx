interface Props {
  userName: string
  onChangeName: (name: string) => void
}

export default function Settings({ userName, onChangeName }: Props) {
  return (
    <div className="p-6 md:p-10 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Settings</h1>
      <p className="text-ink/60 mb-8">Manage your Stockly preferences.</p>

      <label className="block mb-2">
        <div className="text-sm text-ink/60 mb-1.5">Your name</div>
        <input
          value={userName}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="e.g. Alex"
          className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
      </label>
      <p className="text-sm text-ink/50">This is the name shown in your Home greeting.</p>
    </div>
  )
}
