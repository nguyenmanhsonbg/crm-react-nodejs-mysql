// controllers/computerRoomsController.js

const computerRoomsService = require('../services/ComputerRoomService');

const getAllRooms = async (req, res) => {
  try {
    const rooms = await computerRoomsService.getAllComputerRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const room = await computerRoomsService.getComputerRoomById(id);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRoom = async (req, res) => {
  try {
    const newRoom = await computerRoomsService.createComputerRoom(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoom = await computerRoomsService.updateComputerRoom(id, req.body);
    if (updatedRoom) {
      res.status(200).json(updatedRoom);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await computerRoomsService.deleteComputerRoom(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
