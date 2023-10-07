import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

const LiveStreamButton = ({name, navigate, lastItem = false}) => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkOnlineStatus = async () => {
      try {
        const response = await fetch('http://195.148.104.124:1935/jakelu/jakfilms/manifest.mpd');
        setIsOnline(response.ok);
      } catch (error) {
        setIsOnline(false);
      }
    };
    checkOnlineStatus();
  }, []);

  return (
    <li>
      <button
        className={`nav-button ${lastItem ? 'mx-2' : 'md:mx-5'} text-lg rounded bg-gmgold p-1 font-bold transition-all hover:text-gray-700 hover:text-xl mx-2 ${isOnline ? 'animate-pulse' : ''}`}
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