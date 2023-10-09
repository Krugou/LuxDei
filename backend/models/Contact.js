import mongoose from 'mongoose';

// Define the Contact schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  usernamewhensent: {
    type: String,
    required: true,
  },
  useridofsender: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Mongoose model using the schema
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
