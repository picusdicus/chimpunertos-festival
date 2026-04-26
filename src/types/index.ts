export type Guest = {
  id: string
  slug: string
  name: string
  confirmed: boolean | null
  plus_one: boolean | null
  abono: 'completo' | 'tarde' | null
  created_at: string
}

export type Song = {
  id: string
  guest_id: string
  track_id: string
  track_name: string
  artist_name: string
  album_image: string | null
  added_at: string
}

export type SpotifyTrack = {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  preview_url: string | null
}

export type RSVPPayload = {
  guest_id: string
  confirmed: boolean
  plus_one: boolean
  abono: 'completo' | 'tarde' | null
}
