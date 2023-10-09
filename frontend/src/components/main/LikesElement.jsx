import {ThumbDown, ThumbUp} from '@mui/icons-material';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

const LikesElement = ({user, location}) => {
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [socket, setSocket] = useState(null);
	const [prevLikedStatus, setPrevLikedStatus] = useState(false);
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
		const storedLikeStatus = localStorage.getItem(`${location}LikeStatus`);
		if (storedLikeStatus === true) {
			setPrevLikedStatus(true);
		} else if (storedLikeStatus === false) {
			setPrevLikedStatus(false);
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

		try {
			localStorage.setItem(`${location}LikeStatus`, true);
			setPrevLikedStatus(true);
			
		} catch (error) {
			console.error(error);
			return;
		}
	};

	const handleDislike = () => {
		const data = {location: location, userId: user._id};
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

		try {
			localStorage.setItem(`${location}LikeStatus`, false);
			setPrevLikedStatus(false);
		} catch (error) {
			console.error(error);
			return;
		}
	};


	return (
		<>
			{user ? (
				<div className='flex mt-2 '>
					<ThumbUp onClick={handleLike} />
					<span className='mx-2'>{likes}</span>
					<ThumbDown onClick={handleDislike} />
					<span className='mx-2'>{dislikes}</span>
				</div>
			) : (
				<div className='flex mt-2'>
					<ThumbUp style={{cursor: 'pointer'}} />
					<span className='mx-2'>{likes}</span>
					<ThumbDown style={{cursor: 'pointer'}} />
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
