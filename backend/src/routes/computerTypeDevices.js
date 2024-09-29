// routes/computerTypeDevicesRoutes.js

const express = require('express');
const {
  getAllComputerTypeDevices,
  getComputerTypeDeviceById,
  createComputerTypeDevice,
  updateComputerTypeDevice,
  deleteComputerTypeDevice,
} = require('../controllers/computerTypeDevicesController');

const router = express.Router();

router.get('/getAllComputerTypeDevices', getAllComputerTypeDevices);
router.get('/getComputerTypeDeviceById:id', getComputerTypeDeviceById);
router.post('/createComputerTypeDevice', createComputerTypeDevice);
router.put('/updateComputerTypeDevice:id', updateComputerTypeDevice);
router.delete('/deleteComputerTypeDevice:id', deleteComputerTypeDevice);

module.exports = router;
