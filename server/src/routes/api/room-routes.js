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

// GET /rooms/:room - Get a room by id
router.get('/:room', async (req, res, next) => {
  const { room } = req.params;
  try {
    const foundRoom = await Room.findByPk(room);
    if (foundRoom) {
      res.json(foundRoom);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error('Error fetching room:', error);
    next(error);
  }
});

router.post('/', async (req, res) => {
  const { room, status } = req.body;
  try {
    const newRoom = await Room.create({ room, status });
    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT /rooms/:room - Update a room by id
router.put('/:room', async (req, res) => {
  const { room } = req.params;
  const { status } = req.body;
  try {
    const existingRoom = await Room.findByPk(room);
    if (!existingRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    // Update fields that can change
    existingRoom.status = status;
    await existingRoom.save();
    res.json(existingRoom);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE /rooms/:room - Delete a room by room number
router.delete('/:room', async (req, res) => {
  const { room } = req.params;
  try {
    const roomToDelete = await Room.findByPk(room);
    if (roomToDelete) {
      await roomToDelete.destroy();
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