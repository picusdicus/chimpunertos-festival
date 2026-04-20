export interface DateSectionProps {
  day?: number
  month?: string
  year?: number
  dayOfWeek?: string
  location?: string
  time?: string
}

export function DateSection({
  day = 25,
  month = 'Septiembre',
  year = 2026,
  dayOfWeek = 'Viernes',
  location = 'Navalcarnero',
  time = '17:30h',
}: DateSectionProps) {
  return (
    <div className="w-full py-8 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto border-4 border-[var(--color-green-dark)] p-6 sm:p-8 bg-[var(--color-surface)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Day */}
          <div className="text-6xl sm:text-7xl font-playfair font-bold text-[var(--color-green-dark)]">
            {day.toString().padStart(2, '0')}
          </div>

          {/* Month and year */}
          <div className="text-center sm:text-left">
            <p className="text-lg sm:text-xl font-semibold text-[var(--color-text-dark)] uppercase tracking-wide">
              {month} · {year}
            </p>
            <p className="text-base sm:text-lg text-[var(--color-text-muted)] font-inter">
              {dayOfWeek}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-1 bg-[var(--color-gold)] opacity-50" />

        {/* Location and time */}
        <p className="text-center sm:text-left text-[var(--color-text-muted)] font-inter">
          {location} · Puertas: {time}
        </p>
      </div>
    </div>
  )
}
