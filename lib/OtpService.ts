import { apiService } from './api';


// Microsite service methods
export const OtpService = {
  // Get microsite data by broker and client IDs
  verifyOtp: async (body:any): Promise<any> => {
    const response = await apiService.post<any>(`/api/auth/verify-otp`,body);
    return response.data;
  },
  requestOtp: async (body:any): Promise<any> => {
    const response = await apiService.post<any>(`/api/auth/request-otp`,body);
    console.log({response})
    return response.data;
  },
}; 