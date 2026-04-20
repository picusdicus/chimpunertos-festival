import { ReactNode } from 'react'

type BadgeVariant = 'filled' | 'outline'

export interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  filled:
    'bg-[var(--color-green-dark)] text-[var(--color-white-warm)]',
  outline:
    'border border-[var(--color-green-dark)] text-[var(--color-green-dark)]',
}

export function Badge({
  variant = 'filled',
  children,
  className = '',
}: BadgeProps) {
  const baseClasses =
    'inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide'

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
