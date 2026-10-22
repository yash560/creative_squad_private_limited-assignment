import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://creativesquadprivatelimited.vercel.app'),
  title: 'CreativeSquad HireOS | Ambsta Recruitment & Drive Matrix',
  description:
    'Production-grade recruitment, candidate assessment, and cohort management platform for Creative Squad Private Limited Full Stack Development drive. Powered by TheWebVale.',
  keywords: [
    'Creative Squad',
    'HireOS',
    'Ambsta Recruitment Engine',
    'Candidate Shortlisting',
    'Next.js 15',
    'React 19',
    'Full Stack Assessment',
    'TheWebVale Architecture'
  ],
  authors: [{ name: 'TheWebVale Architecture Team', url: 'https://thewebvale.com' }],
  creator: 'TheWebVale',
  publisher: 'TheWebVale',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'CreativeSquad HireOS | Ambsta Recruitment & Drive Matrix',
    description:
      'Production-grade recruitment, candidate assessment, and cohort management platform for Creative Squad Private Limited. Powered by TheWebVale.',
    url: 'https://creativesquadprivatelimited.vercel.app',
    siteName: 'CreativeSquad HireOS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CreativeSquad HireOS Platform',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreativeSquad HireOS | Ambsta Recruitment & Drive Matrix',
    description: 'Production-grade recruitment & candidate evaluation platform. Powered by TheWebVale.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
