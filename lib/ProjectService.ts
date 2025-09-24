import { apiService } from './api';


export const ProjectService = {
  // Get microsite data by broker and client IDs
  getProjectsList: async (): Promise<any> => {
    const response = await apiService.get<any>(`/api/projects`);
    return response.data;
  },
  getProjectDetails: async (projectId: string | number): Promise<any> => {
    const response = await apiService.get<any>(`/api/projects/${projectId}`);
    return response.data;
  },
}; 