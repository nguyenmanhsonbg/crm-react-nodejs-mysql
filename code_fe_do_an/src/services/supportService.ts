import { apiWithoutToken, apiWithToken } from '../lib/apiClient'; 

export interface SupportStaff {
  support_id: number;
  user_id: number;
  full_name: string;
}



// Fetch all support staff
export const getAllSupport = async () => {
  try {
    const response = await apiWithoutToken.get(`/getAllSupport`);
    return response.data;
  } catch (error) {
    console.error('Error fetching support data:', error);
    throw error;
  }
};

// Fetch a specific support staff by ID
export const getSupportById = async (id) => {
  try {
    const response = await apiWithoutToken.get(`/getSupportById${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching support with ID ${id}:`, error);
    throw error;
  }
};

// Create a new support staff entry
export const createSupport = async (supportData) => {
  try {
    const response = await apiWithoutToken.post(`/createSupport`, supportData);
    return response.data;
  } catch (error) {
    console.error('Error creating support staff:', error);
    throw error;
  }
};

// Update an existing support staff entry
export const updateSupport = async (id, supportData) => {
  try {
    const response = await apiWithoutToken.put(`/updateSupport${id}`, supportData);
    return response.data;
  } catch (error) {
    console.error(`Error updating support with ID ${id}:`, error);
    throw error;
  }
};

// Delete a support staff entry
export const deleteSupport = async (id) => {
  try {
    const response = await apiWithoutToken.delete(`/deleteSupport${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting support with ID ${id}:`, error);
    throw error;
  }
};
