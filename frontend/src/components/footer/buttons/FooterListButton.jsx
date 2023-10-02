import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

const FooterListButton = ({name}) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    name = name.replace(/\s+/g, '');
    const navigate = useNavigate();
    return (
        <li className='p-2'>
            <button
                onClick={() => {
                    navigate(`/${name}`);
                }}
                className='border rounded m-2 p-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl '
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
