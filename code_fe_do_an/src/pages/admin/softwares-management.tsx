import React, { useEffect, useState } from "react";
import { Table, Space, Button, Tag, message, Spin } from "antd";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import SoftwareModal from "../../components/admin/SoftwareModal"; 
import { getSoftwareList, Software } from "../../services/softwareService";

const SoftwareManagementPage: React.FC = () => {
  const [data, setData] = useState<Software[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setReload] = useState(true);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedItem, setSelectedItem] = useState<Software | null>(null);

  useEffect(() => {
    if (reload) {
      handleFetchData();
      setReload(false);
    }
  }, [reload]);

  // Lấy danh sách phần mềm từ API
  const handleFetchData = async () => {
    try {
      const softwares = await getSoftwareList();
      setData(softwares);
    } catch (error) {
      message.error("Không thể tải danh sách phần mềm");
    }
  };

  // Xử lý xóa phần mềm
  // const handleDeleteSoftware = async (id: number) => {
  //   try {
  //     await deleteSoftware(id);
  //     message.success("Xóa phần mềm thành công");
  //     setReload(true);
  //   } catch (error) {
  //     message.error("Có lỗi xảy ra khi xóa phần mềm");
  //   }
  // };

  // Định nghĩa cột trong bảng
  const columns = [
    { title: "ID", dataIndex: "software_id", key: "software_id" },
    { title: "Tên phần mềm", dataIndex: "software_name", key: "software_name" },
    { title: "Phiên bản", dataIndex: "version", key: "version" },
    { title: "Ngày hết hạn bản quyền", dataIndex: "license_expiration_date", key: "license_expiration_date" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Software) => (
        <Space size="middle">
          <a onClick={() => { setSelectedItem(record); setIsModalOpen(true); setMode("edit"); }}>
            <AiOutlineEdit style={{ fontSize: "20px", color: "orange" }} />
          </a>
          {/* <a onClick={() => handleDeleteSoftware(record.software_id)}>
            <AiOutlineDelete style={{ fontSize: "20px", color: "red" }} />
          </a> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        onClick={() => { setIsModalOpen(true); setSelectedItem(null); setMode("create"); }}
        type="primary"
        style={{ marginBottom: "20px" }}
        icon={<AiOutlinePlus />}
      >
        Thêm phần mềm
      </Button>
      <Spin spinning={reload}>
        <Table columns={columns} dataSource={data} rowKey="software_id" />
      </Spin>
      <SoftwareModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={selectedItem}
        setReload={setReload}
        mode={mode}
      />
    </>
  );
};

export default SoftwareManagementPage;
