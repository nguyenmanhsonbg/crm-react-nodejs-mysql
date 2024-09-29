// routes/incidentReportsRoutes.js

const express = require('express');
const {
  getAllIncidentReports,
  getIncidentReportById,
  createIncidentReport,
  updateIncidentReport,
  deleteIncidentReport,
} = require('../controllers/incidentReportController');

const router = express.Router();

router.get('/getAllIncidentReports', getAllIncidentReports);
router.get('/getIncidentReportById:id', getIncidentReportById);
router.post('/createIncidentReport', createIncidentReport);
router.put('/updateIncidentReport:id', updateIncidentReport);
router.delete('/deleteIncidentReport:id', deleteIncidentReport);

module.exports = router;
