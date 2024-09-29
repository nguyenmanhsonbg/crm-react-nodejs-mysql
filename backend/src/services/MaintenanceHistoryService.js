// services/MaintenanceHistoryService.js

const { MaintenanceHistory, IncidentReport, User } = require('../../models');

class MaintenanceHistoryService {
  async getAllMaintenanceHistory() {
    try {
      const maintenanceHistoryList = await MaintenanceHistory.findAll({
        include: [
          { model: IncidentReport, as: 'incidentReport' },
          { model: User, as: 'performedBy' },
        ],
      });
      return maintenanceHistoryList;
    } catch (error) {
      console.error('Error in getAllMaintenanceHistory:', error);
      throw error;
    }
  }

  async getMaintenanceHistoryById(id) {
    try {
      const maintenanceHistory = await MaintenanceHistory.findByPk(id, {
        include: [
          { model: IncidentReport, as: 'incidentReport' },
          { model: User, as: 'performedBy' },
        ],
      });
      if (!maintenanceHistory) {
        return null;
      }
      return maintenanceHistory;
    } catch (error) {
      console.error(`Error in getMaintenanceHistoryById (${id}):`, error);
      throw error;
    }
  }

  async createMaintenanceHistory(data) {
    try {
      const newMaintenanceHistory = await MaintenanceHistory.create(data);
      return newMaintenanceHistory;
    } catch (error) {
      console.error('Error in createMaintenanceHistory:', error);
      throw error;
    }
  }

  async updateMaintenanceHistory(id, data) {
    try {
      const maintenanceHistory = await MaintenanceHistory.findByPk(id);
      if (!maintenanceHistory) {
        return null;
      }
      await maintenanceHistory.update(data);
      return maintenanceHistory;
    } catch (error) {
      console.error(`Error in updateMaintenanceHistory (${id}):`, error);
      throw error;
    }
  }

  async deleteMaintenanceHistory(id) {
    try {
      const maintenanceHistory = await MaintenanceHistory.findByPk(id);
      if (!maintenanceHistory) {
        return null;
      }
      await maintenanceHistory.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteMaintenanceHistory (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new MaintenanceHistoryService();
