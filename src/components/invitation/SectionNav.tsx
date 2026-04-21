'use client'

const NAV_ITEMS = [
  { label: 'Fecha', href: '#fecha' },
  { label: 'El evento', href: '#evento' },
  { label: 'Cuenta atrás', href: '#countdown' },
  { label: 'Lugar', href: '#lugar' },
  { label: 'RSVP', href: '#rsvp' },
  { label: 'Mensajes', href: '#mensajes' },
  { label: 'Setlist', href: '#setlist' },
]

export function SectionNav() {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className="sticky top-0 z-50 w-full overflow-x-auto"
      style={{
        background: 'var(--color-green-dark)',
        borderBottom: '2px solid var(--color-gold)',
      }}
    >
      <ul className="flex items-center min-w-max mx-auto px-4">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="block px-4 py-3 text-xs font-semibold uppercase tracking-widest font-inter transition-colors whitespace-nowrap"
              style={{ color: 'var(--color-white-warm)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--color-gold)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--color-white-warm)')
              }
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
