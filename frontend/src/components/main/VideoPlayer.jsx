import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/city/index.css';
import * as player from 'video.js';

export const VideoPlayer = (props) => {

  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const [viewCount, setViewCount] = useState(0); // Added viewCount state
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        // videojs.log('player is ready');
        onReady && onReady(player);
      });

      // Attach an event listener to increment viewCount when the video plays
      player.on('play', () => {
        setViewCount((prevCount) => prevCount + 1);
      });

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
      <>
        <div data-vjs-player className="w-full h-full ">
          <div ref={videoRef} className="video-js   vjs-theme-city " >
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
  onReady: PropTypes.func.isRequired
};

export default VideoPlayer;
