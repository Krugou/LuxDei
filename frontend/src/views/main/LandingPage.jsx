import React, { useState } from 'react';
import Banner from '../../components/main/Banner';
const LandingPage = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <Banner />
    </>
  );
};

export default LandingPage;
