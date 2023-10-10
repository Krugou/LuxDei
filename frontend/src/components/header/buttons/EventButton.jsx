import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
const EventButton = ({name, navigate, lastItem = false, isOnline}) => {
  return (
      <li>
        <button
            className="button"
            onClick={() => {
              navigate(`/${name}`);
            }}
        >{name}
        </button>
      </li>
  );
};
EventButton.propTypes = {
  name: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  lastItem: PropTypes.bool,
  isOnline: PropTypes.bool,
};

export default EventButton;

