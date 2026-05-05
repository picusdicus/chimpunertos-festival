export interface EventDescriptionSectionProps {
  title?: string
  description?: string
  description2?: string
  description3?: string
  description5?: string
}

export function EventDescriptionSection({
  title = '¿Qué es?',
  description = 'Chimpunerto es la unión entre Chimpún y Rigoberto, o lo que es lo mismo, Sole y Dani. Todo empezó con un match y nueve años después seguimos caminando juntos de la mano.',
  description2 = "Chimpunerto’s Festival será la fiesta por habernos encontrado, la representación de quienes somos y de lo que nos mueve por dentro: la música.",
  description3 = 'Tenemos muchas ganas de celebrarlo con todos vosotros y vosotras. Será un día para estar juntos, abrazarnos y pasarlo bien.',
  description5 = '¡Os esperamos!'
}: EventDescriptionSectionProps) {
  return (
    <div className="w-full py-12 px-4 bg-[var(--color-white-warm)]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-6">
          {title}
        </h2>
        <div className="h-1 w-16 bg-[var(--color-gold)] mx-auto mb-6" />
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed mb-4">
          {description}
        </p>
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed mb-4">
          {description2}
        </p>
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed mb-4">
          {description3}
        </p>
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed mb-4">
          No hace falta vestirse de etiqueta, solo ser nosotros mismos. Lo único importante es que vengáis con ganas de disfrutar. Así que reservad vuestra{' '}
          <a
            href="#rsvp"
            className="underline underline-offset-2 hover:text-[var(--color-green-dark)] transition-colors"
          >
            entrada (abono día completo o de tarde)
          </a>
          {' '}y que vuestros pies se preparen para bailar.
        </p>
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed">
          {description5}
        </p>
      </div>
    </div>
  )
}
