import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'

export interface FestivalHeaderProps {
  showBadges?: boolean
  coupleNames?: { first: string; second: string }
  year?: number
  location?: string
}

export function FestivalHeader({
  showBadges = true,
  coupleNames = { first: 'Dani', second: 'Sole' },
  year = 2026,
  location = 'Navalcarnero',
}: FestivalHeaderProps) {
  return (
    <div className="w-full py-8 sm:py-12 bg-[var(--color-cream)] border-b-4 border-[var(--color-green-dark)]">
      <div className="max-w-2xl mx-auto px-4">
        {/* Top tagline */}
        <p className="text-center text-[var(--color-green-dark)] text-sm sm:text-base font-semibold uppercase tracking-[0.3em] mb-6">
          Edición única · {location} · {year}
        </p>

        <Image
          src="/images/logo-festival-new.jpg"
          alt="Chimpunerto's Festival"
          width={200}
          height={200}
          className="mx-auto mb-4"
          priority
        />

        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-center uppercase tracking-tight mb-2">
          <span className="text-[var(--color-green-dark)]">Chimpunerto</span>
          <span style={{ color: '#ad43b3' }}>&apos;S</span>
        </h1>

        <p className="text-center text-[var(--color-green-dark)] text-lg sm:text-xl font-semibold uppercase tracking-[0.3em] mb-4">
          Festival
        </p>

        {/* Subtitle tagline */}
        <p className="text-center text-[var(--color-text-muted)] text-sm sm:text-base uppercase tracking-[0.2em] mb-8 font-inter">
          Un lugar · Una vez · Un SÍ para siempre
        </p>

        {/* Couple names banner */}
        <div className="bg-[var(--color-green-dark)] py-4 px-6 mb-8">
          <p className="font-playfair text-2xl sm:text-3xl font-bold text-center text-[var(--color-white-warm)] uppercase tracking-wide flex items-center justify-center gap-3">
            <span>{coupleNames.first}</span>
            <span
              className="text-4xl sm:text-5xl font-normal italic leading-none"
              style={{ color: '#c13a64', fontFamily: 'Playfair Display, serif' }}
            >
              &amp;
            </span>
            <span>{coupleNames.second}</span>
          </p>
        </div>

        {showBadges && (
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: 'Evento', href: '#evento' },
              { label: 'Lugar', href: '#lugar' },
              { label: 'Horarios', href: '#horarios' },
              { label: 'RSVP', href: '#rsvp' },
              { label: 'Artistas', href: '#setlist' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="transition-transform hover:scale-105 hover:opacity-90 active:scale-95"
              >
                <Badge>{label}</Badge>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
