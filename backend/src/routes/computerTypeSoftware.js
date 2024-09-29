// routes/computerTypeSoftwareRoutes.js

const express = require('express');
const {
  getAllComputerTypeSoftware,
  getComputerTypeSoftwareById,
  createComputerTypeSoftware,
  updateComputerTypeSoftware,
  deleteComputerTypeSoftware,
} = require('../controllers/computerTypeSoftwareController');

const router = express.Router();

router.get('/getAllComputerTypeSoftware', getAllComputerTypeSoftware);
router.get('/getComputerTypeSoftwareById:id', getComputerTypeSoftwareById);
router.post('/createComputerTypeSoftware', createComputerTypeSoftware);
router.put('/updateComputerTypeSoftware:id', updateComputerTypeSoftware);
router.delete('/deleteComputerTypeSoftware:id', deleteComputerTypeSoftware);

module.exports = router;
