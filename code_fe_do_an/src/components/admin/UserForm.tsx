import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, message, Spin } from "antd";
import { createUser, updateUser, getUserList } from "../../services/userService";



interface User {
    user_id: number;
    username: string;
    full_name: string;
    email: string;
    image_path?: string;
    role: "teacher" | "admin" | "support";
    status: "active" | "deactive";
    password: string;
  }
  
interface UserFormProps {
  mode: "create" | "edit"; // Chế độ của form: Tạo mới hay Chỉnh sửa
  user?: User | null; // Thông tin người dùng (nếu chỉnh sửa)
  onSuccess: () => void; // Hàm callback khi thành công
  onCancel: () => void; // Hàm callback khi hủy bỏ
}

const UserForm: React.FC<UserFormProps> = ({ mode, user, onSuccess, onCancel }) => {
  const [form] = Form.useForm(); // Khởi tạo form Ant Design
  const [loading, setLoading] = useState(false);
  const [existingUsernames, setExistingUsernames] = useState<string[]>([]); // Danh sách username hiện có để kiểm tra

  // Lấy danh sách username hiện tại từ backend
  const fetchExistingUsernames = async () => {
    try {
      const users = await getUserList();
      const usernames = users.map((user: User) => user.username);
      setExistingUsernames(usernames);
    } catch (error) {
      console.error("Failed to fetch existing usernames:", error);
    }
  };

  // Set giá trị ban đầu nếu ở chế độ chỉnh sửa
  useEffect(() => {
    fetchExistingUsernames(); // Lấy danh sách username hiện có

    if (mode === "edit" && user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields(); // Reset form cho chế độ tạo mới
    }
  }, [mode, user, form]);

  // Kiểm tra username không trùng lặp
  const validateUsername = async (_: any, value: string) => {
    if (mode === "create" && value && existingUsernames.includes(value)) {
      return Promise.reject(new Error("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác."));
    }
    return Promise.resolve();
  };

  // Xử lý khi submit form
  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      if (mode === "edit" && user) {
        await updateUser(user.user_id, values);
        message.success("Cập nhật người dùng thành công!");
      } else {
        await createUser(values);
        message.success("Tạo người dùng mới thành công!");
      }
      onSuccess(); // Gọi callback khi thành công
    } catch (error: any) {
      console.error("Failed to submit form:", error);
      message.error(error.message || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[
            { required: true, message: "Vui lòng nhập tên đăng nhập" },
            { validator: validateUsername, trigger: "onChange" }, // Kiểm tra username trùng lặp
          ]}
          validateTrigger="onChange"
        >
          <Input
            placeholder="Nhập tên đăng nhập"
            onBlur={() => form.validateFields(["username"])} // Đảm bảo kích hoạt sự kiện onBlur để kiểm tra
          />
        </Form.Item>

        {/* Trường mật khẩu chỉ hiển thị khi tạo mới */}
        {mode === "create" && (
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu phải chứa ít nhất 6 ký tự" }, // Ràng buộc độ dài mật khẩu
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
        )}

        <Form.Item
          label="Họ và Tên"
          name="full_name"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Vui lòng nhập đúng định dạng email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ảnh đại diện" name="image_path">
          <Input />
        </Form.Item>
        <Form.Item
          label="Vai trò"
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
        >
          <Select>
            <Select.Option value="admin">Quản trị viên</Select.Option>
            <Select.Option value="teacher">Giáo viên</Select.Option>
            <Select.Option value="support">IT Support</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select>
            <Select.Option value="active">Hoạt động</Select.Option>
            <Select.Option value="deactive">Không hoạt động</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
            {mode === "edit" ? "Lưu thay đổi" : "Tạo mới"}
          </Button>
          <Button onClick={onCancel}>Hủy bỏ</Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UserForm;
