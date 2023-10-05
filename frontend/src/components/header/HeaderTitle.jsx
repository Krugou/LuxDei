import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {testDatabaseConnection} from '../../hooks/ApiHooks';

const HeaderTitle = () => {
  const navigate = useNavigate();
  const [databaseOnlineStatus, setDatabaseOnlineStatus] = useState(false);

  const checkDatabaseConnection = async () => {
    const response = await testDatabaseConnection();
    // console.log('HeaderTitle.jsx - checkDatabaseConnection: response:', response);
    setDatabaseOnlineStatus(response);
    
  };

  useEffect(() => {
    checkDatabaseConnection();
  }, []);

  return (
    <>
      <button
        onClick={() => {
          navigate('/');
        }}
        className={`text-white text-2xl font-bold ${databaseOnlineStatus ? '' : 'animate-spinSlightly'
          }`}
      >
        {databaseOnlineStatus ? 'Jak Films' : 'jakfilms'}
      </button>
    </>
  );
};

export default HeaderTitle;