import express from 'express';
import {createServer} from 'http';
import mongoose from 'mongoose';

const connectPort = 3002;
const app = express();
const http = createServer(app);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.set('view engine', 'ejs');

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

// Define a schema for the "users" collection
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    countryid: String, // Assuming 'countryid' is part of your data model
});

// Create a model for the "users" collection
const User = mongoose.model('User', userSchema);

// Create a new user document and save it to the database
const user = new User({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    countryid: 'fi',
});

user.save()
    .then(() => {
        console.log('User saved to the database');
    })
    .catch((err) => {
        console.error('Error saving user to the database', err);
    });

// Define routes for CRUD operations
app.get('/users', (req, res) => {
    User.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.error('Error getting users from the database', err);
            res.status(500).json({error: 'Error getting users from the database'});
        });
});
// Assuming you have a Mongoose model called "User" for the "users" collection
app.get('/clear-users', async (req, res) => {
    try {
        const result = await User.deleteMany({});
        res.send(`Deleted ${result.deletedCount} users`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting users');
    }
});
app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }
            res.json(user);
        })
        .catch((err) => {
            console.error('Error getting user from the database', err);
            res.status(500).json({error: 'Error getting user from the database'});
        });
});

app.post('/users', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        countryid: req.body.countryid,
    });

    newUser
        .save()
        .then(() => {
            res.json({message: 'User saved to the database'});
        })
        .catch((err) => {
            console.error('Error saving user to the database', err);
            res.status(500).json({error: 'Error saving user to the database'});
        });
});

app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            countryid: req.body.countryid,
        },
        {new: true}
    )
        .then((user) => {
            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }
            res.json({message: 'User updated in the database'});
        })
        .catch((err) => {
            console.error('Error updating user in the database', err);
            res.status(500).json({error: 'Error updating user in the database'});
        });
});

app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }
            res.json({message: 'User deleted from the database'});
        })
        .catch((err) => {
            console.error('Error deleting user from the database', err);
            res.status(500).json({error: 'Error deleting user from the database'});
        });
});

http.listen(connectPort, () => {
    console.log('Server started on port ' + connectPort);
});
