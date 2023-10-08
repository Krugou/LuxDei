import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import {VideoFeedContext} from '../../../contexts/VideoFeedContext';
const LiveStreamButton = ({name, navigate, lastItem = false}) => {
  const {isVideoFeedOnline} = useContext(VideoFeedContext);
  

  return (
    <li>
      <button
        className={`nav-button ${lastItem ? 'mx-2' : 'md:mx-5'} text-lg rounded bg-gmgold p-1 font-bold transition-all hover:text-gray-700 hover:text-xl mx-2 ${isVideoFeedOnline ? 'animate-pulse' : ''}`}
        onClick={() => {
          navigate(`/${name}`);
        }}
      >
        {name.charAt(0).toUpperCase() +
          name.slice(1)}
      </button>
    </li>
  );
};

LiveStreamButton.propTypes = {
  name: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  lastItem: PropTypes.bool,
};

export default LiveStreamButton;