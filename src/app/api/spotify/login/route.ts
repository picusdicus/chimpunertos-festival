import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { generateAndStoreState } from '@/lib/spotify-state'

export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: 'Missing Spotify credentials' },
      { status: 500 }
    )
  }

  const state = crypto.randomBytes(16).toString('hex')
  const scopes = ['playlist-modify-public', 'playlist-modify-private']

  // Store state server-side with timestamp
  generateAndStoreState(state)
  console.log('Generated state:', state)

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    state,
    scope: scopes.join(' '),
  })

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  )
}
