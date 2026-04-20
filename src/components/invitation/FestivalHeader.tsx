import { Badge } from '@/components/ui/Badge'

function PyramidLogo() {
  return (
    <svg
      className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4"
      viewBox="0 0 100 120"
      fill="none"
    >
      {/* Pyramid levels with gradient effect */}
      <defs>
        <linearGradient
          id="pyramidGradient"
          x1="50"
          y1="0"
          x2="50"
          y2="100"
        >
          <stop
            offset="0%"
            stopColor="var(--color-green-light)"
          />
          <stop
            offset="100%"
            stopColor="var(--color-green-dark)"
          />
        </linearGradient>
      </defs>

      {/* Top triangle */}
      <polygon
        points="50,10 20,50 80,50"
        fill="url(#pyramidGradient)"
      />

      {/* Middle triangle */}
      <polygon
        points="50,50 10,90 90,90"
        fill="var(--color-green-mid)"
      />

      {/* Bottom line/stage */}
      <line
        x1="10"
        y1="90"
        x2="90"
        y2="90"
        stroke="var(--color-gold)"
        strokeWidth="2"
      />
    </svg>
  )
}

export interface FestivalHeaderProps {
  showBadges?: boolean
}

export function FestivalHeader({
  showBadges = true,
}: FestivalHeaderProps) {
  return (
    <div className="w-full py-8 sm:py-12 bg-[var(--color-cream)] border-b-4 border-[var(--color-green-dark)]">
      <div className="max-w-2xl mx-auto px-4">
        <PyramidLogo />

        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[var(--color-green-dark)] uppercase tracking-tight mb-2">
          Chimpunerto's
        </h1>

        <p className="text-center text-[var(--color-green-dark)] text-lg sm:text-xl font-semibold uppercase tracking-widest mb-6">
          Festival
        </p>

        {showBadges && (
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge>Ceremonia</Badge>
            <Badge>Banquete</Badge>
            <Badge>Fiesta</Badge>
            <Badge variant="outline">Edición 2026</Badge>
          </div>
        )}
      </div>
    </div>
  )
}
