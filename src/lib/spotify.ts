import type { SpotifyTrack } from '@/types'

export const getSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
    response_type: 'code',
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    scope: 'playlist-modify-public playlist-modify-private',
  })

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

export const exchangeCodeForToken = async (code: string) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    }).toString(),
  })

  if (!response.ok) {
    throw new Error('Failed to exchange code for token')
  }

  return response.json()
}

export const searchTracks = async (
  query: string,
  accessToken: string
): Promise<SpotifyTrack[]> => {
  const params = new URLSearchParams({
    q: query,
    type: 'track',
    limit: '20',
  })

  const response = await fetch(
    `https://api.spotify.com/v1/search?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to search tracks')
  }

  const data = await response.json()
  return data.tracks.items
}

export const addTrackToPlaylist = async (
  playlistId: string,
  trackUri: string,
  accessToken: string
) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: [trackUri],
      }),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to add track to playlist')
  }

  return response.json()
}
