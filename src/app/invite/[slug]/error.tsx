'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-[var(--color-white-warm)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-6">🎸</p>
        <h1 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-4">
          Algo salió mal...
        </h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Parece que el backstage tiene un problema técnico. Inténtalo de nuevo.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[var(--color-green-dark)] text-white font-inter font-medium rounded-full hover:opacity-90 transition-opacity"
        >
          Volver a intentar
        </button>
      </div>
    </div>
  )
}
