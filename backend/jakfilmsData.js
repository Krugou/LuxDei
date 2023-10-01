// app.js

import express from 'express';
import {createServer} from 'http';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';

const connectPort = 3002;
const app = express();
const http = createServer(app);

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Serve static files

// Connect to the MongoDB database
mongoose
    .connect('mongodb://localhost/jakfilms', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

// Use user routes
app.use('/users', userRoutes);

http.listen(connectPort, () => {
    console.log('Server started on port ' + connectPort);
});