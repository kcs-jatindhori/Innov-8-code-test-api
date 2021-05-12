import express from 'express';
import verifyToken from '../../config/jwttoken';
import authRouter from './auth';
import ticketRouter from './ticket';

const router = express.Router();

router.use(
    '/auth',
    authRouter,
);

router.use(
    '/ticket',
    verifyToken,
    ticketRouter,
);

export default router;