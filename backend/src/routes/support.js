// routes/supportRoutes.js

const express = require('express');
const {
  getAllSupport,
  getSupportById,
  createSupport,
  updateSupport,
  deleteSupport,
} = require('../controllers/supportController');

const router = express.Router();

router.get('/getAllSupport', getAllSupport);
router.get('/getSupportById:id', getSupportById);
router.post('/createSupport', createSupport);
router.put('/updateSupport:id', updateSupport);
router.delete('/deleteSupport:id', deleteSupport);

module.exports = router;
