export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/database'
import GuestTable from './GuestTable'
import CreateGuestForm from './CreateGuestForm'

type Guest = Database['public']['Tables']['guests']['Row']
type Song = Database['public']['Tables']['songs']['Row'] & {
  guests: { name: string } | null
}

function createServiceClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="text-4xl font-bold mb-1" style={{ color }}>
        {value}
      </div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}

export default async function AdminPage() {
  const supabase = createServiceClient()

  const [{ data: guestsRaw }, { data: songsRaw }] = await Promise.all([
    supabase.from('guests').select('*').order('created_at', { ascending: false }),
    supabase
      .from('songs')
      .select('*, guests(name)')
      .order('added_at', { ascending: false }),
  ])

  const guests: Guest[] = (guestsRaw ?? []) as Guest[]
  const songs: Song[] = (songsRaw ?? []) as Song[]

  const total = guests.length
  const confirmed = guests.filter((g) => g.confirmed === true).length
  const pending = guests.filter((g) => g.confirmed === null).length
  const declined = guests.filter((g) => g.confirmed === false).length

  return (
    <main className="min-h-screen p-6 md:p-10" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="max-w-5xl mx-auto space-y-10">
        <h1
          className="text-3xl font-bold"
          style={{ color: 'var(--color-green-dark)', fontFamily: 'var(--font-playfair)' }}
        >
          Panel de Administración
        </h1>

        {/* SECCIÓN 1 — Stats */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Estadísticas</h2>
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Total invitados" value={total} color="var(--color-green-dark)" />
            <StatCard label="Confirmados" value={confirmed} color="#16a34a" />
            <StatCard label="Pendientes" value={pending} color="#ca8a04" />
            <StatCard label="No asisten" value={declined} color="#dc2626" />
          </div>
        </section>

        {/* SECCIÓN 2 — Lista de invitados */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Lista de Invitados</h2>
          <GuestTable guests={guests} />
        </section>

        {/* SECCIÓN 3 — Crear nuevo invitado */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Crear Nuevo Invitado</h2>
          <CreateGuestForm />
        </section>

        {/* SECCIÓN 4 — Setlist */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Setlist Actual</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">{songs.length} canciones añadidas</span>
              <a
                href="/api/spotify/login"
                className="text-sm px-4 py-2 rounded-lg text-white transition-colors"
                style={{ backgroundColor: '#1DB954' }}
              >
                Conectar / Reconectar Spotify
              </a>
            </div>

            {songs.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                Aún no se han añadido canciones.
              </div>
            ) : (
              <ul className="divide-y divide-gray-50">
                {songs.map((song) => (
                  <li key={song.id} className="flex items-center gap-4 px-6 py-4">
                    {song.album_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={song.album_image}
                        alt={song.track_name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-800 truncate">{song.track_name}</p>
                      <p className="text-sm text-gray-500 truncate">{song.artist_name}</p>
                    </div>
                    <div className="text-xs text-gray-400 text-right flex-shrink-0">
                      {song.guests?.name ?? 'Desconocido'}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
