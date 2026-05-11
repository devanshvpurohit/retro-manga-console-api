import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retro Manga Console API',
  description: 'ESP32-optimized manga proxy API for retro handheld devices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
