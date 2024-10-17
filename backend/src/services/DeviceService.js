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
      console.error('Error in getAllDevices:', error.message);
      throw new Error('Could not retrieve devices list.');
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
        console.warn(`Device with id ${id} not found.`);
        throw new Error(`Device with id ${id} not found.`);
      }
      return device;
    } catch (error) {
      console.error(`Error in getDeviceById (${id}):`, error.message);
      throw new Error(`Could not retrieve device with id ${id}.`);
    }
  }

  async createDevice(data) {
    console.log(data);
    try {
      // Validation or preprocessing before creating a device (if needed)
      if (!data.device_name || !data.device_type) {
        throw new Error('Missing required fields: name, type, or serial_number.');
      }

      const newDevice = await Device.create(data);
      return newDevice;
    } catch (error) {
      console.error('Error in createDevice:', error.message);
      throw new Error('Could not create the new device.');
    }
  }

  async updateDevice(id, data) {
    try {
      const device = await Device.findByPk(id);
      if (!device) {
        console.warn(`Device with id ${id} not found for update.`);
        throw new Error(`Device with id ${id} not found.`);
      }

      await device.update(data);
      return device;
    } catch (error) {
      console.error(`Error in updateDevice (${id}):`, error.message);
      throw new Error(`Could not update device with id ${id}.`);
    }
  }

  async deleteDevice(id) {
    try {
      const device = await Device.findByPk(id);
      if (!device) {
        console.warn(`Device with id ${id} not found for deletion.`);
        throw new Error(`Device with id ${id} not found.`);
      }

      await device.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteDevice (${id}):`, error.message);
      throw new Error(`Could not delete device with id ${id}.`);
    }
  }
}

module.exports = new DevicesService();
