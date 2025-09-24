'use client';

import { useEffect, useState } from 'react';
import { MapPin, ArrowLeft, Star } from 'lucide-react';
import Logo from 'assets/Logo';
import Link from 'next/link';
import { BuilderService } from '@lib/BuilderService';
import Loader from './Loader';

function BuilderDetailsPage({ builderId }) {
  const [builderData, setBuilderData] = useState<any>(null);
  async function fetchBuilderDetails() {
    try {
      const list = await BuilderService.getBuilderDetails(builderId);
      setBuilderData(list.data);
    } catch (err) {
      setBuilderData(null);
    }
  }

  useEffect(() => {
    if (builderId) fetchBuilderDetails();
  }, [builderId]);

  if (!builderData) {
    <Loader />;
  }

  // Home Page (existing code)
  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <Link
                className='mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors'
                href='/'
              >
                <ArrowLeft className='h-5 w-5 text-gray-600' />
              </Link>
              <Logo />
              <span className='text-2xl font-bold text-gray-900'>
                TrueBuilders
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Builder Info */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='bg-white rounded-xl shadow-lg p-8 mb-8'>
          <div className='flex items-start space-x-6'>
            <div className='text-6xl'>
              <img src={builderData?.logo_image} width={80} height={80} />
            </div>
            <div className='flex-1'>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                {builderData?.name}
              </h1>
              {/* <div className='flex items-center space-x-4 mb-4'> */}
              {/* <div className='flex items-center space-x-1'>
                  <Star className='h-5 w-5 text-yellow-400 fill-current' />
                  <span className='font-semibold'>{builderData?.rating}</span>
                </div> */}
              {/* <span className='text-gray-400'>•</span>
                <span className='text-gray-600'>
                  Est. {builderData?.established}
                </span> */}
              {/* <span className='text-gray-400'>•</span>
                <span className='text-gray-600'>
                  {builderData?.headquarters}
                </span> */}
              {/* </div> */}
              <p className='text-gray-600 leading-relaxed mb-6'>
                {builderData?.description}
              </p>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='text-center p-4 bg-blue-50 rounded-lg'>
                  <div className='text-sm text-gray-600'>Registered Since</div>
                  <div className='text-2xl font-bold text-blue-600'>
                    {builderData?.registered_since
                      ? new Date(builderData?.registered_since).getFullYear()
                      : ''}
                  </div>
                </div>
                <div className='text-center p-4 bg-green-50 rounded-lg'>
                  <div className='text-sm text-gray-600'>
                    Callback Time(Working Hours)
                  </div>
                  <div className='text-2xl font-bold text-green-600'>
                    {builderData?.callback_time} mins
                  </div>
                </div>
                <div className='text-center p-4 bg-yellow-50 rounded-lg'>
                  <div className='text-sm text-gray-600'>Head Office</div>

                  <div className='text-2xl font-bold text-yellow-600'>
                    Bangalore
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects by this Builder */}
        <div>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            Projects by {builderData?.name}
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {builderData?.projects?.map((project: any, index: any) => (
              <Link
                href={`/project/${project.id}`}
                key={index}
                className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer'
              >
                <div className='relative'>
                  <img
                    src={project.hero_image}
                    alt={project.name}
                    className='w-full h-48 object-cover'
                  />
                  <div className='absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold'>
                    Callback in {project.callback_time} mins
                  </div>
                </div>

                <div className='p-4'>
                  <h3 className='font-bold text-gray-900 mb-2'>
                    {project.name}
                  </h3>
                  <div className='flex items-center space-x-1 mb-3'>
                    <MapPin className='h-4 w-4 text-gray-400' />
                    <span className='text-sm text-gray-600'>
                      {project.location_address}
                    </span>
                  </div>

                  <div className='space-y-3 mb-4'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600 text-sm'>
                        Staring From
                      </span>
                      <span className='font-semibold text-xs'>
                        {project.price_starting_from}
                      </span>
                    </div>
                    <div className='flex flex-wrap gap-1 mb-3'>
                      {project?.unit_types?.map((type: string) => (
                        <span
                          key={type}
                          className='bg-[#c7a63d]/10 text-[#c7a63d] px-2 py-1 rounded-lg text-xs font-semibold border border-[#c7a63d]/30'
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuilderDetailsPage;
