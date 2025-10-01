'use client';

import { useEffect, useState } from 'react';
import { Phone, User, MessageSquare, CheckCircle, X } from 'lucide-react';
import { OtpService } from '@lib/OtpService';
import { event } from '@lib/gtag';

interface OTPVerificationModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
  projectId?: number;
  callBackTime?: number;
  showMessageInput?: boolean;
  phoneNumber?: string;
  name?: string;
}

const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title = 'Get callback from',
  projectId = 0,
  callBackTime = 30,
  subtitle = 'TrueBuilders',
  showMessageInput = false,
  phoneNumber = '',
  name = '',
}) => {
  const [step, setStep] = useState<'form' | 'otp' | 'success'>(
    phoneNumber ? 'otp' : 'form'
  );
  const [formData, setFormData] = useState({
    name: name,
    phoneNumber: phoneNumber,
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset modal state when closed
  const handleClose = () => {
    setStep('form');
    setFormData({ name: '', phoneNumber: '' });
    setOtp('');
    setError('');
    setLoading(false);
    onClose();
  };

  // API call to request OTP
  const requestOTP = async () => {
    setLoading(true);
    setError('');

    try {
      let payload = {
        name: formData.name,
        phone_number: formData.phoneNumber,
        project_id: projectId,
      };
      if (showMessageInput) payload['user_input'] = formData['user_input'];
      const response = await OtpService.requestOtp(payload);
      setStep('otp');
    } catch (error) {
      setError(
        error.message ||
          'Network error. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // API call to verify OTP
  const verifyOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await OtpService.verifyOtp({
        phone_number: formData.phoneNumber,
        otp: otp,
        project_id: projectId,
      });
      event({
        action: 'otp_verified',
        project_id: projectId,
      });

      setStep('success');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
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
    if (showMessageInput && !formData['user_input'].trim()) {
      setError('Please enter your message');
      return;
    }

    // Basic phone number validation (Indian format)
    const phoneRegex = /^[+]?[0-9]{10,13}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      setError('Please enter a valid phone number');
      return;
    }

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

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] p-4'>
      <div className='bg-white rounded-2xl p-8 max-w-2xl w-full relative'>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
        >
          <X className='h-6 w-6' />
        </button>

        {/* Form Step */}
        {step === 'form' && (
          <>
            <div className='text-center mb-6'>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>{title}</h3>
              <h2 className='text-4xl font-semibold text-gray-900 mb-2'>
                {subtitle === 'TrueBuilders' ? 'TrueBuilders Team' : subtitle}
              </h2>
              <p className='text-gray-600'>in {callBackTime}mins</p>
            </div>

            <form onSubmit={handleFormSubmit} className='space-y-4'>
              {error && (
                <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm'>
                  {error}
                </div>
              )}

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Full Name
                </label>
                <div className='relative'>
                  <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <input
                    type='text'
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder='Enter your full name'
                    className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Phone Number
                </label>
                <div className='relative'>
                  <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <input
                    type='tel'
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange('phoneNumber', e.target.value)
                    }
                    placeholder='98765 43210'
                    className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    disabled={loading}
                  />
                </div>
              </div>

              {showMessageInput && (
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Message
                  </label>
                  <div className='relative'>
                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                    <input
                      type='text'
                      value={formData['user_input']}
                      onChange={(e) =>
                        handleInputChange('user_input', e.target.value)
                      }
                      placeholder='Enter your full name'
                      className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      disabled={loading}
                    />
                  </div>
                </div>
              )}

              <button
                type='submit'
                disabled={loading}
                className='w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? 'Sending OTP...' : 'Proceed'}
              </button>
            </form>
          </>
        )}

        {/* OTP Step */}
        {step === 'otp' && (
          <>
            <div className='text-center mb-6'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <MessageSquare className='h-8 w-8 text-blue-600' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                Verify Your Phone
              </h3>
              <p className='text-gray-600'>
                We've sent a 6-digit OTP to <br />
                <span className='font-semibold'>{formData.phoneNumber}</span>
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
                  className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-mono tracking-widest'
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

              <div className='text-center'>
                <button
                  type='button'
                  onClick={() => {
                    if (phoneNumber) {
                      onClose();
                    } else {
                      setStep('form');
                    }
                  }}
                  className='text-blue-600 hover:text-blue-700 text-sm font-medium'
                  disabled={loading}
                >
                  ← Back to form
                </button>
              </div>
            </form>
          </>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className='text-center'>
            <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <CheckCircle className='h-12 w-12 text-green-600' />
            </div>

            <p className='text-gray-600 mb-6'>
              Thank you for your interest. {subtitle} team will get back to you
              in {callBackTime} minutes.
            </p>
            <p className='text-gray-600 mb-3 font-bold'>
              Working hours (10am - 6pm)
            </p>
            <div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-6'>
              We will contact you at{' '}
              <span className='font-semibold'>{formData.phoneNumber}</span>
            </div>
            <button
              onClick={handleClose}
              className='w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors'
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPVerificationModal;
