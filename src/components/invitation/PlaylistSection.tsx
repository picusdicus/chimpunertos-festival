'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import Image from 'next/image'
import type { SpotifyTrack, Song } from '@/types'

export interface PlaylistSectionProps {
  guestId: string
}

export function PlaylistSection({ guestId }: PlaylistSectionProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SpotifyTrack[]>([])
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch existing songs on mount
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `/api/songs?guest_id=${guestId}`
        )
        if (response.ok) {
          const data = await response.json()
          setSongs(data || [])
        }
      } catch (err) {
        console.error('Failed to fetch songs:', err)
      }
    }

    fetchSongs()
  }, [guestId])

  // Debounced search
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(() => {
      searchTracks()
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  const searchTracks = async () => {
    try {
      setSearching(true)
      setError(null)

      const response = await fetch(
        `/api/spotify/search?q=${encodeURIComponent(query)}`
      )

      if (!response.ok) {
        throw new Error('Failed to search')
      }

      const tracks = await response.json()
      setResults(tracks)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to search tracks'
      )
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  const handleAddSong = async (track: SpotifyTrack) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/spotify/add-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          track_id: track.id,
          track_name: track.name,
          artist_name: track.artists[0].name,
          album_image: track.album.images[0]?.url || null,
          guest_id: guestId,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add song')
      }

      const { song } = await response.json()
      setSongs([...songs, song])
      setQuery('')
      setResults([])
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to add song'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full py-12 px-4 bg-[var(--color-white-warm)]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-8 text-center">
          Playlist del Festival
        </h2>

        <div className="bg-[var(--color-cream)] rounded-lg border-2 border-[var(--color-green-dark)] p-8">
          <Badge className="mb-4">🎵 Spotify</Badge>

          <p className="text-lg text-[var(--color-text-muted)] font-inter mb-6">
            Comparte tu canción favorita para que suene en el festival
          </p>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Busca una canción..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 border-2 border-[var(--color-green-dark)] rounded-lg font-inter text-[var(--color-text-dark)] placeholder-[var(--color-text-hint)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] mb-4"
          />

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-inter">{error}</p>
            </div>
          )}

          {/* Search Results */}
          {searching && (
            <div className="flex justify-center py-6">
              <LoadingSpinner size="md" />
            </div>
          )}

          {results.length > 0 && (
            <div className="mb-6 space-y-3">
              <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                Resultados
              </p>
              {results.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 p-3 bg-[var(--color-white-warm)] border border-[var(--color-beige)] rounded-lg hover:bg-[var(--color-surface)] transition-colors"
                >
                  {track.album.images[0] && (
                    <Image
                      src={track.album.images[0].url}
                      alt={track.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[var(--color-text-dark)] truncate">
                      {track.name}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)] truncate">
                      {track.artists[0].name}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleAddSong(track)}
                    loading={loading}
                    disabled={loading || songs.some((s) => s.track_id === track.id)}
                  >
                    +
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Songs Count */}
          <div className="mb-4 p-4 bg-[var(--color-surface)] rounded-lg text-center">
            <p className="text-lg font-semibold text-[var(--color-green-dark)]">
              {songs.length} {songs.length === 1 ? 'canción' : 'canciones'} en el setlist
            </p>
          </div>

          {/* Songs List */}
          {songs.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                Tus contribuciones
              </p>
              {songs.map((song) => (
                <div
                  key={song.id}
                  className="p-3 bg-[var(--color-white-warm)] border-l-4 border-[var(--color-gold)] rounded"
                >
                  <p className="font-semibold text-[var(--color-text-dark)]">
                    {song.track_name}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {song.artist_name}
                  </p>
                </div>
              ))}
            </div>
          )}

          {!searching && results.length === 0 && query.length >= 2 && (
            <div className="text-center py-6 text-[var(--color-text-muted)]">
              <p className="text-sm font-inter">No se encontraron resultados</p>
            </div>
          )}

          {!searching && results.length === 0 && query.length === 0 && songs.length === 0 && (
            <div className="text-center py-6 text-[var(--color-text-muted)]">
              <p className="text-sm font-inter">Busca una canción para comenzar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
