import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('messages')
    .select('id, content, created_at, guests(name)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Messages fetch error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ messages: data || [] })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guest_id, content } = body

    if (!guest_id || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json(
        { error: 'Missing guest_id or content' },
        { status: 400 }
      )
    }

    if (content.length > 500) {
      return NextResponse.json(
        { error: 'Message too long (max 500 characters)' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('messages')
      .insert({ guest_id, content: content.trim() })
      .select('id, content, created_at, guests(name)')
      .single()

    if (error) {
      console.error('Message insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: data })
  } catch (error) {
    console.error('Message POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}
