import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { VideoFeedContext } from '../../../contexts/VideoFeedContext';
const LiveStreamButton = ({ name, navigate, lastItem = false }) => {
  const { isVideoFeedOnline } = useContext(VideoFeedContext);

  return (
    <li>
      <button
        className={`nav-button ${
          lastItem ? 'mx-2 ' : 'md:mx-5'
        } text-lg rounded bg-gmdeepred p-1 md:p-2 font-bold transition-all text-gmgold hover:text-gmneonyellow hover:text-xl ${
          isVideoFeedOnline ? 'animate-pulse' : ''
        }`}
        onClick={() => {
          navigate(`/${name}`);
        }}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
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
