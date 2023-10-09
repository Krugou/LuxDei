import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const FooterListButton = ({ name }) => {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  name = name.replace(/\s+/g, '');
  const navigate = useNavigate();
  return (
    <li className='p-2'>
      <button
        onClick={() => {
          navigate(`/${name}`);
        }}
        className='mx-3 text-sm sm:text-md md:text-lg lg:text-xl text-white transition hover:text-gray-300'
        aria-label={`Go to ${capitalized}`}
        title={`Go to ${capitalized}`}
      >
        {capitalized}
      </button>
    </li>
  );
};

FooterListButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FooterListButton;
