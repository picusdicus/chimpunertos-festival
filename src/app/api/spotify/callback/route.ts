import { NextRequest, NextResponse } from 'next/server'
import { validateAndConsumeState } from '@/lib/spotify-state'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.json(
      { error: `Spotify authorization denied: ${error}` },
      { status: 400 }
    )
  }

  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code from Spotify' },
      { status: 400 }
    )
  }

  if (!state) {
    return NextResponse.json(
      { error: 'Missing state parameter from Spotify' },
      { status: 400 }
    )
  }

  // Validate state against server-side store
  const isValidState = validateAndConsumeState(state)
  if (!isValidState) {
    console.error('State validation failed:', { received: state })
    return NextResponse.json(
      { error: 'State validation failed - possible CSRF attack' },
      { status: 400 }
    )
  }

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: 'Missing Spotify credentials' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }).toString(),
    })

    if (!response.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const data = await response.json()

    const redirectResponse = NextResponse.redirect(
      new URL('/admin/spotify-connected', request.url)
    )

    // Store tokens in httpOnly cookies
    redirectResponse.cookies.set('spotify_access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: data.expires_in,
    })

    redirectResponse.cookies.set('spotify_refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })

    return redirectResponse
  } catch (error) {
    console.error('Spotify token exchange error:', error)
    return NextResponse.json(
      { error: 'Failed to exchange token' },
      { status: 500 }
    )
  }
}
