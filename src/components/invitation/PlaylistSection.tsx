'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface SpotifyArtist {
  name: string
}

interface SpotifyTrack {
  id: string
  name: string
  artists: SpotifyArtist[]
  album: {
    images: { url: string }[]
  }
  preview_url: string | null
}

export interface PlaylistSectionProps {
  guestName: string
}

export function PlaylistSection({ guestName }: PlaylistSectionProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SpotifyTrack[]>([])
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [addingId, setAddingId] = useState<string | null>(null)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const [errors, setErrors] = useState<Map<string, string>>(new Map())
  const [iframeKey, setIframeKey] = useState(0)
  const [lastAddedName, setLastAddedName] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const playlistId = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID

  const searchTracks = useCallback(async (q: string) => {
    setLoadingSearch(true)
    setSearchError(null)
    try {
      const response = await fetch(
        `/api/spotify/search?q=${encodeURIComponent(q)}`
      )
      if (!response.ok) throw new Error('Search failed')
      const data = await response.json()
      setResults(data.tracks ?? [])
    } catch {
      setSearchError('Error al buscar, inténtalo de nuevo')
      setResults([])
    } finally {
      setLoadingSearch(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (query.trim().length < 2) {
      debounceRef.current = null
      return
    }

    debounceRef.current = setTimeout(() => {
      searchTracks(query.trim())
    }, 500)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, searchTracks])

  async function addTrack(track: SpotifyTrack) {
    setAddingId(track.id)
    setErrors((prev) => {
      const next = new Map(prev)
      next.delete(track.id)
      return next
    })

    try {
      const response = await fetch('/api/spotify/add-song', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ track_id: track.id }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Error al añadir')

      setAddedIds((prev) => new Set(prev).add(track.id))
      setLastAddedName(track.name)
      setQuery('')
      setResults([])
      setTimeout(() => {
        setIframeKey((k) => k + 1)
        setLastAddedName(null)
      }, 3000)

      setTimeout(() => {
        setAddedIds((prev) => {
          const next = new Set(prev)
          next.delete(track.id)
          return next
        })
      }, 2000)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al añadir la canción'
      setErrors((prev) => new Map(prev).set(track.id, message))
    } finally {
      setAddingId(null)
    }
  }

  const showResults = query.trim().length >= 2

  return (
    <div className="w-full py-12 px-4" style={{ background: '#F5EFE0' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <p
          className="text-center text-xs font-semibold uppercase tracking-[0.3em] mb-2"
          style={{ color: '#c17f3a' }}
        >
          Colabora
        </p>
        <h2
          className="font-playfair text-3xl font-bold text-center uppercase mb-2"
          style={{ color: '#814368' }}
        >
          El cartel
        </h2>
        <p className="text-center font-inter text-base mb-8" style={{ color: '#5a5a5a' }}>
          Elige tus temazos para el festival,{' '}
          <span className="font-semibold">{guestName}</span>
        </p>

        {/* Search input */}
        <div className="relative mb-2">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8a7a50"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca una canción o artista..."
            className="w-full pl-10 pr-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[#c17f3a]"
            style={{
              border: '1px solid #d4c9a8',
              borderRadius: '2px',
              background: '#ffffff',
              color: '#5c2f4a',
            }}
          />
        </div>

        {/* Results */}
        {showResults && (
          <div
            className="relative z-10 mb-8"
            style={{
              background: '#ffffff',
              border: '1px solid #d4c9a8',
              borderRadius: '2px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            {loadingSearch ? (
              <div className="p-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-2 animate-pulse">
                    <div className="w-10 h-10 rounded flex-shrink-0" style={{ background: '#e8dfc8' }} />
                    <div className="flex-1">
                      <div className="h-3 rounded mb-2 w-3/4" style={{ background: '#e8dfc8' }} />
                      <div className="h-2 rounded w-1/2" style={{ background: '#e8dfc8' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : searchError ? (
              <p className="p-4 text-sm font-inter text-center" style={{ color: '#c0392b' }}>
                {searchError}
              </p>
            ) : results.length === 0 ? (
              <p className="p-4 text-sm font-inter text-center" style={{ color: '#8a7a50' }}>
                No encontramos esa canción
              </p>
            ) : (
              results.map((track) => {
                const isAdding = addingId === track.id
                const isAdded = addedIds.has(track.id)
                const trackError = errors.get(track.id)

                return (
                  <div key={track.id}>
                    <div className="flex items-center gap-3 p-2 hover:bg-[#f9f5ed] transition-colors">
                      {track.album.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={track.album.images[0].url}
                          alt={track.name}
                          width={40}
                          height={40}
                          style={{ borderRadius: '4px', flexShrink: 0 }}
                        />
                      ) : (
                        <div style={{ width: 40, height: 40, borderRadius: '4px', background: '#e8dfc8', flexShrink: 0 }} />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate" style={{ color: '#5c2f4a' }}>
                          {track.name}
                        </p>
                        <p className="text-xs truncate" style={{ color: '#8a7a50' }}>
                          {track.artists.map((a) => a.name).join(', ')}
                        </p>
                      </div>
                      <button
                        onClick={() => addTrack(track)}
                        disabled={isAdding || isAdded}
                        className="flex items-center justify-center flex-shrink-0 text-white font-bold text-lg transition-colors"
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: '2px',
                          background: isAdded ? '#b07898' : '#814368',
                          cursor: isAdding || isAdded ? 'default' : 'pointer',
                        }}
                        aria-label="Añadir canción"
                      >
                        {isAdding ? (
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                        ) : isAdded ? (
                          '✓'
                        ) : (
                          '+'
                        )}
                      </button>
                    </div>
                    {trackError && (
                      <p className="px-3 pb-1 text-xs font-inter" style={{ color: '#c0392b' }}>
                        {trackError.includes('duplicate') ? 'Ya está en El cartel' : trackError}
                      </p>
                    )}
                  </div>
                )
              })
            )}
          </div>
        )}

        {/* Thank you message */}
        {lastAddedName && (
          <div
            className="mb-6 px-4 py-3 rounded text-center font-inter text-sm font-semibold"
            style={{ background: '#eaf5ea', border: '1px solid #b07898', color: '#5c2f4a' }}
          >
            🎵 ¡Gracias! <span className="italic">{lastAddedName}</span> ya forma parte dEl cartel
          </div>
        )}

        {/* Separator */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px" style={{ background: '#d4c9a8' }} />
          <span className="text-xs font-semibold uppercase tracking-widest font-inter" style={{ color: '#8a7a50' }}>
            Escuchas los artistas confirmados
          </span>
          <div className="flex-1 h-px" style={{ background: '#d4c9a8' }} />
        </div>

        {/* Spotify embed */}
        {playlistId && (
          <>
            <iframe
              key={iframeKey}
              src={`https://open.spotify.com/embed/playlist/${playlistId}?theme=0`}
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: '12px' }}
            />
            <p className="text-center text-xs font-inter mt-3" style={{ color: '#8a7a50' }}>
              Las canciones aparecen en unos segundos
            </p>
          </>
        )}
      </div>
    </div>
  )
}
