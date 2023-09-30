import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const NavElement = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className='p-4 bg-gray-700 sticky top-0 w-full z-10'>
      <div className='container mx-auto flex justify-between items-center relative'>
        <a href='#' className='text-white text-2xl font-bold'>
          Jak Films
        </a>
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
        <ul id='nav-links' className={isNavOpen ? 'md:flex' : 'hidden md:flex'}>
          <li>
            <button
              className='nav-button mr-10 text-blue-300'
              onClick={() => {
                navigate('/login');
              }}
            >
              Log In NOW
            </button>
          </li>
          <li>
            <button
              className='nav-button mr-10 text-blue-300'
              onClick={() => {
                navigate('/register');
              }}
            >
              Register NOW
            </button>
          </li>
          <li>
            <button
              className='nav-button mr-10 text-blue-300'
              onClick={() => {
                navigate('/articles');
              }}
            >
              Articles
            </button>
          </li>
          <li>
            <button
              className='nav-button text-blue-300'
              onClick={() => {
                navigate('/livestream');
              }}
            >
              Livestream
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavElement;
