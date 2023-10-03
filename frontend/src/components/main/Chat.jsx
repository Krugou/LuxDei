import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {FlagIcon} from "react-flag-kit";
import io from 'socket.io-client';

const Chat = ({username, countryid}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('room1');
  const [socket, setSocket] = useState(null);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const handleTyping = (event) => {
    if (event.target.value !== "") {
      setIsTyping(true);
      socket.emit("typing", {username, room});
    } else {
      setIsTyping(false);
      socket.emit("stop typing", {username, room});
    }
  };
  // Function to handle room changes
  const handleRoomChange = (event) => {
    // console.log('room change happened');
    const newRoom = event.target.value;

    setRoom(newRoom);
    setMessages([]); // Clear messages when changing rooms

    // Emit leave room and join room events to the server
    socket.emit('leave room', room);
    socket.emit('join room', newRoom);
    socket.emit('get messages', newRoom);
  };

  // Function to handle message submission
  const handleSubmit = (event) => {
    // console.log('submit worked');
    event.preventDefault();
    const newMessage = {
      username,
      message,
      room,
    };
    // Emit the new message to the server
    socket.emit('chat message', newMessage);
    setMessage('');
  };

  useEffect(() => {
    // Create a new socket connection when the component mounts
    const newSocket = io('/', {path: '/socket.io', transports: ['websocket']});
    // const newSocket = io('/');
    setSocket(newSocket);

    // Remove the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const handleMessage = (data) => {
        // console.log('chat message received:', data);
        // console.log('current room:', room);
        if (data.room === room) {
          // console.log('chat message received in room:', data.room);
          // console.log('current messages:', messages);
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      };
      socket.on("typing", ({username}) => {
        setTypingUsers((typingUsers) => [...typingUsers, username]);
        console.log('typingUsers: ', typingUsers);
      });

      socket.on("stop typing", ({username}) => {
        setTypingUsers((typingUsers) => typingUsers.filter((user) => user !== username));
      });
      // Add the chat message listener
      socket.on('chat message', handleMessage);

      // Remove the chat message listener when the component unmounts
      return () => {
        socket.off('chat message', handleMessage);
      };
    }
  }, [socket, messages, room]);
  useEffect(() => {
    // Set isPulsing to true when new messages arrive
    setIsPulsing(true);
    // Remove the animate-pulse class after 1 second
    setTimeout(() => {
      setIsPulsing(false);
    }, 1000);
  }, [messages]);
  return (
    <div className='flex flex-col'>
      {typingUsers.length > 0 && (
        <div className="text-xs text-gray-500 bg-black">
          {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
        </div>
      )}
      <ul
        id="messages"
        className={`flex flex-col bg-white m-4  shadow-lg rounded-md p-4  overflow-y-auto `}
      >
        {messages.map((message, index) => (
          <li
            key={index}
            className={`flex flex-col mb-2 ${message.username === username ? "items-end" : "items-start"
              }`}
          >
            <div
              className={`rounded-lg py-2 px-3 ${message.username === username
                ? "bg-black text-white"
                : "bg-black text-white"
                }`}
            >
              <p className={`text-sm ${isPulsing ? 'animate-bounce' : ''}`}>{message.message}</p>
            </div>
            <span
              className={`text-xs mt-1 border rounded ${message.username === username ? "text-right" : "text-left"
                }`}
            >
              {message.username}
              <FlagIcon code={countryid} size={20} />
            </span>

          </li>
        ))}
      </ul>
      <form className=" flex  items-center justify-end bottom-0.5 " onSubmit={handleSubmit}>
        {/* Room selection dropdown */}
        <div className='flex  p-4 flex-col  justify-center items-center'>
          <select
            title="selector"
            name="room"
            id="room"
            value={room}
            onChange={handleRoomChange}
            className={`text-white block w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${room === 'room1' ? 'bg-black text-white' : room === 'room2' ? 'bg-black text-white' : 'bg-black text-white'}focus:border-transparent `}
            aria-label='Select a chat room'
          >
            <option className="bg-black text-white " value="room1">Silver Screen Lounge</option>
            <option className="bg-black text-white" value="room2">Director's Cut Den</option>
            <option className="bg-black text-white" value="room3">Cinephile's Hangout</option>
          </select>


          {/* Message input */}
          <div className='flex flex-row rounded border'>
            <textarea
              id="m"
              rows="1"
              className=" p-4  w-full h-50    "
              type="text"
              placeholder="Type your message here"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleTyping}
              onKeyUp={handleTyping}
              aria-label='Type your message here'
            />

            {/* Submit button */}
            <button
              type="submit"
              className="inline-flex justify-center my-auto mx-2 border rounded   cursor-pointer hover:bg-gmpictonblue "
            >
              <svg
                fill="currentColor"
                className="w-6 h-6 "
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"

                viewBox="0 0 80.593 122.88"
                enableBackground="new 0 0 80.593 122.88"
                xmlSpace="preserve"
              >
                {/* Your submit button icon */}
                <g>
                  <polygon points="0,0 30.82,0 80.593,61.44 30.82,122.88 0,122.88 49.772,61.44 0,0" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </form>

    </div>

  );
}; Chat.defaultProps = {
  username: 'anon',
  countryid: 'FI',
};
Chat.propTypes = {
  username: PropTypes.string.isRequired,
  countryid: PropTypes.string.isRequired,
};

export default Chat;
