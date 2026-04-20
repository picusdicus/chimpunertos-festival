'use client'

import { useState, useEffect } from 'react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface Track {
  id: string
  name: string
  artists: string
  album_image: string | null
  external_url: string
}

export function SetListSection() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await fetch('/api/spotify/playlist')
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Failed to load playlist')
        }
        const data = await response.json()
        setTracks(data.tracks || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading playlist')
      } finally {
        setLoading(false)
      }
    }
    fetchTracks()
  }, [])

  return (
    <div className="w-full py-12 px-4 bg-[var(--color-cream)]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-4 text-center">
          Set List
        </h2>
        <p className="text-center text-[var(--color-text-muted)] font-inter mb-8">
          {loading
            ? 'Cargando setlist...'
            : `${tracks.length} canciones en el festival`}
        </p>

        {loading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-700 font-inter">{error}</p>
          </div>
        )}

        {!loading && !error && tracks.length === 0 && (
          <p className="text-center text-[var(--color-text-muted)] font-inter">
            Aún no hay canciones en el setlist
          </p>
        )}

        {!loading && tracks.length > 0 && (
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {tracks.map((track, index) => (
              <a
                key={`${track.id}-${index}`}
                href={track.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-white-warm)] rounded-lg p-3 flex items-center gap-3 border border-[var(--color-beige)] hover:border-[var(--color-green-dark)] transition-colors"
              >
                <span className="text-sm text-[var(--color-text-muted)] font-semibold w-6 text-center">
                  {index + 1}
                </span>
                {track.album_image && (
                  <img
                    src={track.album_image}
                    alt={track.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[var(--color-text-dark)] truncate font-inter">
                    {track.name}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] truncate font-inter">
                    {track.artists}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
