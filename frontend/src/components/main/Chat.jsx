import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('Anonymous');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('room1');
  const [socket, setSocket] = useState(null);
  const [isPulsing, setIsPulsing] = useState(false);
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
    const newSocket = io('/', {path: '/react/socket.io', transports: ['websocket']});
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
    <section className={`border rounded p-4 `}>
      <form className="m-5 flex flex-col items-center" onSubmit={handleSubmit}>
        {/* Room selection dropdown */}
        <div className='flex m-4 p-4 flex-col md:flex-row justify-center items-center'>
          <select
            title="selector"
            name="room"
            id="room"
            value={room}
            onChange={handleRoomChange}
            className={`text-white block w-full py-2 px-3 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${room === 'room1' ? 'bg-aleviolet text-white' : room === 'room2' ? 'bg-alepurple text-white' : 'bg-alecharcoal text-white'}focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:mybasetext dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          >
            <option className="bg-aleviolet text-white " value="room1">Silver Screen Lounge</option>
            <option className="bg-alepurple text-white" value="room2">Director's Cut Den</option>
            <option className="bg-alecharcoal text-white" value="room3">Cinephile's Hangout</option>
          </select>

          {/* Username input */}
          <label
            htmlFor="u"
            className="text-white ml-2 my-2 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:mybasetext dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            Username:
          </label>
          <input
            id="u"
            className="block ml-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:mybasetext dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          {/* Message input */}
          <label
            htmlFor="m"
            className="text-white my-2 ml-2 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:mybasetext dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            Message:
          </label>
          <textarea
            id="m"
            rows="1"
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:mybasetext dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Type your message here"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          {/* Submit button */}
          <button
            type="submit"
            className="inline-flex justify-center p-2 text-alecharcoal bg-white rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
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
      </form>

      {/* Message list */}
      <ul
        id="messages"
        className={`flex flex-col bg-white m-4  shadow-lg rounded-md p-4 max-h-80 overflow-y-auto dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:mybasetext dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      >
        {messages.map((message, index) => (
          <li
            key={index}
            className={`flex flex-col mb-2 ${message.username === username ? "items-end" : "items-start"
              }`}
          >
            <div
              className={`rounded-lg py-2 px-3 ${message.username === username
                ? "bg-aleviolet text-white"
                : "bg-alepurple text-white"
                }`}
            >
              <p className={`text-sm ${isPulsing ? 'animate-bounce' : ''}`}>{message.message}</p>
            </div>
            <span
              className={`text-xs mt-1 ${message.username === username ? "text-right" : "text-left"
                }`}
            >
              {message.username}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Chat;
