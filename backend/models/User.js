import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  countryid: String,
  userrole: {
    type: Number,
    default: 1, // Set the default value to 1
  },
});

const User = mongoose.model('User', userSchema);

export default User;
