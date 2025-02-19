import { Router } from 'express';
import { Room } from '../../models/index.js';

const router = Router();

// GET /rooms - Get all rooms
router.get('/', async (_req, res, next) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    next(error);
  }
});

// GET /room/:id - Get a room by id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const room = await Room.findByPk(id);
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error('Error fetching room:', error);
    next(error);
  }
});

// POST /room - Create a new room
router.post('/', async (req, res) => {
  console.log('Request Body:', req.body);
  // Destructure with consistent variable names
  const { room: roomName, status } = req.body;
  try {
    // Use the correct variable (roomName)
    const newRoom = await Room.create({ room: roomName, status });
    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT /room/:id - Update a room by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  // Here we destructure "room" and "status" directly
  const { room, status } = req.body;
  try {
    const existingRoom = await Room.findByPk(id);
    if (existingRoom) {
      // Assign to existingRoom properties
      existingRoom.room = room;
      existingRoom.status = status;
      await existingRoom.save();
      res.json(existingRoom);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE /room/:id - Delete a room by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByPk(id);
    if (room) {
      await room.destroy();
      res.json({ message: 'Room deleted' });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(400).json({ message: error.message });
  }
});

export { router as roomRouter };