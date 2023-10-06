import React, {useContext,useEffect,useState} from 'react';
import Chat from '../../components/main/Chat';
import NoUser from '../../components/main/NoUser';
import VideoPlayer from '../../components/main/VideoPlayer';
import {UserContext} from '../../contexts/UserContext';
import io from 'socket.io-client';

const LiveStream = () => {
  const {user} = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState('room1');

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

  if (!socket) {
    return null;
  }
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: 'http://195.148.104.124:1935/jakelu/jakfilms/manifest.mpd',
        type: 'application/dash+xml',
      },
    ],
    playbackRates: [0.5, 1, 1.5, 2],
    liveui: true,
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      // videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      // videojs.log('player will dispose');
    });
  };
  // only for testing
  // const generateUsername = () => {
  //   const adjectives = [
  //     'happy',
  //     'sad',
  //     'angry',
  //     'excited',
  //     'sleepy',
  //     'hungry',
  //     'thirsty',
  //     'silly',
  //     'goofy',
  //     'crazy',
  //   ];
  //   const nouns = [
  //     'cat',
  //     'dog',
  //     'bird',
  //     'fish',
  //     'hamster',
  //     'turtle',
  //     'lion',
  //     'tiger',
  //     'bear',
  //     'elephant',
  //   ];
  //   const randomAdjective =
  //     adjectives[Math.floor(Math.random() * adjectives.length)];
  //   const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  //   return `${randomAdjective}-${randomNoun}`;
  // };
  // const countries = ['FI', 'DK', 'NO', 'SE', 'IS', 'EE'];
  // const randomCountry = countries[Math.floor(Math.random() * countries.length)];

  return (
    <section className='border rounded flex flex-col md:flex-row justify-center items-center md:items-start p-2 '>
      <VideoPlayer
        className='w-2/3 h-full '
        options={videoJsOptions}
        onReady={handlePlayerReady} socket={socket}
      />
      {/* dev usage only */}
      {/* <Chat
        className=' '
        username={generateUsername()}
        countryid={randomCountry}
      /> */}
      {/* <Chat className=" " username={''} countryid={''} /> */}
      {/* real one next  */}
      {user ? (
        <Chat className='' socket={socket} username={user.name} countryid={user.countryid} room={room} setRoom={setRoom} />
      ) : (
          <NoUser />
      )}
    </section>
  );
};

export default LiveStream;
