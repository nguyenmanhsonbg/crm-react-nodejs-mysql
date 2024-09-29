// controllers/computerTypeDevicesController.js

const computerTypeDevicesService = require('../services/ComputerTypeDevicesService');

const getAllComputerTypeDevices = async (req, res) => {
  try {
    const computerTypeDevicesList = await computerTypeDevicesService.getAllComputerTypeDevices();
    res.status(200).json(computerTypeDevicesList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComputerTypeDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const computerTypeDevice = await computerTypeDevicesService.getComputerTypeDeviceById(id);
    if (computerTypeDevice) {
      res.status(200).json(computerTypeDevice);
    } else {
      res.status(404).json({ message: 'Computer Type Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComputerTypeDevice = async (req, res) => {
  try {
    const newComputerTypeDevice = await computerTypeDevicesService.createComputerTypeDevice(req.body);
    res.status(201).json(newComputerTypeDevice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComputerTypeDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComputerTypeDevice = await computerTypeDevicesService.updateComputerTypeDevice(id, req.body);
    if (updatedComputerTypeDevice) {
      res.status(200).json(updatedComputerTypeDevice);
    } else {
      res.status(404).json({ message: 'Computer Type Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComputerTypeDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await computerTypeDevicesService.deleteComputerTypeDevice(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Computer Type Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllComputerTypeDevices,
  getComputerTypeDeviceById,
  createComputerTypeDevice,
  updateComputerTypeDevice,
  deleteComputerTypeDevice,
};
