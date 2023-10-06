// src/components/VideoPlayer.js
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/city/index.css';
import io from 'socket.io-client';

export const VideoPlayer = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const [viewCount, setViewCount] = useState(0);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Establish a WebSocket connection to the server
    const socket = io('http://localhost:3001');

    // Notify the server that a user joined and update the view count
    socket.emit('userJoined');
    setViewCount((prevCount) => prevCount + 1);

    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));

      // Listen for WebSocket updates when a user leaves
      socket.on('userLeft', () => {
        setViewCount((prevCount) => prevCount - 1);
      });
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);

      // Listen for WebSocket updates when a user leaves
      socket.on('userLeft', () => {
        setViewCount((prevCount) => prevCount - 1);
      });
    }

    // Dispose the Video.js player and close the WebSocket connection when unmounting
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      socket.disconnect(); // Close the WebSocket connection
    };
  }, [options, videoRef, onReady]);

  return (
      <>
        <div data-vjs-player className="w-full h-full">
          <div ref={videoRef} className="video-js vjs-theme-city">
            <style jsx>{`
            .video-js {
              width: 100%;
              height: 100%;
            }
          `}</style>
          </div>
          <div>View Count: {viewCount}</div>
        </div>
      </>
  );
};

VideoPlayer.propTypes = {
  options: PropTypes.object.isRequired,
  onReady: PropTypes.func.isRequired,
};

export default VideoPlayer;
