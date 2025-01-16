import { Router } from 'express';
import userService from '../services/userService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userController = Router();

// Връща всички потребители
userController.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
});

// Регистрация
userController.post('/register', async (req, res) => {
    const { username, phoneNumber, email, password} = req.body;

    try {
        const user = await userService.register(username, phoneNumber, email, password);
        res.json(user);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Логин
userController.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await userService.login(username, password);

        // Връщаме токена на клиента
        res.json({
            token: result.token,
            user: {
                _id: result.user._id,
                username: result.user.username,
                email: result.user.email,
                phoneNumber: result.user.phoneNumber,
            },
        });
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Профил
userController.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

// Логаут
userController.post('/logout', authMiddleware, (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

// Актуализиране на профила
userController.put('/profile', authMiddleware, async (req, res) => {
    const { username, email, phoneNumber } = req.body;

    try {
        const updatedUser = await userService.updateUser(req.user.id, { username, email, phoneNumber });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Актуализиране на паролата
userController.put('/profile/update-password', authMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        await userService.updatePassword(req.user.id, oldPassword, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default userController;