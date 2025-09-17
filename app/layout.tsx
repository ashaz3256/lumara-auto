import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lumara Auto - AI Car Triage',
  description: 'Get instant, safe advice for your car troubles with AI-powered symptom analysis. No tools required.',
  keywords: 'car diagnosis, vehicle troubleshooting, automotive advice, car symptoms, mechanic checklist',
  authors: [{ name: 'Lumara Auto' }],
  openGraph: {
    title: 'Lumara Auto - AI Car Triage',
    description: 'Get instant, safe advice for your car troubles with AI-powered symptom analysis.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumara Auto - AI Car Triage',
    description: 'Get instant, safe advice for your car troubles with AI-powered symptom analysis.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
