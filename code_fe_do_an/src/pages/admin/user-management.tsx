import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Input, Segmented, message, Modal, Button, Spin } from "antd";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { UserOutlined, TeamOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserForm from "../../components/admin/UserForm"; // Import UserForm component
import { getUserList } from "../../services/userService"; // Import service to fetch user data

// Define the User interface based on the backend model
interface User {
  user_id: number;
  username: string;
  full_name: string;
  email: string;
  image_path?: string;
  role: "teacher" | "admin" | "support";
  status: "active" | "deactive";
}

const UserManagementPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [mode, setMode] = useState<"create" | "edit">("create"); // Mode state to distinguish create or edit

  const navigate = useNavigate();

  // Role mapping based on backend roles
  const roleMap: { [key: string]: string } = {
    All: "",
    "Quản trị viên": "admin",
    "Giáo viên": "teacher",
    "IT Support": "support",
  };

  // Fetch users from the backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userList = await getUserList();
      setUsers(userList);
      setFilteredUsers(userList);
    } catch (error: any) {
      console.error("Failed to fetch user list:", error);
      message.error("Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle search input
  const handleSearch = (value: string) => {
    setSearchValue(value);
    applyFilters(value, roleFilter);
  };

  // Handle role filter change
  const handleRoleChange = (value: string) => {
    const role = roleMap[value] || null;
    setRoleFilter(role);
    applyFilters(searchValue, role);
  };

  // Apply search and role filters
  const applyFilters = (search: string, role: string | null) => {
    let filtered = [...users];

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.full_name.toLowerCase().includes(lowerSearch) ||
          user.email.toLowerCase().includes(lowerSearch)
      );
    }

    if (role) {
      filtered = filtered.filter((user) => user.role === role);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Define table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "user_id",
      key: "user_id",
      sorter: (a: User, b: User) => a.user_id - b.user_id,
    },
    {
      title: "Avatar",
      dataIndex: "image_path",
      key: "image_path",
      render: (imagePath: string | undefined) => (
        <img
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          src={imagePath || "https://via.placeholder.com/40?text=Avatar"}
          alt="avatar"
        />
      ),
    },
    {
      title: "Tên người dùng",
      dataIndex: "full_name",
      key: "full_name",
      sorter: (a: User, b: User) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: "Địa chỉ Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Quản trị viên", value: "admin" },
        { text: "Giáo viên", value: "teacher" },
        { text: "IT Support", value: "support" },
      ],
      onFilter: (value: string | number | boolean, record: User) => record.role === value,
      render: (role: string) => {
        let color = role === "admin" ? "volcano" : role === "teacher" ? "green" : "blue";
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Hoạt động", value: "active" },
        { text: "Không hoạt động", value: "deactive" },
      ],
      onFilter: (value: string | number | boolean, record: User) => record.status === value,
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "volcano"}>
          {status === "active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: User) => (
        <Space size="middle">
          <a
            onClick={() => {
              setSelectedUser(record);
              setMode("edit"); // Set mode to edit
              setIsModalOpen(true);
            }}
          >
            <AiOutlineEdit style={{ fontSize: "20px", color: "orange" }} />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Input.Search placeholder="Tìm kiếm theo tên hoặc email" onSearch={handleSearch} allowClear style={{ width: "300px" }} />
        <Button
          type="primary"
          icon={<AiOutlinePlus />}
          onClick={() => {
            setSelectedUser(null); // Reset selected user
            setMode("create"); // Set mode to create
            setIsModalOpen(true); // Open modal
          }}
        >
          Tạo người dùng mới
        </Button>
      </div>

      {/* User Table */}
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={filteredUsers} rowKey="user_id" pagination={{ current: currentPage, pageSize, total: filteredUsers.length, onChange: (page) => setCurrentPage(page), showSizeChanger: false }} />
      </Spin>

      {/* Edit or Create User Modal */}
      <Modal title={mode === "edit" ? "Chỉnh sửa người dùng" : "Tạo người dùng mới"} visible={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} destroyOnClose>
        <UserForm mode={mode} user={selectedUser} onSuccess={() => { setIsModalOpen(false); fetchUsers(); }} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default UserManagementPage;
