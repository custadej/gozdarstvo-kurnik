import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
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
  metadataBase: new URL('https://gozdarstvo-kurnik.si'),
  title: 'Gozdarstvo Kurnik',
  icons: {
    icon: '/slike/web/0-logotip.png',
    shortcut: '/slike/web/0-logotip.png',
    apple: '/slike/web/0-logotip.png',
  },
  description:
    'Profesionalne gozdarske storitve v Podravju. Sečnja, spravilo lesa, vzdrževanje gozdnih poti. Blaž Kurnik, Zgornja Voličina. Pokličite: 031 316 311',
  keywords: [
    'gozdarstvo Podravje',
    'sečnja dreves Ptuj',
    'spravilo lesa',
    'gozdar Zgornja Voličina',
    'Blaž Kurnik gozdarstvo',
    'gozdarske storitve vzhodna Štajerska',
    'gozdar okolica Ptuja',
  ],
  authors: [{ name: 'Blaž Kurnik' }],
  verification: {
    google: 'zN8MJ-IiIUY1ngN6usb8xwHuh5t8KpZ7PEyCNAr3kFI',
  },
  openGraph: {
    title: 'Gozdarstvo Kurnik – Profesionalne gozdarske storitve',
    description:
      'Sečnja, spravilo lesa, nega gozda in vzdrževanje gozdnih poti na območju vzhodne Štajerske.',
    locale: 'sl_SI',
    type: 'website',
    images: ['/slike/web/blaz-na-harvesterju-gozd.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gozdarstvo Kurnik – Sečnja in spravilo lesa | Podravje',
    description:
      'Profesionalne gozdarske storitve v Podravju. Sečnja, spravilo lesa, vzdrževanje gozdnih poti. Blaž Kurnik, Zgornja Voličina. Pokličite: 031 316 311',
    images: ['/slike/web/blaz-na-harvesterju-gozd.jpg'],
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Gozdarstvo Kurnik',
  description: 'Profesionalne gozdarske storitve. Sečnja, spravilo lesa, vzdrževanje gozdnih poti.',
  url: 'https://gozdarstvo-kurnik.si',
  telephone: '+38631316311',
  email: 'blazkurnik14@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Zgornja Voličina 2',
    addressLocality: 'Voličina',
    postalCode: '2232',
    addressCountry: 'SI',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.4234,
    longitude: 15.9823,
  },
  image: 'https://gozdarstvo-kurnik.si/slike/web/0-logotip.png',
  logo: 'https://gozdarstvo-kurnik.si/slike/web/0-logotip.png',
  areaServed: ['Podravje', 'Ptuj', 'Maribor', 'Vzhodna Štajerska'],
  serviceType: ['Sečnja', 'Spravilo lesa', 'Vzdrževanje gozdnih poti', 'Nega gozda', 'Razrez hlodovine', 'Prodaja drv'],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Gozdarstvo Kurnik',
  url: 'https://gozdarstvo-kurnik.si',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sl" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
