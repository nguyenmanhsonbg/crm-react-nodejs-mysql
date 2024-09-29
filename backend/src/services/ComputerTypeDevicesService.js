// services/ComputerTypeDevicesService.js

const { ComputerTypeDevice, ComputerType, Device } = require('../../models');

class ComputerTypeDevicesService {
  async getAllComputerTypeDevices() {
    try {
      const computerTypeDevicesList = await ComputerTypeDevice.findAll({
        include: [
          { model: ComputerType, as: 'computerType' },
          { model: Device, as: 'device' },
        ],
      });
      return computerTypeDevicesList;
    } catch (error) {
      console.error('Error in getAllComputerTypeDevices:', error);
      throw error;
    }
  }

  async getComputerTypeDeviceById(id) {
    try {
      const computerTypeDevice = await ComputerTypeDevice.findByPk(id, {
        include: [
          { model: ComputerType, as: 'computerType' },
          { model: Device, as: 'device' },
        ],
      });
      if (!computerTypeDevice) {
        return null;
      }
      return computerTypeDevice;
    } catch (error) {
      console.error(`Error in getComputerTypeDeviceById (${id}):`, error);
      throw error;
    }
  }

  async createComputerTypeDevice(data) {
    try {
      const newComputerTypeDevice = await ComputerTypeDevice.create(data);
      return newComputerTypeDevice;
    } catch (error) {
      console.error('Error in createComputerTypeDevice:', error);
      throw error;
    }
  }

  async updateComputerTypeDevice(id, data) {
    try {
      const computerTypeDevice = await ComputerTypeDevices.findByPk(id);
      if (!computerTypeDevice) {
        return null;
      }
      await computerTypeDevice.update(data);
      return computerTypeDevice;
    } catch (error) {
      console.error(`Error in updateComputerTypeDevice (${id}):`, error);
      throw error;
    }
  }

  async deleteComputerTypeDevice(id) {
    try {
      const computerTypeDevice = await ComputerTypeDevices.findByPk(id);
      if (!computerTypeDevice) {
        return null;
      }
      await computerTypeDevice.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteComputerTypeDevice (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new ComputerTypeDevicesService();
