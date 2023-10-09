import PropTypes from 'prop-types';
import React from 'react';

const FooterCopyright = (props) => {
  const { companyName } = props;

  return (
    <p
      className='pt-4 text-center text-gray-500 text-sm border-t border-gmgold sm:text-base md:text-lg lg:text-xl'
      aria-label={`Copyright ${new Date().getFullYear()} ${companyName}`}
      title={`Copyright ${new Date().getFullYear()} ${companyName}`}
    >
      &copy; {new Date().getFullYear()} {companyName}
    </p>
  );
};

FooterCopyright.propTypes = {
  companyName: PropTypes.string.isRequired,
};

export default FooterCopyright;
