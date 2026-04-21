export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--color-white-warm)]">
      {/* Hero skeleton */}
      <div className="w-full h-screen bg-[var(--color-surface)] animate-pulse" />

      {/* Content skeleton */}
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-16">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="animate-pulse space-y-4">
            <div
              className="h-8 bg-[var(--color-surface)] rounded-full mx-auto"
              style={{ width: `${50 + (i % 3) * 15}%` }}
            />
            <div className="h-4 bg-[var(--color-surface)] rounded-full w-3/4 mx-auto" />
            <div className="h-4 bg-[var(--color-surface)] rounded-full w-2/3 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
