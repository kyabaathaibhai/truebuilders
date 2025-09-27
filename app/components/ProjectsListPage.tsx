'use client';

import { useEffect, useState } from 'react';
import { ProjectService } from '@lib/ProjectService';
import Loader from './Loader';
import Link from 'next/link';
import Logo from 'assets/Logo';
import { MapPin, Calendar, Home } from 'lucide-react';

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProjects() {
    try {
      setLoading(true);
      const response = await ProjectService.getProjectsList();
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
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
                className='px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700'
              >
                Projects
              </Link>
              <Link
                href='/builders'
                className='px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100'
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
          <h1 className='text-3xl font-bold text-gray-900'>All Projects</h1>
          <p className='mt-2 text-gray-600'>
            Browse all available construction projects
          </p>
        </div>

        {projects.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>No projects found</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {projects.map((project, index) => (
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

                <div className='p-6'>
                  <h3 className='font-bold text-gray-900 mb-2'>
                    {project.name}
                  </h3>
                  {/* <p className='text-sm text-gray-600 mb-2'>
                  by {project.builder}
                </p> */}

                  <div className='flex items-center space-x-1 mb-3'>
                    <MapPin className='h-4 w-4 text-gray-400' />
                    <span className='text-sm text-gray-600'>
                      {project.location_address}
                    </span>
                  </div>

                  <div className='space-y-2 mb-2'>
                    <div className='flex justify-between mb-4'>
                      <span className='text-gray-600 text-sm'>
                        Staring From
                      </span>
                      <span className='font-semibold text-sm'>
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
        )}
      </main>
    </div>
  );
}
