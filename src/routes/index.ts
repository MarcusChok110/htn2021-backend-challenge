import express from 'express';
import userRouter from './usersRouter';
import skillRouter from './skillsRouter';

/**
 * Router combining all routes from other routers to simplify being used as express middleware
 */
const router = express.Router();

// combine routes from api
router.use('/users', userRouter);
router.use('/skills', skillRouter);

export default router;
