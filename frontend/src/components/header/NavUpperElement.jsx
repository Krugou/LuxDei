import React from 'react';

import { useNavigate } from 'react-router-dom';

const NavUpperElement = () => {
  const navigate = useNavigate();

  return (
    <nav className=' p-4 bg-gray-700 sticky top-0 w-full z-10'>
      <div className='container mx-auto flex justify-between items-center relative'>
        <a href='#' className='text-white text-2xl font-bold'>
          Jak Films
        </a>
        <div
          id='mobile-menu-button'
          className='text-white md:hidden cursor-pointer'
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
        <ul id='nav-links' className='hidden md:flex'>
          <li>
            <a href='#' className='text-white underline mr-2'>
              Home
            </a>
          </li>
          <li>
            <a href='#stream' className='text-white underline mr-2'>
              Stream & Chat
            </a>
          </li>
          <li>
            <a href='#articles' className='text-white underline mr-2'>
              Articles
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavUpperElement;
