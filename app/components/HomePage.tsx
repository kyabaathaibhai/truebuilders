'use client';

import { useState } from 'react';
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
import {
  Builder,
  Project,
  topBuilders,
  topProjects,
  ViewType,
} from '@lib/data/mockData';
import Link from 'next/link';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedBuilder, setSelectedBuilder] = useState<any>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [builderData, setBuilderData] = useState<Builder[]>(topBuilders);

  // Populate builders with their projects
  topBuilders.forEach((builder) => {
    builder.projectsList = topProjects.filter(
      (project) => project.builderId === builder.id
    );
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowLeadForm(true);
    }
  };

  const handleLeadSubmit = () => {
    if (phoneNumber.trim()) {
      alert(
        `Lead submitted! You'll get a callback in ${
          selectedProject?.callbackTime ||
          selectedBuilder?.callbackTime ||
          '20 mins'
        }`
      );
      setShowLeadForm(false);
      setPhoneNumber('');
      setSearchQuery('');
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project-detail');
  };

  // Home Page (existing code)
  return (
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
      <section className='relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 pt-16 pb-24 min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 leading-tight'>
              Connect Directly with
              <span className='text-yellow-300'> Builders</span>
              <br />
              <span className='text-white'>for Best Rates</span>
            </h1>
            <p className='text-xl text-blue-100 mb-8 max-w-3xl mx-auto'>
              Skip the middlemen. Get instant callbacks from top real estate
              developers in India within 30 minutes. Find your dream home with
              exclusive deals and transparent pricing.
            </p>

            {/* Search Bar */}
            <div className='max-w-4xl mx-auto mb-12'>
              <div className='bg-white rounded-2xl shadow-xl p-6 border border-gray-100'>
                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='flex-1 relative'>
                    <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                    <input
                      type='text'
                      placeholder='Search for builders or projects (e.g., DLF Camelias, Godrej Properties)'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className='w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  >
                    Get Instant Callback
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
              <div className='flex items-center justify-center space-x-3'>
                <Clock className='h-8 w-8 text-green-400' />
                <div className='text-left'>
                  <div className='font-bold text-white'>30 Minutes</div>
                  <div className='text-blue-100'>Callback Guarantee</div>
                </div>
              </div>
              <div className='flex items-center justify-center space-x-3'>
                <Shield className='h-8 w-8 text-blue-200' />
                <div className='text-left'>
                  <div className='font-bold text-white'>100% Direct</div>
                  <div className='text-blue-100'>No Middlemen</div>
                </div>
              </div>
              <div className='flex items-center justify-center space-x-3'>
                <Award className='h-8 w-8 text-yellow-400' />
                <div className='text-left'>
                  <div className='font-bold text-white'>Best Rates</div>
                  <div className='text-blue-100'>Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Modal */}
      {showLeadForm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl p-8 max-w-md w-full'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              Get Instant Callback
            </h3>
            <p className='text-gray-600 mb-6'>
              Enter your phone number to connect with builders for "
              {searchQuery}"
            </p>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Phone Number
                </label>
                <div className='relative'>
                  <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <input
                    type='tel'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder='+91 98765 43210'
                    className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
              <div className='flex space-x-3'>
                <button
                  onClick={() => setShowLeadForm(false)}
                  className='flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={handleLeadSubmit}
                  className='flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors'
                >
                  Submit Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Builders Section */}
      <section id='builders' className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Top Builders in India
            </h2>
            <p className='text-xl text-gray-600'>
              Connect directly with India's most trusted real estate developers
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {builderData?.length > 0 &&
              builderData.map((builder, index) => (
                <Link key={builder.id} href={`/builder/${builder.id}`}>
                  <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer'>
                    <div className='relative'>
                      <img
                        src={builder.image}
                        alt={builder.name}
                        className='w-full h-48 object-cover rounded-t-xl'
                      />
                    </div>

                    <div className='space-y-2 mb-4 p-6'>
                      <span className='font-semibold'>{builder.name}</span>
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

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {topProjects.map((project, index) => (
              <Link
                href={`/project/${project.id}`}
                key={index}
                className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer'
                onClick={() => handleProjectClick(project)}
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
                  <p className='text-sm text-gray-600 mb-2'>
                    by {project.builder}
                  </p>

                  <div className='flex items-center space-x-1 mb-3'>
                    <MapPin className='h-4 w-4 text-gray-400' />
                    <span className='text-sm text-gray-600'>
                      {project.location}
                    </span>
                  </div>

                  <div className='space-y-2 mb-4'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600 text-sm'>Price Range</span>
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
              </Link>
            ))}
          </div>
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
            Ready to Find Your Dream Home?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Connect with India's top builders and get exclusive deals with
            guaranteed callbacks in 30 minutes
          </p>
          <button
            onClick={() => setShowLeadForm(true)}
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
  );
}

export default HomePage;
