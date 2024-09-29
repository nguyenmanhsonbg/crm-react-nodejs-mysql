// routes/reportDetailsRoutes.js

const express = require('express');
const {
  getAllReportDetails,
  getReportDetailById,
  createReportDetail,
  updateReportDetail,
  deleteReportDetail,
} = require('../controllers/reportDetailsController');

const router = express.Router();

router.get('/getAllReportDetails', getAllReportDetails);
router.get('/getReportDetailById:id', getReportDetailById);
router.post('/createReportDetail', createReportDetail);
router.put('/updateReportDetail:id', updateReportDetail);
router.delete('/deleteReportDetail:id', deleteReportDetail);

module.exports = router;
