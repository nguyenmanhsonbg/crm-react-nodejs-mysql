// src/services/userService.js
import { apiWithoutToken, apiWithToken } from '../lib/apiClient'; 


interface UserLoginData {
  username: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  role: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}


const getUserList = async () => {
    try {
      const response = await apiWithoutToken.get('/getAllUsers');
      return response.data;
    } catch (error) {
      console.error('Error fetching user list:', error);
      throw error;
}
}

const updateUser = async (userId: number, data: any) => {
  const response = await apiWithoutToken.put(`/updateUser/${userId}`, data);
  return response.data;
};


const loginUser = async (userData: UserLoginData): Promise<LoginResponse> => {
  try {
    const response = await apiWithoutToken.post<LoginResponse>('/login', userData); 
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};


const createUser = async (data: any) => {
  try {
    const response = await apiWithoutToken.post("/createUser", data); // Endpoint của backend để tạo user mới
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create user: ${(error as any).response?.data?.message || error.message}`);
  }
};

export {loginUser, createUser, updateUser, getUserList};
