import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

type GuestRow = Database['public']['Tables']['guests']['Row']

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function createServiceClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

export async function GET() {
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const guests = (data ?? []) as GuestRow[]
  const total = guests.length
  const confirmed = guests.filter((g) => g.confirmed === true).length
  const pending = guests.filter((g) => g.confirmed === null).length
  const declined = guests.filter((g) => g.confirmed === false).length

  return NextResponse.json({ guests, stats: { total, confirmed, pending, declined } })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name } = body

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 })
  }

  const slug = generateSlug(name.trim())

  if (!slug) {
    return NextResponse.json({ error: 'No se pudo generar un slug válido' }, { status: 400 })
  }

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('guests')
    .insert({ name: name.trim(), slug })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Ya existe un invitado con ese slug' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ guest: data }, { status: 201 })
}
