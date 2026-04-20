'use client'

import { useEffect, useState } from 'react'

export interface CountdownTimerProps {
  targetDate?: string // ISO format: 2026-09-25T18:00:00
}

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
}

export function CountdownTimer({
  targetDate = '2026-09-25T18:00:00',
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(
    null
  )

  useEffect(() => {
    const calculateTimeRemaining = (): void => {
      const target = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference / (1000 * 60 * 60)) % 24
          ),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        })
      } else {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
        })
      }
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [targetDate])

  if (!timeRemaining) {
    return null
  }

  const TimeUnit = ({
    value,
    label,
  }: {
    value: number
    label: string
  }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-[var(--color-white-warm)] border-2 border-[var(--color-beige)] rounded-lg">
        <span className="font-playfair text-2xl sm:text-3xl font-bold text-[var(--color-green-dark)]">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <p className="mt-2 text-xs sm:text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
        {label}
      </p>
    </div>
  )

  return (
    <div className="w-full py-8 sm:py-12 px-4 bg-[var(--color-cream)]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-center text-[var(--color-green-dark)] mb-8">
          Cuenta Atrás
        </h2>

        <div className="flex justify-center gap-4 sm:gap-6">
          <TimeUnit value={timeRemaining.days} label="Días" />
          <TimeUnit value={timeRemaining.hours} label="Horas" />
          <TimeUnit value={timeRemaining.minutes} label="Minutos" />
        </div>
      </div>
    </div>
  )
}
