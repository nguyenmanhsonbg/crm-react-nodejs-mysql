import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message, Spin } from "antd";
import { createDevice, updateDevice, Device } from "../../services/deviceService";

interface ModalEditProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data: Device | null;
  setReload: (reload: boolean) => void;
  mode: "create" | "edit";
}

const ModalEdit: React.FC<ModalEditProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setReload,
  mode,
}) => {
  const [deviceData, setDeviceData] = useState<Device>({
    device_id: 0,
    device_name: "",
    device_type: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setDeviceData(data);
    }
  }, [data]);

  const handleSaveDevice = async () => {
    setLoading(true);
    try {
      if (mode === "edit") {
        await updateDevice(deviceData.device_id, deviceData);
        message.success("Cập nhật thiết bị thành công");
      } else {
        await createDevice(deviceData);
        message.success("Thêm thiết bị mới thành công");
      }
      setReload(true);
      setIsModalOpen(false);
    } catch (error) {
      message.error("Có lỗi xảy ra khi lưu thiết bị");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={mode === "edit" ? "Cập nhật thiết bị" : "Thêm thiết bị"}
      visible={isModalOpen}
      onOk={handleSaveDevice}
      onCancel={() => setIsModalOpen(false)}
    >
      <Spin spinning={loading}>
        <Form layout="vertical">
          <Form.Item label="Tên thiết bị" required>
            <Input
              value={deviceData.device_name}
              onChange={(e) => setDeviceData({ ...deviceData, device_name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Loại thiết bị" required>
            <Input
              value={deviceData.device_type}
              onChange={(e) => setDeviceData({ ...deviceData, device_type: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalEdit;
