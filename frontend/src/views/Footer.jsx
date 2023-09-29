import React from 'react';
import {useNavigate} from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <footer className="bg-gray-800 text-gray-400 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <p>&copy; {new Date().getFullYear()} My Awesome Website</p>
                <ul className="flex space-x-4">
                    <li>
                        <button onClick={() => handleNavigation('/')}>Home</button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigation('/about')}>About Us</button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigation('/contact')}>Contact</button>
                    </li>
                </ul>
                <ul className="flex space-x-4">
                    <li>
                        <button onClick={() => handleNavigation('/services')}>Services</button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigation('/blog')}>Blog</button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigation('/portfolio')}>Portfolio</button>
                    </li>
                </ul>
                <ul className="flex space-x-4">
                    <li>
                        <button onClick={() => handleNavigation('/privacy-policy')}>Privacy Policy</button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigation('/terms-of-service')}>Terms of Service</button>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
