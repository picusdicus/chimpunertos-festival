import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { HeroSection } from '@/components/invitation/HeroSection'
import { FestivalHeader } from '@/components/invitation/FestivalHeader'
import { DateSection } from '@/components/invitation/DateSection'
import { CountdownTimer } from '@/components/invitation/CountdownTimer'
import { LocationSection } from '@/components/invitation/LocationSection'
import { RSVPSection } from '@/components/invitation/RSVPSection'
import { PlaylistSection } from '@/components/invitation/PlaylistSection'

export interface InvitePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: InvitePageProps) {
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
    .single()

  if (error || !guest) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[var(--color-white-warm)]">
      <HeroSection imageUrl="/images/couple.svg" />

      <FestivalHeader />

      <DateSection />

      <CountdownTimer targetDate="2026-09-25T18:00:00" />

      <LocationSection />

      <RSVPSection guest={guest} />

      <PlaylistSection guestId={guest.id} />
    </main>
  )
}
