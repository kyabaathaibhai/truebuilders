import { apiService } from './api';


// Microsite service methods
export const BuilderService = {
  // Get microsite data by broker and client IDs
  getBuildersList: async (): Promise<any> => {
    const response = await apiService.get<any>(`/api/builders`);
    return response.data;
  },
  getBuilderDetails: async (builderId: string | number): Promise<any> => {
    const response = await apiService.get<any>(`/api/builders/${builderId}`);
    return response.data;
  },
}; 