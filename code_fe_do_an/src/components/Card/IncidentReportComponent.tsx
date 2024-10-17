import React, { useState } from 'react';
import { Collapse, List, Typography, Tag, Segmented } from 'antd';

const { Panel } = Collapse;

interface IncidentReport {
  report_id: number;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved';
  expected_time: string;
  created_at: string;
  reportDetails: Array<{
    report_detail_id: number;
    computer_device_id: number | null;
    computer_software_id: number | null;
    computersDevice: {
      computer_device_id: number;
      status: string;
      device: {
        device_id: number;
        device_name: string;
        device_type: string;
      };
    } | null;
    computerSoftware: {
      computer_software_id: number;
      status: string;
      software: {
        software_id: number;
        software_name: string;
        version: string;
        license_expiration_date: string;
      };
    } | null;
  }>;
}

interface IncidentReportComponentProps {
  incidentReports: IncidentReport[];
}

const IncidentReportComponent: React.FC<IncidentReportComponentProps> = ({ incidentReports }) => {
  const [selectedSegment, setSelectedSegment] = useState<'Devices' | 'Software'>('Devices');

  return (
    <>
      <Typography.Title level={4}>Danh sách Báo cáo Sự cố</Typography.Title>
      <Collapse accordion>
        {incidentReports.map((report) => (
          <Panel
            key={report.report_id}
            header={`Báo cáo #${report.report_id} - Trạng thái: ${report.status}`}
          >
            <Typography.Paragraph><strong>Mô tả:</strong> {report.description}</Typography.Paragraph>
            <Typography.Paragraph><strong>Thời gian dự kiến:</strong> {report.expected_time}</Typography.Paragraph>
            <Typography.Paragraph><strong>Ngày tạo:</strong> {new Date(report.created_at).toLocaleString()}</Typography.Paragraph>

            <Typography.Title level={5}>Chi tiết Báo cáo:</Typography.Title>

            {/* Segmented Control to Switch Between Devices and Software */}
            <Segmented
              options={['Devices', 'Software']}
              value={selectedSegment}
              onChange={(value) => setSelectedSegment(value as 'Devices' | 'Software')}
              style={{ marginBottom: 16 }}
            />

            {/* List Chi tiết Báo cáo - Show Devices or Software Based on Selected Segment */}
            {selectedSegment === 'Devices' ? (
              <List
                header={<div>Thiết bị</div>}
                bordered
                dataSource={report.reportDetails.filter(detail => detail.computersDevice)}
                renderItem={(detail) => (
                  <List.Item>
                    {detail.computersDevice && (
                      <Typography.Paragraph>
                        <Tag color="blue">Thiết bị</Tag> 
                        <strong>{detail.computersDevice.device.device_name}</strong> 
                        ({detail.computersDevice.device.device_type}) - Trạng thái: {detail.computersDevice.status}
                      </Typography.Paragraph>
                    )}
                  </List.Item>
                )}
              />
            ) : (
              <List
                header={<div>Phần mềm</div>}
                bordered
                dataSource={report.reportDetails.filter(detail => detail.computerSoftware)}
                renderItem={(detail) => (
                  <List.Item>
                    {detail.computerSoftware && (
                      <Typography.Paragraph>
                        <Tag color="green">Phần mềm</Tag> 
                        <strong>{detail.computerSoftware.software.software_name}</strong> - Phiên bản: {detail.computerSoftware.software.version} - Hạn sử dụng: {new Date(detail.computerSoftware.software.license_expiration_date).toLocaleDateString()}
                      </Typography.Paragraph>
                    )}
                  </List.Item>
                )}
              />
            )}
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default IncidentReportComponent;
