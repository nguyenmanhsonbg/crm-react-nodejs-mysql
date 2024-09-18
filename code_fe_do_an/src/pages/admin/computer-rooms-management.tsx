import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form, Input } from 'antd';
import ComputerRoomComponent from '../../components/Card/ComputerRoomComponent'; // Adjust the import path as needed

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
    {
      id: 3,
      name: "Room C",
      numberOfComputers: 15,
      supportStaff: "Mike Johnson",
    },
    {
      id: 4,
      name: "Room C",
      numberOfComputers: 15,
      supportStaff: "Mike Johnson",
    },
    {
      id: 5,
      name: "Room C",
      numberOfComputers: 15,
      supportStaff: "Mike Johnson",
    },
    {
      id: 6,
      name: "Room C",
      numberOfComputers: 15,
      supportStaff: "Mike Johnson",
    },
    {
      id: 7,
      name: "Room C",
      numberOfComputers: 15,
      supportStaff: "Mike Johnson",
    },
    {
      id: 7,
      name: "Room C",
      numberOfComputers: 60,
      supportStaff: "Mike Johnson",
    },
  ];
  
  const handleFetchData = async () => {
    // Using sample data for testing UI
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
      <Button
        onClick={() => showModal(null)}
        type="primary"
        style={{ marginBottom: "1%" }}
      >
        Add Computer Room
      </Button>
      
      <Row gutter={[16, 16]}>
        {data.map((room) => (
          <Col key={room.id} xs={24} sm={12} md={10} lg={4} xl={5}>
            <ComputerRoomComponent 
              room={room} 
              onEdit={(room) => showModal(room)}
            />
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedItem ? "Edit Computer Room" : "Add Computer Room"}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item 
            label="Room Name" 
            name="name" 
            rules={[{ required: true, message: 'Please enter the room name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Number of Computers" 
            name="numberOfComputers" 
            rules={[{ required: true, message: 'Please enter the number of computers' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item 
            label="Support Staff" 
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
