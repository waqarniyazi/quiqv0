import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

/* ═══════════════════════════════════════════════════════════════════
   VIEWPORT — separated from metadata per Next.js 14+ requirement
   ═══════════════════════════════════════════════════════════════════ */

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}

/* ═══════════════════════════════════════════════════════════════════
   SITE-WIDE METADATA — SEO defaults inherited by all pages
   ═══════════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  metadataBase: new URL('https://quiq.health'),

  title: {
    default: 'QUIQ — Affordable At-Home Self-Test Kits | 20+ Health Tests Starting at ₹99',
    template: '%s | QUIQ',
  },

  description:
    'QUIQ brings lab-grade self-testing diagnostics to your home in India. Test for Vitamin D, B12, TSH, Diabetes, CRP & more — one drop of blood, 5-minute results, starting at just ₹99. No lab visit needed.',

  keywords: [
    'self-test kit India',
    'home diagnostic test kit',
    'affordable health test India',
    'rapid diagnostic test kit',
    'at-home blood test India',
    'vitamin D test at home',
    'vitamin B12 test at home',
    'thyroid test at home India',
    'TSH self-test kit',
    'diabetes test at home',
    'HbA1c self-test',
    'CRP test kit',
    'ferritin test at home',
    'anemia test kit India',
    'cholesterol test at home',
    'self-testing diagnostics India',
    'lateral flow diagnostic test',
    'QUIQ health',
    'QUIQ test kits',
    'QUIQ diagnostics',
    'quiq.health',
    'health test under 99 rupees',
    'affordable diagnostics India',
    'home health screening kit',
    'preventive health test India',
    'rapid blood test kit',
    'self-administered health test',
    'point of care testing India',
    'OTC diagnostic test India',
    'Santa Clara Pvt Ltd',
  ],

  authors: [{ name: 'QUIQ', url: 'https://quiq.health' }],
  creator: 'QUIQ — An Initiative by Santa Clara Pvt. Ltd.',
  publisher: 'QUIQ',

  alternates: {
    canonical: 'https://quiq.health',
  },

  icons: {
    icon: '/quiq-logo.png',
    apple: '/quiq-logo.png',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://quiq.health',
    siteName: 'QUIQ',
    title: 'QUIQ — Affordable At-Home Self-Test Kits | 20+ Health Tests Starting at ₹99',
    description:
      '20+ lab-grade self-test kits you can use at home. One drop of blood, results in 5 minutes, starting at just ₹99. Launching soon across India.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QUIQ — Affordable At-Home Self-Test Kits',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'QUIQ — Affordable At-Home Self-Test Kits',
    description:
      '20+ lab-grade self-test kits. One drop of blood. At home. 5-minute results. Starting at ₹99. Launching soon in India.',
    images: ['/og-image.png'],
    creator: '@quiqhealth',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  category: 'health',
}

/* ═══════════════════════════════════════════════════════════════════
   ROOT LAYOUT
   ═══════════════════════════════════════════════════════════════════ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
