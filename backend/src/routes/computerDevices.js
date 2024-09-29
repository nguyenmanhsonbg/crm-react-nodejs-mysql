// routes/computersDevicesRoutes.js

const express = require('express');
const {
  getAllComputersDevices,
  getComputersDeviceById,
  createComputersDevice,
  updateComputersDevice,
  deleteComputersDevice,
} = require('../controllers/computersDevicesController');

const router = express.Router();

router.get('/getAllComputersDevices', getAllComputersDevices);
router.get('/getComputersDeviceById/:id', getComputersDeviceById);
router.post('/createComputersDevice', createComputersDevice);
router.put('/updateComputersDevice:id', updateComputersDevice);
router.delete('/deleteComputersDevice:id', deleteComputersDevice);

module.exports = router;
