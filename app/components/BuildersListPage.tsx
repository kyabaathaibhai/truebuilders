'use client';

import { useEffect, useState } from 'react';
import { BuilderService } from '@lib/BuilderService';
import Loader from './Loader';
import Link from 'next/link';
import Logo from 'assets/Logo';
import { MapPin, Star, User } from 'lucide-react';
import Image from 'next/image';

export default function BuildersListPage() {
  const [builders, setBuilders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchBuilders() {
    try {
      setLoading(true);
      const response = await BuilderService.getBuildersList();
      setBuilders(response.data || []);
    } catch (error) {
      console.error('Error fetching builders:', error);
      setBuilders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBuilders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <Link
                className='mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2'
                href='/'
              >
                <Logo />
                <span className='text-2xl font-bold text-gray-900'>
                  TrueBuilders
                </span>
              </Link>
            </div>
            <nav className='flex space-x-4'>
              <Link
                href='/projects'
                className='px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100'
              >
                Projects
              </Link>
              <Link
                href='/builders'
                className='px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700'
              >
                Builders
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>All Builders</h1>
          <p className='mt-2 text-gray-600'>
            Browse all verified construction companies
          </p>
        </div>

        {builders.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>No builders found</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {builders.map((builder) => (
              <Link
                key={builder.id}
                href={`/builder/${builder.id}`}
                className='h-full relative'
              >
                <div className='h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer'>
                  <div className='relative flex justify-center items-center'>
                    <Image
                      src={builder.logo_image}
                      alt={builder.name}
                      className='w-48 h-48 object-contain rounded-t-xl'
                      width={100}
                      height={100}
                      unoptimized
                    />
                  </div>

                  <div className='space-y-2 p-6 flex flex-col'>
                    <span className='font-semibold'>{builder.name}</span>
                    <span className='font-normal text-sm'>
                      {builder.tagline}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
