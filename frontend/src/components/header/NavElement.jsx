import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import HeaderListButton from './buttons/HeaderListButton';

const NavElement = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className='p-4 bg-gray-700 sticky top-0 w-full z-10'>
      <div className='container mx-auto flex justify-between items-center relative'>
        <button onClick={() => {navigate('/')}} className='text-white text-2xl font-bold'>
          Jak Films
        </button>
        <ul id='nav-links' className={isNavOpen ? 'md:flex' : 'hidden md:flex'}>

          <HeaderListButton name="login" navigate={navigate} />
          <HeaderListButton name="register" navigate={navigate} />

          <HeaderListButton name="livestream" navigate={navigate}  />
          <HeaderListButton name="articles" navigate={navigate} lastItem={true} />

        </ul>
        <div
          id='mobile-menu-button'
          className='text-white md:hidden cursor-pointer'
          onClick={toggleNav}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default NavElement;
