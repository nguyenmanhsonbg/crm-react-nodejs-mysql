import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ComputerRoomComponent from '../../components/Card/ComputerRoomComponent'; // Adjust the import path as needed
import { Typography } from 'antd';
interface ComputerRoom {
  id: number;
  name: string;
  numberOfComputers: number;
  supportStaff: string;
}

const ComputerRoomManagementPage: React.FC = () => {
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ComputerRoom[]>([]);
  const [selectedItem, setSelectedItem] = useState<ComputerRoom | null>(null);
  const [form] = Form.useForm();

  // Sample data for testing
  const sampleComputerRooms: ComputerRoom[] = [
    {
      id: 1,
      name: "Room A",
      numberOfComputers: 20,
      supportStaff: "John Doe",
    },
    {
      id: 2,
      name: "Room B",
      numberOfComputers: 30,
      supportStaff: "Jane Smith",
    },
  ];
  
  const handleFetchData = async () => {
    setData(sampleComputerRooms);
  };

  useEffect(() => {
    if (reload) {
      handleFetchData();
      setReload(false);
    }
  }, [reload]);

  const showModal = (room: ComputerRoom | null) => {
    setSelectedItem(room);
    setIsModalOpen(true);
    if (room) {
      form.setFieldsValue(room);
    } else {
      form.resetFields();
    }
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (selectedItem) {
        // Update existing room logic here
      } else {
        // Add new room logic here
      }
      setIsModalOpen(false);
      setReload(true);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>

      <Row gutter={[16, 16]}>
        {data.map((room) => (
          <Col key={room.id} xs={24} sm={12} md={10} lg={4} xl={5}>
            <ComputerRoomComponent 
              room={room} 
              onEdit={(room) => showModal(room)}
            />
          </Col>
        ))}
        {/* Add Room Card at the end */}
        <Col xs={24} sm={12} md={10} lg={4} xl={5}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 250,
              height: 250,
              cursor: 'pointer',
              borderRadius: '15px',
              backgroundColor: '#E3F2FD', // Light Blue
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onClick={() => showModal(null)}
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
          </div>
        </Col>
      </Row>

      <Modal
        title={selectedItem ? "Sửa phòng máy" : "Thêm phòng máy"}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item 
            label="Tên phòng" 
            name="name" 
            rules={[{ required: true, message: 'Please enter the room name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Số lượng máy" 
            name="numberOfComputers" 
            rules={[{ required: true, message: 'Please enter the number of computers' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item 
            label="Nhân viên hỗ trợ" 
            name="supportStaff" 
            rules={[{ required: true, message: 'Please enter the support staff name' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ComputerRoomManagementPage;
