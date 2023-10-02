import React, { useRef, useState } from 'react';
import { useUser } from '../../hooks/ApiHooks';

const Register = () => {
  const { postUser, getCheckUser } = useUser();
  const [errorMessage, setErrorMessage] = useState('');

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
    } catch (error) {
      error === 'Username already exists' && setErrorMessage(error.error);
      console.log(error, 'error');
      console.log(error.message, 'error message');
      console.log(error.message.error, 'error message');
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
        <span className='text-lg font-medium mb-2'>Username:</span>
        <input
          type='text'
          ref={usernameRef}
          className='border border-gray-400 rounded-lg p-2 w-full'
        />
        {/* Display the error message */}
        {errorMessage && <p className='text-orange-500'>{errorMessage}</p>}
      </label>
      <label className='flex flex-col items-start mt-4'>
        <span className='text-lg font-medium mb-2'>Email:</span>
        <input
          type='email'
          ref={emailRef}
          className='border border-gray-400 rounded-lg p-2 w-full'
        />
      </label>
      <label className='flex flex-col items-start mt-4'>
        <span className='text-lg font-medium mb-2'>Password:</span>
        <input
          type='password'
          ref={passwordRef}
          className='border border-gray-400 rounded-lg p-2 w-full'
        />
      </label>
      <label className='flex flex-col items-start mt-4'>
        <span className='text-lg font-medium mb-2'>Country:</span>
        <select
          ref={countryRef}
          className='border border-gray-400 rounded-lg p-2 w-full'
        >
          <option value='fi'>Finland</option>
          <option value='dk'>Denmark</option>
          <option value='no'>Norway</option>
          <option value='se'>Sweden</option>
        </select>
      </label>
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Register
      </button>
    </form>
  );
};

export default Register;
