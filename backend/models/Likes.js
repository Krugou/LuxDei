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

const LikeModel = (location) => mongoose.model(`${location}Likes`, LikeSchema);

export default LikeModel;
