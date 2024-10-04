// src/services/userService.js
import { apiWithoutToken } from '../lib/apiClient'; 
const getUserProfile = async () => {
  const response = await apiWithToken.get('/users/profile');
  return response.data;
};

const updateUserProfile = async (userId, updateData) => {
  const response = await apiWithToken.put(`/users/${userId}`, updateData);
  return response.data;
};

const getUserList = async () => {
    try {
      const response = await apiWithoutToken.get('/getAllUsers');
      return response.data;
    } catch (error) {
      console.error('Error fetching user list:', error);
      throw error;
}
}

export { getUserProfile, updateUserProfile, getUserList};
