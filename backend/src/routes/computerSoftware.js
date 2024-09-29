// routes/computerSoftwareRoutes.js

const express = require('express');
const {
  getAllComputerSoftware,
  getComputerSoftwareById,
  createComputerSoftware,
  updateComputerSoftware,
  deleteComputerSoftware,
} = require('../controllers/computerSoftwareController');

const router = express.Router();

router.get('/getAllComputerSoftware', getAllComputerSoftware);
router.get('/getComputerSoftwareById:id', getComputerSoftwareById);
router.post('/createComputerSoftware', createComputerSoftware);
router.put('/updateComputerSoftware:id', updateComputerSoftware);
router.delete('/deleteComputerSoftware:id', deleteComputerSoftware);

module.exports = router;
