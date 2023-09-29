import React from 'react';
import NavUpperElement from '../components/header/NavUpperElement';

const Header = () => {
    return (
        <header>
            <NavUpperElement />
            <h1 className='flex flex-col'>My Website</h1>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
