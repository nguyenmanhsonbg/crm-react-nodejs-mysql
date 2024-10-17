const { Software } = require('../../models');

class SoftwareService {
  // Lấy tất cả phần mềm có trong hệ thống
  async getAllSoftware() {
    try {
      const softwareList = await Software.findAll();
      return softwareList;
    } catch (error) {
      console.error('Error in getAllSoftware:', error.message);
      throw new Error('Could not retrieve software list.');
    }
  }

  // Lấy phần mềm theo ID
  async getSoftwareById(id) {
    try {
      const software = await Software.findByPk(id);
      if (!software) {
        throw new Error(`Software with ID ${id} not found.`);
      }
      return software;
    } catch (error) {
      console.error(`Error in getSoftwareById (${id}):`, error.message);
      throw new Error(`Could not retrieve software with ID ${id}.`);
    }
  }

  // Tạo mới phần mềm
  async createSoftware(data) {
    try {
      // Kiểm tra dữ liệu đầu vào
      if (!data.software_name || !data.version || !data.license_expiration_date) {
        throw new Error('Missing required fields: software_name, version, or license_expiration_date.');
      }

      const newSoftware = await Software.create(data);
      return newSoftware;
    } catch (error) {
      console.error('Error in createSoftware:', error.message);
      throw new Error('Could not create new software.');
    }
  }

  // Cập nhật phần mềm theo ID
  async updateSoftware(id, data) {
    try {
      const software = await Software.findByPk(id);
      if (!software) {
        throw new Error(`Software with ID ${id} not found.`);
      }

      // Kiểm tra dữ liệu đầu vào khi cập nhật
      if (!data.software_name || !data.version || !data.license_expiration_date) {
        throw new Error('Missing required fields: software_name, version, or license_expiration_date.');
      }

      await software.update(data);
      return software;
    } catch (error) {
      console.error(`Error in updateSoftware (${id}):`, error.message);
      throw new Error(`Could not update software with ID ${id}.`);
    }
  }

  // Xóa phần mềm theo ID
  async deleteSoftware(id) {
    try {
      const software = await Software.findByPk(id);
      if (!software) {
        throw new Error(`Software with ID ${id} not found.`);
      }

      await software.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteSoftware (${id}):`, error.message);
      throw new Error(`Could not delete software with ID ${id}.`);
    }
  }
}

module.exports = new SoftwareService();
