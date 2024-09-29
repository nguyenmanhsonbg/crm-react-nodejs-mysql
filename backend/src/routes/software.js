// routes/softwareRoutes.js

const express = require('express');
const {
  getAllSoftware,
  getSoftwareById,
  createSoftware,
  updateSoftware,
  deleteSoftware,
} = require('../controllers/softwareController');

const router = express.Router();

router.get('/getAllSoftware', getAllSoftware);
router.get('/getSoftwareById:id', getSoftwareById);
router.post('/createSoftware', createSoftware);
router.put('/updateSoftware:id', updateSoftware);
router.delete('/deleteSoftware:id', deleteSoftware);

module.exports = router;
