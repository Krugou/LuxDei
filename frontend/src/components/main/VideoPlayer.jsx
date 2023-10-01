import PropTypes from 'prop-types';
import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
export const VideoPlayer = (props) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const {options, onReady} = props;

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

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;

            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options, videoRef]);

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
                    .vjs-theme-city .vjs-control-bar {
                        font-size: 2em;

                        background-color: #153640;
                    }
                    .vjs-paused {
                        font-size: 1.2em;
                    }
                    .vjs-playing {
                        
                        font-size: 1em;
                    }
                    .vjs-icon-placeholder:before , .vjs-playback-rate {
                        color: #876484;

                    }
                    .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
                        content: "";
                        background-color: #white;
                       
                        background-repeat: no-repeat;
                        background-size: 4rem;
                        background-position: 55% calc(50% - 0px);
                        border: none !important;
                        box-shadow: none !important;
                    }
                    .vjs-big-play-button:hover {
                        background-color: rgba(255, 255, 255, 1);
                    }
                `}</style>
                </div>
            </div>

        </>);
};
VideoPlayer.proptypes = {
    options: PropTypes.object.isRequired,
    onReady: PropTypes.func.isRequired
};

export default VideoPlayer;