// controllers/computerTypesController.js

const computerTypesService = require('../services/ComputerTypesService');

const getAllTypes = async (req, res) => {
  try {
    const types = await computerTypesService.getAllComputerTypes();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await computerTypesService.getComputerTypeById(id);
    if (type) {
      res.status(200).json(type);
    } else {
      res.status(404).json({ message: 'Computer Type not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createType = async (req, res) => {
  try {
    const newType = await computerTypesService.createComputerType(req.body);
    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateType = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedType = await computerTypesService.updateComputerType(id, req.body);
    if (updatedType) {
      res.status(200).json(updatedType);
    } else {
      res.status(404).json({ message: 'Computer Type not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteType = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await computerTypesService.deleteComputerType(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Computer Type not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTypes,
  getTypeById,
  createType,
  updateType,
  deleteType,
};
