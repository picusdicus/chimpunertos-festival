function WhatsAppIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path
        d="M22.5 9.5A8.96 8.96 0 0 0 16 7C11.58 7 8 10.58 8 15c0 1.42.37 2.8 1.07 4.02L8 24l5.12-1.34A8.96 8.96 0 0 0 16 23c4.42 0 8-3.58 8-8 0-2.14-.83-4.14-2.33-5.64l-.17-.86zM16 21.5c-1.22 0-2.41-.33-3.44-.95l-.25-.15-2.57.67.69-2.5-.16-.26A6.47 6.47 0 0 1 9.5 15c0-3.58 2.92-6.5 6.5-6.5 1.74 0 3.37.68 4.6 1.9A6.46 6.46 0 0 1 22.5 15c0 3.58-2.92 6.5-6.5 6.5zm3.56-4.87c-.19-.1-1.14-.56-1.32-.63-.17-.06-.3-.1-.42.1-.13.19-.49.63-.6.76-.11.13-.22.14-.41.05-.19-.1-.81-.3-1.54-.95-.57-.51-.95-1.14-1.06-1.33-.11-.19-.01-.3.08-.39.09-.09.19-.22.29-.33.1-.11.13-.19.19-.32.07-.13.03-.24-.02-.33-.05-.1-.42-1.02-.58-1.39-.15-.36-.3-.31-.42-.32h-.36c-.12 0-.33.05-.5.24-.17.2-.67.65-.67 1.59s.68 1.85.78 1.97c.1.13 1.34 2.05 3.25 2.87.45.2.81.31 1.08.4.45.14.87.12 1.19.07.36-.05 1.12-.46 1.27-.9.16-.44.16-.82.11-.9-.05-.08-.17-.13-.36-.22z"
        fill="white"
      />
    </svg>
  )
}

export interface ContactSectionProps {
  daniPhone?: string
  solePhone?: string
}

export function ContactSection({
  daniPhone = '34600000000',
  solePhone = '34600000001',
}: ContactSectionProps) {
  return (
    <div className="w-full py-12 px-4 bg-[var(--color-cream)]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-playfair text-3xl font-bold text-[var(--color-green-dark)] mb-4">
          Contacto
        </h2>
        <div className="h-1 w-16 bg-[var(--color-gold)] mx-auto mb-6" />
        <p className="font-inter text-[var(--color-text-muted)] mb-10">
          Contáctanos para cualquier duda o aclaración
        </p>

        <div className="flex flex-row gap-6 justify-center">
          <a
            href={`https://wa.me/${daniPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 bg-[var(--color-white-warm)] border-2 border-[var(--color-green-dark)] rounded-lg px-8 py-6 hover:border-[var(--color-gold)] hover:shadow-md transition-all group"
          >
            <WhatsAppIcon />
            <span className="font-playfair text-xl font-bold text-[var(--color-green-dark)] group-hover:text-[var(--color-gold)] transition-colors">
              Dani
            </span>
            <span className="text-xs font-inter text-[var(--color-text-muted)] uppercase tracking-widest">
              Escríbeme
            </span>
          </a>

          <a
            href={`https://wa.me/${solePhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 bg-[var(--color-white-warm)] border-2 border-[var(--color-green-dark)] rounded-lg px-8 py-6 hover:border-[var(--color-gold)] hover:shadow-md transition-all group"
          >
            <WhatsAppIcon />
            <span className="font-playfair text-xl font-bold text-[var(--color-green-dark)] group-hover:text-[var(--color-gold)] transition-colors">
              Sole
            </span>
            <span className="text-xs font-inter text-[var(--color-text-muted)] uppercase tracking-widest">
              Escríbeme
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
