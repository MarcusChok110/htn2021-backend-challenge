import express from 'express';
import userRouter from './usersRouter';
import skillRouter from './skillsRouter';

const router = express.Router();

router.use('/users', userRouter);
router.use('/skills', skillRouter);

export default router;
