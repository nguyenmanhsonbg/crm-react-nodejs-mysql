// controllers/maintenanceHistoryController.js

const maintenanceHistoryService = require('../services/MaintenanceHistoryService');

const getAllMaintenanceHistory = async (req, res) => {
  try {
    const maintenanceHistoryList = await maintenanceHistoryService.getAllMaintenanceHistory();
    res.status(200).json(maintenanceHistoryList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMaintenanceHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenanceHistory = await maintenanceHistoryService.getMaintenanceHistoryById(id);
    if (maintenanceHistory) {
      res.status(200).json(maintenanceHistory);
    } else {
      res.status(404).json({ message: 'Maintenance record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMaintenanceHistory = async (req, res) => {
  try {
    const newMaintenanceHistory = await maintenanceHistoryService.createMaintenanceHistory(req.body);
    res.status(201).json(newMaintenanceHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMaintenanceHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMaintenanceHistory = await maintenanceHistoryService.updateMaintenanceHistory(id, req.body);
    if (updatedMaintenanceHistory) {
      res.status(200).json(updatedMaintenanceHistory);
    } else {
      res.status(404).json({ message: 'Maintenance record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMaintenanceHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await maintenanceHistoryService.deleteMaintenanceHistory(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Maintenance record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMaintenanceHistory,
  getMaintenanceHistoryById,
  createMaintenanceHistory,
  updateMaintenanceHistory,
  deleteMaintenanceHistory,
};
