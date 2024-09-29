// controllers/incidentReportsController.js

const incidentReportsService = require('../services/IncidentReportService');

const getAllIncidentReports = async (req, res) => {
  try {
    const incidentReports = await incidentReportsService.getAllIncidentReports();
    res.status(200).json(incidentReports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIncidentReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const incidentReport = await incidentReportsService.getIncidentReportById(id);
    if (incidentReport) {
      res.status(200).json(incidentReport);
    } else {
      res.status(404).json({ message: 'Incident Report not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createIncidentReport = async (req, res) => {
  try {
    const newIncidentReport = await incidentReportsService.createIncidentReport(req.body);
    res.status(201).json(newIncidentReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateIncidentReport = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedIncidentReport = await incidentReportsService.updateIncidentReport(id, req.body);
    if (updatedIncidentReport) {
      res.status(200).json(updatedIncidentReport);
    } else {
      res.status(404).json({ message: 'Incident Report not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteIncidentReport = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await incidentReportsService.deleteIncidentReport(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Incident Report not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllIncidentReports,
  getIncidentReportById,
  createIncidentReport,
  updateIncidentReport,
  deleteIncidentReport,
};
