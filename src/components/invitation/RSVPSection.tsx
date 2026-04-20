'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { Guest } from '@/types'

export interface RSVPSectionProps {
  guest: Guest
  onRSVPChange?: () => void
}

export function RSVPSection({
  guest,
  onRSVPChange,
}: RSVPSectionProps) {
  const [loading, setLoading] = useState(false)
  const [showPlusOne, setShowPlusOne] = useState(false)
  const [plusOne, setPlusOne] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRSVP = async (confirmed: boolean) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guest_id: guest.id,
          confirmed,
          plus_one: confirmed ? plusOne : null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error al guardar respuesta')
      }

      setSuccess(true)
      onRSVPChange?.()

      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al procesar la respuesta'
      )
    } finally {
      setLoading(false)
    }
  }

  const isConfirmed = guest.confirmed === true
  const isRejected = guest.confirmed === false

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

          {/* Current Status */}
          {isConfirmed && (
            <div className="bg-[var(--color-green-light)]/20 border border-[var(--color-green-light)] rounded-lg p-4 mb-6 text-center">
              <p className="text-[var(--color-green-dark)] font-semibold">
                ✓ Confirmado tu asistencia
              </p>
              {guest.plus_one && (
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Asistirás con acompañante
                </p>
              )}
            </div>
          )}

          {isRejected && (
            <div className="bg-[var(--color-text-muted)]/20 border border-[var(--color-text-muted)] rounded-lg p-4 mb-6 text-center">
              <p className="text-[var(--color-text-dark)] font-semibold">
                Lo sentimos que no puedas asistir
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {!isConfirmed && !isRejected ? (
            <>
              <div className="space-y-4 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setShowPlusOne(true)
                  }}
                  disabled={loading}
                >
                  Estaré en el festival 🎉
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => handleRSVP(false)}
                  loading={loading && !showPlusOne}
                >
                  No podré asistir
                </Button>
              </div>

              {/* Plus One Option */}
              {showPlusOne && (
                <div className="bg-[var(--color-surface)] rounded-lg p-6 space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={plusOne}
                      onChange={(e) => setPlusOne(e.target.checked)}
                      className="w-5 h-5 accent-[var(--color-green-dark)]"
                    />
                    <span className="text-[var(--color-text-dark)] font-inter">
                      Vendré con acompañante
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      className="flex-1"
                      onClick={() => handleRSVP(true)}
                      loading={loading}
                    >
                      {loading && <LoadingSpinner size="sm" />}
                      Confirmar
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex-1"
                      onClick={() => {
                        setShowPlusOne(false)
                        setPlusOne(false)
                      }}
                      disabled={loading}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : null}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-inter">{error}</p>
            </div>
          )}

          {/* Success Message */}
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
