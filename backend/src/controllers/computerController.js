// controllers/computersController.js

const computersService = require('../services/ComputerService');

const getAllComputers = async (req, res) => {
  try {
    const computers = await computersService.getAllComputers();
    res.status(200).json(computers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComputerById = async (req, res) => {
  try {
    const { id } = req.params;
    const computer = await computersService.getComputerById(id);
    if (computer) {
      res.status(200).json(computer);
    } else {
      res.status(404).json({ message: 'Computer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComputer = async (req, res) => {
  try {
    const newComputer = await computersService.createComputer(req.body);
    res.status(201).json(newComputer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComputer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComputer = await computersService.updateComputer(id, req.body);
    if (updatedComputer) {
      res.status(200).json(updatedComputer);
    } else {
      res.status(404).json({ message: 'Computer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComputer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await computersService.deleteComputer(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Computer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllComputers,
  getComputerById,
  createComputer,
  updateComputer,
  deleteComputer,
};
