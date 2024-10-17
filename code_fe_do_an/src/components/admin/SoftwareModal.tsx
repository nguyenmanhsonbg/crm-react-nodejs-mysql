import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message, Spin } from "antd";
import { createSoftware, updateSoftware, Software } from "../../services/softwareService"

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data: Software | null;
  setReload: (reload: boolean) => void;
  mode: "create" | "edit";
}

const SoftwareModal: React.FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setReload,
  mode,
}) => {
  const [softwareData, setSoftwareData] = useState<Software>({
    software_id: 0,
    software_name: "",
    version: "",
    license_expiration_date: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && mode === "edit") {
      setSoftwareData(data);
    } else {
      setSoftwareData({
        software_id: 0,
        software_name: "",
        version: "",
        license_expiration_date: "",
      });
    }
  }, [data, mode]);

  // Hàm lưu dữ liệu phần mềm
  const handleSaveSoftware = async () => {
    setLoading(true);
    try {
      if (mode === "edit") {
        await updateSoftware(softwareData.software_id, softwareData);
        message.success("Cập nhật phần mềm thành công!");
      } else {
        await createSoftware(softwareData);
        message.success("Thêm phần mềm mới thành công!");
      }
      setReload(true);
      setIsModalOpen(false);
    } catch (error) {
      message.error("Có lỗi xảy ra khi lưu phần mềm.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={mode === "edit" ? "Chỉnh sửa phần mềm" : "Thêm phần mềm"}
      visible={isModalOpen}
      onOk={handleSaveSoftware}
      onCancel={() => setIsModalOpen(false)}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Form layout="vertical">
          <Form.Item label="Tên phần mềm" required>
            <Input
              value={softwareData.software_name}
              onChange={(e) => setSoftwareData({ ...softwareData, software_name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Phiên bản" required>
            <Input
              value={softwareData.version}
              onChange={(e) => setSoftwareData({ ...softwareData, version: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Ngày hết hạn bản quyền">
            <Input
              type="date"
              value={softwareData.license_expiration_date}
              onChange={(e) => setSoftwareData({ ...softwareData, license_expiration_date: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default SoftwareModal;
