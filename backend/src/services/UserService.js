// services/UsersService.js

const { User, IncidentReport, MaintenanceHistory, Support } = require('../../models');

class UsersService {
  async getAllUsers() {
    try {
      const users = await User.findAll({
        include: [
          { model: IncidentReport, as: 'incidentReports' },
          { model: MaintenanceHistory, as: 'maintenanceHistory' },
          { model: Support, as: 'supports' },
        ],
      });
      return users;
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findByPk(id, {
        include: [
          { model: IncidentReport, as: 'incidentReports' },
          { model: MaintenanceHistory, as: 'maintenanceHistory' },
          { model: Support, as: 'supports' },
        ],
      });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      console.error(`Error in getUserById (${id}):`, error);
      throw error;
    }
  }

  async createUser(data) {
    try {
      const newUser = await User.create(data);
      return newUser;
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  }

  async updateUser(id, data) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return null;
      }
      await user.update(data);
      return user;
    } catch (error) {
      console.error(`Error in updateUser (${id}):`, error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return null;
      }
      await user.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteUser (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new UsersService();
