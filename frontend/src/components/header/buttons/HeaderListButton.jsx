import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PortraitIcon from '@mui/icons-material/Portrait';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import PropTypes from 'prop-types';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ArticleIcon from '@mui/icons-material/Article';
import React from 'react';
const HeaderListButton = ({name, navigate, lastItem = false}) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <li>
            <button
                className={` nav-button ${lastItem ? 'mx-5' : 'mx-5'} text-lg text-white transition-all hover:text-gray-300 hover:text-xl`}
                onClick={() => {
                    navigate(`/${name}`);
                }}
            >
                <div className="md:hidden">
                    {name === 'login' && <LoginIcon />}
                    {name === 'logout' && <LogoutIcon />}
                    {name === 'profile' && <PortraitIcon />}
                    {name === 'register' && <AppRegistrationIcon />}
                    {name === 'articles' && <ArticleIcon />}
                    {name === 'livestream' && <LiveTvIcon />}
                    

                </div>
                <div className="hidden md:block">{capitalized}</div>
            </button>
        </li>
    );
};
HeaderListButton.propTypes = {
    name: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    lastItem: PropTypes.bool
};

export default HeaderListButton;
