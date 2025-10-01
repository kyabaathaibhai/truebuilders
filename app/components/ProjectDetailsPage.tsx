'use client';
import { ProjectService } from '@lib/ProjectService';
import Logo from 'assets/Logo';
import { MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import OTPVerificationModal from './OtpVerificationModal';
import Loader from './Loader';
import { event } from '@lib/gtag';
import { OtpService } from '@lib/OtpService';

export default function ProjectDetailsPage({ projectId }) {
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [showVerificationModal, setShowVerificationModal] =
    useState<boolean>(false);
  async function fetchBuilderDetails() {
    try {
      const list = await ProjectService.getProjectDetails(projectId);
      setProjectData(list.data);
    } catch (err) {
      setProjectData(null);
    }
  }

  const requestOTP = async () => {
    try {
      if (!phoneNumber.trim()) {
        setError('Please enter your phone number');
        return;
      }
      const phoneRegex = /^[+]?[0-9]{10,13}$/;
      if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
        setError('Please enter a valid phone number');
        return;
      }
      setLoading(true);
      let payload = {
        name: '',
        phone_number: phoneNumber,
        project_id: projectId,
      };
      const response = await OtpService.requestOtp(payload);
      setError('');
      setShowVerificationModal((prev) => !prev);
    } catch (error) {
      setError(
        error.message ||
          'Network error. Please check your connection and try again.'
      );
    } finally {
      event({
        action: 'get_callback_project_cta_clicked',
        project_id: projectId,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) fetchBuilderDetails();
  }, [projectId]);

  if (!projectData) {
    return <Loader />;
  }

  return (
    <>
      <div className='min-h-screen bg-white'>
        {/* Header */}
        <header className='bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
              <div className='flex items-center'>
                <Link
                  className='mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2'
                  href='/'
                >
                  {' '}
                  <Logo />
                  <span className='text-2xl font-bold text-gray-900'>
                    TrueBuilders
                  </span>{' '}
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Project Gallery */}
        <div className='relative'>
          <Image
            src={projectData?.hero_section?.heroImage}
            alt={`${projectData.name}`}
            className={`w-full object-cover h-96`}
            height={100}
            width={100}
            unoptimized
          />
        </div>

        {/* Project Details */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-2'>
              <div className='flex items-start justify-between mb-6'>
                <div>
                  <div className='flex gap-2 items-center'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                      {projectData?.name}
                    </h1>
                    <div className='bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold'>
                      Callback in {projectData?.callback_time} mins
                    </div>
                  </div>

                  <p className='text-base text-gray-700 mb-3'>
                    By{' '}
                    <Link
                      href={`/builder/${projectData?.builder_id}`}
                      className='font-semibold text-indigo-600 hover:text-indigo-500 transition-colors'
                    >
                      {projectData?.builder_name}
                    </Link>
                  </p>
                  <div className='flex items-center space-x-4 text-sm text-gray-500 mb-4'>
                    <div className='flex items-center space-x-1'>
                      <MapPin className='h-4 w-4' />
                      <span>{projectData?.location_address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>About</h2>
                <p className='text-gray-600 leading-relaxed'>
                  {projectData.description}
                </p>
              </div>

              {/* Nearby Locations */}
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  Nearby Locations
                </h2>
                <div className='space-y-3'>
                  {projectData?.location_advantage?.locationAdvantages?.map(
                    (location: any, index: any) => (
                      <div
                        key={index}
                        className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                      >
                        <span className='text-gray-700'>
                          {location.landmark}
                        </span>
                        <div className='text-sm font-semibold text-gray-900'>
                          {location.distance}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-1 flex flex-col gap-4 items-left'>
              <div className='bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4'>
                <div className='relative'>
                  <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <input
                    type='tel'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder='98765 43210'
                    className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
                {error && (
                  <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm'>
                    {error}
                  </div>
                )}
                <button
                  className='w-full text-lg font-medium google-signin-button text-white items-center justify-center rounded-full py-2 relative z-10 transition-all duration-300 h:12 md:h-16 px-10'
                  onClick={() => {
                    requestOTP();
                  }}
                  disabled={loading}
                >
                  Get Callback from Builder
                </button>
              </div>
              <div className='bg-white border border-gray-200 rounded-xl p-6'>
                <div className='text-3xl font-bold text-gray-900 mb-6'>
                  {projectData?.project_snapshot?.price_starting_from}
                </div>

                <div className='flex justify-between mb-6 gap-3 text-right'>
                  <span className='text-gray-600'>Possession</span>
                  <span className='font-semibold text-sm'>
                    {projectData?.project_snapshot?.possession || 'NA'}
                  </span>
                </div>
                <div className='flex justify-between mb-6 gap-3 text-right'>
                  <span className='text-gray-600'>Stage</span>
                  <span className='font-semibold text-sm'>
                    {projectData?.project_snapshot?.stage || 'NA'}
                  </span>
                </div>
                <div className='flex justify-between mb-6 gap-3 ext-right'>
                  <span className='text-gray-600'>Rera Status</span>
                  <span className='font-semibold text-sm'>
                    {projectData?.project_snapshot?.rera_status || 'NA'}
                  </span>
                </div>
                <div className='flex justify-between mb-6 gap-3 ext-right'>
                  <span className='text-gray-600 w-1/2'>Configuration</span>
                  <div className='flex flex-wrap gap-1 mb-3 justify-end'>
                    {projectData?.unit_types?.map((type: string) => (
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
              <div className='bg-white border border-gray-200 rounded-xl p-6 h-[300px] relative'>
                <iframe
                  title='Google Map'
                  src={
                    projectData?.location_advantage?.map_url + '&output=embed'
                  }
                  width='100%'
                  height='100%'
                  style={{ border: 0, pointerEvents: 'none' }}
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                ></iframe>
                <div
                  className='absolute inset-0 cursor-pointer'
                  title='Open in Google Maps'
                  onClick={() =>
                    window.open(
                      projectData?.location_advantage?.map_url,
                      '_blank'
                    )
                  }
                  style={{ background: 'rgba(0,0,0,0)', zIndex: 2 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showVerificationModal && (
        <OTPVerificationModal
          isOpen={showVerificationModal}
          onClose={() => setShowVerificationModal((prev) => !prev)}
          title='Get Callback for'
          subtitle={projectData?.name}
          callBackTime={projectData?.callback_time}
          projectId={projectData?.id}
          phoneNumber={phoneNumber}
        />
      )}
    </>
  );
}
