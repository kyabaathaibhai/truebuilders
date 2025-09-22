import Logo from 'assets/Logo';
import { ArrowLeft, MapPin, Star } from 'lucide-react';
import { topBuilders } from '@lib/data/mockData';
import React from 'react';
import Link from 'next/link';

// Export viewport separately
export default async function BuilderDetailPage({
  params,
}: {
  params: Promise<{ builderId: string }>;
}) {
  const resolvedParams = await params;
  const { builderId } = resolvedParams;

  const selectedBuilder: any = topBuilders.find(
    (builder) => builder.id === builderId
  );

  return (
    <>
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
              <div className='text-6xl'>{selectedBuilder.logo}</div>
              <div className='flex-1'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                  {selectedBuilder.name}
                </h1>
                <div className='flex items-center space-x-4 mb-4'>
                  <div className='flex items-center space-x-1'>
                    <Star className='h-5 w-5 text-yellow-400 fill-current' />
                    <span className='font-semibold'>
                      {selectedBuilder.rating}
                    </span>
                  </div>
                  <span className='text-gray-400'>•</span>
                  <span className='text-gray-600'>
                    Est. {selectedBuilder.established}
                  </span>
                  <span className='text-gray-400'>•</span>
                  <span className='text-gray-600'>
                    {selectedBuilder.headquarters}
                  </span>
                </div>
                <p className='text-gray-600 leading-relaxed mb-6'>
                  {selectedBuilder.description}
                </p>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div className='text-center p-4 bg-blue-50 rounded-lg'>
                    <div className='text-2xl font-bold text-blue-600'>
                      {selectedBuilder.totalProjects}
                    </div>
                    <div className='text-sm text-gray-600'>Total Projects</div>
                  </div>
                  <div className='text-center p-4 bg-green-50 rounded-lg'>
                    <div className='text-2xl font-bold text-green-600'>
                      {selectedBuilder.callbackTime}
                    </div>
                    <div className='text-sm text-gray-600'>
                      Callback Time(Working Hours)
                    </div>
                  </div>
                  <div className='text-center p-4 bg-yellow-50 rounded-lg'>
                    <div className='text-2xl font-bold text-yellow-600'>
                      {selectedBuilder.rating}/5
                    </div>
                    <div className='text-sm text-gray-600'>Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects by this Builder */}
          <div>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Projects by {selectedBuilder.name}
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {selectedBuilder.projectsList.map((project, index) => (
                <div
                  key={index}
                  className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer'
                  //   onClick={() => handleProjectClick(project)}
                >
                  <div className='relative'>
                    <img
                      src={project.image}
                      alt={project.name}
                      className='w-full h-48 object-cover'
                    />
                    <div className='absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold'>
                      {project.callbackTime}
                    </div>
                  </div>

                  <div className='p-6'>
                    <h3 className='font-bold text-gray-900 mb-2'>
                      {project.name}
                    </h3>

                    <div className='flex items-center space-x-1 mb-3'>
                      <MapPin className='h-4 w-4 text-gray-400' />
                      <span className='text-sm text-gray-600'>
                        {project.location}
                      </span>
                    </div>

                    <div className='space-y-2 mb-4'>
                      <div className='flex justify-between'>
                        <span className='text-gray-600 text-sm'>
                          Price Range
                        </span>
                        <span className='font-semibold text-sm'>
                          {project.price}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600 text-sm'>
                          Configuration
                        </span>
                        <span className='font-semibold text-sm'>
                          {project.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
