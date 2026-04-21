import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Guest } from '@/types'
import { HeroSection } from '@/components/invitation/HeroSection'
import { FestivalHeader } from '@/components/invitation/FestivalHeader'
import { DateSection } from '@/components/invitation/DateSection'
import { EventDescriptionSection } from '@/components/invitation/EventDescriptionSection'
import { CountdownTimer } from '@/components/invitation/CountdownTimer'
import { LocationSection } from '@/components/invitation/LocationSection'
import { RSVPSection } from '@/components/invitation/RSVPSection'
import { WallOfFameSection } from '@/components/invitation/WallOfFameSection'
import { PlaylistSection } from '@/components/invitation/PlaylistSection'
import { ContactSection } from '@/components/invitation/ContactSection'

export interface InvitePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: InvitePageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: guest } = await supabase
    .from('guests')
    .select('name')
    .eq('slug', slug)
    .single<Pick<Guest, 'name'>>()

  const guestName = guest?.name ?? 'Invitado/a'
  const title = `Chimpunerto's Festival · ${guestName}`
  const description = 'Sole y Dani te invitan a su boda festival el 25 de Septiembre de 2026'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['/og-image.jpg'],
    },
  }
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { slug } = await params

  const supabase = await createClient()

  const { data: guest, error } = await supabase
    .from('guests')
    .select('*')
    .eq('slug', slug)
    .single<Guest>()

  if (error || !guest) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[var(--color-white-warm)]">
      <HeroSection imageUrl="/images/couple.jpg" />

      <div className="animate-fade-in">
        <FestivalHeader />
      </div>

      <div id="fecha" className="animate-slide-up animate-delay-100">
        <DateSection />
      </div>

      <div id="evento" className="animate-slide-up animate-delay-200">
        <EventDescriptionSection />
      </div>

      <div id="countdown" className="animate-slide-up animate-delay-300">
        <CountdownTimer targetDate="2026-09-25T18:00:00" />
      </div>

      <div id="lugar" className="animate-slide-up">
        <LocationSection />
      </div>

      <div id="rsvp" className="animate-slide-up animate-delay-100">
        <RSVPSection guest={guest} />
      </div>

      <div id="mensajes" className="animate-slide-up animate-delay-200">
        <WallOfFameSection guest={guest} />
      </div>

      <div id="setlist" className="animate-slide-up animate-delay-100">
        <PlaylistSection guestName={guest.name} />
      </div>

      <div className="animate-slide-up animate-delay-200">
        <ContactSection />
      </div>
    </main>
  )
}
