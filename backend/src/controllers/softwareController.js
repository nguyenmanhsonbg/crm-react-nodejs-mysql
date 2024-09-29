// controllers/softwareController.js

const softwareService = require('../services/SoftwareService');

const getAllSoftware = async (req, res) => {
  try {
    const softwareList = await softwareService.getAllSoftware();
    res.status(200).json(softwareList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSoftwareById = async (req, res) => {
  try {
    const { id } = req.params;
    const software = await softwareService.getSoftwareById(id);
    if (software) {
      res.status(200).json(software);
    } else {
      res.status(404).json({ message: 'Software not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSoftware = async (req, res) => {
  try {
    const newSoftware = await softwareService.createSoftware(req.body);
    res.status(201).json(newSoftware);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSoftware = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSoftware = await softwareService.updateSoftware(id, req.body);
    if (updatedSoftware) {
      res.status(200).json(updatedSoftware);
    } else {
      res.status(404).json({ message: 'Software not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSoftware = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await softwareService.deleteSoftware(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Software not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSoftware,
  getSoftwareById,
  createSoftware,
  updateSoftware,
  deleteSoftware,
};
