import {ThumbDown, ThumbUp} from '@mui/icons-material';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

const LikesElement = ({user, location}) => {
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [socket, setSocket] = useState(null);
	const [likeClicked, setLikeClicked] = useState(false);
	const [disLikeClicked, setdisLikeClicked] = useState(false);

	useEffect(() => {
		try {
			// Create a new socket connection when the component mounts
			const newSocket = io('/', {
				path: '/backend/socket.io',
				transports: ['websocket'],
			});
			// const newSocket = io('http://localhost:3001/');
			setSocket(newSocket);
			newSocket.emit('getInitialLikeCounts', location);

			// Remove the socket connection when the component unmounts
			return () => {
				newSocket.disconnect();
			};
		} catch (error) {
			console.error('Error establishing socket connection:', error);
		}
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on('initialLikeCounts', ({likes, dislikes}) => {
				setLikes(likes);
				setDislikes(dislikes);
			});
			socket.on('likeCountsUpdated', ({likes, dislikes}) => {
				setLikes(likes);
				setDislikes(dislikes);
			});
		}
	}, [socket]);

	const handleLike = () => {
		const data = {location: location, userId: user._id};
		if (likeClicked) {
			console.log(
				'🚀 ~ file: LikesElement.jsx:49 ~ handleLike ~ likeClicked:',
				likeClicked
			);

			setLikeClicked(false);
			try {
				socket.emit('unliked', data, (response) => {
					if (response.error) {
						console.error(response.error);
						return;
					}
					if (response.data.location === location) {
						setLikes(likes + -1);
					}
				});
			} catch (error) {
				console.error(error);
				return;
			}
		} else {
			setLikeClicked(true);
			setdisLikeClicked(false); // undo dislike
			try {
				socket.emit('liked', data, (response) => {
					if (response.error) {
						console.error(response.error);
						return;
					}
					if (response.data.location === location) {
						setLikes(likes + 1);
					}
				});
			} catch (error) {
				console.error(error);
				return;
			}
		}
	};

	const handleDislike = () => {
		const data = {location: location, userId: user._id};
		if (disLikeClicked) {
			setdisLikeClicked(false);
			try {
				socket.emit('undisliked', data, (response) => {
					if (response.error) {
						console.error(response.error);
						return;
					}
					if (response.data.location === location) {
						setDislikes(dislikes + -1);
					}
				});
			} catch (error) {
				console.error(error);
				return;
			}
		} else {
			setdisLikeClicked(true);
			setLikeClicked(false); // undo like
			try {
				socket.emit('disliked', data, (response) => {
					if (response.error) {
						console.error(response.error);
						return;
					}
					if (response.data.location === location) {
						setDislikes(dislikes + 1);
					}
				});
			} catch (error) {
				console.error(error);
				return;
			}
		}
	};

	return (
		<>
			{user ? (
				<div className='flex mt-2 pointer'>
					<ThumbUp
						onClick={handleLike}
						className={likeClicked ? 'text-green-500' : ''}
					/>
					<span className='mx-2'>{likes}</span>
					<ThumbDown
						onClick={handleDislike}
						className={disLikeClicked ? 'text-red-500' : ''}
					/>
					<span className='mx-2'>{dislikes}</span>
				</div>
			) : (
				<div className='flex mt-2'>
					<ThumbUp />
					<span className='mx-2'>{likes}</span>
					<ThumbDown />
					<span className='mx-2'>{dislikes}</span>
				</div>
			)}
		</>
	);
};
LikesElement.propTypes = {
	user: PropTypes.shape({
		_id: PropTypes.string.isRequired,
	}).isRequired,
	location: PropTypes.string.isRequired,
};

export default LikesElement;
