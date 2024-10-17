import { apiWithoutToken, apiWithToken } from '../lib/apiClient';

export interface ComputerType {
  type_id: number;
  type_name: string;
  description?: string;
}

// Get a list of all computer types
const getComputerTypeList = async (): Promise<ComputerType[]> => {
  try {
    const response = await apiWithoutToken.get('/getAllTypes');
    return response.data;
  } catch (error) {
    console.error('Error fetching computer type list:', error);
    throw error;
  }
};

// Get details of a specific computer type
const getComputerTypeById = async (typeId: number): Promise<ComputerType> => {
  try {
    const response = await apiWithoutToken.get(`/getComputerType/${typeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching computer type with ID ${typeId}:`, error);
    throw error;
  }
};

// Create a new computer type
const createComputerType = async (data: ComputerType): Promise<ComputerType> => {
  try {
    const response = await apiWithoutToken.post('/createComputerType', data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create computer type: ${error.response?.data?.message || error.message}`);
  }
};

// Update an existing computer type
const updateComputerType = async (typeId: number, data: Partial<ComputerType>): Promise<ComputerType> => {
  try {
    const response = await apiWithoutToken.put(`/updateComputerType/${typeId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update computer type: ${error.response?.data?.message || error.message}`);
  }
};

// Delete a computer type
const deleteComputerType = async (typeId: number): Promise<void> => {
  try {
    await apiWithoutToken.delete(`/deleteComputerType/${typeId}`);
  } catch (error) {
    throw new Error(`Failed to delete computer type: ${error.response?.data?.message || error.message}`);
  }
};

export {
  getComputerTypeList,
  getComputerTypeById,
  createComputerType,
  updateComputerType,
  deleteComputerType
};
