import express from 'express';
import LoginValidation from '../../modules/auth/validation/authValidation';
import AuthController from '../../modules/auth/controller/AuthController';
import verifyToken from '../../config/jwttoken';

const router = express.Router();

// User Login
router.post('/login', LoginValidation.validateLogin('loginUser'), AuthController.login);

router.get(
    '/logout',
    verifyToken,
    AuthController.logout,
);


export default router;