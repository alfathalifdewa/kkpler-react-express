// src/routes/UserRoutes.js
import express from 'express';
import { register, login, getUsers, getAllUsers, updateUser, logout, updateRole, forgotPassword, resetPassword } from '../controllers/UserController.js';
import { adminMiddleware, authMiddleware } from '../middleware/UserMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);
router.get('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, getUsers);
router.get('/all', authMiddleware, adminMiddleware, getAllUsers);
router.put('/updateUser', authMiddleware, updateUser);
router.put('/updateRole', authMiddleware, adminMiddleware, updateRole);

export default router;
