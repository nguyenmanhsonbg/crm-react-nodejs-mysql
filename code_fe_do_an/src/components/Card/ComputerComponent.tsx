import React from 'react';
import { Card, Avatar, Typography } from 'antd';
import { DesktopOutlined, LaptopOutlined, TabletOutlined } from '@ant-design/icons';

interface Computer {
  id: number;
  name: string;
  computerType: 'Desktop' | 'Laptop' | 'Tablet';
  devices: string[];
  software: string[];
  status: 'operational' | 'maintenance' | 'faulty';
}

interface ComputerComponentProps {
  computer: Computer;
  onViewDetails: (computer: Computer) => void;
}

const ComputerComponent: React.FC<ComputerComponentProps> = ({ computer, onViewDetails }) => {
  // Determine the icon and background color based on computer type and status
  const getIcon = () => {
    switch (computer.computerType) {
      case 'Laptop':
        return <LaptopOutlined style={{ fontSize: '48px' }} />;
      case 'Tablet':
        return <TabletOutlined style={{ fontSize: '48px' }} />;
      default:
        return <DesktopOutlined style={{ fontSize: '48px' }} />;
    }
  };

  const backgroundColor = computer.status === 'operational'
    ? '#E0F7FA'
    : computer.status === 'maintenance'
    ? '#FFF9C4'
    : '#FFCCBC'; // Red-like color for faulty

  return (
    <Card
      bordered={false}
      style={{
        width: 120,
        height: 120,
        backgroundColor,
        cursor: 'pointer',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
      hoverable
      onClick={() => onViewDetails(computer)}
    >
      <Avatar 
        style={{ backgroundColor: '#87d068', marginBottom: 8 }} 
        icon={getIcon()} 
        size={64}
      />
      <Typography.Text strong>{computer.name}</Typography.Text>
    </Card>
  );
};

export default ComputerComponent;
