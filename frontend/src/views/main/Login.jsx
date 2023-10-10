import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useUser } from '../../hooks/ApiHooks';
import ErrorAlert from '../../components/main/ErrorAlert';

const Login = () => {
  // References to input fields for username and password
  const usernameRef = useRef();
  const passwordRef = useRef();

  // Use the 'doLogin' function from the custom 'useUser' hook
  const { doLogin } = useUser();

  // Navigate function for page redirection
  const navigate = useNavigate();

  // State for displaying login-related alerts
  const [alert, setAlert] = useState('');

  // Use the 'user' and 'setUser' from the UserContext
  const { setUser, user } = useContext(UserContext);

  // Effect to automatically navigate to the home page if the user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log the entered username and password
    /*
    console.log(
      `Username: ${usernameRef.current.value}, Password: ${passwordRef.current.value}`
    );
    */

    // Construct an object with the username and password
    const inputs = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      // Attempt to log in with the provided credentials
      const user = await doLogin(inputs);

      // Successful login, set the user and navigate to the home page
      setUser(user);
      navigate('/');
    } catch (error) {
      console.log(error.message);
      // Display an error message in case of login failure
      setAlert(error.message);
    }
  };

  return (
    <>
      {/* Display an error alert if there's an alert message */}
      {alert && <ErrorAlert onClose={() => setAlert(null)} alert={alert} />}

      <form
        onSubmit={handleSubmit}
        className='flex bg-gray-100  flex-col items-center justify-center '
      >
        <div className='bg-gray-100  shadowz-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col'>
          <div className='mb-4'>
            {/* Username input field */}
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
            {/* Password input field */}
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
            {/* Submit button for signing in */}
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
