import { NextRequest, NextResponse } from 'next/server'
import type { SpotifyTrack } from '@/types'

async function getClientCredentialsToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify credentials')
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }).toString(),
  })

  if (!response.ok) {
    throw new Error('Failed to get client credentials token')
  }

  const data = await response.json()
  return data.access_token
}

async function refreshAccessToken(
  refreshToken: string
): Promise<{ access_token: string; expires_in: number }> {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify credentials')
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString(),
  })

  if (!response.ok) {
    throw new Error('Failed to refresh access token')
  }

  return response.json()
}

async function searchTracks(
  query: string,
  accessToken: string
): Promise<SpotifyTrack[]> {
  const params = new URLSearchParams({
    q: query,
    type: 'track',
    limit: '8',
  })

  const response = await fetch(
    `https://api.spotify.com/v1/search?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (response.status === 401) {
    throw new Error('TOKEN_EXPIRED')
  }

  if (!response.ok) {
    throw new Error('Failed to search tracks')
  }

  const data = await response.json()
  return data.tracks.items
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 })
  }

  try {
    let accessToken = request.cookies.get('spotify_access_token')?.value
    let refreshToken = request.cookies.get('spotify_refresh_token')?.value

    // If user is logged in, try to use their token
    if (accessToken) {
      try {
        const tracks = await searchTracks(query, accessToken)
        return NextResponse.json(tracks)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === 'TOKEN_EXPIRED' &&
          refreshToken
        ) {
          // Try to refresh the token
          try {
            const newTokenData = await refreshAccessToken(refreshToken)
            accessToken = newTokenData.access_token

            const response = NextResponse.json(
              await searchTracks(query, accessToken)
            )

            // Update the access token in response cookies
            response.cookies.set('spotify_access_token', accessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: newTokenData.expires_in,
            })

            return response
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError)
            // Fall through to client credentials
          }
        }
      }
    }

    // Fallback: use Client Credentials flow
    const clientToken = await getClientCredentialsToken()
    const tracks = await searchTracks(query, clientToken)

    return NextResponse.json(tracks)
  } catch (error) {
    console.error('Spotify search error:', error)
    return NextResponse.json(
      { error: 'Failed to search Spotify' },
      { status: 500 }
    )
  }
}
