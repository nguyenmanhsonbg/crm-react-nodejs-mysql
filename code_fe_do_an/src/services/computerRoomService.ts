import { apiWithoutToken } from '../lib/apiClient'; 


// Định nghĩa giao diện phòng máy tính
export interface ComputerRoom {
  room_id: number;
  room_name: string;
  number_of_computers: number;
  support_staff: string;
}


// Lấy danh sách tất cả các phòng máy tính
export const getAllComputerRooms = async (): Promise<ComputerRoom[]> => {
  const response = await apiWithoutToken.get<ComputerRoom[]>(`/getAllRooms`);
  return response.data;
};

export const getRoomById = async (id: number): Promise<ComputerRoom[]> => {
  const response = await apiWithoutToken.get<ComputerRoom[]>(`/getRoomById/${id}`);
  return response.data;
};

// Tạo mới một phòng máy tính
export const createComputerRoom = async (data: ComputerRoom) => {
  const response = await apiWithoutToken.post("/createRoom", data);
  return response.data;
};
// Cập nhật một phòng máy tính

export const updateComputerRoom = async (id: number, data: ComputerRoom) => {
  const response = await apiWithoutToken.put(`/updateRoom/${id}`, data);
  return response.data;
};

// Xóa một phòng máy tính
// export const deleteComputerRoom = async (id: number): Promise<void> => {
//   await axios.delete(`${BASE_URL}/deleteComputerRoom/${id}`);
// };
