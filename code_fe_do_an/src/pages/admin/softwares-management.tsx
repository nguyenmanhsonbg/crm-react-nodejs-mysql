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

interface Software {
  id: number;
  name: string;
  version: string;
  licenseExpirationDate: string;
}

const SoftwareDefaultData: Software = {
  id: 0,
  name: "",
  version: "",
  licenseExpirationDate: "",
};

interface ModalEditProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data: Software | null;
  setReload: (reload: boolean) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setReload,
}) => {
  const [softwareData, setSoftwareData] = useState<Software>(SoftwareDefaultData);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSoftwareData({ ...softwareData, [name]: value });
  };

  useEffect(() => {
    if (data) {
      setSoftwareData({
        id: data.id,
        name: data.name || "",
        version: data.version || "",
        licenseExpirationDate: data.licenseExpirationDate || "",
      });
    } else {
      setSoftwareData(SoftwareDefaultData);
    }
  }, [data]);

  const handleSaveSoftware = async () => {
    // Validation and API call to save the software
    try {
      const response = await axios.post("/software", softwareData);
      if (response.status === 201) {
        message.success("Software saved successfully");
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
      title={data ? "Sửa phần mềm" : "Thêm phần mềm"}
      visible={isModalOpen}
      onOk={handleSaveSoftware}
      onCancel={handleCancel}
    >
      <Form style={{ maxWidth: 600 }} layout="vertical" autoComplete="off">
        <Form.Item label="Tên phần mềm">
          <Input
            value={softwareData.name}
            onChange={handleChangeInput}
            name="name"
          />
        </Form.Item>
        <Form.Item label="Version">
          <Input
            value={softwareData.version}
            onChange={handleChangeInput}
            name="version"
          />
        </Form.Item>
        <Form.Item label="License Expiration Date">
          <Input
            value={softwareData.licenseExpirationDate}
            onChange={handleChangeInput}
            name="licenseExpirationDate"
            type="date"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};



//pages
const SoftwareManagementPage: React.FC = () => {
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<Software[]>([]);
  const [selectedItem, setSelectedItem] = useState<Software | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên phần mềm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phiên bản",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Hạn ",
      dataIndex: "licenseExpirationDate",
      key: "licenseExpirationDate",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Software) => (
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
  
  const sampleSoftware: Software[] = [
    {
      id: 1,
      name: "Antivirus Pro",
      version: "2.1.0",
      licenseExpirationDate: "2024-12-31",
    },
    {
      id: 2,
      name: "Office Suite",
      version: "2019",
      licenseExpirationDate: "2025-03-15",
    },
    {
      id: 3,
      name: "Photo Editor",
      version: "5.4.3",
      licenseExpirationDate: "2023-08-21",
    },
  ];
  
  const handleFetchData = async (page = 1) => {
    // Using sample data for testing UI
    setData(sampleSoftware);
    setTotalPages(1);
    setCurrentPage(page);
  };
  
  // const handleFetchData = async (page = 1) => {
  //   // Fetch software data from the API
  //   try {
  //     const response = await axios.get(`/software?page=${page}&pageSize=10`);
  //     const responseData = response.data;
  //     if (response.status === 200) {
  //       setData(responseData.data);
  //       setTotalPages(responseData.total_pages);
  //       setCurrentPage(page);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
        Add Software
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

export default SoftwareManagementPage;

