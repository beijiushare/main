import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beijiu',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" style={{ margin: 0 }}>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
