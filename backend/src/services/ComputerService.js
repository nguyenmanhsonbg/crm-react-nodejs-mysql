// services/ComputersService.js

const { Computer, ComputerRoom, ComputersDevices, ComputerSoftware } = require('../../models');

class ComputersService {
  async getAllComputers() {
    try {
      const computers = await Computer.findAll({
        include: [
          { model: ComputerRoom, as: 'computerRoom' },
          { model: ComputersDevices, as: 'computersDevices' },
          { model: ComputerSoftware, as: 'computerSoftware' },
        ],
      });
      return computers;
    } catch (error) {
      console.error('Error in getAllComputers:', error);
      throw error;
    }
  }

  async getComputerById(id) {
    try {
      const computer = await Computer.findByPk(id, {
        include: [
          { model: ComputerRoom, as: 'computerRoom' },
          { model: ComputersDevices, as: 'computersDevices' },
          { model: ComputerSoftware, as: 'computerSoftware' },
        ],
      });
      if (!computer) {
        return null;
      }
      return computer;
    } catch (error) {
      console.error(`Error in getComputerById (${id}):`, error);
      throw error;
    }
  }

  async createComputer(data) {
    try {
      const newComputer = await Computer.create(data);
      return newComputer;
    } catch (error) {
      console.error('Error in createComputer:', error);
      throw error;
    }
  }

  async updateComputer(id, data) {
    try {
      const computer = await Computer.findByPk(id);
      if (!computer) {
        return null;
      }
      await computer.update(data);
      return computer;
    } catch (error) {
      console.error(`Error in updateComputer (${id}):`, error);
      throw error;
    }
  }

  async deleteComputer(id) {
    try {
      const computer = await Computer.findByPk(id);
      if (!computer) {
        return null;
      }
      await computer.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteComputer (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new ComputersService();
