// services/ComputersDevicesService.js

const { ComputersDevices, Computer, Device, ReportDetail } = require('../../models');

class ComputersDevicesService {
  async getAllComputersDevices() {
    try {
      const computersDevicesList = await ComputersDevices.findAll({
        include: [
          { model: Computer, as: 'computer' },
          { model: Device, as: 'device' },
          { model: ReportDetail, as: 'reportDetails' },
        ],
      });
      return computersDevicesList;
    } catch (error) {
      console.error('Error in getAllComputersDevices:', error);
      throw error;
    }
  }

  async getComputersDeviceById(id) {
    try {
      const computersDevice = await ComputersDevices.findByPk(id, {
        include: [
          { model: Computer, as: 'computer' },
          { model: Device, as: 'device' },
          { model: ReportDetail, as: 'reportDetails' },
        ],
      });
  
      return computersDevice || null; // Simplified return check
    } catch (error) {
      console.error(`Error in getComputersDeviceById (${id}):`, error);
      throw error;
    }
  }
  

  async createComputersDevice(data) {
    try {
      const newComputersDevice = await ComputersDevices.create(data);
      return newComputersDevice;
    } catch (error) {
      console.error('Error in createComputersDevice:', error);
      throw error;
    }
  }

  async updateComputersDevice(id, data) {
    try {
      const computersDevice = await ComputersDevices.findByPk(id);
      if (!computersDevice) {
        return null;
      }
      await computersDevice.update(data);
      return computersDevice;
    } catch (error) {
      console.error(`Error in updateComputersDevice (${id}):`, error);
      throw error;
    }
  }

  async deleteComputersDevice(id) {
    try {
      const computersDevice = await ComputersDevices.findByPk(id);
      if (!computersDevice) {
        return null;
      }
      await computersDevice.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteComputersDevice (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new ComputersDevicesService();
