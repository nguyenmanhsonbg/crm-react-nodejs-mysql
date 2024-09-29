// routes/computersRoutes.js

const express = require('express');
const {
  getAllComputers,
  getComputerById,
  createComputer,
  updateComputer,
  deleteComputer,
} = require('../controllers/computerController');

const router = express.Router();

router.get('/getAllComputers', getAllComputers);
router.get('/getComputerById/:id', getComputerById);
router.post('/createComputer', createComputer);
router.put('/updateComputer:id', updateComputer);
router.delete('/deleteComputer:id', deleteComputer);

module.exports = router;
