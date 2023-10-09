import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
  name: String,
  likes: Number,
  dislikes: Number,
});

const LikeModel = mongoose.model('LikeModel', LikeSchema);

export default LikeModel;
