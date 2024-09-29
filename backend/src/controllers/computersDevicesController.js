// controllers/computersDevicesController.js

const computersDevicesService = require('../services/ComputersDevicesService');

const getAllComputersDevices = async (req, res) => {
  try {
    const computersDevicesList = await computersDevicesService.getAllComputersDevices();
    res.status(200).json(computersDevicesList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComputersDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const computersDevice = await computersDevicesService.getComputersDeviceById(id);
    if (computersDevice) {
      res.status(200).json(computersDevice);
    } else {
      res.status(404).json({ message: 'Computers Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComputersDevice = async (req, res) => {
  try {
    const newComputersDevice = await computersDevicesService.createComputersDevice(req.body);
    res.status(201).json(newComputersDevice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComputersDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComputersDevice = await computersDevicesService.updateComputersDevice(id, req.body);
    if (updatedComputersDevice) {
      res.status(200).json(updatedComputersDevice);
    } else {
      res.status(404).json({ message: 'Computers Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComputersDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await computersDevicesService.deleteComputersDevice(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Computers Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllComputersDevices,
  getComputersDeviceById,
  createComputersDevice,
  updateComputersDevice,
  deleteComputersDevice,
};
