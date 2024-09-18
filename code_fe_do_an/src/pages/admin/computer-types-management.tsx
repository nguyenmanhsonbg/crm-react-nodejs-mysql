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

interface ComputerType {
  id: number;
  name: string;
  description: string;
}

const ComputerTypeDefaultData: ComputerType = {
  id: 0,
  name: "",
  description: "",
};
interface ModalEditProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data: ComputerType | null;
  setReload: (reload: boolean) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setReload,
}) => {
  const [computerTypeData, setComputerTypeData] = useState<ComputerType>(ComputerTypeDefaultData);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setComputerTypeData({ ...computerTypeData, [name]: value });
  };

  useEffect(() => {
    if (data) {
      setComputerTypeData({
        id: data.id,
        name: data.name || "",
        description: data.description || "",
      });
    } else {
      setComputerTypeData(ComputerTypeDefaultData);
    }
  }, [data]);

  const handleSaveComputerType = async () => {
    // Validation and API call to save the computer type
    try {
      const response = await axios.post("/computer-types", computerTypeData);
      if (response.status === 201) {
        message.success("Computer type saved successfully");
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
      title={data ? "Edit Computer Type" : "Add Computer Type"}
      visible={isModalOpen}
      onOk={handleSaveComputerType}
      onCancel={handleCancel}
    >
      <Form style={{ maxWidth: 600 }} layout="vertical" autoComplete="off">
        <Form.Item label="Computer Type Name">
          <Input
            value={computerTypeData.name}
            onChange={handleChangeInput}
            name="name"
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            value={computerTypeData.description}
            onChange={handleChangeInput}
            name="description"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};



//pages
const ComputerTypeManagementPage: React.FC = () => {
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ComputerType[]>([]);
  const [selectedItem, setSelectedItem] = useState<ComputerType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Computer Type Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: ComputerType) => (
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
  const sampleComputerTypes: ComputerType[] = [
    {
      id: 1,
      name: "Desktop",
      description: "Standard desktop computer for office use.",
    },
    {
      id: 2,
      name: "Laptop",
      description: "Portable computer for personal and professional use.",
    },
    {
      id: 3,
      name: "Server",
      description: "High-performance computer used for network and data management.",
    },
  ];
  
  const handleFetchData = async (page = 1) => {
    // Using sample data for testing UI
    setData(sampleComputerTypes);
    setTotalPages(1);
    setCurrentPage(page);
  };
  

  // const handleFetchData = async (page = 1) => {
  //   // Fetch computer type data from the API
  //   try {
  //     const response = await axios.get(`/computer-types?page=${page}&pageSize=10`);
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
        Add Computer Type
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

export default ComputerTypeManagementPage;
