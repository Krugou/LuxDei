import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/ApiHooks';

const Register = () => {
  const { postUser } = useUser();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const countryRef = useRef('fi'); // Set the initial value for the select

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      `Username: ${usernameRef.current.value}, Email: ${emailRef.current.value}, Password: ${passwordRef.current.value}`
    );
    const userData = {
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      countryid: countryRef.current.value,
    };
    // INTEGROI SAMAAN FUNKTIOON
    /*
    try {
      const response = await getCheckUser(userData.name);
      console.log(response, 'checkUser Response');
    } catch (error) {
      alert(error);
    }
 */
    try {
      //const withoutConfirm = { ...inputs };
      //delete withoutConfirm.confirm;
      const response = await postUser(userData);
      console.log(response, 'Register Response');
      navigate('/');
    } catch (error) {
      error.message === 'Username already taken' &&
        setErrorMessage(error.message);
      console.log(error.message, 'error message');
    }

    // Add code here to submit form data to server
    /*

    fetch('http://jakfilms.northeurope.cloudapp.azure.com/backend/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        countryid: countryRef.current.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
      */
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
      <label className='flex flex-col items-start mt-4'>
        <span className='block text-gray-700 font-bold mb-2'>Username</span>
        <input
          type='text'
          ref={usernameRef}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          aria-label='Username'
          autoComplete='username'
        />
        {/* Display the error message */}
        {errorMessage && <p className='text-orange-500'>{errorMessage}</p>}
      </label>
      <label className='flex flex-col items-start mt-4'>
        <span className='block text-gray-700 font-bold mb-2'>Email</span>
        <input
          type='email'
          ref={emailRef}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          aria-label='Email'
          autoComplete='email'
        />
      </label>
      <label className='flex flex-col items-start mt-4'>
        <span className='block text-gray-700 font-bold mb-2'>Password</span>
        <input
          type='password'
          ref={passwordRef}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          aria-label='Password'
          autoComplete='new-password'
        />
      </label>
      <label className='flex flex-col items-center mt-4'>
        <span className='block text-gray-700 font-bold mb-2'>Country</span>
        <select
          ref={countryRef}
          className='border border-gray-400 rounded-lg p-2 w-full'
        >
          <option value='FI'>Finland</option>
          <option value='DK'>Denmark</option>
          <option value='NO'>Norway</option>
          <option value='SE'>Sweden</option>
          <option value='IS'>Iceland</option>
          <option value='EE'>Estonia</option>
          
        </select>
      </label>
      <button
        type='submit'
        className='bg-gray-700 transition hover:bg-gray-500 text-white mb-7 mt-7 font-bold py-2 px-4 rounded mt-4'
      >
        Register
      </button>
    </form>
  );
};

export default Register;
