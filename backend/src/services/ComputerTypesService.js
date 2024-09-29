// services/ComputerTypesService.js

const { ComputerType, ComputerTypeDevice, ComputerTypeSoftware, Device, Software } = require('../../models');

class ComputerTypesService {
  async getAllComputerTypes() {
    try {
      const types = await ComputerType.findAll({
        include: [
          {
            model: ComputerTypeDevice,
            as: 'computerTypeDevices',
            include: [{ model: Device, as: 'device' }],
          },
          {
            model: ComputerTypeSoftware,
            as: 'computerTypeSoftware',
            include: [{ model: Software, as: 'software' }],
          },
        ],
      });
      return types;
    } catch (error) {
      console.error('Error in getAllComputerTypes:', error);
      throw error;
    }
  }

  async getComputerTypeById(id) {
    try {
      const type = await ComputerType.findByPk(id, {
        include: [
          {
            model: ComputerTypeDevice,
            as: 'computerTypeDevices',
            include: [{ model: Device, as: 'device' }],
          },
          {
            model: ComputerTypeSoftware,
            as: 'computerTypeSoftware',
            include: [{ model: Software, as: 'software' }],
          },
        ],
      });
      if (!type) {
        return null;
      }
      return type;
    } catch (error) {
      console.error(`Error in getComputerTypeById (${id}):`, error);
      throw error;
    }
  }

  async createComputerType(data) {
    try {
      const newType = await ComputerType.create(data);
      return newType;
    } catch (error) {
      console.error('Error in createComputerType:', error);
      throw error;
    }
  }

  async updateComputerType(id, data) {
    try {
      const type = await ComputerType.findByPk(id);
      if (!type) {
        return null;
      }
      await type.update(data);
      return type;
    } catch (error) {
      console.error(`Error in updateComputerType (${id}):`, error);
      throw error;
    }
  }

  async deleteComputerType(id) {
    try {
      const type = await ComputerType.findByPk(id);
      if (!type) {
        return null;
      }
      await type.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteComputerType (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new ComputerTypesService();
