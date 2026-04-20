export interface LocationSectionProps {
  venue?: string
  address?: string
  distance?: string
  accessTime?: string
  ceremonyTime?: string
  parkingNote?: string
}

export function LocationSection({
  venue = 'Escuela de Equitación RMB',
  address = 'Navalcarnero, Madrid',
  distance = 'A 35 min del centro',
  accessTime = '17:30h',
  ceremonyTime = '18:00h',
  parkingNote = 'Parking disponible en la finca',
}: LocationSectionProps) {
  const mapsUrl =
    'https://www.google.com/maps/place/Navalcarnero,+Madrid/@40.2576,-3.8726,13z'

  return (
    <div className="w-full py-12 px-4 bg-[var(--color-surface)]">
      <div className="max-w-4xl mx-auto">
        {/* Venue Info */}
        <div className="mb-8">
          <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-4">
            {venue}
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] font-inter mb-2">
            {address}
          </p>
          <p className="text-sm text-[var(--color-text-hint)] font-inter">
            {distance}
          </p>
        </div>

        {/* Map */}
        <div className="mb-8 rounded-lg overflow-hidden border-2 border-[var(--color-green-dark)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3034.8756483644063!2d-3.8726!3d40.2576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd418f5f9e8f8f8f%3A0x0!2sNavalcarnero%2C%20Madrid!5e0!3m2!1ses!2ses!4v1234567890"
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
          <div className="space-y-2 font-inter text-[var(--color-text-dark)]">
            <p>
              <span className="font-semibold">Acceso:</span> {accessTime}
            </p>
            <p>
              <span className="font-semibold">Ceremonia:</span> {ceremonyTime}
            </p>
            <p>
              <span className="font-semibold">Fiesta:</span> Hasta tarde 🎉
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
