import React from 'react';
import PropTypes from 'prop-types';

const TeamMember = (props) => {
    const {imgSrc, altText, name, role} = props;

    return (
        <div className="bg-alegreen rounded-lg shadow-md p-4 md:p-6">
            <img
                src={imgSrc}
                alt={altText}
                className="w-24 md:w-32 h-24 md:h-32 rounded-full mx-auto mb-2 md:mb-4"
            />
            <h2 className="text-lg md:text-xl font-semibold mybasetext">{name}</h2>
            <p className="text-gray-600 mybasetext">{role}</p>
        </div>
    );
};

TeamMember.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
};

export default TeamMember;