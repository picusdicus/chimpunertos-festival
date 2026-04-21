import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: "Chimpunerto's Festival · Sole & Dani · 2026",
    template: "%s · Chimpunerto's Festival",
  },
  description: "Bienvenidos a la boda más épica del año. Únete a Sole & Dani en Chimpunerto's Festival 2026",
  openGraph: {
    siteName: "Chimpunerto's Festival",
    type: 'website',
    locale: 'es_ES',
    title: "Chimpunerto's Festival · Sole & Dani · 2026",
    description: "Sole y Dani te invitan a su boda festival el 25 de Septiembre de 2026",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
