import { Router } from 'express';
import userService from '../services/userService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userController = Router();

// Път за извличане на всички потребители
userController.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.json({ message: 'Error retrieving users' });
    }
});

// Път за регистриране на потребител
userController.post('/register', async (req, res) => {
    const { username, phoneNumber, email, password} = req.body;

    try {
        const user = await userService.register(username, phoneNumber, email, password);
        res.json(user);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Път за логване на потребител
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
            },
        });
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Път за извличане на един потребител за профил page-а
userController.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.json(user);
    } catch (err) {
        res.json({ message: 'Error fetching profile' });
    }
});

// Път за изтриване на един потребител
userController.post('/delete/profile', authMiddleware, async (req, res) => {
    try {        
        let password = req.body.password
        let response = await userService.deleteProfile(req.user.id,password);
        res.json(response);
    } catch (err) {
        res.json({ message: 'Error fetching profile' });
    }
});

// Път за разкачане на потребител
userController.post('/logout', authMiddleware, (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

// Път за актуализиране на данни на потребител
userController.put('/profile', authMiddleware, async (req, res) => {
    const { username, email, phoneNumber } = req.body;

    try {
        const updatedUser = await userService.updateUser(req.user.id, { username, email, phoneNumber });
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Път за актуализиране на парола потребител
userController.put('/profile/update-password', authMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        await userService.updatePassword(req.user.id, oldPassword, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Път за актуализиране на имейл потребител
userController.put('/profile/update-email', authMiddleware, async (req, res) => {
    const { password, newEmail } = req.body;

    try {
        await userService.updateEmail(req.user.id, password, newEmail);
        res.json({ message: 'Email updated successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Път за актуализиране на username на потребител
userController.put('/profile/update-username', authMiddleware, async (req, res) => {
    const { password, newUsername } = req.body;

    try {
        await userService.updateUsername(req.user.id, password, newUsername);
        res.json({ message: 'Username updated successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Път за актуализиране на телефонен номер на потребител
userController.put('/profile/update-phone', authMiddleware, async (req, res) => {
    const { password, newPhoneNumber } = req.body;

    try {
        await userService.updatePhoneNumber(req.user.id, password, newPhoneNumber);
        res.json({ message: 'Phone number updated successfully' });
    } catch (err) {
        res.json({ message: err.message });
    }
});

export default userController;