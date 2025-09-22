'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-luxury-cream'>
      <div className='text-center'>
        <h1 className='text-6xl font-serif text-luxury-navy mb-4'>404</h1>
        <h2 className='text-2xl font-serif text-luxury-navy mb-4'>
          Page Not Found
        </h2>
        <p className='text-luxury-warm-gray mb-8'>
          The page you're looking for doesn't exist.
        </p>
        <Link
          href='/'
          className='bg-luxury-gold text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all inline-block'
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
