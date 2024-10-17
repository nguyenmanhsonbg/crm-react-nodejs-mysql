import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import { ComputerRoom, createComputerRoom, updateComputerRoom } from '../../services/computerRoomService';
import { SupportStaff } from '../../services/supportService'; // Import service lấy dữ liệu nhân viên hỗ trợ
import { ComputerType} from '../../services/computerTypeService'; // Import service lấy dữ liệu nhân viên hỗ trợ


interface ComputerRoomModalProps {
  visible: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  room: ComputerRoom | null; // Dữ liệu phòng cần chỉnh sửa hoặc null để tạo mới
  mode: "create" | "edit"; // Chế độ: "create" hoặc "edit"
  setReload: (reload: boolean) => void; // Trigger để reload danh sách
  supportStaffList: SupportStaff[]; // Danh sách nhân viên hỗ trợ để hiển thị trong combobox
  computerTypeList: ComputerType[];
}

const ComputerRoomModal: React.FC<ComputerRoomModalProps> = ({
  visible,
  setIsModalOpen,
  room,
  mode,
  setReload,
  supportStaffList,
  computerTypeList
}) => {
  const [form] = Form.useForm();
  const [selectedSupport, setSelectedSupport] = useState<number | undefined>(undefined);
  const [selectedComputerType, setSelectedComputerType] = useState<number | undefined>(undefined);

  // Khi `room` thay đổi, nếu có dữ liệu thì điền vào form
  useEffect(() => {
    if (room) {
      form.setFieldsValue({
        room_name: room.room_name,
        numberOfComputers: room.computers.length,
        supportStaff: room.supports[0]?.user?.user_id || undefined, // Lấy nhân viên hỗ trợ nếu có
      });
      setSelectedSupport(room.supports[0]?.user?.user_id);
    } else {
      form.resetFields(); // Reset form khi tạo mới
      setSelectedSupport(undefined);
    }
  }, [room, form]);

  // Xử lý khi nhấn nút Lưu
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (mode === "edit" && room) {
        // Gọi service cập nhật phòng máy
        await updateComputerRoom(room.room_id!, {
          ...values,
          supportStaffId: selectedSupport, // Include selected support staff
        });
        message.success("Cập nhật phòng máy thành công!");
      } else {
        // Gọi service tạo mới phòng máy
        await createComputerRoom({
          ...values,
          supportStaffId: selectedSupport, // Include selected support staff
        });
        message.success("Tạo phòng máy mới thành công!");
      }
      setIsModalOpen(false); // Đóng modal sau khi lưu thành công
      setReload(true); // Yêu cầu tải lại danh sách
    } catch (error) {
      console.error('Error occurred during save:', error);
      message.error("Có lỗi xảy ra khi lưu dữ liệu.");
    }
  };

  return (
    <Modal
      title={mode === "edit" ? "Chỉnh sửa phòng máy" : "Thêm phòng máy mới"}
      visible={visible}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="back" onClick={() => setIsModalOpen(false)}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Lưu
        </Button>,
      ]}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên phòng"
          name="room_name"
          rules={[{ required: true, message: 'Vui lòng nhập tên phòng!' }]}
        >
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>
        <Form.Item
          label="Số lượng máy tính"
          name="numberOfComputers"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng máy!' }]}
        >
          <Input type="number" placeholder="Nhập số lượng máy" />
        </Form.Item>

        <Form.Item
          label="Loại máy"
          name="computerType"
          rules={[{ required: true, message: 'Vui lòng chọn loại máy' }]}
        >
          <Select
            placeholder="Chọn loại máy"
            onChange={(value) => setSelectedComputerType(value)}
            value={selectedSupport}
          >
            {computerTypeList.map((computerType) => (
              <Select.Option key={computerType.type_id} value={computerType.type_id}>
                {computerType.type_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>


        <Form.Item
          label="Nhân viên hỗ trợ"
          name="supportStaff"
          rules={[{ required: true, message: 'Vui lòng chọn nhân viên hỗ trợ!' }]}
        >
          <Select
            placeholder="Chọn nhân viên hỗ trợ"
            onChange={(value) => setSelectedSupport(value)}
            value={selectedSupport}
          >
            {supportStaffList.map((staff) => (
              <Select.Option key={staff.user_id} value={staff.user_id}>
                {staff.full_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ComputerRoomModal;
