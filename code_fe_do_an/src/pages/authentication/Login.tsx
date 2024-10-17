import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, Checkbox, Typography, message } from 'antd';
import { loginUser } from '@/services/userService'; // Import `loginUser` từ userService
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Interface định nghĩa các trường dữ liệu cho tài khoản
interface Account {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Lưu lại thông tin tài khoản nếu đã nhớ trước đó
  useEffect(() => {
    const savedAccount = localStorage.getItem('rememberMe');
    if (savedAccount) {
      const account = JSON.parse(savedAccount);
      form.setFieldsValue(account);
      setRememberMe(true);
    }
  }, [form]);

  // Xử lý khi submit form
  const handleSubmit = async (values: Account) => {
    setLoading(true);
    try {
      // Gọi dịch vụ đăng nhập với `userService`
      const response = await loginUser(values);

      console.log(response);
      // Nếu đăng nhập thành công
      localStorage.setItem('authToken', response.token); // Lưu token vào localStorage
      localStorage.setItem('userData', JSON.stringify(response.user)); // Lưu thông tin người dùng
      message.success('Đăng nhập thành công!');

      // Lưu tài khoản nếu `rememberMe` được chọn
      if (rememberMe) {
        localStorage.setItem('rememberMe', JSON.stringify(values));
      } else {
        localStorage.removeItem('rememberMe');
      }

      // Điều hướng tới trang tương ứng dựa trên role của người dùng
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else if (response.user.role === 'teacher') {
        navigate('/teacher/computer-rooms-management/manage');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      message.error(error.message || 'Tên đăng nhập hoặc mật khẩu không chính xác');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: 400, padding: 30, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Đăng Nhập
        </Title>
        <Form form={form} name="loginForm" onFinish={handleSubmit} layout="vertical">
          {/* Trường nhập Username */}
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          {/* Trường nhập Password */}
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
          </Form.Item>

          {/* Checkbox Remember Me */}
          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
              Nhớ mật khẩu
            </Checkbox>
          </Form.Item>

          {/* Nút đăng nhập */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
