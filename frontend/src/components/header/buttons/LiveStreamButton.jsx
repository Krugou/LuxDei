import PropTypes from 'prop-types';
import React from 'react';
const LiveStreamButton = ({name, navigate, lastItem = false, }) => {

  return (
      <li>
        <button
            className={` nav-button ${lastItem ? 'mx-2' : 'md:mx-5'} text-lg rounded bg-gmgold p-1 font-bold transition-all hover:text-gray-700 hover:text-xl mx-2`}
            onClick={() => {
              navigate(`/${name}`);
            }}
        >Livestream
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
