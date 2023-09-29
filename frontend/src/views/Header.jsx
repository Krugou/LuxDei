import React from 'react';
import HeaderTitle from '../components/header/HeaderTitle';
import NavElement from '../components/header/NavElement';
import NavUpperElement from '../components/header/NavUpperElement';
const Header = () => {
  return (
    <header>
      <NavUpperElement />
      <NavElement />
      <HeaderTitle />
    </header>
  );
};

export default Header;
