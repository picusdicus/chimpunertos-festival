import { Badge } from '@/components/ui/Badge'

export interface PlaylistSectionProps {
  playlistUrl?: string
}

export function PlaylistSection({
  playlistUrl,
}: PlaylistSectionProps) {
  return (
    <div className="w-full py-12 px-4 bg-[var(--color-white-warm)]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-8 text-center">
          Playlist del Festival
        </h2>

        <div className="bg-[var(--color-cream)] rounded-lg border-2 border-[var(--color-green-dark)] p-8 text-center">
          <Badge className="mb-4">🎵 Spotify</Badge>

          <p className="text-lg text-[var(--color-text-muted)] font-inter mb-6">
            Comparte tu canción favorita para que suene en el festival
          </p>

          {playlistUrl ? (
            <iframe
              src={playlistUrl}
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            />
          ) : (
            <div className="bg-[var(--color-surface)] rounded-lg p-8 text-[var(--color-text-muted)]">
              <p className="text-sm font-inter">
                La playlist se cargará pronto...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
