import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  likes: Number,
  dislikes: Number,
});

const VideoLikes = mongoose.model('VideoLikes', VideoSchema);

export default VideoLikes;
