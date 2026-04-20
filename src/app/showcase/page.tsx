import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { FestivalHeader } from '@/components/invitation/FestivalHeader'
import { DateSection } from '@/components/invitation/DateSection'
import { CountdownTimer } from '@/components/invitation/CountdownTimer'

export const metadata = {
  title: 'Showcase - Chimpunerto\'s Festival',
}

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-[var(--color-white-warm)]">
      {/* Festival Header */}
      <section className="mb-12">
        <FestivalHeader showBadges={true} />
      </section>

      {/* Buttons */}
      <section className="py-12 px-4 bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-8">
            Botones
          </h2>

          <div className="space-y-8">
            {/* Primary */}
            <div>
              <h3 className="font-inter text-lg font-semibold text-[var(--color-text-dark)] mb-4">
                Primary
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Pequeño</Button>
                <Button size="md">Mediano</Button>
                <Button size="lg">Grande</Button>
                <Button loading>Cargando...</Button>
              </div>
            </div>

            {/* Outline */}
            <div>
              <h3 className="font-inter text-lg font-semibold text-[var(--color-text-dark)] mb-4">
                Outline
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm">
                  Pequeño
                </Button>
                <Button variant="outline" size="md">
                  Mediano
                </Button>
                <Button variant="outline" size="lg">
                  Grande
                </Button>
              </div>
            </div>

            {/* Ghost */}
            <div>
              <h3 className="font-inter text-lg font-semibold text-[var(--color-text-dark)] mb-4">
                Ghost
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost" size="sm">
                  Pequeño
                </Button>
                <Button variant="ghost" size="md">
                  Mediano
                </Button>
                <Button variant="ghost" size="lg">
                  Grande
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-8">
            Badges
          </h2>

          <div className="space-y-8">
            {/* Filled */}
            <div>
              <h3 className="font-inter text-lg font-semibold text-[var(--color-text-dark)] mb-4">
                Filled
              </h3>
              <div className="flex flex-wrap gap-3">
                <Badge>Ceremonia</Badge>
                <Badge>Banquete</Badge>
                <Badge>Fiesta</Badge>
              </div>
            </div>

            {/* Outline */}
            <div>
              <h3 className="font-inter text-lg font-semibold text-[var(--color-text-dark)] mb-4">
                Outline
              </h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline">Edición 2026</Badge>
                <Badge variant="outline">VIP</Badge>
                <Badge variant="outline">Pareja</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading Spinner */}
      <section className="py-12 px-4 bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-8">
            Loading Spinner
          </h2>

          <div className="flex flex-wrap gap-8">
            <div className="text-center">
              <LoadingSpinner size="sm" />
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Pequeño
              </p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="md" />
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Mediano
              </p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Grande
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Date Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-8">
            Sección de Fecha
          </h2>
          <DateSection />
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-8">
            Cuenta Atrás
          </h2>
          <CountdownTimer targetDate="2026-09-25T18:00:00" />
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-12 px-4 bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-8">
            Paleta de Colores
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Cream', hex: '#F5EFE0', var: '--color-cream' },
              {
                name: 'Green Dark',
                hex: '#2a4a28',
                var: '--color-green-dark',
              },
              { name: 'Green Mid', hex: '#3d6b3a', var: '--color-green-mid' },
              {
                name: 'Green Light',
                hex: '#8aaa60',
                var: '--color-green-light',
              },
              { name: 'Gold', hex: '#c17f3a', var: '--color-gold' },
              {
                name: 'Gold Light',
                hex: '#e8b84b',
                var: '--color-gold-light',
              },
              { name: 'Beige', hex: '#d4c9a8', var: '--color-beige' },
              {
                name: 'Text Dark',
                hex: '#3d3530',
                var: '--color-text-dark',
              },
              {
                name: 'Text Muted',
                hex: '#7a6a45',
                var: '--color-text-muted',
              },
            ].map((color) => (
              <div key={color.var} className="text-center">
                <div
                  className="w-full h-24 rounded-lg border border-gray-200 mb-2"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="font-semibold text-sm text-[var(--color-text-dark)]">
                  {color.name}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] font-mono">
                  {color.hex}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
