import UserManagementPage from "../pages/admin/user-management";
import DeviceManagementPage from "../pages/admin/devices-management"
import SoftwaresManagementPage from "../pages/admin/softwares-management"
import ComputerTypesManagement from "../pages/admin/computer-types-management"
import ComputerRoomsManagement from "../pages/admin/computer-rooms-management"
import ComputerRoomDetailManagement from "../pages/admin/computer-room-detail-management"

export const adminRoutes = [
  { path: "user-management", element: UserManagementPage },
  { path: "devices-management", element: DeviceManagementPage },
  { path: "softwares-management", element: SoftwaresManagementPage },
  { path: "computer-types-management", element: ComputerTypesManagement },
  { path: "computer-rooms-management", element: ComputerRoomsManagement },
  { path: "computer-room-detail-management", element: ComputerRoomDetailManagement },
  { path: "assign-support-room", element: UserManagementPage },
];

