// controllers/devicesController.js

const devicesService = require('../services/DeviceService');

const getAllDevices = async (req, res) => {
  try {
    const devices = await devicesService.getAllDevices();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await devicesService.getDeviceById(id);
    if (device) {
      res.status(200).json(device);
    } else {
      res.status(404).json({ message: 'Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDevice = async (req, res) => {
  try {
    const newDevice = await devicesService.createDevice(req.body);
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDevice = async (req, res) => {
  try {
    const { device_id } = req.params;
    console.log(device_id)
    const updatedDevice = await devicesService.updateDevice(device_id, req.body);
    if (updatedDevice) {
      res.status(200).json(updatedDevice);
    } else {
      res.status(404).json({ message: 'Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await devicesService.deleteDevice(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
};
