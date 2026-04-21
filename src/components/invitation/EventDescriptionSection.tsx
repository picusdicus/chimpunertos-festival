export interface EventDescriptionSectionProps {
  title?: string
  description?: string,
  description2?: string,
  description3?: string
}

export function EventDescriptionSection({
  title = '¿Qué es?',
  description = 'Chimpunerto\u2019s Festival es la celebración por habernos encontrado. Todo empezó con un match y 9 años después, seguimos caminando juntos de la mano. ',
  description2 = 'Este día será único e irrepetible y queremos celebrarlo con tod@s vosotr@s. Será un día para disfrutarnos, reirnos y abrazarnos.',
  description3 = 'No hace falta vestirse de etiqueta, sólo ser nosotros mismos. Lo único importante es que vengáis con ganas de pasarlo bien. Chimpunerto\u2019s festival es una representación de quienes somos y de lo que nos mueve por dentro. Reservad vuestra entrada y que vuestros pies se preparen para saltar y bailar.'
}: EventDescriptionSectionProps) {
  return (
    <div className="w-full py-12 px-4 bg-[var(--color-white-warm)]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-6">
          {title}
        </h2>
        <div className="h-1 w-16 bg-[var(--color-gold)] mx-auto mb-6" />
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed">
          {description}
        </p>
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed">
          {description2}
        </p>
        <p className="font-inter text-lg text-[var(--color-text-dark)] leading-relaxed">
          {description3}
        </p>
      </div>
    </div>
  )
}
