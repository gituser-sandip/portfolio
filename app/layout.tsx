import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { site } from '@/content/portfolio';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Sandeep Meche | Frontend engineer',
    template: '%s | Sandeep Meche',
  },
  description:
    'Frontend engineer building fast, accessible, and conversion-focused digital experiences with React, Next.js, TypeScript, and Tailwind CSS.',
  keywords: [
    'Frontend engineer',
    'React developer',
    'Next.js developer',
    'UI engineer',
    'TypeScript',
    'Tailwind CSS',
    'Nepal',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: 'Sandeep Meche | Frontend engineer',
    description:
      'Fast, accessible, conversion-focused digital experiences built with modern React.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Sandeep Meche, frontend engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandeep Meche | Frontend engineer',
    description:
      'Fast, accessible, conversion-focused digital experiences built with modern React.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
  ],
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: 'Frontend Engineer and UI Specialist',
  email: site.email,
  sameAs: [site.github, site.linkedin],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'NP',
  },
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'Accessibility', 'Design systems', 'Web performance'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={geistSans.variable + ' ' + geistMono.variable + ' font-sans'}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
