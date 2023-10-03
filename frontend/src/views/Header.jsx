import React from 'react';
import HeaderTitle from '../components/header/HeaderTitle';
import NavElement from '../components/header/NavElement';
import NavUpperElement from '../components/header/NavUpperElement';
const Header = () => {
  return (
    <header>
      <NavUpperElement startSeconds={50} endSeconds={200} />
      <NavElement />
      <HeaderTitle />
    </header>
  );
};

export default Header;
