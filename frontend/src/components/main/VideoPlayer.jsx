import PropTypes from 'prop-types';
import React, {useEffect, useState, useContext} from 'react';
import io from 'socket.io-client';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import '@videojs/themes/dist/city/index.css';
import {UserContext} from '../../contexts/UserContext';
import Chat from './Chat.jsx';
import NoUser from './NoUser.jsx';
export const VideoPlayer = (props) => {
  const {user} = useContext(UserContext);
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const [liveViewerCount, setLiveViewCount] = useState(0);
  const [totalViewerCount, setTotalViewCount] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const {options, onReady} = props;
  const [socket, setSocket] = useState(null);
  useEffect(() => {

    try {
      // Create a new socket connection when the component mounts
      const newSocket = io('/', {
        path: '/backend/socket.io',
        transports: ['websocket'],
      });
      // const newSocket = io('http://localhost:3001/');
      setSocket(newSocket);
      newSocket.emit('NewLiveViewer', true);

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
      socket.on('LiveViewers', (data) => {
        setLiveViewCount(data);
      });
      socket.on('TotalViewers', (data) => {
        setTotalViewCount(data);
      });

      // Remove the event listeners when the component unmounts
      return () => {
        socket.off('LiveViewers');
        socket.off('TotalViewers');
      };
    }
  }, [socket]);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));

      // Dispose the Video.js player when unmounting
      return () => {
        if (playerRef.current && !playerRef.current.isDisposed()) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, onReady]);

  const handleLike = () => {
    setLikes(likes + 1);
    socket.emit("likeVideo");
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
    socket.emit("dislikeVideo");
  };


  return (
    <>
      <div data-vjs-player className="w-full sm:w-2/3 md:min-w-2/3 h-full ">
        <div ref={videoRef} className="video-js vjs-theme-city">

          <style jsx>{`
            .video-js {
              width: 100%;
              height: 100%;
            }
          `}</style>
          {liveViewerCount > 0 && totalViewerCount > 0 && (
            <div className="absolute bottom-12 right-0 bg-gray-800 z-10 text-white p-2 opacity-20 hover:opacity-80 transition-opacity duration-300 bg-transparent">
              <div className="text-lg font-bold">Viewers: {liveViewerCount}</div>
              <div className="text-sm">Viewed: {totalViewerCount}</div>
            </div>
          )}
        </div>
        {user ? (
            <div className="flex mt-2">
              <ThumbUp onClick={handleLike} style={{ cursor: "pointer" }} />
              <span className="mx-2">{likes}</span>
              <ThumbDown onClick={handleDislike} style={{ cursor: "pointer" }} />
              <span className="mx-2">{dislikes}</span>
            </div>
        ) : (
            <div></div>
        )}
      </div>
    </>
  );
};

VideoPlayer.propTypes = {
  options: PropTypes.object.isRequired,
  onReady: PropTypes.func.isRequired,
};

export default VideoPlayer;
