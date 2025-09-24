import React from 'react';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Poppins, Manrope } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import AppInit from '@lib/AppInit';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Skip broker commission. Connect directly with builders.',
  description: 'Skip broker commission. Connect directly with builders.',
  openGraph: {
    title: 'Skip broker commission. Connect directly with builders.',
    description: 'Skip broker commission. Connect directly with builders.',
    url: 'https://truebuilders.vercel.app',
    siteName: 'TrueBuilders',
    images: [
      {
        url: 'https://truebuilders.vercel.app/favicon.svg', // 👈 upload an image here
        width: 1200,
        height: 630,
        alt: 'Skip broker commission. Connect directly with builders.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skip broker commission. Connect directly with builders.',
    description: 'Skip broker commission. Connect directly with builders.',
    images: ['https://truebuilders.vercel.app/favicon.svg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${playfair.variable} ${poppins.variable} ${manrope.variable}`}
    >
      <body className={`${inter.className} min-h-screen bg-[#f5f6f8]`}>
        <AppInit>{children}</AppInit>
      </body>
    </html>
  );
}
