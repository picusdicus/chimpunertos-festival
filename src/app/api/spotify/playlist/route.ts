import { NextResponse } from 'next/server'

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
  external_urls: {
    spotify: string
  }
}

interface PlaylistItem {
  added_at: string
  track: SpotifyTrack | null
}

export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const playlistId = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID

  if (!clientId || !clientSecret || !playlistId) {
    return NextResponse.json(
      { error: 'Missing Spotify credentials' },
      { status: 500 }
    )
  }

  try {
    // Get app-only access token (Client Credentials flow)
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    })

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to authenticate with Spotify' },
        { status: 500 }
      )
    }

    const tokenData = await tokenResponse.json()

    // Fetch playlist tracks
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100&fields=items(added_at,track(id,name,artists(name),album(images),external_urls))`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    )

    if (!playlistResponse.ok) {
      const errorText = await playlistResponse.text()
      console.error('Spotify playlist fetch failed:', errorText)
      return NextResponse.json(
        { error: 'Failed to fetch playlist' },
        { status: 500 }
      )
    }

    const playlistData = await playlistResponse.json()

    const tracks = (playlistData.items as PlaylistItem[])
      .filter((item) => item.track !== null)
      .map((item) => ({
        id: item.track!.id,
        name: item.track!.name,
        artists: item.track!.artists.map((a) => a.name).join(', '),
        album_image: item.track!.album.images[0]?.url || null,
        external_url: item.track!.external_urls.spotify,
        added_at: item.added_at,
      }))

    return NextResponse.json({ tracks })
  } catch (error) {
    console.error('Playlist fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch playlist' },
      { status: 500 }
    )
  }
}
