import PropTypes from 'prop-types';
import React from 'react';

const FooterCopyright = (props) => {
    const {companyName} = props;

    return (
        <p className="text-center text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">&copy; {new Date().getFullYear()} {companyName}</p>
    );
};

FooterCopyright.propTypes = {
    companyName: PropTypes.string.isRequired,
};

export default FooterCopyright;