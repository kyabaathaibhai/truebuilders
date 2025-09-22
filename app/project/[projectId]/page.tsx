import { topProjects } from '@lib/data/mockData';
import Logo from 'assets/Logo';
import {
  ArrowLeft,
  Car,
  Dumbbell,
  Eye,
  Heart,
  Home,
  MapPin,
  ShoppingBag,
  Star,
  TreePine,
  Users,
  Waves,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Export viewport separately
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = await params;
  const { projectId } = resolvedParams;

  const selectedProject: any = topProjects.find(
    (builder) => builder.id === projectId
  );

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'swimming pool':
        return <Waves className='h-4 w-4' />;
      case 'gym':
        return <Dumbbell className='h-4 w-4' />;
      case 'parking':
        return <Car className='h-4 w-4' />;
      case 'kids play area':
        return <Users className='h-4 w-4' />;
      case 'landscaped gardens':
      case 'garden':
        return <TreePine className='h-4 w-4' />;
      case 'shopping mall':
      case 'market':
        return <ShoppingBag className='h-4 w-4' />;
      default:
        return <Home className='h-4 w-4' />;
    }
  };
  return (
    <>
      <div className='min-h-screen bg-white'>
        {/* Header */}
        <header className='bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40'>
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

        {/* Project Gallery */}
        <div className='relative'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-4 max-w-7xl mx-auto'>
            {selectedProject.gallery.map((image, index) => (
              <div
                key={index}
                className={`relative ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${selectedProject.name} ${index + 1}`}
                  className={`w-full object-cover rounded-lg ${
                    index === 0 ? 'h-96' : 'h-48'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-2'>
              <div className='flex items-start justify-between mb-6'>
                <div>
                  <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                    {selectedProject.name}
                  </h1>
                  <p className='text-lg text-gray-600 mb-2'>
                    by {selectedProject.builder}
                  </p>
                  <div className='flex items-center space-x-4 text-sm text-gray-500 mb-4'>
                    <div className='flex items-center space-x-1'>
                      <MapPin className='h-4 w-4' />
                      <span>{selectedProject.location}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Eye className='h-4 w-4' />
                      <span>{selectedProject.views}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Heart className='h-4 w-4' />
                      <span>{selectedProject.likes}</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-1 mb-4'>
                    <Star className='h-5 w-5 text-yellow-400 fill-current' />
                    <span className='font-semibold'>
                      {selectedProject.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>About</h2>
                <p className='text-gray-600 leading-relaxed'>
                  {selectedProject.description}
                </p>
              </div>

              {/* Amenities */}
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  Amenities
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {selectedProject.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className='flex items-center space-x-2 p-3 bg-gray-50 rounded-lg'
                    >
                      {getAmenityIcon(amenity)}
                      <span className='text-sm text-gray-700'>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Locations */}
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  Nearby Locations
                </h2>
                <div className='space-y-3'>
                  {selectedProject.nearbyLocations.map((location, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                    >
                      <span className='text-gray-700'>{location.name}</span>
                      <div className='text-right'>
                        <div className='text-sm font-semibold text-gray-900'>
                          {location.distance}
                        </div>
                        <div className='text-xs text-gray-500'>
                          {location.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-1'>
              <div className='bg-white border border-gray-200 rounded-xl p-6 sticky top-24'>
                <div className='mb-6'>
                  <div className='text-3xl font-bold text-gray-900 mb-2'>
                    {selectedProject.price}
                  </div>
                  <div className='text-gray-600 mb-1'>
                    onwards ({selectedProject.area})
                  </div>
                  <div className='text-sm text-gray-500'>
                    EMI starts from {selectedProject.emiStarts}
                  </div>
                </div>

                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Configuration</span>
                    <span className='font-semibold'>
                      {selectedProject.type}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Possession</span>
                    <span className='font-semibold'>
                      {selectedProject.possession}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>
                      Callback Time(Working Hours)
                    </span>
                    <span className='font-semibold text-green-600'>
                      {selectedProject.callbackTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
