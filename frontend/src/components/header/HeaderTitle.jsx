import React from 'react';
import {useNavigate} from 'react-router-dom';
const HeaderTitle = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate('/');
        }}
        className=' text-white text-2xl font-bold '
      >
        Jak Films
      </button>
    </>
  );
};

export default HeaderTitle;
