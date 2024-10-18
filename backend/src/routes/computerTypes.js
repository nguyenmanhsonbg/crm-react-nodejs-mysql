// routes/computerTypesRoutes.js

const express = require('express');
const {
  getAllTypes,
  getTypeById,
  createType,
  updateType,
  deleteType,
} = require('../controllers/computerTypesController');

const router = express.Router();

router.get('/getAllTypes', getAllTypes);
router.get('/getTypeById/:id', getTypeById);
router.post('/createType', createType);
router.put('/updateType:id', updateType);
router.delete('/deleteType:id', deleteType);

module.exports = router;
