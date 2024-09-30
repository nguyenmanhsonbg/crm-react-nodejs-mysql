import React, { useState } from 'react';
import { Row, Col, Modal, Button, Segmented, List, Input, Select, Pagination, Typography } from 'antd';
import ComputerComponent from '../../components/Card/ComputerComponent'; // Adjust the import path as needed

const { Search } = Input;
const { Option } = Select;

interface Computer {
  id: number;
  name: string;
  computerType: 'Desktop' | 'Laptop' | 'Tablet';
  devices: string[];
  software: string[];
  status: 'operational' | 'maintenance' | 'faulty';
}

const ComputerRoomDetailManagementPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<'Devices' | 'Software'>('Devices');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'operational' | 'maintenance' | 'faulty'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page

  // Sample data for computers
  const sampleComputers: Computer[] = [
    {
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },
    {
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },
    {
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },
    {
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },
    {
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },{
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },{
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },{
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },{
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },{
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },{
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },{
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },{
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },{
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },{
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },{
      id: 1,
      name: 'Comp 1',
      computerType: 'Desktop',
      devices: ['Keyboard', 'Mouse'],
      software: ['Windows 10', 'Office 365'],
      status: 'operational',
    },


    // Add more sample computers as needed
  ];

  // Filter and search computers
  const filteredComputers = sampleComputers.filter((computer) => {
    const matchesSearch = computer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || computer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Group computers by type
  const groupedComputers = filteredComputers.reduce((acc, computer) => {
    if (!acc[computer.computerType]) {
      acc[computer.computerType] = [];
    }
    acc[computer.computerType].push(computer);
    return acc;
  }, {} as Record<'Desktop' | 'Laptop' | 'Tablet', Computer[]>);

  const handleViewDetails = (computer: Computer) => {
    setSelectedComputer(computer);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedComputer(null);
  };

  return (
    <>
     <Typography.Title level={2} style={{ textAlign: 'center', margin: '20px 0' }}>
      Computer Room Detail Management
    </Typography.Title>
    
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Search
          placeholder="Search computers"
          onSearch={(value) => setSearchTerm(value)}
          style={{ width: 200 }}
        />
        <Select
          defaultValue="all"
          onChange={(value) => setStatusFilter(value as 'all' | 'operational' | 'maintenance' | 'faulty')}
          style={{ width: 200 }}
        >
          <Option value="all">All</Option>
          <Option value="operational">Operational</Option>
          <Option value="maintenance">Maintenance</Option>
          <Option value="faulty">Faulty</Option>
        </Select>
      </div>
      
      {Object.keys(groupedComputers).map((type) => (
        <div key={type}>
          <Typography.Title level={4}>{type}</Typography.Title>
          <Row gutter={[16, 16]}>
            {groupedComputers[type as 'Desktop' | 'Laptop' | 'Tablet'].map((computer) => (
              <Col 
              key={computer.id} 
              xs={24} 
              sm={12} 
              md={8} 
              lg={4} 
              xl={2.4} 
              style={{ marginTop: '12px',marginBottom: '12px' }}
            >
              <ComputerComponent computer={computer} onViewDetails={handleViewDetails} />
            </Col>
            
            ))}
          </Row>
        </div>
      ))}

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredComputers.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 20, textAlign: 'center' }}
      />

      <Modal
        title={selectedComputer ? `Details of ${selectedComputer.name}` : 'Computer Details'}
        visible={isModalOpen}
        onCancel={handleModalCancel}
        footer={<Button onClick={handleModalCancel}>Close</Button>}
      >
        <Segmented
          options={['Devices', 'Software']}
          value={selectedSegment}
          onChange={(value) => setSelectedSegment(value as 'Devices' | 'Software')}
        />
        <List
          dataSource={selectedSegment === 'Devices' ? selectedComputer?.devices : selectedComputer?.software}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          style={{ marginTop: '20px' }}
        />
      </Modal>
    </>
  );
};

export default ComputerRoomDetailManagementPage;
