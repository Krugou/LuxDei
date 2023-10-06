import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/city/index.css';
import io from 'socket.io-client';

export const VideoPlayer = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const [viewCount, setViewCount] = useState(1); // Initialize view count to 1
  const { options, onReady } = props;
  const [room] = useState('room1');
  const [socket, setSocket] = useState(null);






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

      // Dispose the Video.js player when unmounting
      return () => {
        if (playerRef.current && !playerRef.current.isDisposed()) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }
  })

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
          <div>Live View Count: {viewCount}</div>
        </div>
      </>
  );
};

VideoPlayer.propTypes = {
  options: PropTypes.object.isRequired,
  onReady: PropTypes.func.isRequired,
};

export default VideoPlayer;
