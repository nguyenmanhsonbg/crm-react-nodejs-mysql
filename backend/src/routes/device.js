// routes/devicesRoutes.js

const express = require('express');
const {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
} = require('../controllers/deviceController');

const router = express.Router();

router.get('/getAllDevices', getAllDevices);
router.get('/getDeviceById:id', getDeviceById);
router.post('/createDevice', createDevice);
router.put('/updateDevice:id', updateDevice);
router.delete('/deleteDevice:id', deleteDevice);

module.exports = router;
