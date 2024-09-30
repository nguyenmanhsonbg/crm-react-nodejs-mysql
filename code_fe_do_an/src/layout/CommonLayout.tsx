import { useAuth } from "@/hook/AuthContext";
import {
  BookOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  AppstoreAddOutlined,
  NotificationOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const statusRole = {
  1: "Quản trị viên",
  2: "Giáo viên",
  3: "IT support",
};

const CommonLayout = ({ children }) => {
  const auth = useAuth();
  const { handleLogout } = auth;
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState("");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setRole("1"); 
    // const userEncode = localStorage.getItem("user");
    // if (userEncode) {
    //   const userDecode = JSON.parse(userEncode);
    //   // setRole(userDecode?.role_id?.toString() || "1");
    //   setRole("1"); // Adjust role based on user data
    // }
  }, [auth]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={collapsed ? "hover-expand-sider" : ""}
        style={{
          maxWidth: collapsed ? "80px" : "280px",
          width: collapsed ? "80px" : "280px",
          minWidth: collapsed ? "80px" : "280px",
          transition: "width 0.3s ease",
          backgroundColor: "#001529",
        }}
      >
        <div className="demo-logo-vertical" style={{ padding: collapsed ? "15px" : "30px", transition: "padding 0.3s ease" }}>
          <h1
            style={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: collapsed ? "18px" : "24px",
              transition: "font-size 0.3s ease",
            }}
          >
            {collapsed ? "QLPM" : "Quản lý phòng máy"}
          </h1>
          <h2
            style={{
              color: "#fff",
              display: collapsed ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 3,
              transition: "all 0.3s ease",
            }}
          >
            {statusRole[role]}
          </h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {/* Role 1 (Admin) */}
          {role === "1" && (
            <>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/admin/user-management">Quản lý người dùng</Link>
              </Menu.Item>
              <SubMenu key="roomManagement" icon={<AppstoreAddOutlined />} title="Quản lý phòng máy">
                <Menu.Item key="createRoom" icon={<PlusOutlined />}>
                  <Link to="/admin/room-management/create">Tạo mới</Link>
                </Menu.Item>
                <Menu.Item key="manageRoom" icon={<SettingOutlined />}>
                  <Link to="/admin/computer-rooms-management/manage">Quản lý</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="maintenanceManagement" icon={<NotificationOutlined />}>
                <Link to="/admin/maintenance-management">Quản lý bảo trì</Link>
              </Menu.Item>
              <Menu.Item key="deviceManagement" icon={<SettingOutlined />}>
                <Link to="/admin/devices-management">Quản lý thiết bị</Link>
              </Menu.Item>
              <Menu.Item key="softwareManagement" icon={<FileTextOutlined />}>
                <Link to="/admin/softwares-management">Quản lý phần mềm</Link>
              </Menu.Item>
              <SubMenu key="templateCreation" icon={<PlusOutlined />} title="Tạo mẫu">
                <Menu.Item key="createDeviceTemplate" icon={<AppstoreAddOutlined />}>
                  <Link to="/admin/template-creation/device">Tạo mẫu máy</Link>
                </Menu.Item>
                <Menu.Item key="createSoftwareTemplate" icon={<FileTextOutlined />}>
                  <Link to="/admin/template-creation/software">Tạo mẫu phần mềm</Link>
                </Menu.Item>
              </SubMenu>
            </>
          )}

          {/* Role 2 (Teacher) */}
          {role === "2" && (
            <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
              <Link to="/teacher/room-management">Quản lý phòng máy</Link>
            </Menu.Item>
          )}

          {/* Role 3 (IT Support) */}
          {role === "3" && (
            <>
              <Menu.Item key="maintenanceManagement" icon={<NotificationOutlined />}>
                <Link to="/support/maintenance-management">Quản lý bảo trì</Link>
              </Menu.Item>
              <Menu.Item key="maintenanceHistory" icon={<FileTextOutlined />}>
                <Link to="/support/maintenance-history">Lịch sử bảo trì</Link>
              </Menu.Item>
              <Menu.Item key="roomManagement" icon={<AppstoreAddOutlined />}>
                <Link to="/support/room-management">Quản lý phòng máy</Link>
              </Menu.Item>
            </>
          )}

          {/* Logout */}
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
