import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gozdarstvo Kurnik – Blaž Kurnik, dopolnilna dejavnost',
  description:
    'Profesionalne gozdarske storitve na območju vzhodne Štajerske. Sečnja, spravilo lesa, nega gozda, vzdrževanje gozdnih poti. Blaž Kurnik, dopolnilna dejavnost, Zgornja Voličina.',
  keywords: [
    'gozdarstvo',
    'sečnja',
    'spravilo lesa',
    'nega gozda',
    'gozdne poti',
    'drva',
    'hlodovina',
    'Blaž Kurnik',
    'Zgornja Voličina',
    'vzhodna Štajerska',
  ],
  authors: [{ name: 'Blaž Kurnik' }],
  openGraph: {
    title: 'Gozdarstvo Kurnik – Profesionalne gozdarske storitve',
    description:
      'Sečnja, spravilo lesa, nega gozda in vzdrževanje gozdnih poti na območju vzhodne Štajerske.',
    locale: 'sl_SI',
    type: 'website',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Gozdarstvo Kurnik',
      description:
        'Profesionalne gozdarske storitve – sečnja, spravilo lesa, nega gozda, vzdrževanje gozdnih poti.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Zgornja Voličina 2',
        postalCode: '2232',
        addressLocality: 'Voličina',
        addressCountry: 'SI',
      },
      telephone: '+38631316311',
      email: 'blazkurnik14@gmail.com',
      areaServed: 'Vzhodna Štajerska',
      priceRange: 'Po dogovoru',
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sl" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
