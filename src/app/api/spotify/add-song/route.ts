import { NextRequest, NextResponse } from 'next/server'

const TRACK_ID_REGEX = /^[a-zA-Z0-9]{22}$/

async function getOwnerAccessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_OWNER_REFRESH_TOKEN

  if (!refreshToken) {
    throw new Error('SPOTIFY_OWNER_REFRESH_TOKEN not configured')
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString(),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Token refresh failed: ${body}`)
  }

  const data = await response.json()
  return data.access_token as string
}

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { track_id } = body as { track_id?: string }

  if (!track_id || !TRACK_ID_REGEX.test(track_id)) {
    return NextResponse.json(
      { error: 'Invalid or missing track_id' },
      { status: 400 }
    )
  }

  const playlistId = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID

  if (!playlistId) {
    return NextResponse.json(
      { error: 'Playlist not configured' },
      { status: 500 }
    )
  }

  try {
    const accessToken = await getOwnerAccessToken()

    const addResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/items`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [`spotify:track:${track_id}`],
        }),
      }
    )

    if (addResponse.status === 401) {
      return NextResponse.json(
        { error: 'El dueño necesita re-autenticarse en /api/spotify/login' },
        { status: 401 }
      )
    }

    if (!addResponse.ok) {
      const errorBody = await addResponse.text()
      console.error('Spotify add track failed:', errorBody)
      return NextResponse.json(
        { error: 'No se pudo añadir la canción' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Add song error:', error)

    if (error instanceof Error && error.message.includes('not configured')) {
      return NextResponse.json(
        { error: 'Spotify no está configurado. Visita /api/spotify/login primero.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Error al añadir la canción' },
      { status: 500 }
    )
  }
}
