import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    // Destructure email and password from the request body
    const { email, password } = req.body;
    console.log('Email:', email);
    console.log('Password:', password);
    
    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        console.log('User:', user);
    
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
    
        // Compare passwords
        const passwordIsValid = await bcrypt.compare(password, user.password);
        console.log('Password is valid:', passwordIsValid);
    
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
    
        // Generate JWT token
        const secretKey = process.env.JWT_SECRET_KEY || '';
        const token = jwt.sign({ email: user.email, id: user.id }, secretKey, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const router = Router();
router.post('/login', login);
export default router;