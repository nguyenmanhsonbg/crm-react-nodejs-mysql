// controllers/reportDetailsController.js

const reportDetailsService = require('../services/ReportDetailsService');

const getAllReportDetails = async (req, res) => {
  try {
    const reportDetailsList = await reportDetailsService.getAllReportDetails();
    res.status(200).json(reportDetailsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReportDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const reportDetail = await reportDetailsService.getReportDetailById(id);
    if (reportDetail) {
      res.status(200).json(reportDetail);
    } else {
      res.status(404).json({ message: 'Report Detail not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReportDetail = async (req, res) => {
  try {
    const newReportDetail = await reportDetailsService.createReportDetail(req.body);
    res.status(201).json(newReportDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReportDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReportDetail = await reportDetailsService.updateReportDetail(id, req.body);
    if (updatedReportDetail) {
      res.status(200).json(updatedReportDetail);
    } else {
      res.status(404).json({ message: 'Report Detail not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReportDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await reportDetailsService.deleteReportDetail(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Report Detail not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReportDetails,
  getReportDetailById,
  createReportDetail,
  updateReportDetail,
  deleteReportDetail,
};
