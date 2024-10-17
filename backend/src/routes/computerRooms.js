// routes/computerRoomsRoutes.js

const express = require('express');
const {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/computerRoomsController');

const router = express.Router();

router.get('/getAllRooms', getAllRooms);
router.get('/getRoomById/:id', getRoomById);
router.post('/createRoom', createRoom);
router.put('/updateRoom/:id', updateRoom);
router.delete('/deleteRoom/:id', deleteRoom);

module.exports = router;
