const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/jakfilms', {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
    age: Number
});

// Create a model for the "users" collection
const User = mongoose.model('User', userSchema);

// Create a new user document and save it to the database
const user = new User({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30
});

user.save()
    .then(() => {
        console.log('User saved to database');
    })
    .catch((err) => {
        console.error('Error saving user to database', err);
    });