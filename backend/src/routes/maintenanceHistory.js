// routes/maintenanceHistoryRoutes.js

const express = require('express');
const {
  getAllMaintenanceHistory,
  getMaintenanceHistoryById,
  createMaintenanceHistory,
  updateMaintenanceHistory,
  deleteMaintenanceHistory,
} = require('../controllers/maintenanceHistoryController');

const router = express.Router();

router.get('/getAllMaintenanceHistory', getAllMaintenanceHistory);
router.get('/getMaintenanceHistoryById:id', getMaintenanceHistoryById);
router.post('/createMaintenanceHistory', createMaintenanceHistory);
router.put('/updateMaintenanceHistory:id', updateMaintenanceHistory);
router.delete('/deleteMaintenanceHistory:id', deleteMaintenanceHistory);

module.exports = router;
