import { notFound } from 'next/navigation'
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

export async function generateMetadata({ params }: InvitePageProps) {
  const { slug } = await params
  return {
    title: `Invitación - Chimpunerto's Festival`,
    description: `Te invitamos a celebrar con nosotros en Chimpunerto's Festival 2026`,
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

      <FestivalHeader />

      <div id="fecha">
        <DateSection />
      </div>

      <div id="evento">
        <EventDescriptionSection />
      </div>

      <div id="countdown">
        <CountdownTimer targetDate="2026-09-25T18:00:00" />
      </div>

      <div id="lugar">
        <LocationSection />
      </div>

      <div id="rsvp">
        <RSVPSection guest={guest} />
      </div>

      <div id="mensajes">
        <WallOfFameSection guest={guest} />
      </div>

      <div id="setlist">
        <PlaylistSection guestName={guest.name} />
      </div>

      <ContactSection />
    </main>
  )
}
