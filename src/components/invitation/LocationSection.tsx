export interface LocationSectionProps {
  venue?: string
  address?: string
  parkingNote?: string
}

export function LocationSection({
  venue = 'Escuela de Equitación RMB',
  address = 'Navalcarnero, Madrid',
  parkingNote = 'Parking disponible en la finca',
}: LocationSectionProps) {
  const lat = 40.30277535135261
  const lng = -4.034611845561385
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`

  return (
    <div className="w-full py-12 px-4 bg-[var(--color-surface)]">
      <div className="max-w-4xl mx-auto">
        {/* Venue Info */}
        <div className="mb-8">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-gold)] underline decoration-2 underline-offset-4 hover:text-[var(--color-green-dark)] transition-colors"
            >
              {venue}
              <span className="text-xl" aria-hidden="true">↗</span>
            </a>
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] font-inter">
            {address}
          </p>
        </div>

        {/* Map */}
        <div className="mb-8 rounded-lg overflow-hidden border-2 border-[var(--color-green-dark)]">
          <iframe
            src={embedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Schedule */}
        <div className="bg-[var(--color-white-warm)] border-l-4 border-[var(--color-gold)] p-6 mb-8">
          <h3 className="font-semibold text-[var(--color-green-dark)] mb-4 uppercase tracking-wide">
            Horarios
          </h3>
          <div className="space-y-3 font-inter text-[var(--color-text-dark)]">
            <div>
              <p>
                <span className="font-semibold">12:15h</span> · Ceremonia
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Registro Civil de Navalcarnero
              </p>
            </div>
            <p>
              <span className="font-semibold">13:30h</span> · Comida
            </p>
            <p>
              <span className="font-semibold">17:30h</span> · Apertura de puertas del festival
            </p>
            <p>
              <span className="font-semibold">18:00h</span> · Artistas invitados
            </p>
            <p>
              <span className="font-semibold">19:30h</span> · Comienzo del festival 🎉
            </p>
          </div>
        </div>

        {/* Parking Note */}
        <div className="bg-[var(--color-cream)] rounded-lg p-4 mb-8 border border-[var(--color-beige)]">
          <p className="text-sm text-[var(--color-text-muted)] font-inter">
            📍 {parkingNote}
          </p>
        </div>

        {/* Directions Button */}
        <div className="text-center">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[var(--color-green-dark)] text-[var(--color-white-warm)] font-semibold rounded-lg hover:bg-[var(--color-green-mid)] transition-colors"
          >
            Cómo llegar →
          </a>
        </div>
      </div>
    </div>
  )
}
