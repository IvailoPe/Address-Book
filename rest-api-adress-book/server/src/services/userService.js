import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userService = {
    async getAllUsers() {
        return await User.find();
    },

    async register(username, phoneNumber, email, password, contacts) {
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            throw new Error('Username already exists');
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            throw new Error('Email already exists');
        }

        const existingUserByPhoneNumber = await User.findOne({ phoneNumber });
        if (existingUserByPhoneNumber) {
            throw new Error('Phone number already exists');
        }

        const user = new User({ username, phoneNumber, email, password, contacts });
        const savedUser = await user.save();

        const userWithoutPassword = savedUser.toObject();
        delete userWithoutPassword.password;

        return userWithoutPassword;
    },

    async login(username, password) {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('Invalid username or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid username or password');
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return { token, user: userWithoutPassword };
    },

    async getUserById(id) {
        const user = await User.findById(id).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },

    async updateUser(id, data) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        if (data.username && data.username !== user.username) {
            const existingUsername = await User.findOne({ username: data.username });
            if (existingUsername) {
                throw new Error('Username already exists');
            }
            user.username = data.username;
        }

        if (data.email && data.email !== user.email) {
            const existingEmail = await User.findOne({ email: data.email });
            if (existingEmail) {
                throw new Error('Email already exists');
            }
            user.email = data.email;
        }

        if (data.phoneNumber && data.phoneNumber !== user.phoneNumber) {
            const existingPhoneNumber = await User.findOne({ phoneNumber: data.phoneNumber });
            if (existingPhoneNumber) {
                throw new Error('Phone number already exists');
            }
            user.phoneNumber = data.phoneNumber;
        }

        await user.save();
        return { username: user.username, email: user.email, phoneNumber: user.phoneNumber };
    },

    async updatePassword(id, oldPassword, newPassword) {
        const user = await User.findById(id);
        if (!user || !(await user.comparePassword(oldPassword))) {
            throw new Error('Invalid old password');
        }

        user.password = newPassword;
        await user.save();
        return { message: 'Password updated successfully' };
    },
};

export default userService;