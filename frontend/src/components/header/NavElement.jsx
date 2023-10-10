import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useUser } from '../../hooks/ApiHooks';
import HeaderTitle from './HeaderTitle';
import HeaderListButton from './buttons/HeaderListButton';
import WeatherData from './weather/WeatherData';
import ErrorAlert from '../../components/main/ErrorAlert';
import { VideoFeedContext } from '../../contexts/VideoFeedContext';
const NavElement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [alert, setAlert] = useState('');

  const { getUserInfoByToken } = useUser();
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const [position, setPosition] = useState(null);
  const { isVideoFeedOnline } = useContext(VideoFeedContext);

  const getUserInfo = async () => {
    if (location.pathname === '/logout') return;

    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      try {
        const user = await getUserInfoByToken(userToken);
        // console.log(user, 'userinfomaan');
        if (user) {
          setUser(user);
          return;
        }
      } catch (error) {
        setAlert('Your session has expired, please login again.');
        console.log('TOKEN ERROR');
        localStorage.removeItem('userToken');
        setUser('');
      }
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // console.log('Latitude is :', latitude);
        // console.log('Longitude is :', longitude);
        setPosition({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error(error);
        setDefaultCoords();
      }
    );
  }, []);
  const setDefaultCoords = () => {
    setPosition({ lat: 60.2052, lon: 24.6564 }); // Default coordinates for Espoo
  };
  useEffect(() => {
    getUserInfo();
  }, [location]); // jos taulukko tyhjä, ajetaan vain kerran

  return (
    <>
      {alert && <ErrorAlert onClose={() => setAlert(null)} alert={alert} />}
      <nav className='p-4 bg-gmdeepblack border-b-4 border-gmgold  sticky top-0 w-full z-10'>
        <div className='container mx-auto flex justify-between items-center relative'>
          <HeaderTitle />

          {position && !isNavOpen && <WeatherData coords={position} />}

          <ul
            id='nav-links'
            className={` md:flex flex-row ${isNavOpen ? 'flex' : 'hidden '}`}
          >
            {user && user.userrole === 0 ? (
              <>
                <HeaderListButton name='admin' navigate={navigate} />
                <HeaderListButton name='profile' navigate={navigate} />
                <HeaderListButton name='logout' navigate={navigate} />
              </>
            ) : user ? (
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

            <HeaderListButton
              name='livestream'
              navigate={navigate}
              isOnline={isVideoFeedOnline}
            />
            <HeaderListButton name='movies' navigate={navigate} />
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
    </>
  );
};

export default NavElement;
