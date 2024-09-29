// controllers/supportController.js

const supportService = require('../services/SupportService');

const getAllSupport = async (req, res) => {
  try {
    const supportList = await supportService.getAllSupport();
    res.status(200).json(supportList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSupportById = async (req, res) => {
  try {
    const { id } = req.params;
    const support = await supportService.getSupportById(id);
    if (support) {
      res.status(200).json(support);
    } else {
      res.status(404).json({ message: 'Support record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSupport = async (req, res) => {
  try {
    const newSupport = await supportService.createSupport(req.body);
    res.status(201).json(newSupport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSupport = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSupport = await supportService.updateSupport(id, req.body);
    if (updatedSupport) {
      res.status(200).json(updatedSupport);
    } else {
      res.status(404).json({ message: 'Support record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSupport = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await supportService.deleteSupport(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Support record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSupport,
  getSupportById,
  createSupport,
  updateSupport,
  deleteSupport,
};
