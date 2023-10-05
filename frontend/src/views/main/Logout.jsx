import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../contexts/UserContext';

const Logout = () => {
  const {setUser} = useContext(UserContext);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
    localStorage.removeItem('userToken');
    setMessage('You have been logged out.');
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, [setUser, navigate]);

  return (
    <div className='text-center'>
      <p className='text-lg animate-pulse'>{message}</p>
    </div>
  );
};

export default Logout;
