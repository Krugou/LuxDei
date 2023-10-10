import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useUser } from '../../hooks/ApiHooks';
import { COUNTRIES } from '../../utils/countries';

import CountrySelector from '../../components/main/CountrySelector';

import ErrorAlert from '../../components/main/ErrorAlert';

const Register = () => {
  const { postUser, doLogin } = useUser();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState('FI');

  const { setUser, user } = useContext(UserContext);

  const [alert, setAlert] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const userData = {
      name: username,
      email,
      password,
      countryid: country,
    };
    console.log(userData);
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await postUser(userData);
      console.log(response, 'Register Response');

      const loginData = {
        username,
        password,
      };

      const loggedInUser = await doLogin(loginData);
      setUser(loggedInUser);
      navigate('/');
    } catch (error) {
      if (error.message === 'Username already taken') {
        setErrorMessage('Username is already taken');
      } else {
        setAlert(error.message);
      }
    }
  };

  return (
    <>
      {alert && <ErrorAlert onClose={() => setAlert(null)} alert={alert} />}

      <form
        onSubmit={handleSubmit}
        className='flex bg-gray-100  flex-col items-center'
      >
        {errorMessage && <p className='text-red-500 mt-1'>{errorMessage}</p>}
        <label className='flex flex-col items-start sm:mt-4 w-full sm:w-4/5 md:w-3/5 lg:w-2/6 2xl:w-3/12 p-2'>
          <span className='block text-gray-700 font-bold mb-2'>Username</span>
          <input
            type='text'
            ref={usernameRef}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            aria-label='Username'
            autoComplete='username'
            required
            minLength='3'
            maxLength='15'
            placeholder='Enter your username (3 to 15 characters)'
          />
        </label>
        <label className='flex flex-col items-start sm:mt-4 w-full sm:w-4/5 md:w-3/5 lg:w-2/6 2xl:w-3/12 p-2'>
          <span className='block text-gray-700 font-bold mb-2'>Email</span>
          <input
            type='email'
            ref={emailRef}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            aria-label='Email'
            autoComplete='email'
            required
            placeholder='Enter your email address'
          />
        </label>
        <label className='flex flex-col items-start sm:mt-4 w-full sm:w-4/5 md:w-3/5 lg:w-2/6 2xl:w-3/12 p-2'>
          <span className='block text-gray-700 font-bold mb-2'>Password</span>
          <input
            type='password'
            ref={passwordRef}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            aria-label='Password'
            autoComplete='new-password'
            required
            minLength='8'
            placeholder='Must incl. 8 characters and a capital letter'
          />
        </label>
        <label className='flex flex-col items-start sm:mt-4 w-full sm:w-4/5 md:w-3/5 lg:w-2/6 2xl:w-3/12 p-2'>
          <span className='block text-gray-700 font-bold mb-2'>
            Confirm Password
          </span>
          <input
            type='password'
            ref={confirmPasswordRef}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            aria-label='Confirm Password'
            autoComplete='new-password'
            required
            minLength='8'
            placeholder='Confirm your password'
          />
        </label>
        <label>
          <span className='block text-gray-700 font-bold mb-2 mt-4'>
            Select a country to represent
          </span>
        </label>
        <CountrySelector
          id={'country-selector'}
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          onChange={setCountry}
          selectedValue={COUNTRIES.find((option) => option.value === country)}
        />
        <button type='submit' className='button mb-7 mt-7'>
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
