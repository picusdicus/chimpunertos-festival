import Image from 'next/image'

export interface HeroSectionProps {
  imageUrl: string
  coupleNames?: string
  subtitle?: string
}

export function HeroSection({
  imageUrl,
  coupleNames = 'Sole & Dani',
  subtitle = 'Nos casamos · 25 Sep · 2026',
}: HeroSectionProps) {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden animate-fade-in">
      <Image
        src={imageUrl}
        alt={coupleNames}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* Dark green overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-green-dark)] via-[var(--color-green-dark)]/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 text-center">
        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-white-warm)] mb-2">
          {coupleNames.split(' & ')[0]}{' '}
          <span style={{ color: '#c13a64' }}>&</span>{' '}
          {coupleNames.split(' & ')[1]}
        </h1>
        <p className="text-[var(--color-beige)] text-sm sm:text-base md:text-lg font-inter tracking-wide">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
