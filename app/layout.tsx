import React from 'react';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Poppins, Manrope } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

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
  title: 'Real Estate Platform',
  description: 'Premium real estate projects and developments',
  keywords: 'luxury real estate, premium properties, real estate development',
  authors: [{ name: 'Luxury Real Estate' }],
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
        {children}
      </body>
    </html>
  );
}
