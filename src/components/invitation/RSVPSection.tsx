'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { Guest } from '@/types'

export interface RSVPSectionProps {
  guest: Guest
  onRSVPChange?: () => void
}

export function RSVPSection({ guest, onRSVPChange }: RSVPSectionProps) {
  const [loading, setLoading] = useState(false)
  const [showAbono, setShowAbono] = useState(false)
  const [abono, setAbono] = useState<'completo' | 'tarde' | null>(guest.abono ?? null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [editing, setEditing] = useState(false)
  const [confirmedStatus, setConfirmedStatus] = useState<boolean | null>(
    guest.confirmed
  )

  const handleRSVP = async (confirmed: boolean) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_id: guest.id,
          confirmed,
          plus_one: null,
          abono: confirmed ? abono : null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error al guardar respuesta')
      }

      setConfirmedStatus(confirmed)
      setEditing(false)
      setShowAbono(false)
      if (!confirmed) setAbono(null)
      setSuccess(true)
      onRSVPChange?.()

      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al procesar la respuesta'
      )
    } finally {
      setLoading(false)
    }
  }

  const isConfirmed = confirmedStatus === true
  const isRejected = confirmedStatus === false
  const hasResponded = confirmedStatus !== null

  return (
    <div className="w-full py-12 px-4 bg-[var(--color-cream)]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-8 text-center">
          RSVP
        </h2>

        <div className="bg-[var(--color-white-warm)] rounded-lg border-2 border-[var(--color-green-dark)] p-8">
          <p className="text-center text-lg text-[var(--color-text-dark)] font-inter mb-8">
            Hola <span className="font-semibold">{guest.name}</span>, estaremos
            encantados de celebrarlo contigo
          </p>

          {/* Current status (when not editing) */}
          {hasResponded && !editing && (
            <>
              {isConfirmed && (
                <div className="bg-[var(--color-green-light)]/20 border border-[var(--color-green-light)] rounded-lg p-4 mb-4 text-center">
                  <p className="text-[var(--color-green-dark)] font-semibold">
                    ✓ Confirmada tu asistencia
                  </p>
                  {abono && (
                    <p className="text-sm text-[var(--color-green-dark)] font-medium mt-1">
                      {abono === 'completo' ? 'Abono día completo' : 'Abono de tarde'}
                    </p>
                  )}
                </div>
              )}

              {isRejected && (
                <div className="bg-[var(--color-text-muted)]/20 border border-[var(--color-text-muted)] rounded-lg p-4 mb-4 text-center">
                  <p className="text-[var(--color-text-dark)] font-semibold">
                    Lo sentimos que no puedas asistir
                  </p>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={() => {
                    setEditing(true)
                    setShowAbono(false)
                    setAbono(guest.abono ?? null)
                    setError(null)
                  }}
                  className="text-sm font-inter text-[var(--color-text-muted)] underline underline-offset-2 hover:text-[var(--color-green-dark)] transition-colors"
                >
                  Cambiar respuesta
                </button>
              </div>
            </>
          )}

          {/* Action buttons (unanswered or editing) */}
          {(!hasResponded || editing) && (
            <>
              <div className="space-y-4 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => setShowAbono(true)}
                  disabled={loading}
                >
                  Estaré en el festival 🎉
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => handleRSVP(false)}
                  loading={loading && !showAbono}
                >
                  No podré asistir
                </Button>
              </div>

              {showAbono && (
                <div className="bg-[var(--color-surface)] rounded-lg p-6 space-y-5">
                  <div className="space-y-3">
                    <p className="font-inter text-sm font-semibold text-[var(--color-text-dark)] uppercase tracking-wide">
                      Tipo de abono
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAbono('completo')}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          abono === 'completo'
                            ? 'border-[var(--color-green-dark)] bg-[var(--color-green-dark)]/5'
                            : 'border-[var(--color-text-muted)]/30 hover:border-[var(--color-green-dark)]/50'
                        }`}
                      >
                        <p className="font-playfair font-bold text-[var(--color-green-dark)] text-sm">
                          Abono día completo
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAbono('tarde')}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          abono === 'tarde'
                            ? 'border-[var(--color-green-dark)] bg-[var(--color-green-dark)]/5'
                            : 'border-[var(--color-text-muted)]/30 hover:border-[var(--color-green-dark)]/50'
                        }`}
                      >
                        <p className="font-playfair font-bold text-[var(--color-green-dark)] text-sm">
                          Abono de tarde
                        </p>
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      className="flex-1"
                      onClick={() => handleRSVP(true)}
                      loading={loading}
                      disabled={loading || !abono}
                    >
                      {loading && <LoadingSpinner size="sm" />}
                      Confirmar
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex-1"
                      onClick={() => {
                        setShowAbono(false)
                        if (editing) setEditing(false)
                      }}
                      disabled={loading}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-inter">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-inter font-semibold">
                ✓ Respuesta guardada correctamente
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
