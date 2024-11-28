//CSS
import '@/styles/globals.css'
//Core
import { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
//clsx
import clsx from 'clsx'
//Components
import { Navbar, RouteProgressBar } from '@/components'
//Providers
import { Providers } from './providers'
//Config
import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const username = cookies().get('username')?.value as string
  const token = cookies().get('access_token_cookie')?.value as string
  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <RouteProgressBar />
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className='relative flex flex-col h-screen'>
            <Navbar username={username} isLoggedIn={!!token} />
            <main className='container mx-auto max-w-7xl pt-16 px-6 flex-grow'>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
