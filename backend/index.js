import express, { request } from 'express';
import { mongoDBURL, PORT } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// middleware for pasing request body
app.use(express.json());

// middleware for handling cors policy
app.use(cors());
// app.use(cors({
//     origin: 'https://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

// route for main
app.get('/', (request, response) => {
    console.log('Hello World!');
    return response.status(234).send('Hello World!');
});

// route for books
app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Database connection failed: ', error);
    });