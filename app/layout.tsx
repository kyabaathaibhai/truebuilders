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
  title: 'Skip the commission. Connect with builders directly.',
  description: 'Skip the commission. Connect with builders directly.',
  keywords: 'Skip the commission. Connect with builders directly.',
  authors: [{ name: 'Skip the commission. Connect with builders directly.' }],
  viewport: 'width=device-width, initial-scale=1',
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
