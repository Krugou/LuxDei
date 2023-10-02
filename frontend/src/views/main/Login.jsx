import React, { useRef, useState } from 'react';
import useForm from '../../hooks/FormHooks';

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Username: ${usernameRef.current.value}, Password: ${passwordRef.current.value}`
    );
    // Add logic to authenticate user here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center '
    >
      <div className='bg-white shadowz-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col'>
        <div className='mb-4'>
          <label
            className='block text-gray-700 font-bold mb-2'
            htmlFor='username'
          >
            Username
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            type='text'
            ref={usernameRef}
            placeholder='Enter your username'
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            ref={passwordRef}
            placeholder='Enter your password'
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Sign In
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
