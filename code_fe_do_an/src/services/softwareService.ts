import { apiWithoutToken } from '../lib/apiClient'; 

// Định nghĩa giao diện phần mềm
export interface Software {
  software_id: number;
  software_name: string;
  version: string;
  license_expiration_date: string;
}

// Lấy danh sách phần mềm
const getSoftwareList = async () => {
  try {
    const response = await apiWithoutToken.get<Software[]>('/getAllSoftware');
    return response.data;
  } catch (error) {
    console.error("Error fetching software list:", error);
    throw error;
  }
};

// Tạo mới phần mềm
const createSoftware = async (data: Software) => {
  try {
    const response = await apiWithoutToken.post<Software>(`/createSoftware`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating software:", error);
    throw error;
  }
};

// Cập nhật phần mềm
const updateSoftware = async (id: number, data: Software) => {
  try {
    const response = await apiWithoutToken.put<Software>(`/updateSoftware/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating software:", error);
    throw error;
  }
};

// // Xóa phần mềm
// export const deleteSoftware = async (id: number) => {
//   try {
//     await axios.delete(`${BASE_URL}/deleteSoftware/${id}`);
//   } catch (error) {
//     console.error("Error deleting software:", error);
//     throw error;
//   }
// };

export {getSoftwareList, createSoftware, updateSoftware};