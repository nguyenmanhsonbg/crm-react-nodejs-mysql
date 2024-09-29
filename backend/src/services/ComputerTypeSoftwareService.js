// services/ComputerTypeSoftwareService.js
const ComputerType = require('../../models/ComputerType');
const Software = require('../../models/Software');
const ComputerTypeSoftware = require('../../models/ComputerTypeSoftware'); // Import the main model

class ComputerTypeSoftwareService {
  async getAllComputerTypeSoftware() {
    console.log(ComputerTypeSoftware.associations);
    try {
      const computerTypeSoftwareList = await ComputerTypeSoftware.findAll({
        include: [
          { model: ComputerType, as: 'computerTypeSoftware' },  // Use the correct alias for ComputerType association
          { model: Software, as: 'computerTypeSoftware' },       // Use the correct alias for Software association
        ],
      });
      return computerTypeSoftwareList;
    } catch (error) {
      console.error('Error in getAllComputerTypeSoftware:', error);
      throw error;
    }
  }

  async getComputerTypeSoftwareById(id) {
    try {
      const computerTypeSoftware = await ComputerTypeSoftware.findByPk(id, {
        include: [
          { model: ComputerType, as: 'computerType' },
          { model: Software, as: 'software' },
        ],
      });
      if (!computerTypeSoftware) {
        return null;
      }
      return computerTypeSoftware;
    } catch (error) {
      console.error(`Error in getComputerTypeSoftwareById (${id}):`, error);
      throw error;
    }
  }

  async createComputerTypeSoftware(data) {
    try {
      const newComputerTypeSoftware = await ComputerTypeSoftware.create(data);
      return newComputerTypeSoftware;
    } catch (error) {
      console.error('Error in createComputerTypeSoftware:', error);
      throw error;
    }
  }

  async updateComputerTypeSoftware(id, data) {
    try {
      const computerTypeSoftware = await ComputerTypeSoftware.findByPk(id);
      if (!computerTypeSoftware) {
        return null;
      }
      await computerTypeSoftware.update(data);
      return computerTypeSoftware;
    } catch (error) {
      console.error(`Error in updateComputerTypeSoftware (${id}):`, error);
      throw error;
    }
  }

  async deleteComputerTypeSoftware(id) {
    try {
      const computerTypeSoftware = await ComputerTypeSoftware.findByPk(id);
      if (!computerTypeSoftware) {
        return null;
      }
      await computerTypeSoftware.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteComputerTypeSoftware (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new ComputerTypeSoftwareService();
