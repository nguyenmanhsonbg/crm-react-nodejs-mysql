import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Pagination,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

interface Device {
  id: number;
  name: string;
  type: string;
  serial_number?: string;
  status: string;
}

const DeviceDefaultData: Device = {
  id: 0,
  name: "",
  type: "",
  serial_number: "",
  status: "operational",
};

interface ModalEditProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data: Device | null;
  setReload: (reload: boolean) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setReload,
}) => {
  const [deviceData, setDeviceData] = useState<Device>(DeviceDefaultData);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeviceData({ ...deviceData, [name]: value });
  };

  useEffect(() => {
    if (data) {
      setDeviceData({
        id: data.id,
        name: data.name || "",
        type: data.type || "",
        serial_number: data.serial_number || "",
        status: data.status || "hoạt động",
      });
    } else {
      setDeviceData(DeviceDefaultData);
    }
  }, [data]);

  const handleSaveDevice = async () => {
    // Validation and API call to save the device
    try {
      const response = await axios.post("/devices", deviceData);
      if (response.status === 201) {
        message.success("Device saved successfully");
        setReload(true);
        setIsModalOpen(false);
      } else {
        message.error("Operation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title={data ? "Cập nhật thiết bị" : "Thêm thiết bị"}
      visible={isModalOpen}
      onOk={handleSaveDevice}
      onCancel={handleCancel}
    >
      <Form style={{ maxWidth: 600 }} layout="vertical" autoComplete="off">
        <Form.Item label="Tên thiết bị">
          <Input
            value={deviceData.name}
            onChange={handleChangeInput}
            name="name"
          />
        </Form.Item>
        <Form.Item label="Loại thiết bị">
          <Input
            value={deviceData.type}
            onChange={handleChangeInput}
            name="type"
          />
        </Form.Item>
        <Form.Item label="Số seri">
          <Input
            value={deviceData.serial_number}
            onChange={handleChangeInput}
            name="serial_number"
          />
        </Form.Item>
        <Form.Item label="Trạng thái">
          <Select
            onChange={(value) => setDeviceData({ ...deviceData, status: value })}
            value={deviceData.status}
          >
            <Select.Option value="operational">Hoạt động</Select.Option>
            <Select.Option value="maintenance">Bảo trì</Select.Option>
            <Select.Option value="faulty">Lỗi</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};


//pages
const DeviceManagementPage: React.FC = () => {
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<Device[]>([]);
  const [selectedItem, setSelectedItem] = useState<Device | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sampleDevices: Device[] = [
    {
      id: 1,
      name: "Device A",
      type: "Laptop",
      serial_number: "SN123456",
      status: "operational",
    },
    {
      id: 2,
      name: "Device B",
      type: "Desktop",
      serial_number: "SN654321",
      status: "maintenance",
    },
    {
      id: 3,
      name: "Device C",
      type: "Router",
      serial_number: "SN789012",
      status: "faulty",
    },
    {
      id: 4,
      name: "Device D",
      type: "Printer",
      serial_number: "SN345678",
      status: "operational",
    },
  ];

  

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại thiết bị",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Số serial",
      dataIndex: "serial_number",
      key: "serial_number",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "operational" ? "green" : status === "maintenance" ? "orange" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Device) => (
        <Space size="middle">
          <a
            onClick={() => {
              setSelectedItem(record);
              setIsModalOpen(true);
            }}
          >
            <AiOutlineEdit style={{ fontSize: "20px", color: "orange" }} />
          </a>
        </Space>
      ),
    },
  ];

  const handleFetchData = async (page = 1) => {
    // try {
    //   const response = await axios.get(`/devices?page=${page}&pageSize=10`);
    //   const responseData = response.data;
    //   if (response.status === 200) {
    //     setData(responseData.data);
    //     setTotalPages(responseData.total_pages);
    //     setCurrentPage(page);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    setData(sampleDevices);
  };

  useEffect(() => {
    if (reload) {
      handleFetchData(currentPage);
      setReload(false);
    }
  }, [reload, currentPage]);

  return (
    <>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setSelectedItem(null);
        }}
        type="primary"
        style={{ marginBottom: "1%" }}
      >
        Thêm thiết bị
      </Button>
      <Table
        loading={reload}
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          total: totalPages * 10,
          showSizeChanger: false,
          onChange: (page) => {
            setCurrentPage(page);
            setReload(true);
          },
        }}
      />
      <ModalEdit
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={selectedItem}
        setReload={setReload}
      />
    </>
  );
};

export default DeviceManagementPage;

