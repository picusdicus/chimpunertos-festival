import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guestId = searchParams.get('guest_id')

    if (!guestId) {
      return NextResponse.json(
        { error: 'Missing guest_id' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data: songs, error } = await supabase
      .from('songs')
      .select('*')
      .eq('guest_id', guestId)
      .order('added_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch songs' },
        { status: 500 }
      )
    }

    return NextResponse.json(songs || [])
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
