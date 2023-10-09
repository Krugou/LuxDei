import PropTypes from 'prop-types';
import React, {useEffect, useState, useContext} from 'react';
import io from 'socket.io-client';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import '@videojs/themes/dist/city/index.css';
import {UserContext} from '../../contexts/UserContext';
export const VideoPlayer = (props) => {
  const {user} = useContext(UserContext);
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const [liveViewerCount, setLiveViewCount] = useState(0);
  const [totalViewerCount, setTotalViewCount] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const {options, onReady} = props;
  const [socket, setSocket] = useState(null);
  const [userActions, setUserActions] = useState({});
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

      newSocket.emit('getInitialLikeCounts', user.id);

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
    // Check localStorage for the user's like/dislike status when the component mounts
    const storedLikeStatus = localStorage.getItem('likeStatus');
    const storedDislikeStatus = localStorage.getItem('dislikeStatus');

    if (storedLikeStatus === 'liked') {
      setHasLiked(true);
    } else if (storedDislikeStatus === 'disliked') {
      setHasDisliked(true);
    }
  }, []);

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

  useEffect(() => {
    if (socket) {
      socket.on('initialLikeCounts', ({ likes, dislikes }) => {
        setLikes(likes);
        setDislikes(dislikes);
      });
    }
  }, [socket]);

  const handleLike = () => {
    if (hasLiked) {
      // If the user has already liked the video, clicking again will undo the action
      // Decrease the likes count and emit an 'undoLikeVideo' event to the server
      setLikes(likes - 1);
      socket.emit('undoLikeVideo', user.id);
      // Remove the like status from localStorage
      localStorage.removeItem('likeStatus');
    } else if (!hasDisliked) {
      // If the user hasn't liked the video yet and has not disliked it, proceed to like it
      // Increase the likes count and emit a 'likeVideo' event to the server
      setLikes(likes + 1);
      socket.emit('likeVideo', user.id);
      // Set the like status in localStorage
      localStorage.setItem('likeStatus', 'liked');
      // Remove the dislike status from localStorage (if any)
      localStorage.removeItem('dislikeStatus');
    } else if (hasDisliked) {
      // If the user has disliked the video and clicks on like, remove the dislike
      // Decrease the dislikes count and emit an 'undoDislikeVideo' event to the server
      setDislikes(dislikes - 1);
      socket.emit('undoDislikeVideo', user.id);
      // Proceed to like the video
      setLikes(likes + 1);
      socket.emit('likeVideo', user.id);
      // Update the local storage accordingly
      localStorage.setItem('likeStatus', 'liked');
      localStorage.removeItem('dislikeStatus');
    }
    setHasLiked(!hasLiked); // Toggle the hasLiked state
    setHasDisliked(false); // Ensure hasDisliked is set to false
  };

  const handleDislike = () => {
    if (hasDisliked) {
      // If the user has already disliked the video, clicking again will undo the action
      // Decrease the dislikes count and emit an 'undoDislikeVideo' event to the server
      setDislikes(dislikes - 1);
      socket.emit('undoDislikeVideo', user.id);
      // Remove the dislike status from localStorage
      localStorage.removeItem('dislikeStatus');
    } else if (!hasLiked) {
      // If the user hasn't disliked the video yet and has not liked it, proceed to dislike it
      // Increase the dislikes count and emit a 'dislikeVideo' event to the server
      setDislikes(dislikes + 1);
      socket.emit('dislikeVideo', user.id);
      // Set the dislike status in localStorage
      localStorage.setItem('dislikeStatus', 'disliked');
      // Remove the like status from localStorage (if any)
      localStorage.removeItem('likeStatus');
    } else if (hasLiked) {
      // If the user has liked the video and clicks on dislike, remove the like
      // Decrease the likes count and emit an 'undoLikeVideo' event to the server
      setLikes(likes - 1);
      socket.emit('undoLikeVideo', user.id);
      // Proceed to dislike the video
      setDislikes(dislikes + 1);
      socket.emit('dislikeVideo', user.id);
      // Update the local storage accordingly
      localStorage.setItem('dislikeStatus', 'disliked');
      localStorage.removeItem('likeStatus');
    }
    setHasDisliked(!hasDisliked); // Toggle the hasDisliked state
    setHasLiked(false); // Ensure hasLiked is set to false
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
              <div className="flex mt-2">
                <ThumbUp style={{ cursor: "pointer" }} />
                <span className="mx-2">{likes}</span>
                <ThumbDown style={{ cursor: "pointer" }} />
                <span className="mx-2">{dislikes}</span>
              </div>
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
