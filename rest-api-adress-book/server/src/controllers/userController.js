import { Router } from 'express';
import userService from '../services/userService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userController = Router();

userController.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.json({ message: 'Error retrieving users' });
    }
});

userController.post('/register', async (req, res) => {
    const { username, phoneNumber, email, password, contacts } = req.body;

    try {
        const user = await userService.register(username, phoneNumber, email, password, contacts);
        res.json(user);
    } catch (err) {
        res.json({ message: err.message });
    }
});

userController.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await userService.login(username, password);

        res.json({
            token: result.token,
            user: {
                _id: result.user._id,
                username: result.user.username,
                email: result.user.email,
                phoneNumber: result.user.phoneNumber,
                contacts: result.user.contacts,
            },
        });
    } catch (err) {
        res.json({ message: err.message });
    }
});

userController.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.json(user);
    } catch (err) {
        res.json({ message: 'Error fetching profile' });
    }
});

userController.post('/logout', authMiddleware, (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

userController.put('/profile', authMiddleware, async (req, res) => {
    const { username, email, phoneNumber } = req.body;

    try {
        const updatedUser = await userService.updateUser(req.user.id, { username, email, phoneNumber });
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err.message });
    }
});

userController.put('/profile/update-password', authMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        await userService.updatePassword(req.user.id, oldPassword, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
});

export default userController;