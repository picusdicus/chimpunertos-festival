export type Database = {
  public: {
    Tables: {
      guests: {
        Row: {
          id: string
          slug: string
          name: string
          confirmed: boolean | null
          plus_one: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          confirmed?: boolean | null
          plus_one?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          confirmed?: boolean | null
          plus_one?: boolean | null
          created_at?: string
        }
      }
      songs: {
        Row: {
          id: string
          guest_id: string
          track_id: string
          track_name: string
          artist_name: string
          album_image: string | null
          added_at: string
        }
        Insert: {
          id?: string
          guest_id: string
          track_id: string
          track_name: string
          artist_name: string
          album_image?: string | null
          added_at?: string
        }
        Update: {
          id?: string
          guest_id?: string
          track_id?: string
          track_name?: string
          artist_name?: string
          album_image?: string | null
          added_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
