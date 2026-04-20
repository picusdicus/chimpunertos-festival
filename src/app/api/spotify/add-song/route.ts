import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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

async function addTrackToPlaylist(
  playlistId: string,
  trackUri: string,
  accessToken: string
): Promise<void> {
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

  if (response.status === 401) {
    throw new Error('TOKEN_EXPIRED')
  }

  if (!response.ok) {
    throw new Error('Failed to add track to playlist')
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      track_id,
      track_name,
      artist_name,
      album_image,
      guest_id,
    } = body

    // Validation
    if (!track_id || !track_name || !artist_name || !guest_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let accessToken = request.cookies.get('spotify_access_token')?.value
    let refreshToken = request.cookies.get('spotify_refresh_token')?.value

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: 'Not authenticated with Spotify' },
        { status: 401 }
      )
    }

    const playlistId = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID

    if (!playlistId) {
      return NextResponse.json(
        { error: 'Playlist ID not configured' },
        { status: 500 }
      )
    }

    // Try to add track to playlist
    try {
      await addTrackToPlaylist(
        playlistId,
        `spotify:track:${track_id}`,
        accessToken
      )
    } catch (error) {
      if (error instanceof Error && error.message === 'TOKEN_EXPIRED') {
        // Refresh token and retry
        const newTokenData = await refreshAccessToken(refreshToken)
        accessToken = newTokenData.access_token

        await addTrackToPlaylist(
          playlistId,
          `spotify:track:${track_id}`,
          accessToken
        )
      } else {
        throw error
      }
    }

    // Save to Supabase
    const supabase = await createClient()

    const { data: song, error: dbError } = await supabase
      .from('songs')
      .insert([
        {
          guest_id,
          track_id,
          track_name,
          artist_name,
          album_image: album_image || null,
        },
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save song' },
        { status: 500 }
      )
    }

    const response = NextResponse.json({
      success: true,
      song,
    })

    // Update access token in response if it was refreshed
    if (accessToken !== request.cookies.get('spotify_access_token')?.value) {
      response.cookies.set('spotify_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
    }

    return response
  } catch (error) {
    console.error('Add song error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to add song',
      },
      { status: 500 }
    )
  }
}
