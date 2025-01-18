import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Contact from '../models/Contact.js';

const userService = {
    // Метод за извличане на всички потребители
    async getAllUsers() {
        return await User.find();
    },

    // Метод за регистриране на нов потребител
    async register(username, phoneNumber, email, password) {
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

        const user = new User({ username, phoneNumber, email, password });
        const savedUser = await user.save();

        const userWithoutPassword = savedUser.toObject();
        delete userWithoutPassword.password;

        return userWithoutPassword;
    },

    // Метод за логване на потребител
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
           // { expiresIn: '1h' }
        );

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return { token, user: userWithoutPassword };
    },

    // Метод за извличане на един потребител посредсвтом неговото id
    async getUserById(id) {
        const user = await User.findById(id).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },

    // Метод за актуализиране на един потребител
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

    // Метод за актуализиране на паролата на един потребител
    async updatePassword(id, oldPassword, newPassword) {
        const user = await User.findById(id);
        
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            throw new Error("Wrong password")
        }

        user.password = newPassword;
        await user.save();
        return { message: 'Password updated successfully' };
    },

    // Метод за актуализиране на имейл на един потребител
    async updateEmail(id, password, newEmail) {
        const user = await User.findById(id);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Wrong password")
        }

        user.email = newEmail;
        await user.save();
        return { message: 'Email updated successfully' };
    },

    // Метод за актуализиране на username-ма на един потребител
    async updateUsername(id, password, newUsername) {
        const user = await User.findById(id);
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Wrong password")
        }

        user.username = newUsername;
        await user.save();
        return { message: 'Username updated successfully' };
    },

    // Метод за актуализиране на телефона на един потребител

    async updatePhoneNumber(id, password, newPhoneNumber) {
        const user = await User.findById(id);
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Wrong password")
        }

        user.phoneNumber = newPhoneNumber;
        await user.save();
        return { message: 'Username updated successfully' };
    },

    // Метод за изтриване на един потребител

    async deleteProfile(userId, password) {
        try {
            const user = await User.findById(userId);

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return { message: "Wrong password" }
            }

            user.contacts.forEach(async (contact) => {
                await Contact.findByIdAndDelete(contact.toString());
            });

            await User.findByIdAndDelete(userId);

            if (!user) {
                throw new Error("User not found");
            }

            return { message: "success" }
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
};

export default userService;