import React from 'react';
import { Card, Avatar, Typography, Button } from 'antd';
import { EditOutlined, DesktopOutlined, TeamOutlined, InfoCircleOutlined } from '@ant-design/icons';

interface ComputerRoom {
  id: number;
  name: string;
  numberOfComputers: number;
  supportStaff: string;
}

interface ComputerRoomComponentProps {
  room: ComputerRoom;
  onEdit: (room: ComputerRoom) => void;
  onViewDetail: () => void;
}

const ComputerRoomComponent: React.FC<ComputerRoomComponentProps> = ({ room, onEdit, onViewDetail }) => {
  // Define color based on the number of computers
  const backgroundColor = room.numberOfComputers > 20 ? '#E0F7FA' : '#FFF9C4'; // Light blue for more than 20 computers, light yellow otherwise

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            style={{ backgroundColor: '#87d068', marginRight: 10 }}
            icon={<DesktopOutlined />}
          />
          <Typography.Title level={4} style={{ margin: 0 }}>{room.name}</Typography.Title>
        </div>
      }
      extra={
        <EditOutlined 
          onClick={(e) => { 
            e.stopPropagation(); // Prevents the card click from triggering when editing
            onEdit(room); 
          }} 
          style={{ fontSize: '16px', color: '#1890ff', cursor: 'pointer' }} 
        />
      }
      bordered={false}
      style={{
        width: 250,
        height: 300,
        backgroundColor,
        cursor: 'pointer',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      bodyStyle={{
        padding: '20px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      hoverable
      onClick={onViewDetail} // Handle navigation to detail view
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <DesktopOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '8px' }} />
        <Typography.Text><strong>Số lượng máy:</strong> {room.numberOfComputers}</Typography.Text>
      </div>
      <div style={{ textAlign: 'center' }}>
        <TeamOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '8px' }} />
        <Typography.Text><strong>Nhân viên hỗ trợ:</strong></Typography.Text>
        <Typography.Text style={{ display: 'block', fontSize: '12px', color: '#555' }}>{room.supportStaff}</Typography.Text>
      </div>
      <Button type="primary" icon={<InfoCircleOutlined />} onClick={(e) => { e.stopPropagation(); onViewDetail(); }} style={{ marginTop: '20px' }}>
        Xem Chi Tiết
      </Button>
    </Card>
  );
};

export default ComputerRoomComponent;
