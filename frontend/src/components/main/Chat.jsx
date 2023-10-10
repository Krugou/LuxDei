import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import PropTypes from 'prop-types';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {FlagIcon} from 'react-flag-kit';
import {useNavigate} from 'react-router-dom';
import io from 'socket.io-client';
import ErrorAlert from '../../components/main/ErrorAlert';
import {UserContext} from '../../contexts/UserContext';
import {useUser} from '../../hooks/ApiHooks';
const Chat = ({user}) => {
	const navigate = useNavigate();

	const [alert, setAlert] = useState('');
	const [chatAlert, setChatAlert] = useState('');

	const {setUser} = useContext(UserContext);

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [room, setRoom] = useState('room1');
	const [currentRoom, setCurrentRoom] = useState('room1');
	const [socket, setSocket] = useState(null);
	const [isPulsing, setIsPulsing] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [typingUsers, setTypingUsers] = useState([]);
	const [userCount, setUserCount] = useState(0);

	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const {getUserInfoByToken} = useUser();

	const handleEmojiSelect = (emoji) => {
		// console.log('handleEmojiSelect: ', emoji.native);
		if (emoji.native) {
			setMessage(message + emoji.native);
		}
	};
	const handleEmojiButtonClick = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};
	useEffect(() => {
		try {
			// Create a new socket connection when the component mounts
			const newSocket = io('/', {
				path: '/backend/socket.io',
				transports: ['websocket'],
			});
			// const newSocket = io('http://localhost:3001/');
			setSocket(newSocket);
			newSocket.emit('join room', room);

			// Remove the socket connection when the component unmounts
			return () => {
				newSocket.disconnect();
			};
		} catch (error) {
			console.error('Error establishing socket connection:', error);
		}
	}, []);

	const handleTypingIntoServer = (event) => {
		const username = user.name;
		console.log(username + ' is typing');
		if (event.target.value !== '') {
			if (!isTyping) {
				setIsTyping(true);
				socket.emit('typing', {username, room});
				setTimeout(() => {
					setIsTyping(false);
					socket.emit('stop typing', {username, room});
				}, 2000);
			}
		} else {
			setIsTyping(false);
			socket.emit('stop typing', {username, room});
		}
	};
	// Function to handle room changes
	const handleRoomChange = (event) => {
		const newRoom = event.target.value;

		setRoom(newRoom);
		setCurrentRoom(newRoom);
		setMessages([]); // Clear messages when changing rooms

		// Emit leave room and join room events to the server
		socket.emit('leave room', room);
		socket.emit('join room', newRoom);
	};
	const getUserInfo = async () => {
		if (location.pathname === '/logout') return;

		const userToken = localStorage.getItem('userToken');
		if (userToken) {
			try {
				const userFromDB = await getUserInfoByToken(userToken);
				// console.log(user, 'userinfomaan');
				if (userFromDB) {
					userFromDB !== user && setUser(user);
				}
			} catch (error) {
				setAlert('Your session has expired, please login again.');
				console.log('TOKEN ERROR');
				localStorage.removeItem('userToken');
				setTimeout(() => {
					setUser('');
				}, 2000);
			}
		}
	};
	// Function to handle message submission
	const handleSubmit = async (event) => {
		event.preventDefault();
		await getUserInfo();

		if (message.length > 500) {
			setChatAlert('Message exceeds the maximum character limit of 500.');
			return;
		}

		const newMessage = {
			countryid: user.countryid,
			username: user.name,
			message: message,
			room: room,
			user_id: user._id,
		};
		try {
			// Emit the new message to the server
			socket.emit('chat message', newMessage);
			setMessage('');
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	useEffect(() => {
		try {
			if (socket) {
				const handleMessage = (data) => {
					// console.log('data: ', data)
					if (data.room === room) {
						// console.log('message received:', data.countryid, data.username, data.message, data.room);
						setMessages((prevMessages) => [...prevMessages, data]);
						setIsPulsing(true);
					}
				};
				socket.on('chat message', handleMessage);
				return () => {
					socket.off('chat message', handleMessage);
				};
			}
		} catch (error) {
			console.error('Error in useEffect:', error);
		}
	}, [socket, messages, room]);

	useEffect(() => {
		try {
			// Set isPulsing to true when new messages arrive
			setIsPulsing(true);
			// Remove the animate-pulse class after 1 second
			setTimeout(() => {
				setIsPulsing(false);
			}, 1000);
		} catch (error) {
			console.error('Error in useEffect:', error);
		}
	}, [messages]);

	const handleTyping = ({name}) => {
		// console.log('Handletyping: ', name);
		try {
			// Log the current typingUsers state
			// console.log('Current typingUsers:', typingUsers);

			// Create a new Set with the current typingUsers array and the new user.name
			const uniqueTypingUsers = [...new Set([...typingUsers, name])];

			// Log the new uniqueTypingUsers array
			// console.log('New uniqueTypingUsers:', uniqueTypingUsers);

			setTypingUsers(uniqueTypingUsers);
		} catch (error) {
			console.error('Error updating typingUsers state:', error);
		}
	};

	const handleStopTyping = ({name}) => {
		try {
			// console.log('stop typing: ', user.name);
			setTypingUsers((prevTypingUsers) =>
				prevTypingUsers.filter((user) => user !== name)
			);
		} catch (error) {
			console.error('Error updating typingUsers state:', error);
		}
	};

	useEffect(() => {
		try {
			if (socket) {
				socket.on('typing', ({username}) => {
					// console.log('User is typing:', username);
					// Rest of your code...
					handleTyping({name: username});
				});
				return () => {
					socket.off('typing', ({username}) => {
						// console.log('User is typing:', username);
						// Rest of your code...
						handleTyping({name: username});
					});
				};
			}
		} catch (error) {
			console.error('Error in useEffect:', error);
		}
	}, [socket, messages, room]);

	useEffect(() => {
		try {
			if (socket) {
				socket.on('stop typing', ({username}) => {
					// console.log('stop typing: ', user.name);
					// Rest of your code...
					handleStopTyping({name: username});
				});
				return () => {
					socket.off('stop typing', ({username}) => {
						// console.log('stop typing: ', user.name);
						// Rest of your code...
						handleStopTyping({name: username});
					});
				};
			}
		} catch (error) {
			console.error('Error in useEffect:', error);
		}
	}, [socket, messages, room]);
	useEffect(() => {
		try {
			if (socket) {
				socket.on('user count', (count) => {
					// console.log('user count: ', count)
					setUserCount(count);
				});
				return () => {
					socket.off('user count');
				};
			}
		} catch (error) {
			console.error('Error in useEffect:', error);
		}
	}, [socket, messages]);
	const messagesRef = useRef(null);

	useEffect(() => {
		if (messagesRef.current) {
			messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
		}
	}, [messages]);
	return (
		<>
			{alert && (
				<ErrorAlert
					onClose={() => setAlert(null)}
					alert={alert}
				/>
			)}
			<div className='flex flex-col w-full md:w-4/12 sm:w-8/12  h-full'>
				<span className='bg-gmdeepblack rounded p-2 text-white  lg:w-1/2 w-3/4 text-center m-auto mb-4'>
					Users in current room: {userCount}
				</span>
				<ul
					id='messages'
					ref={messagesRef}
					className={`flex flex-col bg-white mt-4 ml-4 mr-4  ${
						showEmojiPicker ? 'h-10 md:h-10' : 'h-72 md:h-96'
					}  mt-auto shadow-lg rounded-md p-4  overflow-y-auto `}>
					{messages.map((message, index) => (
						<li
							key={index}
							className={`flex flex-col mb-2 ${
								message.username === user.name ? 'items-end' : 'items-start'
							}`}>
							<div
								className={`rounded-lg break-all word py-2 px-3 ${
									message.username === user.name
										? 'bg-black text-white'
										: 'bg-black text-white'
								}`}>
								<p
									className={`text-sm ${
										isPulsing &&
										message === messages[messages.length - 1] &&
										room === currentRoom
											? 'animate-bounce'
											: ''
									}`}>
									{message.message}
								</p>
							</div>
							<span
								className={`text-xs mt-1 border rounded ${
									message.username === user.name ? 'text-right' : 'text-left'
								}`}>
								{message.username.charAt(0).toUpperCase() +
									message.username.slice(1)}
								<FlagIcon
									className={` mx-2 ${
										message.username === user.name
											? 'float-right'
											: 'float-left'
									}`}
									code={message.countryid}
									size={20}
								/>
							</span>
						</li>
					))}
				</ul>
				{typingUsers.length > 0 && (
						<div
								className={`text-sm text-white p-1 bg-black w-3/4 rounded-b ml-4 ${
										isPulsing ? 'animate-pulse' : ''
								}`}>
							<span className='mr-1'>{typingUsers.join(', ')}</span>
							<span>{typingUsers.length === 1 ? 'is' : 'are'} typing...</span>
						</div>
				)}
				{showEmojiPicker && (
						<div className="m-auto">
							<Picker
									style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
									emojiSize={18}
									perLine={6}
									data={data}
									onEmojiSelect={handleEmojiSelect}
							/>
						</div>
				)}
				<button
					className='button m-auto w-1/2 mt-10'
					onClick={handleEmojiButtonClick}>
					{showEmojiPicker ? 'Click to close' : 'Emoji Selector 😀'}
				</button>
				<form
					className='flex items-center justify-center align-end mt-auto'
					onSubmit={handleSubmit}>
					{/* Room selection dropdown */}
					<div className='flex p-3 flex-col  justify-center items-center'>
						<select
							title='selector'
							name='room'
							id='room'
							value={room}
							onChange={handleRoomChange}
							className={`text-white block w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
								room === 'room1'
									? 'bg-black text-white'
									: room === 'room2'
									? 'bg-black text-white'
									: 'bg-black text-white'
							}focus:border-transparent `}
							aria-label='Select a chat room'>
							<option
								className='bg-black text-white '
								value='room1'>
								Silver Screen Lounge
							</option>
							<option
								className='bg-black text-white'
								value='room2'>
								Director's Cut Den
							</option>
							<option
								className='bg-black text-white'
								value='room3'>
								Cinephile's Hangout
							</option>
						</select>
						{chatAlert && (
							<ErrorAlert
								onClose={() => setChatAlert(null)}
								chatAlert={chatAlert}
							/>
						)}
						{/* Message input */}
						<div className='flex flex-row rounded border'>
							<input
								required
								id='m'
								rows='1'
								className=' p-4  w-full h-50    '
								type='text'
								placeholder='Type your message here'
								value={message}
								onChange={(event) => setMessage(event.target.value)}
								onKeyDown={handleTypingIntoServer}
								onKeyUp={handleTypingIntoServer}
								aria-label='Type your message here'
							/>

							{/* Submit button */}
							<button
								type='submit'
								className='inline-flex justify-center border rounded button items-center cursor-pointer hover:bg-gmpictonblue '>
								<svg
									fill='currentColor'
									className='w-6 h-6 '
									version='1.1'
									id='Layer_1'
									xmlns='http://www.w3.org/2000/svg'
									xmlnsXlink='http://www.w3.org/1999/xlink'
									x='0px'
									y='0px'
									viewBox='0 0 80.593 122.88'
									enableBackground='new 0 0 80.593 122.88'
									xmlSpace='preserve'>
									{/* Your submit button icon */}
									<g>
										<polygon points='0,0 30.82,0 80.593,61.44 30.82,122.88 0,122.88 49.772,61.44 0,0' />
									</g>
								</svg>
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

Chat.propTypes = {
	user: PropTypes.string,
};

export default Chat;
