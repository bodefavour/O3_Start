import type { Metadata } from 'next'
import '../src/styles/globals.css'
import { UserProvider, ToastProvider } from '@/contexts/auth-provider'

export const metadata: Metadata = {
  title: 'BorderlessPay - Global Payment Platform',
  description: 'Fast, secure, and affordable cross-border payments powered by Hedera',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  )
}
