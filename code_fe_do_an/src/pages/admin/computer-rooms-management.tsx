import React, { useEffect, useState } from 'react';
import { Row, Col, message, Card, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ComputerRoomComponent from '../../components/Card/ComputerRoomComponent'; // Component hiển thị phòng máy
import { getAllComputerRooms, ComputerRoom } from '../../services/computerRoomService'; // Import service lấy dữ liệu phòng máy
import { getUserList } from '../../services/userService'; // Import service lấy dữ liệu nhân viên hỗ trợ
import { SupportStaff } from '../../services/supportService'; // Import service lấy dữ liệu nhân viên hỗ trợ
import { ComputerType, getComputerTypeList} from '../../services/computerTypeService'; // Import service lấy dữ liệu nhân viên hỗ trợ
import ComputerRoomModal from '../../components/admin/ComputerRoomModal'; // Component Modal để thêm/sửa phòng máy
import { useNavigate } from 'react-router-dom'; // Import useNavigate to switch pages


const ComputerRoomManagementPage: React.FC = () => {
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ComputerRoom[]>([]);
  const [selectedItem, setSelectedItem] = useState<ComputerRoom | null>(null);
  const [listSupport, setListSupport] = useState<SupportStaff[]>([]); // Initialize as an empty array
  const [listComputerType, setListComputerType] = useState<ComputerType[]>([]); // Initialize as an empty array
  const navigate = useNavigate(); // Create navigate instance

  // Lấy dữ liệu phòng máy từ service
  const handleFetchData = async () => {
    try {
      const rooms = await getAllComputerRooms();
      setData(rooms);
    } catch (error) {
      message.error('Không thể tải danh sách phòng máy');
    }
  };

  // Lấy dữ liệu nhân viên hỗ trợ từ service và lọc theo role "support"
  const handleFetchDataSupport = async () => {
    try {
      const users: ComputerType[] = await getUserList();
      // Extracting relevant support staff data (user_id and full_name) where role is "support"
      const supports = users
        .filter((user) => user.role === 'support' && user.status === 'active') // Filter only active support staff
        .map((user) => ({
          user_id: user.user_id,
          full_name: user.full_name,
        }));
      setListSupport(supports); // Set the filtered support staff list
    } catch (error) {
      message.error('Không thể tải danh sách nhân viên hỗ trợ');
    }
  };

  const handleFetchDataComputerType= async () => {
    try {
      const computerTypes: ComputerType[] = await getComputerTypeList();
      // Extracting relevant support staff data (user_id and full_name) where role is "support"
      setListComputerType(computerTypes); // Set the filtered support staff list
    } catch (error) {
      message.error('Không thể tải danh sách nhân viên hỗ trợ');
    }
  };

  useEffect(() => {
    if (reload) {
      handleFetchData();
      handleFetchDataSupport();
      handleFetchDataComputerType();
      setReload(false);
    }
  }, [reload]);

  // Hiển thị modal cho việc tạo mới hoặc chỉnh sửa phòng
  const showModal = (room: ComputerRoom | null) => {
    setSelectedItem(room);
    setIsModalOpen(true);
  };

  // Đóng modal và làm mới dữ liệu
  const handleModalClose = () => {
    setIsModalOpen(false);
    setReload(true);
  };

  // Function to handle clicking on a computer room to navigate to the detail page
  const handleNavigateToDetail = (roomId: number) => {
    navigate(`/teacher/computer-room-detail/${roomId}`); // Navigate to detail page using the room's ID
  };

  return (
    <>
      <Typography.Title level={2} style={{ textAlign: 'center', margin: '20px 0' }}>
        Quản lý phòng máy
      </Typography.Title>

      <Row gutter={[16, 16]}>
        {/* Hiển thị các phòng máy */}
        {data.map((room) => (
          <Col key={room.room_id} xs={24} sm={12} md={8} lg={4} xl={5} style={{ marginBottom: '40px', marginLeft: '30px' }}>
            <ComputerRoomComponent
              room={{
                id: room.room_id,
                name: room.room_name,
                numberOfComputers: room.computers.length, // Số lượng máy tính trong phòng
                supportStaff: room.supports.length > 0 ? room.supports[0].user.full_name : 'Không có nhân viên hỗ trợ',
              }}
              onViewDetail={() => handleNavigateToDetail(room.room_id)} // Navigate to detail page when clicked
              onEdit={() => showModal(room)} // Hiển thị modal chỉnh sửa
            />
          </Col>
        ))}

        {/* Nút thêm phòng mới */}
        <Col xs={24} sm={12} md={8} lg={4} xl={5}>
          <Card
            onClick={() => showModal(null)} // Mở modal để thêm phòng mới
            style={{
              width: 250,
              height: 250,
              cursor: 'pointer',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              backgroundColor: '#E3F2FD',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            hoverable
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            }}
          >
            <PlusOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          </Card>
        </Col>
      </Row>

      {/* Modal thêm hoặc chỉnh sửa phòng */}
      <ComputerRoomModal
        visible={isModalOpen}
        room={selectedItem} // Truyền dữ liệu phòng đã chọn vào modal
        setIsModalOpen={setIsModalOpen}
        mode={selectedItem ? 'edit' : 'create'} // Truyền đúng mode khi edit hoặc tạo mới
        setReload={setReload}
        supportStaffList={listSupport} // Pass the list of support staff (user_id and full_name)
        computerTypeList={listComputerType}
      />
    </>
  );
};

export default ComputerRoomManagementPage;
