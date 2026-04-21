'use client'

import { useState } from 'react'
import type { Database } from '@/types/database'

type Guest = Database['public']['Tables']['guests']['Row']

interface Props {
  guests: Guest[]
}

function StatusBadge({ confirmed }: { confirmed: boolean | null }) {
  if (confirmed === true) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Confirmado
      </span>
    )
  }
  if (confirmed === false) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        No asiste
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
      Pendiente
    </span>
  )
}

export default function GuestTable({ guests }: Props) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyLink = async (slug: string) => {
    const url = `${window.location.origin}/invite/${slug}`
    await navigator.clipboard.writeText(url)
    setCopied(slug)
    setTimeout(() => setCopied(null), 2000)
  }

  if (guests.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center text-gray-400 shadow-sm border border-gray-100">
        No hay invitados aún.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Nombre</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Estado</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Acompañante</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Confirmación</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-800">{guest.name}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{guest.slug}</td>
                <td className="px-4 py-3">
                  <StatusBadge confirmed={guest.confirmed} />
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {guest.plus_one === true ? 'Sí' : guest.plus_one === false ? 'No' : '—'}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {guest.confirmed !== null && guest.created_at
                    ? new Date(guest.created_at).toLocaleDateString('es-ES')
                    : '—'}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => copyLink(guest.slug)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
                  >
                    {copied === guest.slug ? '¡Copiado!' : 'Copiar enlace'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
