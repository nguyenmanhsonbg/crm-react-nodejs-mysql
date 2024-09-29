// services/ReportDetailsService.js

const { ReportDetail, IncidentReport, ComputersDevices, ComputerSoftware } = require('../../models');

class ReportDetailsService {
  async getAllReportDetails() {
    try {
      const reportDetailsList = await ReportDetail.findAll({
        include: [
          { model: IncidentReport, as: 'incidentReport' },
          { model: ComputersDevices, as: 'computersDevice' },
          { model: ComputerSoftware, as: 'computerSoftware' },
        ],
      });
      return reportDetailsList;
    } catch (error) {
      console.error('Error in getAllReportDetails:', error);
      throw error;
    }
  }

  async getReportDetailById(id) {
    try {
      const reportDetail = await ReportDetail.findByPk(id, {
        include: [
          { model: IncidentReport, as: 'incidentReport' },
          { model: ComputersDevices, as: 'computersDevice' },
          { model: ComputerSoftware, as: 'computerSoftware' },
        ],
      });
      if (!reportDetail) {
        return null;
      }
      return reportDetail;
    } catch (error) {
      console.error(`Error in getReportDetailById (${id}):`, error);
      throw error;
    }
  }

  async createReportDetail(data) {
    try {
      const newReportDetail = await ReportDetail.create(data);
      return newReportDetail;
    } catch (error) {
      console.error('Error in createReportDetail:', error);
      throw error;
    }
  }

  async updateReportDetail(id, data) {
    try {
      const reportDetail = await ReportDetail.findByPk(id);
      if (!reportDetail) {
        return null;
      }
      await reportDetail.update(data);
      return reportDetail;
    } catch (error) {
      console.error(`Error in updateReportDetail (${id}):`, error);
      throw error;
    }
  }

  async deleteReportDetail(id) {
    try {
      const reportDetail = await ReportDetail.findByPk(id);
      if (!reportDetail) {
        return null;
      }
      await reportDetail.destroy();
      return true;
    } catch (error) {
      console.error(`Error in deleteReportDetail (${id}):`, error);
      throw error;
    }
  }
}

module.exports = new ReportDetailsService();
