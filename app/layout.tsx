import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digibase',
  description: '3,333 digibase are unique dog living in Base Chain forever.',
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