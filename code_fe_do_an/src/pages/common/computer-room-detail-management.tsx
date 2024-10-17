import React, { useEffect, useState } from 'react';
import { Row, Col, Segmented, Input, Select, Pagination, Typography, message, Button, Modal, List } from 'antd';
import { useParams } from 'react-router-dom';
import ComputerComponent from '../../components/Card/ComputerComponent';
import IncidentReportComponent from '../../components/Card/IncidentReportComponent'; // Import Incident Report component
import { getRoomById } from '../../services/computerRoomService'; // Import dịch vụ lấy dữ liệu phòng máy

const { Search } = Input;
const { Option } = Select;

interface Device {
  device_id: number;
  device_name: string;
  device_type: string;
  status: string;
}

interface ReportDetail {
  device_id: number;
  device_name: string;
  device_type: string;
  status: string;
}

interface IncidentReport {
  report_id: number;
  room_id: number;
  description: string;
  status: string;
  reportDetails: ReportDetail[];
}

interface Computer {
  id: number;
  name: string;
  computersDevices: Array<{
    status: string;
    device: Device;
  }>;
  status: 'operational' | 'maintenance' | 'faulty';
}

const TEMP_REPORT_KEY = 'tempIncidentReport'; // Key for localStorage

const ComputerRoomDetailManagementPage: React.FC = () => {
  const [managementSegment, setManagementSegment] = useState<'Computers' | 'Incident Reports'>('Computers');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'operational' | 'maintenance' | 'faulty'>('all');
  const [computers, setComputers] = useState<Computer[]>([]);
  const [incidentReports, setIncidentReports] = useState<IncidentReport[]>([]);
  const [tempIncidentReport, setTempIncidentReport] = useState<IncidentReport | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<'Devices'>('Devices');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { roomId } = useParams<{ roomId: string }>();

  // State to manage the open popover for a computer
  const [visiblePopoverId, setVisiblePopoverId] = useState<number | null>(null);

  const createNewTempIncidentReport = () => {
    const defaultReport: IncidentReport = {
      report_id: Date.now(),
      room_id: Number(roomId),
      description: 'Temporary Incident Report',
      status: 'pending',
      reportDetails: []
    };
    setTempIncidentReport(defaultReport);
    localStorage.setItem(TEMP_REPORT_KEY, JSON.stringify(defaultReport));
  };

  const loadTempIncidentReport = () => {
    const savedReport = localStorage.getItem(TEMP_REPORT_KEY);
    if (savedReport) {
      setTempIncidentReport(JSON.parse(savedReport));
    } else {
      createNewTempIncidentReport();
    }
  };

  const saveTempIncidentReport = () => {
    if (tempIncidentReport) {
      localStorage.setItem(TEMP_REPORT_KEY, JSON.stringify(tempIncidentReport));
      message.success('Temporary Incident Report saved');
    }
  };

  // Deduplicate the reportDetails by device_id
  const getUniqueReportDetails = (details: ReportDetail[]) => {
    const uniqueDetailsMap = new Map<number, ReportDetail>();

    details.forEach((detail) => {
      uniqueDetailsMap.set(detail.device_id, detail); // This will ensure only the latest entry for each device_id is kept
    });

    return Array.from(uniqueDetailsMap.values());
  };

  const handleFetchRoomData = async () => {
    try {
      if (roomId) {
        const roomData = await getRoomById(Number(roomId));

        const formattedComputers: Computer[] = roomData.computers.map((computer: any) => ({
          id: computer.computer_id,
          name: computer.computer_name,
          computersDevices: computer.computersDevices || [],
          status: computer.status || 'operational',
        }));

        setComputers(formattedComputers);
        setIncidentReports(roomData.incidentReports);
      }
    } catch (error) {
      message.error('Không thể tải dữ liệu chi tiết phòng máy.');
    }
  };

  useEffect(() => {
    handleFetchRoomData();
    loadTempIncidentReport();
  }, [roomId]);

  const handleViewTempIncidentReport = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const filteredComputers = computers.filter((computer) => {
    const matchesSearch = computer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || computer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Typography.Title level={2} style={{ textAlign: 'center', margin: '20px 0' }}>
        Quản lý chi tiết phòng máy
      </Typography.Title>

      <Segmented
        options={['Máy tính', 'Báo cáo']}
        value={managementSegment}
        onChange={(value) => setManagementSegment(value as 'Máy tính' | 'Báo cáo')}
        style={{ marginBottom: 20 }}
      />

      
      {/* Button to view temp Incident Report */}
      <Button type="primary" onClick={handleViewTempIncidentReport} style={{ display: 'flex', marginBottom: '20px' }}>
        Báo cáo hiện tại
      </Button>

      {managementSegment === 'Máy tính' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <Search
              placeholder="Tìm kiếm máy tính"
              onSearch={(value) => setSearchTerm(value)}
              style={{ width: 200 }}
            />
            <Select
              defaultValue="operational"
              onChange={(value) => setStatusFilter(value as 'operational' | 'maintenance' | 'faulty')}
              style={{ width: 200 }}
            >
              <Option value="operational">Hoạt động</Option>
              <Option value="maintenance">Bảo trì</Option>
              <Option value="faulty">Lỗi</Option>
            </Select>
          </div>

          <Row gutter={[16, 16]}>
            {filteredComputers.map((computer) => (
              <Col key={computer.id} xs={24} sm={12} md={8} lg={4} xl={6}>
                <ComputerComponent
                  computer={computer}
                  addToTempIncidentReport={(detail) => {
                    const existingDetail = tempIncidentReport?.reportDetails.find(d => d.device_id === detail.device_id);
                    if (!existingDetail) {
                      setTempIncidentReport({
                        ...tempIncidentReport!,
                        reportDetails: [...tempIncidentReport!.reportDetails, detail],
                      });
                      saveTempIncidentReport();
                    }
                  }}
                  visiblePopover={visiblePopoverId === computer.id}
                  onPopoverVisibleChange={() =>
                    setVisiblePopoverId(visiblePopoverId === computer.id ? null : computer.id)
                  }
                />
              </Col>
            ))}
          </Row>

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredComputers.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: 20, textAlign: 'center' }}
          />
        </>
      ) : (
        <IncidentReportComponent incidentReports={incidentReports} />
      )}

      {/* Modal for viewing the temp Incident Report */}
      <Modal
        title="Báo cáo hiện tại"
        visible={isModalVisible}
        onCancel={handleModalClose}
        onOk={saveTempIncidentReport}
        okText="Save"
        cancelText="Close"
      >
        {/* Segmented Control for Devices */}
        <Segmented
          options={['Devices']}
          value={selectedSegment}
          onChange={(value) => setSelectedSegment(value as 'Devices')}
          style={{ marginBottom: '20px' }}
        />

        {/* Display unique devices */}
        <List
          dataSource={getUniqueReportDetails(tempIncidentReport?.reportDetails || [])}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text strong>{item.device_name}</Typography.Text> ({item.device_type}) - Status: {item.status}
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default ComputerRoomDetailManagementPage;
