
import { apiService } from './api';

// Types for tracking data
export interface BrochureDownloadTrackingData {
  client_id: number | string;
  project_id: number;
  event_type: string;
  file_name: string;
  session_id: string;
  device_type: string;
  ip_address: string;
  user_agent: string;
}

export interface ExpressInterestTrackingData {
  client_id: number;
  project_id: number;
  session_id: string;
  ip_address: string;
  js_fingerprint: string;
  device_type: string;
  browser: string;
  os: string;
  location_approx: string;
  microsite_slug: string;
  visit_log_token: string;
}

// Tracking service methods
export const trackingService = {
  // Track brochure download
  trackBrochureDownload: async (trackingData: BrochureDownloadTrackingData): Promise<any> => {
    try {
      // Use the common API interceptor for tracking
      const response = await apiService.post('/api/track/download', trackingData);
      return response.data;
    } catch (error) {
      console.error('Error tracking brochure download:', error);
      // Don't throw error to avoid blocking the download
      return null;
    }
  },

  // Track express interest
  trackExpressInterest: async (trackingData: ExpressInterestTrackingData): Promise<any> => {
    try {
      const response = await apiService.post('/api/track/express-interest', trackingData);
      return response.data;
    } catch (error) {
      console.error('Error tracking express interest:', error);
      throw error; // Throw error for express interest as it's a critical action
    }
  },
}; 