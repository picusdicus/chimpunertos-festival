import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { RSVPPayload } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guest_id, confirmed, plus_one, abono } = body as RSVPPayload

    // Validation
    if (!guest_id || typeof guest_id !== 'string') {
      return NextResponse.json(
        { error: 'guest_id inválido' },
        { status: 400 }
      )
    }

    if (typeof confirmed !== 'boolean') {
      return NextResponse.json(
        { error: 'confirmed debe ser un booleano' },
        { status: 400 }
      )
    }

    if (plus_one !== null && typeof plus_one !== 'boolean') {
      return NextResponse.json(
        { error: 'plus_one debe ser un booleano o null' },
        { status: 400 }
      )
    }

    if (confirmed && abono !== 'completo' && abono !== 'tarde') {
      return NextResponse.json(
        { error: 'Debes seleccionar un tipo de abono' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('guests')
      .update({
        confirmed,
        plus_one: confirmed ? plus_one : null,
        abono: confirmed ? abono : null,
      })
      .eq('id', guest_id)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Error al actualizar la respuesta' },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Invitado no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      guest: data[0],
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    )
  }
}
