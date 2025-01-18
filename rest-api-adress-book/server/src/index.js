import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import routes from './routes.js';

try {
    await mongoose.connect('mongodb://localhost:27017', { dbName: 'addressBook' });
    console.log('DB Connected!');
} catch (err) {
    console.log('Cannot connect to DB!');
}

const app = express();

app.use(express.json());
app.use('/images', express.static("src/images"));
app.use(cors({
    origin: 'http://localhost:4200',
}));

app.use('/api', routes);

app.listen(5000, () => console.log('Server is listening on http://localhost:5000/api'));