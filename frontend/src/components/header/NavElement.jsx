import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import {useUser} from '../../hooks/ApiHooks';
import HeaderTitle from './HeaderTitle';
import HeaderListButton from './buttons/HeaderListButton';
import WeatherData from './weather/WeatherData';
const NavElement = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const {getUserInfoByToken} = useUser();
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const getUserInfo = async () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      const user = await getUserInfoByToken(userToken);

      console.log(user, 'userinfomaan');
      if (user) {
        setUser(user);
        const target = location.pathname === '/' ? '/' : location.pathname;
        navigate(target);
        return;
      }
    }
    navigate('/');
  };

  useEffect(() => {
    getUserInfo();
  }, []); // jos taulukko tyhjä, ajetaan vain kerran

  return (
    <nav className='p-4 bg-gray-700 sticky top-0 w-full z-10'>
      <div className='container mx-auto flex justify-between items-center relative'>
        <HeaderTitle />

        <WeatherData />

        <ul id='nav-links' className={` md:flex flex-row ${isNavOpen ? 'flex' : 'hidden '}`}>
          {user ? (
            <>
              <HeaderListButton name='profile' navigate={navigate} />
              <HeaderListButton name='logout' navigate={navigate} />
            </>
          ) : (
            <>
              <HeaderListButton name='login' navigate={navigate} />
              <HeaderListButton name='register' navigate={navigate} />
            </>
          )}

          <HeaderListButton name='livestream' navigate={navigate} />
          <HeaderListButton
            name='articles'
            navigate={navigate}
            lastItem={true}
          />
        </ul>
        <div
          id='mobile-menu-button'
          className='text-white md:hidden cursor-pointer'
          onClick={toggleNav}
        >
          {isNavOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </div>
      </div>
    </nav>
  );
};

export default NavElement;
