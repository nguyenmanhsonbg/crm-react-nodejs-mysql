// src/services/userService.js
import { apiWithoutToken } from '../lib/apiClient'; 

// Định nghĩa giao diện Device để sử dụng trong service
export interface Device {
  device_id: number;
  device_name: string;
  device_type: string;
  status: "operational" | "maintenance" | "faulty";
}

// Service lấy danh sách thiết bị
 const getDeviceList = async () => {
  try {
    const response = await apiWithoutToken.get<Device[]>('/getAllDevices');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch device list:", error);
    throw error;
  }
};

// Service tạo mới thiết bị
 const createDevice = async (deviceData: Device) => {
  try {
    const response = await apiWithoutToken.post<Device>('/createDevice', deviceData);
    return response.data;
  } catch (error) {
    console.error("Failed to create device:", error);
    throw error;
  }
};

// Service cập nhật thiết bị
 const updateDevice = async (deviceId: number, deviceData: Device) => {
  try {
    const response = await apiWithoutToken.put<Device>(`/updateDevice/${deviceId}`, deviceData);
    return response.data;
  } catch (error) {
    console.error("Failed to update device:", error);
    throw error;
  }
};

// // Service xóa thiết bị
//  const deleteDevice = async (deviceId: number) => {
//   try {
//     await apiWithoutToken.delete(`${BASE_URL}/${deviceId}`);
//   } catch (error) {
//     console.error("Failed to delete device:", error);
//     throw error;
//   }
// };

export {getDeviceList, createDevice, updateDevice};
