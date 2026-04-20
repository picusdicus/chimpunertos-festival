import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.json(
      { error: `Spotify authorization denied: ${error}` },
      { status: 400 }
    )
  }

  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code' },
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

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }).toString(),
  })

  if (!tokenResponse.ok) {
    const body = await tokenResponse.text()
    console.error('Token exchange failed:', body)
    return NextResponse.json(
      { error: 'Failed to exchange code for token' },
      { status: 500 }
    )
  }

  const data = await tokenResponse.json()

  // Print refresh_token to server console — copy this to SPOTIFY_OWNER_REFRESH_TOKEN in .env.local
  console.log('\n✅ Spotify connected!')
  console.log('📋 Copy this to .env.local as SPOTIFY_OWNER_REFRESH_TOKEN:')
  console.log(data.refresh_token)
  console.log('\n')

  const response = NextResponse.redirect(new URL('/admin', request.url))

  response.cookies.set('spotify_access_token', data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 3500,
  })

  return response
}
