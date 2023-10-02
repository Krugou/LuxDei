import React from 'react';
import PropTypes from 'prop-types';

const PrivacySection = (props) => {
    const {title, content} = props;

    return (
        <div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">{title}</h2>
            <p className="mt-2 text-gray-600">{content}</p>
        </div>
    );
};

PrivacySection.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default PrivacySection;