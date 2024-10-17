import ComputerRoomDetailManagement from "../pages/common/computer-room-detail-management"
import ComputerRoomsManagement from "../pages/admin/computer-rooms-management"

export const teacherRoutes = [
  { path: "computer-rooms-management/manage", element: ComputerRoomsManagement },
  { path: "computer-room-detail/:roomId", element: ComputerRoomDetailManagement },
];
