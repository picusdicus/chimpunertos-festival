'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { Guest } from '@/types'

interface Message {
  id: string
  content: string
  created_at: string
  guests: { name: string } | null
}

export interface WallOfFameSectionProps {
  guest: Guest
}

export function WallOfFameSection({ guest }: WallOfFameSectionProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadMessages()
  }, [])

  async function loadMessages() {
    try {
      const response = await fetch('/api/messages')
      if (!response.ok) throw new Error('Failed to load messages')
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guest_id: guest.id, content }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error al enviar mensaje')
      }

      setContent('')
      setSuccess(true)
      await loadMessages()

      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    } finally {
      setSubmitting(false)
    }
  }

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="w-full py-12 px-4 bg-[var(--color-surface)]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-4 text-center">
          Wall of Fame
        </h2>
        <p className="text-center text-[var(--color-text-muted)] font-inter mb-8">
          Deja un mensaje para los novios
        </p>

        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="w-full p-4 rounded-lg border-2 border-[var(--color-green-dark)] bg-[var(--color-white-warm)] font-inter text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] resize-none"
            rows={3}
            maxLength={500}
            disabled={submitting}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-[var(--color-text-muted)] font-inter">
              {content.length}/500
            </span>
            <Button
              type="submit"
              variant="primary"
              disabled={!content.trim() || submitting}
              loading={submitting}
            >
              Enviar mensaje
            </Button>
          </div>
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-inter">{error}</p>
            </div>
          )}
          {success && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-inter font-semibold">
                ✓ Mensaje enviado
              </p>
            </div>
          )}
        </form>

        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center text-[var(--color-text-muted)] font-inter">
            Sé el primero en dejar un mensaje
          </p>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-[var(--color-white-warm)] border-l-4 border-[var(--color-gold)] rounded-lg p-4"
              >
                <p className="font-inter text-[var(--color-text-dark)] mb-3 italic">
                  &ldquo;{message.content}&rdquo;
                </p>
                <div className="flex justify-between items-center text-sm font-inter">
                  <span className="font-semibold text-[var(--color-green-dark)]">
                    — {message.guests?.name || 'Anónimo'}
                  </span>
                  <span className="text-[var(--color-text-muted)]">
                    {formatDate(message.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
