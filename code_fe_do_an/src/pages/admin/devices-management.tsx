import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, message } from "antd";
import DeviceModal from "../../components/admin/DeviceModal";
import { AiOutlineEdit } from "react-icons/ai";
import { getDeviceList, Device } from "../../services/deviceService"; // Import các service liên quan

const DeviceManagementPage: React.FC = () => {
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<Device[]>([]);
  const [selectedItem, setSelectedItem] = useState<Device | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");

  // Định nghĩa ánh xạ cho trạng thái thiết bị sang tiếng Việt
  const statusMap: { [key: string]: { label: string; color: string } } = {
    operational: { label: "Hoạt động", color: "green" },
    maintenance: { label: "Bảo trì", color: "orange" },
    faulty: { label: "Lỗi", color: "red" },
  };

  // Cột bảng dữ liệu thiết bị
  const columns = [
    { title: "ID", dataIndex: "device_id", key: "device_id" },
    { title: "Tên thiết bị", dataIndex: "device_name", key: "device_name" },
    { title: "Loại thiết bị", dataIndex: "device_type", key: "device_type" },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status: string) => {
    //     // Ánh xạ trạng thái thiết bị sang nhãn tiếng Việt và màu sắc
    //     const statusInfo = statusMap[status] || { label: status, color: "default" };
    //     return <Tag color={statusInfo.color}>{statusInfo.label}</Tag>;
    //   },
    // },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Device) => (
        <Space size="middle">
          <a
            onClick={() => {
              setSelectedItem(record);
              setIsModalOpen(true);
              setMode("edit"); // Đặt chế độ là edit
            }}
          >
            <AiOutlineEdit style={{ fontSize: "20px", color: "orange" }} />
          </a>
        </Space>
      ),
    },
  ];

  // Hàm lấy dữ liệu từ service
  const handleFetchData = async () => {
    try {
      const devices = await getDeviceList();
      setData(devices);
    } catch (error) {
      message.error("Không thể tải danh sách thiết bị");
    }
  };

  useEffect(() => {
    if (reload) {
      handleFetchData();
      setReload(false);
    }
  }, [reload]);

  return (
    <>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setSelectedItem(null);
          setMode("create"); // Đặt chế độ là create
        }}
        type="primary"
        style={{ marginBottom: "1%" }}
      >
        Thêm thiết bị
      </Button>
      <Table columns={columns} dataSource={data} rowKey="device_id" />
      <DeviceModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={selectedItem}
        setReload={setReload}
        mode={mode}
      />
    </>
  );
};

export default DeviceManagementPage;
