// services/ComputerSoftwareService.js

const { ComputerSoftware, Computer, Software, ReportDetail } = require('../../models');

class ComputerSoftwareService {
  async getAllComputerSoftware() {
    try {
      const computerSoftwareList = await ComputerSoftware.findAll({
        include: [
          { model: Computer, as: 'computer' },
          { model: Software, as: 'software' },
          { model: ReportDetail, as: 'reportDetails' },
        ],
      });
      return computerSoftwareList;
    } catch (error) {
      console.error('Error in getAllComputerSoftware:', error);
      throw error;
    }
  }

  async getComputerSoftwareById(id) {
    try {
      const computerSoftware = await ComputerSoftware.findByPk(id, {
        include: [
          { model: Computer, as: 'computer' },
          { model: Software, as: 'software' },
          { model: ReportDetail, as: 'reportDetails' },
        ],
      });
      if (!computerSoftware) {
        return null;
      }
      return computerSoftware;
    } catch (error) {
      console.error(`Error in getComputerSoftwareById (${id}):`, error);
      throw error;
    }
  }

  async createComputerSoftware(data) {
    try {
      const newComputerSoftware = await ComputerSoftware.create(data);
      return newComputerSoftware;
    } catch (error) {
      console.error('Error in createComputerSoftware:', error);
      throw error;
    }
  }

  async updateComputerSoftware(id, data) {
    try {
      const computerSoftware = await ComputerSoftware.findByPk(id);
      if (!computerSoftware) {
        return null;
      }
      await computerSoftware.update(data);
      return computerSoftware;
    } catch (error) {
      console.error(`Error in updateComputerSoftware (${id}):`, error);
      throw error;
    }
  }

  async deleteComputerSoftware(id) {
    try {
      const computerSoftware = await ComputerSoftware.findByPk(id);
      if (!computerSoftware) {
        return null;
      }
      await computerSoftware.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteComputerSoftware (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new ComputerSoftwareService();
