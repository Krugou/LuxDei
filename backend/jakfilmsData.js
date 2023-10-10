// app.js
import {config} from 'dotenv';
config();

import express from 'express';
import {createServer} from 'http';
import mongoose from 'mongoose';
import {Server} from 'socket.io';
import authRoute from './routes/authRoute.js';
import secureRoute from './routes/secureRoute.js';
import userRoutes from './routes/userRoutes.js';

import ChatMessage from './models/ChatMessage.js';
import LikeModel from './models/Likes.js';
import User from './models/User.js';
import passport from './utils/pass.js';

const connectPort = 3002;
const app = express();
const http = createServer(app);
const io = new Server(http);
const maxSavedMessages = 300;
const startTime = new Date();
console.log(
	' Backend database server start time: ' + startTime.toLocaleString()
);
app.get('/', (req, res) => {
	const uptime = process.uptime();
	const hours = Math.floor(uptime / 3600);
	const minutes = Math.floor((uptime % 3600) / 60);
	const seconds = Math.floor(uptime % 60);
	res.send(`
    <h1>This is backend server calling</h1>
    <h2>It's running on port ${connectPort}</h2>
    <p>Start time: ${startTime.toLocaleString()}</p>
    <p>Uptime: ${hours} hours, ${minutes} minutes, ${seconds} seconds</p>
    `);
});

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

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

// Use user routes
app.use('/users', userRoutes);
app.use('/auth', authRoute);
app.use('/secure', passport.authenticate('jwt', {session: false}), secureRoute);
let totalViewers = 0;
let liveViewers = 0;

io.on('connection', (socket) => {
	socket.on('NewLiveViewer', (data) => {
		// console.log('NewLiveViewer', data);
		liveViewers++;
		totalViewers++;
		io.emit('LiveViewers', liveViewers);
		io.emit('TotalViewers', totalViewers);
	});

	socket.on('getInitialLikeCounts', async (location) => {
		try {
			const locationCleaned = `${location.replace(/\s+/g, '')}`;

			const Like = LikeModel(locationCleaned);
			const likeDocuments = await Like.find();
			// console.log('likeDocuments: ', likeDocuments);
			let likes = 0;
			let dislikes = 0;
			likeDocuments.forEach((likeDocument) => {
				likes += likeDocument.likes;
				dislikes += likeDocument.dislikes;
			});
			// console.log('initialLikeCounts: ', likes, dislikes);
			socket.emit('initialLikeCounts', {likes, dislikes});
		} catch (error) {
			console.error('Error getting initial like counts:', error);
		}
	});

	let isHandlingLike = false;

	socket.on('liked', async (data) => {
		if (isHandlingLike) {
			return;
		}
		isHandlingLike = true;
		try {
			// console.log('liked: ', data.userId, data.location);
			const locationCleaned = `${data.location.replace(/\s+/g, '')}`;
			const Like = LikeModel(locationCleaned);

			// Check if userId is found in the likedBy array
			const likeDocument = await Like.findOne({'likedBy.userId': data.userId});
			if (likeDocument) {
				// console.log(`User ${data.userId} has already liked this location.`);
			} else {
				const existingLike = await Like.findOne({location: data.location});
				if (!existingLike) {
					const like = new Like({
						location: data.location,
						disLikedBy: [{userId: 1}],
						likedBy: [{userId: 1}],
						likes: 0,
						dislikes: 0,
					});
					await like.save();
				} else {
					// console.log(`Like for location ${data.location} already exists.`);
				}
				await Like.updateOne(
					{location: data.location},
					{$push: {likedBy: {userId: data.userId}}, $inc: {likes: 1}}
				);
				// io.emit('likeSuccess', data.location);
				// Update the like counts for the location and emit the new counts to all clients
				const likeDocuments = await Like.find();
				let likes = 0;
				let dislikes = 0;
				likeDocuments.forEach((likeDocument) => {
					likes += likeDocument.likes;
					dislikes += likeDocument.dislikes;
				});
				console
					.log
					// `Like counts updated: likes=${likes}, dislikes=${dislikes}`
					();
				io.emit('likeCountsUpdated', {likes, dislikes});
			}
		} catch (error) {
			console.error('Error handling like:', error);
			io.emit('likeError', error.message);
		} finally {
			isHandlingLike = false;
		}
	});

	let isHandlingDislike = false;

	socket.on('disliked', async (data) => {
		if (isHandlingDislike) {
			return;
		}
		isHandlingDislike = true;
		try {
			// console.log('disliked: ', data.userId, data.location);
			const locationCleaned = `${data.location.replace(/\s+/g, '')}`;
			const Like = LikeModel(locationCleaned);

			// Check if userId is found in the disLikedBy array
			const likeDocument = await Like.findOne({
				'disLikedBy.userId': data.userId,
			});
			if (likeDocument) {
				// console.log(`User ${data.userId} has already disliked this location.`);
			} else {
				const existingLike = await Like.findOne({location: data.location});
				if (!existingLike) {
					const like = new Like({
						location: data.location,
						likedBy: [{userId: 1}],
						disLikedBy: [{userId: 1}],
						likes: 0,
						dislikes: 0,
					});
					await like.save();
				} else {
					// console.log(`Like for location ${data.location} already exists.`);
				}
				await Like.updateOne(
					{location: data.location},
					{$push: {disLikedBy: {userId: data.userId}}, $inc: {dislikes: 1}}
				);

				// Update the like counts for the location and emit the new counts to all clients
				const likeDocuments = await Like.find();
				let likes = 0;
				let dislikes = 0;
				likeDocuments.forEach((likeDocument) => {
					likes += likeDocument.likes;
					dislikes += likeDocument.dislikes;
				});
				// console.log(
				// 	`Like counts updated: likes=${likes}, dislikes=${dislikes}`
				// );
				io.emit('likeCountsUpdated', {likes, dislikes});
			}
		} catch (error) {
			console.error('Error handling dislike:', error);
			io.emit('dislikeError', error.message);
		} finally {
			isHandlingDislike = false;
		}
	});

	socket.on('unliked', async (data) => {
		try {
			// console.log('unliked: ', data.userId, data.location);
			const locationCleaned = `${data.location.replace(/\s+/g, '')}`;
			const Like = LikeModel(locationCleaned);
			// Decrement the like count for the location in the database
			const unlikeDocument = await Like.findOne({
				'likedBy.userId': data.userId,
			});
			if (!unlikeDocument) {
				// console.log(`User ${data.userId} has already unliked this location.`);
			} else {
				await Like.updateOne(
					{location: data.location},
					{$pull: {likedBy: {userId: data.userId}}, $inc: {likes: -1}}
				);

				// Update the like counts for the location and emit the new counts to all clients
				const likeDocuments = await Like.find();
				let likes = 0;
				let dislikes = 0;
				likeDocuments.forEach((likeDocument) => {
					likes += likeDocument.likes;
					dislikes += likeDocument.dislikes;
				});
				// console.log(
				// 	`Like counts updated: likes=${likes}, dislikes=${dislikes}`
				// );
				io.emit('likeCountsUpdated', {likes, dislikes});
			}
		} catch (err) {
			console.error(err);
		}
	});

	socket.on('undisliked', async (data) => {
		try {
			// console.log('undisliked: ', data.userId, data.location);
			const locationCleaned = `${data.location.replace(/\s+/g, '')}`;
			const Like = LikeModel(locationCleaned);
			// Decrement the dislike count for the location in the database
			const undislikeDocument = await Like.findOne({
				'disLikedBy.userId': data.userId,
			});
			if (!undislikeDocument) {
				// console.log(
				// 	`User ${data.userId} has already undisliked this location.`
				// );
			} else {
				await Like.updateOne(
					{location: data.location},
					{$pull: {disLikedBy: {userId: data.userId}}, $inc: {dislikes: -1}}
				);

				// Update the like counts for the location and emit the new counts to all clients
				const likeDocuments = await Like.find();
				let likes = 0;
				let dislikes = 0;
				likeDocuments.forEach((likeDocument) => {
					likes += likeDocument.likes;
					dislikes += likeDocument.dislikes;
				});
				// console.log(
				// 	`Like counts updated: likes=${likes}, dislikes=${dislikes}`
				// );
				io.emit('likeCountsUpdated', {likes, dislikes});
			}
		} catch (err) {
			console.error(err);
		}
	});

	// console.log(socket.id, ' has entered the building');
	// const ip = socket.request.connection.remoteAddress;

	// console.log(`Client connected with IP address: ${ip}`);
	socket.on('disconnect', () => {
		// console.log(socket.id, ' has left the building');
		if (liveViewers > 0) {
			liveViewers--;
		}
		io.emit('LiveViewers', liveViewers);
	});
	socket.on('join room', (room) => {
		// console.log(socket.id, ' joined room: ', room);
		socket.join(room);
		ChatMessage.find({room: room})
			.sort({createdAt: -1})
			.limit(maxSavedMessages)
			.then((messages) => {
				messages.forEach((message) => {
					socket.emit('chat message', {
						countryid: message.countryid,
						username: message.username,
						message: message.message,
						room: message.room,
					});
				});
			})
			.catch((err) =>
				console.error('Error retrieving chat messages from MongoDB', err)
			);
		// Count the number of users in the room
		const roomSize = io.sockets.adapter.rooms.get(room)?.size || 0;

		// Emit the user count to all users in the room
		io.to(room).emit('user count', roomSize);
	});
	socket.on('leave room', (room) => {
		// console.log(socket.id, ' left room: ', room);
		socket.leave(room);
		const roomSize = io.sockets.adapter.rooms.get(room)?.size || 0;

		// Emit the user count to all users in the room
		io.to(room).emit('user count', roomSize);
	});
	socket.on('chat message', async (data) => {
		try {
			// console.log(data.username, ' sent message: ', data.message);
			// Find the user with the matching username
			const user = await User.findOne({name: data.username});

			// Check if the user was found and the userId matches the user._id property
			if (user && user._id.toString() === data.user_id) {
				// Save chat message to MongoDB
				const chatMessage = new ChatMessage({
					countryid: data.countryid,
					username: data.username,
					message: data.message,
					room: data.room,
				});
				await chatMessage.save();
				// console.log('Mongodb saved message: ' + data.message);
				io.to(data.room).emit('chat message', {
					countryid: data.countryid,
					username: data.username,
					message: data.message,
					room: data.room,
				});
			} else {
				// console.log('User not found or userId does not match');
			}
		} catch (error) {
			console.error('Error saving chat message to MongoDB', error);
		}
		// Delete chat messages older than 48 hours from MongoDB

		const cutoffDate = new Date(Date.now() - 48 * 60 * 60 * 1000);
		ChatMessage.deleteMany({createdAt: {$lt: cutoffDate}})
			.then(() => {
				// Do nothing
				// console.log('Chat messages older than 48 hours deleted from MongoDB')
			})
			.catch((err) =>
				console.error('Error deleting chat messages from MongoDB', err)
			);
	});

	socket.on('typing', ({username, room}) => {
		// console.log('typing: ', username, room);
		socket.broadcast.to(room).emit('typing', {username});
		// console.log('typing event emitted successfully');
	});
	socket.on('stop typing', ({username, room}) => {
		// console.log('stop typing: ', username, room);
		socket.broadcast.to(room).emit('stop typing', {username});
	});
	socket.on('get messages', (room) => {
		// console.log('get messages for room: ', room);
		ChatMessage.find({room: room})
			.sort({createdAt: -1})
			.limit(1)
			.then((messages) => {
				if (messages.length > 0) {
					const latestMessage = messages[0];
					// console.log('latest message: ', latestMessage);
					socket.broadcast.to(room).emit('typing', {username});
					socket.emit('chat message', {
						countryid: latestMessage.countryid,
						username: latestMessage.username,
						message: latestMessage.message,
						room: latestMessage.room,
						userId: latestMessage.userId,
					});
				}
			})
			.catch((err) =>
				console.error('Error retrieving chat messages from MongoDB', err)
			);
	});
});

http.listen(connectPort, () => {
	// console.log('Server started on port ' + connectPort);
});
