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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: 'songs_guest_id_fkey'
            columns: ['guest_id']
            isOneToOne: false
            referencedRelation: 'guests'
            referencedColumns: ['id']
          }
        ]
      }
      messages: {
        Row: {
          id: string
          guest_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          guest_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          guest_id?: string
          content?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'messages_guest_id_fkey'
            columns: ['guest_id']
            isOneToOne: false
            referencedRelation: 'guests'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
