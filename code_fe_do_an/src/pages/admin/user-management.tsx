import {
  Button,
  Table,
  Tag,
  Space,
  Input,
  Pagination,
  Select,
  message,
  Modal,
  Form,
  Segmented,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { CheckCircleOutlined, UserOutlined, TeamOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  full_name: string;
  email: string;
  avatar?: string;
  password?: string;
  phone_number?: string;
  status_id?: number;
  role_id: number;
  point: number;
  dob: string;
}

const UserManagementPage: React.FC = () => {
  const [reload, setReload] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<User[]>([]);
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
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string) => (
        <img
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          src={
            text || "https://example.com/default-avatar.jpg"
          }
          alt="avatar"
        />
      ),
    },
    {
      title: "Tên người dùng",
      dataIndex: "full_name",
      key: "full_name",
      render: (text: string) => <p style={{ fontWeight: "bold" }}>{text}</p>,
    },
    {
      title: "Địa chỉ Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Vai trò",
      dataIndex: "role_id",
      key: "role_id",
      render: (_: any, user: User) => {
        const { role_id } = user;
        const bgColor =
          role_id === 1
            ? "cyan"
            : role_id === 2
            ? "green"
            : role_id === 3
            ? "volcano"
            : role_id === 4
            ? "magenta"
            : "";
        const content =
          role_id === 1
            ? "Quản trị viên"
            : role_id === 2
            ? "Giáo viên"
            : role_id === 3
            ? "IT Support"
            : "Người dùng";
        return (
          <Tag color={bgColor} key={role_id}>
            {content}
          </Tag>
        );
      },
    },
    {
      title: "Trạng thái",
      key: "status_id",
      render: (_: any, user: User) => {
        const { status_id } = user;
        const bgColor =
          status_id === 1
            ? "cyan"
            : status_id === 2
            ? "green"
            : status_id === 3
            ? "volcano"
            : "";
        const content =
          status_id === 1
            ? "Pending"
            : status_id === 2
            ? "Hoạt động"
            : status_id === 3
            ? "Không hoạt động"
            : "";
        return (
          <Tag
            color={bgColor}
            key={status_id}
            style={{ textTransform: "capitalize" }}
          >
            {content}
          </Tag>
        );
      },
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: User) => {
        return (
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
        );
      },
    },
  ];

  useEffect(() => {
      // Test data for users
  const testData: User[] = [
    {
      id: 1,
      full_name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      avatar: "https://i.pravatar.cc/150?img=1", // Random male avatar
      role_id: 1,
      point: 100,
      dob: "1990-01-01",
      phone_number: "0912345678",
      status_id: 2,
    },
    {
      id: 2,
      full_name: "Trần Thị B",
      email: "tranthib@example.com",
      avatar: "https://i.pravatar.cc/150?img=2", // Random female avatar
      role_id: 3,
      point: 120,
      dob: "1992-02-02",
      phone_number: "0912345679",
      status_id: 3,
    },
    {
      id: 3,
      full_name: "Phạm Văn C",
      email: "phamvanc@example.com",
      avatar: "https://i.pravatar.cc/150?img=3", // Random male avatar
      role_id: 3,
      point: 80,
      dob: "1989-03-03",
      phone_number: "0912345680",
      status_id: 2,
    },
    {
      id: 4,
      full_name: "Nguyễn Thị D",
      email: "nguyenthid@example.com",
      avatar: "https://i.pravatar.cc/150?img=4", // Random female avatar
      role_id: 2,
      point: 90,
      dob: "1985-04-04",
      phone_number: "0912345681",
      status_id: 2,
    },
    {
      id: 5,
      full_name: "Lê Văn E",
      email: "levane@example.com",
      avatar: "https://i.pravatar.cc/150?img=5", // Random male avatar
      role_id: 3,
      point: 110,
      dob: "1993-05-05",
      phone_number: "0912345682",
      status_id: 3,
    },
    {
      id: 6,
      full_name: "Trần Thị F",
      email: "tranthif@example.com",
      avatar: "https://i.pravatar.cc/150?img=6", // Random female avatar
      role_id: 3,
      point: 95,
      dob: "1991-06-06",
      phone_number: "0912345683",
      status_id: 2,
    },
    {
      id: 7,
      full_name: "Vũ Văn G",
      email: "vuvang@example.com",
      avatar: "https://i.pravatar.cc/150?img=7", // Random male avatar
      role_id: 3,
      point: 105,
      dob: "1988-07-07",
      phone_number: "0912345684",
      status_id: 2,
    },
    {
      id: 8,
      full_name: "Đỗ Thị H",
      email: "dothih@example.com",
      avatar: "https://i.pravatar.cc/150?img=8", // Random female avatar
      role_id: 2,
      point: 100,
      dob: "1990-08-08",
      phone_number: "0912345685",
      status_id: 2,
    },
  ];

    if (reload) {
      // Fetch data (you can replace this with real API data)
      setData(testData); // Replace this with your data assignment
      setFilteredData([]); // Also apply filtering if needed
      setReload(false);
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

// ModalEdit component for user creation/editing (remains unchanged)
const ModalEdit: React.FC<{
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data: User | null;
  setReload: (reload: boolean) => void;
}> = ({ isModalOpen, setIsModalOpen, data, setReload }) => {
  const [userData, setUserData] = useState<User>(data || {
    id: 0,
    full_name: "",
    email: "",
    avatar: "",
    role_id: 4,
    dob: "",
    point: 0,
    password: "",
    phone_number: "",
    status_id: 2,
  });
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCreateAccount = async () => {
    if (!userData.password) {
      userData.password = "12345678"; // Set your default password here
    }

    if (
      !userData.full_name.trim() ||
      !userData.email.trim() ||
      !userData.phone_number.trim() ||
      !userData.password.trim() ||
      !userData.role_id ||
      userData.point === null ||
      !userData.dob.trim() ||
      !userData.status_id
    ) {
      message.warning("Hãy điền đầy đủ thông tin");
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(userData.phone_number)) {
      message.warning("Phone number is invalid");
      return;
    }

    try {
      let token = "";
      const userEncode = localStorage.getItem("user");
      if (userEncode) {
        const userDecode = JSON.parse(userEncode);
        token = userDecode?.token;
      }
      const response = await axios.post("/account", {
        ...userData,
        role_id: userData.role_id,
      });
      if (response.status === 201) {
        message.success("Tạo người dùng thành công");
        setReload(true);
        setIsModalOpen(false);
      } else {
        message.error("Thao tác thất bại");
      }
    } catch (error) {
      console.error(error);
      navigate("/error", { state: { message: error } });
    }
  };

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  return (
    <Modal
      title={"Tạo người dùng"}
      visible={isModalOpen}
      onOk={handleCreateAccount}
      onCancel={handleCancel}
    >
      <Form style={{ maxWidth: 600 }} layout="vertical" autoComplete="off">
        <Form.Item label="Tên tài khoản">
          <Input
            value={userData.full_name}
            onChange={handleChangeInput}
            name="full_name"
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            value={userData.email}
            onChange={handleChangeInput}
            name="email"
          />
        </Form.Item>

        <Form.Item label="Mật khẩu">
          <Input.Password
            value={userData.password ? userData.password : "12345678"}
            onChange={handleChangeInput}
            name="password"
            readOnly
          />
        </Form.Item>

        <Form.Item label="Số điện thoại">
          <Input
            value={userData.phone_number}
            onChange={handleChangeInput}
            name="phone_number"
          />
        </Form.Item>

        <Form.Item label="Ngày sinh">
          <Input
            value={userData.dob}
            onChange={handleChangeInput}
            name="dob"
            type="date"
          />
        </Form.Item>

        <Form.Item label="Trạng thái">
          <Select
            onChange={(value) => setUserData({ ...userData, status_id: value })}
            value={userData.status_id}
          >
            <Select.Option value={2}>Hoạt động</Select.Option>
            <Select.Option value={3}>Không hoạt động</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Vị trí">
          <Select
            onChange={(value) => setUserData({ ...userData, role_id: value })}
            value={userData.role_id}
            options={[
              { label: "Quản trị viên", value: 1 },
              { label: "Giáo viên", value: 2 },
              { label: "IT Support", value: 3 },
              { label: "Người dùng", value: 4 },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserManagementPage;
