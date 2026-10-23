import type { Metadata } from 'next'
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google'
import { ThemeProvider } from './_components/theme-provider'
import { Navbar } from './_components/navbar'
import { Footer } from './_components/footer'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Izas Bisma Arya Cetta — Full-Stack Developer',
    template: '%s — Izas Bisma Arya Cetta',
  },
  description:
    "Portfolio of Izas Bisma Arya Cetta, a full-stack developer exploring the intersection of software, design, and interactive experiences.",
  keywords: ['full-stack developer', 'portfolio', 'web development', 'Next.js', 'React'],
  authors: [{ name: 'Izas Bisma Arya Cetta' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Izas Bisma Arya Cetta',
    title: 'Izas Bisma Arya Cetta — Full-Stack Developer',
    description:
      "Portfolio of Izas Bisma Arya Cetta, a full-stack developer exploring the intersection of software, design, and interactive experiences.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Izas Bisma Arya Cetta — Full-Stack Developer',
    description:
      "Portfolio of Izas Bisma Arya Cetta, a full-stack developer exploring the intersection of software, design, and interactive experiences.",
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
