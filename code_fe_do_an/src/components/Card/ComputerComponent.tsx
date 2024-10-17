import React, { useState } from 'react';
import { Card, Avatar, Typography, Popover, List, Segmented, Button, Tag, Modal, Select } from 'antd';
import { DesktopOutlined, LaptopOutlined, TabletOutlined, InfoCircleOutlined } from '@ant-design/icons';

interface Device {
  device_id: number;
  device_name: string;
  device_type: string;
  status: 'operational' | 'maintenance' | 'faulty';
}

interface Software {
  software_id: number;
  software_name: string;
  version: string;
  license_expiration_date: string;
  status: 'operational' | 'outdated' | 'maintenance';
}

interface Computer {
  id: number;
  name: string;
  computerType: 'Desktop' | 'Laptop' | 'Tablet';
  computersDevices: {
    status: string;
    device: Device;
  }[];
  computerSoftware: {
    status: string;
    software: Software;
  }[];
  status: 'operational' | 'maintenance' | 'faulty';
}

interface ComputerComponentProps {
  computer: Computer;
  addToTempIncidentReport: (reportDetail: any) => void; // Function to add report detail to temp report
}

const { Option } = Select;

const ComputerComponent: React.FC<ComputerComponentProps> = ({ computer, addToTempIncidentReport }) => {
  const [selectedSegment, setSelectedSegment] = useState<'Devices' | 'Software'>('Devices');
  const [isReportDetailVisible, setIsReportDetailVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Device | Software | null>(null);
  const [status, setStatus] = useState<string>('operational'); // For changing status
  const [popoverVisible, setPopoverVisible] = useState(false); // To control the popover visibility

  // Determine the icon based on the computer type
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

  // Assign background color based on the computer's overall status
  const backgroundColor = {
    operational: '#E0F7FA',   // Light blue for operational
    maintenance: '#FFF9C4',   // Light yellow for maintenance
    faulty: '#FFCCBC',        // Light red for faulty
  }[computer.status];

  // Show Report Detail Popup and close popover
  const showReportDetail = (item: Device | Software) => {
    setSelectedItem(item);
    setStatus(item.status);
    setIsReportDetailVisible(true);
    setPopoverVisible(false); // Close the popover
  };

  // Handle changing status in the popup
  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  // Handle adding the item to the temp report
  const handleAddToTempReport = () => {
    if (selectedItem) {
      addToTempIncidentReport({
        ...selectedItem,
        status,
      });
      setIsReportDetailVisible(false); // Close the popup
    }
  };

  // Content for the Popover
  const content = (
    <div style={{ width: '300px' }}>
      <Segmented
        options={['Devices', 'Software']}
        value={selectedSegment}
        onChange={(value) => setSelectedSegment(value as 'Devices' | 'Software')}
        style={{ marginBottom: '16px' }}
      />

      {/* Display Devices or Software based on the selected segment */}
      {selectedSegment === 'Devices' ? (
        <List
          dataSource={computer.computersDevices}
          renderItem={({ device, status }) => (
            <List.Item
              actions={[
                <Button
                  shape="square"
                  icon={<InfoCircleOutlined />}
                  onClick={() => showReportDetail(device)} // Show report detail and hide popover
                />,
              ]}
            >
              <div>
                <Typography.Text strong>
                  {device.device_name} ({device.device_type})
                </Typography.Text>
                <br />
                <Tag color={status === 'operational' ? 'green' : status === 'maintenance' ? 'orange' : 'red'}>
                  {status}
                </Tag>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <List
          dataSource={computer.computerSoftware}
          renderItem={({ software, status }) => (
            <List.Item
              actions={[
                <Button
                  shape="square"
                  icon={<InfoCircleOutlined />}
                  onClick={() => showReportDetail(software)} // Show report detail and hide popover
                />,
              ]}
            >
              <div>
                <Typography.Text strong>
                  {software.software_name} (v{software.version})
                </Typography.Text>
                <br />
                <Typography.Text>
                  License Expiration Date: {new Date(software.license_expiration_date).toLocaleDateString()}
                </Typography.Text>
                <br />
                <Tag color={status === 'operational' ? 'green' : status === 'maintenance' ? 'orange' : 'red'}>
                  {status}
                </Tag>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );

  return (
    <>
      <Popover
        content={content}
        title={`Details of ${computer.name}`}
        trigger="click"
        placement="right"
        visible={popoverVisible} // Control the visibility of the popover
        onVisibleChange={(visible) => setPopoverVisible(visible)} // Set popover visibility state
      >
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
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          hoverable
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Avatar
            style={{ backgroundColor: '#87d068', marginBottom: 8 }}
            icon={getIcon()}
            size={64}
          />
          <Typography.Text strong>{computer.name}</Typography.Text>
        </Card>
      </Popover>

      {/* Modal for Report Detail */}
      <Modal
        title={selectedItem ? `Report Detail: ${'device_name' in selectedItem ? selectedItem.device_name : selectedItem.software_name}` : 'Report Detail'}
        visible={isReportDetailVisible}
        onCancel={() => setIsReportDetailVisible(false)}
        onOk={handleAddToTempReport}
        okText="Add to Report"
      >
        {selectedItem ? (
          <>
            <Typography.Text strong>{'device_name' in selectedItem ? selectedItem.device_name : selectedItem.software_name}</Typography.Text>
            <br />
            <Typography.Text>Status:</Typography.Text>
            <Select value={status} onChange={handleStatusChange} style={{ width: '100%' }}>
              <Option value="operational">Operational</Option>
              <Option value="maintenance">Maintenance</Option>
              <Option value="faulty">Faulty</Option>
              <Option value="outdated">Outdated</Option>
            </Select>
          </>
        ) : (
          <Typography.Text>No details available</Typography.Text>
        )}
      </Modal>
    </>
  );
};

export default ComputerComponent;
