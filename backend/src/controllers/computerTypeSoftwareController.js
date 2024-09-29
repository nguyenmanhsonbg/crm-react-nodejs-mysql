// controllers/computerTypeSoftwareController.js

const computerTypeSoftwareService = require('../services/ComputerTypeSoftwareService');

const getAllComputerTypeSoftware = async (req, res) => {
  try {
    const computerTypeSoftwareList = await computerTypeSoftwareService.getAllComputerTypeSoftware();
    res.status(200).json(computerTypeSoftwareList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComputerTypeSoftwareById = async (req, res) => {
  try {
    const { id } = req.params;
    const computerTypeSoftware = await computerTypeSoftwareService.getComputerTypeSoftwareById(id);
    if (computerTypeSoftware) {
      res.status(200).json(computerTypeSoftware);
    } else {
      res.status(404).json({ message: 'Computer Type Software not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComputerTypeSoftware = async (req, res) => {
  try {
    const newComputerTypeSoftware = await computerTypeSoftwareService.createComputerTypeSoftware(req.body);
    res.status(201).json(newComputerTypeSoftware);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComputerTypeSoftware = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComputerTypeSoftware = await computerTypeSoftwareService.updateComputerTypeSoftware(id, req.body);
    if (updatedComputerTypeSoftware) {
      res.status(200).json(updatedComputerTypeSoftware);
    } else {
      res.status(404).json({ message: 'Computer Type Software not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComputerTypeSoftware = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await computerTypeSoftwareService.deleteComputerTypeSoftware(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Computer Type Software not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllComputerTypeSoftware,
  getComputerTypeSoftwareById,
  createComputerTypeSoftware,
  updateComputerTypeSoftware,
  deleteComputerTypeSoftware,
};
