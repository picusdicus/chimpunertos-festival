export function SetListSection() {
  const playlistId = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID

  return (
    <div className="w-full py-12 px-4 bg-[var(--color-cream)]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-4 text-center">
          Line Up
        </h2>
        <p className="text-center text-[var(--color-text-muted)] font-inter mb-8">
          Cartel del festival
        </p>

        {playlistId ? (
          <div className="rounded-xl overflow-hidden border-2 border-[var(--color-green-dark)]">
            <iframe
              data-testid="embed-iframe"
              src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
              width="100%"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              style={{ borderRadius: '12px', height: '800px' }}
            />
          </div>
        ) : (
          <p className="text-center text-[var(--color-text-muted)] font-inter">
            Playlist no configurada
          </p>
        )}
      </div>
    </div>
  )
}
