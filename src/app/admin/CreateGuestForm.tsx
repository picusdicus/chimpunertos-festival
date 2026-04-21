'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function CreateGuestForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const slug = generateSlug(name)
  const previewUrl = name.trim() ? `/invite/${slug}` : ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const res = await fetch('/api/admin/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Error desconocido')
        return
      }

      setSuccess(`Invitado "${data.guest.name}" creado con slug "${data.guest.slug}"`)
      setName('')
      router.refresh()
    } catch {
      setError('Error de red. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del invitado/s
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: María y Carlos"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-green-dark)] focus:border-transparent"
          />
        </div>

        {name.trim() && (
          <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm">
            <span className="text-gray-500">Enlace generado: </span>
            <span className="font-mono text-[var(--color-green-dark)]">
              {typeof window !== 'undefined' ? window.location.origin : ''}
              {previewUrl}
            </span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
        )}

        {success && (
          <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg">{success}</div>
        )}

        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ backgroundColor: 'var(--color-green-dark)' }}
        >
          {loading ? 'Creando...' : 'Crear invitado'}
        </button>
      </form>
    </div>
  )
}
