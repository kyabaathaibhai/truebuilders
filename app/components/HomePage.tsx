'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  Phone,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  Award,
  Shield,
} from 'lucide-react';
import Logo from 'assets/Logo';
import Link from 'next/link';
import { BuilderService } from '@lib/BuilderService';
import Image from 'next/image';
import { ProjectService } from '@lib/ProjectService';
import Autocomplete from 'react-autocomplete';
import { useRouter } from 'next/navigation';
import OTPVerificationModal from './OtpVerificationModal';
import Loader from './Loader';

function HomePage() {
  const router = useRouter();
  const [builderData, setBuilderData] = useState<any>([]);
  const [projectData, setProjectData] = useState<any>([]);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [autocompleteData, setAutocompleteData] = useState<any>([]);
  const [value, setValue] = useState<any>('');

  async function fetchBuilderList() {
    try {
      const list = await BuilderService.getBuildersList();
      setBuilderData(list.data);
      console.log({ list });
    } catch (err) {
      setBuilderData([]);
    }
  }

  async function fetchProjectList() {
    try {
      const list = await ProjectService.getProjectsList();
      setProjectData(list.data);
      console.log({ list });
    } catch (err) {
      setProjectData([]);
    }
  }

  // Combine builder and project data for autocomplete
  useEffect(() => {
    const combinedData: any = [];
    // Add builders to autocomplete data
    if (builderData?.length > 0) {
      builderData.forEach((builder: any) => {
        combinedData.push({
          id: builder.id,
          label: builder.name,
          type: 'builder',
          subtitle: builder.tagline || 'Builder',
          data: builder,
        });
      });
    }

    // Add projects to autocomplete data
    if (projectData?.length > 0) {
      projectData.forEach((project: any) => {
        combinedData.push({
          id: project.id,
          label: project.name,
          type: 'project',
          subtitle: project.location_address || 'Project',
          data: project,
        });
      });
    }

    // Sort alphabetically by label
    combinedData.sort((a, b) => a.label.localeCompare(b.label));

    setAutocompleteData(combinedData);
  }, [builderData, projectData]);

  useEffect(() => {
    fetchBuilderList();
    fetchProjectList();
  }, []);

  const handleAutocompleteSelect = (selectedValue: any, item: any) => {
    if (!item || !item.id) return; // safeguard

    setValue(selectedValue);

    if (item.type === 'builder') {
      router.push(`/builder/${item.id}`);
    } else if (item.type === 'project') {
      router.push(`/project/${item.id}`);
    }
  };

  const filterAutocompleteItems = (items, value) => {
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(value.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleVerificationModal = () => {
    setShowVerificationModal((prev) => !prev);
  };

  if (builderData.length === 0 && projectData.length === 0) {
    return <Loader />;
  }

  // Home Page (existing code)
  return (
    <>
      {' '}
      <div className='min-h-screen bg-white'>
        {/* Header */}
        <header className='bg-white shadow-sm border-b border-gray-100'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
              <div className='flex items-center'>
                <Logo />
                <span className='text-2xl font-bold text-gray-900'>
                  TrueBuilders
                </span>
              </div>
              <nav className='hidden md:flex space-x-8'>
                <a
                  href='#builders'
                  className='text-gray-700 hover:text-blue-600 transition-colors'
                >
                  Builders
                </a>
                <a
                  href='#projects'
                  className='text-gray-700 hover:text-blue-600 transition-colors'
                >
                  Projects
                </a>
                <a
                  href='#about'
                  className='text-gray-700 hover:text-blue-600 transition-colors'
                >
                  About
                </a>
                <a
                  href='#contact'
                  className='text-gray-700 hover:text-blue-600 transition-colors'
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className='bg-[#f5f5f7] relative pt-16 pb-24 min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden relative'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[100]'>
            <div className='text-center'>
              <h1 className='text-4xl sm:text-6xl font-black text-center text-balance text-carbon-800'>
                <span className='inline'>Connect Directly with</span>
                <span className='bg-gradient-to-r from-[#9964FF] to-[#4323FC] text-transparent bg-clip-text inline h-auto'>
                  {' '}
                  Builders
                </span>
                <br />
                <span className='inline text-2xl sm:text-5xl'> in 30mins</span>
              </h1>
              <p className='text-md sm:text-lg text-carbon-750 text-center max-w-3xl mx-auto my-4 font-normal'>
                Skip broker commission. Get instant callbacks directly from real
                estate developers.
              </p>

              {/* Search Bar */}
              <div className='max-w-4xl mx-auto mb-12'>
                <div className='bg-white rounded-2xl shadow-xl p-6 border border-gray-100'>
                  <div className='flex flex-col md:flex-row gap-4'>
                    <div className='flex-1 relative'>
                      <div className='relative'>
                        <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10' />
                        <Autocomplete
                          getItemValue={(item) => item.label}
                          items={filterAutocompleteItems(
                            autocompleteData,
                            value
                          )}
                          renderItem={(item, isHighlighted) => (
                            <div
                              key={`${item.type}-${item.id}`}
                              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                                isHighlighted ? 'bg-blue-50' : 'bg-white'
                              } hover:bg-blue-50`}
                            >
                              <div className='flex items-center justify-between'>
                                <div>
                                  <div className='font-semibold text-gray-900 text-left'>
                                    {item.label}
                                  </div>
                                  <div className='text-sm text-gray-600 text-left'>
                                    {item.subtitle}
                                  </div>
                                </div>
                                <div
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    item.type === 'builder'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-green-100 text-green-800'
                                  }`}
                                >
                                  {item.type === 'builder'
                                    ? 'Builder'
                                    : 'Project'}
                                </div>
                              </div>
                            </div>
                          )}
                          renderMenu={(items, value, style) => {
                            return items.length > 0 || value ? (
                              <div
                                className='absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto z-50 mt-1'
                                style={{ top: '100%' }}
                              >
                                {items.length === 0 && value ? (
                                  <div className='p-4 text-gray-500 text-center'>
                                    No results found for "{value}"
                                  </div>
                                ) : (
                                  items
                                )}
                              </div>
                            ) : null;
                          }}
                          wrapperStyle={{
                            position: 'relative',
                            display: 'block',
                            width: '100%',
                          }}
                          wrapperProps={{
                            className: 'relative w-full',
                          }}
                          inputProps={{
                            placeholder:
                              'Search for builders or projects (e.g., Prestige, Godrej Properties)',
                            className:
                              'w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                          }}
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          onSelect={handleAutocompleteSelect}
                          menuStyle={{}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
                <div className='flex items-center justify-center space-x-3 text-black'>
                  <Clock className='h-8 w-8 text-green-400' />
                  <div className='text-left'>
                    <div className='font-bold '>30 Minutes</div>
                    <div className=''>Callback Guarantee</div>
                  </div>
                </div>
                <div className='flex items-center justify-center space-x-3'>
                  <Shield className='h-8 w-8 text-blue-200' />
                  <div className='text-left'>
                    <div className='font-bold '>100% Direct</div>
                    <div className=''>No Middlemen</div>
                  </div>
                </div>
                <div className='flex items-center justify-center space-x-3'>
                  <Award className='h-8 w-8 text-yellow-400' />
                  <div className='text-left'>
                    <div className='font-bold '>Best Rates</div>
                    <div className=''>Guaranteed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='absolute inset-0 top-0 md:-top-[200px] blur-[48px] z-0 '>
            <svg
              viewBox='0 0 1440 914'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g className=''>
                <path
                  d='M1553 338.047C1553 338.047 1291.94 304.49 1128.5 338.047C959.847 372.675 718.093 344.881 562.5 258.9C492.929 220.455 303.804 171.521 126.208 137.815C-37.5648 106.732 -145 137.815 -145 137.815V746.5C-145 746.5 291.445 696.279 623 696.279C954.555 696.279 1553 789.974 1553 789.974V338.047Z'
                  fill='url(#paint0_linear_45_104)'
                  fill-opacity='0.2'
                ></path>
              </g>
              <g className=''>
                <path
                  d='M-114 240.047C-114 240.047 147.061 206.49 310.5 240.047C479.153 274.675 720.907 346.881 876.5 260.9C946.071 222.455 1135.2 173.521 1312.79 139.815C1476.56 108.732 1584 139.815 1584 139.815V566.5C1584 566.5 1147.56 698.279 816 698.279C484.445 698.279 -91.5 590.5 -91.5 590.5L-114 240.047Z'
                  fill='url(#paint1_linear_45_104)'
                  fill-opacity='0.2'
                ></path>
              </g>
              <g className=''>
                <path
                  d='M484 285C484 384.291 403.411 464.782 304 464.782C204.589 464.782 124 384.291 124 285C124 185.71 243.724 124 343.135 124C442.546 124 484 185.71 484 285Z'
                  fill='#FACC15'
                  fill-opacity='0.12'
                ></path>
              </g>
              <defs>
                <linearGradient
                  id='paint0_linear_45_104'
                  x1='1553'
                  y1='521.652'
                  x2='-145'
                  y2='521.652'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop offset='0.595' stop-color='#3F20FB'></stop>
                  <stop offset='1' stop-color='#B377FF'></stop>
                </linearGradient>
                <linearGradient
                  id='paint1_linear_45_104'
                  x1='-114'
                  y1='523.652'
                  x2='1584'
                  y2='523.652'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#3F20FB'></stop>
                  <stop offset='0.385' stop-color='#B377FF'></stop>
                </linearGradient>
              </defs>
            </svg>
          </div> */}
        </section>

        {/* Top Builders Section */}
        <section id='builders' className='py-16 bg-gray-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Top Builders in India
              </h2>
              <p className='text-xl text-gray-600'>
                Connect directly with India's most trusted real estate
                developers
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {builderData?.length > 0 &&
                builderData.slice(0, 8)?.map((builder: any, index: number) => (
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
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id='projects' className='py-16 bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Top Projects
              </h2>
              <p className='text-xl text-gray-600'>
                Premium residential projects with instant builder connection
              </p>
            </div>

            {projectData?.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {projectData
                  ?.slice(0, 8)
                  ?.map((project: any, index: number) => (
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
            ) : (
              <Loader />
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className='py-16 bg-blue-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Why Choose TrueBuilders?
              </h2>
              <p className='text-xl text-gray-600'>
                Direct access to builders means better deals for you
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {[
                {
                  icon: Shield,
                  title: 'No Hidden Fees',
                  desc: 'Direct builder rates with complete transparency',
                },
                {
                  icon: Clock,
                  title: 'Instant Response',
                  desc: 'Get callbacks within 30 minutes guaranteed',
                },
                {
                  icon: Users,
                  title: 'Expert Support',
                  desc: 'Dedicated relationship managers for each deal',
                },
                {
                  icon: CheckCircle,
                  title: 'Verified Projects',
                  desc: 'All projects verified and RERA approved',
                },
              ].map((feature, index) => (
                <div key={index} className='text-center'>
                  <div className='bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg'>
                    <feature.icon className='h-8 w-8 text-blue-600 mx-auto' />
                  </div>
                  <h3 className='font-bold text-gray-900 mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600'>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'>
          <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold text-white mb-4'>
              Still confused?
            </h2>
            <p className='text-xl text-blue-100 mb-8'>
              Get callback from TrueBuilders to help you out
            </p>
            <button
              onClick={() => handleVerificationModal()}
              className='bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg'
            >
              Start Your Search Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className='bg-gray-900 text-white py-12'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
              <div>
                <div className='flex items-center mb-4'>
                  <Logo />
                  <span className='text-2xl font-bold'>TrueBuilders</span>
                </div>
                <p className='text-gray-400'>
                  Connecting homebuyers directly with India's top real estate
                  developers for transparent and best-rate deals.
                </p>
              </div>
              <div>
                <h4 className='font-bold mb-4'>Quick Links</h4>
                <ul className='space-y-2 text-gray-400'>
                  <li>
                    <a href='#' className='hover:text-white'>
                      Home
                    </a>
                  </li>
                  <li>
                    <a href='#builders' className='hover:text-white'>
                      Builders
                    </a>
                  </li>
                  <li>
                    <a href='#projects' className='hover:text-white'>
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:text-white'>
                      About Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-bold mb-4'>Top Cities</h4>
                <ul className='space-y-2 text-gray-400'>
                  <li>
                    <a href='#' className='hover:text-white'>
                      Mumbai
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:text-white'>
                      Delhi NCR
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:text-white'>
                      Bangalore
                    </a>
                  </li>
                  <li>
                    <a href='#' className='hover:text-white'>
                      Pune
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-bold mb-4'>Contact Info</h4>
                <ul className='space-y-2 text-gray-400'>
                  <li>📧 hello@TrueBuilders.com</li>
                  <li>📞 +91 98765 43210</li>
                  <li>📍 Bangalore, India</li>
                </ul>
              </div>
            </div>
            <div className='border-t border-gray-700 mt-8 pt-8 text-center text-gray-400'>
              <p>&copy; 2025 TrueBuilders. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
      {showVerificationModal && (
        <OTPVerificationModal
          isOpen={showVerificationModal}
          onClose={handleVerificationModal}
        />
      )}
    </>
  );
}

export default HomePage;
