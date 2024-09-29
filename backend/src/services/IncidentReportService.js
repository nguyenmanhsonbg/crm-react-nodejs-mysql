// services/IncidentReportsService.js

const { IncidentReport, ComputerRoom, User, ReportDetail, MaintenanceHistory } = require('../../models');

class IncidentReportsService {
  async getAllIncidentReports() {
    try {
      const incidentReports = await IncidentReport.findAll({
        include: [
          { model: ComputerRoom, as: 'computerRoom' },
          { model: User, as: 'reportedBy' },
          { model: ReportDetail, as: 'reportDetails' },
          { model: MaintenanceHistory, as: 'maintenanceHistory' },
        ],
      });
      return incidentReports;
    } catch (error) {
      console.error('Error in getAllIncidentReports:', error);
      throw error;
    }
  }

  async getIncidentReportById(id) {
    try {
      const incidentReport = await IncidentReport.findByPk(id, {
        include: [
          { model: ComputerRoom, as: 'computerRoom' },
          { model: User, as: 'reportedBy' },
          { model: ReportDetail, as: 'reportDetails' },
          { model: MaintenanceHistory, as: 'maintenanceHistory' },
        ],
      });
      if (!incidentReport) {
        return null;
      }
      return incidentReport;
    } catch (error) {
      console.error(`Error in getIncidentReportById (${id}):`, error);
      throw error;
    }
  }

  async createIncidentReport(data) {
    try {
      const newIncidentReport = await IncidentReport.create(data);
      return newIncidentReport;
    } catch (error) {
      console.error('Error in createIncidentReport:', error);
      throw error;
    }
  }

  async updateIncidentReport(id, data) {
    try {
      const incidentReport = await IncidentReport.findByPk(id);
      if (!incidentReport) {
        return null;
      }
      await incidentReport.update(data);
      return incidentReport;
    } catch (error) {
      console.error(`Error in updateIncidentReport (${id}):`, error);
      throw error;
    }
  }

  async deleteIncidentReport(id) {
    try {
      const incidentReport = await IncidentReport.findByPk(id);
      if (!incidentReport) {
        return null;
      }
      await incidentReport.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteIncidentReport (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new IncidentReportsService();
