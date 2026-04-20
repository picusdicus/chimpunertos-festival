import { NextRequest, NextResponse } from 'next/server'

interface SpotifyArtist {
  name: string
}

interface SpotifyImage {
  url: string
}

interface SpotifyTrack {
  id: string
  name: string
  artists: SpotifyArtist[]
  album: {
    images: SpotifyImage[]
  }
  preview_url: string | null
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[]
  }
}

async function getClientCredentialsToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  })

  if (!response.ok) {
    throw new Error('Failed to get client credentials token')
  }

  const data = await response.json()
  return data.access_token as string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ tracks: [] })
  }

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Missing Spotify credentials' },
      { status: 500 }
    )
  }

  try {
    const accessToken = await getClientCredentialsToken()

    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=8&market=ES`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )

    if (!searchResponse.ok) {
      throw new Error(`Spotify search failed: ${searchResponse.status}`)
    }

    const data: SpotifySearchResponse = await searchResponse.json()

    const tracks: SpotifyTrack[] = data.tracks.items.map((item) => ({
      id: item.id,
      name: item.name,
      artists: item.artists.map((a) => ({ name: a.name })),
      album: {
        images: item.album.images.map((img) => ({ url: img.url })),
      },
      preview_url: item.preview_url,
    }))

    return NextResponse.json({ tracks })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Error al buscar canciones' },
      { status: 500 }
    )
  }
}
