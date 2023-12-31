import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
	location: String,
	likes: {
		type: Number,
		default: 0, // Initialize likes count to 0
	},
	dislikes: {
		type: Number,
		default: 0, // Initialize dislikes count to 0
	},
	likedBy: [
		{
			userId: String,
		},
	],
	disLikedBy: [
		{
			userId: String,
		},
	],
});

const LikeModel = (location) => {
	const modelName = `${location.replace(/\s+/g, '')}Likes`;
	return mongoose.model(modelName, LikeSchema);
};

export default LikeModel;
