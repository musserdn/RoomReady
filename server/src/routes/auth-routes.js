import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Email:', email);
    console.log('Password:', password);

    const user = await User.findOne({
        where: { email },
    });
    console.log('User:', user);

    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.log('Password is valid:', passwordIsValid);

    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;