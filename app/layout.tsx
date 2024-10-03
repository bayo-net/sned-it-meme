import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/header'

const gloriahallelujahSans = localFont({
    src: './fonts/GloriaHallelujah.ttf',
    variable: '--font-gloriahallelujah-sans',
    weight: '100 900',
})

const hanaleiFillSans = localFont({
    src: './fonts/HanaleiFill.ttf',
    variable: '--font-hanaleifill-sans',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'sned meme',
    description: '',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${gloriahallelujahSans.variable} ${hanaleiFillSans.variable} antialiased flex flex-col min-h-screen`}
            >
                {' '}
                <Header />
                {children}
            </body>
        </html>
    )
}
