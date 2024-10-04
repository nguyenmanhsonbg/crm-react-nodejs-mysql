import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Input, Segmented, message, Modal, Form, Select } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { CheckCircleOutlined, UserOutlined, TeamOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getUserList } from "../../services/userService";  // Import getUserList function

interface User {
  id: number;
  full_name: string;
  email: string;
  avatar?: string;
  phone_number?: string;
  status_id?: number;
  role_id: number;
  point: number;
  dob: string;
}

const UserManagementPage: React.FC = () => {
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<User[]>([]);  // Replace testData with actual data
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [roleFilter, setRoleFilter] = useState<number | null>(null);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchValue(value);
    filterData(value, roleFilter);
  };

  // Handle segmented role filtering
  const handleSegmentedChange = (value: string) => {
    const roleMap = {
      All: null,
      "Quản trị viên": 1,
      "Giáo viên": 2,
      "IT Support": 3,
    };
    setRoleFilter(roleMap[value]);
    filterData(searchValue, roleMap[value]);
  };

  // Filter data based on search and role
  const filterData = (search: string, role: number | null) => {
    const filtered = data.filter((user) => {
      const matchesSearch =
        user.full_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = role === null || user.role_id === role;
      return matchesSearch && matchesRole;
    });
    setFilteredData(filtered);
  };

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string) => (
        <img
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          src={text || "https://example.com/default-avatar.jpg"}
          alt="avatar"
        />
      ),
    },
    { title: "Tên người dùng", dataIndex: "full_name", key: "full_name" },
    { title: "Địa chỉ Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone_number", key: "phone_number" },
    {
      title: "Vai trò",
      dataIndex: "role_id",
      key: "role_id",
      render: (_: any, user: User) => {
        const roleNames = ["Người dùng", "Quản trị viên", "Giáo viên", "IT Support"];
        return <Tag>{roleNames[user.role_id - 1]}</Tag>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status_id",
      key: "status_id",
      render: (status: number) => (
        <Tag color={status === 2 ? "green" : status === 3 ? "volcano" : ""}>
          {status === 2 ? "Hoạt động" : status === 3 ? "Không hoạt động" : ""}
        </Tag>
      ),
    },
    { title: "Ngày sinh", dataIndex: "dob", key: "dob" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: User) => (
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

  // Use `useEffect` to fetch real data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await getUserList();
        console.log(userList);
        setData(userList);
        setFilteredData(userList);  // Set filteredData to show all initially
        setReload(false);
      } catch (error) {
        console.error("Failed to fetch user list:", error);
      }
    };

    if (reload) {
      fetchData();
    }
  }, [reload]);

  return (
    <>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
        {/* Search box */}
        <Input.Search
          placeholder="Tìm kiếm theo tên hoặc email"
          onSearch={handleSearch}
          style={{ width: "300px" }}
        />

        {/* Segmented control for role filtering */}
        <Segmented
          options={[
            { label: "All", value: "All", icon: <UserOutlined /> },
            { label: "Quản trị viên", value: "Quản trị viên", icon: <TeamOutlined /> },
            { label: "Giáo viên", value: "Giáo viên", icon: <SettingOutlined /> },
            { label: "IT Support", value: "IT Support", icon: <TeamOutlined /> },
          ]}
          onChange={handleSegmentedChange}
          defaultValue="All"
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          current: currentPage,
          total: filteredData.length,
          showSizeChanger: false,
          onChange: (page) => setCurrentPage(page),
        }}
      />
      {/* <ModalEdit
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={selectedItem}
        setReload={setReload}
      /> */}
    </>
  );
};

export default UserManagementPage;
