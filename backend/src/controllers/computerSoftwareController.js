// controllers/computerSoftwareController.js

const computerSoftwareService = require('../services/ComputerSoftwareService');

const getAllComputerSoftware = async (req, res) => {
  try {
    const computerSoftwareList = await computerSoftwareService.getAllComputerSoftware();
    res.status(200).json(computerSoftwareList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComputerSoftwareById = async (req, res) => {
  try {
    const { id } = req.params;
    const computerSoftware = await computerSoftwareService.getComputerSoftwareById(id);
    if (computerSoftware) {
      res.status(200).json(computerSoftware);
    } else {
      res.status(404).json({ message: 'Computer Software not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComputerSoftware = async (req, res) => {
  try {
    const newComputerSoftware = await computerSoftwareService.createComputerSoftware(req.body);
    res.status(201).json(newComputerSoftware);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComputerSoftware = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComputerSoftware = await computerSoftwareService.updateComputerSoftware(id, req.body);
    if (updatedComputerSoftware) {
      res.status(200).json(updatedComputerSoftware);
    } else {
      res.status(404).json({ message: 'Computer Software not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComputerSoftware = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await computerSoftwareService.deleteComputerSoftware(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Computer Software not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllComputerSoftware,
  getComputerSoftwareById,
  createComputerSoftware,
  updateComputerSoftware,
  deleteComputerSoftware,
};
