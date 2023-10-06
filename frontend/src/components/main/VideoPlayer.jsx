import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// import '@videojs/themes/dist/city/index.css';
export const VideoPlayer = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const [liveViewerCount, setLiveViewCount] = useState(0);
  const [totalViewerCount, setTotalViewCount] = useState(0);
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
    }
  }
  );
  useEffect(() => {
    if (playerRef.current) {
      // Create a custom text track to display the viewer count
      const countTrack = playerRef.current.addRemoteTextTrack(
        {
          kind: 'metadata',
          label: 'Viewer Count',
          language: 'en',
        },
        false
      );
      countTrack.mode = 'showing';

      // Update the viewer count when it changes
      const updateCount = () => {
        const countText = `Live Viewers: ${liveViewerCount} | Total Viewers: ${totalViewerCount}`;
        const cue = new VTTCue(0, 0, countText);
        countTrack.addCue(cue);
        console.log('updateCount', countText)
        
      };
      updateCount();
      socket.on('LiveViewers', updateCount);
      socket.on('TotalViewers', updateCount);
    }
  }, [playerRef.current, liveViewerCount, totalViewerCount]);
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
  });

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
        <div>Live View Count: {liveViewerCount}</div>
        <div>Total View Count: {totalViewerCount}</div>
      </div>
    </>
  );
};

VideoPlayer.propTypes = {
  options: PropTypes.object.isRequired,
  onReady: PropTypes.func.isRequired,
};

export default VideoPlayer;
