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
  User,
  MessageSquare,
} from 'lucide-react';
import Logo from 'assets/Logo';
import Link from 'next/link';
import { BuilderService } from '@lib/BuilderService';
import Image from 'next/image';
import { ProjectService } from '@lib/ProjectService';
import Autocomplete from 'react-autocomplete';
import { OtpService } from '@lib/OtpService';
import Loader from './Loader';
import OTPVerificationModal from './OtpVerificationModal';
import { event } from '@lib/gtag';

interface Props {
  isLanding?: boolean;
}

function HomePage({ isLanding = true }: Props) {
  const [builderData, setBuilderData] = useState<any>([]);
  const [projectData, setProjectData] = useState<any>([]);
  const [autocompleteData, setAutocompleteData] = useState<any>([]);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [value, setValue] = useState('');

  // Form states
  const [formStep, setFormStep] = useState<'form' | 'otp' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    projectName: '',
    project_id: -1,
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

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
    if (!item) return;
    setValue(selectedValue);
    handleInputChange('projectName', item.label);
    handleInputChange('project_id', item.id);
  };

  const filterAutocompleteItems = (items: any[], value: string) => {
    const filteredItems = items.filter(
      (item) =>
        item.label.toLowerCase().includes(value.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(value.toLowerCase())
    );

    // If user has typed something and no matches found, add custom option
    if (value.trim() && filteredItems.length === 0) {
      filteredItems.push({
        id: -1,
        label: value.trim(),
        type: 'custom',
        subtitle: 'Select this to proceed with your input',
      });
    }

    return filteredItems;
  };

  // Form handler functions
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleOTPChange = (value: string) => {
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setOtp(numericValue);
    if (error) setError(''); // Clear error when user starts typing
  };

  const requestOTP = async () => {
    setLoading(true);
    setError('');

    try {
      let payload = {
        name: formData.name,
        phone_number: formData.phoneNumber,
        project_id: formData['project_id'],
        user_input: formData.projectName,
      };

      await OtpService.requestOtp(payload);
      setFormStep('otp');
      setResendTimer(60);
      setCanResend(false);
    } catch (error: any) {
      setError(
        error.message ||
          'Network error. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle resend timer countdown
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (formStep === 'otp' && resendTimer > 0) {
      timerId = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    if (resendTimer === 0) {
      setCanResend(true);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [formStep, resendTimer]);

  const verifyOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await OtpService.verifyOtp({
        phone_number: formData.phoneNumber,
        otp: otp,
        project_id: formData['project_id'],
        user_input: formData.projectName,
      });
      event({
        action: 'otp_verified',
        project_id: formData['project_id'],
      });

      setFormStep('success');
    } catch (error: any) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!formData.phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    if (!formData['projectName'].trim()) {
      setError('Please Select any Project');
      return;
    }

    // Basic phone number validation (Indian format)
    const phoneRegex = /^[+]?[0-9]{10,13}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      setError('Please enter a valid phone number');
      return;
    }

    event({
      action: 'get_callback_cta_clicked',
      project_id: formData['project_id'],
    });

    requestOTP();
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    verifyOTP();
  };

  const resetForm = () => {
    setFormStep('form');
    setFormData({ name: '', phoneNumber: '', projectName: '', project_id: -1 });
    setOtp('');
    setError('');
    setLoading(false);
    setResendTimer(60);
    setCanResend(false);
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
              <Link href='/' className='flex items-center'>
                <Logo />
                <span className='text-2xl font-bold text-gray-900'>
                  TrueBuilders
                </span>
              </Link>
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
        <section className='bg-[#f5f5f7] relative pt-8 md:pt-16 pb-12 md:pb-24 min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden relative'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[100]'>
            <div className='flex flex-col lg:flex-row gap-4 items-center'>
              <div className='text-center lg:text-left flex-1 lg:flex-[3] w-full'>
                {isLanding ? (
                  <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black text-center lg:text-left text-balance text-carbon-800'>
                    <span className='block leading-[1.3]'>Still paying</span>
                    <span className='bg-gradient-to-r from-[#9964FF] to-[#4323FC] text-transparent bg-clip-text inline h-auto'>
                      {' '}
                      5% premium
                      <span className='inline text-black'> to brokers?</span>
                    </span>
                  </h1>
                ) : (
                  <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black text-center lg:text-left text-balance text-carbon-800'>
                    <span className='inline leading-[1.3]'>
                      Not able to connect
                    </span>
                    <span className=' inline h-auto text-black'>
                      {' '}
                      directly with
                      <span className='inline  bg-gradient-to-r from-[#9964FF] to-[#4323FC] text-transparent bg-clip-text'>
                        {' '}
                        builder?
                      </span>
                    </span>
                  </h1>
                )}
                <h2 className='text-2xl sm:text-3xl font-bold text-carbon-800 text-center lg:text-left my-4'>
                  {isLanding === true
                    ? 'Save upto 40lacs in brokerage'
                    : 'Get callback from official builders team'}
                </h2>
                <p className='text-md sm:text-lg text-carbon-750 text-center lg:text-left my-4 font-normal'>
                  Skip broker commission. Get instant callbacks directly from
                  real estate developers.
                </p>

                {/* Trust Indicators as Chips */}
                <div className='flex flex-wrap justify-start gap-3 justify-center md:justify-start'>
                  <div className='flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full'>
                    <Shield className='h-5 w-5' />
                    <span className='font-medium text-xs md:text-sm'>
                      Zero data sharing
                    </span>
                  </div>
                  <div className='flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full'>
                    <Award className='h-5 w-5' />
                    <span className='font-medium text-xs md:text-sm'>
                      GDPR compliant
                    </span>
                  </div>
                  <div className='flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full'>
                    <Users className='h-5 w-5' />
                    <span className='font-medium text-xs md:text-sm'>
                      No brokers in the loop
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form with Steps */}
              <div className='bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md mx-auto lg:max-w-none w-full lg:flex-[2] mt-8 lg:mt-0'>
                {/* Form Step */}
                {formStep === 'form' && (
                  <>
                    <h2 className='text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center'>
                      Get callback from builder in <br />
                      30mins
                    </h2>

                    <form onSubmit={handleFormSubmit} className='space-y-6'>
                      {error && (
                        <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm'>
                          {error}
                        </div>
                      )}

                      <div>
                        <div className='relative'>
                          <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                          <input
                            type='text'
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange('name', e.target.value)
                            }
                            placeholder='Your Full Name'
                            className='w-full pl-10 pr-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                            disabled={loading}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <div className='relative'>
                          <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                          <input
                            type='tel'
                            value={formData.phoneNumber}
                            onChange={(e) =>
                              handleInputChange('phoneNumber', e.target.value)
                            }
                            placeholder='Your Phone Number'
                            className='w-full pl-10 pr-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                            disabled={loading}
                            required
                          />
                        </div>
                      </div>

                      {isLanding === false ? (
                        <div className='relative'>
                          <div className='relative'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                            <input
                              type='text'
                              value={formData.projectName}
                              onChange={(e) =>
                                handleInputChange('projectName', e.target.value)
                              }
                              placeholder='Project Name (e.g., Godrej Splendour)'
                              className='w-full pl-10 pr-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                              disabled={loading}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className='flex flex-col md:flex-row gap-4'>
                          <div className='flex-1 relative'>
                            <div className='relative'>
                              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10' />
                              <Autocomplete
                                getItemValue={(item: any) => item.label}
                                items={filterAutocompleteItems(
                                  autocompleteData,
                                  value
                                )}
                                renderItem={(
                                  item: any,
                                  isHighlighted: boolean
                                ) => (
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
                                            : item.type === 'project'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800' // Custom option styling
                                        }`}
                                      >
                                        {item.type === 'builder'
                                          ? 'Builder'
                                          : item.type === 'project'
                                          ? 'Project'
                                          : 'Custom'}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                renderMenu={(items, value, style) => {
                                  if (!value && items.length === 0) return null;

                                  return (
                                    <div
                                      className='absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto z-50 mt-1'
                                      style={{ top: '100%' }}
                                    >
                                      {items}
                                    </div>
                                  );
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
                                    'Search for builders or projects',
                                  className:
                                    'w-full pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                                }}
                                value={value}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setValue(e.target.value)}
                                onSelect={handleAutocompleteSelect}
                                menuStyle={{}}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 sm:py-4 px-6 rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg'
                      >
                        {loading
                          ? 'Sending OTP...'
                          : 'Get Callback from Builder'}
                      </button>
                    </form>
                  </>
                )}

                {/* OTP Step */}
                {formStep === 'otp' && (
                  <>
                    <div className='text-center mb-4 sm:mb-6'>
                      <div className='w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4'>
                        <MessageSquare className='h-6 w-6 sm:h-8 sm:w-8 text-blue-600' />
                      </div>
                      <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-2'>
                        Verify Your Phone
                      </h3>
                      <p className='text-sm sm:text-base text-gray-600'>
                        OTP has been sent on your{' '}
                        <span className='font-bold'>Whatsapp </span>number
                      </p>
                    </div>

                    <form onSubmit={handleOTPSubmit} className='space-y-4'>
                      {error && (
                        <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm'>
                          {error}
                        </div>
                      )}

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                          Enter OTP
                        </label>
                        <input
                          type='text'
                          value={otp}
                          onChange={(e) => handleOTPChange(e.target.value)}
                          placeholder='123456'
                          className='w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl sm:text-2xl font-mono tracking-widest'
                          maxLength={6}
                          disabled={loading}
                        />
                      </div>

                      <button
                        type='submit'
                        disabled={loading || otp.length !== 6}
                        className='w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                      </button>

                      <div className='text-center space-y-2 flex justify-between items-center'>
                        <button
                          type='button'
                          onClick={() => {
                            setFormStep('form');
                            setResendTimer(60);
                            setCanResend(false);
                          }}
                          className='text-blue-600 hover:text-blue-700 text-sm font-medium'
                          disabled={loading}
                        >
                          ← Back to form
                        </button>
                        <div className='flex items-center justify-center gap-2'>
                          {!canResend ? (
                            <p className='text-gray-600 text-sm'>
                              Resend OTP in{' '}
                              <span className='font-semibold'>
                                {resendTimer}s
                              </span>
                            </p>
                          ) : (
                            <button
                              type='button'
                              onClick={requestOTP}
                              className='text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center'
                              disabled={loading}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4 mr-1'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                                />
                              </svg>
                              Resend OTP
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </>
                )}

                {/* Success Step */}
                {formStep === 'success' && (
                  <div className='text-center'>
                    <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                      <CheckCircle className='h-12 w-12 text-green-600' />
                    </div>

                    <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                      Thank You!
                    </h3>

                    <p className='text-gray-600 mb-6'>
                      TrueBuilders team will get back to you in 30 minutes.
                    </p>
                    <p className='text-gray-600 mb-3 font-bold'>
                      Working hours (10am - 6pm)
                    </p>
                    <div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-6'>
                      We will contact you at{' '}
                      <span className='font-semibold'>
                        {formData.phoneNumber}
                      </span>
                    </div>
                    <button
                      onClick={resetForm}
                      className='w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors'
                    >
                      Submit Another Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id='projects' className='py-6 md:py-12 bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Top Projects
              </h2>
              <p className='text-xl text-gray-600 mb-4'>
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
            <div className='flex justify-center items-center w-full mt-6'>
              <Link
                href='/projects'
                className='inline-block px-6 py-2  bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-full transition-colors'
              >
                VIEW ALL
              </Link>
            </div>
          </div>
        </section>

        {/* Top Builders Section */}
        <section id='builders' className='py-6 md:py-12 bg-gray-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Top Builders in India
              </h2>
              <p className='text-xl text-gray-600 mb-4'>
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
            <div className='flex justify-center items-center w-full mt-6'>
              <Link
                href='/builders'
                className='inline-block px-6 py-2  bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-full transition-colors'
              >
                VIEW ALL
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className='py-6 md:py-12 bg-blue-50'>
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
          showMessageInput={true}
        />
      )}
    </>
  );
}

export default HomePage;
