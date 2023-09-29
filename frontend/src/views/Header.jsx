import React from 'react';
import HeaderTitle from '../components/header/HeaderTitle';
import NavElement from '../components/header/NavElement';
import NavUpperElement from '../components/header/NavUpperElement';
const Header = () => {

    return (
        <header>
            <NavUpperElement />
            <HeaderTitle />
            <NavElement />
        </header>
    );
};

export default Header;
