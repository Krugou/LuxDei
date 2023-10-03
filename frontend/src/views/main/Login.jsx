import React, {useRef, useState, useContext } from 'react';
import useForm from '../../hooks/FormHooks';
import { useUser } from '../../hooks/ApiHooks';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { postLogin } = useUser();
  const navigate = useNavigate();
  const {setUsername, setCountryId} = useContext(UserContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      `Username: ${usernameRef.current.value}, Password: ${passwordRef.current.value}`
    );
    const inputs = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    // Add logic to authenticate user here
    try {
      const loginResult = await postLogin(inputs);
      localStorage.setItem('userToken', loginResult.token);
      //setUser(loginResult.user);
      setUsername(loginResult.user.username);
      setCountryId(loginResult.user.countryId);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
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
