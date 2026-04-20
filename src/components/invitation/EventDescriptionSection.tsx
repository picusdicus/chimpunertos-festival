export interface EventDescriptionSectionProps {
  title?: string
  description?: string
}

export function EventDescriptionSection({
  title = 'Sobre el evento',
  description = 'Chimpunerto\u2019s Festival es mucho más que una boda: es una celebración única donde la música, los amigos y la familia se encuentran para vivir un día inolvidable. Después de la ceremonia civil y el banquete, abriremos las puertas del festival para una noche llena de música en directo, buena comida y mejor compañía. Ven con tus mejores vibras y prepárate para bailar hasta el amanecer.',
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
      </div>
    </div>
  )
}
