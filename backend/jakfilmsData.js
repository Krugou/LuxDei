// app.js

import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import authRoute from './routes/authRoute.js';
import secureRoute from './routes/secureRoute.js';

import passport from './utils/pass.js';
import { config } from 'dotenv';

// Use the import.meta.url to get the directory of the current module
const __dirname = new URL('.', import.meta.url).pathname;

// Load environment variables from .env file
config({ path: `${__dirname}.env` });

const connectPort = 3002;
const app = express();
const http = createServer(app);

const startTime = new Date();
console.log(
  ' Backend database server start time: ' + startTime.toLocaleString()
);
app.get('/', (req, res) => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  res.send(`
    <h1>This is backend server calling</h1>
    <h2>It's running on port ${connectPort}</h2>
    <p>Start time: ${startTime.toLocaleString()}</p>
    <p>Uptime: ${hours} hours, ${minutes} minutes, ${seconds} seconds</p>
  `);
});

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

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
app.use('/auth', authRoute);
app.use('/secure', secureRoute);

http.listen(connectPort, () => {
  console.log('Server started on port ' + connectPort);
});
