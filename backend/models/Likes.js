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

const LikeModel = (location) => {
	const modelName = `${location.replace(/\s+/g, '')}Likes`;
	return mongoose.model(modelName, LikeSchema);
};

export default LikeModel;
