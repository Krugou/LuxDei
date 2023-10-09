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
		}
	}, [socket]);

	const handleLike = (likedstatus) => {
		const data = {location: location, userId: user.id};
		if (likedstatus === prevLikedStatus) {
			// If the current status is the same as the previous status
			socket.emit('undo', data); // Emit an "undo" event
			setLikes(likes - (likedstatus ? 1 : 0)); // Decrement likes by 1 if the previous status was "liked"
			setDislikes(dislikes - (likedstatus ? 0 : 1)); // Decrement dislikes by 1 if the previous status was "disliked"
			localStorage.setItem('likeStatus', ''); // Clear the like status from localStorage
			setPrevLikedStatus(false); // Reset the previous status to "not liked"
		} else {
			// If the current status is different from the previous status
			if (likedstatus) {
				socket.emit('liked', data);
				setLikes(likes + 1);
				localStorage.setItem(`${location}LikeStatus`, true);
			} else {
				socket.emit('disliked', data);
				setDislikes(dislikes + 1);
				localStorage.setItem(`${location}LikeStatus`, false);
			}
			setPrevLikedStatus(likedstatus); // Set the previous status to the current status
		}
	};

	return (
		<>
			{user ? (
				<div className='flex mt-2'>
					<ThumbUp
						onClick={handleLike(true)}
						style={{cursor: 'pointer'}}
					/>
					<span className='mx-2'>{likes}</span>
					<ThumbDown
						onClick={handleLike(false)}
						style={{cursor: 'pointer'}}
					/>
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
		id: PropTypes.string.isRequired,
	}).isRequired,
	location: PropTypes.string.isRequired,
};

export default LikesElement;
