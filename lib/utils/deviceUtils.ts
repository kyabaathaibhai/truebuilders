// Utility functions for device detection and user agent
import { v4 as uuidv4 } from 'uuid';

export const getDeviceType = (): string => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/android/.test(userAgent)) {
    return 'mobile';
  } else if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'mobile';
  } else if (/windows phone/.test(userAgent)) {
    return 'mobile';
  } else if (/tablet|ipad/.test(userAgent)) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

export const getUserAgent = (): string => {
  return navigator.userAgent;
};


export const getSessionId = (): string => {
  // Get existing session ID or create new one
  if (typeof window !== 'undefined') {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  return ""
  
}; 