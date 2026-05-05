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
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed mb-4 text-justify">
          {description}
        </p>
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed mb-4 text-justify">
          {description2}
        </p>
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed mb-4 text-justify">
          {description3}
        </p>
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed mb-4 text-justify">
          No hace falta vestirse de etiqueta, solo ser nosotros mismos. Lo único importante es que vengáis con ganas de disfrutar. Así que reservad vuestra{' '}
          <a
            href="#rsvp"
            className="underline underline-offset-2 hover:text-[var(--color-green-dark)] transition-colors"
          >
            entrada
          </a>
          {' '}(abono día completo o de tarde) y que vuestros pies se preparen para bailar.
        </p>
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed text-center">
          {description5}{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="inline-block w-5 h-5 text-[#c13a64] align-text-bottom"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </p>
      </div>
    </div>
  )
}
