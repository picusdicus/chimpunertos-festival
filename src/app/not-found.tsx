export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-white-warm)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-6">🎪</p>
        <h1 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-4">
          Invitación no encontrada
        </h1>
        <p className="text-[var(--color-text-muted)] mb-2">
          No encontramos tu invitación. Comprueba que el enlace sea correcto.
        </p>
        <p className="text-[var(--color-text-hint)] text-sm">
          Si crees que hay un error, contacta con Sole o Dani directamente.
        </p>
      </div>
    </div>
  )
}
