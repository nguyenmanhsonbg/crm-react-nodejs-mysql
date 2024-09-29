// services/SoftwareService.js

const { Software, ComputerSoftware, ComputerTypeSoftware } = require('../../models');

class SoftwareService {
  async getAllSoftware() {
    try {
      const softwareList = await Software.findAll();
      return softwareList;
    } catch (error) {
      console.error('Error in getAllSoftware:', error);
      throw error;
    }
  }

  async getSoftwareById(id) {
    try {
      const software = await Software.findByPk(id);
      if (!software) {
        return null;
      }
      return software;
    } catch (error) {
      console.error(`Error in getSoftwareById (${id}):`, error);
      throw error;
    }
  }

  async createSoftware(data) {
    try {
      const newSoftware = await Software.create(data);
      return newSoftware;
    } catch (error) {
      console.error('Error in createSoftware:', error);
      throw error;
    }
  }

  async updateSoftware(id, data) {
    try {
      const software = await Software.findByPk(id);
      if (!software) {
        return null;
      }
      await software.update(data);
      return software;
    } catch (error) {
      console.error(`Error in updateSoftware (${id}):`, error);
      throw error;
    }
  }

  async deleteSoftware(id) {
    try {
      const software = await Software.findByPk(id);
      if (!software) {
        return null;
      }
      await software.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteSoftware (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new SoftwareService();
