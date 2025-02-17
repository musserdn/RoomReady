import { Router } from 'express';
import { User } from '../../models/index.js';

const router = Router();

// GET /users - Get all users
router.get('/', async (_req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        next(error);
    }
});

// GET /users/:id - Get a user by id
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        next(error);
    }
});

// POST /users - Create a new user
router.post('/', async (req, res) => {
    console.log('Request Body:', req.body);
    const { email, password, type, room_id } = req.body;
    try {
        const newUser = await User.create({ email, password, type, room_id });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /users/:id - Update a user by id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { email, password, type, room_id } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            user.email = email;
            user.password = password;
            user.type = type;
            user.room_id = room_id;
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /users/:id - Delete a user by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { router as userRouter };
