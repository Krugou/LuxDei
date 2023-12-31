/**
 * A button component for the header navigation list.
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the button.
 * @param {function} props.navigate - The function to navigate to the button's destination.
 * @param {boolean} [props.lastItem=false] - Whether the button is the last item in the list.
 * @returns {JSX.Element} - The HeaderListButton component.
 */
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ArticleIcon from '@mui/icons-material/Article';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PortraitIcon from '@mui/icons-material/Portrait';
import TheatersIcon from '@mui/icons-material/Theaters';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
const HeaderListButton = ({name, navigate, lastItem = false, isOnline}) => {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const capitalized = capitalize(name);



    return (
        <li>
            <button
                className={` nav-button ${lastItem ? 'mx-2' : 'md:mx-5'} text-lg text-white transition-all hover:text-gray-300 hover:text-xl mx-2 ${isOnline ? 'animate-pulse' : ''}`}
                onClick={() => {
                    navigate(`/${name}`);
                }}
            >


                <div className="md:hidden">
                    {name === 'admin' && <AdminPanelSettingsIcon aria-hidden="true" />}
                    {name === 'login' && <LoginIcon aria-hidden="true" />}
                    {name === 'logout' && <LogoutIcon aria-hidden="true" />}
                    {name === 'profile' && <PortraitIcon aria-hidden="true" />}
                    {name === 'register' && <AppRegistrationIcon aria-hidden="true" />}
                    {name === 'articles' && <ArticleIcon aria-hidden="true" />}
                    {name === 'livestream' && <LiveTvIcon aria-hidden="true" />}
                    {name === 'movies' && <TheatersIcon aria-hidden="true" />}
                </div>
                <div className="hidden md:block" >{capitalized}</div>
            </button>
        </li>
    );
};
HeaderListButton.propTypes = {
    name: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    lastItem: PropTypes.bool,
    isOnline: PropTypes.bool,
};

export default HeaderListButton;
