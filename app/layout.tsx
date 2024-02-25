import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Digibase',
    description: 'Digibase are unique living dog in Base Chain eternally.',
    metadataBase: new URL('https://digibaseart.xyz'),
    openGraph: {
    title: 'Digibase',
    description: 'Digibase are unique living dog in Base Chain eternally.',
    url: 'https://digibaseart.xyz',
    siteName: 'digibaseart.xyz',
    images: [
      {
        url: '/image02.png',
        width: 1200,
        height: 630,
      },

    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}