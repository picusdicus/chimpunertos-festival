import { ReactNode } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-green-dark)] text-[var(--color-white-warm)] hover:bg-[var(--color-green-mid)] active:bg-[var(--color-green-dark)]',
  outline:
    'border-2 border-[var(--color-green-dark)] text-[var(--color-green-dark)] hover:bg-[var(--color-cream)] active:bg-[var(--color-surface)]',
  ghost:
    'text-[var(--color-green-dark)] hover:bg-[var(--color-cream)] active:bg-[var(--color-surface)]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-sm rounded',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-6 py-3 text-lg rounded-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  return (
    <button
      disabled={disabled || loading}
      className={allClasses}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  )
}
