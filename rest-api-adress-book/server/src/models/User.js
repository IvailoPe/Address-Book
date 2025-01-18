import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Схема на потребител
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact'}],
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const isHashed = /^\$2[aby]\$/.test(this.password);
        if (!isHashed) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

export default User;
