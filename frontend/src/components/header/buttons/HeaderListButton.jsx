import PropTypes from 'prop-types';
import React from 'react';

const ListButton = ({name, navigate, lastItem = false}) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <li>
            <button
                className={`nav-button ${lastItem ? '' : 'mx-5'} text-blue-300`}
                onClick={() => {
                    navigate(`/${name}`);
                }}
            >
                {capitalized}
            </button>
        </li>
    );
};
ListButton.propTypes = {
    name: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    lastItem: PropTypes.bool
};

export default ListButton;