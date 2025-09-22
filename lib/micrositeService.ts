import { apiService } from './api';

// Types for microsite data
export interface MicrositeData {
  id: string;
  brokerId: string;
  clientId: string;
  title: string;
  description?: string;
  properties: Property[];
  broker: {
    id: string;
    name: string;
    email: string;
    phone: string;
    photo?: string;
    bio?: string;
    firm_name?: string;
  };
  client: {
    id: string;
    name: string;
    email: string;
    preferences?: {
      minPrice?: number;
      maxPrice?: number;
      locations?: string[];
      propertyTypes?: string[];
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  images: string[];
  features: string[];
  status: 'available' | 'sold' | 'pending';
  createdAt: string;
  updatedAt: string;
}

// Microsite service methods
export const micrositeService = {
  // Get microsite data by broker and client IDs
  getMicrosite: async (brokerId: string, clientId: string): Promise<MicrositeData> => {
    const response = await apiService.get<MicrositeData>(`/cp/${brokerId}/${clientId}`);
    return response.data;
  },
  getProjectDetails: async (brokerId: string | number, clientId: string,id:string): Promise<any> => {
    const response = await apiService.get<any>(`/cp/${brokerId}/${clientId}/${id}`);
    return response.data;
  },
}; 