import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useUser } from '../../hooks/ApiHooks';
import ErrorAlert from '../../components/main/ErrorAlert';

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { doLogin } = useUser();
  const navigate = useNavigate();
  const [alert, setAlert] = useState('');

  const { setUser, user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
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
      /*

      const loginResult = await postLogin(inputs);
      localStorage.setItem('userToken', loginResult.token);
      //setUser(loginResult.user);
      */

      const user = await doLogin(inputs);
      // Successful login
      setUser(user);
      navigate('/');
      // console.log('username:', loginResult.user.name);
    } catch (error) {
      console.log(error.message);
      setAlert(error.message);
    }
  };

  return (
    <>
      {alert && <ErrorAlert onClose={() => setAlert(null)} alert={alert} />}

      <form
        onSubmit={handleSubmit}
        className='flex bg-gray-100  flex-col items-center justify-center '
      >
        <div className='bg-gray-100  shadowz-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col'>
          <div className='mb-4'>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='username'
              aria-label='Username'
            >
              Username
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              autoFocus
              autoComplete='username'
              ref={usernameRef}
              placeholder='Enter your username'
              aria-label='Username input'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 font-bold mb-2'
              htmlFor='password'
              aria-label='Password'
            >
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              ref={passwordRef}
              placeholder='Enter your password'
              autoComplete='current-password'
              aria-label='Password input'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button className='button' type='submit'>
              Sign In
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
