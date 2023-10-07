import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useUser } from '../../hooks/ApiHooks';

import ErrorAlert from '../../components/main/ErrorAlert';

const Register = () => {
  const { postUser, doLogin } = useUser();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const { setUser, user } = useContext(UserContext);

  const [alert, setAlert] = useState('');

  const countryRef = useRef('fi'); // Set the initial value for the select
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  /*
  const doLogin = async () => {
    const inputs = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const loginResult = await postLogin(inputs);
      localStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      console.log('username:', loginResult.user.name);
    } catch (error) {
      console.log(error.message);
    }
  };
*/
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
      const inputs = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      const user = await doLogin(inputs);
      // Successful login
      setUser(user);
      navigate('/');
    } catch (error) {
      // Set the error message
      if (error.message === 'Username already taken') {
        setErrorMessage(error.message);

        // Clear the error message after 3 seconds (adjust the duration as needed)
        setTimeout(() => {
          setErrorMessage('');
        }, 2500);
        return;
      }
      setAlert(error.message);
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
    <>
      {alert && <ErrorAlert onClose={() => setAlert(null)} alert={alert} />}

      <form
        onSubmit={handleSubmit}
        className='flex bg-gray-100  flex-col items-center'
      >
        <label className='flex flex-col items-start mt-4'>
          <span className='block text-gray-700 font-bold mb-2'>Username</span>
          <input
            type='text'
            ref={usernameRef}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            aria-label='Username'
            autoComplete='username'
            required
            placeholder='atleast 3 char max 15'
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
            required
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
            required
            placeholder='atleast 8 char one capital letter'
          />
        </label>
        <label className='flex flex-col items-center mt-4'>
          <span className='block text-gray-700 font-bold mb-2'>Country</span>
          <select
            ref={countryRef}
            className='border font-bold border-gray-400 text-white bg-gray-700 rounded-lg p-2 w-full'
          >
            <option value='FI'>Finland</option>
            <option value='DK'>Denmark</option>
            <option value='NO'>Norway</option>
            <option value='SE'>Sweden</option>
            <option value='IS'>Iceland</option>
            <option value='EE'>Estonia</option>
          </select>
        </label>
        <button type='submit' className='button mb-7 mt-7'>
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
