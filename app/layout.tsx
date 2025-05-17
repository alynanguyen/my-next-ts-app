import './globals.css'
import Link from 'next/link'
import { ReactNode } from 'react'

export const metadata = {
  title: 'My App',
  description: 'Next.js App Router with Tailwind and HeroUI',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@hero-ui/css/dist/hero-ui.min.css"
        />
      </head>

      <body>
        {/* <nav className="bg-gray-100 p-4 space-x-4 text-blue-600 font-medium">
          <Link href="/">Home</Link>
          <Link href="/joke">Joke</Link>
          <Link href="/form">Form</Link>
        </nav> */}
        <nav className="bg-white p-4 flex justify-center space-x-10 shadow-md">
          <Link
            href="/"
            className="px-4 py-2 rounded-full text-black font-semibold hover:bg-blue-100 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            href="/joke"
            className="px-4 py-2 rounded-full text-black font-semibold hover:bg-blue-100 transition-all duration-300"
          >
            Joke
          </Link>
          <Link
            href="/form"
            className="px-4 py-2 rounded-full text-black font-semibold hover:bg-blue-100 transition-all duration-300"
          >
            Form
          </Link>
        </nav>

        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}

