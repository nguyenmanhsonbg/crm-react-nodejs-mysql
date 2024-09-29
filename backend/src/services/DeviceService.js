// services/DevicesService.js

const { Device, ComputersDevices, ComputerTypeDevice } = require('../../models');

class DevicesService {
  async getAllDevices() {
    try {
      const devices = await Device.findAll({
        include: [
          { model: ComputersDevices, as: 'computersDevices' },
          { model: ComputerTypeDevice, as: 'computerTypeDevices' },
        ],
      });
      return devices;
    } catch (error) {
      console.error('Error in getAllDevices:', error);
      throw error;
    }
  }

  async getDeviceById(id) {
    try {
      const device = await Device.findByPk(id, {
        include: [
          { model: ComputersDevices, as: 'computersDevices' },
          { model: ComputerTypeDevice, as: 'computerTypeDevices' },
        ],
      });
      if (!device) {
        return null;
      }
      return device;
    } catch (error) {
      console.error(`Error in getDeviceById (${id}):`, error);
      throw error;
    }
  }

  async createDevice(data) {
    try {
      const newDevice = await Device.create(data);
      return newDevice;
    } catch (error) {
      console.error('Error in createDevice:', error);
      throw error;
    }
  }

  async updateDevice(id, data) {
    try {
      const device = await Device.findByPk(id);
      if (!device) {
        return null;
      }
      await device.update(data);
      return device;
    } catch (error) {
      console.error(`Error in updateDevice (${id}):`, error);
      throw error;
    }
  }

  async deleteDevice(id) {
    try {
      const device = await Device.findByPk(id);
      if (!device) {
        return null;
      }
      await device.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteDevice (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new DevicesService();
