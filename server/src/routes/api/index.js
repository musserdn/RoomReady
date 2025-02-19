import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { roomRouter } from './room-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/rooms', roomRouter);

export default router;
