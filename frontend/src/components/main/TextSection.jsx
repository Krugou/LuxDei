import React from 'react';
import PropTypes from 'prop-types';

const TextSection = (props) => {
    const {title, content} = props;

    return (
        <div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">{title}</h2>
            <p className="mt-2 text-gray-600">{content}</p>
        </div>
    );
};

TextSection.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default TextSection;