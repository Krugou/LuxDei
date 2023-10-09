import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
	likes: Number,
	dislikes: Number,
	location: String,
	likedBy: [
		{
			userId: String,
		},
	],
});

const LikeModel = mongoose.model('Like', LikeSchema);

export default LikeModel;
